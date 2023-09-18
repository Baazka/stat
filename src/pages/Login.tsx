import URL from "../Stat_URL";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  apartments,
  HEREGLEGCH,
  NUUTS_UG,
  gariin_avlaga,
  video,
  LOGO_LAST,
} from "../assets/zurag";
import DataRequest from "../functions/make_Request";

function Login(props: any) {
  const [ner, setNer] = useState<string>("admin");
  const [nuutsUg, setNuutsUg] = useState<string>("chub3");
  const [sanuulakh, setSanuulakh] = useState(false);
  let navigate = useNavigate();

  function downHandler(e: any) {
    if (e.key === "Enter") {
      nevtrekh();
    }
  }
  async function nevtrekh() {
    if (ner !== undefined && nuutsUg !== undefined) {
      DataRequest({
        url: "https://fas.audit.mn/reg/api/v1/login/",
        method: "POST",
        data: {
          username: ner,
          password: nuutsUg,
          systemid: 6,
        },
      })
        .then(function(response) {
          if (
            response?.data?.USER_ID !== 0 &&
            response?.data?.USER_ID !== null &&
            response?.data?.USER_ID !== undefined
          ) {
            localStorage.setItem("search", "");
            if (sanuulakh) {
              localStorage.removeItem("rememberedUser");
              localStorage.setItem(
                "rememberedUser",
                JSON.stringify({
                  userName: ner,
                })
              );
            }
            DataRequest({
              url:
                "https://fas.audit.mn/reg/api/v1/profile/" +
                response.data.USER_ID +
                "/" +
                6,
              method: "GET",
              data: {},
            })
              .then(function(response) {
                if (localStorage.getItem("userDetails") !== undefined)
                  localStorage.removeItem("userDetails");
                localStorage.setItem(
                  "userDetails",
                  JSON.stringify(response?.data)
                );
                if (
                  response?.data?.USER_TYPE_NAME === "OT_CREATOR"
                  //||response?.data?.USER_TYPE_NAME === "OT_CHECK"
                ) {
                  navigate("/web/Home/Audit_gomdol");
                } else if (response?.data?.USER_TYPE_NAME === "KHSHUDAG") {
                  navigate("/web/Home/Reporting_Audit");
                } else if (response?.data?.USER_TYPE_NAME === "AKT_ORG") {
                  navigate("/web/Home/Act_huviar");
                } else navigate("/web/Home/Audit");
              })
              .catch(function(error) {
                alert("Aмжилтгүй");
              });
          } else alert("Хэрэглэгчийн нэвтрэх нэр, нууц үг буруу байна!!!");
        })
        .catch(function(error) {
          alert("Aмжилтгүй");
        });
    }
  }

  return (
    <div className="flex h-screen  w-full">
      <div className="h-full  flex-col login_screen">
        <div className="w-full h-1/6 text-center items-center justify-center">
          <div className="flex text-center items-center justify-center pt-4">
            <img
              src={LOGO_LAST}
              className="sm:w-8/12 md:w-9/12 lg:w-12/12 xl:w-12/12 2xl:w-12/12"
            />
          </div>
        </div>
        <div className="w-full h-3/6 bg-white  text-center items-center justify-center px-6">
          <div className="flex-col w-full pt-20 sm:pt-12 md:pt-20 lg:pt-20 xl:pt-20 2xl:pt-32 ">
            <span
              style={{
                color: "#2684fe",
                fontWeight: "bolder",
                fontSize: "1.8rem",
                fontFamily: "roboto",
              }}
            >
              ХЭРЭГЛЭГЧ НЭВТРЭХ
            </span>
            <div className="px-10 lg:px-30 sm:px-40 md:px-48 lg:px-8 xl:px-12 2xl:px-28">
              <div
                className="items-center pt-9 "
                style={{ position: "relative" }}
              >
                <span className="absolute p-3">
                  <img src={HEREGLEGCH} className="w-4 h-4 " />
                </span>
                <input
                  type="text"
                  className=" loginInput pl-9  focus:outline-none focus:ring-2 focus:border-transparent w-full h-10"
                  style={{
                    backgroundColor: "#2684fe",
                    borderRadius: "20px",
                    color: "white",
                  }}
                  value={ner}
                  placeholder="Нэвтрэх нэр"
                  onChange={(text) => setNer(text.target.value)}
                />
              </div>
              <div
                className="items-center  pt-4"
                style={{ position: "relative" }}
              >
                <span className="absolute p-3">
                  <img src={NUUTS_UG} className="w-5 h-5" />
                </span>
                <input
                  type="password"
                  className="loginInput pl-9 focus:outline-none focus:ring-2  focus:border-transparent w-full h-10"
                  style={{
                    backgroundColor: "#2684fe",
                    borderRadius: "20px",
                    color: "white",
                  }}
                  value={nuutsUg}
                  onKeyDown={downHandler}
                  placeholder="Нууц үг"
                  onChange={(text) => setNuutsUg(text.target.value)}
                />

                {/* appearance-none bg-white rounded-sm outline-none */}
              </div>
              <div className="text-left">
                <input
                  className={"w-4 h-4 mt-2 "}
                  type="checkbox"
                  onChange={() => setSanuulakh(!sanuulakh)}
                  checked={sanuulakh}
                  id="sanuulakh"
                />
                {/* <img src="/icon/checked.png" classNameName={"w-3 h-2 " + (sanuulakh ? "hidden z-20" : "block ")}/> */}
                <label className="text-gray-400" htmlFor="sanuulakh">
                  <span>&nbsp;</span>Сануулах
                </label>
              </div>

              <button
                className="mb-10 mt-16 w-full text-white text-sm p-3"
                style={{
                  backgroundColor: "#2684fe",
                  borderRadius: "20px",
                  fontFamily: "roboto",
                  fontSize: "1.2rem",
                }}
                type="button"
                onClick={nevtrekh}
              >
                Нэвтрэх
              </button>
            </div>
          </div>
        </div>

        <div className="w-full h-1/6"></div>
        <div className="w-full h-1/6">
          <div className="flex justify-center lg:pt-10 xl:pt-4 2xl:pt-10 ">
            <div className="flex items-center cursor-pointer">
              <a
                href={
                  URL.replace("api/v1/", "") + "static" + "/fas_handbook_v1.pdf"
                }
                rel="noopener noreferrer"
                target="_blank"
                className="inline-flex mb-2 items-center "
              >
                <img src={gariin_avlaga} width="40px" />
                <span
                  style={{
                    fontFamily: "roboto",
                    fontWeight: "bolder",
                    paddingTop: "8px",
                  }}
                >
                  Гарын авлага
                </span>
              </a>
            </div>
            <div className="flex items-center pl-20 cursor-pointer">
              <a
                href={"https://www.youtube.com/watch?v=-8Kaa5WE09o&t=14s"}
                rel="noopener noreferrer"
                target="_blank"
                className="inline-flex mb-2 items-center "
              >
                <img src={video} width="40px" className="pb-3" />
                <span
                  style={{
                    fontFamily: "roboto",
                    fontWeight: "bolder",
                    paddingTop: "8px",
                  }}
                >
                  Видео
                </span>
              </a>
            </div>
          </div>
          <div className="absolute bottom-2 w-full sm:text-xs md:text-xs lg:text-xs xl:text-xs 2xl:text-sm xl:pl-1 2xl:pl-12 login_screen text-center HideOnMobile">
            <span
              style={{
                fontFamily: "roboto",
                color: "grey",
                paddingLeft: "1rem",
              }}
            >
              © 2022 Үндэсний аудитын газрын Мэдээллийн технологийн төв
            </span>
          </div>
        </div>
      </div>
      <div
        className="h-full HideOnMobile"
        style={{
          width: "70%",
        }}
      >
        <img
          src={apartments}
          className="h-full w-full"
          style={{
            borderTopLeftRadius: "20px",
            borderBottomLeftRadius: "20px",
          }}
        />
      </div>
    </div>
  );
}

export default Login;
