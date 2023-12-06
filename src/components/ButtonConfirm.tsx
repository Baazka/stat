import React, { useEffect, useState } from "react";
import UserPremission from "../functions/userPermission";
import { printIcon } from "../assets/zurag";
import Button from "./Button";

import { DataRequest } from "../functions/DataApi";
import fasUrl from "../Stat_URL";
var dateFormat = require("dateformat");

function Batlakh(props: any) {
  // @ts-ignore
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));
  const [tsonkh, setTsonkh] = useState(0);
  const [ACTION_DESC, setAction_DESK] = useState("");
  // @ts-ignore
  const mayagtData = JSON.parse(localStorage.getItem("Stat"));
  const [batlakhHuselt, setBatlakhHuselt] = useState({});

  useEffect(() => {
    fetchData();
  }, [props]);

  async function fetchData() {
    DataRequest({
      url: fasUrl + "OT_REQUEST_FOR_CONFIRM",
      method: "GET",
      data: {
        ID: mayagtData.ID,
        PERIOD_LABEL: mayagtData.PERIOD_YEAR, //PERIOD_LABEL
        DEPARTMENT_ID: mayagtData.DEPARTMENT_ID,
      },
    })
      .then(function (response) {
        console.log("mayagt1", response);
        if (response.data !== undefined && response.data.length > 0) {
          setBatlakhHuselt(response.data);
        }
      })
      .catch(function (error) {
        console.log(error, "error");
      
      });
    // let listbatlakhHuselt = await axios(
    //   fasUrl +
    //     "OT_REQUEST_FOR_CONFIRM/" +
    //     props.data.ID +
    //     "/" +
    //     props.data.listID +
    //     "/" +
    //     3
    // );
  }

  function batlakhDugaar() {
    if (props.RoleID === 4) return 1;
    else if (props.RoleID === 5) return 2;
    else if (props.RoleID === 6) return 3;
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
        url: fasUrl + "processChange/",
        method: "POST",
        data: {
          PROCESS_ID: props.statusID,
          ACTION_ID: dugaar,
          ACTION_DESC: ACTION_DESC,
          CREATED_BY: userDetails.USER_ID,
          CREATED_DATE: dateFormat(new Date(), "dd-mmm-yyyy"),
        },
      })
        .then(function (response) {
          if (response?.data.message === "success") {
            DataRequest({
              url: fasUrl + "OT_REQUEST_FOR_CONFIRM/",
              method: "POST",
              data: {
                ID: null,
                OT_AUDIT_ID: props.data.ID,
                DOCUMENT_ID: props.data.listID,
                IS_ACTIVE: 1,
                CREATED_BY: userDetails.USER_ID,
                IS_SHOW: 0,
                REQUEST_TYPE: 1,
                DESCRIPTION: ACTION_DESC,
                LEVEL_ID: props.STATUS + 1,
                MODULE_TYPE: 3,
              },
            })
              .then(function (response) {
                if (response?.data.message === "success") {
                  alert("Aмжилттай хадгаллаа");
                  setTsonkh(0);
                  props.fetchData();
                  props.changeData();
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
    DataRequest({
      url: fasUrl + "processChange/",
      method: "POST",
      data: {
        PROCESS_ID: props.statusID,
        ACTION_ID: 4,
        ACTION_DESC: ACTION_DESC,
        CREATED_BY: userDetails.USER_ID,
        CREATED_DATE: dateFormat(new Date(), "dd-mmm-yyyy"),
      },
    })
      .then(function (response) {
        if (response?.data.message === "success") {
          DataRequest({
            url: fasUrl + "OT_REQUEST_FOR_CONFIRM/",
            method: "POST",
            data: {
              ID: null,
              OT_AUDIT_ID: props.data.ID,
              DOCUMENT_ID: props.data.listID,
              IS_ACTIVE: 1,
              CREATED_BY: userDetails.USER_ID,
              IS_SHOW: 0,
              REQUEST_TYPE: 0,
              DESCRIPTION: ACTION_DESC,
              LEVEL_ID: props.STATUS - 1,
              MODULE_TYPE: 3,
            },
          })
            .then(function (response) {
              if (response?.data.message === "success") {
                alert("Aмжилттай хадгаллаа");
                setTsonkh(0);
                props.fetchData();
                props.changeData();
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
    let batlakh = batlakhDugaar();
    if (
      mayagtData.AuditData.AUDIT_APPROVE_MEMBER3 === null ||
      mayagtData.AuditData.AUDIT_APPROVE_MEMBER3 === undefined ||
      mayagtData.AuditData.AUDIT_APPROVE_MEMBER3 === ""
    ) {
      if (parseInt(props.RoleID) === 4) {
        if (parseInt(props.STATUS) === 0) {
          return true;
        } else {
          return false;
        }
      } else if (parseInt(props.RoleID) === 5) {
        if (parseInt(props.STATUS) === 1) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    } else {
      if (props.RoleID === 4) {
        if (parseInt(props.STATUS) === 0) {
          return true;
        } else {
          return false;
        }
      } else if (parseInt(props.RoleID) === 5) {
        if (parseInt(props.STATUS) === 1) {
          return true;
        } else {
          return false;
        }
      } else if (parseInt(props.RoleID) === 6) {
        if (parseInt(props.STATUS) === 2) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    }

    // if (
    //   batlakh === 1 &&
    //   value.APPROVED_FIRST_ID !== undefined &&
    //   value.APPROVED_FIRST_ID !== null &&
    //   value.APPROVED_FIRST_ID !== ""
    // ) {
    //   return false;
    // } else if (batlakh === 1) return true;
    // else if (
    //   batlakh === 2 &&
    //   value.APPROVED_FIRST_ID !== undefined &&
    //   value.APPROVED_FIRST_ID !== null &&
    //   value.APPROVED_FIRST_ID !== ""
    // ) {
    //   return true;
    // } else if (
    //   batlakh === 3 &&
    //   value.APPROVED_SECOND_ID !== undefined &&
    //   value.APPROVED_SECOND_ID !== null &&
    //   value.APPROVED_SECOND_ID !== ""
    // ) {
    //   return true;
    // } else {
    //   return false;
    // }
  }

  function breakComfirm(value) {
    let user = userDetails.USER_ID;
    if (
      mayagtData.AuditData.AUDIT_APPROVE_MEMBER3 === null ||
      mayagtData.AuditData.AUDIT_APPROVE_MEMBER3 === undefined ||
      mayagtData.AuditData.AUDIT_APPROVE_MEMBER3 === ""
    ) {
      if (props.RoleID === 4) {
        if (props.STATUS === 1) {
          return true;
        } else {
          return false;
        }
      } else if (props.RoleID === 5) {
        if (props.STATUS === 2) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    } else {
      if (props.RoleID === 4) {
        if (props.STATUS === 1) {
          return true;
        } else {
          return false;
        }
      } else if (props.RoleID === 5) {
        if (props.STATUS === 2) {
          return true;
        } else {
          return false;
        }
      } else if (props.RoleID === 6) {
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
                <Button Title={"Батлах"} action={() => setTsonkh(1)} />
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
                    <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                      <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div class="sm:flex sm:items-start">
                          <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                            <h3
                              class="text-lg leading-6 font-medium text-gray-900"
                              id="modal-title"
                            >
                              Чанарын хяналтын санал, зөвлөмж
                            </h3>
                            <div class="mt-2">
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
                          class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
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
              <Button
                Title={"Цуцлах"}
                Icon={printIcon}
                action={() => setTsonkh(2)}
              />
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
