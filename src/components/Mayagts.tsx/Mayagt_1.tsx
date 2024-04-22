import React, { useEffect, useState } from "react";
import Title from "../Title";
import "../../pages/Home.css";
import Comment from "../comment";
import FooterValue from "../Footervalue";
import ButtonRequest from "../ButtonRequest";
import ButtonConfirm from "../ButtonConfirm";
import Stat_Url from "../../Stat_URL";
import ButtonSearch from "../ButtonSearch";
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
  RowData,
} from "@tanstack/react-table";
import DataRequest from "../../functions/make_Request";
import { RankingInfo, rankItem } from "@tanstack/match-sorter-utils";
import fasUrl from "../../fasURL";
import UserPremission from "../../functions/userPermission";
import { check_save } from "../../functions/Tools";
import { RevolvingDot } from "react-loader-spinner";

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

    if (id === "IS_EXPERT_ATTEND" || id === "IS_PRESS_REPORT") {
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
      id === "WORK_PEOPLE" ||
      id === "WORK_DAY" ||
      id === "WORK_TIME"
    ) {
      return (
        <input
          value={value}
          type="number"
          className="bg-transparent"
          style={{
            minHeight: "33px",
            border: "1px solid",
            borderRadius: "4px",
            color: "gray",
          }}
          onChange={(e) => setValue(e.target.value)}
          onBlur={onBlur}
        />
      );
    }

    // <input
    // value={value as string}
    // onChange={e => setValue(e.target.value)}
    // onBlur={onBlur}
    // />
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

