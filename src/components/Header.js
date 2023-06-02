import { Fragment } from "react";
import { useHistory } from "react-router-dom";
import logo from "../assets/zurag/logo.png";
import {
  userPro,
  DownIcon,
  y,
  saveIcon,
  user_edit,
  log_out,
  password,
} from "../assets/zurag";
import React, { useState, useEffect, useRef } from "react";
import URL from "../Stat_URL";
import { Data_Request } from "../functions/make_Request";

import { Menu, Transition } from "@headlessui/react";

var dateFormat = require("dateformat");
const axios = require("axios");

function Header(props) {
  const [notification, setNotification] = useState(false);
  const [notificationData, setNotificationData] = useState([]);
  const [showDialogOpen, setShowDialogOpen] = useState(false);
  const [showDialogPass, setShowDialogPass] = useState(false);
  const history = useHistory();
  const userDetils = JSON.parse(localStorage.getItem("userDetails"));
  const ref = useRef(null);
  const [data, loadData] = useState({
    ID: null,
    ENT_ID: userDetils.ENT_ID,
    FIRST_NAME: null,
    LAST_NAME: null,
    POSTION_NAME: null,
    PHONE: null,
    CREATED_BY: userDetils.USER_ID,
    IS_ACTIVE: 1,
  });
  const [data2, loadData2] = useState();
  const [data3, loadData3] = useState();
  const [data4, loadData4] = useState();
  const [oldCode, setOldCode] = useState();
  const [loaderSpinner, setloaderSpinner] = useState(0);
  const dataTable = React.useMemo(
    () => (notificationData.length > 0 ? notificationData : []),
    [notificationData]
  );
  const [notfilter, setFilter] = useState({
    AUDIT_CODE: null,
    TYPE: null,
  });

  const columns = React.useMemo(
    () => [
      {
        Header: " ",
        accessor: (value, index) => {
          return (
            <div
              className="py-1 flex items-center justify-between  cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200  dark:hover:text-white"
              style={{
                borderBottom: "1.5px solid rgba(226, 225, 225, 0.7)",
              }}
              onClick={() => MoreNotification(value)}
            >
              {value.MODULE_TYPE === 1 ? (
                <div className="w-11/12">
                  <div
                    className="text-xl font-medium"
                    style={{
                      fontSize: 14,
                      color: value.IS_SHOW === 0 ? "black" : "#58555A",
                    }}
                  >
                    Бодит цагийн аудитын {value.CONTROLLED_OFFICE_NAME}-н
                    аудитын ажлын{" "}
                    <span
                      style={{
                        fontSize: 14,
                        fontWeight: "bold",
                      }}
                    >
                      {value.DOCUMENT_SHORT_NAME}
                    </span>{" "}
                    баримтыг{" "}
                    {value.REQUEST_TYPE === 0 ? (
                      <span
                        style={{
                          fontSize: 14,
                          color: "red",
                        }}
                      >
                        цуцлах
                      </span>
                    ) : (
                      <span
                        style={{
                          fontSize: 14,
                          color: "#32CD32",
                        }}
                      >
                        батлах
                      </span>
                    )}{" "}
                    хүсэлт {value.USER_NAME}-с ирлээ
                  </div>

                  <p
                    style={{
                      fontSize: 11,
                      color: "grey",
                    }}
                  >
                    {dateFormat(
                      value.UPDATED_DATE !== null
                        ? value.UPDATED_DATE
                        : value.CREATED_DATE,
                      "yyyy-mm-dd hh:MM:ss"
                    )}
                  </p>
                </div>
              ) : value.MODULE_TYPE === 2 ? (
                <div className="w-11/12">
                  <div
                    className="text-xl font-medium"
                    style={{
                      fontSize: 14,
                      color: value.IS_SHOW === 0 ? "black" : "#58555A",
                    }}
                  >
                    {value.PERIOD_TYPE === 1 ? "Явцын " : "Эцсийн "}
                    биелэлтийн тайлан дээр танд{" "}
                    {value.REQUEST_TYPE === 0 ? (
                      <span
                        style={{
                          fontSize: 14,
                          color: "red",
                        }}
                      >
                        цуцлах
                      </span>
                    ) : (
                      <span
                        style={{
                          fontSize: 14,
                          color: "#32CD32",
                        }}
                      >
                        батлах
                      </span>
                    )}{" "}
                    хүсэлт {value.USER_NAME}-с ирлээ
                  </div>

                  <p
                    style={{
                      fontSize: 11,
                      color: "grey",
                    }}
                  >
                    {dateFormat(
                      value.UPDATED_DATE !== null
                        ? value.UPDATED_DATE
                        : value.CREATED_DATE,
                      "yyyy-mm-dd hh:MM:ss"
                    )}
                  </p>
                </div>
              ) : value.MODULE_TYPE === 3 ? (
                <div className="w-11/12">
                  <div
                    className="text-xl font-medium"
                    style={{
                      fontSize: 14,
                      color: value.IS_SHOW === 0 ? "black" : "#58555A",
                    }}
                  >
                    Санхүүгийн аудитын{" "}
                    <span
                      style={{
                        fontSize: 14,
                        fontWeight: "bold",
                      }}
                    >
                      {value.AUDIT_CODE}
                    </span>{" "}
                    кодтой аудитын ажлын{" "}
                    <span
                      style={{
                        fontSize: 14,
                        fontWeight: "bold",
                      }}
                    >
                      {value.DOCUMENT_SHORT_NAME}
                    </span>{" "}
                    баримтыг{" "}
                    {value.REQUEST_TYPE === 0 ? (
                      <span
                        style={{
                          fontSize: 14,
                          color: "red",
                        }}
                      >
                        цуцлах
                      </span>
                    ) : (
                      <span
                        style={{
                          fontSize: 14,
                          color: "#32CD32",
                        }}
                      >
                        батлах
                      </span>
                    )}{" "}
                    хүсэлт {value.USER_NAME}-с ирлээ
                  </div>

                  <p
                    style={{
                      fontSize: 11,
                      color: "grey",
                    }}
                  >
                    {dateFormat(
                      value.UPDATED_DATE !== null
                        ? value.UPDATED_DATE
                        : value.CREATED_DATE,
                      "yyyy-mm-dd hh:MM:ss"
                    )}
                  </p>
                </div>
              ) : (
                <div className="w-11/12">
                  <div
                    className="text-xl font-medium"
                    style={{
                      fontSize: 14,
                      color: value.IS_SHOW === 0 ? "black" : "#58555A",
                    }}
                  >
                    Чанарын баталгаажуулалын{" "}
                    <span
                      style={{
                        fontSize: 14,
                        fontWeight: "bold",
                      }}
                    >
                      {value.AUDIT_CODE}
                    </span>{" "}
                    кодтой аудитын ажлын{" "}
                    <span
                      style={{
                        fontSize: 14,
                        fontWeight: "bold",
                      }}
                    >
                      {value.DOCUMENT_SHORT_NAME}
                    </span>{" "}
                    баримтыг{" "}
                    {value.REQUEST_TYPE === 0 ? (
                      <span
                        style={{
                          fontSize: 14,
                          color: "red",
                        }}
                      >
                        цуцлах
                      </span>
                    ) : (
                      <span
                        style={{
                          fontSize: 14,
                          color: "#32CD32",
                        }}
                      >
                        батлах
                      </span>
                    )}{" "}
                    хүсэлт {value.USER_NAME}-с ирлээ
                  </div>

                  <p
                    style={{
                      fontSize: 11,
                      color: "grey",
                    }}
                  >
                    {dateFormat(
                      value.UPDATED_DATE !== null
                        ? value.UPDATED_DATE
                        : value.CREATED_DATE,
                      "yyyy-mm-dd hh:MM:ss"
                    )}
                  </p>
                </div>
              )}

              <div>
                {value.IS_SHOW === 0 ? (
                  <img className="h-6 w-6" src={y} />
                ) : null}
              </div>
            </div>
          );
        },
      },
    ],
    []
  );

  function checkRoleBatlakh(ROLE, LEVEL_ID, MODULE_TYPE, CREATED_BY) {
    if (
      (ROLE === 2 || ROLE === 3 || ROLE === 7 || ROLE === 8) &&
      LEVEL_ID === 9 &&
      MODULE_TYPE === 2 &&
      userDetils.USER_ID !== CREATED_BY
    ) {
      return true;
    } else if ((ROLE === 4 || ROLE === 9) && LEVEL_ID === 0) {
      return true;
    } else if ((ROLE === 5 || ROLE === 10) && LEVEL_ID === 1) {
      return true;
    } else if ((ROLE === 6 || ROLE === 11) && LEVEL_ID === 2) {
      return true;
    } else {
      return false;
    }
  }
  function checkRoleTsutslah(ROLE, LEVEL_ID, MODULE_TYPE, CREATED_BY) {
    if (
      (ROLE === 2 || ROLE === 3 || ROLE === 7 || ROLE === 8) &&
      LEVEL_ID === 9 &&
      MODULE_TYPE === 2 &&
      userDetils.USER_ID !== CREATED_BY
    ) {
      return true;
    } else if ((ROLE === 4 || ROLE === 9) && LEVEL_ID === 1) {
      return true;
    } else if ((ROLE === 5 || ROLE === 10) && LEVEL_ID === 2) {
      return true;
    } else if ((ROLE === 6 || ROLE === 11) && LEVEL_ID === 3) {
      return true;
    } else {
      return false;
    }
  }

  function checkNotification() {
    setloaderSpinner(1);
    if (localStorage.getItem("userDetails") !== undefined) {
      let userDetils = JSON.parse(localStorage.getItem("userDetails"));
      if (userDetils !== undefined && userDetils.USER_ID !== undefined) {
        Data_Request({
          url: URL + "OT_REQUEST_FOR_CONFIRM_ONE/",
          method: "POST",
          data: {
            AUDIT_CODE: notfilter.AUDIT_CODE,
            USER_ID: userDetils.USER_ID,
          },
        }).then((response) => {
          if (response.data !== undefined && response.data.length > 0) {
            let temp = [];
            for (let i = 0; i < response.data.length; i++) {
              if (
                response.data[i].REQUEST_TYPE === 1
                  ? checkRoleBatlakh(
                      response.data[i].ROLE_ID,
                      response.data[i].LEVEL_ID,
                      response.data[i].MODULE_TYPE,
                      response.data[i].CREATED_BY
                    )
                  : checkRoleTsutslah(
                      response.data[i].ROLE_ID,
                      response.data[i].LEVEL_ID,
                      response.data[i].MODULE_TYPE,
                      response.data[i].CREATED_BY
                    )
              ) {
                temp = temp.filter((a) => a.ID !== response.data[i].ID);
                temp.push(response.data[i]);
              }
            }
            setNotificationData(temp);
            setloaderSpinner(0);
          } else {
            setNotificationData([]);
            setloaderSpinner(0);
          }
        });
      }
    }
  }
  useEffect(() => {
    checkNotification();
  }, [props]);

  useEffect(() => {
    checkNotification();
  }, [notfilter]);

  useEffect(() => {
    ref.current = setInterval(checkNotification, 3 * 60 * 1000);

    return () => {
      if (ref.current) {
        clearInterval(ref.current);
      }
    };
  }, []);
  function logOutFunction() {
    localStorage.removeItem("userDetails");
    history.push("/");
  }
  async function MoreNotification(value) {
    let sendData = value;
    sendData.IS_SHOW = 1;
    sendData.MODULE_TYPE = value.MODULE_TYPE;
    Data_Request({
      url: URL + "OT_REQUEST_FOR_CONFIRM/",
      method: "POST",
      data: sendData,
    })
      .then(async function (response) {
        if (
          (response.data?.code === 405 &&
            response.data?.result?.errorNum === 6502) ||
          (response.data?.code === 405 &&
            response.data?.result?.errorNum === 1461)
        ) {
          alert("Тэмдэгт хэтэрсэн байна");
        } else if (response?.data.message === "success") {
          //Bodit tsag
          if (value.MODULE_TYPE === 1) {
            let AuditData = await axios(
              URL + "singlePlan/" + value.OT_AUDIT_ID
            );
            let listItems = await axios(
              URL + "ot_documentList/" + value.OT_AUDIT_ID + "/" + 3
            );
            if (listItems.data.length > 0 && AuditData.data.length > 0) {
              let listRole = await axios(
                URL +
                  "ot_checkRole/" +
                  value.OT_AUDIT_ID +
                  "/" +
                  userDetils.USER_ID
              );

              localStorage.setItem(
                "mayagtDataOT",
                JSON.stringify({
                  AuditData: AuditData.data[0],
                  documents: listItems.data,
                  Role: listRole.data,
                  Type: value,
                })
              );
              if (history.location.pathname === "/web/home/MayagtOT") {
                history.replace({
                  pathname: "/web/home/MayagtOT",
                });
              } else {
                history.push({
                  pathname: "/web/home/MayagtOT",
                });
              }

              setNotification(false);
            }
          }
          //Akt
          if (value.MODULE_TYPE === 2) {
            Data_Request({
              url: URL + "aktList/",
              method: "POST",
              data: {
                FAS_AUDIT_ID: value.OT_AUDIT_ID,
              },
            }).then(async function (response) {
              if (response.data.length > 0) {
                Data_Request({
                  url: URL + "get7_1_akt/",
                  method: "POST",
                  data: {
                    FAS_AUDIT_ID: value.OT_AUDIT_ID,
                    type: response.data[0].MENU_TYPE,
                    SEVEN_ONE_ID: value.DOCUMENT_ID,
                  },
                }).then(async function (response7) {
                  if (
                    response7.data !== undefined &&
                    response7.data.length > 0
                  ) {
                    let listRole = await axios(
                      URL +
                        "AKT_checkRole/" +
                        value.OT_AUDIT_ID +
                        "/" +
                        userDetils.USER_ID
                    );
                    localStorage.setItem(
                      "actMayagtData",
                      JSON.stringify({
                        AuditData: response7.data[0],
                        mayagtTermination: response.data[0],
                        Role: listRole.data,
                        PERIOD_TYPE: value.PERIOD_TYPE,
                      })
                    );
                    if (value.PERIOD_TYPE === 1) {
                      if (response.data[0].PERIOD_ID === 3) {
                        alert("Эцэс эхэлсэн байна!");
                      } else {
                        if (
                          history.location.pathname === "/web/home/act_mayagt"
                        ) {
                          history.replace({
                            pathname: "/web/home/act_mayagt",
                          });
                        } else {
                          history.push({
                            pathname: "/web/home/act_mayagt",
                          });
                        }
                      }
                    } else {
                      if (response.data[0].PERIOD_ID === 4) {
                        alert("Явцаа оруулна уу!");
                      } else {
                        if (
                          history.location.pathname ===
                          "/web/home/act_end_mayagt"
                        ) {
                          history.replace({
                            pathname: "/web/home/act_end_mayagt",
                          });
                        } else {
                          history.push({
                            pathname: "/web/home/act_end_mayagt",
                          });
                        }
                      }
                    }
                    setNotification(false);
                  }
                });
              }
            });
          }
          //Sanhuu
          if (value.MODULE_TYPE === 3) {
            Data_Request({
              url: URL + "audit/",
              method: "POST",
              data: {
                FAS_AUDIT_ID: value.OT_AUDIT_ID,
              },
            }).then(async function (response) {
              if (response.data.length > 0) {
                Data_Request({
                  url: URL + "documentList/",
                  method: "POST",
                  data: {
                    FAS_AUDIT_ID: value.OT_AUDIT_ID,
                    MENU_TYPE: value.MENU_TYPE,
                    PERIOD_ID: value.PERIOD_ID,
                    SHILEN_TYPE_ID: value.SHILEN_TYPE_ID,
                    IS_CHBA: value.IS_CHBA === undefined ? null : value.IS_CHBA,
                  },
                })
                  .then(async function (docresponse) {
                    if (docresponse.data !== undefined) {
                      if (docresponse.data.length > 0) {
                        let listRole = await axios(
                          URL +
                            "checkRole/" +
                            value.OT_AUDIT_ID +
                            "/" +
                            userDetils.USER_ID
                        );

                        localStorage.setItem(
                          "mayagtData",
                          JSON.stringify({
                            AuditData: response.data[0],
                            documents: docresponse.data,
                            Role: listRole.data,
                            Type: value,
                          })
                        );

                        if (history.location.pathname === "/web/home/Mayagt") {
                          history.replace({
                            pathname: "/web/home/Mayagt",
                          });
                          window.location.reload();
                        } else {
                          history.push({
                            pathname: "/web/home/Mayagt",
                          });
                        }

                        setNotification(false);
                      }
                    }
                  })
                  .catch(function (error) {
                    alert("Aмжилтгүй");
                  });
              }
            });
          }
          //CHBA
          if (value.MODULE_TYPE === 4) {
            Data_Request({
              url: URL + "audit/",
              method: "POST",
              data: {
                FAS_AUDIT_ID: value.OT_AUDIT_ID,
              },
            }).then(async function (response) {
              if (response.data.length > 0) {
                Data_Request({
                  url: URL + "documentList/",
                  method: "POST",
                  data: {
                    FAS_AUDIT_ID: value.OT_AUDIT_ID,
                    MENU_TYPE: value.MENU_TYPE,
                    PERIOD_ID: value.PERIOD_ID,
                    SHILEN_TYPE_ID: value.SHILEN_TYPE_ID,
                  },
                })
                  .then(async function (docresponse) {
                    if (docresponse.data !== undefined) {
                      if (docresponse.data.length > 0) {
                        let listRole = await axios(
                          URL +
                            "qc_checkRole/" +
                            value.OT_AUDIT_ID +
                            "/" +
                            userDetils.USER_ID
                        );

                        localStorage.setItem(
                          "mayagtData",
                          JSON.stringify({
                            AuditData: response.data[0],
                            documents: docresponse.data,
                            Role: listRole.data,
                            Type: value,
                            CHBA: "QC",
                          })
                        );

                        if (history.location.pathname === "/web/home/Mayagt") {
                          history.replace({
                            pathname: "/web/home/Mayagt",
                          });
                          window.location.reload();
                        } else {
                          history.push({
                            pathname: "/web/home/Mayagt",
                          });
                        }

                        setNotification(false);
                      }
                    }
                  })
                  .catch(function (error) {
                    alert("Aмжилтгүй");
                  });
              }
            });
          }
        } else if (response?.data.message === "failed") {
          alert("Aмжилтгүй алдаа");
        }
      })
      .catch(function (error) {
        alert("Aмжилтгүй");
      });
  }

  function saveToDB() {
    if (requiredField()) {
      Data_Request({
        url: URL + "set_akt_user",
        method: "POST",
        data: data,
      })
        .then(async function (response) {
          if (
            (response.data?.code === 405 &&
              response.data?.result?.errorNum === 6502) ||
            (response.data?.code === 405 &&
              response.data?.result?.errorNum === 1461)
          ) {
            alert("Тэмдэгт хэтэрсэн байна");
          } else if (response?.data.message === "success") {
            alert("Aмжилттай хадгаллаа");
            setShowDialogOpen(false);
          } else if (response?.data.message === "failed") {
            alert("Aмжилтгүй алдаа");
          }
        })
        .catch(function (error) {
          alert("Aмжилтгүй");
        });
    }
  }
  async function userEdit() {
    let listItems = await axios(URL + "GET_AKT_USERS/" + userDetils?.ENT_ID);

    if (
      listItems?.data?.user_data.length > 0 &&
      listItems?.data?.user_data[0] !== undefined
    ) {
      loadData(listItems?.data.user_data[0]);
    }
    if (
      listItems?.data?.data.length > 0 &&
      listItems?.data?.data[0] !== undefined
    ) {
      loadData2(listItems?.data.data[0]);
    }
    if (
      listItems?.data?.shalgagdagch.length > 0 &&
      listItems?.data?.shalgagdagch[0] !== undefined
    ) {
      loadData3(listItems?.data.shalgagdagch[0]);
    }
  }
  async function getPass() {
    Data_Request({
      url: "https://fas.audit.mn/reg/api/v1/passGet",
      method: "POST",
      data: { USER_ID: userDetils.USER_ID },
    })
      .then(function (response) {
        if (response.data === undefined && response.data === null) {
          alert("өгөгдөл байхгүй байна");
        } else {
          setOldCode(response?.data);
        }
      })
      .catch(function (error) {
        alert("Aмжилтгүй");
      });
  }
  function changePass() {
    if (requiredField2()) {
      Data_Request({
        url: "https://fas.audit.mn/reg/api/v1/passChange",
        method: "POST",
        data: {
          NEWCODE: data4.NEWCODE,
          CREATED_BY: userDetils.USER_ID,
          USER_ID: userDetils.USER_ID,
        },
      })
        .then(async function (response) {
          if (
            (response.data?.code === 405 &&
              response.data?.result?.errorNum === 6502) ||
            (response.data?.code === 405 &&
              response.data?.result?.errorNum === 1461)
          ) {
            alert("Тэмдэгт хэтэрсэн байна");
          } else if (response?.data.message === "success") {
            alert("Aмжилттай хадгаллаа");
            setShowDialogPass(false);
          } else if (response?.data.message === "failed") {
            alert("Aмжилтгүй алдаа");
          }
        })
        .catch(function (error) {
          alert("Aмжилтгүй");
        });
    }
  }
  function requiredField() {
    if (
      data.LAST_NAME === undefined ||
      data.LAST_NAME === null ||
      data.LAST_NAME === ""
    ) {
      alert("Овог оруулна уу");
      return false;
    } else if (
      data.FIRST_NAME === undefined ||
      data.FIRST_NAME === null ||
      data.FIRST_NAME === ""
    ) {
      alert("Нэр оруулна уу");
      return false;
    } else if (
      data.POSTION_NAME === undefined ||
      data.POSTION_NAME === null ||
      data.POSTION_NAME === ""
    ) {
      alert("Албан тушаал оруулна уу");
      return false;
    } else if (
      data.PHONE === undefined ||
      data.PHONE === null ||
      data.PHONE === ""
    ) {
      alert("Утас оруулна уу");
      return false;
    } else {
      return true;
    }
  }
  function requiredField2() {
    if (oldCode !== data4?.OLDCODE) {
      alert("Одоогийн нууц үг таарахгүй байна");
      return false;
    } else if (
      data4.NEWCODE === undefined ||
      data4.NEWCODE === null ||
      data4.NEWCODE === ""
    ) {
      alert("Шинэ нууц үг оруулна уу");
      return false;
    } else if (data4?.NEWCODE !== data4?.NEWCODE2) {
      alert("Шинэ нууц үг таарахгүй байна");
      return false;
    } else {
      return true;
    }
  }
  function myFunction() {
    var x1 = document.getElementById("myInput1");
    var x2 = document.getElementById("myInput2");
    var x3 = document.getElementById("myInput3");
    if (
      x1.type === "password" ||
      x2.type === "password" ||
      x3.type === "password"
    ) {
      x1.type = "text";
      x2.type = "text";
      x3.type = "text";
    } else {
      x1.type = "password";
      x2.type = "password";
      x3.type = "password";
    }
  }
  return (
    <div className="sticky top-0 z-40 ">
      <div className="BackroundcolorBlue border-collapse ">
        <div
          style={{ padding: "0px 0px 0px 0px" }}
          className=" h-15  text-black"
        >
          <div
            style={{ borderRadius: "0px 0px 0px 40px" }}
            className="w-full h-13 px-5 flex  justify-between whiteColor"
          >
            <nav className="HideOnWeb">
              <div className="mb-4 px-4">
                <div className="space-y-6">
                  <button
                    className="mobile-menu-button focus:outline-none focus:bg-gray-600 flex justify-between"
                    onClick={() => props.setSidebarSwitch(!props.sidebarSwitch)}
                  >
                    <div className="w-full flex items-center text-blue-500 h-10  bg-gray-200 hover:bg-gray-200  cursor-pointer">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M4 6h16M4 12h16M4 18h16"
                        />
                      </svg>
                    </div>
                  </button>
                </div>
              </div>
            </nav>

            <div className="items-center flex">
              <nav className="HideOnMobile">
                <div className="relative text-gray-300">
                  <img src={logo} width="80" height="80" />
                </div>
              </nav>

              <div className="relative p-3 text-center">
                <span
                  className="text-center font-medium"
                  style={{ color: "#002d73" }}
                >
                  САНХҮҮГИЙН ТАЙЛАНГИЙН <br />
                  АУДИТЫН СИСТЕМ
                </span>
              </div>
            </div>
            <div className="flex items-center ">
              {notificationData.length > 0 ? (
                <div id="dropDown">
                  <Menu as="div" className="relative inline-block text-left">
                    <div>
                      <Menu.Button className=" text-center px-4 py-2 items-center inline-flex w-full justify-center rounded-md    text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-100">
                        <div
                          id="nav"
                          onClick={() => {
                            setNotification(true);
                          }}
                        >
                          <div class="messages">
                            {notificationData.filter((a) => a.IS_SHOW === 0)
                              .length > 0 ? (
                              <div class="badge">
                                <div class="message-count">
                                  {notificationData.filter(
                                    (a) => a.IS_SHOW === 0
                                  ).length >= 1000
                                    ? "999+"
                                    : notificationData.filter(
                                        (a) => a.IS_SHOW === 0
                                      ).length}
                                </div>
                              </div>
                            ) : null}
                          </div>
                        </div>
                        <span
                          onClick={() => {
                            setNotification(true);
                          }}
                          className="ml-1 mr-2"
                        >
                          Мэдэгдэл
                        </span>
                      </Menu.Button>
                    </div>
                  </Menu>
                </div>
              ) : null}
              <div id="dropDown">
                <Menu as="div" className="relative inline-block text-left">
                  <div>
                    <Menu.Button className=" text-center px-4 py-2 items-center inline-flex w-full justify-center rounded-md    text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-100">
                      <img
                        src={userPro}
                        className="w-8 h-8 rounded-full shadow-lg"
                      />
                      <span className="ml-2 mr-1">
                        {userDetils !== undefined ? userDetils?.USER_NAME : ""}{" "}
                      </span>
                      <img src={DownIcon} width="12px" className="" />
                    </Menu.Button>
                  </div>

                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-60 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="py-1">
                        <Menu.Item>
                          {({ active }) => (
                            <div
                              className="py-3 px-3 flex text-gray-700 dark:text-gray-200 dark:hover:text-white items-center justify-start"
                              style={{
                                borderBottom:
                                  "1px solid rgba(226, 225, 225, 0.7)",
                              }}
                            >
                              <img src={userPro} className="user_photo" />
                              <div className="break-all text-xs ml-4">
                                <span className="font-bold">
                                  {userDetils !== undefined
                                    ? userDetils?.DEPARTMENT_NAME
                                    : ""}{" "}
                                </span>
                                <br />
                                <span className="font-thin">
                                  {userDetils !== undefined
                                    ? userDetils?.USER_NAME
                                    : ""}{" "}
                                </span>
                              </div>
                            </div>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <>
                              {userDetils.USER_TYPE_NAME === "AKT_ORG" ||
                              userDetils.USER_TYPE_NAME === "ADMIN" ? (
                                <div
                                  className="py-1 px-2 flex text-gray-700 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 justify-start dark:hover:text-white items-center ml-3"
                                  onClick={() => {
                                    setShowDialogOpen(true);
                                    userEdit();
                                  }}
                                >
                                  <img src={user_edit} width="20px" />
                                  <span className="block py-2 px-2 text-sm ">
                                    Бүртгэл засах
                                  </span>
                                </div>
                              ) : null}
                            </>
                          )}
                        </Menu.Item>
                      </div>
                      <div className="py-1">
                        <Menu.Item>
                          {({ active }) => (
                            <div
                              className="py-1 px-2 flex text-gray-700 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 justify-start dark:hover:text-white items-center ml-3"
                              onClick={() => {
                                setShowDialogPass(true);
                                getPass();
                              }}
                            >
                              <img src={password} width="20px" />
                              <span className="block py-2 px-2 text-sm ">
                                Нууц үг солих
                              </span>
                            </div>
                          )}
                        </Menu.Item>
                      </div>
                      <div className="py-1">
                        <Menu.Item>
                          {({ active }) => (
                            <div
                              className="py-1 px-2 flex text-gray-700 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 justify-start dark:hover:text-white items-center ml-3"
                              onClick={() => logOutFunction()}
                            >
                              <img src={log_out} width="20px" />
                              <span className="block py-2 px-2 text-sm ">
                                Гарах{" "}
                              </span>
                            </div>
                          )}
                        </Menu.Item>
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-row justify-end">
        <div className="BackroundcolorBlue w-full h-0.5 "></div>
        <div
          style={{
            // borderTop: "8px solid #2684fe",
            width: "25%",
            height: "8px",
            backgroundColor: "#2684fe",
            marginTop: "-3px",
          }}
        ></div>
      </div>
    </div>
  );
}
export default Header;
