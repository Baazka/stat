import React, { useEffect, useState } from "react";

function Subtitle(props: any) {
  const [HelpPopup, setHelpPopup] = useState({
    tsonkh: false,
    type: 0,
  });
  return (
    <div className="pb-2 flex">
      <div className="flex flex-row  cursor-pointer">
        <label
          style={{ fontSize: 12, paddingTop: "2px" }}
          className="block  md:text-right  md:mb-0 pr-1  whitespace-nowrap"
        >
          {props?.textT}
        </label>
        <div
          onClick={() =>
            setHelpPopup({
              tsonkh: true,
              type: 1,
            })
          }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            color="#2684fe"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        {HelpPopup?.tsonkh ? (
          <div>
            <HelpPopUp
              setHelpPopup={setHelpPopup}
              type={HelpPopup.type}
              mayagtName={props.mayagtName}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}

function HelpPopUp(props: any) {
  return (
    <div
      style={{
        position: "absolute",
        width: "30%",
        height: "auto",
        left: "35%",
        top: "10%",
        borderRadius: "15px",
        backgroundColor: "white",
        boxShadow:
          "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
        zIndex: "9",
      }}
    >
      <div
        style={{
          backgroundColor: "#2684fe",
          padding: "14px 10px 14px 10px",
          color: "white",
          marginBottom: "10px",
          borderTopLeftRadius: "15px",
          borderTopRightRadius: "15px",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <div>
          <span>{props.mayagtName} Заавар </span>
        </div>
        <div>
          <span
            style={{
              fontWeight: "bold",
              cursor: " -webkit-grab grab",
            }}
            onClick={() => props.setHelpPopup(false)}
          >
            X
          </span>
        </div>
      </div>
      <div style={{ padding: "15px 15px 35px 15px", zIndex: "2" }}>
        <div>
          <div
            className="control has-icons-left has-icons-right px-5 text-justify"
            style={{
              textIndent: "2rem",
              maxHeight: "450px",
              overflow: "scroll",
              zIndex: "10",
            }}
          >
            {props.mayagtName === "З-ТАБСМ-1A" ? (
              <CM />
            ) : props.mayagtName === "З-ТАБСМ-1Б" ? (
              <CM />
            ) : props.mayagtName === "З-ТАБСМ-1В" ? (
              <CM />
            ) : props.mayagtName === "З-ТАБСМ-2A" ? (
              <CM />
            ) : props.mayagtName === "З-ТАБСМ-2Б" ? (
              <CM />
            ) : props.mayagtName === "З-ТАБСМ-2В" ? (
              <CM />
            ) : props.mayagtName === "З-ТАБСМ-3А" ? (
              <CM />
            ) : props.mayagtName === "З-ТАБСМ-3Б" ? (
              <CM />
            ) : props.mayagtName === "З-ТАБСМ-3В" ? (
              <CM />
            ) : props.mayagtName === "З-ТАБСМ-4" ? (
              <CM />
            ) : props.mayagtName === "З-ТАБСМ-5А" ? (
              <CM />
            ) : props.mayagtName === "З-ТАБСМ-5Б" ? (
              <CM />
            ) : props.mayagtName === "З-ТАБСМ-5В" ? (
              <CM />
            ) : props.mayagtName === "З-ТАБСМ-5Г" ? (
              <CM />
            ) : props.mayagtName === "З-ТАБСМ-5Д" ? (
              <CM />
            ) : props.mayagtName === "З-ТАБСМ-5Е" ? (
              <CM />
            ) : props.mayagtName === "З-ТАБСМ-6" ? (
              <CM />
            ) : props.mayagtName === "З-ТАБСМ-7" ? (
              <CM />
            ) : props.mayagtName === "З-ТАБСМ-8" ? (
              <CM />
            ) : props.mayagtName === "З-ТАБСМ-9А" ? (
              <CM />
            ) : props.mayagtName === "З-ТАБСМ-9Б" ? (
              <CM />
            ) : props.mayagtName === "З-ТАБСМ-9В" ? (
              <CM />
            ) : props.mayagtName === "З-ТАБСМ-9Г" ? (
              <CM />
            ) : props.mayagtName === "З-ТАБСМ-9Д" ? (
              <CM />
            ) : props.mayagtName === "З-ТАБСМ-9Е" ? (
              <CM />
            ) : props.mayagtName === "З-ТАБСМ-10" ? (
              <CM />
            ) : props.mayagtName === "З-ТАБСМ-11" ? (
              <CM />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

function CM() {
  return (
    <p>
      Хагас жилийн статистик мэдээг аймаг, нийслэл дэх Төрийн аудитын газрууд,
      Үндэсний аудитын газрын санхүүгийн тайлангийн аудит хийж гүйцэтгэсэн
      бүтцийн нэгжүүд 06 дугаар сарын 25-ны өдрөөр тасалбар болгон, 07 дугаар
      сарын 05-ны өдрийн дотор баталгаажуулан статистик мэдээ хариуцсан нэгжид
      ирүүлнэ.
      <br />
      Жилийн эцсийн статистик мэдээг аймаг, нийслэл дэх Төрийн аудитын газрууд,
      Үндэсний аудитын газрын санхүүгийн тайлангийн аудит хийж гүйцэтгэсэн
      бүтцийн нэгжүүд 12 дугаар сарын 25-ны өдрөөр тасалбар болгон, дараа оны 01
      дүгээр сарын 05-ны өдрийн дотор баталгаажуулан статистик мэдээ хариуцсан
      нэгжид ирүүлнэ.
      <br />
    </p>
  );
}

export default Subtitle;
