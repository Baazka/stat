import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Title from "../Title";
import { excel } from "../../assets/zurag";
import "../../pages/Home.css";
import Comment from "../comment";
import FooterValue from "../Footervalue";
import dateFormat, { masks } from "dateformat";
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

// async function Test() {
// var Excel = require("xlsx");
//   const workbook = new Excel.Workbook();
//   const worksheet = workbook.addWorksheet("My Sheet");

//   worksheet.columns = [
//     { header: "Id", key: "id", width: 10 },
//     { header: "Name", key: "name", width: 32 },
//     { header: "D.O.B.", key: "dob", width: 15 },
//   ];

//   worksheet.addRow({ id: 1, name: "John Doe", dob: new Date(1970, 1, 1) });
//   worksheet.addRow({ id: 2, name: "Jane Doe", dob: new Date(1965, 1, 7) });
//   await workbook.xlsx.writeFile("export.xlsx");

//   const newWorkbook = new Excel.Workbook();
//   await newWorkbook.xlsx.readFile("export.xlsx");

//   const newworksheet = newWorkbook.getWorksheet("My Sheet");

//   newworksheet.columns = [
//     { header: "Id", key: "id", width: 10 },
//     { header: "Name", key: "name", width: 32 },
//     { header: "D.O.B.", key: "dob", width: 15 },
//   ];

//   await newworksheet.addRow({
//     id: 3,
//     name: "New Guy",
//     dob: new Date(2000, 1, 1),
//   });

//   await newWorkbook.xlsx.writeFile("export2.xlsx");

//   console.log("File is written");
// }

// Test();

type Stat_m13 = {
  TORIIN_AUDIT_BAI: string;
  ZOHION_BAI_BUTETS_NEGJ_NR: string;
  SURGALTIIN_ORCHIN: string;
  SURGALTIIN_ANGILAL: string;
  SURGALTIIN_CHIGLEL: string;
  SURGALTIIN_NER: string;
  SURGALT_EHLSEN_OGNOO: string;
  SURGALT_DUUSSAN_OGNOO: string;
  SURGALTIIN_NIIT_TSAG: string;
  HARAGDSAN_ALBAN_HAGCHIIN_TOO: string;
  BOLOWSROLIIN_TUWSHIN: string;
};

function Mayagt_13() {
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [globalFilter, setGlobalFilter] = React.useState("");
  const columns = React.useMemo<ColumnDef<Stat_m13, any>[]>(
    () => [
      {
        accessorFn: (row, index) => index + 1,
        id: "№",
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
        accessorKey: "SURGALTIIN_ORCHIN",
        header: "Сургалтын орчин",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "SURGALTIIN_ANGILAL",
        header: "Сургалтын ангилал",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "SURGALTIIN_CHIGLEL",
        header: "Сургалтын чиглэл",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "SURGALTIIN_NER",
        header: "Сургалтын нэр",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "SURGALT_EHLSEN_OGNOO",
        header: "Сургалт эхэлсэн огноо",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "SURGALT_DUUSSAN_OGNOO",
        header: "Сургалт дууссан огноо",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "SURGALTIIN_NIIT_TSAG",
        header: "Сургалтын нийц цаг /минут/",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "HARAGDSAN_ALBAN_HAGCHIIN_TOO",
        header: "Хамрагдсан албан хаагчийн тоо",
        cell: (info) => info.getValue(),
      },
    ],
    []
  );
  let Stat_m13 = [{}];
  const [data, setData] = React.useState<Stat_m13[]>(Stat_m13);
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
            {/* <option
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
            </option> */}
          </select>
        ) : cell.id === "SURGALTIIN_ORCHIN" ? (
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
              key={"ҮАГ-аас зохион байгуулсан сургалт"}
              value={1}
            >
              {"ҮАГ-аас зохион байгуулсан сургалт"}
            </option>
            <option className="font-medium" key={"Гадаадын сургалт"} value={2}>
              {"Гадаадын сургалт"}
            </option>
            <option
              className="font-medium"
              key={"Бусад байгуулагаас зохион байгуулсан сургалт"}
              value={3}
            >
              {"Бусад байгуулагаас зохион байгуулсан сургалт"}
            </option> */}
          </select>
        ) : cell.id === "SURGALTIIN_ANGILAL" ? (
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
              key={
                "1. Байгууллагын цахим Сургалтыэ системээр зохион байгуулагдсан "
              }
              value={1}
            >
              {
                "1. Байгууллагын цахим Сургалтыэ системээр зохион байгуулагдсан "
              }
            </option>
            <option
              className="font-medium"
              key={"2. Танхимын сургалт"}
              value={2}
            >
              {"2. Танхимын сургалт"}
            </option>
            <option className="font-medium" key={"3. Онлайн сургалт"} value={3}>
              {"3. Онлайн сургалт"}
            </option>
            <option
              className="font-medium"
              key={"4. Хосолсон сургалт"}
              value={4}
            >
              {"4. Хосолсон сургалт"}
            </option> */}
          </select>
        ) : cell.id === "SURGALTIIN_CHIGLEL" ? (
          <select
            className="border rounded text-sm focus:outline-none py-1 h-8 mr-1 inputRoundedMetting pl-2"
            onChange={(text) => {
              let any = setFilter;
            }}
          >
            <option className="font-medium" key={"Сонгоно уу"} value={0}>
              {"Сонгоно уу"}
            </option>
            <option className="font-medium" key={"Үндсэн"} value={1}>
              {"Үндсэн"}
            </option>
            <option className="font-medium" key={"Хөгжлийн"} value={2}>
              {"Хөгжлийн"}
            </option>
          </select>
        ) : cell.id === "SURGALT_EHLSEN_OGNOO" ||
          cell.id === "SURGALT_DUUSSAN_OGNOO" ? (
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
        ) : cell.id === "ZOHION_BAI_BUTETS_NEGJ_NR" ||
          cell.id === "SURGALTIIN_NER" ||
          cell.id === "SURGALTIIN_NIIT_TSAG" ||
          cell.id === "HARAGDSAN_ALBAN_HAGCHIIN_TOO" ? (
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
        ) : null}
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
          title={
            "ТӨРИЙН АУДИТЫН БАЙГУУЛЛАГЫН СУРГАЛТ, ХӨГЖЛИЙН ҮЙЛ АЖИЛГААНЫ ХЭРЭГЖИЛТ З-ТАББМ-13"
          }
          widthS={"47rem"}
          widthL={"16rem"}
        />
        <div className="flex justify-between mb-2 ">
          <div style={{ height: 28 }} className="flex flex-row  cursor-pointer">
            <ButtonSearch />
          </div>
          <div className="s">
            <button
              onClick={() => test()}
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

export default Mayagt_13;
