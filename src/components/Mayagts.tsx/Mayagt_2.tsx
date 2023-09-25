import React, { useEffect, useState } from "react";
import {
  useNavigate,
  createHashRouter,
  RouterProvider,
} from "react-router-dom";
import Title from "../Title";
import { excel } from "../../assets/zurag";
import "../../pages/Home.css";
import Comment from "../comment";
import FooterValue from "../Footervalue";
import dateFormat from "dateformat";
import ButtonConfirm from "../ButtonConfirm";
import ButtonRequest from "../ButtonRequest";
import ButtonSearch from "../ButtonSearch";
import ButtonSave from "../SaveButton";
import writeXlsxFile from "write-excel-file";
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
import { masks } from "dateformat";

declare module "@tanstack/table-core" {
  interface FilterFns {
    fuzzy: FilterFn<unknown>;
  }
  interface FilterMeta {
    itemRank: RankingInfo;
  }
}
const fuzzyFilter: FilterFn<any> = (
  row: any,
  columnId: any,
  value: any,
  addMeta: any
) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value);

  // Store the itemRank info
  addMeta({
    itemRank,
  });

  // Return if the item should be filtered in/out
  return itemRank.passed;
};

const data = [
  [
    {
      value: "№",
      fontWeight: "bold",
      align: "center",
      backgroundColor: "#aabbcc",
      position: "sticky",
      style: { width: { wpx: 200 } },
    },
    {
      width: "60px",

      value: "배송 무게(Kg)",
      position: "sticky",
      fontWeight: "bold",
      align: "center",

      backgroundColor: "#aabbcc",
    },
    {
      value: "배송비",
      position: "sticky",
      fontWeight: "bold",
      align: "center",

      backgroundColor: "#aabbcc",
    },
    {
      value: "배송 무게(Kg)",
      position: "sticky",
      fontWeight: "bold",
      align: "center",
      wrap: true,

      backgroundColor: "#aabbcc",
    },

    {
      value: "배송비",
      position: "sticky",
      fontWeight: "bold",
      align: "center",

      backgroundColor: "#aabbcc",
    },
  ],
  [
    {
      value: 20,
      width: "60px",
      align: "center",
    },
    {
      value: 6600,
      width: 500,
      align: "center",
    },
    {
      value: 2000,

      align: "center",
    },
    {
      value: 660,
      align: "center",
    },
  ],
];
function Excel() {
  const exportSheet = () => {
    writeXlsxFile(data, {
      headerStyle: {
        backgroundColor: "#aabbcc",
        height: 23,
        fontWeight: "bold",
        position: "sticky",
        fontSize: 13,
        align: "center",
        wrap: true,
      },
      fileName: "sample.xlsx",
    });
  };
  return (
    <div className="App">
      <button
        onClick={exportSheet}
        className="inline-flex items-center rounded ml-2 py-1 h-7"
        style={{
          border: "1px solid #3cb371",
        }}
      >
        <div className="bg-white">
          <img src={excel} width="20px" height="20px" className="mx-1"></img>
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
  );
}
type Stat_m2 = {
  AUDIT_TOROL: string;
  AUDIT_NER_SEDEV: string;
  AUDIT_KOD: string;
  HOSLUULAN_GUITSETGEH_ESEH: string;
  SEDVIIN_UNDESLL: string;
  TOSOW_ZAHIRGCH_ANGILL: string;
  AUDIT_HH_BAI_TOROL: string;
  AUDIT_HH_BAI_NEGJ_NER: string;
  AUDIT_HH_BAI_TOROL_NN: string;
  BAIGUULLGUG_TROL: string;
  SHALGAGDAGCH_BAIGUULLAGIN_NR: string;
  REGISTER: number;
  TOSOW_ZAHIRAGCH_ANGILAL: string;
  BAI_UIL_AJIL_UNDSEN_CHIGLL: string;
};
function Mayagt_2() {
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );

  const [globalFilter, setGlobalFilter] = React.useState("");

  const columns = React.useMemo<ColumnDef<Stat_m2, any>[]>(
    () => [
      {
        accessorFn: (row, index) => index + 1,
        id: "№",
      },
      {
        accessorKey: "AUDIT_TOROL",
        cell: (info) => info.getValue(),
        header: () => "Аудитын төрөл",
      },
      {
        accessorKey: "AUDIT_NER_SEDEV",
        header: () => "Аудитын нэр, сэдэв",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "AUDIT_KOD",
        header: () => "Аудитын код",
        cell: (info) => info.getValue(),
        footer: (info) => info.column.id,
      },
      {
        accessorKey: "HOSLUULAN_GUITSETGEH_ESEH",
        header: () => "Хослуулан гүйцэтгэсэн эсэх",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "SEDVIIN_UNDESLL",
        header: "Сэдвийн үндэслэл",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "AUDIT_HH_HELBER",
        header: "Аудит хийх хэлбэр",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "AUDIT_HH_BAI_TOROL",
        header: "Аудит хийх байгууллагын төрөл",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "AUDIT_HH_NEGJ_NER",
        header: "Аудит хийх нэгжийн нэр",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "AUDIT_HH_BAI_TOROL_NN",
        header: "Аудит хийх байгууллага, нэгжийн нэр",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "BAIGUULLGUG_TROL",
        header: () => "Байгууллагын төрөл",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "SHALGAGDAGCH_BAIGUULLAGIN_NR",
        header: () => "Шалгагдагч байгууллагын нэр",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "REGISTER",
        header: "Регистрийн дугаар",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "TOSOW_ZAHIRAGCH_ANGILAL",
        header: "Төсөв захирагчийн ангилал",
        cell: (info) => info.getValue(),
      },

      {
        accessorKey: "BAI_UIL_AJIL_UNDSEN_CHIGLL",
        header: "Салбарын харьяалал",
        cell: (info) => info.getValue(),
      },
    ],
    []
  );

  let Stat_m2 = [{}];
  const [data, setData] = React.useState<Stat_m2[]>(Stat_m2);
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
          padding: "0.5rem 0 0 1rem",
        }}
      >
        <Title
          title={
            "ТАЙЛАНТ ОНЫ ШАЛГАГДАГЧ ЭТГЭЭД БОЛОН АУДИТАД ХАМРАГДАГЧИЙИН БҮРТГЭЛ З-ТАББМ-2"
          }
          widthS={"39rem"}
          widthL={"20rem"}
        />
        <div className="flex justify-between mb-2 ">
          <div style={{ height: 28 }} className="flex flex-row  cursor-pointer">
            <ButtonSearch />
            <Excel />
          </div>
          <div className="flex">
            <ButtonRequest />
            <ButtonConfirm />
          </div>
        </div>
        <div style={{ maxHeight: "630px", overflowY: "scroll" }}>
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
                        style={{ width: 250 }}
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
        <div style={{ display: "flex", justifyContent: "end" }}>
          <ButtonSave />
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
                {table.getState().pagination.pageIndex + 1}{" "}
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
export default Mayagt_2;
