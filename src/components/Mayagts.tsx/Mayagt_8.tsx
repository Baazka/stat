import React, { useEffect, useState } from "react";
import Title from "../Title";
import "../../pages/Home.css";
import Comment from "../comment";
import FooterValue from "../Footervalue";
import ButtonConfirm from "../ButtonConfirm";
import ButtonRequest from "../ButtonRequest";
import { check_save } from "../../functions/Tools";
import Stat_Url from "../../Stat_URL";
import ButtonSearch from "../ButtonSearch";
import { RevolvingDot } from "react-loader-spinner";
import ButtonSave from "../SaveButton";
import { excel } from "../../assets/zurag";
import CurrencyInput from "react-currency-input-field";
import { getExportFileBlob } from "../../functions/excel_export";
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
import DocInfo from "../DocInfo";

declare module "@tanstack/react-table" {
  interface TableMeta<TData extends RowData> {
    updateData: (rowIndex: number, columnId: string, value: unknown) => void;
  }
}
let Data = {};
// Give our default column cell renderer editing superpowers!
const defaultColumn: Partial<ColumnDef<Data>> = {
  cell: function Cell({ getValue, row: { index }, column: { id }, table }) {
    const initialValue = getValue();
    // We need to keep and update the state of the cell normally
    const [value, setValue] = React.useState(initialValue);

    // When the input is blurred, we'll call our table meta's updateData function
    const onBlur = () => {
      table.options.meta?.updateData(index, id, value);
    };

    // If the initialValue is changed external, sync it up with our state
    React.useEffect(() => {
      setValue(initialValue);
    }, [initialValue]);

    if (id === "IS_TRANSFER") {
      return (
        <select
          className="border rounded text-sm focus:outline-none py-1 h-8 mr-1 inputRoundedMetting pl-2"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onBlur={onBlur}
        >
          <option
            key={id + "0"}
            className="font-medium"
            key={"Сонгоно уу"}
            value={999}
          >
            {"Сонгоно уу"}
          </option>
          <option key={id + "1"} className="font-medium" key={"Тийм"} value={1}>
            {"Тийм"}
          </option>
          <option
            key={id + "21"}
            className="font-medium"
            key={"Үгүй"}
            value={0}
          >
            {"Үгүй"}
          </option>
        </select>
      );
    } else if (
      id === "TRANSFER_AMOUNT" ||
      id === "LAW_FULL_AMOUNT" ||
      id === "LAW_UNDER_AMOUNT" ||
      id === "LAW_REJECTED_AMOUNT"
    ) {
      return (
        <CurrencyInput
          id="input-example"
          defaultValue={value}
          decimalsLimit={2}
          decimalScale={2}
          onChange={(e) => setValue(e.target.value)}
          onBlur={onBlur}
          style={{
            backgroundColor: "transparent",
            textAlign: "right",
            border: "1px solid black",
          }}
        />
      );
    } else if (
      id === "TRANSFER_DESC" ||
      id === "WORK_DAY" ||
      id === "WORK_TIME" ||
      id === "WORK_TIME"
    ) {
      return (
        <textarea
          className={index % 2 > 0 ? "flex  h-8 bg-gray-100" : "flex  h-8"}
          style={{
            minHeight: "33px",
            border: "1px solid",
            borderRadius: "4px",
            color: "gray",
          }}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onBlur={onBlur}
        />
      );
    }
  },
};

