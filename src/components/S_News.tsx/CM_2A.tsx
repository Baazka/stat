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
  GroupingState,
  getGroupedRowModel,
  getExpandedRowModel,
} from "@tanstack/react-table";

import {
  RankingInfo,
  rankItem,
  compareItems,
} from "@tanstack/match-sorter-utils";
import { excel } from "../../assets/zurag";
import ButtonPrint from "../ButtonPrint";
import ButtonConfirm from "../ButtonConfirm";
import ButtonRequest from "../ButtonRequest";
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

type Stat_CM2A = {
  UZUULLT: string;
  SHIIDWERLLT: string;
  MD: number;
  EHNII_ULDEGDL_TOO: number;
  EHNII_ULDEGDLIIN_DUN: number;
  TAILANT_HUGATSAAND_NEMEGDSEN_TOO: string;
  TAILANT_HUGATSAAND_NEMEGDSEN_DUN: string;
  BIELLTIIN_OMNOH_ONI_TOO: string;
  BIELLTIN_OMNOH_ONI_DUN: string;
  BIELTIIN_TAILNT_ONI_TOO: string;
  BIELLTIIN_TAILNT_ONI_DUN: string;
  BIELLTIIN_HERGJILTIIN_BUH_TOO: string;
  BIELLTIN_HERGJILTIIN_BUH_DUN: string;
  BIELLTIIN_TOWLORUULSEN_DANSNII_TOROL_ULSIIN_TOSOW: string;
  BIELLTIIN__TOWLORUULSEN_DANSNII_TOROL_ULSIIN_TOSWIIN_DUN: String;
  BIELLT_TOWLORUULSEN_DANSNII_TOROL_ORON_NUTGIIN_TOSWIIN_TOO: String;
  BIELLTIIN_TOWLORUULSEN_DANSNII_TOROL_NUTGIIN_TOSOW_DUNSTR: string;
  BIELLTIN_TOWLORUULSEN_DANSNII_TOROL_TUHAIN_BAI_TOO: string;
  BIELLTIN_TOWLORUULSEN_DANSNII_TOROL_TUHAIN_BAI_DUN: string;
  BIELLTIIN_TOWLORUULSEN_DANSNII_TOROL_BUSAD_TOO: string;
  STATISTIC_MEDEENEES_HASAGDSAN_TOO: string;
  STATISTIC_MEDEES_HASAGDSAN_DUN: string;
  ETSIN_ULDEGLIIN_TOO: string;
  ETSSIIN_ULDEGDEL_DUN: string;
  OMNOH_ONII_HUGATSAA_BOLOOGUIN_TOO: string;
  OMNIH_ONI_HUGATSAA_BOLOOGUIN_DUN: string;
  OMNOH_ONI_HUGATSAA_HETERSEN_TOO: string;
  TAILANT_ONI_HUGATSAA_BOLOOGUIN_TOO: string;
  TAILANT_ONI_HUGATSAA_BOLOOGUI_DUN: string;
  TAILANT_ONI_HUGTSAA_HETERSEN_TOO: string;
  TAILANT_ONI_HUGATSAA_HETERSEN_DUN: string;
  HULEEN_ZOWSHOORUULSEN_UR_OGOOJN_SANHUUGIIN_TOO: string;
  HULEEN_ZOWSHOORUULSEN_UR_OGOOJIIN_SANHUUGIIN_DUN: string;
  HULEEN_ZOWSHOORUULSEN_SANHUUGIIN_BUS_UR_OGOOJN_TOO: string;
};

