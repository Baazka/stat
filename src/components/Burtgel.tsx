import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Title from "./Title";
import { saveIcon, deleteIcon } from "../assets/zurag";
import "../pages/Home.css";
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
import ButtonSearch from "../components/ButtonSearch"
import axios from "axios";

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

type Stat_m5 = {
  AUDIT_ON: string;
  AUDIT_TOROL: string;
  AUDIT_NER_SDEV: string;
  AUDIT_KOD: number;
  AKT_ALBAN_SHAARDLGA_DUGR: number;
  AKT_ALBN_SHAARDLGIN_OGNOO: string;
  HULEEN_OGSON_OGNOO: string;
  ZORCHIL_ARILGAH_OGNOO: string;
  ZORCHIL_TOWCH_UTGA: string;
  TUHAIN_UR_DUN_ALDAA_ZTE: string;
  ZORCHIL_ANGILL: string;
  ALBAN_SHAARDLGIN_DUN_T: number;
  TOLOWLH_DANSNI_TOROL_TOGROG: number;
  BAIGUULGIN_NR: string;
  REGISTER_DUGAAR: number;
  TOSOW_ZAHIRGCH_ANGILL: string;
  OWOG_NER: string;
  ALBAN_TUSHAAL: string;
  AUDITR_HUWIIN_DUGAAR: number;
  ZORCHIL_ARILGH_BARIMT_OGNOO: string;
  BIELSEN_ALBAN_SHARDLGIN_DUN_T: number;
  DUNE_TOGROG: number;
  HUGATSAANII_TOLOW: string;
  ERH_BUHII_BAIGUULLGD_SHILJUULH_ESEH: string;
  UR_OGOOJ_TOROL: string;
  UR_OGOOJ_TOOTSH_ESEH: string;
  DUN_TOGROG: number;
  HULEEGDEJ_BUI_UR_OGOOJ: string;
};



