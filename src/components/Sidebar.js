import React, { useEffect, useState } from "react";
import right from "../assets/zurag/icons/2sum-right.png";
import left from "../assets/zurag/icons/2sum-left.png";
import "../assets/css/main.css";
import { useNavigate } from "react-router-dom";
import URL from "../Stat_URL";
import {
  help,
  HUVAARI_TSENHER,
  HUVAARI_TSAGAAN,
  TAILAN_TSENHER,
  TAILAN_TSAGAAN,
  BODIT_TSAG_TSAGAAN,
  BODIT_TSAG_TSENHER,
  Statictic1,
  Statictic2,
} from "../assets/zurag";

function Sidebar(props) {
  const userDetils = JSON.parse(localStorage.getItem("userDetails"));
  const [style, setStyle] = useState("block");
  const Navigate = useNavigate();
  const [icons, setIcons] = useState({
    menu1: Statictic2,
    menu1Color: "white",
    menu2: Statictic1,
    menu2Color: "white",
  });

  useEffect(() => {
    if (props.sidebarSwitch) {
      setStyle("hide");
    } else {
      setStyle("block");
    }
  }, [[props]]);

  function SelectMenu(value) {
    if (value === 1) {
      Navigate("/web/Home/Audit");
    }
    if (value === 2) {
      Navigate("/web/CM/ReportAudit");
    }
  }
  return !props.sidebarSize ? (
    <div className="SideBarHidden" id="SideMenuZurag">
      <div className={props.sidebarSwitch ? "sidebar" : "sidebarHideshow"}>
        <div
          id="SideMenuZurag"
          style={{ borderRadius: " 0px 40px 0px 0px" }}
          className="duration-500 w-1/2 md:w-1/3 lg:w-60 fixed md:top-16 md:left-0 h-screen lg:block  border-r z-30 shadow-2xl BackroundcolorBlue"
        >
          <div
            style={{ padding: "80px 0px 50px 15px" }}
            className="mb-16 px-8 mt-20"
          >
            <div className="space-y-6">
              {userDetils.USER_TYPE_NAME === "OT_CREATOR" ? (
                //||userDetils.USER_TYPE_NAME === "OT_CHECK"
                <div className="dropdown  relative"></div>
              ) : userDetils.USER_TYPE_NAME === "KHSHUDAG" ? (
                <></>
              ) : (
                <>
                  <div
                    onClick={() => SelectMenu(1)}
                    className="w-full flex items-center  h-16 pl-3 hover:bg-white  cursor-pointer"
                    style={{ borderBottomLeftRadius: "28px" }}
                    onMouseOver={() => {
                      setIcons({
                        ...icons,
                        ...{ menu1: Statictic2, menu1Color: "#2684fe" },
                      });
                    }}
                    onMouseOut={() => {
                      setIcons({
                        ...icons,
                        ...{ menu1: Statictic2, menu1Color: "white" },
                      });
                    }}
                  >
                    <img src={icons.menu1} width="60" height="52"></img>
                    <span
                      className="uppercase"
                      style={{ color: icons.menu1Color, marginLeft: "6px" }}
                    >
                      БҮРТГЭЛИЙН МАЯГТ
                    </span>
                  </div>

                  <div
                    onClick={() => SelectMenu(2)}
                    className="w-full flex items-center  h-16 pl-1.5 hover:bg-white  cursor-pointer"
                    style={{ borderBottomLeftRadius: "28px" }}
                    onMouseOver={() => {
                      setIcons({
                        ...icons,
                        ...{ menu2: Statictic1, menu2Color: "#2684fe" },
                      });
                    }}
                    onMouseOut={() => {
                      setIcons({
                        ...icons,
                        ...{ menu2: Statictic1, menu2Color: "white" },
                      });
                    }}
                  >
                    <img src={icons.menu2} width="60" height="52"></img>
                    <span
                      className="uppercase"
                      style={{ color: icons.menu2Color, marginRight: "10px" }}
                    >
                      СТАТИСТИК МЭДЭЭ
                    </span>
                  </div>
                </>
              )}

              <div
                style={{
                  position: "absolute",
                  height: "100hv",
                  paddingLeft: "1.3rem",
                  paddingTop: window.innerHeight - 750,
                }}
                className="closemenu inline-flex h-2/4 items-center"
                onClick={() => props.setSidebarSize(!props.sidebarSize)}
              >
                <img src={left} width="40" height="30" />
              </div>
            </div>
          </div>

          <div
            style={{
              position: "absolute",
              height: "100hv",

              paddingTop: window.innerHeight - 630,
              paddingLeft: "0.5rem",
              display: "flex",
              cursor: "pointer",
              alignItems: "center",
            }}
          >
            <a
              href={
                URL.replace("api/v1/", "") + "static" + "/fas_handbook_v1.pdf"
              }
              rel="noopener noreferrer"
              target="_blank"
              className="inline-flex h-20 items-center "
            >
              <img src={help} width="40" height="40" />
              <span
                className="text-white uppercase pl-2"
                style={{ marginTop: "-5px" }}
              >
                Гарын авлага татах
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="SideBarHidden">
      <div className={props.sidebarSwitch ? "sidebar" : "sidebarHideshow"}>
        <div
          style={{ borderRadius: " 0px 40px 40px 0px" }}
          className="duration-500 w-1/2  md:w-1/3 lg:w-20 fixed md:top-16 md:left-0 h-screen lg:block BackroundcolorBlue border-r z-30 shadow-2xl"
        >
          <div
            style={{ padding: "80px 0px 40px 2px" }}
            className="mb-8 px-4 mt-20"
          >
            <div className="space-y-6">
              {userDetils.USER_TYPE_NAME === "OT_CREATOR" ? (
                //||userDetils.USER_TYPE_NAME === "OT_CHECK"
                <div className="dropdown  relative ">
                  <div
                    onMouseOver={() => {
                      setIcons({
                        ...icons,
                        ...{ menu3: BODIT_TSAG_TSAGAAN, menu3Color: "#2684fe" },
                      });
                    }}
                    onMouseOut={() => {
                      setIcons({
                        ...icons,
                        ...{ menu3: BODIT_TSAG_TSENHER, menu3Color: "white" },
                      });
                    }}
                  ></div>
                </div>
              ) : userDetils.USER_TYPE_NAME === "KHSHUDAG" ? (
                <div
                  onClick={() => SelectMenu(2)}
                  className="w-full flex items-center  h-14 pl-1.5 hover:bg-white  cursor-pointer"
                  style={{ borderBottomLeftRadius: "28px" }}
                  onMouseOver={() => {
                    setIcons({
                      ...icons,
                      ...{ menu2: Statictic1, menu2Color: "#2684fe" },
                    });
                  }}
                  onMouseOut={() => {
                    setIcons({
                      ...icons,
                      ...{ menu2: Statictic1, menu2Color: "white" },
                    });
                  }}
                >
                  <img src={icons.menu2} width="60" height="52"></img>
                </div>
              ) : userDetils.USER_TYPE_NAME === "AKT_ORG" ? (
                <> </>
              ) : (
                <>
                  <div
                    onClick={() => SelectMenu(1)}
                    className="w-full flex items-center h-20 pl-3 hover:bg-white  cursor-pointer"
                    style={{ borderBottomLeftRadius: "28px" }}
                    onMouseOver={() => {
                      setIcons({
                        ...icons,
                        ...{ menu1: Statictic2, menu1Color: "#2684fe" },
                      });
                    }}
                    onMouseOut={() => {
                      setIcons({
                        ...icons,
                        ...{ menu1: Statictic2, menu1Color: "white" },
                      });
                    }}
                  >
                    <img src={icons.menu1} width="60" height="52"></img>
                  </div>

                  <div
                    onClick={() => SelectMenu(2)}
                    className="w-full flex items-center  h-20 pl-1.5 hover:bg-white  cursor-pointer"
                    style={{ borderBottomLeftRadius: "28px" }}
                    onMouseOver={() => {
                      setIcons({
                        ...icons,
                        ...{ menu2: Statictic1, menu2Color: "#2684fe" },
                      });
                    }}
                    onMouseOut={() => {
                      setIcons({
                        ...icons,
                        ...{ menu2: Statictic1, menu2Color: "white" },
                      });
                    }}
                  >
                    <img src={icons.menu2} width="60" height="52"></img>
                  </div>
                </>
              )}

              <div
                style={{
                  position: "absolute",
                  height: "100hv",
                  paddingLeft: "1.3rem",
                  paddingTop: window.innerHeight - 750,
                }}
                className="closemenu inline-flex h-2/4 items-center "
                onClick={() => props.setSidebarSize(!props.sidebarSize)}
              >
                <img src={right} width="35" height="30" />
              </div>
            </div>
          </div>
          <div
            style={{
              position: "absolute",
              height: "100hv",
              paddingLeft: "1.3rem",
              paddingTop: window.innerHeight - 630,
            }}
          >
            <a
              href={
                URL.replace("api/v1/", "") + "static" + "/fas_handbook_v1.pdf"
              }
              rel="noopener noreferrer"
              target="_blank"
              className="inline-flex h-20 items-center "
            >
              <img
                src={help}
                width="35"
                height="30"
                style={{ cursor: "pointer" }}
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
