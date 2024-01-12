import React, { useEffect, useState } from "react";
import Title from "../components/Title";
import Stat_URl from "../Stat_URL";
import RightMenu from "../components/RightMenu";
import CM_1A from "../components/S_News.tsx/CM_1A";
import CM_1B from "../components/S_News.tsx/CM_1B";
import CM_1C from "../components/S_News.tsx/CM_1C";
import CM_2A from "../components/S_News.tsx/CM_2A";
import CM_2B from "../components/S_News.tsx/CM_2B";
import CM_2C from "../components/S_News.tsx/CM_2C";
import CM_3A from "../components/S_News.tsx/CM_3A";
import CM_3B from "../components/S_News.tsx/CM_3B";
import CM_3C from "../components/S_News.tsx/CM_3C";
import CM_4 from "../components/S_News.tsx/CM_4A";
import CM_5A from "../components/S_News.tsx/CM_5A";
import CM_5B from "../components/S_News.tsx/CM_5B";
import CM_5C from "../components/S_News.tsx/CM_5C";
import CM_5D from "../components/S_News.tsx/CM_5D";
import CM_5E from "../components/S_News.tsx/CM_5E";
import CM_5F from "../components/S_News.tsx/CM_5F";
import CM_6 from "../components/S_News.tsx/CM_6";
import CM_7 from "../components/S_News.tsx/CM_7";
import CM_8 from "../components/S_News.tsx/CM_8";
import CM_9A from "../components/S_News.tsx/CM_9A";
import CM_9B from "../components/S_News.tsx/CM_9B";
import CM_9C from "../components/S_News.tsx/CM_9C";
import CM_9D from "../components/S_News.tsx/CM_9D";
import CM_9E from "../components/S_News.tsx/CM_9E";
import CM_9F from "../components/S_News.tsx/CM_9F";
import CM_10 from "../components/S_News.tsx/CM_10";
import CM_11 from "../components/S_News.tsx/CM_11";
import DataRequest from "../functions/make_Request";
import axios from "axios";
function CM(props: any) {
  const [data, setData] = React.useState([]);
  // @ts-ignore
  const NewsData = JSON.parse(localStorage.getItem("userDetails"));
  const [dataMenu, setDataMenu] = useState({
    value: {},
    index: 0,
    MenuData: [],
  });
  const [reportMenu, setReportMenu] = useState([]);

  useEffect(() => {
    fetchData();
  }, [props.mayagtData]);

  async function fetchData() {
    DataRequest({
      url: Stat_URl + "getBM1/" + NewsData?.MAYGTIIN_DUGAAR + "/" + 1,
      method: "GET",
      // data: {
      //   FAS_AUDIT_ID: props.data.ID,
      //   DOCUMENT_ID: props.data.listID,
      //   CREATED_BY: userDetails?.USER_ID,
      //   CREATED_DATE: dateFormat(new Date(), "dd-mmm-yy"),
      //   IS_ACTIVE: 1,
      // },
    })
      .then(function (response) {
        console.log(response, "response");
        if (response?.data.message === "failed" || response === undefined) {
          alert("Өгөгдөл авчрахад алдаа гарлаа!");
          //setloaderSpinner(0);
        } else {
          setData(response?.data);
        }
      })
      .catch(function (error) {
       
      });
  }
  return (
    <div></div>
    // <div
    //   style={{
    //     maxHeight: window.innerHeight - 129,
    //     maxWidth: window.innerWidth,
    //     padding: "1rem 0 0 1rem",
    //     overflow: "scroll",
    //   }}
    // >
    //   <Title title={"СТАТИСТИК МЭДЭЭ"} widthS={"9rem"} widthL={"8rem"} />

    //   <div className="flex  max-w-full">
    //     <div
    //     // style={{
    //     //   width:
    //     //     window.innerWidth - 260,
    //     // }}
    //     >
    //       {NewsData.USER_TYPE_NAME === "KHSHUDAG" ? (
    //         <div>
    //           {dataMenu.value.ID === 1 ? (
    //             <CM_1A REPORT_NAME={dataMenu.value.REPORT_NAME} />
    //           ) : null}
    //           {dataMenu.value.ID === 2 ? (
    //             <CM_1B REPORT_NAME={dataMenu.value.REPORT_NAME} />
    //           ) : null}
    //           {dataMenu.value.ID === 3 ? (
    //             <CM_1C REPORT_NAME={dataMenu.value.REPORT_NAME} />
    //           ) : null}
    //           {dataMenu.value.ID === 4 ? (
    //             <CM_2A REPORT_NAME={dataMenu.value.REPORT_NAME} />
    //           ) : null}
    //         </div>
    //       ) : NewsData.USER_TYPE_NAME === "AKT_ORG" ||
    //         NewsData.USER_TYPE_NAME === "AKT_MONITOR" ? (
    //         <CM_2B REPORT_NAME={dataMenu.value.REPORT_NAME} />
    //       ) : (
    //         <div>
    //           {dataMenu.value.ID === 1 ? (
    //             <CM_1A REPORT_NAME={dataMenu.value.REPORT_NAME} />
    //           ) : null}
    //           {dataMenu.value.ID === 2 ? (
    //             <CM_1B REPORT_NAME={dataMenu.value.REPORT_NAME} />
    //           ) : null}
    //           {/* {dataMenu.value.ID === 3 ? <Short_Report2 /> : null} */}
    //           {dataMenu.value.ID === 3 ? (
    //             <CM_1C REPORT_NAME={dataMenu.value.REPORT_NAME} />
    //           ) : null}
    //           {dataMenu.value.ID === 4 ? (
    //             <CM_2A REPORT_NAME={dataMenu.value.REPORT_NAME} />
    //           ) : null}
    //           {dataMenu.value.ID === 5 ? (
    //             <CM_2B REPORT_NAME={dataMenu.value.REPORT_NAME} />
    //           ) : null}
    //           {dataMenu.value.ID === 6 ? (
    //             <CM_2C REPORT_NAME={dataMenu.value.REPORT_NAME} />
    //           ) : null}
    //           {dataMenu.value.ID === 7 ? (
    //             <CM_3A REPORT_NAME={dataMenu.value.REPORT_NAME} />
    //           ) : null}
    //           {dataMenu.value.ID === 8 ? (
    //             <CM_3B REPORT_NAME={dataMenu.value.REPORT_NAME} />
    //           ) : null}
    //           {dataMenu.value.ID === 9 ? (
    //             <CM_3C REPORT_NAME={dataMenu.value.REPORT_NAME} />
    //           ) : null}
    //           {dataMenu.value.ID === 10 ? (
    //             <CM_4 REPORT_NAME={dataMenu.value.REPORT_NAME} />
    //           ) : null}
    //           {dataMenu.value.ID === 12 ? (
    //             <CM_5A REPORT_NAME={dataMenu.value.REPORT_NAME} />
    //           ) : null}
    //           {dataMenu.value.ID === 13 ? (
    //             <CM_5B REPORT_NAME={dataMenu.value.REPORT_NAME} />
    //           ) : null}
    //           {dataMenu.value.ID === 14 ? (
    //             <CM_5C REPORT_NAME={dataMenu.value.REPORT_NAME} />
    //           ) : null}
    //           {dataMenu.value.ID === 15 ? (
    //             <CM_5D REPORT_NAME={dataMenu.value.REPORT_NAME} />
    //           ) : null}
    //           {dataMenu.value.ID === 16 ? (
    //             <CM_5E REPORT_NAME={dataMenu.value.REPORT_NAME} />
    //           ) : null}
    //           {dataMenu.value.ID === 17 ? (
    //             <CM_5F REPORT_NAME={dataMenu.value.REPORT_NAME} />
    //           ) : null}
    //           {dataMenu.value.ID === 18 ? (
    //             <CM_6 REPORT_NAME={dataMenu.value.REPORT_NAME} />
    //           ) : null}
    //           {dataMenu.value.ID === 19 ? (
    //             <CM_7 REPORT_NAME={dataMenu.value.REPORT_NAME} />
    //           ) : null}
    //           {dataMenu.value.ID === 20 ? (
    //             <CM_8 REPORT_NAME={dataMenu.value.REPORT_NAME} />
    //           ) : null}
    //           {dataMenu.value.ID === 21 ? (
    //             <CM_9A REPORT_NAME={dataMenu.value.REPORT_NAME} />
    //           ) : null}
    //           {dataMenu.value.ID === 22 ? (
    //             <CM_9B REPORT_NAME={dataMenu.value.REPORT_NAME} />
    //           ) : null}
    //           {dataMenu.value.ID === 23 ? (
    //             <CM_9C REPORT_NAME={dataMenu.value.REPORT_NAME} />
    //           ) : null}
    //           {dataMenu.value.ID === 24 ? (
    //             <CM_9D REPORT_NAME={dataMenu.value.REPORT_NAME} />
    //           ) : null}
    //           {dataMenu.value.ID === 25 ? (
    //             <CM_9E REPORT_NAME={dataMenu.value.REPORT_NAME} />
    //           ) : null}
    //           {dataMenu.value.ID === 26 ? (
    //             <CM_9F REPORT_NAME={dataMenu.value.REPORT_NAME} />
    //           ) : null}
    //           {dataMenu.value.ID === 27 ? (
    //             <CM_10 REPORT_NAME={dataMenu.value.REPORT_NAME} />
    //           ) : null}
    //           {dataMenu.value.ID === 28 ? (
    //             <CM_11 REPORT_NAME={dataMenu.value.REPORT_NAME} />
    //           ) : null}
    //         </div>
    //       )}
    //     </div>

    //     <RightMenu
    //       Fdata={reportMenu}
    //       data={dataMenu}
    //       setData={(text: any) => setDataMenu(text)}
    //     />
    //   </div>
    // </div>
  );
}

export default CM;
