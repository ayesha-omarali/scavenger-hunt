import React from 'react';
import styled from '@emotion/styled'
import { Flex, Box } from '@rebass/grid/emotion'
import {Progress} from 'reactstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { axiosClient } from './AxiosClient';

export default class TaskPage extends React.Component {
  constructor(props) {
    super(props);
      this.state = {
        selectedFile: null,
        loaded:0
      }
   
  }

  checkMimeType=(event)=>{
    //getting file object
    let files = event.target.files 
    //define message container
    let err = []
    // list allow mime type
   const types = ['image/png', 'image/jpeg', 'image/gif', 'video/mp4']
    // loop access array
    for(var x = 0; x<files.length; x++) {
     // compare file type find doesn't matach
         if (types.every(type => files[x].type !== type)) {
         // create error message and assign to container   
         err[x] = files[x].type+' is not a supported format\n';
       }
     };
     for(var z = 0; z<err.length; z++) {// if message not same old that mean has error 
         // discard selected file
        toast.error(err[z])
        event.target.value = null
    }
   return true;
  }

  maxSelectFile=(event)=>{
    let files = event.target.files
    if (files.length > 1) { 
      const msg = 'Only 1 image can be uploaded at a time'
      event.target.value = null
      toast.warn(msg)
      return false;
    }
    return true;
  }
  checkFileSize=(event)=>{
    let files = event.target.files
    let size = Infinity; 
    let err = []; 
    for(var x = 0; x<files.length; x++) {
    if (files[x].size > size) {
      err[x] = files[x].type+'is too large, please pick a smaller file\n';
    }
    };
    for(var z = 0; z<err.length; z++) {// if message not same old that mean has error 
      // discard selected file
      toast.error(err[z])
      event.target.value = null
    }
      return true;
  }

  onChangeHandler=event=>{
    var files = event.target.files
    if(this.maxSelectFile(event) && this.checkMimeType(event) &&    this.checkFileSize(event)){ 
    // if return true allow to setState
      this.setState({
        selectedFile: files,
        loaded:0
      })
    }
  }

  onClickHandler = () => {
    const data = new FormData() 
    for(var x = 0; x<this.state.selectedFile.length; x++) {
      data.append('file', this.state.selectedFile[x])
    }
    const fileType = this.state.selectedFile[0].type.includes("image") ? "image" : "video";
    const team = localStorage.getItem('team');
    const currentTask = localStorage.getItem('currentTask');
    axiosClient.post(`/upload/${fileType}/${team}/${currentTask}`, data, {
      onUploadProgress: ProgressEvent => {
        this.setState({
          loaded: (ProgressEvent.loaded / ProgressEvent.total*100),
        })
      },
    })
      .then(res => { // then print response status
        toast.success('upload success')
      })
      .catch(err => { // then print response status
        toast.error('upload fail')
      })
  }

  render() {
    return (
      <div className="container">
	      <div className="row">
      	  <div className="offset-md-3 col-md-6">
            <div className="form-group files">
            <label>Upload Your File </label>
            <input type="file" className="form-control" multiple onChange={this.onChangeHandler}/>
          </div>  
          <div className="form-group">
          <ToastContainer />
          <Progress max="100" color="success" value={this.state.loaded} >{Math.round(this.state.loaded,2) }%</Progress>
    
          </div> 
          
          <button type="button" className="btn btn-success btn-block" onClick={this.onClickHandler}>Upload</button>
	      </div>
      </div>
      </div>
    );
  }
}