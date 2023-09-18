import React, { useState } from "react";
import {
  useNavigate,
  createHashRouter,
  RouterProvider,
} from "react-router-dom";
import Title from "../Title";
import "../../pages/Home.css";
import Subtitle from "../Subtitle";
import ButtonSearch from "../ButtonSearch";
import { excel } from "../../assets/zurag";
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
  sortingFns,
  getSortedRowModel,
  FilterFn,
  SortingFn,
  ColumnDef,
  flexRender,
  FilterFns,
} from "@tanstack/react-table";

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
const now = new Date();

type Stat_CM7 = {
  AUDIT_GAZAR: string;
  AUDIT_KOD: string;
  AUDIT_HH_NEGJ_NR: string;
  ADUIT_HIIH_BAI_NER: string;
  BAI_NER: string;
  REGISTER: string;
  ZOWLOMJ_OGON_HUGATSAA: string;
  HSHU_HIISEN_ARGA_HEMJEE: string;
  ZOWLOMJIIN_UTGA: string;
  ZOWLOMJIIN_MEDEELLN_TOROL: string;
  ZOWLOMJIIN_BIELSEN_ESEH: string;
  ZOWLOMJIIN_HUGATSAA: string;
  SHIIDWERLEGDSEN_ORGDOL_GOMDLN_TOO: string;
  ZOWLOMJIIN_HERGJEEGUI_SHALTGAAN_TAILBAR: string;
};

function CM_7() {
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  // const userDetils = JSON.parse(getItem("userDetails"));
  // const [status, setStatus] = useState([]);
  // const [commentText, setCommentText] = useState("");
  // async function fetchData() {
  const [globalFilter, setGlobalFilter] = React.useState("");

  const columns = React.useMemo<ColumnDef<Stat_CM7, any>[]>(
    () => [
      {
        accessorFn: (row, index) => index + 1,
        id: "№",
      },
      {
        accessorKey: "AUDIT_GAZAR",
        cell: (info) => info.getValue(),
        header: "Аудитын газар",
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "AUDIT_KOD",
        cell: (info) => info.getValue(),
        header: "Санхүүгийн тайлангийн аудитад ТАБ санал дүгнэлт гаргах ТЕЗ",
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "AUDIT_KOD",
        cell: (info) => info.getValue(),
        header: "Санхүүгийн тайлангийн аудитад ТАБ санал дүгнэлт гаргах ТТЗ",
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "AUDIT_KOD",
        cell: (info) => info.getValue(),
        header: "Санхүүгийн тайлангийн аудитад ТАБ санал дүгнэлт гаргах ТШЗ",
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "AUDIT_KOD",
        cell: (info) => info.getValue(),
        header:
          "Санхүүгийн тайлангийн аудитад ТАБ санал дүгнэлт гаргах төсөл, хөтөлбөр",
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "AUDIT_KOD",
        cell: (info) => info.getValue(),
        header:
          "ТАБ-ын санхүүгийн тайланд аудитын санал дүгнэлт гаргах засгийн газрын тусгай сан",
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "AUDIT_KOD",
        cell: (info) => info.getValue(),
        header:
          "Санхүүгийн тайлангийн аудитад ТАБ санал дүгнэлт гаргах ТБОНӨҮГ",
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "AUDIT_KOD",
        cell: (info) => info.getValue(),
        header:
          "Санхүүгийн тайлангийн аудитад ТАБ үе шатны ажлыг хэсэгчлэн хийх ТЕЗ",
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "AUDIT_KOD",
        cell: (info) => info.getValue(),
        header:
          "Санхүүгийн тайлангийн аудитад ТАБ үе шатны ажлыг хэсэгчлэн хийх ТТЗ",
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "AUDIT_KOD",
        cell: (info) => info.getValue(),
        header:
          "Санхүүгийн тайлангийн аудитад ТАБ үе шатны ажлыг хэсэгчлэн хийх ТШЗ",
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "AUDIT_KOD",
        cell: (info) => info.getValue(),
        header:
          "Санхүүгийн тайлангийн аудитад ТАБ үе шатны ажлыг хэсэгчлэн хийх төсөл, хөтөлбөр",
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "AUDIT_KOD",
        cell: (info) => info.getValue(),
        header:
          "Санхүүгийн тайлангийн аудитад ТАБ үе шатны ажлыг хэсэгчлэн хийх засгийн газрын тусгай сан",
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "AUDIT_KOD",
        cell: (info) => info.getValue(),
        header:
          "Санхүүгийн тайлангийн аудитад ТАБ үе шатны ажлыг хэсэгчлэн хийх ТБОНӨҮГ",
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "AUDIT_KOD",
        cell: (info) => info.getValue(),
        header:
          "Санхүүгийн тайлангийн аудитад аудитын хуулийн этгээд санал дүгнэлт гаргах ТШЗ",
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "AUDIT_KOD",
        cell: (info) => info.getValue(),
        header:
          "Санхүүгийн тайлангийн аудитад аудитын хуулийн этгээд санал дүгнэлт гаргах ТБОНӨҮГ",
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "AUDIT_KOD",
        cell: (info) => info.getValue(),
        header:
          "Санхүүгийн тайлангийн аудитад аудитын хуулийн этгээд үе шатны ажлыг хэсэгчлэн хийх ТШЗ",
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "AUDIT_KOD",
        cell: (info) => info.getValue(),
        header:
          "Санхүүгийн тайлангийн аудитад аудитын хуулийн этгээд үе шатны ажлыг хэсэгчлэн хийх ТБОНӨҮГ",
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "AUDIT_KOD",
        cell: (info) => info.getValue(),
        header: "Гүйцэтгэлийн аудит",
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "AUDIT_KOD",
        cell: (info) => info.getValue(),
        header: "Нийцлийн аудит",
        footer: (props) => props.column.id,
      },
    ],
    []
  );
  let Stat_CM7 = [{}];
  const [data, setData] = React.useState<Stat_CM7[]>(Stat_CM7);
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
    debugTable: true,
    debugHeaders: true,
    debugColumns: false,
  });

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
          padding: "0.5rem 0 0 0.5rem",
          overflowX: "scroll",
        }}
      >
        <div className="justify-start flex mb-2 mt-2">
          <Title
            title={
              "ТӨРИЙН АУДИТЫН БАЙГУУЛЛАГЫН ТАЙЛАНТ ОНД ГҮЙЦЭТГЭХ АУДИТЫН ТӨЛӨВЛӨЛТ 3-ТАБСМ-7"
            }
            widthS={"45rem"}
            widthL={"16rem"}
          />
          <div className="mt-1 ml-1.5">
            <Subtitle mayagtName={"З-ТАБСМ-7"} />
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
          <table>
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

export default CM_7;
