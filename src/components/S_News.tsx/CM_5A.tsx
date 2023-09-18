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

type Stat_CM5A = {
  AUDIT_TOROL: string;
  MD: string;
  NIIT_TOO: string;
  NIIT_DUN: string;
  TO_HORONGIIG_UNDESLELGUIGEER_BUSDD_HANDIVLASN_UNE_TOLBORGUI_SHILJUULSEN_TOO: string;
  TO_HORONGG_UNDESLLGUIGR_BUSDD_HANDIVLASANGUI_UNE_TOLBORGUI_SHILJUULEN_DUN: string;
  TORIIN_DOLON_ORON_NUTGIIN_OMCH_ED_HORONGIIG_TUREESLUULSEN: string;
  TORIIN_BOLON_ORON_BUTGIIN_OMCH_ED_HORONGIIN_TUREESLUULSEN_ASHIGLUULSNI_TOLBOR: string;
  TSALIN_HOLS_SHAGNAL_URAMSHUULL_TETGEMJIIN_ZORUUTEI_TOOTSOJ_OLGOSON_TOO: string;
  TSALIN_HOLS_SHAGNAL_TETGEMJIIN_ZORUUTEI_TOOTSOJ_OLGOSON_DUN: string;
  TOSOWT_TOWLORUULEH_ESTOI_DOLON_TATWAR_BUS_TOSWIN_ORLGIG_DUTUU_TOWLORUULSEN: string;
  TOSOWT_TOWLORUULEH_ESTOI_TATWARIIN_BOLON_TATVARIN_BUS_TOSWIIN_: string;
  BTZ_TOOTSOOLSNOOS_UR_DAGAWAR_UUSSEN_TOO: string;
  BTZ_TOOTSOLSOOS_UR_DAGAWAR_UUSEN_DUN: string;
  EBE_TOGOTTSON_NORM_NORMATIWG_HETRUULN_ZARTSUULSN_TOO: string;
  EBE_TOGTOOSN_NORM_NORMATIWG_HETRUULN_ZARTSUULSN_DUN: string;
  TBONO_HORONGIIG_DUTAASAN_UREGDUULSEN_HUULI_BUSAAR_ASHIGLSAN_TOO: string;
  TBONO_HORONGIIG_DUTAASAN_UREGDUULSEN_HUUL: string;
  TORIIN_OMCH_TUHAIN_HUUL_ZAASAN_BUSAD_NOHTSOL_BAIDAL_UUSEN_TOO: string;
  TORIIN_AUDIT_TUHAIN_HUULD_ZAASAN_BUSAD_NOHTSOL_BAIDAL_UUSEN_DUN: string;
};

