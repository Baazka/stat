import React, { useEffect, useState } from "react";
import UserPremission from "../functions/userPermission";
import { printIcon } from "../assets/zurag";
import Button from "./Button";

import { DataRequest } from "../functions/DataApi";
import Stat_URL from "../Stat_URL";
var dateFormat = require("dateformat");

function Batlakh(props: any) {
  // @ts-ignore
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));
  const [tsonkh, setTsonkh] = useState(0);
  const [ACTION_DESC, setAction_DESK] = useState("");
  // @ts-ignore
  const mayagtData = JSON.parse(localStorage.getItem("Stat"));
  const [batlakhHuselt, setBatlakhHuselt] = useState({
    AUDIT_ID: mayagtData.ID,
    DOCUMENT_ID: mayagtData.Document_ID,
    REQUEST_TYPE: 1,
    LEVEL_ID: props.STATUS,
    MODULE_ID:6,
    DESCRIPTION: "",
    CREATED_BY: userDetails.USER_ID,
  });

  useEffect(() => {
    fetchData();
  }, [props]);

  async function fetchData() {
    DataRequest({
      url: Stat_URL + "NotificationList",
      method: "post",
      data: {
        AUDIT_ID: mayagtData.ID,
        USER_ID:userDetails.USER_ID
      },
    })
      .then(function (response) {
        console.log("mayagt1Noti", response.data);
        if (response.data !== undefined && response.data.length > 0) {
          setBatlakhHuselt(response.data[0]);
        }
      })
      .catch(function (error) {
        console.log(error, "error");
      
      });
 
  }

  function batlakhDugaar() {
    if (props.RoleID === 2) return 1;
    else if (props.RoleID === 3) return 2;
    else if (props.RoleID === 4) return 3;
  }

  function requiredField() {
    if (
      ACTION_DESC === "" ||
      ACTION_DESC === null ||
      ACTION_DESC === undefined
    ) {
      alert("Чанарын хяналтын санал, зөвлөмж оруулна уу");
      return false;
    } else {
      return true;
    }
  }
  function confirm() {
    if (requiredField()) {
      let dugaar = batlakhDugaar();
      DataRequest({
        url: Stat_URL + "statisticProcessChange/",
        method: "POST",
        data: {
          ID: props.statusID,
          STAT_AUDIT_ID:mayagtData.ID,
          ACTION_ID: dugaar,
          ACTION_DESC: ACTION_DESC,
          CREATED_BY: userDetails.USER_ID,
       
        },
      })
        .then(function (response) {
          if (response?.data.message === "Хадгаллаа.") {
            DataRequest({
              url: Stat_URL + "NotificationInsert/",
              method: "POST",
              data: {
                AUDIT_ID: mayagtData.ID,
                DOCUMENT_ID: mayagtData.DOCUMENT_ID,
                REQUEST_TYPE: batlakhHuselt.REQUEST_TYPE,
                LEVEL_ID: props.STATUS + 1,
                MODULE_ID:6,
                DESCRIPTION: ACTION_DESC,
                CREATED_BY: userDetails.USER_ID,
              },
            })
              .then(function (response) {
                if (response?.data.message === "Хадгаллаа.") {
                  alert("Aмжилттай хадгаллаа");
                  setTsonkh(0);
                  props.fetchData();
                } else {
                  alert("Мэдэгдэл илгээх алдаа гарлаа");
                }
              })
              .catch(function (error) {
                alert("Мэдэгдэл илгээх амжилтгүй !!!");
              });
          } else {
            alert("Батлах хүсэлт илгээх алдаа гарлаа");
          }
        })
        .catch(function (error) {
          alert("Батлах хүсэлт амжилтгүй !!!");
        });
    }
  }

  function cancel() {
    let dugaar = batlakhDugaar();
    DataRequest({
      url: Stat_URL + "statisticProcessChange/",
      method: "POST",
      data: {
        ID: props.statusID,
        STAT_AUDIT_ID:mayagtData.ID,
        ACTION_ID: dugaar,
        ACTION_DESC: ACTION_DESC,
        CREATED_BY: userDetails.USER_ID,

       
      },
    })
      .then(function (response) {
        if (response?.data.message === "Хадгаллаа.") {
          DataRequest({
            url: Stat_URL + "NotificationInsert/",
            method: "POST",
            data: {
              AUDIT_ID: mayagtData.ID,
              DOCUMENT_ID: mayagtData.DOCUMENT_ID,
              REQUEST_TYPE: 0,
              LEVEL_ID: props.STATUS - 1,
              MODULE_ID:6,
              DESCRIPTION: ACTION_DESC,
              CREATED_BY: userDetails.USER_ID,
            },
          })
            .then(function (response) {
              if (response?.data.message === "Хадгаллаа.") {
                alert("Aмжилттай хадгаллаа");
                setTsonkh(0);
                props.fetchData();
               
              } else {
                alert("Мэдэгдэл илгээх алдаа гарлаа");
              }
            })
            .catch(function (error) {
              alert("Мэдэгдэл илгээх амжилтгүй !!!");
            });
        } else {
          alert("Цуцлах хүсэлт илгээх алдаа гарлаа");
        }
      })
      .catch(function (error) {
        alert("Цуцлах хүсэлт амжилтгүй !!!");
      });
  }

  function checkConfirm(value) {
   
    if (
      mayagtData.AUDIT_APPROVE_MEMBER3 === null ||
      mayagtData.AUDIT_APPROVE_MEMBER3 === undefined ||
      mayagtData.AUDIT_APPROVE_MEMBER3 === ""
    ) {
      if (parseInt(props.RoleID) === 2) {
        if (parseInt(props.STATUS) === 0) {
          return true;
        } else {
          return false;
        }
      } else if (parseInt(props.RoleID) === 3) {
        if (parseInt(props.STATUS) === 1) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    } else {
      if (props.RoleID === 2) {
        if (parseInt(props.STATUS) === 0) {
          return true;
        } else {
          return false;
        }
      } else if (parseInt(props.RoleID) === 3) {
        if (parseInt(props.STATUS) === 1) {
          return true;
        } else {
          return false;
        }
      } else if (parseInt(props.RoleID) === 4) {
        if (parseInt(props.STATUS) === 2) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    }

  }

  function breakComfirm(value) {
    let user = userDetails.USER_ID;
    if (
      mayagtData.AUDIT_APPROVE_MEMBER3 === null ||
      mayagtData.AUDIT_APPROVE_MEMBER3 === undefined ||
      mayagtData.AUDIT_APPROVE_MEMBER3 === ""
    ) {
      if (props.RoleID === 2) {
        if (props.STATUS === 1) {
          return true;
        } else {
          return false;
        }
      } else if (props.RoleID === 3) {
        if (props.STATUS === 2) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    } else {
      if (props.RoleID === 2) {
        if (props.STATUS === 1) {
          return true;
        } else {
          return false;
        }
      } else if (props.RoleID === 3) {
        if (props.STATUS === 2) {
          return true;
        } else {
          return false;
        }
      } else if (props.RoleID === 4) {
        if (props.STATUS === 3) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    }
  }
  return (
    <div>
      <div className="flex">
        {batlakhHuselt.REQUEST_TYPE === undefined ? null : (
          <div>
            <div>
              {checkConfirm(props.CREATED_BY) ? (
                <div
                onClick={() => setTsonkh(1)}
                className="inline-flex mb-2 items-center rounded ml-2 mr-1 cursor-pointer"
                style={{
                  border:
                    props.borderColor === undefined
                      ? "1px solid #2684fe"
                      : "1px solid" + props.borderColor,
                }}
              >
                <div className="bg-white">
                  <img
                    src={printIcon}
                    width={props.Pwidth !== undefined ? props.Pwidth : "20px"}
                    height={props.Pheight !== undefined ? props.Pheight : "20px"}
                    className="mx-1"
                  ></img>
                </div>
                <div
                  style={{
                    backgroundColor: props.color === undefined ? "#2684fe" : props.color,
                  }}
                  className=" text-white  py-0 px-1"
                >
                 Батлах
                </div>
              </div>
              ) : null}

              {tsonkh > 0 ? (
                <div
                  class="fixed z-10  overflow-y-auto bottom-24 right-96   sm:bottom-20 sm:right-80"
                  aria-labelledby="modal-title"
                  role="dialog"
                  aria-modal="true"
                >
                  <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <div
                      class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
                      aria-hidden="true"
                    ></div>

                    <span
                      class="hidden sm:inline-block sm:align-middle sm:h-screen"
                      aria-hidden="true"
                    >
                      &#8203;
                    </span>
                    <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                      <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div className="sm:flex sm:items-start">
                          <div className="text-center sm:mt-0 sm:ml-4 sm:text-left">
                            <h3
                              className="text-lg leading-6 font-medium text-gray-900"
                              id="modal-title"
                            >
                              Чанарын хяналтын санал, зөвлөмж
                            </h3>
                            <div className="mt-2">
                              <textarea
                                className="textareaBorderless"
                                rows="2"
                                style={{ height: "auto", width: "400px" }}
                                value={ACTION_DESC}
                                onChange={(text) =>
                                  setAction_DESK(text.target.value)
                                }
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        <button
                          type="button"
                          class="w-full inline-flex justify-center rounded-md border border-transparent  shadow-sm px-4 py-2  fetext-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-300 sm:ml-3 sm:w-auto sm:text-sm"
                          style={{ backgroundColor: "#2684fe" }}
                          onClick={() => (tsonkh === 2 ? cancel() : confirm())}
                        >
                          Батлах
                        </button>
                        <button
                          type="button"
                          className="w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                          onClick={() => setTsonkh(0)}
                        >
                          Гарах
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>

            {breakComfirm(props.CREATED_BY) ? (
               <div
      onClick={() => setTsonkh(2)}
      className="inline-flex mb-2 items-center rounded ml-2 mr-1 cursor-pointer"
      style={{
        border:
          props.borderColor === undefined
            ? "1px solid #2684fe"
            : "1px solid" + props.borderColor,
      }}
    >
      <div className="bg-white">
        <img
          src={printIcon}
          width={props.Pwidth !== undefined ? props.Pwidth : "20px"}
          height={props.Pheight !== undefined ? props.Pheight : "20px"}
          className="mx-1"
        ></img>
      </div>
      <div
        style={{
          backgroundColor: props.color === undefined ? "#2684fe" : props.color,
        }}
        className=" text-white  py-0 px-1"
      >
        Цуцлах
      </div>
    </div>
          
            ) : null}
            {/* </>
        ) : null} */}
          </div>
        )}
      </div>
    </div>
  );
}

export default Batlakh;
