import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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


type Stat_m15 = {
  AUDIT_TOROL: string;
  MEDEELLIIN_TOROL: string;
  TORIIN_AUDIT_BAI: string;
  ZOHION_BAI_BUTETS_NEGJ_NR: string;
  AUDIT_KOD: string;
  TAILANGIIN_HUUDASNI_TOO: string;
  HEVELSEN_TOO: string;
  TSAHIMAAR_MEDEELSEN_ESEH: string;
};

function Mayagt_15(mayagtData,userDetails) {
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [globalFilter, setGlobalFilter] = React.useState("");
  const columns = React.useMemo<ColumnDef<Stat_m15, any>[]>(
    () => [
      {
        accessorFn: (row, index) => index + 1,
        id: "№",
      },
      {
        accessorKey: "AUDIT_TOROL",
        cell: (info) => info.getValue(),
        header: "Аудитын төрөл",
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "MEDEELLIIN_TOROL",
        cell: (info) => info.getValue(),
        header: "Мэдээллийн төрөл",
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "TORIIN_AUDIT_BAI",
        cell: (info) => info.getValue(),
        header: "Төрийн аудитын байгууллага",
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "ZOHION_BAI_BUTETS_NEGJ_NR",
        header: "Зохион байгуулалтын бүтцийн нэгжийн нэр",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "SHALGAGDAGCH_BAI_NER",
        header: "Шалгагдагч байгууллагын нэр",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "AUDIT_KOD",
        header: "Аудитын код",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "TAILANGIIN_HUUDASNI_TOO",
        header: "Тайлангийн хуудасны тоо",
        cell: (info) => info.getValue(),
        columns: [
          {
            accessorKey: "HURAANGUI1",
            header: "Хураангуй",
          },
          {
            accessorKey: "DELGERENGUI1",
            header: "Дэлгэрэнгүй",
          },
          {
            accessorKey: "VIZUAL1",
            header: "Визуал",
          },
        ],
      },
      {
        accessorKey: "HEVELSEN_TOO",
        header: "Хэвлэсэн тоо",
        cell: (info) => info.getValue(),
        columns: [
          {
            accessorKey: "HURAANGUI2",
            header: "Хураангуй",
          },
          {
            accessorKey: "DELGERENGUI2",
            header: "Дэлгэрэнгүй",
          },
          {
            accessorKey: "VIZUAL2",
            header: "Визуал",
          },
        ],
      },
      {
        accessorKey: "TSAHIMAAR_MEDEELSEN_ESEH",
        header: "Цахимаар мэдээлсэн эсэх",
        cell: (info) => info.getValue(),
        columns: [
          {
            accessorKey: "HURAANGUI3",
            header: "Хураангуй",
          },
          {
            accessorKey: "DELGERENGUI3",
            header: "Дэлгэрэнгүй",
          },
          {
            accessorKey: "VIZUAL3",
            header: "Визуал",
          },
        ],
      },
    ],
    []
  );
  let Stat_m15 = [{}];
  const [data, setData] = React.useState<Stat_m15[]>(Stat_m15);
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
    debugTable: false,
    debugHeaders: false,
    debugColumns: false,
  });

  function Draw_input(param: any, cell: any, index: number) {
    return (
      <div>
        {cell.id === "TORIIN_AUDIT_BAI" ? (
          <select
            className="border rounded text-sm focus:outline-none py-1 h-8 mr-1 inputRoundedMetting pl-2"
            onChange={(text) => {
              let any = setFilter;
            }}
          >
            <option className="font-medium" key={"Сонгоно уу"} value={0}>
              {"Сонгоно уу"}
            </option>
            <option
              className="font-medium"
              key={"Үндэсний аудитын газар"}
              value={1}
            >
              {"Үндэсний аудитын газар"}
            </option>
            <option className="font-medium" key={"Нийслэл дэх ТАГ"} value={2}>
              {"Нийслэл дэх ТАГ"}
            </option>
            <option
              className="font-medium"
              key={"Архангай аймаг дахь ТАГ"}
              value={3}
            >
              {"Архангай аймаг дахь ТАГ"}
            </option>
            <option
              className="font-medium"
              key={"Баян-Өлгий аймаг дахь ТАГ"}
              value={4}
            >
              {"Баян-Өлгий аймаг дахь ТАГ"}
            </option>
            <option
              className="font-medium"
              key={"Баянхонгор аймаг дахь ТАГ"}
              value={5}
            >
              {"Баянхонгор аймаг дахь ТАГ"}
            </option>
            <option
              className="font-medium"
              key={"Булган аймаг дахь ТАГ"}
              value={6}
            >
              {"Булган аймаг дахь ТАГ"}
            </option>
            <option
              className="font-medium"
              key={"Говь-алтай аймаг дахь ТАГ"}
              value={7}
            >
              {"Говь-алтай аймаг дахь ТАГ"}
            </option>
            <option
              className="font-medium"
              key={"Говьсүмбэр аймаг дахь ТАГ"}
              value={8}
            >
              {"Говьсүмбэр аймаг дахь ТАГ"}
            </option>
            <option
              className="font-medium"
              key={"Дархан-Уул аймаг дахь ТАГ"}
              value={9}
            >
              {"Дархан-Уул аймаг дахь ТАГ"}
            </option>
            <option
              className="font-medium"
              key={"Дорноговь аймаг дахь ТАГ"}
              value={10}
            >
              {"Дорноговь аймаг дахь ТАГ"}
            </option>
            <option
              className="font-medium"
              key={"Дундговь аймаг дахь ТАГ"}
              value={11}
            >
              {"Дундговь аймаг дахь ТАГ"}
            </option>
            <option
              className="font-medium"
              key={"Дорнод аймаг дахь ТАГ"}
              value={12}
            >
              {"Дорнод аймаг дахь ТАГ"}
            </option>
            <option
              className="font-medium"
              key={"Завхан аймаг дахь ТАГ"}
              value={13}
            >
              {"Завхан аймаг дахь ТАГ"}
            </option>
            <option
              className="font-medium"
              key={"Орхон аймаг дахь ТАГ"}
              value={14}
            >
              {"Орхон аймаг дахь ТАГ"}
            </option>
            <option
              className="font-medium"
              key={"Өвөрхангай аймаг дахь ТАГ"}
              value={15}
            >
              {"Өвөрхангай аймаг дахь ТАГ"}
            </option>
            <option
              className="font-medium"
              key={"Өмнөговь аймаг дахь ТАГ"}
              value={16}
            >
              {"Өмнөговь аймаг дахь ТАГ"}
            </option>
            <option
              className="font-medium"
              key={"Сүхбаатар аймаг дахь ТАГ"}
              value={17}
            >
              {"Сүхбаатар аймаг дахь ТАГ"}
            </option>
            <option
              className="font-medium"
              key={"Сэлэнгэ аймаг дахь ТАГ"}
              value={18}
            >
              {"Сэлэнгэ аймаг дахь ТАГ"}
            </option>
            <option
              className="font-medium"
              key={"Төв аймаг дахь ТАГ"}
              value={19}
            >
              {"Төв аймаг дахь ТАГ"}
            </option>
          </select>
        ) : cell.id === "AUDIT_TOROL" ? (
          <select
            className="border rounded text-sm focus:outline-none py-1 h-8 mr-1 inputRoundedMetting pl-2"
            onChange={(text) => {
              let any = setFilter;
            }}
          >
            <option className="font-medium" key={"Сонгоно уу"} value={0}>
              {"Сонгоно уу"}
            </option>
            {/* <option
              className="font-medium"
              key={"Санхүүгийн тайлангийн аудит"}
              value={1}
            >
              {"Санхүүгийн тайлангийн аудит"}
            </option>
            <option
              className="font-medium"
              key={"Гүйцэтгэлийн аудит"}
              value={2}
            >
              {"Гүйцэтгэлийн аудит"}
            </option>
            <option className="font-medium" key={"Нийцлийн аудит"} value={3}>
              {"Нийцлийн аудит"}
            </option> */}
          </select>
        ) : cell.id === "MEDEELLIIN_TOROL" ? (
          <select
            className="border rounded text-sm focus:outline-none py-1 h-8 mr-1 inputRoundedMetting pl-2"
            onChange={(text) => {
              let any = setFilter;
            }}
          >
            <option className="font-medium" key={"Сонгоно уу"} value={0}>
              {"Сонгоно уу"}
            </option>
            {/* <option className="font-medium" key={"Аудитын тайлан"} value={1}>
              {"Аудитын тайлан"}
            </option>
            <option
              className="font-medium"
              key={"Үйл ажилгааны мэдээлэл"}
              value={2}
            >
              {"Үйл ажилгааны мэдээлэл"}
            </option>
            <option className="font-medium" key={"Бусад"} value={2}>
              {"Бусад"}
            </option> */}
          </select>
        ) : cell.id === "HURAANGUI3" ? (
          <select
            className="border rounded text-sm focus:outline-none py-1 h-8 mr-1 inputRoundedMetting pl-2"
            onChange={(text) => {
              let any = setFilter;
            }}
          >
            <option className="font-medium" key={"Сонгоно уу"} value={0}>
              {"Сонгоно уу"}
            </option>
          </select>
        ) : cell.id === "DELGERENGUI3" ? (
          <select
            className="border rounded text-sm focus:outline-none py-1 h-8 mr-1 inputRoundedMetting pl-2"
            onChange={(text) => {
              let any = setFilter;
            }}
          >
            <option className="font-medium" key={"Сонгоно уу"} value={0}>
              {"Сонгоно уу"}
            </option>
          </select>
        ) : cell.id === "VIZUAL3" ? (
          <select
            className="border rounded text-sm focus:outline-none py-1 h-8 mr-1 inputRoundedMetting pl-2"
            onChange={(text) => {
              let any = setFilter;
            }}
          >
            <option className="font-medium" key={"Сонгоно уу"} value={0}>
              {"Сонгоно уу"}
            </option>
          </select>
        ) : cell.id === "" || cell.id === "" ? (
          <input
            type="date"
            className="border-gray-400 rounded text-sm focus:outline-none py-1 h-8 mr-1 inputRoundedMetting pl-2 font-normal"
            value={dateFormat(param.row.original[cell.id], "yyyy-mm-dd")}
            onChange={(e) => {
              let temp = data;
              //@ts-ignore
              temp[index][cell.id] = dateFormat(e.target.value, "yyyy-mm-dd");
              // @ts-ignore
              setData([...temp]);
            }}
          />
        ) : (
          <textarea
            value={param.row.original[cell.id]}
            className={
              index % 2 > 0
                ? "flex text-center h-8 bg-gray-100"
                : "flex text-center h-8"
            }
            style={{
              minHeight: "33px",
              border: "1px solid",
              borderRadius: "4px",
              color: "gray",
            }}
            onChange={(e) => {
              let temp = data;
              //@ts-ignore
              temp[index][cell.id] = e.target.value;
              // @ts-ignore
              setData([...temp]);
            }}
          />
        )}
      </div>
    );
  }

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
          title={mayagtData.DOCUMENT_NAME + " " + mayagtData.DOCUMENT_SHORT_NAME} 
          widthS={"33rem"}
          widthL={"17rem"}
        />
        <div className="flex justify-between mb-2 ">
          <div style={{ height: 28 }} className="flex flex-row  cursor-pointer">
            <ButtonSearch />
          
          </div>
          <div className="flex">
            <ButtonRequest />
            <ButtonConfirm />
          </div>
        </div>
        <div style={{ overflowY: "scroll" }}>
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
                        style={{ width: 250, borderTop: "1px solid white" }}
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
                        <td key={cell.id} className="p-2 ">
                          {index === 0
                            ? flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                              )
                            : Draw_input(cell.getContext(), cell.column, i)}
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
export default Mayagt_15;
