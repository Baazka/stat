import React, { useEffect, useState } from "react";
import right from "../assets/zurag/icons/2sum-right.png";
import left from "../assets/zurag/icons/2sum-left.png";
import "../assets/css/main.css";
import { useHistory } from "react-router-dom";
import URL from "../Stat_URL";
import {
  sum,
  DownArrowW,
  help,
  HUVAARI_TSENHER,
  HUVAARI_TSAGAAN,
  TAILAN_TSENHER,
  TAILAN_TSAGAAN,
  BODIT_TSAG_TSAGAAN,
  BODIT_TSAG_TSENHER,
  ERSDELTEI_ASUUDLIIN_BURTGEL_TSAGAAN,
  ERSDELTEI_ASUUDLIIN_BURTGEL_TSENHER,
  BODIT_TSAGIIN_AUDITIIN_HUVAARI_TSAGAAN,
  BODIT_TSAGIIN_AUDITIIN_HUVAARI_TSENHER,
  BIYLELTIIN_TAILAN_TSAGAAN,
  BIYLELTIIN_TAILAN_TSENHER,
  QC_Menu_Blue,
  QC_Menu_White,
  SEDEV_TSENHER,
  SEDEV_TSAGAAN,
} from "../assets/zurag";

function Sidebar(props) {
  const userDetils = JSON.parse(localStorage.getItem("userDetails"));
  const [style, setStyle] = useState("block");
  const history = useHistory();
  const [icons, setIcons] = useState({
    menu1: HUVAARI_TSAGAAN,
    menu1Color: "white",
    menu2: TAILAN_TSAGAAN,
    menu2Color: "white",
    menu3: BODIT_TSAG_TSAGAAN,
    menu3Color: "white",
    menu4: ERSDELTEI_ASUUDLIIN_BURTGEL_TSAGAAN,
    menu4Color: "white",
    menu5: BODIT_TSAGIIN_AUDITIIN_HUVAARI_TSAGAAN,
    menu5Color: "white",
    menu6: BIYLELTIIN_TAILAN_TSAGAAN,
    menu6Color: "white",
    menu7: QC_Menu_White,
    menu7Color: "white",
    menu8: SEDEV_TSAGAAN,
    menu8Color: "white",
  });
  function download(url, filename) {
    fetch(url)
      .then((response) => response.blob())
      .then((blob) => {
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = filename;
        link.click();
      })
      .catch(console.error);
  }

  useEffect(() => {
    if (props.sidebarSwitch) {
      setStyle("hide");
    } else {
      setStyle("block");
    }
  }, [[props]]);

  function SelectMenu(value) {
    if (value === 1) {
      history.push("/web/Home/Audit");
    }
    if (value === 2) {
      history.push("/web/Home/Reporting_Audit");
    }
    // if (value === 3) {
    //   bodit tsag menu;
    // }
    if (value === 4) {
      history.push("/web/Home/Audit_gomdol");
    }
    if (value === 5) {
      history.push("/web/Home/audit_huviar_OT");
    }
    if (value === 6) {
      history.push("/web/Home/Act_huviar");
    }
    if (value === 7) {
      history.push("/web/Home/qc_huviar");
    }
    if (value === 8) {
      history.push("/web/Home/subject_huviar");
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
            style={{ padding: "80px 0px 0px 10px" }}
            className="mb-4 px-4 mt-10"
          >
            <div className="space-y-6">
              {userDetils.USER_TYPE_NAME === "OT_CREATOR" ? (
                //||userDetils.USER_TYPE_NAME === "OT_CHECK"
                <div className="dropdown  relative">
                  <div
                    onMouseOver={() => {
                      setIcons({
                        ...icons,
                        ...{ menu3: BODIT_TSAG_TSENHER, menu3Color: "#2684fe" },
                      });
                    }}
                    onMouseOut={() => {
                      setIcons({
                        ...icons,
                        ...{ menu3: BODIT_TSAG_TSAGAAN, menu3Color: "white" },
                      });
                    }}
                  >
                    <div
                      className="w-full flex items-center  h-14 pl-8 hover:bg-white  cursor-pointer"
                      style={{
                        borderBottomLeftRadius: "28px",
                        backgroundColor:
                          icons.menu3Color === "white"
                            ? "transparent"
                            : "white",
                      }}
                    >
                      <img src={icons.menu3} width="35" height="90"></img>
                      <span
                        className="uppercase"
                        style={{ color: icons.menu3Color, marginLeft: "6px" }}
                      >
                        БОДИТ ЦАГ
                      </span>
                      <img
                        src={icons.menu3Color === "white" ? DownArrowW : sum}
                        width="27"
                        height="60"
                        style={{ marginLeft: "10px" }}
                      ></img>
                    </div>
                    <ul className="dropdown-menu  hidden  text-white pl-10">
                      <li className="">
                        <a
                          className="SubmenuBackColor p-2 whitespace-no-wrap flex"
                          onClick={() => SelectMenu(4)}
                        >
                          <img
                            className=""
                            src={icons.menu4}
                            width="30"
                            height="30"
                          ></img>
                          <label className="ml-2">
                            Эрсдэлтэй асуудлын бүртгэл
                          </label>
                        </a>
                      </li>
                      <li className="">
                        <a
                          className="SubmenuBackColor p-2 whitespace-no-wrap flex"
                          style={{
                            borderBottomLeftRadius: "18px",
                            paddingBottom: "1rem",
                            paddingLeft: "0.5rem",
                            paddingTop: "1rem",
                          }}
                          onClick={() => SelectMenu(5)}
                        >
                          <img
                            className=""
                            src={BODIT_TSAGIIN_AUDITIIN_HUVAARI_TSAGAAN}
                            width="30"
                            height="30"
                          ></img>
                          <label className="ml-2">
                            Бодит цагийн аудитын хуваарь
                          </label>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              ) : userDetils.USER_TYPE_NAME === "KHSHUDAG" ? (
                <div
                  onClick={() => SelectMenu(2)}
                  className="w-full flex items-center  h-14 pl-9 hover:bg-white  cursor-pointer"
                  style={{ borderBottomLeftRadius: "28px" }}
                  onMouseOver={() => {
                    setIcons({
                      ...icons,
                      ...{ menu2: TAILAN_TSENHER, menu2Color: "#2684fe" },
                    });
                  }}
                  onMouseOut={() => {
                    setIcons({
                      ...icons,
                      ...{ menu2: TAILAN_TSAGAAN, menu2Color: "white" },
                    });
                  }}
                >
                  <img src={icons.menu2} width="28" height="36"></img>
                  <span
                    className="uppercase"
                    style={{ color: icons.menu2Color, marginLeft: "6px" }}
                  >
                    тайлан
                  </span>
                </div>
              ) : userDetils.USER_TYPE_NAME === "AKT_ORG" ? (
                <>
                  <div
                    onClick={() => SelectMenu(6)}
                    className="w-full flex items-center  h-14 pl-9 hover:bg-white  cursor-pointer"
                    style={{ borderBottomLeftRadius: "28px" }}
                    onMouseOver={() => {
                      setIcons({
                        ...icons,
                        ...{
                          menu6: BIYLELTIIN_TAILAN_TSENHER,
                          menu6Color: "#2684fe",
                        },
                      });
                    }}
                    onMouseOut={() => {
                      setIcons({
                        ...icons,
                        ...{
                          menu6: BIYLELTIIN_TAILAN_TSAGAAN,
                          menu6Color: "white",
                        },
                      });
                    }}
                  >
                    <img src={icons.menu6} width="28" height="36"></img>
                    <span
                      className="uppercase"
                      style={{ color: icons.menu6Color, marginLeft: "6px" }}
                    >
                      БИЕЛЭЛТИЙН ТАЙЛАН
                    </span>
                  </div>
                  <div
                    onClick={() => SelectMenu(2)}
                    className="w-full flex items-center  h-14 pl-9 hover:bg-white  cursor-pointer"
                    style={{ borderBottomLeftRadius: "28px" }}
                    onMouseOver={() => {
                      setIcons({
                        ...icons,
                        ...{ menu2: TAILAN_TSENHER, menu2Color: "#2684fe" },
                      });
                    }}
                    onMouseOut={() => {
                      setIcons({
                        ...icons,
                        ...{ menu2: TAILAN_TSAGAAN, menu2Color: "white" },
                      });
                    }}
                  >
                    <img src={icons.menu2} width="28" height="36"></img>
                    <span
                      className="uppercase"
                      style={{ color: icons.menu2Color, marginLeft: "6px" }}
                    >
                      тайлан
                    </span>
                  </div>
                </>
              ) : (
                <>
                  <div
                    onClick={() => SelectMenu(1)}
                    className="w-full flex items-center  h-14 pl-9 hover:bg-white  cursor-pointer"
                    style={{ borderBottomLeftRadius: "28px" }}
                    onMouseOver={() => {
                      setIcons({
                        ...icons,
                        ...{ menu1: HUVAARI_TSENHER, menu1Color: "#2684fe" },
                      });
                    }}
                    onMouseOut={() => {
                      setIcons({
                        ...icons,
                        ...{ menu1: HUVAARI_TSAGAAN, menu1Color: "white" },
                      });
                    }}
                  >
                    <img src={icons.menu1} width="28" height="36"></img>
                    <span
                      className="uppercase"
                      style={{ color: icons.menu1Color, marginLeft: "6px" }}
                    >
                      хуваарь
                    </span>
                  </div>

                  <div
                    onClick={() => SelectMenu(2)}
                    className="w-full flex items-center  h-14 pl-9 hover:bg-white  cursor-pointer"
                    style={{ borderBottomLeftRadius: "28px" }}
                    onMouseOver={() => {
                      setIcons({
                        ...icons,
                        ...{ menu2: TAILAN_TSENHER, menu2Color: "#2684fe" },
                      });
                    }}
                    onMouseOut={() => {
                      setIcons({
                        ...icons,
                        ...{ menu2: TAILAN_TSAGAAN, menu2Color: "white" },
                      });
                    }}
                  >
                    <img src={icons.menu2} width="28" height="36"></img>
                    <span
                      className="uppercase"
                      style={{ color: icons.menu2Color, marginLeft: "6px" }}
                    >
                      тайлан
                    </span>
                  </div>
                  <div className="dropdown  relative">
                    <div
                      onMouseOver={() => {
                        setIcons({
                          ...icons,
                          ...{
                            menu3: BODIT_TSAG_TSENHER,
                            menu3Color: "#2684fe",
                          },
                        });
                      }}
                      onMouseOut={() => {
                        setIcons({
                          ...icons,
                          ...{ menu3: BODIT_TSAG_TSAGAAN, menu3Color: "white" },
                        });
                      }}
                    >
                      <div
                        className="w-full flex items-center  h-14 pl-8 hover:bg-white  cursor-pointer"
                        style={{
                          borderBottomLeftRadius: "28px",
                          backgroundColor:
                            icons.menu3Color === "white"
                              ? "transparent"
                              : "white",
                        }}
                      >
                        <img src={icons.menu3} width="35" height="90"></img>
                        <span
                          className="uppercase"
                          style={{
                            color: icons.menu3Color,
                            marginLeft: "6px",
                          }}
                        >
                          БОДИТ ЦАГ
                        </span>
                        <img
                          src={icons.menu3Color === "white" ? DownArrowW : sum}
                          width="27"
                          height="60"
                          style={{ marginLeft: "10px" }}
                        ></img>
                      </div>
                      <ul className="dropdown-menu  hidden  text-white pl-10">
                        <li className="">
                          <a
                            className="SubmenuBackColor p-2 whitespace-no-wrap flex"
                            onClick={() => SelectMenu(4)}
                          >
                            <img
                              className=""
                              src={icons.menu4}
                              width="30"
                              height="30"
                            ></img>
                            <label className="ml-2">
                              Эрсдэлтэй асуудлын бүртгэл
                            </label>
                          </a>
                        </li>
                        <li className="">
                          <a
                            className="SubmenuBackColor p-2 whitespace-no-wrap flex"
                            style={{
                              borderBottomLeftRadius: "18px",
                              paddingBottom: "1rem",
                              paddingLeft: "0.5rem",
                              paddingTop: "1rem",
                            }}
                            onClick={() => SelectMenu(5)}
                          >
                            <img
                              className=""
                              src={BODIT_TSAGIIN_AUDITIIN_HUVAARI_TSAGAAN}
                              width="30"
                              height="30"
                            ></img>
                            <label className="ml-2">
                              Бодит цагийн аудитын хуваарь
                            </label>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>

                  {/* ACT */}
                  <div
                    onClick={() => SelectMenu(6)}
                    className="w-full flex items-center  h-14 pl-9 hover:bg-white  cursor-pointer"
                    style={{ borderBottomLeftRadius: "28px" }}
                    onMouseOver={() => {
                      setIcons({
                        ...icons,
                        ...{
                          menu6: BIYLELTIIN_TAILAN_TSENHER,
                          menu6Color: "#2684fe",
                        },
                      });
                    }}
                    onMouseOut={() => {
                      setIcons({
                        ...icons,
                        ...{
                          menu6: BIYLELTIIN_TAILAN_TSAGAAN,
                          menu6Color: "white",
                        },
                      });
                    }}
                  >
                    <img src={icons.menu6} width="28" height="36"></img>
                    <span
                      className="uppercase"
                      style={{ color: icons.menu6Color, marginLeft: "6px" }}
                    >
                      БИЕЛЭЛТИЙН ТАЙЛАН
                    </span>
                  </div>
                  {/* ЧАНАРЫН БАТАЛГААЖУУЛАЛТ */}
                  {userDetils.USER_TYPE_NAME === "HEAD_CHBG" ||
                  userDetils.USER_TYPE_NAME === "ADMIN" ? (
                    <div
                      onClick={() => SelectMenu(7)}
                      className="w-full flex items-center  h-14 pl-9 hover:bg-white  cursor-pointer"
                      style={{ borderBottomLeftRadius: "28px" }}
                      onMouseOver={() => {
                        setIcons({
                          ...icons,
                          ...{ menu7: QC_Menu_Blue, menu7Color: "#2684fe" },
                        });
                      }}
                      onMouseOut={() => {
                        setIcons({
                          ...icons,
                          ...{ menu7: QC_Menu_White, menu7Color: "white" },
                        });
                      }}
                    >
                      <img src={icons.menu7} width="28" height="36"></img>
                      <span
                        className="uppercase"
                        style={{ color: icons.menu7Color, marginLeft: "6px" }}
                      >
                        ЧАНАРЫН БАТАЛГААЖУУЛАЛТ
                      </span>
                    </div>
                  ) : null}
                  {/* СЭДЭВ СОНГОЛТ */}
                  {userDetils.USER_TYPE_NAME === "ADMIN" ? (
                    <div
                      onClick={() => SelectMenu(8)}
                      className="w-full flex items-center  h-14 pl-9 hover:bg-white  cursor-pointer"
                      style={{ borderBottomLeftRadius: "28px" }}
                      onMouseOver={() => {
                        setIcons({
                          ...icons,
                          ...{ menu8: SEDEV_TSENHER, menu8Color: "#2684fe" },
                        });
                      }}
                      onMouseOut={() => {
                        setIcons({
                          ...icons,
                          ...{ menu8: SEDEV_TSAGAAN, menu8Color: "white" },
                        });
                      }}
                    >
                      <img src={icons.menu8} width="28" height="36"></img>
                      <span
                        className="uppercase"
                        style={{ color: icons.menu8Color, marginLeft: "6px" }}
                      >
                        СЭДЭВ СОНГОЛТ
                      </span>
                    </div>
                  ) : null}
                </>
              )}

              <div
                style={{
                  position: "absolute",
                  height: "100hv",
                  paddingLeft: "1.3rem",
                  paddingTop: window.innerHeight - 750,
                }}
                className="closemenu"
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
              without
              rel="noopener noreferrer"
              target="_blank"
              className="inline-flex mb-2 items-center "
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
          style={{ borderRadius: " 0px 40px 0px 0px" }}
          className="duration-500 w-1/2  md:w-1/3 lg:w-20 fixed md:top-16 md:left-0 h-screen lg:block BackroundcolorBlue border-r z-30 shadow-2xl"
        >
          <div
            style={{ padding: "80px 0px 0px 2px" }}
            className="mb-4 px-4 mt-10"
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
                  >
                    <div
                      className="w-full flex items-center  h-14 pl-5 hover:bg-white  cursor-pointer"
                      style={{
                        borderBottomLeftRadius: "28px",
                        backgroundColor:
                          icons.menu3Color === "white"
                            ? "transparent"
                            : "white",
                      }}
                    >
                      <img src={icons.menu3} width="35" height="90"></img>

                      <img
                        src={icons.menu3Color === "white" ? DownArrowW : sum}
                        width="20"
                      ></img>
                    </div>
                    <ul className="dropdown-menu  hidden  text-white pl-8">
                      <li className="">
                        <a
                          className="SubmenuBackColor   p-2 whitespace-no-wrap flex "
                          onClick={() => SelectMenu(4)}
                        >
                          <img
                            className=""
                            src={icons.menu4}
                            width="30"
                            height="30"
                          ></img>
                        </a>
                      </li>
                      <li
                        className="SubmenuBackColor   whitespace-no-wrap flex "
                        style={{
                          borderBottomLeftRadius: "18px",
                          paddingBottom: "1rem",
                          paddingLeft: "0.5rem",
                          paddingTop: "1rem",
                        }}
                      >
                        <a onClick={() => SelectMenu(5)}>
                          <img
                            className=""
                            src={BODIT_TSAGIIN_AUDITIIN_HUVAARI_TSAGAAN}
                            width="30"
                            height="30"
                          ></img>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              ) : userDetils.USER_TYPE_NAME === "KHSHUDAG" ? (
                <div
                  onClick={() => SelectMenu(2)}
                  className="w-full flex items-center  h-14 pl-6 hover:bg-white  cursor-pointer"
                  style={{ borderBottomLeftRadius: "28px" }}
                  onMouseOver={() => {
                    setIcons({
                      ...icons,
                      ...{ menu2: TAILAN_TSENHER, menu2Color: "#2684fe" },
                    });
                  }}
                  onMouseOut={() => {
                    setIcons({
                      ...icons,
                      ...{ menu2: TAILAN_TSAGAAN, menu2Color: "white" },
                    });
                  }}
                >
                  <img src={icons.menu2} width="28" height="36"></img>
                </div>
              ) : userDetils.USER_TYPE_NAME === "AKT_ORG" ? (
                <>
                  {" "}
                  <div
                    onClick={() => SelectMenu(6)}
                    className="w-full flex items-center  h-14 pl-6 hover:bg-white  cursor-pointer"
                    style={{ borderBottomLeftRadius: "28px" }}
                    onMouseOver={() => {
                      setIcons({
                        ...icons,
                        ...{
                          menu6: BIYLELTIIN_TAILAN_TSENHER,
                          menu6Color: "#2684fe",
                        },
                      });
                    }}
                    onMouseOut={() => {
                      setIcons({
                        ...icons,
                        ...{
                          menu6: BIYLELTIIN_TAILAN_TSAGAAN,
                          menu6Color: "white",
                        },
                      });
                    }}
                  >
                    <img src={icons.menu6} width="28" height="40"></img>
                  </div>
                  <div
                    onClick={() => SelectMenu(2)}
                    className="w-full flex items-center  h-14 pl-6 hover:bg-white  cursor-pointer"
                    style={{ borderBottomLeftRadius: "28px" }}
                    onMouseOver={() => {
                      setIcons({
                        ...icons,
                        ...{ menu2: TAILAN_TSENHER, menu2Color: "#2684fe" },
                      });
                    }}
                    onMouseOut={() => {
                      setIcons({
                        ...icons,
                        ...{ menu2: TAILAN_TSAGAAN, menu2Color: "white" },
                      });
                    }}
                  >
                    <img src={icons.menu2} width="28" height="36"></img>
                  </div>
                </>
              ) : (
                <>
                  <div
                    onClick={() => SelectMenu(1)}
                    className="w-full flex items-center  h-14 pl-6 hover:bg-white  cursor-pointer"
                    style={{ borderBottomLeftRadius: "28px" }}
                    onMouseOver={() => {
                      setIcons({
                        ...icons,
                        ...{ menu1: HUVAARI_TSENHER, menu1Color: "#2684fe" },
                      });
                    }}
                    onMouseOut={() => {
                      setIcons({
                        ...icons,
                        ...{ menu1: HUVAARI_TSAGAAN, menu1Color: "white" },
                      });
                    }}
                  >
                    <img src={icons.menu1} width="28" height="36"></img>
                  </div>

                  <div
                    onClick={() => SelectMenu(2)}
                    className="w-full flex items-center  h-14 pl-6 hover:bg-white  cursor-pointer"
                    style={{ borderBottomLeftRadius: "28px" }}
                    onMouseOver={() => {
                      setIcons({
                        ...icons,
                        ...{ menu2: TAILAN_TSENHER, menu2Color: "#2684fe" },
                      });
                    }}
                    onMouseOut={() => {
                      setIcons({
                        ...icons,
                        ...{ menu2: TAILAN_TSAGAAN, menu2Color: "white" },
                      });
                    }}
                  >
                    <img src={icons.menu2} width="28" height="36"></img>
                  </div>
                  <div className="dropdown  relative ">
                    <div
                      onMouseOver={() => {
                        setIcons({
                          ...icons,
                          ...{
                            menu3: BODIT_TSAG_TSENHER,
                            menu3Color: "#2684fe",
                          },
                        });
                      }}
                      onMouseOut={() => {
                        setIcons({
                          ...icons,
                          ...{ menu3: BODIT_TSAG_TSAGAAN, menu3Color: "white" },
                        });
                      }}
                    >
                      <div
                        className="w-full flex items-center  h-14 pl-5 hover:bg-white  cursor-pointer"
                        style={{
                          borderBottomLeftRadius: "28px",
                          backgroundColor:
                            icons.menu3Color === "white"
                              ? "transparent"
                              : "white",
                        }}
                      >
                        <img src={icons.menu3} width="35" height="90"></img>

                        <img
                          src={icons.menu3Color === "white" ? DownArrowW : sum}
                          width="20"
                        ></img>
                      </div>
                      <ul className="dropdown-menu  hidden  text-white pl-8">
                        <li className="">
                          <a
                            className="SubmenuBackColor   p-2 whitespace-no-wrap flex "
                            onClick={() => SelectMenu(4)}
                          >
                            <img
                              className=""
                              src={icons.menu4}
                              width="30"
                              height="30"
                            ></img>
                          </a>
                        </li>
                        <li
                          className="SubmenuBackColor   whitespace-no-wrap flex "
                          style={{
                            borderBottomLeftRadius: "18px",
                            paddingBottom: "1rem",
                            paddingLeft: "0.5rem",
                            paddingTop: "1rem",
                          }}
                        >
                          <a onClick={() => SelectMenu(5)}>
                            <img
                              className=""
                              src={BODIT_TSAGIIN_AUDITIIN_HUVAARI_TSAGAAN}
                              width="30"
                              height="30"
                            ></img>
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  {/* ACT */}
                  <div
                    onClick={() => SelectMenu(6)}
                    className="w-full flex items-center  h-14 pl-6 hover:bg-white  cursor-pointer"
                    style={{ borderBottomLeftRadius: "28px" }}
                    onMouseOver={() => {
                      setIcons({
                        ...icons,
                        ...{
                          menu6: BIYLELTIIN_TAILAN_TSENHER,
                          menu6Color: "#2684fe",
                        },
                      });
                    }}
                    onMouseOut={() => {
                      setIcons({
                        ...icons,
                        ...{
                          menu6: BIYLELTIIN_TAILAN_TSAGAAN,
                          menu6Color: "white",
                        },
                      });
                    }}
                  >
                    <img src={icons.menu6} width="28" height="40"></img>
                  </div>
                  {/* ЧАНАРЫН БАТАЛГААЖУУЛАЛТ */}
                  {userDetils.USER_TYPE_NAME === "HEAD_CHBG" ||
                  userDetils.USER_TYPE_NAME === "ADMIN" ? (
                    <div
                      onClick={() => SelectMenu(7)}
                      className="w-full flex items-center  h-14 pl-6 hover:bg-white  cursor-pointer"
                      style={{ borderBottomLeftRadius: "28px" }}
                      onMouseOver={() => {
                        setIcons({
                          ...icons,
                          ...{ menu7: QC_Menu_Blue, menu7Color: "#2684fe" },
                        });
                      }}
                      onMouseOut={() => {
                        setIcons({
                          ...icons,
                          ...{ menu7: QC_Menu_White, menu7Color: "white" },
                        });
                      }}
                    >
                      <img src={icons.menu7} width="28" height="36"></img>
                    </div>
                  ) : null}
                  {/* СЭДЭВ СОНГОЛТ */}
                  {
                    //userDetils.USER_TYPE_NAME === "HEAD_CHBG" ||
                    userDetils.USER_TYPE_NAME === "ADMIN" ? (
                      <div
                        onClick={() => SelectMenu(8)}
                        className="w-full flex items-center  h-14 pl-6 hover:bg-white  cursor-pointer"
                        style={{ borderBottomLeftRadius: "28px" }}
                        onMouseOver={() => {
                          setIcons({
                            ...icons,
                            ...{ menu8: SEDEV_TSENHER, menu8Color: "#2684fe" },
                          });
                        }}
                        onMouseOut={() => {
                          setIcons({
                            ...icons,
                            ...{ menu8: SEDEV_TSAGAAN, menu8Color: "white" },
                          });
                        }}
                      >
                        <img src={icons.menu8} width="28" height="36"></img>
                      </div>
                    ) : null
                  }
                </>
              )}

              <div
                style={{
                  position: "absolute",
                  height: "100hv",
                  paddingLeft: "1.3rem",
                  paddingTop: window.innerHeight - 750,
                }}
                className="closemenu "
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
              without
              rel="noopener noreferrer"
              target="_blank"
              className="inline-flex mb-2 items-center "
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
