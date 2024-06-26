import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../pages/Home.css";
import ButtonSearch from "../ButtonSearch";
import UserPremission from "../../functions/userPermission";
import { excel } from "../../assets/zurag";
import DataRequest from "../../functions/make_Request";
import Stat_URl from "../../Stat_URL";
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

import { RankingInfo, rankItem } from "@tanstack/match-sorter-utils";
import { RevolvingDot } from "react-loader-spinner";
import { Period } from "../library";
import CurrencyInput from "react-currency-input-field";
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

function CM_4() {
  // @ts-ignore
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [globalFilter, setGlobalFilter] = React.useState("");

  const columns = React.useMemo(
    () => [
      {
        accessorFn: (row, index) => index + 1,
        accessorKey: "№",
        header: "№",
        size: 10,
      },
      {
        accessorKey: "SALBAR_ANGILAL",
        header: "Байгууллагын үйл ажиллагааны салбарын ангилал",
        cell: (info) => info.getValue(),
        enableGrouping: false,
      },
      // {
      //   accessorKey: "MD",
      //   cell: (info) => info.getValue(),
      //   header: "МД",
      //   footer: (props) => props.column.id,
      // },
      {
        accessorKey: "ZAL_CNT",
        cell: (info) => info.getValue(),
        header: "Залруулгын тоо",
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "ZAL_AMOUNT",
        cell: (info) => info.getValue(),
        header: "Залруулгын дүн /сая төгрөгөөр/",
        footer: (props) => props.column.id,
        accessorFn: (row, index) => (
          <div>
            <CurrencyInput
              id="input-example"
              defaultValue={row.ZAL_AMOUNT}
              decimalsLimit={2}
              decimalScale={2}
              disabled
              style={{ textAlign: "center", backgroundColor: "transparent" }}
            />
          </div>
        ),
      },
      {
        accessorKey: "ZUW_CNT",
        cell: (info) => info.getValue(),
        header: "Зөвлөмжийн тоо",
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "ZUW_AMOUNT",
        cell: (info) => info.getValue(),
        header: "Зөвлөмжийн дүн /сая төгрөгөөр/ ",
        footer: (props) => props.column.id,
        accessorFn: (row, index) => (
          <div>
            <CurrencyInput
              id="input-example"
              defaultValue={row.ZUW_AMOUNT}
              decimalsLimit={2}
              decimalScale={2}
              disabled
              style={{ textAlign: "center", backgroundColor: "transparent" }}
            />
          </div>
        ),
      },
      {
        accessorKey: "ASH_CNT",
        cell: (info) => info.getValue(),
        header: "Албан шаардлагын тоо",
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "ASH_AMOUNT",
        cell: (info) => info.getValue(),
        header: "Албан шаардлагын дүн /сая төгрөгөөр/",
        footer: (props) => props.column.id,
        accessorFn: (row, index) => (
          <div>
            <CurrencyInput
              id="input-example"
              defaultValue={row.ASH_AMOUNT}
              decimalsLimit={2}
              decimalScale={2}
              disabled
              style={{ textAlign: "center", backgroundColor: "transparent" }}
            />
          </div>
        ),
      },
      {
        accessorKey: "SSH_CNT",
        cell: (info) => info.getValue(),
        header: "Сахилгын шийтгэл ногдуулах албан шаардлагын тоо",
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "SSH_AMOUNT",
        cell: (info) => info.getValue(),
        header:
          "Сахилгын шийтгэл ногдуулах албан шаардлагын дүн /сая төгрөгөөр/",
        footer: (props) => props.column.id,
        accessorFn: (row, index) => (
          <div>
            <CurrencyInput
              id="input-example"
              defaultValue={row.SSH_AMOUNT}
              decimalsLimit={2}
              decimalScale={2}
              disabled
              style={{ textAlign: "center", backgroundColor: "transparent" }}
            />
          </div>
        ),
      },
      {
        accessorKey: "TA_CNT",
        cell: (info) => info.getValue(),
        header: "Төлбөрийн актын тоо ",
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "TA_AMOUNT",
        cell: (info) => info.getValue(),
        header: "Төлбөрийн актын дүн /сая төгрөгөөр/",
        footer: (props) => props.column.id,
        accessorFn: (row, index) => (
          <div>
            <CurrencyInput
              id="input-example"
              defaultValue={row.TA_AMOUNT}
              decimalsLimit={2}
              decimalScale={2}
              disabled
              style={{ textAlign: "center", backgroundColor: "transparent" }}
            />
          </div>
        ),
      },
      {
        accessorKey: "KHKH_CNT",
        cell: (info) => info.getValue(),
        header: "Хууль хяналтын байгууллагад шилжүүлсэн асуудлын тоо",
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "KHKH_AMOUNT",
        cell: (info) => info.getValue(),
        header:
          "Хууль хяналтын байгууллагад шилжүүлсэн асуудлын дүн /сая төгрөгөөр/",
        footer: (props) => props.column.id,
        accessorFn: (row, index) => (
          <div>
            <CurrencyInput
              id="input-example"
              defaultValue={row.KHKH_AMOUNT}
              decimalsLimit={2}
              decimalScale={2}
              disabled
              style={{ textAlign: "center", backgroundColor: "transparent" }}
            />
          </div>
        ),
      },
    ],
    []
  );

  const [data, setData] = React.useState([]);
  const Navigate = useNavigate();
  const refreshData = () => setData((old) => []);
  const [filter, setFilter] = useState({
    Audit: {
      PERIOD_ID: 999,
      DEPARTMENT_ID: 999,
    },
  });

  const [drop, setDrop] = useState([]);
  const [loaderSpinner, setloaderSpinner] = useState(0);

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
    defaultColumn: {
      size: 100,
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

  useEffect(() => {
    fetchData();
  }, [filter]);

  async function fetchData(params: type) {
    setloaderSpinner(1);
    DataRequest({
      url: Stat_URl + "refDepartment?DepType=1",
      method: "GET",
      data: {},
    })
      .then(function (res) {
        if (res.data !== undefined && res?.data.length > 0) {
          setDrop(res.data);
          setloaderSpinner(0);
        }
      })
      .catch(function (error) {
        setloaderSpinner(0);
      });
    DataRequest({
      url: Stat_URl + "CM4List/",
      method: "POST",
      data: {
        PERIOD_ID: filter.Audit.PERIOD_ID,
        DEPARTMENT_ID: filter.Audit.DEPARTMENT_ID,
      },
    })
      .then(function (response) {
        if (response.data !== undefined && response?.data.length > 0) {
          setData(response.data);
          setloaderSpinner(0);
        } else {
          setData([]);
        }
      })
      .catch(function (error) {
        console.log(error, "error");
        setloaderSpinner(0);
      });
  }

  React.useEffect(() => {
    if (table.getState().columnFilters[0]?.id === "fullName") {
      if (table.getState().sorting[0]?.id !== "fullName") {
        table.setSorting([{ id: "fullName", desc: false }]);
      }
    }
  }, [table.getState().columnFilters[0]?.id]);

  return (
    <>
      {loaderSpinner === 1 || loaderSpinner === undefined ? (
        <div
          style={{
            paddingLeft: "45%",
            paddingTop: "10%",
            paddingBottom: "10%",
          }}
        >
          <RevolvingDot color="#2684fe" height={50} width={50} />
        </div>
      ) : (
        <>
          <div className="flex justify-between mb-2 ">
            <div
              style={{ height: 28 }}
              className="flex flex-row  cursor-pointer"
            >
              <div style={{ marginRight: "10px", fontSize: "0.8rem" }}>
                <Period
                  data={filter}
                  setData={(value: any) => setFilter(value)}
                />
              </div>
              <div style={{ marginRight: "10px", fontSize: "0.8rem" }}>
                <select
                  className="border rounded text-sm focus:outline-none py-0.5"
                  value={filter.Audit.DEPARTMENT_ID}
                  onChange={(value) => {
                    let temp = filter;
                    temp.Audit.DEPARTMENT_ID = value.target.value;
                    setFilter({ ...temp });
                  }}
                >
                  <option value={999}>Аудит хийх нэгж</option>
                  {drop.map((nation, index) => (
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
              <ButtonSearch />
              <button
                //onClick={() => Navigate("/web/Home/Nemeh")}
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
          </div>

          <div
            style={{
              maxHeight: "630px",
              overflowY: "scroll",
            }}
          >
            <div className="h-2 mr-20" />
            <table className="w-full">
              <thead className="TableHeadBackroundcolor gap-20">
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <th
                          key={header.id}
                          colSpan={header.colSpan}
                          className="px-1.5"
                          style={{
                            width:
                              header.getSize() !== 0
                                ? header.getSize()
                                : undefined,
                          }}
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
                                  <Filter
                                    column={header.column}
                                    table={table}
                                  />
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
        </>
      )}
    </>
  );
}

function IndeterminateCheckbox({
  indeterminate,
  className = "",
  data,
  setData,
  row,

  ...rest
}: { indeterminate?: boolean } & HTMLProps<HTMLInputElement>) {
  const ref = React.useRef<HTMLInputElement>(null!);
  // @ts-ignore
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));
  React.useEffect(() => {
    if (typeof indeterminate === "boolean") {
      ref.current.indeterminate = !rest.checked && indeterminate;
    }
  }, [ref, indeterminate]);

  function saveToDB(value) {
    let tempData = data;
    tempData[row.index].IS_LOCK = row.original.IS_LOCK === 0 ? 1 : 0;
    setData(tempData);
  }

  return (
    <input
      type="checkbox"
      ref={ref}
      className={className + " cursor-pointer"}
      //{row?.original.IS_LOCK === 1 ?true:false}
      checked={true}
      onClick={(value) => saveToDB(ref)}
      {...rest}
    />
  );
}

function IndeterminateCheckboxALL({
  indeterminate,
  className = "",
  data,
  setData,

  table,
  ...rest
}: { indeterminate?: boolean } & HTMLProps<HTMLInputElement>) {
  const ref = React.useRef<HTMLInputElement>(null!);
  // @ts-ignore
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));
  React.useEffect(() => {
    if (typeof indeterminate === "boolean") {
      ref.current.indeterminate = !rest.checked && indeterminate;
    }
  }, [ref, indeterminate]);

  function saveToDB() {
    let tempData = data;
    for (let i = 0; i < data.length; i++) {
      tempData[i].IS_LOCK = data[i].IS_LOCK === 0 ? 1 : 0;
      if (i === data.length - 1) {
        setData(tempData);
      }
    }
  }

  return (
    <input
      type="checkbox"
      ref={ref}
      className={className + " cursor-pointer"}
      //{row?.original.IS_LOCK === 1 ?true:false}
      checked={true}
      onClick={(value) => saveToDB()}
      {...rest}
    />
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
export default CM_4;