function CM_2A() {
  const rerender = React.useReducer(() => ({}), {})[1];
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  // const userDetails = JSON.parse(getItem("userDetails"));
  // const [status, setStatus] = useState([]);
  // const [commentText, setCommentText] = useState("");
  // async function fetchData() {
  const [globalFilter, setGlobalFilter] = React.useState("");

  const columns = React.useMemo<ColumnDef<Stat_CM2A, any>[]>(
    () => [
      {
        accessorFn: (row, index) => index + 1,
        id: "№",
        enableGrouping: false,
      },
      {
        accessorKey: "UZUULLT",
        header: "Үзүүлэлт",
        cell: (info) => info.getValue(),
        getGroupingValue: (row) => `${row.UZUULLT} ${row.SHIIDWERLLT}`,
      },
      {
        accessorKey: "SHIIDWERLLT",
        id: "baiguulaga",
        cell: (info) => info.getValue(),
        header: "Шийдвэрлэлт",
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "MD",
        cell: (info) => info.getValue(),
        header: "МД",
        enableGrouping: false,
      },
      {
        accessorKey: "EHNII_ULDEGDL_TOO",
        header: "Эхний үлдэгдлийн тоо",
        // cell: ({ getValue }) =>
        //   Math.round(getValue<number>() * 100) / 100 + "%",
        // aggregationFn: "mean",
        // aggregatedCell: ({ getValue }) =>
        //   Math.round(getValue<number>() * 100) / 100 + "%",
        enableGrouping: false,
      },
      {
        accessorKey: "EHNII_ULDEGDLIIN_DUN",
        header: "Эхний үлдэгдлийн дүн",
        aggregatedCell: ({ getValue }) =>
          Math.round(getValue<number>() * 100) / 100,
        aggregationFn: "median",
        enableGrouping: false,
      },
      {
        accessorKey: "TAILANT_HUGATSAAND_NEMEGDSEN_TOO",
        cell: (info) => info.getValue(),
        header: "Тайлант хугацаанд нэмэгдсэн тоо",
        footer: (props) => props.column.id,
        enableGrouping: false,
      },
      {
        accessorKey: "TAILANT_HUGATSAAND_NEMEGDSEN_DUN",
        cell: (info) => info.getValue(),
        header: "Тайлант хугацаанд нэмэгдсэн дүн",
        footer: (props) => props.column.id,
        enableGrouping: false,
      },
      {
        accessorKey: "OMNOH_ONI_BIELLTIIN_TOO",
        header: "Өмнөх оны биелэлтийн тоо",
        cell: (info) => info.getValue(),
        enableGrouping: false,
      },
      {
        accessorKey: "OMNOH_ONI_BIELLTIIN_DUN",
        header: "Өмнөх оны биелэлтийн дүн",
        cell: (info) => info.getValue(),
        enableGrouping: false,
      },
      {
        accessorKey: "TO_BIELLTN_TOO",
        header: "Тайлант оны биелэлтийн тоо",
        cell: (info) => info.getValue(),
        enableGrouping: false,
      },
      {
        accessorKey: "TO_BIELLTN_DUN",
        header: "Тайлант оны биелэлтийн дүн",
        cell: (info) => info.getValue(),
        enableGrouping: false,
      },
      {
        accessorKey: "NIIT_HERGJILTIIN_TOO",
        header: "Нийт хэрэгжилтийн тоо",
        cell: (info) => info.getValue(),
        enableGrouping: false,
      },
      {
        accessorKey: "NIIT_HERGJILTIIN_DUN",
        header: "Нийт хэрэгжилтийн дүн",
        cell: (info) => info.getValue(),
        enableGrouping: false,
      },
      {
        accessorKey: "ULSIIN_TOSOWT_TOWLORUULSEN_TOO",
        header: "Улсын төсөвт төвлөрүүлсэн тоо",
        cell: (info) => info.getValue(),
        enableGrouping: false,
      },
      {
        accessorKey: "ULSIIN_TOSOWT_TOWLORUULSEN_DUN",
        header: "Улсын төсөвт төвлөрүүлсэн дүн",
        cell: (info) => info.getValue(),
        enableGrouping: false,
      },
      {
        accessorKey: "ONT_TOWLORUULSEN_TOO",
        header: "Орон нутгийн төсөвт төвлөрүүлсэн тоо",
        cell: (info) => info.getValue(),
        enableGrouping: false,
      },
      {
        accessorKey: "ONT_TOWLORUULSEN_DUN",
        header: "Орон нутгийн төсөвт төвлөрүүлсэн дүн",
        cell: (info) => info.getValue(),
        enableGrouping: false,
      },
      {
        accessorKey: "TBD_TOWLORUULSEN_TOO",
        header: "Тухайн байгууллагын дансанд төвлөрүүлсэн тоо",
        cell: (info) => info.getValue(),
        enableGrouping: false,
      },
      {
        accessorKey: "TBD_TOWLORUULSEN_DUN",
        header: "Тухайн байгууллагын дансанд төвлөрүүлсэн дүн",
        cell: (info) => info.getValue(),
        enableGrouping: false,
      },
      {
        accessorKey: "BUSAD_TOO",
        header: "Бусад дансанд төвлөрүүлсэн тоо",
        cell: (info) => info.getValue(),
        enableGrouping: false,
      },
      {
        accessorKey: "BUSAD_DUN",
        header: "Бусад дансанд төвлөрүүлсэн дүн",
        cell: (info) => info.getValue(),
        enableGrouping: false,
      },
      {
        accessorKey: "STATISTIC_MEDEENEES_HASAGDSAN_TOO",
        header: "Статистик мэдээнээс хасагдсан тоо",
        cell: (info) => info.getValue(),
        enableGrouping: false,
      },
      {
        accessorKey: "STATISTIC_MEDEES_HASAGDSAN_DUN",
        header: "Статистик мэдээнээс хасагдсан дүн",
        cell: (info) => info.getValue(),
        enableGrouping: false,
      },
      {
        accessorKey: "ETSIN_ULDEGLIIN_TOO",
        header: "Эцсийн үлдэгдлийн тоо",
        cell: (info) => info.getValue(),
        enableGrouping: false,
      },
      {
        accessorKey: "ETSSIIN_ULDEGDEL_DUN",
        header: "Эцсийн үлдэгдлийн дүн",
        cell: (info) => info.getValue(),
        enableGrouping: false,
      },
      {
        accessorKey: "OMNOH_ONII_HUGATSAA_BOLOOGUIN_TOO",
        header: "Өмнөх оны хугацаа болоогүй тоо",
        cell: (info) => info.getValue(),
        enableGrouping: false,
      },
      {
        accessorKey: "OMNIH_ONI_HUGATSAA_BOLOOGUIN_DUN",
        header: "Өмнөх оны хугацаа болоогүй дүн",
        cell: (info) => info.getValue(),
        enableGrouping: false,
      },
      {
        accessorKey: "OMNOH_ONI_HUGATSAA_HETERSEN_TOO",
        header: "Өмнөх оны хугацаа хэтэрсэн тоо",
        cell: (info) => info.getValue(),
        enableGrouping: false,
      },
      {
        accessorKey: "TAILANT_ONI_HUGATSAA_HETERSEN_TOO",
        header: "Өмнөх оны хугацаа хэтэрсэн дүн",
        cell: (info) => info.getValue(),
        enableGrouping: false,
      },
      {
        accessorKey: "TAILANT_ONI_HUGATSAA_BOLOOGUI_TOO",
        header: "Тайлант оны хугацаа болоогүй тоо",
        cell: (info) => info.getValue(),
        enableGrouping: false,
      },
      {
        accessorKey: "TAILANT_ONI_HUGATSAA_BOLOOGUI_DUN",
        header: "Тайлант оны хугацаа болоогүй дүн",
        cell: (info) => info.getValue(),
        enableGrouping: false,
      },
      {
        accessorKey: "TAILANT_ONI_HUGTSAA_HETERSEN_TOO",
        header: "Тайлант оны хугацаа хэтэрсэн тоо",
        cell: (info) => info.getValue(),
        enableGrouping: false,
      },
      {
        accessorKey: "TAILANT_ONI_HUGATSAA_HETERSEN_DUN",
        header: "Тайлант оны хугацаа хэтэрсэн дүн",
        cell: (info) => info.getValue(),
        enableGrouping: false,
      },
      {
        accessorKey: "HULEEN_ZOWSHOORUULSEN_UR_OGOOJN_SANHUUGIIN_TOO",
        header: "Хүлээн зөвшөөрүүлсэн санхүүгийн үр өгөөжийн тоо",
        cell: (info) => info.getValue(),
        enableGrouping: false,
      },
      {
        accessorKey: "HULEEN_ZOWSHOORUULSEN_UR_OGOOJIIN_SANHUUGIIN_DUN",
        header: "Хүлээн зөвшөөрүүлсэн санхүүгийн үр өгөөжийн дүн",
        cell: (info) => info.getValue(),
        enableGrouping: false,
      },
      {
        accessorKey: "HULEEN_ZOWSHOORUULSEN_SANHUUGIIN_BUS_UR_OGOOJN_TOO",
        header: "Хүлээн зөвшөөрүүлсэн санхүүгийн бус үр өгөөжийн тоо",
        cell: (info) => info.getValue(),
        enableGrouping: false,
      },
    ],
    []
  );
  let Stat_CM2A = [
    {
      SHIIDWERLLT: "Төлбөрийн акт мөр(9)=мөр(10+11+12+13+14+15+16)",
    },
    {
      SHIIDWERLLT: "ЗГСНТ, НТГ",
    },
    {
      SHIIDWERLLT: "ТЕЗ",
    },
    {
      SHIIDWERLLT: "ТТЗ",
    },
    {
      UZUULLT: "Төрийн аудитын байгууллага",
      SHIIDWERLLT: "ТШЗ",
    },
    {
      SHIIDWERLLT: "Төсөл, хөтөлбөр",
    },
    {
      SHIIDWERLLT: "Засгийн газрын тусгай сан",
    },
    {
      SHIIDWERLLT: "ТБОНӨҮГ",
    },
    {
      SHIIDWERLLT: "Төлбөрийн акт мөр(9)=мөр(10+11+12+13+14+15+16)}",
    },
    {
      SHIIDWERLLT: "ЗГСНТ, НТГ",
    },
    {
      SHIIDWERLLT: "ТЕЗ",
    },
    {
      SHIIDWERLLT: "ТТЗ",
    },
    {
      UZUULLT: "Төрийн аудитын байгууллага",
      SHIIDWERLLT: "ТШЗ",
    },
    {
      SHIIDWERLLT: "Төсөл, хөтөлбөр",
    },
    {
      SHIIDWERLLT: "Засгийн газрын тусгай сан",
    },
    {
      SHIIDWERLLT: "ТБОНӨҮГ",
    },
  ];
  const [grouping, setGrouping] = React.useState<GroupingState>([]);
  const [data, setData] = React.useState<Stat_CM2A[]>(Stat_CM2A);
  const Navigate = useNavigate();
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
      grouping,
    },
    defaultColumn: {
      size: 100,
    },
    onGroupingChange: setGrouping,
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
    getExpandedRowModel: getExpandedRowModel(),
    getGroupedRowModel: getGroupedRowModel(),
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
          padding: "0.5rem 0 0 1rem",
          overflowX: "scroll",
        }}
      >
        <div className="justify-start flex mb-2 mt-2">
          <Title
            title={
              "САНХҮҮГИЙН ТАЙЛАНГИЙН АУДИТААР ИЛРҮҮЛСЭН ЗӨРЧЛИЙН ШИЙДВЭРЛЭЛТИЙН 3-ТАБСМ-2A"
            }
            widthS={"40rem"}
            widthL={"20rem"}
          />
          <div className="mt-1 ml-1.5">
            <Subtitle mayagtName={"З-ТАБСМ-2A"} />
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
            maxHeight: "650px",
            overflowY: "scroll",
          }}
        >
          <div className="h-2 mr-20" />
          <table>
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <th key={header.id} colSpan={header.colSpan}>
                        {header.isPlaceholder ? null : (
                          <div>
                            {header.column.getCanGroup() ? (
                              // If the header can be grouped, let's add a toggle
                              <button
                                {...{
                                  onClick:
                                    header.column.getToggleGroupingHandler(),
                                  style: {
                                    cursor: "pointer",
                                  },
                                }}
                              >
                                {header.column.getIsGrouped()
                                  ? `🛑(${header.column.getGroupedIndex()}) `
                                  : `👊 `}
                              </button>
                            ) : null}{" "}
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                          </div>
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
                    {row.getVisibleCells().map((cell) => {
                      return (
                        <td
                          key={cell.id}
                          className="p-2"
                          style={{
                            background: cell.getIsGrouped()
                              ? "#0aff0082"
                              : cell.getIsAggregated()
                              ? "#ffa50078"
                              : cell.getIsPlaceholder()
                              ? "#ff000042"
                              : "",
                          }}
                        >
                          {cell.getIsGrouped() ? (
                            // If it's a grouped cell, add an expander and row count
                            <>
                              <button
                                {...{
                                  onClick: row.getToggleExpandedHandler(),
                                  style: {
                                    cursor: row.getCanExpand()
                                      ? "pointer"
                                      : "normal",
                                  },
                                }}
                              >
                                {row.getIsExpanded() ? "👇" : "👉"}{" "}
                                {flexRender(
                                  cell.column.columnDef.cell,
                                  cell.getContext()
                                )}{" "}
                                ({row.subRows.length})
                              </button>
                            </>
                          ) : cell.getIsAggregated() ? (
                            // If the cell is aggregated, use the Aggregated
                            // renderer for cell
                            flexRender(
                              cell.column.columnDef.aggregatedCell ??
                                cell.column.columnDef.cell,
                              cell.getContext()
                            )
                          ) : cell.getIsPlaceholder() ? null : (
                            flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )
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

export default CM_2A;
