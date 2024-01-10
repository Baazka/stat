import React, { useEffect, useState } from "react";
import Title from "../Title";
import "../../pages/Home.css";
import Comment from "../comment";
import FooterValue from "../Footervalue";
import dateFormat, { masks } from "dateformat";
import ButtonConfirm from "../ButtonConfirm";
import ButtonRequest from "../ButtonRequest";
import ButtonSearch from "../ButtonSearch";
import ButtonSave from "../SaveButton";
import { excel } from "../../assets/zurag";
import writeXlsxFile from "write-excel-file";
import DataRequest from "../../functions/make_Request";
import Stat_URL from "../../Stat_URL";
import CurrencyInput from "react-currency-input-field";
import {check_save}from '../../functions/Tools'
import { RevolvingDot } from "react-loader-spinner";
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
import { getExportFileBlob } from "../../functions/excel_export";
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

function Mayagt_3(props: any) {
  const mayagtData = props.mayagtData;
  const userDetails = props.userDetails;
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [globalFilter, setGlobalFilter] = React.useState("");
  const [loaderSpinner, setloaderSpinner] = useState(0);
  const [batlakhHuselt, setBatlakhHuselt] = useState({
    AUDIT_ID: mayagtData.ID,
    DOCUMENT_ID: mayagtData.Document_ID,
    REQUEST_TYPE: 1,
    LEVEL_ID: props.STATUS,
    MODULE_ID:6,
    DESCRIPTION: "",
    CREATED_BY: userDetails.USER_ID,
    
  });
  const columns = React.useMemo(
    () => [
      {
        accessorFn: (row, index) => index + 1,
        accessorKey: "№",
        header: "№",
      },
      {
        accessorKey: "AUDIT_TYPE_NAME",
        cell: (info) => info.getValue(),
        header: "Аудитын төрөл",
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "AUDIT_NAME",
        header: "Аудитын нэр, сэдэв",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "AUDIT_CODE",
        header: "Аудитын код",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "AUDIT_TYPE",
        header: "Аудит хийх хэлбэр",
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
      {
        accessorKey: "BUDGET_SHORT_NAME",
        header: "Төсөв захирагчийн ангилал",
        cell: (info) => info.getValue(),
      },
      // {
      //   accessorKey: "IS_ERROR_CONFLICT_NAME",
      //   header: "Тухайн үр дүнг алдаа зөрчилд тооцох эсэх",
      //   cell: (info) => info.getValue(),
      // },
      {
        accessorKey: "IS_ZALRUULAH_NAME",
        header: "Алдааг залруулсан эсэх",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "ALD_SHORT_DESC",
        header: "Tовч утга",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "AMOUNT",
        header: "Мөнгөн дүн",
        accessorFn: (row, index) => (
          <div>
            <CurrencyInput
              id="input-example"
              defaultValue={row.AMOUNT}
              decimalsLimit={2}
              decimalScale={2}
              disabled
              style={{ textAlign: "center", backgroundColor: "transparent" }}
            />
          </div>
        ),

        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "IS_SUB_ERROR_CONFLICT_NAME",
        header: "Алдаа зөрчлийн дэд анги",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "UR_UGUUJ_NAME",
        header: "Үр өгөөж тооцох эсэх",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "UR_UGUUJ_TYPE_NAME",
        header: "Үр өгөөжийн төрөл",
        cell: (info) => info.getValue(),
      },
    ],
    []
  );

  const [data, setData] = React.useState([]);
  const [status, setStatus] = useState({ STATUS: {}, ROLE: {} });

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
    debugTable: false,
    debugHeaders: false,
    debugColumns: false,
  });
  function saveToDB() {
 
    setloaderSpinner(1)
    DataRequest({
      url: Stat_URL + "BM3IU",
      method: "POST",
      data: {
        // STAT_ID : mayagtData.ID,
        data: data,
       
        CREATED_BY: userDetails.USER_ID,
      },
    })
      .then(function (response) {
        console.log(response.data);
        if (response?.data.message === "Хадгаллаа.") {
          alert("амжилттай хадгаллаа");
          fetchData()
          setloaderSpinner(0)
        }
      })
      .catch(function (error) {
        console.log(error, "error");
        alert("Aмжилтгүй");
        setloaderSpinner(0)
      });
  }


  useEffect(() => {
    fetchData();
  }, [props.mayagtData]);

  async function fetchData() {
    DataRequest({
      url: Stat_URL + "BM3List",
      method: "POST",
      data: {
        ID: mayagtData.ID,
        USER_ID: userDetails.USER_ID,
        USER_TYPE_NAME: userDetails.USER_TYPE_NAME,
      },
    })
      .then(function (response) {
        
        if (response.data !== undefined && response.data.data.length > 0) {
          setData(response.data.data);
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
          }
          widthS={"20rem"}
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
                getExportFileBlob(columns, data, "З-ТАББМ-3");
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
          </div>
          <div className="flex">
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
        <div >
        <div className="overflow-y-scroll">
          <div className="h-2 mr-20" />
          <table className="w-full">
            <thead className="TableHeadBackroundcolor gap-20 ">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <th key={header.id} colSpan={header.colSpan}>
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
        </div>
        </div>
        <div style={{ display: "flex", justifyContent: "end" }}>
        {check_save(status)?
          <ButtonSave saveToDB={() => saveToDB()} />:null}
        </div>
        
        {/* <div>
          <div className="text-base flex row">
            <FooterValue />
          </div>
        </div> */}

        <div className="flex flex-col p-5 pl-0" style={{ width: "100%" }}>
          <div className="flex  items-end">
            <Comment />
          </div>
        </div>
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

export default Mayagt_3;
