import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Title from "../components/Title";
import writeXlsxFile from "write-excel-file";
import DataRequest from "../functions/make_Request";
import Stat_URl from "../Stat_URL";
import dateFormat, { masks } from "dateformat";
import {
  addIcon,
  eye,
  editPencil,
  printIcon,
  xIcon,
  excel,
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
const now = new Date();
type Person = {
  PERIOD_LABEL: number;
  BATALGAAJUULAH_H: string;
  TORIIN_AUDIT_BAI: string;
  MAYGTIIN_DUGAAR: string;
  BAG: string;
  BATLAH_1: string;
  BATLAH_2: string;
  BATLAH_3: string;
  TOLOV: string;
  GUITSETGELIIN_HUWI: string;
  BURTGSEN_OGNOO: string;
  BURTGESEN_HEREGLEGCH: string;
};
// const defaultData: Person[] = [
//   {
//     TAILANT_HUGATSAA: PERIOD_LABEL,
//   },
// ];
function Home(props: any) {
  const objects = [
    {
      value: "",
      Persons: "TORIIN_AUDIT_BAI",
    },
  ];
  const schema = [
    {
      column: "№",
      type: Number,
      width: 5,
      value: (student: any) => student.N,
    },
    {
      column: "Тайлант хугацаа",
      wrap: true,
      width: 30,
      type: String,
      value: (student: any) => student.Status,
    },
    {
      column: "Бaталгаажуулах хугацаа",
      wrap: true,
      width: 30,
      type: String,
      value: (student: any) => student.Name,
    },
    {
      column: "Төрийн аудитын байгууллага",
      wrap: true,
      width: 30,
      type: String,
      value: (item: any) => item.Persons,
    },
    {
      column: "Маягтын дугаар",
      wrap: true,
      width: 30,
      type: String,
      value: (student: any) =>
        student.TORIIN_AUDIT_BAI === null ||
        student.TORIIN_AUDIT_BAI === undefined
          ? ""
          : student.TORIIN_AUDIT_BAI.toString(),
    },
    {
      column: "Баг",
      wrap: true,
      width: 30,
      type: String,
      value: (student: any) => student.Name,
    },
    {
      column: "Батлах 1",
      wrap: true,
      width: 30,
      type: String,
      value: (student: any) => student.Name,
    },
    {
      column: "Батлах 2",
      wrap: true,
      width: 30,
      type: String,
      value: (student: any) => student.Name,
    },
    {
      column: "Батлах 3",
      wrap: true,
      width: 30,
      type: String,
      value: (student: any) => student.Name,
    },
    {
      column: "Гүйцэтгэлийн хувь",
      wrap: true,
      width: 30,
      type: String,
      value: (student: any) => student.Name,
    },
    {
      column: "Бүртгэсэн огноо",
      wrap: true,
      width: 30,
      type: String,
      value: (student: any) => student.Name,
    },
    {
      column: "Бүртгэсэн хэрэглэгч",
      wrap: true,
      width: 30,
      type: String,
      value: (student: any) => student.Name,
    },
    //   {
    //     column: 'Name',
    //     type: String,
    //     value: student => student.Name
    //   },
    //   {
    //     column: 'Cost',
    //     type: Number,
    //     format: '#,##0.00',
    //     value: student => student.cost
    //   },
    //   {
    //     column: 'Paid',
    //     type: Boolean,
    //     value: student => student.paid
    //   }
  ];
  function Excel() {
    let temp = [];
    temp[0] = schema[0];
    rows.map((row: any, index: any) => {
      temp.push([
        {
          value: index + 1,
          style: {
            alignment: {
              wrapText: "true",
              vertical: "top",
              horizontal: "center",
            },
            font: { sz: "11" },
          },
        },
        {
          value:
            row.original.TEZ_NAME === null ||
            row.original.TEZ_NAME === undefined
              ? ""
              : row.original.TEZ_NAME.toString(),
          style: {
            alignment: {
              wrapText: "true",
              vertical: "top",
              horizontal: "left",
            },
            font: { sz: "11" },
          },
        },
        {
          value:
            row.original.TTZ_NAME === null ||
            row.original.TTZ_NAME === undefined
              ? ""
              : row.original.TTZ_NAME.toString(),
          style: {
            alignment: {
              wrapText: "true",
              vertical: "top",
              horizontal: "left",
            },
            font: { sz: "11" },
          },
        },
        {
          value:
            row.original.TORIIN_AUDIT_BAI === null ||
            row.original.TORIIN_AUDIT_BAI === undefined
              ? ""
              : row.original.TORIIN_AUDIT_BAI.toString(),
          style: {
            alignment: {
              wrapText: "true",
              vertical: "top",
              horizontal: "left",
            },
            font: { sz: "11" },
          },
        },
        {
          value:
            row.original.TAILANT_HUGATSAA === null ||
            row.original.TAILANT_HUGATSAA === undefined
              ? ""
              : row.original.TAILANT_HUGATSAA.toString(),
          style: {
            alignment: {
              wrapText: "true",
              vertical: "top",
              horizontal: "left",
            },
            font: { sz: "11" },
          },
        },
        {
          value:
            row.original.ENT_NAME === null ||
            row.original.ENT_NAME === undefined
              ? ""
              : row.original.ENT_NAME.toString(),
          style: {
            alignment: {
              wrapText: "true",
              vertical: "top",
              horizontal: "left",
            },
            font: { sz: "11" },
          },
        },
        {
          value:
            row.original.ORG_REGISTER_NO === null ||
            row.original.ORG_REGISTER_NO === undefined
              ? ""
              : row.original.ORG_REGISTER_NO.toString(),
          style: {
            alignment: {
              wrapText: "true",
              vertical: "top",
              horizontal: "left",
            },
            font: { sz: "11" },
          },
        },
        {
          value:
            row.original.CHECK_DEPARTMENT_NAME === null ||
            row.original.CHECK_DEPARTMENT_NAME === undefined
              ? ""
              : row.original.CHECK_DEPARTMENT_NAME.toString(),
          style: {
            alignment: {
              wrapText: "true",
              vertical: "top",
              horizontal: "left",
            },
            font: { sz: "11" },
          },
        },
        {
          value:
            row.original.AUDIT_HH === null ||
            row.original.AUDIT_HH === undefined
              ? ""
              : row.original.AUDIT_HH.toString(),
          style: {
            alignment: {
              wrapText: "true",
              vertical: "top",
              horizontal: "right",
            },
            numFmt: "0",
          },
        },
        {
          value:
            row.original.DEPARTMENT_NAME === null ||
            row.original.DEPARTMENT_NAME === undefined
              ? ""
              : row.original.DEPARTMENT_NAME.toString(),
          style: {
            alignment: {
              wrapText: "true",
              vertical: "top",
              horizontal: "right",
            },
          },
        },
        {
          value:
            row.original.BURTGESEN_OGNOO === null ||
            row.original.BURTGESEN_OGNOO === undefined
              ? ""
              : row.original.BURTGESEN_OGNOO.toString(),
          style: {
            alignment: {
              wrapText: "true",
              vertical: "top",
              horizontal: "left",
            },
            font: { sz: "11" },
          },
        },
        {
          value:
            row.original.BURTSEN_HERGLEGCH === null ||
            row.original.BURTSEN_HERGLEGCH === undefined
              ? ""
              : row.original.BURTSEN_HERGLEGCH.toString(),
          style: {
            alignment: {
              wrapText: "true",
              vertical: "top",
              horizontal: "left",
            },
            font: { sz: "11" },
          },
        },
        {
          value:
            row.original.ISHLEL === null || row.original.ISHLEL === undefined
              ? ""
              : row.original.ISHLEL.toString(),
          style: {
            alignment: {
              wrapText: "true",
              vertical: "top",
              horizontal: "right",
            },
          },
        },
        {
          value:
            row.original.NOHTSOL_B === null ||
            row.original.NOHTSOL_B === undefined
              ? ""
              : row.original.NOHTSOL_B.toString(),
          style: {
            alignment: {
              wrapText: "true",
              vertical: "top",
              horizontal: "right",
            },
          },
        },
        {
          value:
            row.original.ILRUULELT === null ||
            row.original.ILRUULELT === undefined
              ? ""
              : row.original.ILRUULELT.toString(),
          style: {
            alignment: {
              wrapText: "true",
              vertical: "top",
              horizontal: "right",
            },
          },
        },
        {
          value:
            row.original.SHALTGAAN === null ||
            row.original.SHALTGAAN === undefined
              ? ""
              : row.original.SHALTGAAN.toString(),
          style: {
            alignment: {
              wrapText: "true",
              vertical: "top",
              horizontal: "right",
            },
          },
        },
        {
          value:
            row.original.UR_DAGAWAR === null ||
            row.original.UR_DAGAWAR === undefined
              ? ""
              : row.original.UR_DAGAWAR.toString(),
          style: {
            alignment: {
              wrapText: "true",
              vertical: "top",
              horizontal: "right",
            },
          },
        },
        {
          value:
            row.original.ZOWLOMJ === null || row.original.ZOWLOMJ === undefined
              ? ""
              : row.original.ZOWLOMJ.toString(),
          style: {
            alignment: {
              wrapText: "true",
              vertical: "top",
              horizontal: "right",
            },
          },
        },
        {
          value:
            row.original.IBT_OGNOO === null ||
            row.original.IBT_OGNOO === undefined
              ? ""
              : row.original.IBT_OGNOO.toString(),
          style: {
            alignment: {
              wrapText: "true",
              vertical: "top",
              horizontal: "right",
            },
          },
        },
        {
          value:
            row.original.IBT_TOLOW === null ||
            row.original.IBT_TOLOW === undefined
              ? ""
              : row.original.IBT_TOLOW.toString(),
          style: {
            alignment: {
              wrapText: "true",
              vertical: "top",
              horizontal: "right",
            },
          },
        },
        {
          value:
            row.original.AUDIT_BAG_H === undefined ||
            row.original.AUDIT_BAG_H === null
              ? ""
              : parseInt(row.original.AUDIT_BAG_H) > 0
              ? "Зөвшөөрсөн тест"
              : "Тайлбартай тест",
          style: {
            alignment: {
              wrapText: "true",
              vertical: "top",
              horizontal: "right",
            },
          },
        },
        {
          value:
            row.original.BURTGESEN_HEREGLEGCH === undefined ||
            row.original.BURTGESEN_HEREGLEGCH === null
              ? ""
              : parseInt(row.original.BURTGESEN_HEREGLEGCH) > 0
              ? "Б.Эрдэнэзул"
              : "Б.Эрдэнэзул",
          style: {
            alignment: {
              wrapText: "true",
              vertical: "top",
              horizontal: "right",
            },
          },
        },
        {
          value:
            row.original.CHBA_TAILBAR === undefined ||
            row.original.CHBA_TAILBAR === null
              ? ""
              : parseInt(row.original.CHBA_TAILBAR) > 0
              ? "Тайлбар хүлээн авсан"
              : "Татгалзсан",
          style: {
            alignment: {
              wrapText: "true",
              vertical: "top",
              horizontal: "right",
            },
          },
        },
      ]);
    });
    const exportar = () => {
      writeXlsxFile(objects, {
        schema,
        headerStyle: {
          backgroundColor: "#aabbcc",
          fontWeight: "bold",
          fontSize: 13,
          align: "center",
          alignVertical: "top",
          wrap: true,
        },
        fileName: "Хуваарь",
      });
    };
    return (
      <div className="s">
        <button
          onClick={exportar}
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

  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [globalFilter, setGlobalFilter] = React.useState("");

  const columns = React.useMemo<ColumnDef<Person, any>[]>(
    () => [
      {
        accessorFn: (row, index) => index + 1,
        id: "№",
      },
      {
        accessorKey: "PERIOD_LABEL",
        cell: (info) => info.getValue(),
        header: "Тайлант хугацаа",
        footer: (props) => props.column.id,
      },
      {
        header: "Баталгаажуулах хугацаа",
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
        accessorKey: "BATLAH_1",
        header: "Батлах 1",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "BATLAH_2",
        header: "Батлах 2",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "BATLAH_3",
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
                onClick={() => Navigate("/web/Home/Nemeh",{ state: { ID: row.ID} })}
                width="14px"
                height="14px"
                alt=""
              />
            </button>
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
              <img src={printIcon} width="14px" height="14px" alt="" />
            </button>
            {/* {UserPremission(userDetils.USER_TYPE_NAME, "HUVAARI") ? ( */}
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
          </div>
        ),
      },
    ],
    []
  );

  let persons = [
    {
      MAYGTIIN_DUGAAR: "З-ТАББМ 1",
    },
    {
      MAYGTIIN_DUGAAR: "З-ТАББМ 2",
    },
    {
      MAYGTIIN_DUGAAR: "З-ТАББМ 3",
    },
    {
      MAYGTIIN_DUGAAR: "З-ТАББМ 4",
    },
    {
      MAYGTIIN_DUGAAR: "З-ТАББМ 5",
    },
    {
      MAYGTIIN_DUGAAR: "З-ТАББМ 6",
    },
    {
      MAYGTIIN_DUGAAR: "З-ТАББМ 7",
    },
    {
      MAYGTIIN_DUGAAR: "З-ТАББМ 8",
    },
    {
      MAYGTIIN_DUGAAR: "З-ТАББМ 9",
    },
    {
      MAYGTIIN_DUGAAR: "З-ТАББМ 10",
    },
    {
      MAYGTIIN_DUGAAR: "З-ТАББМ 11",
    },
    {
      MAYGTIIN_DUGAAR: "З-ТАББМ 12",
    },
    {
      MAYGTIIN_DUGAAR: "З-ТАББМ 13",
    },
    {
      MAYGTIIN_DUGAAR: "З-ТАББМ 14",
    },
    {
      MAYGTIIN_DUGAAR: "З-ТАББМ 15",
    },
  ];

  const [data, setData] = React.useState<Person[]>(persons);
  const Navigate = useNavigate();
  const [rows, setrows] = useState([]);
  const [filter, setFilter] = useState({
    Audit: {
      PERIOD_ID: 4,
      DEPARTMENT_ID: 999,
      DOCUMENT_ID: 999,
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
    initialState: {
      pagination: {
        pageSize: data.length,
      },
    },
    debugTable: true,
    debugHeaders: true,
    debugColumns: false,
  });
  useEffect(() => {
    fetchData();
  }, [props.mayagtData]);

  async function fetchData() {
    DataRequest({
      url: Stat_URl + "statisticList",
      method: "POST",
      data: {
        CONFIRM_DATE: dateFormat(new Date(), "dd-mmm-yy"),
        IS_ACTIVE: 1,
      },
    })
      .then(function (response) {
        console.log(response, "response");
        if (response?.data.message === "failed" || response === undefined) {
          alert("Өгөгдөл авчирхад алдаа гарлаа!");
          //setloaderSpinner(0);
        } else {
          setData(response?.data);
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
          maxHeight: window.innerHeight - 129,
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
            <Department
              data={filter}
              setData={(value: any) => setFilter(value)}
              title="Аудит хийх нэгж нэр"
            />
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
            </div>
          </div>
          <Excel />
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
