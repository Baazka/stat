import React, { useState } from "react";
import {
  useNavigate,
  createHashRouter,
  RouterProvider,
} from "react-router-dom";
import Title from "../Title";
import "../../pages/Home.css";
import Subtitle from "../Subtitle";
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

type Stat_CM5B = {
  AUDIT_TOROL: string;
  MD: string;
  NIIT_TOO: string;
  NIIT_DUN: string;
  NBBHS_HUULI_TOGTOOMJIIN_DAGUU_ZOHIH_ES_HOTOLSON_BATALGAAJUULAAGUI_TOO: string;
  NBBHS_HUULI_TOGTOOMJIIN_DAGUU_ZOHIH_ES_HOTOLSON_BATALGAAJUULAAGUI_DUN: string;
  HTHHTZDH_BARIMTJUULAAGUI_BATALGAAJUULAAGUI_TOO: string;
  HTHHTZDH_BARIMTJUULAAGUI_BATALGAAJUULAAGUI_DUN: string;
  OMCH_HORONGIIG_BUSDAD_ZUI_BUSAAR_ASIGLUULSAN_TOO: string;
  OMCH_HORONGIIG_BUSDAD_ZUI_BUSAAR_ASIGLUULSAN_DUN: string;
  THUAZZZUOU_ESWEL_SHAARDLLAGGUI_HORONGO_OLJ_BELTGESEN_TOO: string;
  THUAZZZUOU_ESWEL_SHAARDLLAGGUI_HORONGO_OLJ_BELTGESEN_DUN: string;
  TOZBT_TOSOWT_ZARDLIG_HETRUULSEN_TOO: string;
  TOZBT_TOSOWT_ZARDLIG_HETRUULSEN_DUN: string;
  TOSWIIN_ZARTSUULSAN_BUSAAR_ZARTSUULSAN_TOO: string;
  TOSWIIN_ZARTSUULSAN_BUSAAR_ZARTSUULSAN_DUN: string;
  AVILGA_OGLOGG_TOOTSOO_NIILJ_BATALGAAJULAAGUI_TOO: string;
  AVILGA_OGLOGG_TOOTSOO_NIILJ_BATALGAAJULAAGUI_DUN: string;
  BAIGUULSAN_GEREE_HELTSL_HOLBOGDOH_DUREM_JURMIG_BARIMTLAAGUI_TOO: string;
  BAIGUULSAN_GEREE_HELTSL_HOLBOGDOH_DUREM_JURMIG_BARIMTLAAGUI_DUN: string;
  TBONOHB_BURDEEGUI_TOO: string;
  TBONOHB_BURDEEGUI_DUN: string;
  AIAZ_TUUNII_ARILGAH_OGSON_ZOWLOMJ_HEREGJEEGUI_TOO: string;
  AIAZ_TUUNII_ARILGAH_OGSON_ZOWLOMJ_HEREGJEEGUI_DUN: string;
  NOHTSOL_BAIDLIIN_TOO: string;
  NOHTSOL_BAIDLIIN_DUN: string;
};

