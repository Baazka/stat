import React, { useEffect, useState, HTMLAttributes, HTMLProps } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Title from "./Title";
import { saveIcon, deleteIcon } from "../assets/zurag";

import imagebackground from "../assets/zurag/background.png";
import SaveButton from "./SaveButton";
import {
  Column,
  Table,
  useReactTable,
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFacetedMinMaxValues,
  getPaginationRowModel,
  getSortedRowModel,
  FilterFn,
  ColumnDef,
  flexRender,
} from "@tanstack/react-table";
import {
  RankingInfo,
  rankItem,
  compareItems,
} from "@tanstack/match-sorter-utils";
import DataRequest from "../functions/make_Request";
import Stat_Url from "../Stat_URL";
import axios from "axios";

import dateFormat, { masks } from "dateformat";

declare module "@tanstack/table-core" {
  interface FilterFns {
    fuzzy: FilterFn<unknown>;
  }
  interface FilterMeta {
    itemRank: RankingInfo;
  }
}
const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value);

  // Store the itemRank info
  addMeta({
    itemRank,
  });

  // Return if the item should be filtered in/out
  return itemRank.passed;
};

function Burtgel(props: any) {
  const [tsonkh, setTsonkh] = useState(0);
  //@ts-ignore
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));
  let navigate = useNavigate();
  const { state } = useLocation();
  const [data, loadData] = useState({
    Audit: {
      ID: null,
      PERIOD_ID: 999,
      DEPARTMENT_ID: 999,
      DOCUMENT_ID: 999,
      AUDIT_TYPE_ID: 999,
      CONFIRM_DATE: new Date(),
    },
    Team: [],
    CREATED_BY: userDetails.USER_ID,
  });

  const [drop, setDrop] = useState({
    drop1: [],
    drop2: [],
    drop3: [],
    drop4: [],
  });

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    if (state?.ID !== undefined && state.ID !== null) {
      DataRequest({
        url: Stat_Url + "get_stat_plan",
        method: "POST",
        data: { STAT_ID: state?.ID },
      })
        .then(function (response) {
          if (response.data !== undefined && response.data !== null) {
            loadData(response.data);
          }
        })
        .catch(function (error) {
          alert("Aмжилтгүй");
        });
    }

    let listItems = await axios(Stat_Url + "refDepartment?DepType=1");
    if (listItems.data !== undefined && listItems.data.length > 0) {
      let temp = drop;
      temp.drop1 = listItems.data;
      setDrop({ ...temp });
    }
    let refPeriod = await axios(Stat_Url + "refPeriod");
    if (refPeriod.data !== undefined && refPeriod.data.length > 0) {
      let temp = drop;
      temp.drop2 = refPeriod.data;
      setDrop({ ...temp });
    }
    let refDocument = await axios(Stat_Url + "refDocument?DocType=1");
    if (refDocument.data !== undefined && refDocument.data.length > 0) {
      let temp = drop;
      temp.drop3 = refDocument.data;
      setDrop({ ...temp });
    }
    let refAuditType = await axios(Stat_Url + "refAuditType");
    if (refAuditType.data !== undefined && refAuditType.data.length > 0) {
      let temp = drop;
      temp.drop4 = refAuditType.data;
      setDrop({ ...temp });
    }
  }
  function requiredField() {
    if (data.Audit.PERIOD_ID === 999) {
      alert("Тайлант хугацаа сонгоно уу");
      return false;
    } else if (data.Audit.DEPARTMENT_ID === 999) {
      alert("Төрийн аудитын байгууллага сонгоно уу");
      return false;
    } else if (data.Audit.DOCUMENT_ID === 999) {
      alert("Маягтын дугаар сонгоно уу");
      return false;
    } else if (data.Team.find((a) => a.ROLE_ID === 1) === undefined) {
      alert("Багийн гишүүн сонгоно уу");
      return false;
    } else if (data.Team.find((a) => a.ROLE_ID === 2) === undefined) {
      alert("Батлах хэрэглэгч 1 сонгоно уу");
      return false;
    } else if (data.Team.find((a) => a.ROLE_ID === 3) === undefined) {
      alert("Батлах хэрэглэгч 2 сонгоно уу");
      return false;
    } else {
      return true;
    }
  }

  function savetoDB() {
    DataRequest({
      url: Stat_Url + "statisticCheck",
      method: "POST",
      data: {
        PERIOD_ID: data.Audit.PERIOD_ID,
        DEPARTMENT_ID: data.Audit.DEPARTMENT_ID,
        DOCUMENT_ID: data.Audit.DOCUMENT_ID,
        AUDIT_TYPE_ID: data.Audit.AUDIT_TYPE_ID,
      },
    })
      .then(function (resp) {
        if ((data.Audit.ID === null && !resp.data) || data.Audit.ID !== null) {
          if (requiredField()) {
            DataRequest({
              url: Stat_Url + "statisticIU",
              method: "POST",
              data: data,
            })
              .then(function (response) {
                if (response?.data.message === "Хадгаллаа.") {
                  alert("амжилттай хадгаллаа");
                  navigate("/web/Home/Audit");
                }
              })
              .catch(function (error) {
                alert("Aмжилтгүй");
              });
          }
        } else {
          alert("Хувиар давхардаж байна!!!");
        }
      })
      .catch(function (error) {});
  }

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
      {/* <div className="ml-20 bg-blue-500 w-48 h-10 rounded-lg mt-6">
        <div className="space-y-4">
          <p className="text-white text-center  pt-2">ХУВААРИЙН БҮРТГЭЛ</p>
        </div>
      </div> */}

      <div className="w-full ">
        {tsonkh !== 0 ? (
          <Employee
            setTsonkh={setTsonkh}
            data={data}
            loadData={loadData}
            tsonkh={tsonkh}
          />
        ) : null}

        <div
          style={{
            display: "flex row text-base",
            padding: "4rem 0rem 0rem 0rem",
          }}
        >
          <div className="flex  md:justify-center sm:justify-center">
            <div className="flex flex-row">
              <div className="grid grid-rows-3  lg:grid-flow-col md:grid-flow-row sm:grid-flow-row ">
                <div className="flex space-x-40 space-x-reverse">
                  <div className="w-6/12">
                    <label className="block md:text-right md:mb-10  pr-6">
                      <span className="text-md">Тайлант хугацаа:</span>
                    </label>
                  </div>
                  <div className="w-6/12 ">
                    <select
                      className="rounded text-sm focus:outline-none"
                      disabled={data.Audit.ID !== null ? true : false}
                      style={{
                        height: 45,
                        width: 200,
                        border: "1px solid gray",
                      }}
                      value={data.Audit.PERIOD_ID}
                      onChange={(value) => {
                        let temp = data;
                        temp.Audit.PERIOD_ID = value.target.value;
                        loadData({ ...temp });
                      }}
                    >
                      <option value={999}>Бүгд</option>
                      {drop.drop2.map((nation, index) => (
                        <option
                          className="font-semibold"
                          key={nation.YEAR_NAME}
                          value={nation.PERIOD_ID}
                        >
                          {nation.YEAR_LABEL}
                        </option>
                      ))}
                    </select>
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
                      style={{
                        height: 45,
                        width: 200,
                      }}
                      value={dateFormat(
                        data.Audit.CONFIRM_DATE === null ||
                          data.Audit.CONFIRM_DATE === undefined
                          ? ""
                          : data.Audit.CONFIRM_DATE,
                        "yyyy-mm-dd"
                      )}
                      onChange={(e) => {
                        let temp = data;
                        temp.Audit.CONFIRM_DATE = e.target.value;
                        loadData({
                          ...temp,
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
                    <select
                      className="rounded text-sm focus:outline-none"
                      disabled={data.Audit.ID !== null ? true : false}
                      style={{
                        width: 200,
                        height: 45,
                        border: "1px solid gray",
                      }}
                      value={data.Audit.DEPARTMENT_ID}
                      onChange={(value) => {
                        let temp = data;
                        temp.Audit.DEPARTMENT_ID = value.target.value;
                        loadData({ ...temp });
                      }}
                    >
                      <option className="text-center" value={999}>
                        Сонгоно уу
                      </option>
                      {drop.drop1
                        .filter(
                          (i) =>
                            i.DEPARTMENT_ID ===
                            (userDetails.USER_TYPE_NAME === "ADMIN"
                              ? i.DEPARTMENT_ID
                              : userDetails.USER_DEPARTMENT_ID)
                        )
                        .map((nation, index) => (
                          <option
                            className="font-semibold"
                            key={nation.DEPARTMENT_SHORT_NAME}
                            value={nation.DEPARTMENT_ID}
                          >
                            {nation.DEPARTMENT_NAME}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>
                <div className="flex space-x-40 space-x-reverse">
                  <div className="w-6/12">
                    <label className="block md:text-right md:mb-0 pr-6">
                      <span className="text-md">Маягтын дугаар:</span>
                    </label>
                  </div>
                  <div className="w-6/12">
                    <select
                      className="rounded text-sm focus:outline-none "
                      disabled={data.Audit.ID !== null ? true : false}
                      style={{
                        width: 200,
                        height: 45,
                        border: "1px solid gray",
                      }}
                      value={data.Audit.DOCUMENT_ID}
                      onChange={(value) => {
                        let temp = data;
                        temp.Audit.DOCUMENT_ID = value.target.value;
                        loadData({ ...temp });
                      }}
                    >
                      <option className="text-center" value={999}>
                        Сонгоно уу
                      </option>
                      {drop.drop3
                        .filter(
                          (i) =>
                            i.IS_TAB ===
                            (userDetails.USER_TYPE_NAME === "MANAGER"
                              ? 1
                              : userDetails.USER_TYPE_NAME === "ADMIN" ||
                                userDetails.USER_TYPE_NAME === "STAT_ADMIN"
                              ? i.IS_TAB
                              : 0)
                        )
                        .map((nation, index) => (
                          <option
                            className="font-semibold"
                            key={nation.DOCUMENT_SHORT_NAME}
                            value={nation.ID}
                          >
                            {nation.DOCUMENT_SHORT_NAME +
                              " " +
                              nation.DOCUMENT_NAME}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>
                <div className="flex space-x-40 space-x-reverse mb-4">
                  <div className="w-6/12">
                    <label className="block md:text-right md:mb-0 pr-6">
                      <span className="text-md">Аудитын төрөл:</span>
                    </label>
                  </div>
                  <div className="w-6/12">
                    <select
                      className="rounded text-sm focus:outline-none "
                      disabled={data.Audit.ID !== null ? true : false}
                      style={{
                        width: 200,
                        height: 45,
                        border: "1px solid gray",
                      }}
                      value={data.Audit.AUDIT_TYPE_ID}
                      onChange={(value) => {
                        let temp = data;
                        temp.Audit.AUDIT_TYPE_ID = value.target.value;
                        loadData({ ...temp });
                      }}
                    >
                      <option className="text-center" value={999}>
                        Сонгоно уу
                      </option>
                      {drop.drop4.map((nation, index) => (
                        <option
                          className="font-semibold"
                          key={nation.AUDIT_TYPE_NAME}
                          value={nation.AUDIT_TYPE_ID}
                        >
                          {nation.AUDIT_TYPE_NAME}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="flex space-x-40 space-x-reverse mb-4">
                  <div className="w-6/12">
                    <label className="block md:text-right md:mb-1 pr-6">
                      Багийн гишүүд:
                    </label>
                  </div>
                  <div className="w-6/12 relative">
                    <div
                      className="rounded-md text-sm h-12"
                      style={{
                        border: "1px solid gray",
                        width: "200px",
                        overflow: "scroll",
                      }}
                    >
                      {data.Team.map((value, index) =>
                        value.ROLE_ID === 1 && value.IS_ACTIVE !== 0 ? (
                          <div className="flex flex-row">
                            <span>
                              {value.USER_CODE + " " + value.USER_NAME}
                            </span>
                            <img
                              src={deleteIcon}
                              width="20px"
                              className="ml-1 cursor-pointer"
                              onClick={() => {
                                let temp = data;
                                temp.Team[index].IS_ACTIVE = 0;
                                // temp.Team = temp.Team.filter(
                                //   (a, ind) => ind != index
                                // );
                                loadData({ ...temp });
                              }}
                            />
                          </div>
                        ) : null
                      )}
                    </div>
                    <div className="absolute top-0 -right-8">
                      <button type="button" onClick={() => setTsonkh(1)}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 mt-4 ml-3"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-40 space-x-reverse mb-4">
                  <div className="w-6/12">
                    <label className="block md:text-right md:mb-1 pr-6">
                      Батлах хэрэглэгч 1:
                    </label>
                  </div>
                  <div className="w-6/12 relative">
                    <div
                      className="rounded-md text-sm h-12"
                      style={{
                        border: "1px solid gray",
                        width: "200px",
                      }}
                    >
                      {data.Team.map((value, index) =>
                        value.ROLE_ID === 2 && value.IS_ACTIVE !== 0 ? (
                          <div className="flex flex-row">
                            <span>
                              {value.USER_CODE + " " + value.USER_NAME}
                            </span>
                            <img
                              src={deleteIcon}
                              width="20px"
                              className="ml-1 cursor-pointer"
                              onClick={() => {
                                let temp = data;
                                temp.Team[index].IS_ACTIVE = 0;
                                // temp.Team = temp.Team.filter(
                                //   (a, ind) => ind != index
                                // );
                                loadData({ ...temp });
                              }}
                            />
                          </div>
                        ) : null
                      )}
                    </div>
                    <div className="absolute top-0 -right-8">
                      <button type="button" onClick={() => setTsonkh(2)}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 mt-4 ml-3"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-40 space-x-reverse mb-4">
                  <div className="w-6/12">
                    <label className="block md:text-right md:mb-1 pr-6">
                      Батлах хэрэглэгч 2:
                    </label>
                  </div>
                  <div className="w-6/12 relative">
                    <div
                      className="rounded-md text-sm h-12"
                      style={{
                        border: "1px solid gray",
                        width: "200px",
                      }}
                    >
                      {data.Team.map((value, index) =>
                        value.ROLE_ID === 3 && value.IS_ACTIVE !== 0 ? (
                          <div className="flex flex-row">
                            <span>
                              {value.USER_CODE + " " + value.USER_NAME}
                            </span>
                            <img
                              src={deleteIcon}
                              width="20px"
                              className="ml-1 cursor-pointer"
                              onClick={() => {
                                let temp = data;
                                temp.Team[index].IS_ACTIVE = 0;
                                // temp.Team = temp.Team.filter(
                                //   (a, ind) => ind != index
                                // );
                                loadData({ ...temp });
                              }}
                            />
                          </div>
                        ) : null
                      )}
                    </div>
                    <div className="absolute top-0 -right-8">
                      <button type="button" onClick={() => setTsonkh(3)}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 mt-4 ml-3"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-40 space-x-reverse mb-4">
                  <div className="w-6/12">
                    <label className="block md:text-right md:mb-1 pr-6">
                      Батлах хэрэглэгч 3:
                    </label>
                  </div>
                  <div className="w-6/12 relative">
                    <div
                      className="rounded-md text-sm h-12"
                      style={{
                        border: "1px solid gray",
                        width: "200px",
                      }}
                    >
                      {data.Team.map((value, index) =>
                        value.ROLE_ID === 4 && value.IS_ACTIVE !== 0 ? (
                          <div className="flex flex-row">
                            <span>
                              {value.USER_CODE + " " + value.USER_NAME}
                            </span>
                            <img
                              src={deleteIcon}
                              width="20px"
                              className="ml-1 cursor-pointer"
                              onClick={() => {
                                let temp = data;
                                temp.Team[index].IS_ACTIVE = 0;
                                // temp.Team = temp.Team.filter(
                                //   (a, ind) => ind != index
                                // );
                                loadData({ ...temp });
                              }}
                            />
                          </div>
                        ) : null
                      )}
                    </div>
                    <div className="absolute top-0 -right-8">
                      <button type="button" onClick={() => setTsonkh(4)}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 mt-4 ml-3"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "end" }}>
          <button className="md:items-end rounded mr-28 mt-10">
            <SaveButton saveToDB={() => savetoDB()} />
          </button>
        </div>
      </div>
    </div>
  );
}

function Employee(props: any) {
  //@ts-ignore
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [globalFilter, setGlobalFilter] = React.useState("");
  const [rowSelection, setRowSelection] = React.useState({});

  const columns = React.useMemo(
    () => [
      {
        id: "select",
        header: ({ table }) =>
          props.tsonkh === 1 ? (
            <IndeterminateCheckbox
              {...{
                checked: table.getIsAllRowsSelected(),
                indeterminate: table.getIsSomeRowsSelected(),
                onChange: table.getToggleAllRowsSelectedHandler(),
              }}
            />
          ) : null,
        cell: ({ row }) => (
          <div>
            <IndeterminateCheckbox
              {...{
                checked: row.getIsSelected(),
                disabled: !row.getCanSelect(),
                indeterminate: row.getIsSomeSelected(),
                onChange: row.getToggleSelectedHandler(),
                tsonkh: props.tsonkh,
                data: props.data,
                loadData: props.loadData,
                setTsonkh: props.setTsonkh,
                row,
              }}
            />
          </div>
        ),
      },
      {
        accessorFn: (row, index) => index + 1,
        id: "№",
        minSize: "40px",
        maxSize: "40px",
        size: "40px",
      },
      {
        accessorKey: "DEPARTMENT_NAME",
        cell: (info) => info.getValue(),
        header: "Төрийн аудитын байгууллага",
        footer: (props) => props.column.id,
        // enableColumnFilter : false,
      },
      {
        accessorKey: "SUB_DEPARTMENT_NAME",
        header: "Харъяа газар",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "POSITION_NAME",
        header: "Албан тушаал",
        cell: (info) => info.getValue(),
      },

      {
        accessorKey: "USER_NAME",
        header: "Албан хаагчийн нэр",
        cell: (info) => info.getValue(),
      },

      {
        accessorKey: "USER_CODE",
        header: "Аудиторын код",
        cell: (info) => info.getValue(),
      },
    ],
    []
  );

  const [data, setData] = React.useState([]);

  const table = useReactTable({
    data,
    columns,
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    state: {
      columnFilters,
      globalFilter,
      rowSelection,
    },
    enableRowSelection: true, //enable row selection for all rows
    // enableRowSelection: row => row.original.age > 18, // or enable row selection conditionally per row
    onRowSelectionChange: setRowSelection,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: fuzzyFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
  });

  useEffect(() => {
    async function fetchData() {
      DataRequest({
        url: Stat_Url + "refEmployee",
        method: "POST",
        data: {
          DEPARTMENT_ID: userDetails.USER_DEPARTMENT_ID,
          SUB_DEPARTMENT_ID: userDetails.USER_SUB_DEPARTMENT_ID,
        },
      })
        .then(function (response) {
          if (response.data !== undefined && response?.data.length > 0)
            setData(response.data);
        })
        .catch(function (error) {
          alert("Aмжилтгүй");
        });
    }
    fetchData();
  }, [props]);

  function saveToDB() {
    let temp = props.data;
    for (let j in rowSelection) {
      let temp_team = {
        ID: null,
        STAT_AUDIT_ID: temp.Audit.ID,
        AUDITOR_ID: 55,
        ROLE_ID: 1,
        IS_ACTIVE: 1,
        AUDITOR_NAME: null,
        USER_CODE: null,
      };
      temp_team.AUDITOR_ID = data[j].USER_ID;
      temp_team.USER_NAME = data[j].USER_NAME;
      temp_team.USER_CODE = data[j].USER_CODE;
      temp.Team.push(temp_team);
    }
    props.loadData(temp);
    props.setTsonkh(0);
  }

  let listItems;
  if (data !== undefined) {
    listItems = (
      <div
        style={{
          position: "absolute",
          width: "60%",
          height: "auto",
          left: "25%",
          top: "8.5%",
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
        <div className="flex justify-between h-8 p-2 mb-3">
          <div className="flex ">
            <DebouncedInput
              value={globalFilter ?? ""}
              onChange={(value) => setGlobalFilter(String(value))}
              className="p-1.5 font-lg shadow border border-block rounded h-8"
              placeholder="Search all columns..."
            />
          </div>
        </div>

        <div style={{ overflow: "scroll" }}>
          <div />
          <table>
            <thead className="TableHeadBackroundcolor">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <th
                        key={header.id}
                        colSpan={header.colSpan}
                        style={{ verticalAlign: "bottom" }}
                      >
                        {header.isPlaceholder ? null : (
                          <>
                            <div
                              onMouseDown={header.getResizeHandler()}
                              onTouchStart={header.getResizeHandler()}
                            ></div>
                            <div
                              {...{
                                className: header.column.getCanSort()
                                  ? "cursor-pointer select-none"
                                  : "",
                                onClick:
                                  header.column.getToggleSortingHandler(),
                              }}
                            >
                              {flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                            </div>

                            {header.column.getCanFilter() ? (
                              <div>
                                <Filter column={header.column} table={table} />
                              </div>
                            ) : null}
                          </>
                        )}
                      </th>
                    );
                  })}
                </tr>
              ))}
            </thead>
            <tbody className="overflow-scroll ">
              {table.getRowModel().rows.map((row, i) => {
                return (
                  <tr
                    key={row.id}
                    className={i % 2 > 0 ? "tr bg-gray-100" : "tr"}
                  >
                    {row.getVisibleCells().map((cell, index) => {
                      return (
                        <td key={cell.id} className="p-2">
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div style={{ justifyContent: "flex-end" }}>
          <div className="justify-end flex items-center gap-1 mt-5 mr-2">
            <button
              className="border p-0.8 color bg-blue-300 rounded-md w-6 text-white"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              {"<<"}
            </button>
            <button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="border p-0.8 color bg-blue-300 rounded-md w-6 text-white"
            >
              {"<"}
            </button>
            <button
              className="border p-0.8 color bg-blue-300 rounded-md w-6 text-white"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              {">"}
            </button>
            <button
              className="border p-0.8 color bg-blue-300 rounded-md w-6 text-white"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              {">>"}
            </button>
            <span className="flex items-center gap-4">
              <div>нийт</div>
              <strong>
                {table.getState().pagination.pageIndex + 1} -
                {table.getPageCount()}
              </strong>
            </span>
            <select
              value={table.getState().pagination.pageSize}
              onChange={(e) => {
                table.setPageSize(Number(e.target.value));
              }}
              className="border p-0.8 bg-blue-300 rounded-lg text-white ml-2"
            >
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <option key={pageSize} value={pageSize}>
                  {pageSize}
                </option>
              ))}
            </select>
          </div>
        </div>
        {props.tsonkh === 1 ? (
          <div className="mt-2 p-2">
            <SaveButton saveToDB={() => saveToDB()} />
          </div>
        ) : null}
      </div>
    );
  } else {
    listItems = <h1>ачаалж байна</h1>;
  }
  return listItems;
}

function Filter({
  column,
  table,
}: {
  column: Column<any, any>;
  table: Table<any>;
}) {
  const firstValue = table
    .getPreFilteredRowModel()
    .flatRows[0]?.getValue(column.id);

  return (
    <div className="flex space-x-2">
      <input
        type="text"
        value={(column.getFilterValue() ?? "") as string}
        onChange={(e) => column.setFilterValue(e.target.value)}
        placeholder={`Search...`}
        className="border shadow rounded w-full"
      />
    </div>
  );
}

function DebouncedInput({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}: {
  value: string | number;
  onChange: (value: string | number) => void;
  debounce?: number;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange">) {
  const [value, setValue] = React.useState(initialValue);

  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <div className=" overflow-hidden flex border rounded-md h-7">
      <input
        type="text"
        value={value || ""}
        className=" text-sm "
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder="Хайх утгаа оруулна уу..."
        style={{
          width: "200px",
        }}
      />

      <button className="flex items-center px-2.5 border-l bg-blue-500 rounded-md">
        <svg
          className="h-4 w-4 text-grey-dark"
          fill="currentColor"
          color="white"
          enableBackground=""
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z" />
        </svg>
      </button>
    </div>
  );
}
function IndeterminateCheckbox({
  indeterminate,
  className = "",
  data,
  loadData,
  tsonkh,
  row,
  setTsonkh,
  ...rest
}: { indeterminate?: boolean } & HTMLProps<HTMLInputElement>) {
  const ref = React.useRef<HTMLInputElement>(null!);

  React.useEffect(() => {
    if (typeof indeterminate === "boolean") {
      ref.current.indeterminate = !rest.checked && indeterminate;
    }
  }, [ref, indeterminate]);
  function saveToDB(value) {
    if (tsonkh !== 1) {
      let temp = data;

      let temp_team = {
        ID: null,
        STAT_AUDIT_ID: temp.Audit.ID,
        AUDITOR_ID: null,
        ROLE_ID: tsonkh,
        IS_ACTIVE: 1,
        USER_NAME: null,
        USER_CODE: null,
      };
      temp_team.AUDITOR_ID = row.original.USER_ID;
      temp_team.USER_NAME = row.original.USER_NAME;
      temp_team.USER_CODE = row.original.USER_CODE;
      temp.Team.push(temp_team);
      loadData(temp);
      setTsonkh(0);
    }

    //  }
  }

  return tsonkh === 1 ? (
    <input
      type="checkbox"
      ref={ref}
      className={className + " cursor-pointer"}
      {...rest}
    />
  ) : (
    <input
      type="checkbox"
      ref={ref}
      className={className + " cursor-pointer"}
      onClick={(value) => saveToDB(ref)}
      {...rest}
    />
  );
}
export default Burtgel;
