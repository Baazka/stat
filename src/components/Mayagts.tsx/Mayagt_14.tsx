import React, { useEffect, useState } from "react";
import Title from "../Title";
import "../../pages/Home.css";
import Comment from "../comment";
import FooterValue from "../Footervalue";
import ButtonRequest from "../ButtonRequest";
import ButtonConfirm from "../ButtonConfirm";
import Stat_Url from "../../Stat_URL";
import ButtonSearch from "../ButtonSearch";
import ButtonSave from "../SaveButton";
import { excel ,addIcon,editPencil,xIcon} from "../../assets/zurag";
import CurrencyInput from "react-currency-input-field";
import { getExportFileBlob } from "../../functions/excel_export";
import { useNavigate } from "react-router-dom";
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
  RowData,
} from "@tanstack/react-table";
import DataRequest from "../../functions/make_Request";
import { RankingInfo, rankItem } from "@tanstack/match-sorter-utils";
import fasUrl from "../../fasURL";
import UserPremission from "../../functions/userPermission";
import {check_save}from '../../functions/Tools'
import { RevolvingDot } from "react-loader-spinner";


declare module '@tanstack/react-table' {
  interface TableMeta<TData extends RowData> {
    updateData: (rowIndex: number, columnId: string, value: unknown) => void
  }
}
let Data = {}
// Give our default column cell renderer editing superpowers!
const defaultColumn: Partial<ColumnDef<Data>> = {
  cell: function Cell ({ getValue, row: { index }, column: { id }, table }){
    const initialValue = getValue()
    // We need to keep and update the state of the cell normally
    const [value, setValue] = React.useState(initialValue)

    // When the input is blurred, we'll call our table meta's updateData function
    const onBlur = () => {
      table.options.meta?.updateData(index, id, value)
    }

    // If the initialValue is changed external, sync it up with our state
    React.useEffect(() => {
      setValue(initialValue)
    }, [initialValue])

    if(id === "IS_EXPERT_ATTEND" || id === "IS_PRESS_REPORT"){
      return <select
                className="border rounded text-sm focus:outline-none py-1 h-8 mr-1 inputRoundedMetting pl-2"
                value={value}
                onChange={
                  e => setValue(e.target.value)
                }
                onBlur={onBlur}
              >
                <option key={id+'0'} className="font-medium" key={"Сонгоно уу"} value={999}>
                  {"Сонгоно уу"}
                </option>
                <option key={id+'1'} className="font-medium" key={"Тийм"} value={1}>
                  {"Тийм"}
                </option>
                <option key={id+'21'} className="font-medium" key={"Үгүй"} value={0}>
                  {"Үгүй"}
                </option>
              </select>
     } else if(id === "WORK_PEOPLE" ||
     id === "WORK_DAY" ||
     id === "WORK_TIME" ){
             return  <input
                value={value}
                type="number"
                className="bg-transparent"
                style={{
                  minHeight: "33px",
                  border: "1px solid",
                  borderRadius: "4px",
                  color: "gray",
                }}
                onChange={
                  e => setValue(e.target.value)
                }
                onBlur={onBlur}
              />
              }
      
      // <input
      // value={value as string}
      // onChange={e => setValue(e.target.value)}
      // onBlur={onBlur}
    // /> 
   
    
  },
}



