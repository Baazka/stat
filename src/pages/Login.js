import URL from "../Stat_URL";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import {
  apartments,
  HEREGLEGCH,
  NUUTS_UG,
  gariin_avlaga,
  video,
  LOGO_LAST,
} from "../assets/zurag";
import { Data_Request } from "../functions/make_Request";

function Login(props) {
  const [ner, setNer] = useState("");
  const [nuutsUg, setNuutsUg] = useState("");
  const [sanuulakh, setSanuulakh] = useState(false);
  const history = useHistory();

  function downHandler(e) {
    if (e.key === "Enter") {
      nevtrekh();
    }
  }
  async function nevtrekh() {
    if (ner !== undefined && nuutsUg !== undefined) {
      Data_Request({
        url: "https://fas.audit.mn/reg/api/v1/login/",
        method: "POST",
        data: {
          username: ner,
          password: nuutsUg,
          systemid: 6,
        },
      })
        .then(function (response) {
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
            Data_Request({
              url:
                "https://fas.audit.mn/reg/api/v1/profile/" +
                response.data.USER_ID +
                "/" +
                6,
              method: "GET",
              data: {},
            })
              .then(function (response) {
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
                  history.push("/web/Home/Audit_gomdol");
                } else if (response?.data?.USER_TYPE_NAME === "KHSHUDAG") {
                  history.push("/web/Home/Reporting_Audit");
                } else if (response?.data?.USER_TYPE_NAME === "AKT_ORG") {
                  history.push("/web/Home/Act_huviar");
                } else history.push("/web/Home/Audit");
              })
              .catch(function (error) {
                alert("Aмжилтгүй");
              });
          } else alert("Хэрэглэгчийн нэвтрэх нэр, нууц үг буруу байна!!!");
        })
        .catch(function (error) {
          alert("Aмжилтгүй");
        });
    }
  }

  return (
    <div className="flex h-screen  w-full">
      <div className="h-full  flex-col " style={{ width: "30%" }}>
        <div className="w-full h-1/6 text-center items-center justify-center">
          <div className="flex text-center items-center justify-center pt-4">
            <img
              src={LOGO_LAST}
              className="sm:w-8/12 md:w-9/12 lg:w-12/12 xl:w-12/12 2xl:w-12/12"
            />
          </div>
        </div>
        <div className="w-full h-3/6 bg-white  text-center items-center justify-center">
          <div className="flex-col w-full sm:pt-12 md:pt-12 lg:pt-12 xl:pt-24 2xl:pt-52 ">
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
            <div
              className="items-center pt-4 "
              style={{ position: "relative" }}
            >
              <span className="absolute p-3">
                <img src={HEREGLEGCH} className="w-4 h-4 " />
              </span>
              <input
                type="text"
                className=" loginInput pl-9  focus:outline-none focus:ring-2 focus:border-transparent w-72 h-10 "
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
                className="loginInput pl-9 focus:outline-none focus:ring-2  focus:border-transparent w-72 h-10"
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
            </div>
            <div className="w-80 ml-5 p-1 lg:text-left xl:text-left xl:pl-10 2xl:text-center 2xl:pl-0">
              {/* appearance-none bg-white rounded-sm outline-none */}
              <input
                className={"w-4 h-4 mt-1"}
                type="checkbox"
                onChange={() => setSanuulakh(!sanuulakh)}
                checked={sanuulakh}
                id="sanuulakh"
              />
              {/* <img src="/icon/checked.png" classNameName={"w-3 h-2 " + (sanuulakh ? "hidden z-20" : "block ")}/> */}
              <label className="text-gray-400" for="sanuulakh">
                <span>&nbsp;</span>Сануулах
              </label>
            </div>

            <button
              className="mb-10 mt-16 w-1/4 h-10 text-white text-sm"
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

        <div className="w-full h-1/6"></div>
        <div className="w-full h-1/6">
          <div className="flex justify-center lg:pt-10 xl:pt-4 2xl:pt-10 ">
            <div className="flex items-center cursor-pointer">
              <a
                href={
                  URL.replace("api/v1/", "") + "static" + "/fas_handbook_v1.pdf"
                }
                without
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
                without
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
          <div className="absolute bottom-2 w-full sm:text-xs md:text-xs lg:text-xs xl:text-xs 2xl:text-sm xl:pl-1 2xl:pl-12">
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
        className="h-full"
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
