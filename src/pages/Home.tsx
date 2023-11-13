import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Title from "../components/Title";
import writeXlsxFile from "write-excel-file";
import DataRequest from "../functions/make_Request";
import Stat_URl from "../Stat_URL";
import { getExportFileBlob } from "../functions/excel_export";
import dateFormat, { masks } from "dateformat";
import UserPremission from "../functions/userPermission";
import {
  addIcon,
  eye,
  editPencil,
  printIcon,
  xIcon,
  excel,
  TSUGJEE,
  TSOOJ,
} from "../assets/zurag";
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
import { Period, Department } from "../components/library";
// import RightMenu from "../components/RightMenu";
import { RankingInfo, rankItem } from "@tanstack/match-sorter-utils";
import "./Home.css";

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

function Home(props: any) {
  // @ts-ignore
  const userDetils = JSON.parse(localStorage.getItem("userDetails"));
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [globalFilter, setGlobalFilter] = React.useState("");
  const [data, setData] = React.useState([]);
  const Navigate = useNavigate();
  const [filter, setFilter] = useState({
    Audit: {
      PERIOD_ID: 999,
      DEPARTMENT_ID: 999,
      DOCUMENT_ID: 999,
      PARENT_BUDGET_ID: 999,
      TYPE: 0,
    },
  });
  const [drop, setDrop] = useState([]);

  const columns = React.useMemo(
    () => [
      UserPremission(userDetils.USER_TYPE_NAME, "plan", "lock")
        ? {
            id: "select",
            header: ({ table }) => (
              <IndeterminateCheckboxALL
                {...{
                  checked: table.getIsAllRowsSelected(),
                  indeterminate: table.getIsSomeRowsSelected(),
                  onChange: table.getToggleAllRowsSelectedHandler(),
                  data,
                  setData,
                }}
              />
            ),
            cell: ({ row }) => (
              <div>
                <IndeterminateCheckbox
                  {...{
                    checked: row.original.IS_LOCK === 1 ? true : false, //ow.getIsSelected(), //row.IS_LOCK === 1 ?true:false
                    disabled: !row.getCanSelect(),
                    indeterminate: row.getIsSomeSelected(),
                    onChange: row.getToggleSelectedHandler(),
                    data,
                    setData,
                    row,
                  }}
                />
              </div>
            ),
          }
        : {
            accessorFn: (row, index) => index + 1,
            accessorKey: "№",
            header: "№",
          },
      {
        accessorKey: "PERIOD_LABEL",
        cell: (info) => info.getValue(),
        header: "Тайлант хугацаа",
        footer: (props) => props.column.id,
      },
      {
        header: "Баталгаажуулах хугацаа",
        accessorKey: "CONFIRM_DATE",
        cell: (info) => info.getValue(),
        accessorFn: (row, index) => {
          return row.CONFIRM_DATE === null
            ? ""
            : dateFormat(row.CONFIRM_DATE, "yyyy-mm-dd");
        },
      },
      {
        accessorKey: "DEPARTMENT_NAME",
        header: "Төрийн аудитын байгууллага",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "DOCUMENT_SHORT_NAME",
        header: "Маягтын дугаар",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "DOCUMENT_NAME",
        header: "Маягтын нэр",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "AUDITOR_MEMBER",
        header: "Багийн гишүүд",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "AUDIT_APPROVE_MEMBER1",
        header: "Батлах 1",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "AUDIT_APPROVE_MEMBER2",
        header: "Батлах 2",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "AUDIT_APPROVE_MEMBER3",
        header: "Батлах 3",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "GUITSETGELIIN_HUWI",
        header: "Гүйцэтгэлийн хувь",
        cell: (info) => info.getValue(),
      },
      {
        header: "Бүртгэсэн огноо",
        accessorKey: "CREATED_DATE",
        cell: (info) => info.getValue(),
        accessorFn: (row, index) => {
          return row.CREATED_DATE === null
            ? ""
            : dateFormat(row.CREATED_DATE, "yyyy-mm-dd");
        },
      },
      {
        accessorKey: "USER_NAME",
        header: "Бүртгэсэн хэрэглэгч",
        cell: (info) => info.getValue(),
      },
      {
        header: "Үйлдэл",
        cell: (info) => info.getValue(),
        accessorFn: (row, index) => (
          <div className="flex justify-start" style={{ width: "140px" }}>
            <button
              className="bg-transparent text-xs"
              type="button"
              style={{
                padding: "2px",
                boxShadow: "0px 0px 0px 1px rgba(	38,132,254,0.3)",
                borderRadius: "4px",
                marginRight: "6px",
              }}
            >
              <img
                src={eye}
                onClick={() => {
                  localStorage.removeItem("Stat");
                  Navigate("/web/Home/Form");
                  localStorage.setItem("Stat", JSON.stringify(row));
                }}
                width="16px"
                height="16px"
                style={{}}
                alt=""
              />
            </button>
            {row.IS_LOCK === 1 ? (
              <img src={TSUGJEE} width="20px" height="16px" alt="tsooj" />
            ) : UserPremission(userDetils.USER_TYPE_NAME, "plan", "write") ? (
              <>
                <button
                  className="bg-transparent text-xs"
                  type="button"
                  style={{
                    padding: "2px",
                    boxShadow: "0px 0px 0px 1px rgba(	38,132,254,0.3)",
                    borderRadius: "4px",
                    marginRight: "6px",
                  }}
                >
                  <img
                    src={editPencil}
                    onClick={() =>
                      Navigate("/web/Home/Nemeh", { state: { ID: row.ID } })
                    }
                    width="14px"
                    height="14px"
                    alt=""
                  />
                </button>
                {/* <button
              className="bg-transparent text-xs"
              type="button"
              style={{
                padding: "2px",
                boxShadow: "0px 0px 0px 1px rgba(	38,132,254,0.3)",
                borderRadius: "4px",
                marginRight: "6px",
              }}
            >
              <img src={printIcon} width="14px" height="14px" alt="" />
            </button> */}
                {/* {UserPremission(userDetils.USER_TYPE_NAME, "HUVAARI") ? ( */}
                <button
                  className="bg-transparent text-xs"
                  onClick={() => deletePlan(row)}
                  type="button"
                  style={{
                    padding: "2px",
                    boxShadow: "0px 0px 0px 1px rgba(	38,132,254,0.3)",
                    borderRadius: "4px",
                    marginRight: "6px",
                  }}
                >
                  <img
                    src={xIcon}
                    // onClick={() => {
                    //   row;
                    // }}
                    width="14px"
                    height="14px"
                    alt=""
                  />
                </button>
                {/* ) : null} */}
                <div
                  style={{
                    position: "relative",
                    padding: "2px",
                    boxShadow: "0px 0px 0px 1px rgba(	38,132,254,0.3)",
                    marginRight: "6px",
                    borderRadius: "4px",
                    width: "22px",
                    textAlignLast: "center",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      height: "35px",
                      width: "30px",
                    }}
                  ></div>
                </div>
              </>
            ) : null}
          </div>
        ),
      },
    ],
    [data]
  );

  function deletePlan(row) {
    if (window.confirm("Устгахдаа итгэлтэй байна уу?")) {
      alert("хөгжүүлэлт хийгдэж байна.");
      // DataRequest({
      //   url: Stat_URl + "auditDelete/",
      //   method: "POST",
      //   data: {
      //     FAS_AUDIT_ID: row.ID,
      //     UPDATED_BY: userDetils.USER_ID,
      //     UPDATED_DATE: dateFormat(new Date(), "yyyy-mm-dd"),
      //   },
      // })
      //   .then(function (response) {
      //     if (
      //       response.data !== undefined &&
      //       response.data.message === "success"
      //     ) {
      //       alert("устлаа");
      //       fetchData();
      //     } else alert(response.data.message);
      //   })
      //   .catch(function (error) {
      //     alert("Aмжилтгүй");
      //   });
    }
  }

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

  useEffect(() => {
    fetchData();
  }, [props]);

  useEffect(() => {
    fetchData();
  }, [filter]);

  async function fetchData() {
    DataRequest({
      url: Stat_URl + "statisticList",
      method: "POST",
      data: {
        PERIOD_ID:
          filter.Audit.PERIOD_ID === 999 || filter.Audit.PERIOD_ID === "999"
            ? null
            : filter.Audit.PERIOD_ID, //filter.Audit.PERIOD_ID,
        DEPARTMENT_ID: UserPremission(userDetils.USER_TYPE_NAME, "plan", "view")
          ? filter.Audit.DEPARTMENT_ID === 999 ||
            filter.Audit.DEPARTMENT_ID === "999"
            ? null
            : filter.Audit.DEPARTMENT_ID
          : userDetils.USER_DEPARTMENT_ID, //filter.Audit.DEPARTMENT_ID
        USER_ID: userDetils.USER_ID,
        USER_TYPE_NAME: userDetils.USER_TYPE_NAME,
      },
    })
      .then(function (response) {
        if (response.data !== undefined && response.data.length > 0) {
          setData([...response.data]);
          //setloaderSpinner(0);
        }
      })
      .catch(function (error) {
        alert("Өгөгдөл авчирхад алдаа гарлаа!");
      });

    DataRequest({
      url: Stat_URl + "refDepartment",
      method: "GET",
      data: {},
    })
      .then(function (res) {
        if (res.data !== undefined && res?.data.length > 0) {
          setDrop(res.data);
        }
      })
      .catch(function (error) {
        alert("Aмжилтгүй");
      });
  }

  function lockPlan() {
    DataRequest({
      url: Stat_URl + "statisticLock",
      method: "POST",
      data: {
        lockData: data,
        CREATED_BY: userDetils.USER_ID,
      },
    })
      .then(function (res) {
        if (res?.data.message === "Хадгаллаа.") {
          alert("амжилттай хадгаллаа");
          fetchData();
        }
      })
      .catch(function (error) {
        alert("Aмжилтгүй");
      });
  }

  return (
    <>
      <div
        style={{
          maxHeight: window.innerHeight,
          maxWidth: window.innerWidth,
          overflow: "scroll",
          padding: "0.5rem 0rem 0 0.8rem",
          // scrollbarWidth: "none",
        }}
      >
        <Title
          title={"СТАТИСТИК МЭДЭЭНИЙ БҮРТГЭЛИЙН МАЯГТЫН ЖАГСААЛТ"}
          widthS={"28rem"}
          widthL={"14rem"}
        />
        <div className="justify-start flex mb-4 mt-4">
          <div style={{ marginRight: "10px", fontSize: "0.8rem" }}>
            <Period
              title="Аудит жил"
              data={filter}
              setData={(value: any) => setFilter(value)}
            />
          </div>
          <div style={{ marginRight: "10px", fontSize: "0.8rem" }}>
            {UserPremission(userDetils.USER_TYPE_NAME, "plan", "view") ? (
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
            ) : null}
          </div>

          <DebouncedInput
            value={globalFilter ?? ""}
            onChange={(value) => setGlobalFilter(String(value))}
            className="p-1.5 font-lg shadow border border-block rounded py-1 h-7"
          />
          <div
            style={{ height: 30, marginLeft: "10px" }}
            className="cursor-pointer "
          >
            <div
              style={{ height: 28 }}
              className="flex flex-row  cursor-pointer"
            >
              {UserPremission(userDetils.USER_TYPE_NAME, "plan", "write") ? (
                <button
                  onClick={() => Navigate("/web/Home/Nemeh")}
                  className="inline-flex items-center rounded ml-2 py-1 h-7"
                  style={{
                    border: "1px solid #2684fe",
                  }}
                >
                  <div className="bg-white px-1 ">
                    <img src={addIcon} width="18px" height="10px "></img>
                  </div>
                  <div
                    style={{
                      backgroundColor: "#2684fe",
                    }}
                    className=" text-white rounded-r px-1 h-7"
                  >
                    нэмэх
                  </div>
                </button>
              ) : null}
              <button
                onClick={() => {
                  getExportFileBlob(columns, data, "хуваарь");
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
              {UserPremission(userDetils.USER_TYPE_NAME, "plan", "lock") ? (
                <button
                  onClick={() => lockPlan()}
                  className="inline-flex items-center rounded ml-2 py-1 h-7"
                  style={{
                    border: "1px solid #2684fe",
                  }}
                >
                  <div className="bg-white px-1 ">
                    <img src={TSOOJ} width="12px" height="10px "></img>
                  </div>
                  <div
                    style={{
                      backgroundColor: "#2684fe",
                    }}
                    className=" text-white rounded-r px-1 h-7"
                  >
                    Түгжих
                  </div>
                </button>
              ) : null}
            </div>
          </div>
        </div>
        <div style={{ maxHeight: "600px", overflow: "scroll" }}>
          <div className="h-2 mr-20" />

          <table>
            <thead className="TableHeadBackroundcolor gap-20 ">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <th
                        key={header.id}
                        colSpan={header.colSpan}
                        style={{ width: 200 }}
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
                    {row.getVisibleCells().map((cell) => {
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
        </div>
      </div>
    </>
  );
}

function IndeterminateCheckbox({
  indeterminate,
  className = "",
  data,
  setData,
  row,

  ...rest
}: { indeterminate?: boolean } & HTMLProps<HTMLInputElement>) {
  const ref = React.useRef<HTMLInputElement>(null!);
  // @ts-ignore
  const userDetils = JSON.parse(localStorage.getItem("userDetails"));
  React.useEffect(() => {
    if (typeof indeterminate === "boolean") {
      ref.current.indeterminate = !rest.checked && indeterminate;
    }
  }, [ref, indeterminate]);

  function saveToDB(value) {
    let tempData = data;
    tempData[row.index].IS_LOCK = row.original.IS_LOCK === 0 ? 1 : 0;
    setData(tempData);
  }

  return (
    <input
      type="checkbox"
      ref={ref}
      className={className + " cursor-pointer"}
      //{row?.original.IS_LOCK === 1 ?true:false}
      checked={true}
      onClick={(value) => saveToDB(ref)}
      {...rest}
    />
  );
}

function IndeterminateCheckboxALL({
  indeterminate,
  className = "",
  data,
  setData,

  table,
  ...rest
}: { indeterminate?: boolean } & HTMLProps<HTMLInputElement>) {
  const ref = React.useRef<HTMLInputElement>(null!);
  // @ts-ignore
  const userDetils = JSON.parse(localStorage.getItem("userDetails"));
  React.useEffect(() => {
    if (typeof indeterminate === "boolean") {
      ref.current.indeterminate = !rest.checked && indeterminate;
    }
  }, [ref, indeterminate]);

  function saveToDB() {
    let tempData = data;
    for (let i = 0; i < data.length; i++) {
      tempData[i].IS_LOCK = data[i].IS_LOCK === 0 ? 1 : 0;
      if (i === data.length - 1) {
        setData(tempData);
      }
    }
  }

  return (
    <input
      type="checkbox"
      ref={ref}
      className={className + " cursor-pointer"}
      //{row?.original.IS_LOCK === 1 ?true:false}
      checked={true}
      onClick={(value) => saveToDB()}
      {...rest}
    />
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
    <div className=" overflow-hidden flex border rounded h-7">
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

      <button className="flex items-center px-2.5 border-l bg-blue-500 rounded-r h-7">
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

export default Home;
