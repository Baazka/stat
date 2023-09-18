import React, { useEffect, useState } from "react";
let stylesNew = {
  bodonoo: {
    fontWeight: "bold",
    color: "#606060",
  },
};

function RightMenu(props: any) {
  // @ts-ignore
  const NewsData = JSON.parse(localStorage.getItem("News"));
  return (
    <div className="mr-1 ml-4 mb-7" style={{ width: "15%" }}>
      <table className="items-center bg-transparent border-collapse">
        <thead className="TableHeadBackroundcolor">
          <>
            <tr>
              <th
                className="border-b text-white border-gray-200 align-middle font-light  py-1"
                style={{ backgroundColor: "#b7b6b6" }}
              >
                <div className="flex items-center py-1 justify-center cursor-pointer">
                  <span className="text-xs font-bold uppercase mr-3">
                    ТАЙЛАН
                  </span>
                </div>
              </th>
            </tr>
            {NewsData.USER_TYPE_NAME === "KHSHUDAG"
              ? props.Fdata?.map((value: any, index: any) =>
                  value.ID === 1 ||
                  value.ID === 14 ||
                  value.ID === 15 ||
                  value.ID === 3 ||
                  value.ID === 17 ||
                  value.ID === 12 ||
                  value.ID === 16 ? (
                    <tr>
                      <td
                        className="text-left text-black py-0.5 cursor-pointer"
                        style={{
                          backgroundColor:
                            props.data.index === index ? "#e5e5e5" : "white",
                        }}
                        onClick={() => {
                          props.setData({ index: index, value: value });
                          localStorage.setItem(
                            "RightMenu",
                            JSON.stringify({
                              index: index,
                              value: value,
                              MenuData: props.Fdata,
                            })
                          );
                        }}
                      >
                        <span
                          className="text-xs text-black py-0.5"
                          style={value.STATUS !== 1 ? stylesNew.bodonoo : null}
                        >
                          {value.REPORT_NAME}
                        </span>
                      </td>
                    </tr>
                  ) : null
                )
              : NewsData.USER_TYPE_NAME === "AKT_ORG" ||
                NewsData.USER_TYPE_NAME === "AKT_MONITOR"
              ? props.Fdata?.map((value: any, index: any) =>
                  value.ID === 16 ? (
                    <tr>
                      <td
                        className="text-left text-black py-0.5 cursor-pointer"
                        style={{
                          backgroundColor:
                            props.data.index === index ? "#e5e5e5" : "white",
                        }}
                        onClick={() => {
                          props.setData({ index: index, value: value });
                          localStorage.setItem(
                            "RightMenu",
                            JSON.stringify({
                              index: index,
                              value: value,
                              MenuData: props.Fdata,
                            })
                          );
                        }}
                      >
                        <span
                          className="text-xs text-black py-0.5"
                          style={value.STATUS !== 1 ? stylesNew.bodonoo : null}
                        >
                          {value.REPORT_NAME}
                        </span>
                      </td>
                    </tr>
                  ) : null
                )
              : props.Fdata?.map((value: any, index: any) => (
                  <tr>
                    <td
                      className="text-left text-black py-0.5 cursor-pointer"
                      style={{
                        backgroundColor:
                          props.data.index === index ? "#e5e5e5" : "white",
                      }}
                      onClick={() => {
                        props.setData({ index: index, value: value });
                        localStorage.setItem(
                          "RightMenu",
                          JSON.stringify({
                            index: index,
                            value: value,
                            MenuData: props.Fdata,
                          })
                        );
                      }}
                    >
                      <span
                        className="text-xs text-black py-0.5"
                        style={value.STATUS !== 1 ? stylesNew.bodonoo : null}
                      >
                        {value.REPORT_NAME}
                      </span>
                    </td>
                  </tr>
                ))}
          </>
        </thead>
      </table>
    </div>
  );
}

export default RightMenu;
