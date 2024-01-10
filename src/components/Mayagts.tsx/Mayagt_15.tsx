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
import { excel,addIcon,editPencil,xIcon } from "../../assets/zurag";
import CurrencyInput from "react-currency-input-field";
import { getExportFileBlob } from "../../functions/excel_export";
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
import { RankingInfo, rankItem  } from "@tanstack/match-sorter-utils";
import fasUrl from "../../fasURL";
import UserPremission from "../../functions/userPermission";
import {check_save}from '../../functions/Tools'
import dateFormat from "dateformat";
import { useNavigate } from "react-router-dom";
import  Dialog  from "../../pages/Dialog";

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

function Mayagt_15(props: any) {
  const mayagtData = props.mayagtData;
  const userDetails = props.userDetails;
  const [saveData, setSaveData] = useState(new Set());
  const Navigate = useNavigate();
  const [showDialogOpen, setShowDialogOpen] = useState(false);
  const [deleteDesc,setDeleteDesc] = useState({ID:null,REMOVE_DESC:''})
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [globalFilter, setGlobalFilter] = React.useState("");
  const [status, setStatus] = useState({ STATUS: {}, ROLE: {} });
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
        accessorKey: "RECOMMENDATION_YEAR",
        header: "Зөвлөмж өгсөн хугацаа /оноор/",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "EVENT_NAME",
        header: "ХШҮ хийсэн арга хэмжээний нэр",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "SHORT_DESC",
        header: "Зөвлөмжийн утга",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "INFO_TYPE_NAME",
        header: "Зөвлөмжийн мэдээллийн төрөл",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "IS_FULFILLMENT",
        header: "Зөвлөмж биелсэн эсэх",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "RECOMMENDATION_TYPE_NAME",
        header:
          "Зөвлөмжийн хугацаа (Зөвхөн зөвлөмж биелсэн эсэх дээр үгүй гэж сонгосон тохиолдолд сонгосон.)",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "DECIDED_COUNT",
        header: "Шийдвэрлэгдсэн  өргөдөл гомдлын  тоо",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "UNIMPLEMENTED_REASON",
        header: "Зөвлөмжийн хэрэгжээгүй шалтгаан тайлбар",
        cell: (info) => info.getValue(),
      },
      {
        header: "Үйлдэл",
        cell: (info) => info.getValue(),
        accessorFn: (row, index) => (
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
                      localStorage.removeItem("stat_bm15");
                      Navigate("/web/Home/bm15/create");
                      localStorage.setItem("stat_bm15", JSON.stringify(row));
                    }}
                    width="14px"
                    height="14px"
                    alt=""
                  />
                </button>
                <button
                  className="bg-transparent text-xs"
                  onClick={() => {
                    let temp = deleteDesc
                    temp.ID = row.ID
                    setDeleteDesc({...temp})
                    setShowDialogOpen(true)
                  }}
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
          </div>
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
      url: Stat_Url + "BM11List",
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

   
  }

  function deletePlan() {
    
          DataRequest({
            url: Stat_Url + "BM11Remove",
            method: "POST",
            data: {
              ID: deleteDesc.ID,
              REMOVE_DESC: deleteDesc.REMOVE_DESC,
              CREATED_BY: userDetails.USER_ID,
            },
          })
            .then(function (response) {
              if (response?.data.status === 200) {
                setShowDialogOpen(false)
                setDeleteDesc({ID:null,REMOVE_DESC:''})
                fetchData();
              }
            })
            .catch(function (error) {
              console.log(error, "error");
              ;
            });
        
     
  }


  return (
    <>
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
                  onClick={() =>{
                    localStorage.removeItem("stat_bm15");
                    Navigate("/web/Home/bm15/create")
                  } }
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
        <Dialog
              open={showDialogOpen}
              title="Мэдэгдэл"
              handleClose={() => setShowDialogOpen(false)}
              width={""}
            >
            <div style={{ maxHeight: "150px", overflowY: "scroll", display:'flex',justifyContent:'center',justifyItems:'center'}}>
              <div className="flex width">
                <label>Устгах шалтгаан:</label>
                <textarea value = {deleteDesc.REMOVE_DESC} 
                   className="inputRoundedMetting"
                   style={{
                     height: '100%',
                     width:'100%',
                     border: "1px solid gray",
                   }}
                onChange = {(e)=>{
                  let temp = deleteDesc
                  temp.REMOVE_DESC = e.target.value
                  setDeleteDesc({...temp})}}/>
              </div>
              <button style={{ backgroundColor: "#2684fe"}} className="text-white p-2 rounded-md justify-end ml-4" onClick={()=>deletePlan()}>Устгах</button>
            
            </div>
      </Dialog>
        <div className="overflow-y-scroll">
          <div className="h-2 mr-20" />
          <table
            {...{
              style: {
                width: table.getCenterTotalSize(),
                minWidth:'100%'
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
             {/* { check_save(status)?  
            <ButtonSave saveToDB={() => saveToDB()} />
             :null} */}
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

export default Mayagt_15;
