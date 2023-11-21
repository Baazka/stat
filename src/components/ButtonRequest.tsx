import React, { useEffect, useState } from "react";
import { DataRequest } from "../functions/DataApi";
import fasUrl from "../fasURL";
var dateFormat = require("dateformat");

function RequestButtonOT(props: any) {
  // @ts-ignore
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));
  const [tsonkh, setTsonkh] = useState(0);
  const [data, loadData] = useState({
    ID: null,
    OT_AUDIT_ID: props.audID,
    DOCUMENT_ID: props.docId,
    IS_ACTIVE: 1,
    CREATED_BY: userDetails.USER_ID,
    IS_SHOW: 0,
    REQUEST_TYPE: "",
    DESCRIPTION: "",
    LEVEL_ID: props.STATUS,
  });

  useEffect(() => {
    loadData(props.batlakhHuselt);
  }, [props]);

  function requiredField() {
    if (
      data.REQUEST_TYPE === "999" ||
      data.REQUEST_TYPE === 999 ||
      data.REQUEST_TYPE === undefined
    ) {
      alert("Хүсэлтийн төрөл сонгоно уу");
      return false;
    }
    // else if (
    //   data.DESCRIPTION === "" ||
    //   data.DESCRIPTION === null ||
    //   data.DESCRIPTION === undefined
    // ) {
    //   alert("Чанарын хяналтын санал, зөвлөмж оруулна уу");
    //   return false;
    // }
    else {
      return true;
    }
  }
  function confirm() {
    let level = null;

    if (props.STATUS !== undefined) {
      level = props.STATUS;
    }
    if (props.BIYLELT_USER !== undefined) {
      level = props.BIYLELT_USER;
    }
    if (requiredField()) {
      DataRequest({
        url: fasUrl + "OT_REQUEST_FOR_CONFIRM/",
        method: "POST",
        data: {
          ID: null,
          OT_AUDIT_ID: props.audID,
          DOCUMENT_ID: props.docId,
          IS_ACTIVE: 1,
          CREATED_BY: userDetails.USER_ID,
          IS_SHOW: 0,
          REQUEST_TYPE: data.REQUEST_TYPE,
          DESCRIPTION: data.DESCRIPTION,
          LEVEL_ID: level,
          // LEVEL_ID:
          //   props.STATUS === null || props.STATUS === undefined
          //     ? 0
          //     : props.STATUS,
          MODULE_TYPE: props.MODULE_TYPE,
          PERIOD_TYPE: props.PERIOD_TYPE,
        },
      })
        .then(function (response) {
          if (response?.data.message === "success") {
            alert("Aмжилттай хадгаллаа");
            setTsonkh(0);
            // if (props.Akt === undefined) {
            //   props.changeData();
            // }
          } else {
            alert("Системийн алдаа");
          }
        })
        .catch(function (error) {
          console.log(error,'OT_REQUEST_FOR_CONFIRM');
        });
    }
  }
  function cancel() {
    let url = "";

    DataRequest({
      url: fasUrl + "ot_processChange/",
      method: "POST",
      data: {
        PROCESS_ID: props.statusID,
        ACTION_ID: 4,
        CREATED_BY: userDetails.USER_ID,
        CREATED_DATE: dateFormat(new Date(), "dd-mmm-yyyy"),
      },
    })
      .then(function (response) {
        if (response?.data.message === "success") {
          alert("Aмжилттай хадгаллаа");
          setTsonkh(0);
          props.fetchData();
        } else {
          alert("Системийн алдаа ");
        }
      })
      .catch(function (error) {
        console.log(error,'ot_processChange');
        // alert("Aмжилтгүй");
      });
  }
  return (
    <div>
      {/* <button
        onClick={() => setTsonkh(1)}
        className="inline-flex mb-2 items-center rounded ml-2"
        style={{
          border: "1px solid #2684fe",
        }}
      >
        <div className="bg-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="mx-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
            style={{ width: "20px", height: "20px" }}
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
              color="#2684fe"
            />
          </svg>
        </div>
        <div
          style={{
            backgroundColor: "#2684fe",
          }}
          className=" text-white  py-0 px-1"
        >
          {props.Title}
        </div>
      </button>
      {tsonkh > 0 ? (
        <div
          className="fixed z-10  overflow-y-auto bottom-24 right-96   sm:bottom-20 sm:right-80"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
        >
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
              aria-hidden="true"
            ></div>

            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <div className="flex mb-3">
                      <h3 className="text-lg mr-3">Хүсэлтийн төрөл:</h3>
                      <select
                        className="inputRoundedOT"
                        value={data.REQUEST_TYPE}
                        onChange={(e) => {
                          loadData({
                            ...data,
                            ...{
                              REQUEST_TYPE: e.target.value,
                            },
                          });
                        }}
                      >
                        <option value={999}>Сонгоно уу</option>
                        {props.STATUS === 3 ? null : (
                          <option value={1}>{"Батлах"}</option>
                        )}
                        <option value={0}>{"Цуцлах"}</option>
                      </select>
                    </div>
                    <h3 className="text-lg leading-6">Cанал, зөвлөмж</h3>
                    <div className="mt-2">
                      <textarea
                        className="textareaBorderless"
                        rows="2"
                        style={{ height: "auto", width: "400px" }}
                        value={data.DESCRIPTION}
                        onChange={(e) => {
                          loadData({
                            ...data,
                            ...{
                              DESCRIPTION: e.target.value,
                            },
                          });
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  className="w-full inline-flex justify-center rounded-md border border-transparent  shadow-sm px-4 py-2  fetext-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-300 sm:ml-3 sm:w-auto sm:text-sm"
                  style={{ backgroundColor: "#2684fe" }}
                  onClick={() => confirm()}
                >
                  Илгээх
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setTsonkh(0)}
                >
                  Гарах
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null} */}
    </div>
  );
}
export default RequestButtonOT;