function useSkipper() {
  const shouldSkipRef = React.useRef(true)
  const shouldSkip = shouldSkipRef.current

  // Wrap a function with this to skip a pagination reset temporarily
  const skip = React.useCallback(() => {
    shouldSkipRef.current = false
  }, [])

  React.useEffect(() => {
    shouldSkipRef.current = true
  })

  return [shouldSkip, skip] as const
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

declare module '@tanstack/react-table' {
  interface TableMeta<TData extends RowData> {
    updateData: (rowIndex: number, columnId: string, value: unknown) => void
  }
}

function Mayagt_14(props: any) {
  const mayagtData = props.mayagtData;
  const userDetails = props.userDetails;
  const [saveData, setSaveData] = useState(new Set());
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [globalFilter, setGlobalFilter] = React.useState("");
  const [status, setStatus] = useState({ STATUS: {}, ROLE: {} });
  const [drop,setDrop] = useState({
    drop1:[],
    drop2:[],
    drop3:[],
    drop4:[]
  })
  const Navigate = useNavigate();
  function CustomCell ({ getValue, row, column: { id }, table,drop:{drop1:[],drop2:[]},rowValue}){
    const initialValue = getValue()
    // We need to keep and update the state of the cell normally
    const [value, setValue] = React.useState(initialValue)

  
  
    // When the input is blurred, we'll call our table meta's updateData function
    const onBlur = () => {
      table.options.meta?.updateData(row.index, id, value)
    }
  
    // If the initialValue is changed external, sync it up with our state
    React.useEffect(() => {
      setValue(initialValue)
    }, [initialValue])
  
    if(id === "REPORTED_ABSTRACT_ID" || id === 'REPORTED_VISUAL_ID' || id === 'REPORTED_MORE_ID'){
      return <select
                disabled={row.original.BM1_ID ===null?true:false}
                className="border rounded text-sm focus:outline-none py-1 h-8 mr-1 inputRoundedMetting pl-2"
                value={value}
                onChange={
                  e => setValue(e.target.value)
                }
                onBlur={onBlur}
              >
                  <option   className="font-semibold" value={999}>
                      Сонгоно уу 
                    </option>
                    {drop.drop1.map((nation, index) => (
                      <option
                        className="font-semibold"
                        key={nation.REPORT_ETYPE_NAME}
                        value={nation.REPORT_ETYPE_ID}
                      >
                        {nation.REPORT_ETYPE_NAME}
                      </option>
                       ))}
  
              </select>
     }else if(id === "PAGE_ABSTRACT_COUNT" || id === 'PAGE_MORE_COUNT' || id === 
     'PAGE_VISUAL_COUNT' || id === 'PRINT_ABSTRACT_COUNT' || id === 'PRINT_MORE_COUNT' || id === 'PRINT_VISUAL_COUNT'){
                        return <CurrencyInput
                        className="bg-transparent text-end p-1"
                        disabled={row.original.BM1_ID ===null?true:false}
                        style={{
                          minHeight: "33px",
                          border: "1px solid",
                          borderRadius: "4px",
                          color: "gray",
                        }}
                      value={value}
                      decimalsLimit={2}
                      decimalScale={2}
                      onValueChange={(value, name) => 
                        setValue(value)
                      }
                      onBlur={onBlur}
  
                    />
                         }
      
     
  }
  function deleteRowFunc(indexParam, value){
   if (window.confirm("Устгахдаа итгэлтэй байна уу?")) {
        let valueC = value;
  
        if (value?.ID !== null) {
          valueC.IS_ACTIVE = 0;
          DataRequest({
            url: Stat_Url + "BM9CIU",
            method: "POST",
            data: {
              data: [valueC],
              CREATED_BY: userDetails.USER_ID,
            },
          })
            .then(function (response) {
              if (response?.data?.message === "success") {
                alert("Aмжилттай устлаа");
              }
            })
            .catch(function (error) {
              alert("устгаж чадсангүй");
            });
        }
        loadData(data.filter((element, index) => index !== indexParam));
      }
    
  }
  const columns = React.useMemo(
    () => [
     {
        accessorFn: (row, index) => index + 1,
        accessorKey: "№",
        header: "№",
        size: 10,
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "AUDIT_TYPE_NAME",
        cell: (info) => info.getValue(),
        header: "Аудитын төрөл",
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "REPORT_TYPE_NAME",
        cell: (info) => info.getValue(),
        header: "Мэдээллийн төрөл",
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "DEPARTMENT_NAME",
        cell: (info) => info.getValue(),
        header: "Төрийн аудитын байгууллага",
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "SUB_DEPARTMENT_NAME",
        header: "Зохион байгуулалтын бүтцийн нэгжийн нэр",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "ENT_NAME",
        header: "Шалгагдагч байгууллагын нэр",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "AUDIT_CODE",
        header: "Аудитын код",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "TAILANGIIN_HUUDASNI_TOO",
        header: "Тайлангийн хуудасны тоо",
        columns: [
          {
            accessorKey: "PAGE_ABSTRACT_COUNT",
            header: "Хураангуй",
            cell:({ getValue, row, column: { id }, table }) =>CustomCell({ getValue, row, column: { id }, table,drop })
          },
          {
            accessorKey: "PAGE_MORE_COUNT",
            header: "Дэлгэрэнгүй",
            cell:({ getValue, row, column: { id }, table }) =>CustomCell({ getValue, row, column: { id }, table,drop })
          },
          {
            accessorKey: "PAGE_VISUAL_COUNT",
            header: "Визуал",
            cell:({ getValue, row, column: { id }, table }) =>CustomCell({ getValue, row, column: { id }, table,drop })
          },
        ],
      },
      {
        accessorKey: "HEVELSEN_TOO",
        header: "Хэвлэсэн тоо",
        columns: [
          {
            accessorKey: "PRINT_ABSTRACT_COUNT",
            header: "Хураангуй",
            cell:({ getValue, row, column: { id }, table }) =>CustomCell({ getValue, row, column: { id }, table,drop })
          },
          {
            accessorKey: "PRINT_MORE_COUNT",
            header: "Дэлгэрэнгүй",
            cell:({ getValue, row, column: { id }, table }) =>CustomCell({ getValue, row, column: { id }, table,drop })
          },
          {
            accessorKey: "PRINT_VISUAL_COUNT",
            header: "Визуал",
            cell:({ getValue, row, column: { id }, table }) =>CustomCell({ getValue, row, column: { id }, table,drop })
          },
        ],
      },
      {
        accessorKey: "TSAHIMAAR_MEDEELSEN_ESEH",
        header: "Цахимаар мэдээлсэн эсэх",
       
        columns: [
          {
            accessorKey: "REPORTED_ABSTRACT_ID",
            header: "Хураангуй",
            cell:({ getValue, row, column: { id }, table }) =>CustomCell({ getValue, row, column: { id }, table,drop })
          },
          {
            accessorKey: "REPORTED_MORE_ID",
            header: "Дэлгэрэнгүй",
            cell:({ getValue, row, column: { id }, table }) =>CustomCell({ getValue, row, column: { id }, table,drop })
          },
          {
            accessorKey: "REPORTED_VISUAL_ID",
            header: "Визуал",
            cell:({ getValue, row, column: { id }, table }) =>CustomCell({ getValue, row, column: { id }, table,drop })
          },
        ],
      },
      {
        header: "Үйлдэл",
        cell: (info) => info.getValue(),
        accessorFn: (row, index) => (
          row.BM1_ID === null?
          <div className="flex justify-start" style={{ width: "80px" }}>
              { check_save(status)?
             <>
                <button
                  className="bg-transparent text-xs"
                  type="button"
                  style={{
                    padding: "2px",
                    boxShadow: "0px 0px 0px 1px rgba(	38,132,254,0.3)",
                    borderRadius: "4px",
                    marginRight: "6px",
                  }}
                >
                  <img
                    src={editPencil}
                    onClick={() => {
                      localStorage.removeItem("stat_bm9c");
                      Navigate("/web/Home/bm9c/create");
                      localStorage.setItem("stat_bm9c", JSON.stringify(row));
                    }}
                    width="14px"
                    height="14px"
                    alt=""
                  />
                </button>
                <button
                  className="bg-transparent text-xs"
                  onClick={() => 
                    deleteRowFunc(index,row)
                
                  }
                  type="button"
                  style={{
                    padding: "2px",
                    boxShadow: "0px 0px 0px 1px rgba(	38,132,254,0.3)",
                    borderRadius: "4px",
                    marginRight: "6px",
                  }}
                >
                  <img
                    src={xIcon}
                    // onClick={() => {
                    //   row;
                    // }}
                    width="14px"
                    height="14px"
                    alt=""
                  />
                </button>
              
              
              </>
            :null}
          </div>:null
        ),
      },
    ],
    []
  );
  const [autoResetPageIndex, skipAutoResetPageIndex] = useSkipper()
  const [data, loadData] = React.useState([]);
  const [batlakhHuselt, setBatlakhHuselt] = useState({
    AUDIT_ID: mayagtData.ID,
    DOCUMENT_ID: mayagtData.Document_ID,
    REQUEST_TYPE: 1,
    LEVEL_ID: props.STATUS,
    MODULE_ID:6,
    DESCRIPTION: "",
    CREATED_BY: userDetails.USER_ID,
    
  });
  const [loaderSpinner, setloaderSpinner] = useState(0);

  const [filter, setFilter] = useState({
    Audit: {
      PERIOD_ID: 4,
      DEPARTMENT_ID: 999,
      BUDGET_TYPE_ID: 999,
      PARENT_BUDGET_ID: 999,
      TYPE: 0,
    },
  });

  const table = useReactTable({
    data,
    columns,
    defaultColumn,
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
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),

   
    // getFacetedRowModel: getFacetedRowModel(),
    // getFacetedUniqueValues: getFacetedUniqueValues(),
    // getFacetedMinMaxValues: getFacetedMinMaxValues(),
    autoResetPageIndex,
    meta: {
      updateData: (rowIndex, columnId, value) => {
        // Skip page index reset until after next rerender
        skipAutoResetPageIndex()
        loadData(old =>
          old.map((row, index) => {
            if (index === rowIndex) {
              return {
                ...old[rowIndex]!,
                [columnId]: value,
                EDITED:true
              }
            }
            return row
          })
        )
      },
    },
    debugTable: false,
    debugHeaders: false,
    debugColumns: false,
  });

 
  

  useEffect(() => {
    fetchData();
  }, [props.mayagtData]);

  async function fetchData() {
   DataRequest({
      url: Stat_Url + "BM9CList",
      method: "POST",
      data: {
        ID: mayagtData.ID,
        USER_ID: userDetails.USER_ID,
        USER_TYPE_NAME: userDetails.USER_TYPE_NAME,
      },
    })
      .then(function (response) {
      
        if (response.data !== undefined && response.data.data.length > 0) {
          loadData(response.data.data);
          if (response?.data.role.length > 0)
            setStatus({
              STATUS: response?.data.status,
              ROLE: response?.data.role.find(
                (a) => a.AUDITOR_ID === userDetails.USER_ID
              ),
            });
     
        }
      })
      .catch(function (error) {
        console.log(error, "error");
       
      });
      DataRequest({
          url:
            Stat_Url +
            "refReportEType/" ,
          method: "GET",
          data: {},
        })
          .then(function (response) {
            let temp = drop
            temp.drop1 = response.data
            setDrop(temp);
          })
          .catch(function (error) {
            console.log(error, "error");
          
          });

    // DataRequest({
    //   url:
    //     fasUrl +
    //     "OT_REQUEST_FOR_CONFIRM/" +
    //     mayagtData.ID +
    //     "/" +
    //     mayagtData.DOCUMENT_ID +
    //     "/" +
    //     6,
    //   method: "GET",
    //   data: {},
    // })
    //   .then(function (response) {
    //     setBatlakhHuselt(response.data);
    //   })
    //   .catch(function (error) {
    //     console.log(error, "error");
      
    //   });
  }

  function saveToDB() {
    
    let temp = [];
      console.log(data.filter(a=>(a.EDITED !== undefined && a.EDITED === true)),'saveData');
    setloaderSpinner(1)

    DataRequest({
      url: Stat_Url + "BM9CIU",
      method: "POST",
      data: {
        // STAT_ID : mayagtData.ID,
        data: data.filter(a=>(a.EDITED !== undefined && a.EDITED === true)),
        CREATED_BY: userDetails.USER_ID,
      },
    })
      .then(function (response) {
       
        console.log(response?.data,'response1');
        if (response?.data.status === 200) {
          DataRequest({
            url: Stat_Url + "statisticProcessChange",
            method: "POST",
            data: {
              ID: status.STATUS.ID,
              STAT_AUDIT_ID: mayagtData.ID,
              ACTION_ID: 0, //0-HAD, 1-BAT1, 2-BAT2, 3-BAT3
              ACTION_DESC: "mayagt hadgallaa",
              CREATED_BY: userDetails.USER_ID,
            },
          })
            .then(function (response) {
              console.log(response.data,'response2');
              if (response?.data.status === 200) {
                alert("амжилттай хадгаллаа");
                setloaderSpinner(0)
                fetchData();
              }
            })
            .catch(function (error) {
              console.log(error, "error");
              setloaderSpinner(0)
              ;
            });
        }
      })
      .catch(function (error) {
        console.log(error, "error");
     
      });
  }

  return (
    <>
      {loaderSpinner === 1 || loaderSpinner === undefined ? (
        <div style={{ paddingLeft: "45%",paddingTop:'10%',paddingBottom:'10%'}}>
          <RevolvingDot color="#2684fe" height={50} width={50} />
        </div>):
      <div
        style={{
             padding: "0.5rem 0 0 1rem",
        }}
      >
        <Title
          title={
            mayagtData.DOCUMENT_NAME + " " + mayagtData.DOCUMENT_SHORT_NAME
          } //"ТАЙЛАНТ ОНД ГҮЙЦЭТГЭСЭН АУДИТЫН БҮРТГЭЛ З-ТАББМ-1"
          widthS={"28rem"}
          widthL={"10rem"}
        />
        <div className="flex justify-between mb-2 ">
          <div style={{ height: 28 }} className="flex flex-row  cursor-pointer">
            <ButtonSearch
              globalFilter={globalFilter}
              setGlobalFilter={(value) => setGlobalFilter(value)}
            />
            <button
              onClick={() => {
                getExportFileBlob(columns, data, "З-ТАББМ-1");
              }}
              className="inline-flex items-center rounded ml-2 py-1 h-7"
              style={{
                border: "1px solid #3cb371",
              }}
            >
              <div className="bg-white">
                <img
                  src={excel}
                  width="20px"
                  height="20px"
                  className="mx-1"
                ></img>
              </div>
              <div
                style={{
                  backgroundColor: "#3cb371",
                }}
                className=" text-white rounded-r px-1 h-7"
              >
                Excel
              </div>
            </button>
            { check_save(status)?  
               ( <button
                  onClick={() => {
                    localStorage.removeItem("stat_bm9c");
                    Navigate("/web/Home/bm9c/create")
                  }}
                  className="inline-flex items-center rounded ml-2 py-1 h-7"
                  style={{
                    border: "1px solid #2684fe",
                  }}
                >
                  <div className="bg-white px-1 ">
                    <img src={addIcon} width="18px" height="10px "></img>
                  </div>
                  <div
                    style={{
                      backgroundColor: "#2684fe",
                    }}
                    className=" text-white rounded-r px-1 h-7"
                  >
                    нэмэх
                  </div>
                </button>
              ) : null}
          </div>

          <div className="flex mr-4">
          {
            status?.STATUS.STATUS !== null &&
            status?.STATUS.STATUS !== undefined ? (
             <ButtonRequest
                audID={mayagtData.ID}
                docId={mayagtData.DOCUMENT_ID}
                STATUS={status.STATUS?.STATUS}
                RoleID={status.ROLE?.ROLE_ID}
                statusID={status.STATUS.ID}
                Title="Хүсэлт илгээх"
                batlakhHuselt={batlakhHuselt}
              /> ):null}

            {status.ROLE?.AUDITOR_ID !== undefined?
            <ButtonConfirm     
            STATUS={status.STATUS?.STATUS}
              data={mayagtData}
              Title={mayagtData.DOCUMENT_SHORT_NAME}
              RoleID={status?.ROLE.ROLE_ID}
              statusID={status?.STATUS.ID}
              fetchData={() => fetchData()}
              CREATED_BY={{
                APPROVED_FIRST_ID: status?.STATUS.APPROVED_FIRST_ID,
                APPROVED_SECOND_ID: status?.STATUS.APPROVED_SECOND_ID,
                APPROVED_THIRD_ID: status?.STATUS.APPROVED_THIRD_ID,
              }}
              />:null}
          </div>
        </div>
        
        <div className="overflow-y-scroll">
          <div className="h-2 mr-20" />
          <table
            {...{
              style: {
                width: table.getCenterTotalSize(),
              },
            }}
          >
            <thead className="TableHeadBackroundcolor sticky">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <th
                        {...{
                          key: header.id,
                          colSpan: header.colSpan,
                          style: {
                            width: header.getSize(),
                          },
                        }}
                      >
                        {header.isPlaceholder ? null : (
                          <>
                            <div
                              {...{
                                onMouseDown: header.getResizeHandler(),
                                onTouchStart: header.getResizeHandler(),
                                className: `resizer ${
                                  header.column.getIsResizing()
                                    ? "isResizing"
                                    : ""
                                }`,
                              }}
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
                        <td
                          {...{
                            key: cell.id,
                            style: {
                              width: cell.column.getSize(),
                            },
                          }}
                          className="p-2 "
                        >
                          {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                              )
                          } 
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
          <div className="justify-end flex items-center gap-1 mt-5 mr-2 sticky">
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
              <div>нийт:</div>
              <span>{data.length}</span>
              <strong>
                {table.getState().pagination.pageIndex + 1}
                {" - "}
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
             { check_save(status)?  
            <ButtonSave saveToDB={() => saveToDB()} />
             :null}
        </div>
        <div style={{ display: "flex", justifyContent: "end" }}>
          {/* {UserPremission(status.ROLE?.ROLE_ID, "mayagt","save") || mayagtData.IS_LOCK !== 1 ?  */}
        
          {/* :null} */}
        </div>
     
        {/* <div>
          <div className="text-base flex row">
            <FooterValue />
          </div>
        </div> */}

        
      </div>
}
    </>
  );
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

export default Mayagt_14;