function CM_5B() {
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  // const userDetils = JSON.parse(getItem("userDetails"));
  // const [status, setStatus] = useState([]);
  // const [commentText, setCommentText] = useState("");
  // async function fetchData() {
  const [globalFilter, setGlobalFilter] = React.useState("");

  const columns = React.useMemo<ColumnDef<Stat_CM5B, any>[]>(
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
        accessorKey: "MD",
        cell: (info) => info.getValue(),
        header: "МД",
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "NIIT_TOO",
        cell: (info) => info.getValue(),
        header: "Нийт тоо",
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "NIIT_DUN",
        cell: (info) => info.getValue(),
        header: "Нийт дүн",
        footer: (props) => props.column.id,
      },
      {
        accessorKey:
          "NBBHS_HUULI_TOGTOOMJIIN_DAGUU_ZOHIH_ES_HOTOLSON_BATALGAAJUULAAGUI_TOO",
        cell: (info) => info.getValue(),
        header:
          "Нягтлан бодох бүртгэлийг холбогдох стандарт, хууль тогтоомжийн дагуу зохих ёсоор хөтөлж, баталгаажуулаагүй тоо",
        footer: (props) => props.column.id,
      },
      {
        accessorKey:
          "NBBHS_HUULI_TOGTOOMJIIN_DAGUU_ZOHIH_ES_HOTOLSON_BATALGAAJUULAAGUI_DUN",
        cell: (info) => info.getValue(),
        header:
          "Нягтлан бодох бүртгэлийг холбогдох стандарт, хууль тогтоомжийн дагуу зохих ёсоор хөтөлж, баталгаажуулаагүй дүн",
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "HTHHTZDH_BARIMTJUULAAGUI_BATALGAAJUULAAGUI_TOO",
        cell: (info) => info.getValue(),
        header:
          "Хөрөнгийн тооллогыг холбогдох хууль, тогтоомжид заасны дагуу хийгээгүй, баримтжуулаагүй, баталгаажуулаагүй тоо",
        footer: (props) => props.column.id,
        size: 250,
      },
      {
        accessorKey: "HTHHTZDH_BARIMTJUULAAGUI_BATALGAAJUULAAGUI_DUN",
        cell: (info) => info.getValue(),
        header:
          "Хөрөнгийн тооллогыг холбогдох хууль, тогтоомжид заасны дагуу хийгээгүй, баримтжуулаагүй, баталгаажуулаагүй дүн",
        footer: (props) => props.column.id,
        size: 250,
      },
      {
        accessorKey: "OMCH_HORONGIIG_BUSDAD_ZUI_BUSAAR_ASIGLUULSAN_TOO",
        cell: (info) => info.getValue(),
        header: "Өмч, хөрөнгийг бусдад зүй бусаар ашиглуулсан тоо",
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "OMCH_HORONGIIG_BUSDAD_ZUI_BUSAAR_ASIGLUULSAN_DUN",
        cell: (info) => info.getValue(),
        header: "Өмч, хөрөнгийг бусдад зүй бусаар ашиглуулсан дүн",
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "THUAZZZUOU_ESWEL_SHAARDLLAGGUI_HORONGO_OLJ_BELTGESEN_TOO",
        cell: (info) => info.getValue(),
        header:
          "Төсвийн хөрөнгийг үр ашиггүй зарцуулсан, зах зээлийн үнээс өндөр үнэтэй эсвэл шаардлагагүй хөрөнгө олж бэлтгэсэн тоо",
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "THUAZZZUOU_ESWEL_SHAARDLLAGGUI_HORONGO_OLJ_BELTGESEN_DUN",
        cell: (info) => info.getValue(),
        header:
          "Төсвийн хөрөнгийг үр ашиггүй зарцуулсан, зах зээлийн үнээс өндөр үнэтэй эсвэл шаардлагагүй хөрөнгө олж бэлтгэсэн дүн",
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "TOZBT_TOSOWT_ZARDLIG_HETRUULSEN_TOO",
        cell: (info) => info.getValue(),
        header:
          "Төсвийн орлого, зарлагыг буруу тооцолсон, төсөвт зардлыг хэтрүүлсэн тоо",
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "TOZBT_TOSOWT_ZARDLIG_HETRUULSEN_DUN",
        cell: (info) => info.getValue(),
        header:
          "Төсвийн орлого, зарлагыг буруу тооцолсон, төсөвт зардлыг хэтрүүлсэн дүн",
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "TOSWIIN_ZARTSUULSAN_BUSAAR_ZARTSUULSAN_TOO",
        cell: (info) => info.getValue(),
        header: "Төсвийн зориулалт бусаар зарцуулсан тоо",
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "TOSWIIN_ZARTSUULSAN_BUSAAR_ZARTSUULSAN_DUN",
        cell: (info) => info.getValue(),
        header: "Төсвийн зориулалт бусаар зарцуулсан дүн",
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "AVILGA_OGLOGG_TOOTSOO_NIILJ_BATALGAAJULAAGUI_TOO",
        cell: (info) => info.getValue(),
        header: "Авлага, өглөгийг тооцоо нийлж баталгаажуулаагүй тоо",
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "AVILGA_OGLOGG_TOOTSOO_NIILJ_BATALGAAJULAAGUI_DUN",
        cell: (info) => info.getValue(),
        header: "Авлага, өглөгийг тооцоо нийлж баталгаажуулаагүй дүн",
        footer: (props) => props.column.id,
      },
      {
        accessorKey:
          "BAIGUULSAN_GEREE_HELTSL_HOLBOGDOH_DUREM_JURMIG_BARIMTLAAGUI_TOO",
        cell: (info) => info.getValue(),
        header:
          "Байгуулсан гэрээ, хэлцэл холбогдох дүрэм, журмыг баримтлаагүй тоо",
        footer: (props) => props.column.id,
      },
      {
        accessorKey:
          "BAIGUULSAN_GEREE_HELTSL_HOLBOGDOH_DUREM_JURMIG_BARIMTLAAGUI_DUN",
        cell: (info) => info.getValue(),
        header:
          "Байгуулсан гэрээ, хэлцэл холбогдох дүрэм, журмыг баримтлаагүй дүн",
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "TBONOHB_BURDEEGUI_TOO",
        cell: (info) => info.getValue(),
        header:
          "Төрийн болон орон нутгийн өмчийн хөрөнгөөр бараа, ажил, үйлчилгээ худалдан авах тухай хууль, тогтоомж зөрчсөн нь төлбөрийн акт тогтоох үндэслэл бүрдээгүй тоо",
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "TBONOHB_BURDEEGUI_DUN",
        cell: (info) => info.getValue(),
        header:
          "Төрийн болон орон нутгийн өмчийн хөрөнгөөр бараа, ажил, үйлчилгээ худалдан авах тухай хууль, тогтоомж зөрчсөн нь төлбөрийн акт тогтоох үндэслэл бүрдээгүй дүн",
        footer: (props) => props.column.id,
        size: 350,
      },
      {
        accessorKey: "AIAZ_TUUNII_ARILGAH_OGSON_ZOWLOMJ_HEREGJEEGUI_TOO",
        cell: (info) => info.getValue(),
        header:
          "Аудитаар илэрсэн алдаа зөрчил, түүний арилгахаар өгсөн зөвлөмжийг хэрэгжүүлээгүй тоо",
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "AIAZ_TUUNII_ARILGAH_OGSON_ZOWLOMJ_HEREGJEEGUI_DUN",
        cell: (info) => info.getValue(),
        header:
          "Аудитаар илэрсэн алдаа зөрчил, түүний арилгахаар өгсөн зөвлөмжийг хэрэгжүүлээгүй дүн",
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "NOHTSOL_BAIDLIIN_TOO",
        cell: (info) => info.getValue(),
        header:
          "Хууль, тогтоомж, гэрээ, хэлцэл зөрчсөн алдаа, зөрчлийг таслан зогсоож давтан гаргуулахгүй байх үр нөлөөтэй гэж үзсэн бусад нөхцөл байдлын тоо",
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "NOHTSOL_BAIDLIIN_DUN",
        cell: (info) => info.getValue(),
        header:
          "Хууль, тогтоомж, гэрээ, хэлцэл зөрчсөн алдаа, зөрчлийг таслан зогсоож давтан гаргуулахгүй байх үр нөлөөтэй гэж үзсэн бусад нөхцөл байдлын дүн",
        footer: (props) => props.column.id,
        size: 350,
      },
    ],
    []
  );
  let Stat_CM5B = [{}];
  const [data, setData] = React.useState<Stat_CM5B[]>(Stat_CM5B);
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
          padding: "0.5rem 0 0 0.5rem",
          overflowX: "scroll",
        }}
      >
        <div className="justify-start flex mb-2 mt-2">
          <Title
            title={
              "ТАЙЛАНД ОНД АЛБАН ШААРДЛАГА ӨГСӨН ЗӨРЧЛИЙН МЭДЭЭЛЭЛ 3-ТАБСМ-5Б"
            }
            widthS={"36rem"}
            widthL={"14rem"}
          />
          <div className="mt-1 ml-1.5">
            <Subtitle mayagtName={"З-ТАБСМ-5Б"} />
          </div>
        </div>
        <div className="flex justify-between mb-2 ">
          <div style={{ height: 28 }} className="flex flex-row  cursor-pointer">
            <ButtonSearch />
            <button
              onClick={() => Navigate("/web/Home/Nemeh")}
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
                            header.getSize() !== 300
                              ? header.getSize()
                              : undefined,
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
    <div className=" overflow-hidden flex border rounded-md">
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

      <button className="flex items-center px-2.5 border-l bg-blue-500 rounded-md">
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

export default CM_5B;