function CM_5A() {
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  // const userDetils = JSON.parse(getItem("userDetails"));
  // const [status, setStatus] = useState([]);
  // const [commentText, setCommentText] = useState("");
  // async function fetchData() {
  const [globalFilter, setGlobalFilter] = React.useState("");

  const columns = React.useMemo<ColumnDef<Stat_CM5A, any>[]>(
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
          "TO_HORONGIIG_UNDESLELGUIGEER_BUSDD_HANDIVLASN_UNE_TOLBORGUI_SHILJUULSEN_TOO",
        cell: (info) => info.getValue(),
        header:
          "Төрийн өмч, хөрөнгийг үндэслэлгүйгээр бусдад хандивласан, үнэ төлбөргүй шилжүүлсэн тоо",
        footer: (props) => props.column.id,
      },
      {
        accessorKey:
          "TO_HORONGG_UNDESLLGUIGR_BUSDD_HANDIVLASANGUI_UNE_TOLBORGUI_SHILJUULEN_DUN",
        cell: (info) => info.getValue(),
        header:
          "Төрийн өмч, хөрөнгийг үндэслэлгүйгээр бусдад хандивласан, үнэ төлбөргүй шилжүүлсэн дүн",
        footer: (props) => props.column.id,
      },
      {
        accessorKey:
          "TORIIN_DOLON_ORON_NUTGIIN_OMCH_ED_HORONGIIG_TUREESLUULSEN",
        cell: (info) => info.getValue(),
        header:
          "Төрийн болон орон нутгийн өмч эд хөрөнгийг түрээслүүлсэн, ашиглуулсны төлбөр болон борлуулсны орлогыг дутуу төвлөрүүлсэн, эсхүл төвлөрүүлээгүй тоо",
        footer: (props) => props.column.id,
        size: 250,
      },
      {
        accessorKey:
          "TORIIN_BOLON_ORON_BUTGIIN_OMCH_ED_HORONGIIN_TUREESLUULSEN_ASHIGLUULSNI_TOLBOR",
        cell: (info) => info.getValue(),
        header:
          "Төрийн болон орон нутгийн өмч эд хөрөнгийг түрээслүүлсэн, ашиглуулсны төлбөр болон борлуулсны орлогыг дутуу төвлөрүүлсэн, эсхүл төвлөрүүлээгүй дүн",
        footer: (props) => props.column.id,
        size: 250,
      },
      {
        accessorKey:
          "TSALIN_HOLS_SHAGNAL_URAMSHUULL_TETGEMJIIN_ZORUUTEI_TOOTSOJ_OLGOSON_TOO",
        cell: (info) => info.getValue(),
        header:
          "Цалин хөлс, шагнал урамшуулал, тэтгэмжийг зөрүүтэй тооцож олгосон тоо",
        footer: (props) => props.column.id,
      },
      {
        accessorKey:
          "TSALIN_HOLS_SHAGNAL_TETGEMJIIN_ZORUUTEI_TOOTSOJ_OLGOSON_DUN",
        cell: (info) => info.getValue(),
        header:
          "Цалин хөлс, шагнал урамшуулал, тэтгэмжийг зөрүүтэй тооцож олгосон дүн",
        footer: (props) => props.column.id,
      },
      {
        accessorKey:
          "TOSOWT_TOWLORUULEH_ESTOI_DOLON_TATWAR_BUS_TOSWIN_ORLGIG_DUTUU_TOWLORUULSEN",
        cell: (info) => info.getValue(),
        header:
          "Төсөвт төвлөрүүлэх ёстой татварын болон татварын бус төсвийн орлогыг төсөвт дутуу төвлөрүүлсэн эсвэл төвлөрүүлээгүй тоо",
        footer: (props) => props.column.id,
      },
      {
        accessorKey:
          "TOSOWT_TOWLORUULEH_ESTOI_TATWARIIN_BOLON_TATVARIN_BUS_TOSWIIN_ DUTUU_TOWSOW",
        cell: (info) => info.getValue(),
        header:
          "Төсөвт төвлөрүүлэх ёстой татварын болон татварын бус төсвийн орлогыг төсөвт дутуу төвлөрүүлсэн эсвэл төвлөрүүлээгүй дүн",
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "BTZ_TOOTSOOLSNOOS_UR_DAGAWAR_UUSSEN_TOO",
        cell: (info) => info.getValue(),
        header: "Бүртгэл, тооцоог зөрүүтэй тооцоолсноос үр дагавар үүссэн тоо",
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "BTZ_TOOTSOLSOOS_UR_DAGAWAR_UUSEN_DUN",
        cell: (info) => info.getValue(),
        header: "Бүртгэл, тооцоог зөрүүтэй тооцоолсноос үр дагавар үүссэн дүн",
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "EBE_TOGOTTSON_NORM_NORMATIWG_HETRUULN_ZARTSUULSN_TOO",
        cell: (info) => info.getValue(),
        header:
          "Эрх бүхий этгээдээс тогтоосон норм, нормативыг хэтрүүлэн зарцуулсан тоо",
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "EBE_TOGTOOSN_NORM_NORMATIWG_HETRUULN_ZARTSUULSN_DUN",
        cell: (info) => info.getValue(),
        header:
          "Эрх бүхий этгээдээс тогтоосон норм, нормативыг хэтрүүлэн зарцуулсан дүн",
        footer: (props) => props.column.id,
      },
      {
        accessorKey:
          "TBONO_HORONGIIG_DUTAASAN_UREGDUULSEN_HUULI_BUSAAR_ASHIGLSAN_TOO",
        cell: (info) => info.getValue(),
        header:
          "Төрийн болон орон нутгийн өмч, хөрөнгийг дутаасан үрэгдүүлсэн, хууль бусаар ашигласан тоо",
        footer: (props) => props.column.id,
      },
      {
        accessorKey:
          "TBONO_HORONGIIG_DUTAASAN_UREGDUULSEN_HUUL,_BUSAAR_ASHIGLSAN_DUN",
        cell: (info) => info.getValue(),
        header:
          "Төрийн болон орон нутгийн өмч, хөрөнгийг дутаасан үрэгдүүлсэн, хууль бусаар ашигласан дүн",
        footer: (props) => props.column.id,
      },
      {
        accessorKey:
          "TORIIN_OMCH_TUHAIN_HUUL_ZAASAN_BUSAD_NOHTSOL_BAIDAL_UUSEN_TOO",
        cell: (info) => info.getValue(),
        header:
          "Төрийн аудитын тухай хуулийн 21 дүгээр зүйлийн 21.2-т заасан бусад нөхцөл байдал үүсэн тоо",
        footer: (props) => props.column.id,
      },
      {
        accessorKey:
          "TORIIN_AUDIT_TUHAIN_HUULD_ZAASAN_BUSAD_NOHTSOL_BAIDAL_UUSEN_DUN",
        cell: (info) => info.getValue(),
        header:
          "Төрийн аудитын тухай хуулийн 21 дүгээр зүйлийн 21.2-т заасан бусад нөхцөл байдал үүсэн дүн",
        footer: (props) => props.column.id,
      },
    ],
    []
  );
  let Stat_CM5A = [{}];
  const [data, setData] = React.useState<Stat_CM5A[]>(Stat_CM5A);
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
              "ТАЙЛАНД ОНД ТӨЛБӨРИЙН АКТ ТОГТООСОН ЗӨРЧЛИЙН МЭДЭЭЛЭЛ 3-ТАБСМ-5А"
            }
            widthS={"38rem"}
            widthL={"14rem"}
          />
          <div className="mt-1 ml-1.5">
            <Subtitle mayagtName={"З-ТАБСМ-5А"} />
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
            width: "5000px",
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
                            header.getSize() !== 0
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

export default CM_5A;
