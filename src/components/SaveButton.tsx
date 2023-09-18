import React, { useEffect, useState } from "react";
import { saveIcon } from "../assets/zurag";
import Stat_Url from "../Stat_URL";
import DataRequest from "../functions/make_Request";

function ButtonSave(props: any) {
  const mayagtData = props.mayagtData;
  const userDetils = props.userDetils;
  const [data, setData] = useState([]);
  useEffect(() => {
    fetchData();
  }, [props.mayagtData]);

  async function fetchData() {
    DataRequest({
      url: Stat_Url + "getBM1/" + mayagtData?.MAYGTIIN_DUGAAR + "/" + 1,
      method: "GET",
      // data: {
      //   FAS_AUDIT_ID: props.data.ID,
      //   DOCUMENT_ID: props.data.listID,
      //   CREATED_BY: userDetils?.USER_ID,
      //   CREATED_DATE: dateFormat(new Date(), "dd-mmm-yy"),
      //   IS_ACTIVE: 1,
      // },
    })
      .then(function (response) {
        console.log(response, "response");
        if (response?.data.message === "failed" || response === undefined) {
          alert("Өгөгдөл авчирхад алдаа гарлаа!");
          //setloaderSpinner(0);
        } else {
          setData(response?.data);
        }
      })
      .catch(function (error) {
        alert("Aмжилтгүй");
      });
  }
  function saveToDB() {
    // if (requiredField()) {
    //   setloaderSpinner(1);
    let sendData: any;
    sendData = data[0];
    DataRequest({
      url: Stat_Url + "getBM1/" + mayagtData?.MAYGTIIN_DUGAAR + "/" + 1,
      method: "POST",
      data: {
        ID: parseInt(sendData.ID),
        AUDIT_ID: mayagtData?.MAYGTIIN_DUGAAR,
        AUDIT_TYPE: parseInt(sendData.AUDIT_TYPE),
        WORK_PEOPLE: sendData.WORK_PEOPLE,
        WORK_DATE: sendData.WORK_DATE,
        WORK_TIME: parseInt(sendData.WORK_TIME),
        P_IS_ACTIVE: 1,
        CREATED_BY: userDetils?.USER_ID,
      },
    })
      .then(function (response: any) {
        if (
          (response.data?.code === 405 &&
            response.data?.result?.errorNum === 6502) ||
          (response.data?.code === 405 &&
            response.data?.result?.errorNum === 1461)
        ) {
          alert("Тэмдэгт хэтэрсэн байна");
          //setloaderSpinner(0);
        } else if (response?.data.message === "success") {
          fetchData();
          alert("Aмжилттай хадгаллаа");
          //setloaderSpinner(0);
        } else if (response?.data.message === "failed") {
          alert("амжилтгүй алдаа бөглөнө үү");
          //setloaderSpinner(0);
        }
      })
      .catch(function (error) {
        alert("Aмжилтгүй");
        //setloaderSpinner(0);
      });
  }
  return (
    <div style={{ display: "flex", justifyContent: "end" }}>
      <button
        className="inline-flex items-center rounded ml-2 mr-1 mt-5"
        style={{
          border: "1px solid #2684fe",
        }}
        onClick={() => saveToDB()}
      >
        <div className="bg-white px-1">
          <img src={saveIcon} width="18px" height="18px "></img>
        </div>
        <div
          style={{
            backgroundColor: "#2684fe",
          }}
          className=" text-white px-1"
        >
          Хадгалах
        </div>
      </button>
    </div>
  );
}

export default ButtonSave;