function Burtgel(props:any) {
  const mayagtData = props.mayagtData;
  const userDetils = props.userDetils;
  const [tsonkh, setTsonkh] = useState(0);
  const [data, loadData] = useState({
          Audit:{
          ID:null,
          PERIOD_ID:1,
          DEPARTMENT_ID:101,
          DOCUMENT_ID:1,
          CONFIRM_DATE:""
      },
      Team:[
          // {
          // "ID":null,
          // "STAT_AUDIT_ID":null,
          // "AUDITOR_ID":55,
          // "ROLE_ID":1,
          // "IS_ACTIVE":1        
          // }
      ],
      CREATED_BY:1
  }
  );
  const[drop,setDrop] = useState({
    drop1:[],
    drop2:[],
    drop3:[],
  }
  )

  const [checker, setChecker] = useState(false);
  const [shalgagdagch, setShalgagdagch] = useState(null);
  
  useEffect(() => {
    async function fetchData() {
      let listItems = await axios(Stat_Url + "refDepartment");
      if (listItems.data !== undefined && listItems.data.length > 0){
        let temp = drop
        temp.drop1 = listItems.data
        setDrop({...temp});
      }
      let refPeriod = await axios(Stat_Url + "refPeriod");
      if (refPeriod.data !== undefined && refPeriod.data.length > 0){
        let temp = drop
        temp.drop2 = refPeriod.data
        setDrop({...temp});
      }
      let refDocument = await axios(Stat_Url + "refDocument?DocType=1");
      if (refDocument.data !== undefined && refDocument.data.length > 0){
        let temp = drop
        temp.drop3 = refDocument.data
        setDrop({...temp});
      }
      
    }
    fetchData();
  }, [props]);

  
  async function saveData() {
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
       <div className="ml-20 bg-blue-500 w-48 h-10 rounded-lg mt-6">
          <div className="space-y-4">
            <p className="text-white text-center  pt-2">ХУВААРИЙН БҮРТГЭЛ</p>
          </div>
        </div>
    
      <div className="ml-32 w-10/12 ">
       {tsonkh === 1 ? <Employee setTsonkh={setTsonkh}  />:null}
     

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
                  <select
                      className="border rounded text-sm focus:outline-none py-0.5 w-28 "
                     onChange={(value)=>{
                      let temp = data
                      temp.Audit.PERIOD_ID = value.target.value;
                      loadData({...temp})
                     }}
                    >
                      <option value={999}>Бүгд</option>
                      {drop.drop2.map((nation, index) => (
                        <option
                          className="font-semibold"
                          key={nation.PERIOD_LABEL}
                          value={nation.ID}
                        >
                          {nation.PERIOD_LABEL}
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
                      onChange={(e) => {
                        let temp = data
                        temp.Audit.CONFIRM_DATE = e.target.value;
                        loadData({
                          ...temp,
                          ...{
                            CONFIRM_DATE: e.target.value,
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
                  <select
                      className="border rounded text-sm focus:outline-none py-0.5 w-28 "
                     onChange={(value)=>{
                     
                      let temp = data
                      temp.Audit.DEPARTMENT_ID = value.target.value;
                      loadData({...temp})
                     }}
                    >
                      <option value={999}>Бүгд</option>
                      {drop.drop1.map((nation, index) => (
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
                      className="border rounded text-sm focus:outline-none py-0.5 w-28 "
                     onChange={(value)=>{
                      let temp = data
                      temp.Audit.DOCUMENT_ID = value.target.value;
                      loadData({...temp})
                     }}
                    >
                      <option value={999}>Бүгд</option>
                      {drop.drop3.map((nation, index) => (
                        <option
                          className="font-semibold"
                          key={nation.DOCUMENT_SHORT_NAME}
                          value={nation.ID}
                        >
                          {nation.DOCUMENT_NAME}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="flex  space-x-40 space-x-reverse">
                <div className="flex flex-row " style={{ padding: "0.1rem" }}>
              <div style={{ width: "35%" }}>
                <label>Багийн гишүүд:</label>{" "}
              </div>
              <div style={{ width: "60%", display: "flex" }}>
                <div
                  style={{
                    minHeight: "100px",
                    border: "2px solid gray",
                    width: "270px",
                  }}
                >
                  {data.Team.map((value, index) =>
                    value.ROLE_ID === 3 && value.IS_ACTIVE !== 0 ? (
                      <div className="flex flex-row">
                        <span>{value.USER_CODE + " " + value.USER_NAME}</span>
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
                <div>
                  
                    <button type="button" onClick={() => setTsonkh(1)}>
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
                    </button>
                  
                </div>
              </div>
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
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "end" }}>
          <button className="md:items-end rounded mr-28 ml-10 mt-20">
            <SaveButton saveToDB = {()=>console.log(data,"savedata")} />
          </button>
        </div>
      </div>
    </div>
  );
}



function Employee(props:any) {
  //@ts-ignore
  const userDetils = JSON.parse(localStorage.getItem("userDetails"));
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [globalFilter, setGlobalFilter] = React.useState("");
  const columns = React.useMemo(
    () => [
      {
        accessorFn: (row, index) => index + 1,
        id: "№",
      },
      {
        accessorKey: "DEPARTMENT_ID",
        cell: (info) => info.getValue(),
        header: "Үндэсний аудитын газар",
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "DEPARTMENT_NAME",
        header: "Аудитор",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "POSITION_NAME",
        header: "Санхүү нийцлийн аудитын газар",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "SUB_DEPARTMENT_ID",
        header: "А0175303",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "SUB_DEPARTMENT_NAME",
        header: "Албан шаардлагын огноо",
        cell: (info) => info.getValue(),
      },

      {
        accessorKey: "USER_CODE",
        header: "Албан шаардлагын дугаар",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "USER_ID",
        header: "Хүлээн өгсөн огноо",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "USER_NAME",
        header: "Зөрчлийг арилгах огноо",
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
    },
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
    debugTable: true,
    debugHeaders: true,
    debugColumns: false,
  });



  useEffect(() => {
    async function fetchData() {
      DataRequest({
        url:
        Stat_Url + 'refEmployee',
        method: "POST",
        data: {
          DEPARTMENT_ID:null,//userDetils.USER_DEPARTMENT_ID,
          SUB_DEPARTMENT_ID:null,//userDetils.USER_SUB_DEPARTMENT_ID
        },
      })
        .then(function(response) {
          if(response.data !== undefined && response?.data.length > 0)
          setData(response.data)
          
        })
        .catch(function(error) {
          alert("Aмжилтгүй");
        });
     
    }
    fetchData();
  }, [props]);

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
        <div className="flex justify-between mb-2 ">
        <div className="flex justify-between h-8">
      <div className="flex ">
        
          <DebouncedInput
          value={globalFilter ?? ''}
          onChange={value => setGlobalFilter(String(value))}
          className="p-1.5 font-lg shadow border border-block rounded h-8"
          placeholder="Search all columns..."

        />
       
      </div>
    </div>
        </div>
        <div style={{ maxHeight: "630px", overflowY: "scroll" }}>
          <div className="h-2 mr-20" />
          <table>
            <thead className="TableHeadBackroundcolor gap-20">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <th
                        key={header.id}
                        colSpan={header.colSpan}
                        style={{ width: 250 }}
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
            <tbody>
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
                {table.getState().pagination.pageIndex + 1}{" "}
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
  column: Column<any, unknown>;
  table: Table<any>;
}) {
  const firstValue = table
    .getPreFilteredRowModel()
    .flatRows[0]?.getValue(column.id);

  const columnFilterValue = column.getFilterValue();

  const sortedUniqueValues = React.useMemo(
    () =>
      typeof firstValue === "number"
        ? []
        : Array.from(column.getFacetedUniqueValues().keys()).sort(),
    [column.getFacetedUniqueValues()]
  );

  return typeof firstValue === "number" ? (
    <div>
      <div className="h-1" />
    </div>
  ) : (
    <>
      <datalist id={column.id + "list"}>
        {sortedUniqueValues.slice(0, 5000).map((value: any) => (
          <option value={value} key={value} />
        ))}
      </datalist>

      <div className="h-4" />
    </>
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




export default Burtgel;
