import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Title from "../Title";
import "../../pages/Home.css";
import Subtitle from "../Subtitle";
import ButtonSearch from "../ButtonSearch";
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
import { excel } from "../../assets/zurag";
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
type Stat_CM1B = {
  UZUULELT: string;
  MD: string;
  EMPLOYEE: string;
  A_DATE: string;
  A_TIME: string;
  TOLOWLOSON_AUDIT_TOO: string;
  GUITSETGESE_AUDIT_TOO: string;
  SHALGAGDAGCH_ETGEEDIIN_TOO: string;
  AUDIT_HAMRAGDSAN_TOO: string;
  TOLOWLOSON_UR_OGOOJIIN_SANHUUGIIN_TOO: string;
  TOLOWLOSON_OGOOIIN_SANHUUGIIN_DUN_T: string;
  SANHUUGIIN_BUS_UR_OGOOJIIN_TOO: string;
  HULEEN_ZOW_UR_OGOOJIIN_SANHUUGIIIN_TOO: string;
  HULEEN_ZOWSHOORUULSEN_UR: string;
  SANHUUGIIN_BUS_UR_OGOOJIIN_TOO1: string;
};

function CM_1B() {
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [globalFilter, setGlobalFilter] = React.useState("");
  const columns = React.useMemo<ColumnDef<Stat_CM1B, any>[]>(
    () => [
      {
        accessorFn: (row, index) => index + 1,
        id: "№",
      },
      {
        accessorKey: "UZUULELT",
        cell: (info) => info.getValue(),
        header: "Үзүүлэлт",
        footer: (props) => props.column.id,
        size: 3000,
      },
      {
        accessorKey: "MD",
        cell: (info) => info.getValue(),
        header: "МД",
        footer: (props) => props.column.id,
        size: 3000,
      },
      {
        accessorKey: "EMPLOYEE",
        cell: (info) => info.getValue(),
        header: "Ажилласан хүн",
        footer: (props) => props.column.id,
        size: 3000,
      },
      {
        accessorKey: "A_DATE",
        cell: (info) => info.getValue(),
        header: "Ажилласан өдөр",
        footer: (props) => props.column.id,
        size: 3000,
      },
      {
        accessorKey: "A_TIME",
        cell: (info) => info.getValue(),
        header: "Ажилласан илүү цаг",
        footer: (props) => props.column.id,
        size: 3000,
      },
      {
        accessorKey: "TOLOWLOSON_AUDIT_TOO",
        cell: (info) => info.getValue(),
        header: "Төлөвлөсөн аудитын тоо",
        footer: (props) => props.column.id,
        size: 3000,
      },
      {
        accessorKey: "GUITSETGESE_AUDIT_TOO",
        header: "Гүйцэтгэсэн аудитын тоо",
        cell: (info) => info.getValue(),
        size: 3000,
      },
      {
        accessorKey: "SHALGAGDAGCH_ETGEEDIIN_TOO",
        header: "Шалгагдагч этгээдийн тоо",
        cell: (info) => info.getValue(),
        size: 3000,
      },
      {
        accessorKey: "AUDIT_HAMRAGDSAN_TOO",
        header: "Аудитад хамрагдагчийн тоо",
        cell: (info) => info.getValue(),
        size: 3000,
      },
      {
        accessorKey: "TOLOWLOSON_UR_OGOOJIIN_SANHUUGIIN_TOO",
        header: "Төлөвлөсөн санхүүгийн үр өгөөжийн тоо",
        cell: (info) => info.getValue(),
        size: 3000,
      },
      {
        accessorKey: "TOLOWLOSON_OGOOIIN_SANHUUGIIN_DUN_T",
        header: "Төлөвлөсөн санхүүгийн үр өгөөжийн дүн (сая төгрөгөөр)",
        cell: (info) => info.getValue(),
        size: 3000,
      },
      {
        accessorKey: "SANHUUGIIN_BUS_UR_OGOOJIIN_TOO",
        header: "Төлөвлөсөн санхүүгийн бус үр өгөөжийн тоо",
        cell: (info) => info.getValue(),
        size: 3000,
      },
      {
        accessorKey: "HULEEN_ZOW_UR_OGOOJIIN_SANHUUGIIIN_TOO",
        header: "Хүлээн зөвшөөрүүлсэн санхүүгийн үр өгөөжийн тоо",
        cell: (info) => info.getValue(),
        size: 3000,
      },
      {
        accessorKey: "HULEEN_ZOWSHOORUULSEN_UR-OGOOJ_SANHUUGIIN_DUN",
        header:
          "Хүлээн зөвшөөрүүлсэн санхүүгийн үр өгөөжийн дүн (сая төгрөгөөр)",
        cell: (info) => info.getValue(),
        size: 3000,
      },
      {
        accessorKey: "SANHUUGIIN_BUS_UR_OGOOJIIN_TOO1",
        header: "Хүлээн зөвшөөрүүлсэн санхүүгийн бус үр өгөөжийн тоо",
        cell: (info) => info.getValue(),
        size: 3000,
      },
    ],
    []
  );
  let Stat_CM1B = [
    {
      UZUULELT: "Нийт дүн мөр(1)=мөр(2+3+4)",
      MD: "1",
    },
    {
      UZUULELT: "Бодлогоор",
      MD: "2",
    },
    {
      UZUULELT: "Хуулийн дагуу",
      MD: "3",
    },
    {
      UZUULELT: "Төлөвлөгөөт бус",
      MD: "4",
    },
  ];
  const [data, setData] = React.useState<Stat_CM1B[]>(Stat_CM1B);
  const Navigate = useNavigate();
  const refreshData = () => setData((old) => []);

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
        <div className="justify-start flex mb-2 mt-2">
          <Title
            title={
              "ТАЙЛАНТ ОНД ГҮЙЦЭТГЭСЭН САНХҮҮГИЙН ТАЙЛАНГИЙН АУДИТЫН ЕРӨНХИЙ МЭДЭЭЛЭЛ 3-ТАБСМ-1Б"
            }
            widthS={"44rem"}
            widthL={"20rem"}
          />

          <div className="mt-1 ml-1.5">
            <Subtitle mayagtName={"З-ТАБСМ-1Б"} />
          </div>
        </div>
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
          <table style={{ width: "5000px" }}>
            <thead className="TableHeadBackroundcolor gap-20">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <th
                        key={header.id}
                        colSpan={header.colSpan}
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
            <div>нийт</div>
            <strong>
              {table.getState().pagination.pageIndex + 1} {table.getPageCount()}
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

// A debounced input react component
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
    <div className=" overflow-hidden flex border rounded-md">
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

export default CM_1B;
