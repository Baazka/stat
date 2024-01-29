import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Title from "../Title";
import "../../pages/Home.css";
import Subtitle from "../Subtitle";
import FooterValue from "../Footervalue";
import Comment from "../comment";
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
  getSortedRowModel,
  FilterFn,
  ColumnDef,
  flexRender,
} from "@tanstack/react-table";

import { RankingInfo, rankItem } from "@tanstack/match-sorter-utils";
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
type Stat_CM1A = {
  UZUULELT: string;
  MD: string;
  EMPLOYEE: string;
  A_DATE: string;
  A_TIME: string;
  TOLOWLOSON: string;
  BIE_DAAJ_DUGNELT_GARGH: string;
  UE_SHATNII_AJLIIG_HESEGCHLEN_HIIH1: string;
  AUDIT_HIIGGUI: string;
  NIIT_AUDIT_SANAL_DUGNELT: string;
  ZORCHILGUI_AUDIT_SANAL_DUGNELT: string;
  BAI_NER: string;
  SANAL_DUGNELT_OGHOOS_TATGALZAH: string;
  SOROG_AUDIT_SANAL_DUGNELT: string;
  TOLOWLOSON_UR_OGOOJIIN_SANHUUGN_DUN_T: string;
  SANHUUGIIN_BUS_UR_OGOOJN_TOO: string;
  HULEEN_ZOWSHOORUULSEN_UR_OGOOJ: string;
  HULEEN_ZOWSHOORUULSEN_UR_OGOOJ_SANHUUGN_DUN: string;
  SANHUUGIIN_BUS_UR_OGOOJIIN_TOO: string;
};

function CM_1A(props) {
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [globalFilter, setGlobalFilter] = React.useState("");
  const columns = React.useMemo<ColumnDef<Stat_CM1A, any>[]>(
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
      },
      {
        accessorKey: "MD",
        cell: (info) => info.getValue(),
        header: "МД",
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "EMPLOYEE",
        cell: (info) => info.getValue(),
        header: "Ажилласан хүн",
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "A_DATE",
        cell: (info) => info.getValue(),
        header: "Ажилласан өдөр",
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "A_TIME",
        cell: (info) => info.getValue(),
        header: "Ажилласан илүү цаг",
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "TOLOWLOSON",
        cell: (info) => info.getValue(),
        header: "Төлөвлөсөн-бүгд",
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "BIE_DAAJ_DUGNELT_GARGH",
        header: "Бие дааж дүгнэлт гаргах",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "UE_SHATNII_AJLIIG_HESEGCHLEN_HIIH",
        header: "Үе шатны ажлыг хэсэгчлэн хийх",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "GUITSETGESEN",
        header: "Гүйцэтгэсэн-бүгд",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "BIE_DAAJ_DUGNELT_GARGAH",
        header: "Бие дааж дүгнэлт гаргасан",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "UE_SHATNII_AJLIIG_HESEGCHLEN_HIIH1",
        header: "Үе шатны ажлыг хэсэгчлэн хийсэн",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "AUDIT_HIIGGUI",
        header: "Аудит хийгээгүй",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "NIIT_AUDIT_SANAL_DUGNELT",
        header: "Нийт аудитын санал дүгнэлт",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "ZORCHILGUI_AUDIT_SANAL_DUGNELT",
        header: "Зөрчилгүй",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "BAI_NER",
        header: "Хягаарлалттай ",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "SANAL_DUGNELT_OGHOOS_TATGALZAH",
        header: "Санал дүгнэлт өгөхөөс татгалзсан",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "SOROG_AUDIT_SANAL_DUGNELT",
        header: "Сөрөг",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "TOLOWLOSON_UR_OGOOJIIN_SANHUUGN_DUN_T",
        header: "Төлөвлөсөн санхүүгийн үр өгөөжийн тоо",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "TOLOWLOSON_UR_OGOOJIIN_SANHUUGN_DUN_T",
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
          "Хүлээн зөвшөөрүүлсэн санхүүгийн үр өгөөжийн дүн/сая төгрөгөөр/",
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
  let Stat_CM1A = [
    {
      UZUULELT: "Нийт дүн мөр(1)=мөр(2+3+4+5+6+7+8)",
      MD: "1",
    },
    {
      UZUULELT: "ЗГСНТ, НТГ",
      MD: "2",
    },
    {
      UZUULELT: "ТЕЗ",
      MD: "3",
    },
    {
      UZUULELT: "ТТЗ",
      MD: "4",
    },
    {
      UZUULELT: "ТШЗ",
      MD: "5",
    },
    {
      UZUULELT: "Төсөл, хөтөлбөр",
      MD: "6",
    },
    {
      UZUULELT: "Засгийн газрын тусгай сан",
      MD: "7",
    },
    {
      UZUULELT: "ТБОҮНӨҮГ",
      MD: "8",
    },
    {
      UZUULELT: "Төрийн аудитын байгууллага мөр(9)=мөр(10+11+12+13+14+15+16)",
      MD: "9",
    },
    {
      UZUULELT: "ЗГСНТ, НТГ",
      MD: "10",
    },
    {
      UZUULELT: "ТЕЗ",
      MD: "11",
    },
    {
      UZUULELT: "ТТЗ",
      MD: "12",
    },
    {
      UZUULELT: "ТШЗ",
      MD: "13",
    },
    {
      UZUULELT: "Төсөл, хөтөлбөр",
      MD: "14",
    },
    {
      UZUULELT: "Засгийн газрын тусгай сан",
      MD: "15",
    },
    {
      UZUULELT: "ТБОНӨҮГ",
      MD: "16",
    },
    {
      UZUULELT: "Аудитын хуулийн этгээд мөр(17)=мөр(18+19)",
      MD: "17",
    },
    {
      UZUULELT: "ТШЗ",
      MD: "18",
    },
    {
      UZUULELT: "ТБОНӨҮГ",
      MD: "19",
    },
  ];
  const [data, setData] = React.useState<Stat_CM1A[]>(Stat_CM1A);
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
  return (
    <>
      <div className="flex justify-between mb-2 ">
        <div style={{ height: 28 }} className="flex flex-row  cursor-pointer">
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
      <div>
        <div className="text-base flex row">
          <FooterValue />
        </div>
      </div>

      <div className="flex flex-col p-5 pl-0" style={{ width: "100%" }}>
        <div className="flex  items-end">
          <Comment />
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

export default CM_1A;
