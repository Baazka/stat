import React, { useEffect, useState } from "react";
import fasUrl from "../fasURL";
import statUrl from '../Stat_URL'
import { DataRequest } from "../functions/DataApi";
import { attach } from "../assets/zurag";
import axios from "axios";

var dateFormat = require("dateformat");

function Mayagt_files(props) {
  const userDetils = props.userDetails
  const mayagtData = props.mayagtData
  const [fileAdd, setFiles] = useState({});
  async function fetchData() {

    
    DataRequest({
      url: statUrl +
      "getFile?StatID=" +mayagtData.ID,
      method: "GET",
      data: {},
    })
      .then(function (response) {
        console.log(response.data,'getFile');
        setFiles(response.data);
        
      })
      .catch(function (error) {
        alert("системийн алдаа");
      });
    
  }


  useEffect(() => {
    fetchData();
  }, [props]);

  async function saveAvatar(file) {

      
      const formData = new FormData();
   
      formData.append("file", file.target.files[0]);

     
    let  resultFile = await axios.post(statUrl + "uploadFile/"+mayagtData.ID+'/'+file.target.files[0].name, formData);
    console.log(resultFile.status,'gg');
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
            deleteComment()
          
        }else{
          alert(resultUplaod.data.message)
        }

       
    }
    
  }

  

  async function deleteComment(value) {
   
    if(fileAdd.FILE_PATH !== undefined){
  let  resultFile = await axios.delete(statUrl + "removeFile/"+mayagtData.ID+'/'+fileAdd.FILE_NAME, {});
  console.log(resultFile,'resultFile');
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
  <div className="flex flex-row">
            <div className=" uppercase  mr-1">
               Хавсралт оруулах:
            </div>
            { userDetils.USER_TYPE_NAME === "ADMIN" ? 
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
         
    </div>
  );
}

export default Mayagt_files;