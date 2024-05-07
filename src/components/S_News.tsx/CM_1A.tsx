import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../pages/Home.css";
import ButtonSearch from "../ButtonSearch";
import UserPremission from "../../functions/userPermission";
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
  getSortedRowModel,
  FilterFn,
  flexRender,
} from "@tanstack/react-table";

import { RankingInfo, rankItem } from "@tanstack/match-sorter-utils";
import { Period } from "../library";
import { DataRequest } from "../../functions/DataApi";
import Stat_URl from "../../Stat_URL";
import { RevolvingDot } from "react-loader-spinner";
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

function CM_1A(props) {
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
        accessorKey: "AUDIT_ORG_CHECK_NAME",
        cell: (info) => info.getValue(),
        header: "Үзүүлэлт",
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "BUDGET_SHORT_NAME",
        cell: (info) => info.getValue(),
        header: "МД",
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "WORK_PEOPLE",
        cell: (info) => info.getValue(),
        header: "Ажилласан хүн",
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "WORK_DAY",
        cell: (info) => info.getValue(),
        header: "Ажилласан өдөр",
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "WORK_TIME",
        cell: (info) => info.getValue(),
        header: "Ажилласан илүү цаг",
        footer: (props) => props.column.id,
      },
      {
        cell: (info) => info.getValue(),
        header: "Төлөвлөсөн-бүгд",
        accessorFn: (row, index) => <div>{row.DUGNELT + row.TUUWER}</div>,
      },

      {
        accessorKey: "DUGNELT",
        header: "Бие дааж дүгнэлт гаргах",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "TUUWER",
        header: "Үе шатны ажлыг хэсэгчлэн хийх",
        cell: (info) => info.getValue(),
      },
      {
        header: "Гүйцэтгэсэн-бүгд",
        cell: (info) => info.getValue(),
        accessorFn: (row, index) => (
          <div>{row.DUGNELT_LAST + row.TUUWER_LAST}</div>
        ),
      },
      {
        accessorKey: "DUGNELT_LAST",
        header: "Бие дааж дүгнэлт гаргасан",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "TUUWER_LAST",
        header: "Үе шатны ажлыг хэсэгчлэн хийсэн",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "REASON_TYPE_CNT",
        header: "Аудит хийгээгүй",
        cell: (info) => info.getValue(),
      },
      {
        header: "Нийт аудитын санал дүгнэлт",
        cell: (info) => info.getValue(),
        accessorFn: (row, index) => (
          <div>
            {row.UGUI_CNT +
              row.KHYAZGAARLALTTAI_CNT +
              row.TATGALZSAN_CNT +
              row.SURUG_CNT}
          </div>
        ),
      },
      {
        accessorKey: "UGUI_CNT",
        header: "Зөрчилгүй",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "KHYAZGAARLALTTAI_CNT",
        header: "Хязгаарлалттай ",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "TATGALZSAN_CNT",
        header: "Санал дүгнэлт өгөхөөс татгалзсан",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "SURUG_CNT",
        header: "Сөрөг",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "TOLOWLOSON_UR_OGOOJIIN_SANHUUGN_DUN_T",
        header: "Төлөвлөсөн санхүүгийн үр өгөөжийн тоо",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "TOLOWLOSON_UR_OGOOJIIN_SANHUUGN_DUN_T1",
        header: "Төлөвлөсөн санхүүгийн үр өгөөжийн дүн /сая төгрөгөөр/",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "SANHUUGIIN_BUS_UR_OGOOJN_TOO",
        header: "Төлөвлөсөн санхүүгийн бус үр өгөөжийн тоо",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "HULEEN_ZOWSHOORUULSEN_UR_OGOOJ",
        header: "Хүлээн зөвшөөрүүлсэн санхүүгийн үр өгөөжийн тоо",
        cell: (info) => info.getValue(),
      },

      {
        accessorKey: "HULEEN_ZOWSHOORUULSEN_UR_OGOOJ_SANHUUGN_DUN",
        header:
          "Хүлээн зөвшөөрүүлсэн санхүүгийн үр өгөөжийн дүн /сая төгрөгөөр/",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "SANHUUGIIN_BUS_UR_OGOOJIIN_TOO",
        header: "Хүлээн зөвшөөрүүлсэн санхүүгийн бус үр өгөөжийн тоо",
        cell: (info) => info.getValue(),
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
      url: Stat_URl + "CM1AList/",
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
              width: "100%",
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

export default CM_1A;