function useSkipper() {
  const shouldSkipRef = React.useRef(true);
  const shouldSkip = shouldSkipRef.current;

  // Wrap a function with this to skip a pagination reset temporarily
  const skip = React.useCallback(() => {
    shouldSkipRef.current = false;
  }, []);

  React.useEffect(() => {
    shouldSkipRef.current = true;
  });

  return [shouldSkip, skip] as const;
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

declare module "@tanstack/react-table" {
  interface TableMeta<TData extends RowData> {
    updateData: (rowIndex: number, columnId: string, value: unknown) => void;
  }
}
function Mayagt_8(props: any) {
  const mayagtData = props.mayagtData;
  const userDetails = props.userDetails;
  const [saveData, setSaveData] = useState(new Set());
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [loaderSpinner, setloaderSpinner] = useState(0);
  const [autoResetPageIndex, skipAutoResetPageIndex] = useSkipper();
  const [globalFilter, setGlobalFilter] = React.useState("");
  const [status, setStatus] = useState({ STATUS: {}, ROLE: {} });
  const [batlakhHuselt, setBatlakhHuselt] = useState({
    AUDIT_ID: mayagtData.ID,
    DOCUMENT_ID: mayagtData.Document_ID,
    REQUEST_TYPE: 1,
    LEVEL_ID: props.STATUS,
    MODULE_ID: 6,
    DESCRIPTION: "",
    CREATED_BY: userDetails.USER_ID,
  });
  const columns = React.useMemo(
    () => [
      {
        accessorFn: (row, index) => index + 1,
        accessorKey: "№",
        header: "№",
        size: 15,
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "YEAR_LABEL",
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
        accessorKey: "IS_ERROR_CONFLICT_NAME",
        header: "Тухайн үр дүнг алдаа зөрчилд тооцох эсэх",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "ALD_SHORT_DESC",
        header: "Товч утга",
        cell: (info) => info.getValue(),
        size: 800,
      },
      {
        accessorKey: "SOLUTION_ERROR_NAME",
        header: "Алдаа, зөрчлийн ангилал",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "AMOUNT",
        header: "Хууль хяналтын байгууллагад шилжүүлэх асуудлын дүн (төгрөг)",
        accessorFn: (row, index) => (
          <div>
            <CurrencyInput
              id="input-example"
              defaultValue={row.AMOUNT}
              decimalsLimit={2}
              decimalScale={2}
              disabled
              style={{ textAlign: "center", backgroundColor: "transparent" }}
            />
          </div>
        ),
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "IS_TRANSFER",
        header: "Хууль хяналтын байгууллагад шилжүүлсэн эсэх",
      },
      {
        accessorKey: "TRANSFER_AMOUNT",
        header: "Хууль хяналтын байгууллагад шилжүүлсэн асуудлын дүн (төгрөг)",
      },
      {
        accessorKey: "TRANSFER_DESC",
        header: "Хууль хяналтын байгууллагад шилжүүлээгүй шалтгаан",
      },

      {
        accessorKey: "TRANSFER_ORG",
        header: "Шилжүүлсэн байгууллагын нэр",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "TRANSFER_DOC_NO",
        header: "Албан бичгийн дугаар",
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
        accessorKey: "FULL_NAME",
        header: "Зөрчил гаргасан албан тушаалтны овог, нэр",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "PERSON_POSITION",
        header: "Зөрчил гаргасан хүний албан тушаал",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "LAW_FULL_AMOUNT",
        header:
          "Хууль хяналтын байгууллагаар бүрэн шийдвэрлэгдсэн дүн (төгрөг)",
      },
      {
        accessorKey: "ss",
        header: "Тайлант хугацааны эхний үлдэгдэл",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "LAW_UNDER_AMOUNT",
        header: "Хууль хяналтын байгууллагаар хянагдаж байгаа дүн (төгрөг)",
      },
      {
        accessorKey: "LAW_REJECTED_AMOUNT",
        header: "Хууль хяналтын байгууллагаар хэрэгсэхгүй болсон дүн (төгрөг)",
      },
    ],
    [status]
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
    defaultColumn,
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
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),

    // getFacetedRowModel: getFacetedRowModel(),
    // getFacetedUniqueValues: getFacetedUniqueValues(),
    // getFacetedMinMaxValues: getFacetedMinMaxValues(),
    autoResetPageIndex,
    meta: {
      updateData: (rowIndex, columnId, value) => {
        // Skip page index reset until after next rerender
        skipAutoResetPageIndex();
        loadData((old) =>
          old.map((row, index) => {
            if (index === rowIndex) {
              return {
                ...old[rowIndex]!,
                [columnId]: value,
                EDITED: true,
              };
            }
            return row;
          })
        );
      },
    },
    debugTable: false,
    debugHeaders: false,
    debugColumns: false,
  });

  function Draw_input(param: any, cell: any, index: number, cell_all: any) {
    return (
      <div>
        {cell.id === "IS_TRANSFER" ? (
          <select
            className="border rounded text-sm focus:outline-none py-1 h-8 mr-1 inputRoundedMetting pl-2"
            value={param.row.original[cell.id]}
            onChange={(text) => {
              let temp = data;
              temp[index][cell.id] = text.target.value;
              let tset = saveData;
              tset.add(index);
              setSaveData(tset);
              loadData(temp);
            }}
          >
            <option
              key={index + "0"}
              className="font-medium"
              key={"Сонгоно уу"}
              value={999}
            >
              {"Сонгоно уу"}
            </option>
            <option
              key={index + "1"}
              className="font-medium"
              key={"Тийм"}
              value={1}
            >
              {"Тийм"}
            </option>
            <option
              key={index + "2"}
              className="font-medium"
              key={"Үгүй"}
              value={0}
            >
              {"Үгүй"}
            </option>
          </select>
        ) : cell.id === "TRANSFER_AMOUNT" ||
          cell.id === "LAW_FULL_AMOUNT" ||
          cell.id === "TRANSFER_AMOUNT" ||
          cell.id === "LAW_UNDER_AMOUNT" ||
          cell.id === "LAW_REJECTED_AMOUNT" ? (
          <CurrencyInput
            id="input-example"
            defaultValue={param.row.original[cell.id]}
            decimalsLimit={2}
            decimalScale={2}
            onChange={(text) => {
              let temp = data;
              temp[index][cell.id] = text.target.value;
              let tset = saveData;
              tset.add(index);
              setSaveData(tset);
              loadData(temp);
            }}
            style={{
              backgroundColor: "transparent",
              textAlign: "right",
              border: "1px solid black",
            }}
          />
        ) : cell.id === "TRANSFER_DESC" ||
          cell.id === "HUULI_HBSH_SHALTGAAN" ||
          cell.id === "TRANSFER_ORG" ||
          cell.id === "TRANSFER_DOC_NO" ||
          cell.id === "PERSON_POSITION" ||
          cell.id === "ZORCHIL_GHA_TUSHAAL" ||
          cell.id === "HUULI_HBBSH_DUN_TOG" ||
          cell.id === "HUULI_HBHB_DUN_TOG" ||
          cell.id === "HUULI_HBHBD_TOG" ? (
          <textarea
            className={index % 2 > 0 ? "flex  h-8 bg-gray-100" : "flex  h-8"}
            style={{
              minHeight: "33px",
              border: "1px solid",
              borderRadius: "4px",
              color: "gray",
            }}
            value={param.row.original[cell.id]}
            onChange={(text) => {
              let temp = data;
              temp[index][cell.id] = text.target.value;
              let tset = saveData;
              tset.add(index);
              setSaveData(tset);
              loadData(temp);
            }}
          />
        ) : (
          flexRender(cell_all.column.columnDef.cell, cell_all.getContext())
        )}
      </div>
    );
  }

  useEffect(() => {
    fetchData();
  }, [props.mayagtData]);

  async function fetchData() {
    DataRequest({
      url: Stat_Url + "BM8List",
      method: "POST",
      data: {
        ID: mayagtData.ID,
        USER_ID: userDetails.USER_ID,
        USER_TYPE_NAME: userDetails.USER_TYPE_NAME,
      },
    })
      .then(function (response) {
        if (response.data !== undefined && response.data.data.length > 0) {
          loadData(response.data.data);
          if (response?.data.role.length > 0)
            setStatus({
              STATUS: response?.data.status,
              ROLE: response?.data.role.find(
                (a) => a.AUDITOR_ID === userDetails.USER_ID
              ),
            });
        }
      })
      .catch(function (error) {
        console.log(error, "error");
      });
  }
  function saveToDB() {
    setloaderSpinner(1);

    DataRequest({
      url: Stat_Url + "BM8IU",
      method: "POST",
      data: {
        // STAT_ID : mayagtData.ID,
        data: data.filter((a) => a.EDITED !== undefined && a.EDITED === true),

        CREATED_BY: userDetails.USER_ID,
      },
    })
      .then(function (response) {
        if (response?.data.message === "Хадгаллаа.") {
          alert("амжилттай хадгаллаа");
          fetchData();
          setloaderSpinner(0);
        }
      })
      .catch(function (error) {
        console.log(error, "error");
        setloaderSpinner(0);
      });
  }

  return (
    <>
      <div
        style={{
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
        <DocInfo />
        <div className="flex justify-between mb-2 ">
          <div style={{ height: 28 }} className="flex flex-row  cursor-pointer">
            <ButtonSearch
              globalFilter={globalFilter}
              setGlobalFilter={(value) => setGlobalFilter(value)}
            />
            <button
              onClick={() => {
                getExportFileBlob(columns, data, "З-ТАББМ-8");
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
            {status?.STATUS.STATUS !== null &&
            status?.STATUS.STATUS !== undefined ? (
              <ButtonRequest
                audID={mayagtData.ID}
                docId={mayagtData.DOCUMENT_ID}
                STATUS={status.STATUS?.STATUS}
                RoleID={status.ROLE?.ROLE_ID}
                statusID={status.STATUS.ID}
                Title="Хүсэлт илгээх"
                batlakhHuselt={batlakhHuselt}
              />
            ) : null}

            {status.ROLE?.AUDITOR_ID !== undefined ? (
              <ButtonConfirm
                STATUS={status.STATUS?.STATUS}
                data={mayagtData}
                Title={mayagtData.DOCUMENT_SHORT_NAME}
                RoleID={status?.ROLE.ROLE_ID}
                statusID={status?.STATUS.ID}
                fetchData={() => fetchData()}
                CREATED_BY={{
                  APPROVED_FIRST_ID: status?.STATUS.APPROVED_FIRST_ID,
                  APPROVED_SECOND_ID: status?.STATUS.APPROVED_SECOND_ID,
                  APPROVED_THIRD_ID: status?.STATUS.APPROVED_THIRD_ID,
                }}
              />
            ) : null}
          </div>
        </div>
        <div>
          <div className="h-2 mr-20" />
          <div className="overflow-y-scroll">
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
                          <td
                            {...{
                              key: cell.id,
                              style: {
                                width: cell.column.getSize(),
                              },
                            }}
                            className="p-2 "
                          >
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
        <div style={{ display: "flex", justifyContent: "end" }}>
          {check_save(status) ? (
            <ButtonSave saveToDB={() => saveToDB()} />
          ) : null}
        </div>
        <div style={{ justifyContent: "flex-end" }}></div>
        {/* <div>
          <div className="text-base flex row">
            <FooterValue />
          </div>
        </div> */}

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

export default Mayagt_8;