function Mayagt_1(props: any) {
  const mayagtData = props.mayagtData;
  const userDetails = props.userDetails;
  const [saveData, setSaveData] = useState(new Set());
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [globalFilter, setGlobalFilter] = React.useState("");
  const [status, setStatus] = useState({ STATUS: {}, ROLE: {} });
  const columns = React.useMemo(
    () => [
      {
        accessorFn: (row, index) => index + 1,
        accessorKey: "№",
        header: "№",
        mixSize: 50,
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "AUDIT_TYPE_NAME",
        header: "Аудитын төрөл",
        maxSize: 150,
        cell: (info) => info.getValue(),
      },

      {
        accessorKey: "AUDIT_NAME",
        header: "Аудитын нэр, сэдэв",
        maxSize: 250,
        cell: (info) => info.getValue(),
      },

      {
        accessorKey: "AUDIT_CODE",
        header: "Аудитын код",
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
        accessorKey: "HOSLUULAH",
        header: "Хослуулан гүйцэтгэсэн эсэх",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "UNDESLEL",
        header: "Сэдвийн үндэслэл",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "BUDGET_SHORT_NAME",
        header: "Төсөв захирагчийн ангилал",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "SALBAR_ANGILAL",
        header: "Салбарын харьяалал",
        cell: (info) => info.getValue(),
      },

      {
        accessorKey: "AUDIT_TYPE",
        header: "Аудит хийх хэлбэр",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "REASON_TYPE_NAME",
        header: "Аудит хийгээгүй шалтгаан",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "CONCLUSION",
        header: "Дүгнэлт",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "CONCLUSION_DESC",
        header: "Татгалзсан шалтгаан",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "TUL_BENEFIT_TOO",
        header: "Төлөвлөсөн санхүүгийн үр өгөөжийн тоо",
        cell: (info) => info.getValue(),
        accessorFn: (row, index) => <div>{row.TUL_BENEFIT_TOO}</div>,
      },
      {
        accessorKey: "TUL_BENEFIT",
        header: "Төлөвлөсөн санхүүгийн үр өгөөж",
        cell: (info) => info.getValue(),
        accessorFn: (row, index) => (
          <div>
            <CurrencyInput
              id="input-example"
              defaultValue={row.TUL_BENEFIT}
              decimalsLimit={2}
              decimalScale={2}
              disabled
              style={{ textAlign: "center", backgroundColor: "transparent" }}
            />
          </div>
        ),
      },
      {
        accessorKey: "TOD_BENEFIT_TOO",
        header: "Хүлээн зөвшөөрүүлсэн санхүүгийн үр өгөөжийн тоо",
        cell: (info) => info.getValue(),
        accessorFn: (row, index) => <div>{row.TOD_BENEFIT_TOO}</div>,
      },
      {
        accessorKey: "TOD_BENEFIT",
        header: "Хүлээн зөвшөөрүүлсэн санхүүгийн үр өгөөжийн дүн",
        cell: (info) => info.getValue(),
        accessorFn: (row, index) => (
          <div>
            <CurrencyInput
              id="input-example"
              defaultValue={row.TOD_BENEFIT}
              decimalsLimit={2}
              decimalScale={2}
              disabled
              style={{ textAlign: "center", backgroundColor: "transparent" }}
            />
          </div>
        ),
      },
      {
        accessorKey: "AUDIT_ORG_CHECK_NAME",
        header: "Аудит хийх байгууллагын төрөл",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "AUDIT_DEPARTMENT_NAME",
        header: "Аудит хийх нэгжийн нэр",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "DEPARTMENT_NAME",
        header: "Аудит хийх байгууллага, нэгжийн нэр",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "AUDIT_LEAD",
        header: "Багийн ахлах",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "AUDIT_MEMBER",
        header: "Багийн гишүүд",
        cell: (info) => info.getValue(),
        wraptext: true,
      },
      {
        accessorKey: "IS_EXPERT_ATTEND",
        header: "Шинжээч оролцсон эсэх",
      },
      {
        accessorKey: "IS_PRESS_REPORT",
        header: "Хэвлэмэл тайлан бэлтгэсэн эсэх",
      },
      {
        accessorKey: "WORK_PEOPLE",
        header: "Ажилласан хүн",
      },
      {
        accessorKey: "WORK_DAY",
        header: "Ажилласан өдөр",
      },
      {
        accessorKey: "WORK_TIME",
        header: "Ажилласан илүү цаг",
      },
    ],
    []
  );
  const [autoResetPageIndex, skipAutoResetPageIndex] = useSkipper();
  const [data, loadData] = React.useState([]);
  const [batlakhHuselt, setBatlakhHuselt] = useState({
    AUDIT_ID: mayagtData.ID,
    DOCUMENT_ID: mayagtData.Document_ID,
    REQUEST_TYPE: 1,
    LEVEL_ID: props.STATUS,
    MODULE_ID: 6,
    DESCRIPTION: "",
    CREATED_BY: userDetails.USER_ID,
  });
  const [loaderSpinner, setloaderSpinner] = useState(0);

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

  useEffect(() => {
    fetchData();
  }, [props.mayagtData]);

  async function fetchData() {
    setloaderSpinner(1);
    DataRequest({
      url: Stat_Url + "BM1List",
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
          setloaderSpinner(0);
        }
      })
      .catch(function (error) {
        console.log(error, "error");
        setloaderSpinner(0);
      });

    DataRequest({
      url: Stat_Url + "NotificationList/",
      method: "POST",
      data: {
        AUDIT_ID: mayagtData.ID,
        USER_ID: userDetails.USER_ID,
      },
    })
      .then(function (response) {
        if (response.data !== undefined && response?.data.length > 0) {
          setBatlakhHuselt(response.data[0]);
          setloaderSpinner(0);
        }
      })
      .catch(function (error) {
        console.log(error, "error");
        setloaderSpinner(0);
      });
  }

  function saveToDB() {
    let temp = [];

    setloaderSpinner(1);

    DataRequest({
      url: Stat_Url + "BM1IU",
      method: "POST",
      data: {
        // STAT_ID : mayagtData.ID,
        data: data.filter((a) => a.EDITED !== undefined && a.EDITED === true),
        CREATED_BY: userDetails.USER_ID,
      },
    })
      .then(function (response) {
        if (response?.data.status === 200) {
          DataRequest({
            url: Stat_Url + "statisticProcessChange",
            method: "POST",
            data: {
              ID: status.STATUS.ID,
              STAT_AUDIT_ID: mayagtData.ID,
              ACTION_ID: 0, //0-HAD, 1-BAT1, 2-BAT2, 3-BAT3
              ACTION_DESC: "mayagt hadgallaa",
              CREATED_BY: userDetails.USER_ID,
            },
          })
            .then(function (response) {
              if (response?.data.status === 200) {
                alert("амжилттай хадгаллаа");
                setloaderSpinner(0);
                fetchData();
              }
            })
            .catch(function (error) {
              console.log(error, "error");
              setloaderSpinner(0);
            });
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
        <div
          style={{
            padding: "0.5rem 0 0 1rem",
          }}
        >
          <Title
            title={
              mayagtData.DOCUMENT_NAME + " " + mayagtData.DOCUMENT_SHORT_NAME
            } //"ТАЙЛАНТ ОНД ГҮЙЦЭТГЭСЭН АУДИТЫН БҮРТГЭЛ З-ТАББМ-1"
            widthS={"28rem"}
            widthL={"10rem"}
          />
          <div className="flex justify-between mb-2 ">
            <div
              style={{ height: 28 }}
              className="flex flex-row  cursor-pointer"
            >
              <ButtonSearch
                globalFilter={globalFilter}
                setGlobalFilter={(value) => setGlobalFilter(value)}
              />
              <button
                onClick={() => {
                  getExportFileBlob(columns, data, "З-ТАББМ-1");
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

            <div className="flex mr-4">
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

          <div className="overflow-y-scroll">
            <div className="h-2 mr-20" />
            <div
              style={{
                overflow: "scroll",
                maxHeight: "530px",
              }}
            >
              <table
                {...{
                  style: {
                    width: table.getCenterTotalSize(),
                  },
                }}
              >
                <thead className="TableHeadBackroundcolor sticky">
                  {table.getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id}>
                      {headerGroup.headers.map((header) => {
                        return (
                          <th
                            {...{
                              key: header.id,
                              colSpan: header.colSpan,
                              style: {
                                backgroundColor:
                                  header.id === "№" ||
                                  header.id === "AUDIT_TYPE_NAME" ||
                                  header.id === "AUDIT_NAME"
                                    ? "#dbe9fc"
                                    : null,
                                width:
                                  header.id === "№"
                                    ? "50px"
                                    : header.id === "AUDIT_TYPE_NAME"
                                    ? "150px"
                                    : header.id === "AUDIT_NAME"
                                    ? "250px"
                                    : header.getSize(),
                                minWidth:
                                  header.id === "№"
                                    ? "50px"
                                    : header.id === "AUDIT_TYPE_NAME"
                                    ? "150px"
                                    : header.id === "AUDIT_NAME"
                                    ? "250px"
                                    : null,
                                maxWidth:
                                  header.id === "№"
                                    ? "50px"
                                    : header.id === "AUDIT_TYPE_NAME"
                                    ? "150px"
                                    : header.id === "AUDIT_NAME"
                                    ? "250px"
                                    : null,
                                left:
                                  header.id === "№"
                                    ? 0
                                    : header.id === "AUDIT_TYPE_NAME"
                                    ? 50
                                    : header.id === "AUDIT_NAME"
                                    ? 200
                                    : null,
                              },
                              className:
                                header.id === "№" ||
                                header.id === "AUDIT_TYPE_NAME" ||
                                header.id === "AUDIT_NAME"
                                  ? "sticky-col"
                                  : null,
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
                                  backgroundColor:
                                    i % 2 > 0 ? "#f5f5f5" : "white",
                                  width:
                                    cell.column.id === "№"
                                      ? "50px"
                                      : cell.column.id === "AUDIT_TYPE_NAME"
                                      ? "150px"
                                      : cell.column.id === "AUDIT_NAME"
                                      ? "250px"
                                      : cell.column.getSize(),
                                  minWidth:
                                    cell.column.id === "№"
                                      ? "50px"
                                      : cell.column.id === "AUDIT_TYPE_NAME"
                                      ? "150px"
                                      : cell.column.id === "AUDIT_NAME"
                                      ? "250px"
                                      : null,
                                  maxWidth:
                                    cell.column.id === "№"
                                      ? "50px"
                                      : cell.column.id === "AUDIT_TYPE_NAME"
                                      ? "150px"
                                      : cell.column.id === "AUDIT_NAME"
                                      ? "250px"
                                      : null,
                                  left:
                                    cell.column.id === "№"
                                      ? 0
                                      : cell.column.id === "AUDIT_TYPE_NAME"
                                      ? 50
                                      : cell.column.id === "AUDIT_NAME"
                                      ? 200
                                      : null,
                                },
                              }}
                              className={
                                cell.column.id === "№" ||
                                cell.column.id === "AUDIT_TYPE_NAME" ||
                                cell.column.id === "AUDIT_NAME"
                                  ? "p-2 sticky-col"
                                  : "p-2"
                              }
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
          </div>
          <div style={{ justifyContent: "flex-end" }}>
            <div className="justify-end flex items-center gap-1 mt-5 mr-2 sticky">
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
            {check_save(status) ? (
              <ButtonSave saveToDB={() => saveToDB()} />
            ) : null}
          </div>
          <div style={{ display: "flex", justifyContent: "end" }}></div>
        </div>
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

export default Mayagt_1;
