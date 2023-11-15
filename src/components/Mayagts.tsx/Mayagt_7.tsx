import React, { useEffect, useState } from "react";
import Title from "../Title";
import "../../pages/Home.css";
import Comment from "../comment";
import FooterValue from "../Footervalue";
import ButtonConfirm from "../ButtonConfirm";
import ButtonRequest from "../ButtonRequest";
import Stat_Url from "../../Stat_URL";
import ButtonSearch from "../ButtonSearch";
import ButtonSave from "../SaveButton";
import { excel } from "../../assets/zurag";
import CurrencyInput from "react-currency-input-field";
import { getExportFileBlob } from "../../functions/excel_export";
import dateFormat from "dateformat";
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
import DataRequest from "../../functions/make_Request";
import { RankingInfo, rankItem } from "@tanstack/match-sorter-utils";
import { read, writeFileXLSX, utils } from "xlsx";

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

function Mayagt_1(props: any) {
  const mayagtData = props.mayagtData;
  const userDetails = props.userDetails;
  const [saveData, setSaveData] = useState(new Set());
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
        size: 15,
      },
      {
        accessorKey: "AUDIT_ON",
        cell: (info) => info.getValue(),
        header: "Аудитын он",
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "AUDIT_TYPE_NAME",
        header: "Аудитын төрөл",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "AUDIT_NAME",
        header: "Аудитын нэр, сэдэв",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "AUDIT_CODE",
        header: "Аудитын код",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "AKT_DATE",
        header: "Төлбөрийн актын огноо",
        accessorFn: (row, index) => {
          return row.AKT_DATE === null
            ? ""
            : dateFormat(row.AKT_DATE, "yyyy-mm-dd");
        },
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "AKT_NO",
        header: "Төлбөрийн актын дугаар",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "HULEENGEN_OGSON_OGNOO",
        header: "Хүлээлгэн өгсөн огноо",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "TOLBORIIG_BARAGDUULH_OGNOO",
        header: "Төлбөрийг барагдуулах огноо",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "IS_ERROR_CONFLICT_NAME",
        header: "Тухайн үр дүнг алдаа зөрчилд тооцох эсэх",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "TOWCH_UTGA",
        header: "Товч утга",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "ZORCHIL_ANGILL",
        header: "Алдаа, зөрчлийн ангилал",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "TOLBORIIN_AKTIIN_TOGROG",
        header: "Төлбөрийн актын дүн (төгрөг)",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "TOWLORRULEH_DANSNI_TOROL_TOGROG",
        header: "Төвлөрүүлэх дансны төрөл (төгрөг)",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "ENT_NAME",
        header: "Шалгагдагч байгууллагын нэр",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "ORG_REGISTER_NO",
        header: "Регистрийн дугаар",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "BUDGET_SHORT_NAME",
        header: "Төсөв захирагчийн ангилал",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "AUDITOR_NAME",
        header: "Биелэлтийг хянасан аудитор",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "AUDITR_CODE",
        header: "Аудиторын код",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "TOLBORIIN_BARIMT_OGNOO",
        header: "Төлбөрийн баримтын огноо",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "BIELSEN_TOLBORIIN_AKTIN_DUN_T",
        header: "Биелсэн төлбөрийн актын дүн (төгрөг)",
        cell: (info) => info.getValue(),
      },

      {
        accessorKey: "BURTGELEES_HASAGDSN_DUN_T",
        header: "Бүртгэлээс хасагдсан дүн (төгрөг)",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "BURTGELEES_HASAGDSN_OGNOO",
        header: "Бүртгэлээс хасагдсан огноо",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "BURTGELEES_HASAGDSAN_DG",
        header: "Бүртгэлээс хасагдсан дугаар",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "HUGATSAANII_TOLOW",
        header: "Хугацааны төлөв",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "ERH_BUHII_BAIGUULLGD_SHILJUULH_ESEH",
        header: "Эрх бүхий байгууллагад шилжүүлсэн эсэх",
        cell: (info) => info.getValue(),
      },

      {
        accessorKey: "UR_UGUUJ_TYPE_NAME",
        header: "Үр өгөөжийн төрөл",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "UR_UGUUJ_NAME",
        header: "Үр өгөөжөөр тооцсон эсэх",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "TUL_AMOUNT",
        header: "Төлөвлөсөн санхүүгийн үр өгөөжийн дүн (төгрөг)",
        accessorFn: (row, index) => (
          <div>
            <CurrencyInput
              id="input-example"
              defaultValue={row.TUL_AMOUNT}
              decimalsLimit={2}
              disabled
              style={{ textAlign: "center", backgroundColor: "transparent" }}
            />
          </div>
        ),
        cell: (info) => info.getValue(),
      },

      {
        accessorKey: "TOD_AMOUNT",
        header: "Тодорхойлсон санхүүгийн үр өгөөжийн дүн (төгрөг)",
        accessorFn: (row, index) => (
          <div>
            <CurrencyInput
              id="input-example"
              defaultValue={row.TOD_AMOUNT}
              decimalsLimit={2}
              disabled
              style={{ textAlign: "center", backgroundColor: "transparent" }}
            />
          </div>
        ),
        cell: (info) => info.getValue(),
      },
    ],
    []
  );

  const [data, loadData] = React.useState([]);

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

  function Draw_input(param: any, cell: any, index: number, cell_all: any) {
    return (
      <div>
        <div>
          {cell.id === "ERH_BUHII_BAIGUULLGD_SHILJUULH_ESEH" ? (
            <select
              className="border rounded text-sm focus:outline-none py-1 h-8 mr-1 inputRoundedMetting pl-2"
              value={param.row.original[cell.id]}
              onChange={(text) => {
                let temp = data;
                temp[index][cell.id] = text.target.value;
                let tset = saveData;
                tset.add(index);
                setSaveData(tset);
                loadData([...temp]);
              }}
            >
              <option className="font-medium" key={"Сонгоно уу"} value={0}>
                {"Сонгоно уу"}
              </option>
            </select>
          ) : cell.id === "HUGATSAANII_TOLOW" ? (
            <input
              type="date"
              className="border-gray-400 rounded text-sm focus:outline-none py-1 h-8 mr-1 inputRoundedMetting pl-2 font-normal"
              value={dateFormat(param.row.original[cell.id], "yyyy-mm-dd")}
              onChange={(e) => {
                let temp = data;
                //@ts-ignore
                temp[index][cell.id] = dateFormat(e.target.value, "yyyy-mm-dd");

                let tset = saveData;
                tset.add(index);
                setSaveData(tset);
                // @ts-ignore
                loadData([...temp]);
              }}
            />
          ) : (
            flexRender(cell_all.column.columnDef.cell, cell_all.getContext())
          )}
        </div>
      </div>
    );
  }

  useEffect(() => {
    fetchData();
  }, [props.mayagtData]);

  async function fetchData() {
    DataRequest({
      url: Stat_Url + "BM7List",
      method: "POST",
      data: {
        ID: mayagtData.ID,
        PERIOD_LABEL: mayagtData.PERIOD_YEAR, //PERIOD_LABEL
        DEPARTMENT_ID: mayagtData.DEPARTMENT_ID,
      },
    })
      .then(function (response) {
        if (response.data !== undefined && response.data.data.length > 0) {
          loadData(response.data.data);
        }
      })
      .catch(function (error) {
        console.log(error, "error");
        alert("Aмжилтгүй");
      });
  }
  function saveToDB() {
    let temp = [];
    //  console.log(saveData,'saveData');
    for (let i of saveData) {
      temp.push(data[i]);
    }
    console.log(temp, "save data");
    DataRequest({
      url: Stat_Url + "BM7IU",
      method: "POST",
      data: {
        // STAT_ID : mayagtData.ID,
        data: data,
        log: data,
        CREATED_BY: userDetails.USER_ID,
      },
    })
      .then(function (response) {
        console.log(response.data);
        if (response?.data.message === "Хадгаллаа.") {
          alert("амжилттай хадгаллаа");
        }
      })
      .catch(function (error) {
        console.log(error, "error");
        alert("Aмжилтгүй");
      });
  }

  return (
    <>
      <div
        style={{
          maxHeight: window.innerHeight - 129,
          padding: "0.5rem 0 0 1rem",
        }}
      >
        <Title
          title={
            mayagtData.DOCUMENT_NAME + " " + mayagtData.DOCUMENT_SHORT_NAME
          }
          widthS={"28rem"}
          widthL={"10rem"}
        />
        <div className="flex justify-between mb-2 ">
          <div style={{ height: 28 }} className="flex flex-row  cursor-pointer">
            <ButtonSearch
              globalFilter={globalFilter}
              setGlobalFilter={(value) => setGlobalFilter(value)}
            />
            <button
              onClick={() => {
                getExportFileBlob(columns, data, "З-ТАББМ-7");
              }}
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
            {/* <ButtonConfirm /> */}
          </div>
        </div>
        <div style={{ maxHeight: "630px", overflowY: "scroll" }}>
          <div className="h-2 mr-20" />
          <table
            {...{
              style: {
                width: table.getCenterTotalSize(),
              },
            }}
          >
            <thead className="TableHeadBackroundcolor">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <th
                        {...{
                          key: header.id,
                          colSpan: header.colSpan,
                          style: {
                            width: header.getSize(),
                          },
                        }}
                      >
                        {header.isPlaceholder ? null : (
                          <>
                            <div
                              {...{
                                onMouseDown: header.getResizeHandler(),
                                onTouchStart: header.getResizeHandler(),
                                className: `resizer ${
                                  header.column.getIsResizing()
                                    ? "isResizing"
                                    : ""
                                }`,
                              }}
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
                        <td
                          {...{
                            key: cell.id,
                            style: {
                              width: cell.column.getSize(),
                            },
                          }}
                          className="p-2 "
                        >
                          {index === 0
                            ? flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                              )
                            : Draw_input(
                                cell.getContext(),
                                cell.column,
                                i,
                                cell
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
          <ButtonSave saveToDB={() => saveToDB()} />
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

export default Mayagt_1;
