import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/zurag/logo.png";
import imagebackground from "../assets/zurag/background.png";
import {
  userPro,
  DownIcon,
  saveIcon,
  y,
  user_edit,
  log_out,
  password,
} from "../assets/zurag";
import React, { useState, useEffect, useRef } from "react";
import URL from "../Stat_URL";
// import { Data_Request } from "../functions/make_Request";

import { Menu, Transition } from "@headlessui/react";

function Header(props) {
  const [notification, setNotification] = useState(false);
  const [notificationData, setNotificationData] = useState([]);
  const [showDialogOpen, setShowDialogOpen] = useState(false);
  const [showDialogPass, setShowDialogPass] = useState(false);
  let navigate = useNavigate();
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));
  const ref = useRef(null);
  const [data, loadData] = useState({
    ID: null,
    ENT_ID: userDetails.ENT_ID,
    FIRST_NAME: null,
    LAST_NAME: null,
    POSTION_NAME: null,
    PHONE: null,
    CREATED_BY: userDetails.USER_ID,
    IS_ACTIVE: 1,
  });

  const dataTable = React.useMemo(
    () => (notificationData.length > 0 ? notificationData : []),
    [notificationData]
  );
  const [notfilter, setFilter] = useState({
    AUDIT_CODE: null,
    TYPE: null,
  });
  function logOutFunction() {
    localStorage.removeItem("userDetails");
    navigate("/");
  }
  return (
    <div className="sticky top-0 z-40 ">
      <div className="BackroundcolorBlue border-collapse ">
        <div
          style={{ padding: "0px 0px 0px 0px" }}
          className=" h-15  text-black"
        >
          <div className="w-full h-13 px-5 flex  justify-between whiteColor Hide_User_about_onWeb Header_border">
            <nav className="HideOnWeb">
              <div className="mb-4 px-4">
                <div className="space-y-6">
                  <button
                    className="mobile-menu-button focus:outline-none focus:bg-gray-600 flex justify-between mt-4 -ml-2"
                    onClick={() => props.setSidebarSwitch(!props.sidebarSwitch)}
                  >
                    <div className="w-full flex items-center text-blue-500 h-10  bg-gray-50 hover:bg-gray-200  cursor-pointer rounded-md">
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
                  className="
                  text-center 
                  font-medium"
                  style={{ color: "#002d73" }}
                >
                  ҮНДЭСНИЙ АУДИТЫН
                  <br />
                  ГАЗАР
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
                          <div className="messages">
                            {notificationData.filter((a) => a.IS_SHOW === 0)
                              .length > 0 ? (
                              <div className="badge">
                                <div className="message-count">
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
                <Menu as="div" className="relative inline-block text-left ">
                  <div>
                    <Menu.Button className=" text-center px-4 py-2 items-center inline-flex w-full justify-center rounded-md    text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-100 Hide_User_about_onWeb">
                      <img
                        src={userPro}
                        className="w-8 h-8 rounded-full shadow-lg"
                      />
                      <span className="ml-2 mr-1 HideOnMobile">
                        {userDetails !== undefined
                          ? userDetails?.USER_NAME
                          : ""}{" "}
                      </span>
                      <img
                        src={DownIcon}
                        width="12px"
                        className="HideOnMobile"
                      />
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
                                  {userDetails !== undefined
                                    ? userDetails?.DEPARTMENT_NAME
                                    : ""}{" "}
                                </span>
                                <br />
                                <span className="font-thin">
                                  {userDetails !== undefined
                                    ? userDetails?.USER_NAME
                                    : ""}{" "}
                                </span>
                              </div>
                            </div>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <>
                              {userDetails.USER_TYPE_NAME === "AKT_ORG" ||
                              userDetails.USER_TYPE_NAME === "ADMIN" ? (
                                <div
                                  className="py-1 px-2 flex text-gray-700 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 justify-start dark:hover:text-white items-center ml-3"
                                  onClick={() => {
                                    setShowDialogOpen(true);
                                    // userEdit();
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
                                // getPass();
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
