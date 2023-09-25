import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
import writeXlsxFile from "write-excel-file";
import dateFormat, { masks } from "dateformat";
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

function Excel() {
  const objects = [0];

  const schema = [
    {
      column: "№",
      Sticky: true,
      type: Number,
      width: 5,
      value: (student: any) => student.N,
    },
    {
      column: "Аудитын он",
      wrap: true,
      sticky: true,
      position: "sticky",
      state: "frozen",
      width: 30,
      type: String,
      value: (student: any) => student.Status,
    },
    {
      column: "Аудитын төрөл",
      wrap: true,
      sticky: true,
      position: "sticky",
      state: "frozen",
      width: 30,
      type: String,
      value: (student: any) => student.Name,
    },
    {
      column: "Аудитын нэр, сэдэв",
      wrap: true,
      width: 30,
      type: String,
      value: (student: any) => student.Name,
    },
    {
      column: "Аудитын код",
      wrap: true,
      width: 30,
      type: String,
      value: (student: any) => student.Name,
    },
    {
      column: "Албан шаардлагын огноо",
      wrap: true,
      width: 30,
      type: String,
      value: (student: any) => student.Name,
    },
    {
      column: "Албан шаардлагын дугаар",
      wrap: true,
      sticky: "top-0",
      width: 30,
      type: String,
      value: (student: any) => student.Name,
    },
    {
      column: "Хүлээлгэн өгсөн огноо",
      wrap: true,
      sticky: "top-0",
      width: 30,
      type: String,
      value: (student: any) => student.Name,
    },
    {
      column: "Зөрчлийг арилгах огноо",
      wrap: true,
      sticky: "top-0",
      width: 30,
      type: String,
      value: (student: any) => student.Name,
    },
    {
      column: "Зөрчлийн товч утга",
      wrap: true,
      sticky: "top-0",
      width: 30,
      type: String,
      value: (student: any) => student.Name,
    },
    {
      column: "Тухайн үр дүнг алдаа зөрчилд тооцох эсэх",
      wrap: true,
      sticky: "top-0",
      width: 30,
      type: String,
      value: (student: any) => student.Name,
    },
    {
      column: "Алдаа, зөрчлийн ангилал",
      wrap: true,
      sticky: "top-0",
      width: 30,
      type: String,
      value: (student: any) => student.Name,
    },
    {
      column: "Албан шаардлагын дүн (төгрөг)",
      wrap: true,
      sticky: "top-0",
      width: 30,
      type: String,
      value: (student: any) => student.Name,
    },
    {
      column: "Төвлөрүүлэх дансны төрөл (төгрөг)",
      wrap: true,
      sticky: "top-0",
      width: 30,
      type: String,
      value: (student: any) => student.Name,
    },
    {
      column: "Шалгагдагч байгууллагын нэр",
      wrap: true,
      sticky: "top-0",
      width: 30,
      type: String,
      value: (student: any) => student.Name,
    },
    {
      column: "Регистрийн дугаар",
      wrap: true,
      sticky: "top-0",
      width: 30,
      type: String,
      value: (student: any) => student.Name,
    },
    {
      column: "Төсөв захирагчийн ангилал",
      wrap: true,
      sticky: "top-0",
      width: 30,
      type: String,
      value: (student: any) => student.Name,
    },
    {
      column: "Овог, нэр",
      wrap: true,
      sticky: "top-0",
      width: 30,
      type: String,
      value: (student: any) => student.Name,
    },
    {
      column: "Албан тушаал",
      wrap: true,
      sticky: "top-0",
      width: 30,
      type: String,
      value: (student: any) => student.Name,
    },
    {
      column: "Аудиторын код",
      wrap: true,
      sticky: "top-0",
      width: 30,
      type: String,
      value: (student: any) => student.Name,
    },
    {
      column: "Зөрчлийг арилгасан баримтын огноо",
      wrap: true,
      sticky: "top-0",
      width: 30,
      type: String,
      value: (student: any) => student.Name,
    },
    {
      column: "Биелсэн албан шаардлагын дүн (төгрөг)",
      wrap: true,
      sticky: "top-0",
      width: 30,
      type: String,
      value: (student: any) => student.Name,
    },
    {
      column: "Бүртгэлээс хасагдсан дүн (төгрөг)",
      wrap: true,
      sticky: "top-0",
      width: 30,
      type: String,
      value: (student: any) => student.Name,
    },
    {
      column: "Бүртгэлээс хасагдсан огноо",
      wrap: true,
      sticky: "top-0",
      width: 30,
      type: String,
      value: (student: any) => student.Name,
    },
    {
      column: "Бүртгэлээс хасагдсан дугаар",
      wrap: true,
      sticky: "top-0",
      width: 30,
      type: String,
      value: (student: any) => student.Name,
    },
    {
      column: "Хугацааны төлөв",
      wrap: true,
      sticky: "top-0",
      width: 30,
      type: String,
      value: (student: any) => student.Name,
    },
    {
      column: "Эрх бүхий байгууллагад шилжүүлсэн эсэх ",
      wrap: true,
      sticky: "top-0",
      width: 30,
      type: String,
      value: (student: any) => student.Name,
    },
    {
      column: "Үр өгөөжийн төрөл",
      wrap: true,
      sticky: "top-0",
      width: 30,
      type: String,
      value: (student: any) => student.Name,
    },
    {
      column: "Үр өгөөжөөр тооцсон эсэх",
      wrap: true,
      sticky: "top-0",
      width: 30,
      type: String,
      value: (student: any) => student.Name,
    },
    {
      column: "Төлөвлөсөн санхүүгийн үр өгөөжийн дүн (төгрөг)",
      wrap: true,
      sticky: "top-0",
      width: 30,
      type: String,
      value: (student: any) => student.Name,
    },
    {
      column: "санхүүгийн үр өгөөжийн дүн (төгрөг)",
      wrap: true,
      sticky: "top-0",
      width: 30,
      type: String,
      value: (student: any) => student.Name,
    },

    // {
    //   column: "Name",
    //   type: String,
    //   value: (student) => student.Name,
    // },
    // {
    //   column: "Cost",
    //   type: Number,
    //   format: "#,##0.00",
    //   value: (student) => student.cost,
    // },
    // {
    //   column: "Paid",
    //   type: Boolean,
    //   value: (student) => student.paid,
    // },
  ];

  const exportar = () => {
    console.log("exportar");

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
      fileName: "З-ТАББМ-5",
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
type Stat_m1 = {
  AUDIT_TOROL: string;
  AUDIT_NER_SEDEV: string;
  AUDIT_KOD: string;
  BAIGUULLGIIN_NER: string;
  REGISTER: string;
  BAIGUULGGIN_UIL_AJILGNII_UNDSEN_CHIGLL: string;
  HOSLUULAN_GUITSETGSN: string;
  S_HARYALL: string;
  TOSOW_ZAHIRGCH_ANGILL: string;
  AUDIT_HIISEN_HELBER: string;
  AUDIT_HIIGGUI_SHALTGAAN: string;
  BAIGUULLAGIN_NR: string;
  TATGALZSAN_SHALTGAAN: string;
  SHINJEECH_OROLTSN_ESEH: string;
  SANAL_DUGNELT_TOROL: string;
  AJILSAN_ODOR: string;
  AJILSAN_ILVV_TSAG: string;
  TOLOWLSON_SAN_UR_OGJ_TOO: string;
  TOLOWLSON_SAN_UR_OGJ_DUN_T: string;
  TOLOWLSON_SAHUU_BUS_UR_OGJ_T: string;
  HULEEN_ZOWSH_SAN_UR_OGJIIN_TOO: string;
  HULEEN_ZOW_SAN_UR_OGJIIN_DUN_T: string;
  HULEEN_ZOW_SANHUU_BUS_UOT: string;
  AUDIT_HH_NEGJIIN_NR: string;
  AUDIT_HIIH_BAI_TOROL: string;
  AUDIT_HH_BAI_NEGJ_NR: string;
  BAGIIN_AHLAH_OVOG_NR: number;
  BAGN_GISHUUD_O_N: string;
  MEDEELEL_ORUULSAN_AHON: string;
};

function Mayagt_1(props: any) {
  const mayagtData = props.mayagtData;
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [globalFilter, setGlobalFilter] = React.useState("");

  const columns = React.useMemo<ColumnDef<Stat_m1, any>[]>(
    () => [
      {
        accessorFn: (row, index) => index + 1,
        id: "№",
        size: 20,
        Filter: false,
      },
      {
        accessorKey: "AUDIT_TYPE",
        header: () => "Аудитын төрөл",
        cell: (info) => info.getValue(),
      },

      {
        accessorKey: "AUDIT_NER_SEDEV",
        header: () => "Аудитын, нэр сэдэв",
        cell: (info) => info.getValue(),
      },

      {
        accessorKey: "AUDIT_KOD",
        header: "Аудит код",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "BAIGUULLGIIN_NER",
        header: "Байгууллагын нэр",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "REGISTER",
        header: "Регистрийн дугаар",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "TOSOW_ZAHIRGCH_ANGILL",
        header: () => "Төсөв захирагчийн ангилал",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "S_HARYALL",
        header: () => "Салбарын харьяалал",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "HOSLUULAN_GUITSETGSN",
        header: "Хослуулан гүйцэтгэсэн эсэх",
        cell: (info) => info.getValue(),
      },

      {
        accessorKey: "AUDIT_HIIH_HELBER",
        header: () => "Аудит хийх хэлбэр",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "AUDIT_HIIGGUI_SHALTGAAN",
        header: () => "Аудит хийгээгүй шалтгаан",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "DUGNELT",
        header: () => "Дүгнэлт",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "TATGALZSAN_SHALTGAAN",
        header: () => "Татгалзсан шалтгаан",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "SHINJEECH_OROLTSON_ESEH",
        header: () => "Шинжээч оролцсон эсэх",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "HEVLMEL_TAILAN_BELTGESEN_ESEH",
        header: () => "Хэвлэмэл тайлан бэлтгэсэн эсэх",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "WORK_PEOPLE",
        header: () => "Ажилласан хүн",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "WORK_DATE",
        header: () => "Ажилласан өдөр",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "WORK_TIME",
        header: () => "Ажилласан илүү цаг",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "TSUO_DUN_T",
        header: () => "Төлөвлөсөн санхүүгийн үр өгөөжийн дүн (төгрөг)",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "TSUO_DUN_TOG",
        header: () => "Тодорхойлсон санхүүгийн үр өгөөжийн дүн (төгрөг)",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "AUDIT_HIIH_BAI_TOROL",
        header: () => "Аудит хийх байгууллагын төрөл",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "AUDIT_HH_NEGJ_NER",
        header: () => "Аудит хийх нэгжийн нэр",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "AUDIT_HIIH_BAI_NEGJ_NER",
        header: () => "Аудит хийх байгууллага, нэгжийн нэр",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "BAGIIN_AHLAH",
        header: () => "Багийн ахлах",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "BAGIIN_GISHUUN",
        header: () => "Багийн гишүүн",
        cell: (info) => info.getValue(),
        wraptext: true,
      },
    ],
    []
  );

  let Stat_m1 = [{}];
  const [data, setData] = React.useState<Stat_m1[]>(Stat_m1);
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
        {cell.id === "SHINJEECH_OROLTSON_ESEH" ||
        cell.id === "HEVLMEL_TAILAN_BELTGESEN_ESEH" ? (
          <select
            className="border rounded text-sm focus:outline-none py-1 h-8 mr-1 inputRoundedMetting pl-2"
            onChange={(text) => {
              let any = setFilter;
            }}
          >
            <option className="font-medium" key={"Сонгоно уу"} value={0}>
              {"Сонгоно уу"}
            </option>
            <option className="font-medium" key={"Тийм"} value={0}>
              {"Тийм"}
            </option>
            <option className="font-medium" key={"Үгүй"} value={0}>
              {"Үгүй"}
            </option>
          </select>
        ) : cell.id === "WORK_PEOPLE" ||
          cell.id === "WORK_DATE" ||
          cell.id === "WORK_TIME" ? (
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

  useEffect(() => {
    fetchData();
  }, [props.mayagtData]);

  async function fetchData() {
    DataRequest({
      url: Stat_Url + "getBM1/" + mayagtData?.MAYGTIIN_DUGAAR + "/" + 1,
      method: "GET",
      // data: {
      //   FAS_AUDIT_ID: props.data.ID,
      //   DOCUMENT_ID: props.data.listID,
      //   CREATED_BY: userDetils?.USER_ID,
      //   CREATED_DATE: dateFormat(new Date(), "dd-mmm-yy"),
      //   IS_ACTIVE: 1,
      // },
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
          padding: "0.5rem 0 0 1rem",
        }}
      >
        <Title
          title={"ТАЙЛАНТ ОНД ГҮЙЦЭТГЭСЭН АУДИТЫН БҮРТГЭЛ З-ТАББМ-1"}
          widthS={"28rem"}
          widthL={"10rem"}
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

export default Mayagt_1;
