import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Title from "./Title";
import { deleteIcon } from "../assets/zurag";
import "../pages/Home.css";
import dateFormat, { masks } from "dateformat";
import imagebackground from "../assets/zurag/background.png";
import SaveButton from "./SaveButton";
import axios from "axios";
import { sortingFns, FilterFn, SortingFn } from "@tanstack/react-table";
import { Period, Department, Employee, Document } from "../components/library";
import Stat_URL from "../Stat_URL";
import DataRequest from "../functions/make_Request";
import {
  RankingInfo,
  rankItem,
  compareItems,
} from "@tanstack/match-sorter-utils";

declare module "@tanstack/table-core" {
  interface FilterFns {
    fuzzy: FilterFn<unknown>;
  }
  interface FilterMeta {
    itemRank: RankingInfo;
  }
}

// @ts-ignore
const userDetils = JSON.parse(localStorage.getItem("userDetails"));
function Users(props: any) {
  const [data, loadData] = useState();
  const columns = React.useMemo(
    () => [
      {
        Header: "Төрийн аудитын байгууллага",
        accessor: "DEPARTMENT_NAME",
      },
      {
        Header: "Харъяа газар",
        accessor: "SUB_DEPARTMENT_NAME",
      },
      {
        Header: "Албан тушаал",
        accessor: "POSITION_NAME",
      },
      {
        Header: "Албан хаагчийн нэр",
        accessor: "USER_NAME",
      },

      {
        Header: "Аудиторын код",
        accessor: "USER_CODE",
      },
    ],
    []
  );

  const dataTable = React.useMemo(() => data, [data]);

  useEffect(() => {
    async function fetchData() {
      let temp =
        userDetils.USER_ID !== 1 ? userDetils.USER_DEPARTMENT_ID : "null";
      let listItems = await axios(
        Stat_URL + "refPeriod" + userDetils.USER_DEPARTMENT_ID
      );
      loadData(listItems?.data);
    }
    fetchData();
  }, []);

  let listItems;
  if (data !== undefined) {
    listItems = (
      <div
        style={{
          position: "absolute",
          width: "60%",
          height: "auto",
          left: "25%",
          top: "9.5%",
          borderRadius: "6px",
          backgroundColor: "white",
          boxShadow:
            "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 10px 0 rgba(0, 0, 0, 0.19)",
          zIndex: "1",
        }}
      >
        <div
          style={{
            height: "auto",
            backgroundColor: "#2684fe",
            padding: "18px 10px 18px 10px",
            color: "white",
            marginBottom: "10px",
            borderTopLeftRadius: "15px",
            borderTopRightRadius: "15px",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <div className="ml-4">
            <span> АУДИТЫН БАГ </span>
          </div>
          <div>
            <span
              style={{
                fontWeight: "bold",
                cursor: " -webkit-grab",
              }}
              onClick={() => props.setTsonkh(0)}
            >
              X
            </span>
          </div>
        </div>

        <div
          style={{
            padding: "10px 10px 20px 10px",
            overflow: "scroll",
            minHeight: "400px",
            maxHeight: "650px",
          }}
        ></div>
      </div>
    );
  } else {
    listItems = <h1>ачаалж байна</h1>;
  }
  return listItems;
}
// function requiredField(data: any, datTeama: any) {
//   let temp = data;
//   if (
//     data.Audit.AUDIT_CODE === undefined ||
//     data.Audit.AUDIT_CODE === null ||
//     data.Audit.AUDIT_CODE === ""
//   ) {
//     alert("Аудитын код оруулна уу");
//     return false;
//   } else if (
//     data.Audit.AUDIT_TYPE === undefined ||
//     data.Audit.AUDIT_TYPE === null ||
//     data.Audit.AUDIT_TYPE === "999" ||
//     data.Audit.AUDIT_TYPE === 999
//   ) {
//     alert("Аудитын нэр сонгоно уу");
//     return false;
//   } else if (
//     data.Audit.PERIOD_ID === undefined ||
//     data.Audit.PERIOD_ID === null ||
//     data.Audit.PERIOD_ID === "999" ||
//     data.Audit.PERIOD_ID === 999
//   ) {
//     alert("Тайлант хугацаа сонгоно уу");
//     return false;
//   } else if (
//     data.Audit.AUDIT_FORM_TYPE === undefined ||
//     data.Audit.AUDIT_FORM_TYPE === null ||
//     data.Audit.AUDIT_FORM_TYPE === "999" ||
//     data.Audit.AUDIT_FORM_TYPE === 999
//   ) {
//     alert("Аудит хийх хэлбэр сонгоно уу");
//     return false;
//   } else if (
//     data.Audit.SHILEN_TYPE_ID === undefined ||
//     data.Audit.SHILEN_TYPE_ID === null ||
//     data.Audit.SHILEN_TYPE_ID === "999" ||
//     data.Audit.SHILEN_TYPE_ID === 999
//   ) {
//     alert("Шилэн дансны хууль сонгоно уу");
//     return false;
//   } else if (
//     data.Audit.AUDIT_ORG_TYPE === undefined ||
//     data.Audit.AUDIT_ORG_TYPE === null ||
//     data.Audit.AUDIT_ORG_TYPE === "999" ||
//     data.Audit.AUDIT_ORG_TYPE === 999
//   ) {
//     alert("Аудит хийх байгууллагын төрөл сонгоно уу");
//     return false;
//   }
//   if (data.Audit.AUDIT_ORG_TYPE === 1) {
//     if (
//       data.Audit.CHECK_DEPARTMENT_ID === undefined ||
//       data.Audit.CHECK_DEPARTMENT_ID === null ||
//       data.Audit.CHECK_DEPARTMENT_ID === "999" ||
//       data.Audit.CHECK_DEPARTMENT_ID === 999
//     ) {
//       alert("Аудит хийх байгууллага, нэгжийн нэр сонгоно уу");
//       return false;
//     }
//   }

//   if (datTeama.Audit.AUDIT_ORG_TYPE === 2) {
//     if (
//       (data.Audit.DEPARTMENT_NAME === undefined ||
//         data.Audit.DEPARTMENT_NAME === null ||
//         data.Audit.DEPARTMENT_NAME === "") &&
//       (data.Audit.DEPARTMENT_REGNO === undefined ||
//         data.Audit.DEPARTMENT_REGNO === null ||
//         data.Audit.DEPARTMENT_REGNO === "")
//     ) {
//       alert("Аудит хийх байгууллага, нэгжийн нэр сонгоно уу");
//       return false;
//     }
//   }

//   if (
//     data.Audit.USER_DEPARTMENT_ID === undefined ||
//     data.Audit.USER_DEPARTMENT_ID === null ||
//     data.Audit.USER_DEPARTMENT_ID === "999" ||
//     data.Audit.USER_DEPARTMENT_ID === 999
//   ) {
//     alert("Аудит хийх байгууллага, нэгжийн нэр сонгоно уу");
//     return false;
//   }

//   if (temp.Team.filter((a: any) => a.ROLE_ID === 2).length === 0) {
//     alert("Багийн ахлах сонгоно уу");
//     return false;
//   } else if (temp.Team.filter((a: any) => a.ROLE_ID === 3).length === 0) {
//     alert("Багийн гишүүд сонгоно уу");
//     return false;
//   } else if (temp.Team.filter((a: any) => a.ROLE_ID === 4).length === 0) {
//     alert("Батлах хэрэглэгч 1 сонгоно уу");
//     return false;
//   } else if (temp.Team.filter((a: any) => a.ROLE_ID === 5).length === 0) {
//     alert("Батлах хэрэглэгч 2 сонгоно уу");
//     return false;
//   }
//   //  else if (
//   //   (parseInt(orgType.type) === 2 ||
//   //     parseInt(userDetils.USER_DEPARTMENT_ID) === 102) &&
//   //   temp.Team.filter((a) => a.ROLE_ID === 6 && a.IS_ACTIVE !== 0).length === 0
//   // ) {
//   //   alert("Батлах хэрэглэгч 3 сонгоно уу");
//   //   return false;
//   // }
//   else {
//     return true;
//   }
// }

function Burtgel(props: any) {
  const [data, loadData] = useState({});
  const Navigate = useNavigate();
  const [tsonkh, setTsonkh] = useState(0);
  const [checker, setChecker] = useState(false);
  const [orgType, setOrgType] = useState({
    type: 999,
  });
  const [shalgagdagch, setShalgagdagch] = useState(null);
  async function fetchData() {
    orgType.type = 999;
    if (props.shalgagdagch?.isNew === true) {
      loadData({
        Audit: {
          ID: null,
          AUDIT_CODE: "",
          AUDIT_TYPE: 999,
          PERIOD_ID: 999,
          DEPARMENT_ID: 999,
          DOCUMENT_ID: 999,
          EMPLOYEE_ID: 999,
          CONFIRM_DATE: dateFormat(new Date(), "dd-mmm-yy"),
          AUDIT_END_DATE: dateFormat(new Date(), "dd-mmm-yy"),
          CHECK_ORG_DELIVERY_DATE: dateFormat(new Date(), "dd-mmm-yy"),
          CLAIM_SUBMITED_DATE: dateFormat(new Date(), "dd-mmm-yy"),
          AUDIT_FORM_TYPE: 999,
          AUDIT_ORG_TYPE: 999,
          AUDIT_CHECK_DEP_ID: userDetils.USER_DEPARTMENT_ID,
          STATUS: 0,
          IS_ACTIVE: 1,
          CREATED_BY: userDetils?.USER_ID,
          CREATED_DATE: dateFormat(new Date(), "dd-mmm-yy"),
          CHECK_DEPARTMENT_ID: 999,
          USER_DEPARTMENT_ID: 999,
          SHILE_TYPE_ID: 999,
          REASON_TYPE_ID: 999,
          DEPARTMENT_NAME: null,
          DEPARTMENT_REGNO: null,
        },
        Team: [
          {
            ID: null,
            STAT_AUDIT_ID: null,
            AUDITOR_ID: 999,
            ROLE_ID: 1,
            IS_ACTIVE: 1,
          },
          {
            ID: null,
            STAT_AUDIT_ID: null,
            AUDITOR_ID: 999,
            ROLE_ID: 2,
            IS_ACTIVE: 1,
          },
        ],
        CREATED_BY: 1,
      });
    } else {
      let result = await axios(Stat_URL + "statisticIU");
      if ((await result.data?.Audit?.ID) !== undefined) {
        loadData(result.data);
        setOrgType({
          type: result.data?.Audit?.AUDIT_ORG_TYPE,
        });
      } else {
        loadData({
          Audit: {
            ID: null,
            AUDIT_CODE: "",
            AUDIT_TYPE: 999,
            PERIOD_ID: 999,
            DEPARMENT_ID: 999,
            DOCUMENT_ID: 999,
            EMPLOYEE_ID: 999,
            CONFIRM_DATE: dateFormat(new Date(), "dd-mmm-yy"),
            AUDIT_END_DATE: dateFormat(new Date(), "dd-mmm-yy"),
            CHECK_ORG_DELIVERY_DATE: dateFormat(new Date(), "dd-mmm-yy"),
            CLAIM_SUBMITED_DATE: dateFormat(new Date(), "dd-mmm-yy"),
            AUDIT_FORM_TYPE: 999,
            AUDIT_ORG_TYPE: 999,
            AUDIT_CHECK_DEP_ID: userDetils.USER_DEPARTMENT_ID,
            STATUS: 0,
            IS_ACTIVE: 1,
            CREATED_BY: userDetils?.USER_ID,
            CREATED_DATE: dateFormat(new Date(), "dd-mmm-yy"),
            CHECK_DEPARTMENT_ID: 999,
            USER_DEPARTMENT_ID: 999,
            SHILE_TYPE_ID: 999,
            REASON_TYPE_ID: 999,
            DEPARTMENT_NAME: null,
            DEPARTMENT_REGNO: null,
          },
          Team: [
            {
              ID: null,
              STAT_AUDIT_ID: null,
              AUDITOR_ID: 2,
              ROLE_ID: 1,
              IS_ACTIVE: 1,
            },
            {
              ID: null,
              STAT_AUDIT_ID: null,
              AUDITOR_ID: 3,
              ROLE_ID: 2,
              IS_ACTIVE: 1,
            },
          ],
          CREATED_BY: 1,
        });
      }
    }
  }

  useEffect(() => {
    fetchData();
  }, [props]);
  async function check(value: any) {
    let result = await axios(Stat_URL + "refPeriod" + value.Audit.PERIOD_ID);

    if (result.data) alert("Аудитын бүртгэл давхцаж байна");
    setChecker(result.data);
  }
  // let returnValue;
  // if (data?.Audit != undefined) {
  //   returnValue = (
  //     <div className="ml-32 w-10/12 ">
  //       {parseInt(orgType.type) === 2 && (tsonkh === 2 || tsonkh === 3) ? (
  //         <Users
  //           data={data}
  //           setData={(value: any) => loadData(value)}
  //           tsonkh={tsonkh}
  //           setTsonkh={(value: any) => setTsonkh(value)}
  //         />
  //       ) : null}
  //     </div>
  //   );
  // } else {
  //   returnValue = <h1>ачаалж байна</h1>;
  // }

  // return returnValue;
  return (
    <div
      style={{
        maxHeight: window.innerHeight - 129,
        maxWidth: window.innerWidth,
        overflow: "scroll",
        padding: "1rem 0 0 1rem",
      }}
    >
      <div
        style={{
          backgroundImage: `url(${imagebackground})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <Title title={"ХУВААРЬ"} widthS={"5rem"} widthL={"5rem"} />
      </div>
      {shalgagdagch === null ? (
        <div className="ml-20 bg-blue-500 w-48 h-10 rounded-lg mt-6">
          <div className="space-y-4">
            <p className="text-white text-center  pt-2">ХУВААРИЙН БҮРТГЭЛ</p>
          </div>
        </div>
      ) : (
        <Burtgel shalgagdagch={shalgagdagch} />
      )}
      <div className="ml-32 w-10/12 ">
        {/* <Users
          data={data}
          setData={(value: any) => loadData(value)}
          tsonkh={tsonkh}
          setTsonkh={(value: any) => setTsonkh(value)}
        /> */}

        <div
          style={{
            display: "flex row text-base",
            padding: "8rem 0rem 0rem 0rem",
          }}
        >
          <div className="flex  md:justify-center sm:justify-end">
            <div className="flex flex-row">
              <div className="grid grid-rows-4  lg:grid-flow-col md:grid-flow-row sm:grid-flow-row ">
                <div className="flex space-x-40 space-x-reverse">
                  <div className="w-6/12">
                    <label className="block md:text-right md:mb-10  pr-6">
                      <span className="text-md">Тайлант хугацаа:</span>
                    </label>
                  </div>
                  <div className="w-6/12 ">
                    <Period
                      data={data}
                      setData={(value: any) => {
                        loadData(value);
                        check(value);
                      }}
                    />
                  </div>
                </div>
                <div className="flex space-x-40 space-x-reverse">
                  <div className="w-6/12">
                    <label className="block md:text-right md:mb-1 pr-6">
                      <span className="text-md">Баталгаажуулах хугацаа:</span>
                    </label>
                  </div>
                  <div className="w-6/12">
                    <input
                      type="date"
                      className="inputRoundedMetting"
                      onChange={(e) => {
                        loadData({
                          ...data,
                          ...{
                            FOREGONE_DATE: e.target.value,
                          },
                        });
                      }}
                    />
                  </div>
                </div>
                <div className="flex space-x-40 space-x-reverse">
                  <div className="w-6/12">
                    <label className="block md:text-right md:mb-0 pr-6">
                      <span className="text-md">
                        Төрийн аудитын байгууллага:
                      </span>
                    </label>
                  </div>
                  <div className="w-6/12">
                    <Department
                      data={data}
                      setData={(value: any) => {
                        loadData(value);
                        check(value);
                      }}
                    />
                  </div>
                </div>
                <div className="flex space-x-40 space-x-reverse">
                  <div className="w-6/12">
                    <label className="block md:text-right md:mb-0 pr-6">
                      <span className="text-md">Маягтын дугаар:</span>
                    </label>
                  </div>
                  <div className="w-6/12">
                    <Document
                      data={data}
                      setData={(value: any) => {
                        loadData(value);
                        check(value);
                      }}
                    />
                  </div>
                </div>
                <div className="flex  space-x-40 space-x-reverse">
                  <div className="w-6/12">
                    <label className="block md:text-right md:mb-0 pr-6">
                      <span className="text-md">Баг:</span>
                    </label>
                  </div>
                  <div className="w-6/12">
                    {/* <Employee
                    data={data}
                    setData={(value: any) => {
                      loadData(value);
                      check(value);
                    }}
                  /> */}
                  </div>
                </div>
                <div className="flex  space-x-40 space-x-reverse">
                  <div className="w-6/12">
                    <label className="block md:text-right md:mb-0 pr-6">
                      <span className="text-md">Батлах хэрэглэгч 1:</span>
                    </label>
                  </div>
                  <div className="w-6/12"></div>
                </div>
                <div className="flex  space-x-40 space-x-reverse">
                  <div className="w-6/12">
                    <label className="block md:text-right md:mb-0 pr-6">
                      <span className="text-md">Батлах хэрэглэгч 2:</span>
                    </label>
                  </div>
                  <div className="w-6/12">
                    <textarea className="border rounded-md h-10 text-sm" />
                  </div>
                </div>
                <div className="flex  space-x-40 space-x-reverse">
                  <div className="w-6/12">
                    <label className="block md:text-right md:mb-0 pr-6">
                      <span className="text-md">Батлах хэрэглэгч 3:</span>
                    </label>
                  </div>
                  <div className="w-6/12 ">
                    <textarea className="border rounded-md h-10 text-sm" />
                  </div>
                  <div className="self-baseline">
                    {/* <button type="button" onClick={() => Users}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                        />
                      </svg>
                    </button> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "end" }}>
          <button className="md:items-end rounded mr-28 ml-10 mt-20">
            <SaveButton />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Burtgel;
