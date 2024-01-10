import React, { useEffect, useState, HTMLAttributes, HTMLProps } from "react";
import { useNavigate, useLocation ,redirect } from "react-router-dom";
import Title from "../Title";
import { saveIcon, deleteIcon } from "../../assets/zurag";
import imagebackground from "../../assets/zurag/background.png";
import SaveButton from "../SaveButton";
import CurrencyInput from "react-currency-input-field";
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
import DataRequest from "../../functions/make_Request";
import Stat_Url from "../../Stat_URL";
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

function Mayagt_14_Create(props: any) {
  const [tsonkh, setTsonkh] = useState(0);
  //@ts-ignore
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));
  let navigate = useNavigate();
  const { state } = useLocation();
  const [data, loadData] = useState({
    ID:null,
    AUDIT_TYPE_ID:999,
    REPORT_TYPE_ID:999,
    DEPARTMENT_ID:999,
    SUB_DEPARTMENT_ID:999,
    BM1_ID:null,
    ENT_ID:999,   
    AUDIT_CODE:"",
    PAGE_ABSTRACT_COUNT:0,
    PAGE_MORE_COUNT:0,
    PAGE_VISUAL_COUNT:0,
    PRINT_ABSTRACT_COUNT:0,
    PRINT_MORE_COUNT:0,
    PRINT_VISUAL_COUNT:0,
    REPORTED_ABSTRACT_ID:999,
    REPORTED_MORE_ID:999,
    REPORTED_VISUAL_ID:999,
    IS_ACTIVE:1,
    CREATED_BY:userDetails.USER_ID
  });

  const [drop, setDrop] = useState({
    drop1: [],
    drop2: [],
    drop3: [],
    drop4: [],
    drop5: [],
    drop6:[]
  });

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    
     if (localStorage.getItem('stat_bm9c') !== undefined && localStorage.getItem('stat_bm9c') !== null) {
      
      loadData({...JSON.parse(localStorage.getItem('stat_bm9c'))})
    }

    let refDepartment = await axios(Stat_Url + "refDepartment?DepType=1");
    if (refDepartment.data !== undefined && refDepartment.data.length > 0) {
      let temp = drop;
      temp.drop1 = refDepartment.data;
      setDrop({ ...temp });
    }
    let refReportType = await axios(Stat_Url + "refReportType");
    if (refReportType.data !== undefined && refReportType.data.length > 0) {
      let temp = drop;
      temp.drop2 = refReportType.data;
      setDrop({ ...temp });
    }
    let refAuditType = await axios(Stat_Url + "refAuditType");
    if (refAuditType.data !== undefined && refAuditType.data.length > 0) {
      let temp = drop;
      temp.drop3 = refAuditType.data;
      setDrop({ ...temp });
    }
    let refReportEType = await axios(Stat_Url + "refReportEType");
    if (refReportEType.data !== undefined && refReportEType.data.length > 0) {
      let temp = drop;
      temp.drop4 = refReportEType.data;
      setDrop({ ...temp });
    }
    
    let refSubDepartment = await axios(Stat_Url + "refSubDepartment");
    if (refSubDepartment.data !== undefined && refSubDepartment.data.length > 0) {
      let temp = drop;
      temp.drop6 = refSubDepartment.data;
      setDrop({ ...temp });
    }
  }
  function requiredField(){
    if(data.AUDIT_TYPE_ID === 999){
      alert('Аудитын төрөл сонгоно уу')
      return false;
   }else 
   if(data.REPORT_TYPE_ID === 999){
    alert('Мэдээллийн төрөл сонгоно уу')
    return false;
 }else 
   if(data.DEPARTMENT_ID === 999){
    alert('Төрийн аудитын байгууллага сонгоно уу')
    return false;
   }
   else if(data.SUB_DEPARTMENT_ID === 999){
    alert('Зохион байгуулалтын бүтцийн нэгжийн нэр сонгоно уу')
    return false;
   }else if(data.ENT_ID === 999){
    alert('Шалгагдагч байгууллагын нэр оруулна уу')
    return false;
   }else if(data.AUDIT_CODE === ""){
    alert('Аудитын код оруулна уу')
    return false;
   }else if(data.REPORTED_ABSTRACT_ID === 999){
    alert('Цахимаар мэдээлсэн эсэх хураангуй сонгоно уу')
    return false;
   }else if(data.REPORTED_MORE_ID === 999){
    alert('Цахимаар мэдээлсэн эсэх дэлгэрэнгүй сонгоно уу')
    return false;
   }else if(data.REPORTED_VISUAL_ID === 999){
    alert('Цахимаар мэдээлсэн эсэх визуал сонгоно уу')
    return false;
   }

   else {
    return true
   }

    
  }

  function savetoDB() {
    if(requiredField()){
    DataRequest({
      url: Stat_Url + "BM9CIU",
      method: "POST",
      data: {
      data:[data],
      CREATED_BY:userDetails.USER_ID
      },
    })
      .then(function (response) {
        if (response?.data.message === "Хадгаллаа.") {
          alert("амжилттай хадгаллаа");
          navigate("/web/Home/Form");
        }
        
      })
      .catch(function (error) {});
    }
  }

  return (
    <div
      style={{
        minHeight: window.innerHeight - 129,
        maxWidth: window.innerWidth - 129,
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
        <Title title={"З-ТАББМ-9Е"} widthS={"5rem"} widthL={"5rem"} />
      </div>
      <div className="ml-20 bg-blue-500 w-48 h-10 rounded-lg mt-6">
        <div className="space-y-4">
          <p className="text-white text-center  pt-2">З-ТАББМ-9Е</p>
        </div>
      </div>

    
        {tsonkh !== 0 ? (
          <Organization
            setTsonkh={setTsonkh}
            data={data}
            loadData={loadData}
            tsonkh={tsonkh}
          />
        ) : null}

        <div
          style={{
            display: "flex row text-base",
            padding: "3rem 0rem 0rem 0rem",
          
            overflow:'scroll'
          }}
        >
          <div className="flex  md:justify-center sm:justify-end">
              <div className="grid grid-rows-4  lg:grid-flow-col  sm:grid-flow-row ">


              <div className="flex space-x-4 space-x-reverse h-10 my-1">
                  <div className="w-6/12">
                    <label className="block md:text-right md:mb-10  pr-6">
                      <span className="text-md">Аудитын төрөл:</span>
                    </label>
                  </div>
                  <div className="w-6/12">
                    <select
                      className="rounded text-sm focus:outline-none"
                      style={{
                        height: '100%',
                        width:'100%',
                        border: "1px solid gray",
                      }}
                      value={data.AUDIT_TYPE_ID}
                      onChange={(value) => {
                        let temp = data;
                        temp.AUDIT_TYPE_ID = value.target.value;
                        loadData({ ...temp });
                      }}
                    >
                      <option value={999}>Бүгд</option>
                      {drop.drop3.map((nation, index) => (
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
                <div className="flex space-x-4 space-x-reverse h-10 my-1">
                  <div className="w-6/12">
                    <label className="block md:text-right md:mb-10  pr-6">
                      <span className="text-md">Мэдээллийн төрөл:</span>
                    </label>
                  </div>
                  <div className="w-6/12 ">
                    <select
                      className="rounded text-sm focus:outline-none"
                      style={{
                        height: '100%',
                        width:'100%',
                        border: "1px solid gray",
                      }}
                      value={data.REPORT_TYPE_ID}
                      onChange={(value) => {
                        let temp = data;
                        temp.REPORT_TYPE_ID = value.target.value;
                        loadData({ ...temp });
                      }}
                    >
                      <option value={999}>Бүгд</option>
                      {drop.drop2.map((nation, index) => (
                        <option
                          className="font-semibold"
                          key={nation.REPORT_TYPE_NAME}
                          value={nation.REPORT_TYPE_ID}
                        >
                          {nation.REPORT_TYPE_NAME}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex space-x-4 space-x-reverse h-10 my-1">
                  <div className="w-6/12">
                    <label className="block md:text-right md:mb-10  pr-6">
                      <span className="text-md">Төрийн аудитын байгууллага:</span>
                    </label>
                  </div>
                  <div className="w-6/12 ">
                    <select
                      className="rounded text-sm focus:outline-none"
                      style={{
                        height: '100%',
                        width:'100%',
                        border: "1px solid gray",
                      }}
                      value={data.DEPARTMENT_ID}
                      onChange={(value) => {
                        let temp = data;
                        temp.DEPARTMENT_ID = value.target.value;
                        loadData({ ...temp });
                      }}
                    >
                      <option value={999}>Бүгд</option>
                      {drop.drop1.map((nation, index) => (
                        <option
                          className="font-semibold"
                          key={nation.DEPARTMENT_NAME}
                          value={nation.DEPARTMENT_ID}
                        >
                          {nation.DEPARTMENT_NAME}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex space-x-4 space-x-reverse h-10 my-1">
                  <div className="w-6/12">
                    <label className="block md:text-right md:mb-10  pr-6">
                      <span className="text-md">Зохион байгуулалтын бүтцийн нэгжийн нэр:</span>
                    </label>
                  </div>
                  <div className="w-6/12 ">
                    <select
                      className="rounded text-sm focus:outline-none"
                      style={{
                        height: '100%',
                        width:'100%',
                        border: "1px solid gray",
                      }}
                      value={data.SUB_DEPARTMENT_ID}
                      onChange={(value) => {
                        let temp = data;
                        temp.SUB_DEPARTMENT_ID = value.target.value;
                        loadData({ ...temp });
                      }}
                    >
                      <option value={999}>Бүгд</option>
                      {drop.drop6.map((nation, index) => (
                        <option
                          className="font-semibold"
                          key={nation.SUB_DEPARTMENT_NAME}
                          value={nation.SUB_DEPARTMENT_ID}
                        >
                          {nation.SUB_DEPARTMENT_NAME}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex  space-x-4 space-x-reverse h-10 my-1">
                
                <div className="w-6/12">
                <label className="block md:text-right md:mb-10  pr-6">
                  <span className="text-md">Шалгагдагч байгууллага:</span>
                </label>
                 
                </div>
                <div className="w-6/12" style={{ display: "flex" }}>
                  <div
                    className="rounded-md text-sm overflow-scroll"
                    style={{
                    height: '100%',
                    width:'100%',
                    border: "1px solid gray",
                    }}
                  >
                    {data.ENT_ID !== null  ? (
                        <div className="flex flex-row ">
                          <span>
                            {data.ENT_NAME}
                          </span>
                         
                        </div>
                      ) : null
                    }
                  </div>
                  <div>
                    <button type="button" onClick={() => setTsonkh(2)}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 mt-4 ml-0"
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
          
                <div className="flex space-x-4 space-x-reverse h-10 my-1">
                  <div className="w-6/12">
                    <label className="block md:text-right md:mb-10  pr-6">
                      <span className="text-md">Аудит код:</span>
                    </label>
                  </div>
                  <div className="w-6/12 ">
                  <input
                      type="text"
                      className="inputRoundedMetting"
                      style={{
                        height: '100%',
                        width:'100%',
                        border: "1px solid gray",
                      }}
                      value={data.AUDIT_CODE}
                      onChange={(e) => {
                        let temp = data;
                        temp.AUDIT_CODE = e.target.value;
                        loadData({
                          ...temp,
                        });
                      }}
                    />
                  </div>
                </div>

                <div className="flex space-x-4 space-x-reverse h-10 my-1">
                  <div className="w-6/12">
                    <label className="block md:text-right md:mb-10  pr-6">
                      <span className="text-md">Тайлангийн хуудасны тоо хураангуй:</span>
                    </label>
                  </div>
                  <div className="w-6/12 ">
                  <input
                      type="number"
                      className="inputRoundedMetting"
                      style={{
                        height: '100%',
                        width:'100%',
                        border: "1px solid gray",
                      }}
                      value={data.PAGE_ABSTRACT_COUNT}
                      onChange={(e) => {
                        let temp = data;
                        temp.PAGE_ABSTRACT_COUNT = e.target.value;
                        loadData({
                          ...temp,
                        });
                      }}
                    />
                  </div>
                </div>

                <div className="flex space-x-4 space-x-reverse h-10 my-1">
                  <div className="w-6/12">
                    <label className="block md:text-right md:mb-10  pr-6">
                      <span className="text-md">Тайлангийн хуудасны тоо дэлгэрэнгүй:</span>
                    </label>
                  </div>
                  <div className="w-6/12 ">
                  <input
                      type="number"
                      className="inputRoundedMetting"
                      style={{
                        height: '100%',
                        width:'100%',
                        border: "1px solid gray",
                      }}
                      value={data.PAGE_MORE_COUNT}
                      onChange={(e) => {
                        let temp = data;
                        temp.PAGE_MORE_COUNT = e.target.value;
                        loadData({
                          ...temp,
                        });
                      }}
                    />
                  </div>
                </div>

                <div className="flex space-x-4 space-x-reverse h-10 my-1">
                  <div className="w-6/12">
                    <label className="block md:text-right md:mb-10  pr-6">
                      <span className="text-md">Тайлангийн хуудасны тоо визуал:</span>
                    </label>
                  </div>
                  <div className="w-6/12 ">
                  <input
                      type="number"
                      className="inputRoundedMetting"
                      style={{
                        height: '100%',
                        width:'100%',
                        border: "1px solid gray",
                      }}
                      value={data.PAGE_VISUAL_COUNT}
                      onChange={(e) => {
                        let temp = data;
                        temp.PAGE_VISUAL_COUNT = e.target.value;
                        loadData({
                          ...temp,
                        });
                      }}
                    />
                  </div>
                </div>

                <div className="flex space-x-4 space-x-reverse h-10 my-1">
                  <div className="w-6/12">
                    <label className="block md:text-right md:mb-10  pr-6">
                      <span className="text-md">Хэвлэсэн тоо хураангуй:</span>
                    </label>
                  </div>
                  <div className="w-6/12 ">
                  <input
                      type="number"
                      className="inputRoundedMetting"
                      style={{
                        height: '100%',
                        width:'100%',
                        border: "1px solid gray",
                      }}
                      value={data.PRINT_ABSTRACT_COUNT}
                      onChange={(e) => {
                        let temp = data;
                        temp.PRINT_ABSTRACT_COUNT = e.target.value;
                        loadData({
                          ...temp,
                        });
                      }}
                    />
                  </div>
                </div>

                <div className="flex space-x-4 space-x-reverse h-10 my-1">
                  <div className="w-6/12">
                    <label className="block md:text-right md:mb-10  pr-6">
                      <span className="text-md">Хэвлэсэн тоо дэлгэрэнгүй:</span>
                    </label>
                  </div>
                  <div className="w-6/12 ">
                  <input
                      type="number"
                      className="inputRoundedMetting"
                      style={{
                        height: '100%',
                        width:'100%',
                        border: "1px solid gray",
                      }}
                      value={data.PRINT_MORE_COUNT}
                      onChange={(e) => {
                        let temp = data;
                        temp.PRINT_MORE_COUNT = e.target.value;
                        loadData({
                          ...temp,
                        });
                      }}
                    />
                  </div>
                </div>

                <div className="flex space-x-4 space-x-reverse h-10 my-1">
                  <div className="w-6/12">
                    <label className="block md:text-right md:mb-10  pr-6">
                      <span className="text-md">Хэвлэсэн тоо визуал:</span>
                    </label>
                  </div>
                  <div className="w-6/12 ">
                  <input
                      type="number"
                      className="inputRoundedMetting"
                      style={{
                        height: '100%',
                        width:'100%',
                        border: "1px solid gray",
                      }}
                      value={data.PRINT_VISUAL_COUNT}
                      onChange={(e) => {
                        let temp = data;
                        temp.PRINT_VISUAL_COUNT = e.target.value;
                        loadData({
                          ...temp,
                        });
                      }}
                    />
                  </div>
                </div>
             
                <div className="flex space-x-4 space-x-reverse h-10 my-1">
                  <div className="w-6/12">
                    <label className="block md:text-right md:mb-10  pr-6">
                      <span className="text-md">Цахимаар мэдээлсэн эсэх хураангуй:</span>
                    </label>
                  </div>
                  <div className="w-6/12 ">
                  <select
                      className="rounded text-sm focus:outline-none"
                      style={{
                        height: '100%',
                        width:'100%',
                        border: "1px solid gray",
                      }}
                      value={data.REPORTED_ABSTRACT_ID}
                      onChange={(value) => {
                        let temp = data;
                        temp.REPORTED_ABSTRACT_ID = value.target.value;
                        loadData({ ...temp });
                      }}
                    >
                      <option value={999}>Бүгд</option>
                      {drop.drop4.map((nation, index) => (
                        <option
                          className="font-semibold"
                          key={nation.REPORT_ETYPE_NAME}
                          value={nation.REPORT_ETYPE_ID}
                        >
                          {nation.REPORT_ETYPE_NAME}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex space-x-4 space-x-reverse h-10 my-1">
                  <div className="w-6/12">
                    <label className="block md:text-right md:mb-10  pr-6">
                      <span className="text-md">Цахимаар мэдээлсэн эсэх дэлгэрэнгүй:</span>
                    </label>
                  </div>
                  <div className="w-6/12 ">
                  <select
                      className="rounded text-sm focus:outline-none"
                      style={{
                        height: '100%',
                        width:'100%',
                        border: "1px solid gray",
                      }}
                      value={data.REPORTED_MORE_ID}
                      onChange={(value) => {
                        let temp = data;
                        temp.REPORTED_MORE_ID = value.target.value;
                        loadData({ ...temp });
                      }}
                    >
                      <option value={999}>Бүгд</option>
                      {drop.drop4.map((nation, index) => (
                        <option
                          className="font-semibold"
                          key={nation.REPORT_ETYPE_NAME}
                          value={nation.REPORT_ETYPE_ID}
                        >
                          {nation.REPORT_ETYPE_NAME}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex space-x-4 space-x-reverse h-10 my-1">
                  <div className="w-6/12">
                    <label className="block md:text-right md:mb-10  pr-6">
                      <span className="text-md">Цахимаар мэдээлсэн эсэх визуал:</span>
                    </label>
                  </div>
                  <div className="w-6/12 ">
                  <select
                      className="rounded text-sm focus:outline-none"
                      style={{
                        height: '100%',
                        width:'100%',
                        border: "1px solid gray",
                      }}
                      value={data.REPORTED_VISUAL_ID}
                      onChange={(value) => {
                        let temp = data;
                        temp.REPORTED_VISUAL_ID = value.target.value;
                        loadData({ ...temp });
                      }}
                    >
                      <option value={999}>Бүгд</option>
                      {drop.drop4.map((nation, index) => (
                        <option
                          className="font-semibold"
                          key={nation.REPORT_ETYPE_NAME}
                          value={nation.REPORT_ETYPE_ID}
                        >
                          {nation.REPORT_ETYPE_NAME}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "end" ,width:'100%'}}>
          <button className="md:items-end rounded mr-8 mt-10">
            <SaveButton saveToDB={() => savetoDB()} />
          </button>
        </div>
     
    </div>
  );
}

function Organization(props: any) {
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
        accessorKey: "BUDGET_SHORT_NAME",
        cell: (info) => info.getValue(),
        header: "Төсөв захирагчийн ангилал",
        footer: (props) => props.column.id,
        // enableColumnFilter : false,
      },
      {
        accessorKey: "TEZ_NAME",
        header: "ТЕЗ",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "TTZ_NAME",
        header: "ТТЗ",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "DEPARTMENT_NAME",
        header: "Аудит хийх байгууллага,нэгжийн нэр",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "ENT_NAME",
        header: "Шалгагдагч байгууллагын нэр",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "ORG_REGISTER_NO",
        header: "Регистрийн дугаар",
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
        url: Stat_Url + "getEntList",
        method: "POST",
        data: {
          // DEPARTMENT_ID: userDetails.USER_DEPARTMENT_ID,
          // SUB_DEPARTMENT_ID: userDetails.USER_SUB_DEPARTMENT_ID,
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
     temp.ENT_ID = row.original.ENT_ID;
     temp.ENT_NAME = row.original.ENT_NAME;
     temp.ORG_REGISTER_NO = row.original.ORG_REGISTER_NO;
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
export default Mayagt_14_Create;
