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

import {
  RankingInfo,
  rankItem,
} from "@tanstack/match-sorter-utils";
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
      UserPremission(userDetails.USER_TYPE_NAME, "plan", "lock")
      ? {
          id: "select",
          header: ({ table }) => (
            <IndeterminateCheckboxALL
              {...{
                checked: table.getIsAllRowsSelected(),
                indeterminate: table.getIsSomeRowsSelected(),
                onChange: table.getToggleAllRowsSelectedHandler(),
                data,
                setData,
              }}
            />
          ),
          cell: ({ row }) => (
            <div>
              <IndeterminateCheckbox
                {...{
                  checked: row.original.IS_LOCK === 1 ? true : false, //ow.getIsSelected(), //row.IS_LOCK === 1 ?true:false
                  disabled: !row.getCanSelect(),
                  indeterminate: row.getIsSomeSelected(),
                  onChange: row.getToggleSelectedHandler(),
                  data,
                  setData,
                  row,
                }}
              />
            </div>
          ),
        }
      : {
          accessorFn: (row, index) => index + 1,
          accessorKey: "№",
          header: "№",
          size: 10,
        },
      {
        accessorKey: "MD",
        cell: (info) => info.getValue(),
        header: "МД",
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "ZALRUULGIIN_TOO",
        cell: (info) => info.getValue(),
        header: "Залруулгын тоо",
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "ZALRUULGIIN_DUN",
        cell: (info) => info.getValue(),
        header: "Залруулгын дүн /сая төгрөгөөр/",
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "ZOWLOMJIIN_TOO",
        cell: (info) => info.getValue(),
        header: "Зөвлөмжийн тоо",
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "ZOWLOMJIIN_DUN",
        cell: (info) => info.getValue(),
        header: "Зөвлөмжийн дүн /сая төгрөгөөр/ ",
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "ALBAN_SHAARDLAGIIN_TOO",
        cell: (info) => info.getValue(),
        header: "Албан шаардлагын тоо",
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "ALBAN_SHAARDLAGIIN_DUN",
        cell: (info) => info.getValue(),
        header: "Албан шаардлагын дүн /сая төгрөгөөр/",
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "SAHILGIIN_SHIITGEL_NOOGDUULAH_ALBAN_SHARDLAGIN_TOO",
        cell: (info) => info.getValue(),
        header: "Сахилгын шийтгэл ногдуулах албан шаардлагын тоо",
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "AZSH_SAHILGIIN_SHIITGEL_NOOGDUULAH_ALBAN_SHARDLAGIN_DUN",
        cell: (info) => info.getValue(),
        header: "Сахилгын шийтгэл ногдуулах албан шаардлагын дүн /сая төгрөгөөр/",
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "TOLBORIIN_AKTIN_TOO",
        cell: (info) => info.getValue(),
        header: "Төлбөрийн актын тоо ",
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "AZSH_TOLBORIIN_AKTIN_DUN",
        cell: (info) => info.getValue(),
        header: "Төлбөрийн актын дүн /сая төгрөгөөр/",
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "AZSH_HUULI_HYNALTIN_BAI_SHILJUULSEN_ASUUDLIN_TOO",
        cell: (info) => info.getValue(),
        header: "Хууль хяналтын байгууллагад шилжүүлсэн асуудлын тоо",
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "AZSH_HUULI_HYNALTIN_BAI_SHILJUULSEN_ASUUDLIN_DUN",
        cell: (info) => info.getValue(),
        header: "Хууль хяналтын байгууллагад шилжүүлсэн асуудлын дүн /сая төгрөгөөр/",
        footer: (props) => props.column.id,
      },
    ],
    []
  );
 
  const [data, setData] = React.useState([]);
  const Navigate = useNavigate();
  const refreshData = () => setData((old) => []);
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

  async function fetchData() {
    DataRequest({
      url: Stat_URl + "statisticList",
      method: "POST",
      data: {
        
      },
    })
      .then(function (response) {
        if (response?.data !== undefined && response?.data?.length > 0) {
          setData([]);
        } else {
          setData([]);
        }
      })
      .catch(function (error) {
        alert("Өгөгдөл авчрахад алдаа гарлаа!");
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
      <div
        style={{
          maxHeight: window.innerHeight - 129,
          maxWidth: window.innerWidth,
          padding: "0.5rem 0 0 1rem",
          overflowX: "scroll",
        }}
      >
        <div className="flex justify-between mb-2 ">
          <div style={{ height: 28 }} className="flex flex-row  cursor-pointer">
            <ButtonSearch />
            <button
              onClick={() => Navigate("/web/Home/Nemeh")}
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
                          header.getSize() !== 0 ? header.getSize() : undefined,
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
                              onClick: header.column.getToggleSortingHandler(),
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
