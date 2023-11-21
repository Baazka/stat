import React, { useEffect, useState } from "react";
import fasUrl from "../fasURL";
import statURL from '../Stat_URL'
import { DataRequest } from "../functions/DataApi";
import dateFormat, { masks } from "dateformat";



function Comments(props:any) {
  const userDetils = props.userDetails;
  const mayagtData = props.mayagtData;
  const [data, loadData] = useState([]);
  const [status, setStatus] = useState();
  const [commentText, setCommentText] = useState("");
  async function fetchData() {

  
      DataRequest({
        url:statURL + "getProcess",
        method: "POST",
        data: {ID:mayagtData?.ID},
      })
        .then(function (response) {
          console.log(response,'statisticProcess');
          if(response.data !== undefined && response.data.length >0){
          setStatus(response.data);

          DataRequest({
            url: statURL +
            "CommentList?ProcessID=" +response.data.ID,
            method: "GET",
            data: {},
          })
            .then(function (res) {
              console.log(res,'comment get');
              loadData(res.data);
              
            })
            .catch(function (error) {
             console.log(error,'comment');
            });
          }
        })
        .catch(function (error) {
         console.log(error,'url:fasUrl + process/');
        });

    



   
  }


  useEffect(() => {
    fetchData();
  }, [props.mayagtData]);

  function comment() {
   
    DataRequest({
      url: statURL + "CommentInsert" ,
      method: "POST",
      data: {
        MODULE_ID: props.MODULE_ID,
        PROCESS_ID: status.ID,
        COMMENT_TEXT: commentText,
        CREATED_BY: userDetils?.USER_ID,
        ID: null,
      
       
      },
    })
      .then(function (response) {
       
        
        if (response?.data?.status === 200) {
          fetchData();
          // props.changeData();
          setCommentText("");
        }
      })
      .catch(function (error) {
        alert("системийн алдаа");
      });
  }

  function deleteComment(value) {
    if (window.confirm("Устгахдаа итгэлтэй байна уу?"))
      DataRequest({
        url: statURL + "CommentRemove/",
        method: "POST",
        data: {
          ID: value.ID,
          UPDATED_BY: userDetils.USER_ID,
          
         
        },
      })
        .then(function (response) {
          if (response?.data?.status === 200) {
            fetchData();
            // props.changeData();
          }
        })
        .catch(function (error) {
          alert("системийн алдаа");
        });
  }

  return (
    <div>
      {status?.ID === undefined || status?.ID === null ? null : (
        <div className="flex flex-col p-2 pl-14" style={{ width: "100%" }}>
          <div className="flex  items-end">
            <textarea
              value={commentText}
              placeholder="Чанарын хяналт..."
              onChange={(text) => setCommentText(text.target.value)}
              style={{
                border: "1px solid gray",
                borderRadius: "8px",
                width: "100%",
              }}
            />
            <button
              className="px-3 "
              style={{
                borderRadius: "5px",
                marginLeft: "20px",
                backgroundColor: "#2684fe",
                color: "White",
              }}
              onClick={() => comment()}
            >
              Илгээх
            </button>
          </div>
          <div
            style={{
              maxHeight: "400px",
              overflowY: "scroll",
              paddingTop: "20px",
            }}
          >
            {/* ------------------------------------------commments */}
            {data.map((value, index) => (
              <div style={{ width: "100%" }}>
                <div
                  style={{
                    display: "flex",
                    padding: "2px",
                    width: "100%",
                    justifyContent: "space-between",
                    borderRadius: "8px",
                  }}
                >
                  <div>
                    <span style={{ fontWeight: "bold" }}>
                      {value.USER_NAME} &nbsp;
                    </span>
                    <span style={{ color: "gray" }}>
                      {dateFormat(value.CREATED_DATE, "yyyy-mm-dd hh:MM:ss")}
                      &nbsp;
                    </span>
                  </div>
                  {value.CREATED_BY === userDetils.USER_ID ? (
                    <div
                      style={{
                        color: "red",
                        fontWeight: "bolder",
                        cursor: "pointer",
                        alignSelf: "center",
                      }}
                      onClick={() => deleteComment(value)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-trash"
                        viewBox="0 0 16 16"
                      >
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                        <path
                          fillRule="evenodd"
                          d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                        />
                      </svg>
                    </div>
                  ) : null}
                </div>
                <div
                  style={{
                    display: "flex",
                    padding: "2px",
                    width: "100%",
                    borderBottom: "0.5px solid rgb(220,220,220,0.5)",
                  }}
                >
                  <span>{value.COMMENT_TEXT}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Comments;