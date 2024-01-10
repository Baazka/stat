import react, { useEffect, useState } from "react";
import Stat_URL from "../Stat_URL";
import DataRequest from "../functions/make_Request";
import dateFormat, { masks } from "dateformat";


function FooterValue(props) {
  // @ts-ignore
  const mayagtData = JSON.parse(localStorage.getItem("Stat"));
  const [data, loadData] = useState({});
  let api = "";
  async function fetchData() {


    DataRequest({
      url: Stat_URL + "getProcess",
      method: "POST",
      data: {
        ID: mayagtData.ID,
     
      },
    })
      .then(function (response) {
        console.log(response?.data,'tt')
        if(response.data !== undefined && response?.data.STATUS !== undefined)
        loadData(response.data.STATUS);

      }).catch(function (err) {
        console.log(err,'error');
      })
    
  }
  useEffect(() => {
    fetchData();
  }, [props]);

  return (
    <div className="flex flex-row">
      <div
        style={{
          display: "flex",
          width: "60%",
          alignItems: "end",
        }}
      >
       
        {data?.USER_NAME !== undefined ? (
          <table className="w-full">
            <thead className="text-center">
            </thead>
            <tbody>
              <tr >
                <td className="p-1 text-left">Бэлтгэсэн:</td>
                <td className="p-1 border-b-2">{data?.USER_NAME}</td>
                <td className="p-1 text-right">Код:</td>
                <td className="p-1 border-b-2">{data?.USER_CODE}</td>
                <td className="p-1 text-right">Огноо:</td>
                <td className="p-1 border-b-2 w-30">
                  {dateFormat(data?.CREATED_DATE, "yyyy-mm-dd")}
                </td>
                <td className="p-1 text-right">Утас:</td>
                <td className="p-1 border-b-2">{data?.PERSON_PHONE}</td>
              </tr>
             
              {data?.APPROVED_FIRST_NAME !== null ? (
                <tr>
                  <td className="p-1 text-left w-28">Баталсан 1:</td>
                  <td className="p-1 border-b-2">
                    {data?.APPROVED_FIRST_NAME}
                  </td>
                  <td className="p-1 text-right">Код:</td>
                  <td className="p-1 border-b-2">
                    {data?.APPROVED_FIRST_CODE}
                  </td>
                  <td className="p-1 text-right">Огноо:</td>
                  <td className="p-1 border-b-2">
                    {dateFormat(data?.APPROVED_FIRST_DATE, "yyyy-mm-dd")}
                  </td>
                </tr>
              ) : null}
              {data?.APPROVED_SECOND_NAME !== null ? (
                <tr>
               

                  <td className="p-1 text-left w-28">Баталсан 2:</td>
                  <td className="p-1 border-b-2">
                    {data?.APPROVED_SECOND_NAME}
                  </td>
                  <td className="p-1text-right">Код:</td>
                  <td className="p-1 border-b-2">
                    {data?.APPROVED_SECOND_CODE}
                  </td>
                  <td className="p-1 text-right">Огноо:</td>
                  <td className="p-1 border-b-2">
                    {dateFormat(data?.APPROVED_SECOND_DATE, "yyyy-mm-dd")}
                  </td>
                </tr>
              ) : null}
              {data?.APPROVED_THIRD_NAME !== null &&
              data?.APPROVED_THIRD_NAME !== undefined ? (
                <tr>
                  <td className="p-1 text-left w-28">Баталсан 3:</td>
                  <td className="p-1 border-b-2">
                    {data?.APPROVED_THIRD_NAME}
                  </td>
                  <td className="p-1 text-right">Код:</td>
                  <td className="p-1 border-b-2">
                    {data?.APPROVED_THIRD_CODE}
                  </td>
                  <td className="p-1 text-right">Огноо:</td>
                  <td className="p-1 border-b-2">
                    {dateFormat(data?.APPROVED_THIRD_DATE, "yyyy-mm-dd")}
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        ) : null}
      </div>
    </div>
  );
}
export default FooterValue;
