import React, { useEffect, useState } from "react";
import statUrl from '../Stat_URL'
import { DataRequest } from "../functions/DataApi";
import { attach } from "../assets/zurag";
import axios from "axios";
import { check_save } from "../functions/Tools";
import { RevolvingDot } from "react-loader-spinner";


function Mayagt_files(props) {
  const userDetils = props.userDetails
  const mayagtData = props.mayagtData
  const [fileAdd, setFiles] = useState({});
  const [statusRole, setStatusRole] = useState(false);
  const [loaderSpinner, setloaderSpinner] = useState(0);
  async function fetchData() {

    DataRequest({
      url: statUrl +
      "getFile?StatID=" +mayagtData.ID,
      method: "GET",
      data: {},
    })
      .then(function (response) {
        
        setFiles(response.data);
        
      })
      .catch(function (error) {
        
      });
      DataRequest({
        url:statUrl + "getProcess",
        method: "POST",
        data: {ID:mayagtData.ID},
      })
        .then(function (response) {
       
          if(response.data !== undefined ){
           
            setStatusRole(()=>({STATUS:response.data.STATUS,ROLE:response?.data.ROLE.find(
              (a) => a.AUDITOR_ID === userDetils.USER_ID)}));
     
             
          }
        })
        .catch(function (error) {
         console.log(error,'url:fasUrl + process/');
        });
   
  }



  useEffect(() => {
    fetchData();
  }, [props]);

  async function saveAvatar(file) {
    setloaderSpinner(1)
   
    if(file.target.files[0].size > 100000000){
      alert('файл 100MB-с их хэмжээтэй байна')
            setloaderSpinner(0)
    }else {
      const formData = new FormData();
   
          formData.append("file", file.target.files[0]);
    
        
        axios.post(statUrl + "uploadFile/"+mayagtData.ID+'/'+file.target.files[0].name, formData).then(async function (resultFile) {
          
          if((resultFile.data.status === 413 && resultFile.data.message === '100MB-с их хэмжээтэй байна!') || resultFile.status === 413)
          {
            alert('файл 100MB-с их хэмжээтэй байна')
            setloaderSpinner(0)
          }else 
          if(resultFile.data.filePath !== undefined){
             
              let  resultUplaod = await axios.post(statUrl + "postFile/", {file:{
                  ID:null,
                  STAT_AUDIT_ID:mayagtData.ID,
                  FILE_NAME:file.target.files[0].name,
                  FILE_PATH:resultFile.data.filePath,
                  IS_ACTIVE:1,
                  CREATED_BY:userDetils.USER_ID
              }});
              if(resultUplaod.data.message ==='Хадгаллаа.'){
                  alert('амжилттай хадгаллаа')
                  setloaderSpinner(0)
                  deleteComment()
                
              }else{
                alert(resultUplaod.data.message)
              }
      
             
          }
        })
        .catch(function (error) {
          console.log(error,'error');
          setloaderSpinner(0)
        });;
       
       
   
    }

    
  }

  

  async function deleteComment(value) {
   
    if(fileAdd.FILE_PATH !== undefined){
  let  resultFile = await axios.delete(statUrl + "removeFile/"+mayagtData.ID+'/'+fileAdd.FILE_NAME, {});
  
  if( resultFile.data.message === "Файлыг устгалаа."){
      
      let  resultUplaod = await axios.post(statUrl + "postFile/", {file:{
          ID:fileAdd.ID,
          STAT_AUDIT_ID:mayagtData.ID,
          FILE_NAME:fileAdd.FILE_NAME,
          FILE_PATH:fileAdd.FILE_PATH,
          IS_ACTIVE:0,
          CREATED_BY:userDetils.USER_ID
      }});
      if(resultUplaod.data !== undefined)
      fetchData()

     
  }
  }else{
    fetchData()
  }
  }

  return (
    <div>
       {loaderSpinner === 1 || loaderSpinner === undefined ? (
        <div style={{ paddingLeft: "40%",}}>
          <RevolvingDot color="#2684fe" height={50} width={50} />
        </div>):
  <div className="flex flex-row">
 
            <div className=" uppercase  mr-1">
               Хавсралт оруулах:
            </div>
          
            {statusRole?  
            
                <form
                  className="uploadButton mr-3"
                  method="POST"
                  accept=".pdf"
                  enctype="multipart/form-data"
                >
                  <label
                    for="file-upload"
                    className="custom-file-upload text-white"
                  >
                    <i className="fa fa-cloud-upload"></i> Хавсралт оруулах
                  </label>
                  <input
                    id="file-upload"
                    type="file"
                    accept=".pdf"
                    onChange={(file) => saveAvatar(file)}
                  />
                </form>
              
             : null}
            
            {fileAdd?.FILE_PATH !== undefined && fileAdd?.FILE_PATH !== "" ? (
              <a
                href={
                  statUrl +
                  "uploads" +
                  fileAdd?.FILE_PATH.replace("uploads", "")
                }
              
                rel="noopener noreferrer"
                target="_blank"
                className="inline-flex mb-2 items-center "
                style={{
                  border: "1px solid black",
                  borderRadius: "4px",
                }}
              >
                <div>
                  <img
                    src={attach}
                    width="20px"
                    height="20px "
                    className="mx-1"
                  ></img>
                </div>
                <div className=" text-black pr-2">Хавсралт харах</div>
              </a>
            ) : <div className=" text-black pr-2">Хавсралт оруулаагүй байна!</div>}
         
          </div>
}
          
    </div>
  );
}

export default Mayagt_files;