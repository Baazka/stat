import React, { useEffect, useState } from "react";
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
import DataRequest from "../../functions/make_Request";
import Stat_URL from "../../Stat_URL";
import CurrencyInput from "react-currency-input-field";
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

import {
  RankingInfo,
  rankItem,
  compareItems,
} from "@tanstack/match-sorter-utils";
import { getExportFileBlob } from "../../functions/excel_export";
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




function Mayagt_3(props: any) {
  const mayagtData = props.mayagtData;
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [globalFilter, setGlobalFilter] = React.useState("");

  const columns = React.useMemo(
    () => [
      {
        accessorFn: (row, index) => index + 1,
        accessorKey:"№",
        header:"№",
      },
      {
        accessorKey: "AUDIT_TYPE_NAME",
        cell: (info) => info.getValue(),
        header: "Аудитын төрөл",
        footer: (props) => props.column.id,
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
        accessorKey: "AUDIT_TYPE",
        header: "Аудит хийх хэлбэр",
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
        accessorKey: "IS_ERROR_CONFLICT_NAME",
        header: "Тухайн үр дүнг алдаа зөрчилд тооцох эсэх",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "IS_ZALRUULAH_NAME",
        header: "Алдааг залруулсан эсэх",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "ALD_SHORT_DESC",
        header: "Tовч утга",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "AMOUNT",
        header: "Мөнгөн дүн",
        accessorFn: (row, index) => (
          <div>
         <CurrencyInput
              id="input-example"
              defaultValue={row.AMOUNT}
              decimalsLimit={2}
              disabled
              style={{ textAlign: "center",backgroundColor:'transparent' }}
             />
         </div>
        ),
  
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "IS_SUB_ERROR_CONFLICT_NAME",
        header: "Алдаа зөрчлийн дэд анги",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "UR_UGUUJ_NAME",
        header: "Үр өгөөж тооцох эсэх",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "UR_UGUUJ_TYPE_NAME",
        header: "Үр өгөөжийн төрөл",
        cell: (info) => info.getValue(),
      },
    ],
    []
  );


  const [data, setData] = React.useState([]);

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
  function saveToDB(){
  //   let temp = []
  // //  console.log(saveData,'saveData');
  //    for(let i of saveData){
  //       temp.push(data[i])
  //    }
  //    console.log(temp,'save data');
   DataRequest({
       url: Stat_Url + "BM3IU",
       method: "POST",
       data:{
         // STAT_ID : mayagtData.ID,
        data:data,
        log:data,
        CREATED_BY:userDetils.USER_ID
       }
     })
       .then(function (response) {
         console.log(response.data);
         if(response?.data.message === 'Хадгаллаа.'){
           alert('амжилттай хадгаллаа')
         }
       })
       .catch(function (error) {
         console.log(error,'error');
         alert("Aмжилтгүй");
       });
   }

  // function Draw_input(param: any, cell: any, index: number) {
  //   return (
  //     <div>
  //       {cell.id === "AUDIT_TOROL" ? (
  //         <select
  //           className="border rounded text-sm focus:outline-none py-1 h-8 mr-1 inputRoundedMetting pl-2"
  //           onChange={(text) => {
  //             let any = setFilter;
  //           }}
  //         >
  //           <option className="font-medium" key={"Сонгоно уу"} value={0}>
  //             {"Сонгоно уу"}
  //           </option>
  //           <option
  //             className="font-medium"
  //             key={"Санхүүгийн тайлант аудит"}
  //             value={1}
  //           >
  //             {"Санхүүгийн тайлант аудит"}
  //           </option>
  //           <option
  //             className="font-medium"
  //             key={"Гүйцэтгэлийн аудит"}
  //             value={2}
  //           >
  //             {"Гүйцэтгэлийн аудит"}
  //           </option>
  //           <option className="font-medium" key={"Нийцлийн аудит"} value={3}>
  //             {"Нийцлийн аудит"}
  //           </option>
  //         </select>
  //       ) : cell.id === "AUDIT_HH_HELBER" ? (
  //         <select
  //           className="border rounded text-sm focus:outline-none py-1 h-8 mr-1 inputRoundedMetting pl-2"
  //           onChange={(text) => {
  //             let any = setFilter;
  //           }}
  //         >
  //           <option className="font-medium" key={"Сонгоно уу"} value={0}>
  //             {"Сонгоно уу"}
  //           </option>
  //           <option
  //             className="font-medium"
  //             key={"Санал дүгнэлт гаргах"}
  //             value={1}
  //           >
  //             {"Санал дүгнэлт гаргах"}
  //           </option>
  //           <option
  //             className="font-medium"
  //             key={"Үе шатны ажлыг хэсэгчлэн хийх"}
  //             value={2}
  //           >
  //             {"Үе шатны ажлыг хэсэгчлэн хийх"}
  //           </option>
  //           <option className="font-medium" key={"Аудит хийхгээгүй"} value={3}>
  //             {"Аудит хийхгээгүй"}
  //           </option>
  //         </select>
  //       ) : cell.id === "TOSOW_ZAHIRGCH_ANGILL" ? (
  //         <select
  //           className="border rounded text-sm focus:outline-none py-1 h-8 mr-1 inputRoundedMetting pl-2"
  //           onChange={(text) => {
  //             let any = setFilter;
  //           }}
  //         >
  //           <option className="font-medium" key={"Сонгоно уу"} value={0}>
  //             {"Сонгоно уу"}
  //           </option>
  //           <option className="font-medium" key={"ТЕЗ"} value={1}>
  //             {"ТЕЗ"}
  //           </option>
  //           <option className="font-medium" key={"ТТЗ"} value={2}>
  //             {"ТТЗ"}
  //           </option>
  //           <option className="font-medium" key={"ТШЗ"} value={3}>
  //             {"ТШЗ"}
  //           </option>
  //           <option className="font-medium" key={"Төсөл, хөтөлбөр"} value={4}>
  //             {"Төсөл, хөтөлбөр"}
  //           </option>
  //           <option
  //             className="font-medium"
  //             key={"Засгийн газрын тусгай сан"}
  //             value={5}
  //           >
  //             {"Засгийн газрын тусгай сан"}
  //           </option>
  //           <option className="font-medium" key={"ТБОНӨҮГ"} value={6}>
  //             {"ТБОНӨҮГ"}
  //           </option>
  //         </select>
  //       ) : cell.id === "TUHAIN_UR_DUNG_AZTE" ? (
  //         <select
  //           className="border rounded text-sm focus:outline-none py-1 h-8 mr-1 inputRoundedMetting pl-2"
  //           onChange={(text) => {
  //             let any = setFilter;
  //           }}
  //         >
  //           <option className="font-medium" key={"Сонгоно уу"} value={0}>
  //             {"Сонгоно уу"}
  //           </option>
  //           <option className="font-medium" key={"Үгүй"} value={1}>
  //             {"Үгүй"}
  //           </option>
  //           <option className="font-medium" key={"Алдаа"} value={2}>
  //             {"Алдаа"}
  //           </option>
  //           <option className="font-medium" key={"Зөрчил"} value={3}>
  //             {"Зөрчил"}
  //           </option>
  //         </select>
  //       ) : cell.id === "ALDAAG_ZALRUULSAN_ESEH" ? (
  //         <select
  //           className="border rounded text-sm focus:outline-none py-1 h-8 mr-1 inputRoundedMetting pl-2"
  //           onChange={(text) => {
  //             let any = setFilter;
  //           }}
  //         >
  //           <option className="font-medium" key={"Сонгоно уу"} value={0}>
  //             {"Сонгоно уу"}
  //           </option>
  //           <option className="font-medium" key={"Залруулсан"} value={1}>
  //             {"Залруулсан"}
  //           </option>
  //           <option className="font-medium" key={"Залруулаагүй"} value={2}>
  //             {"Залруулаагүй"}
  //           </option>
  //         </select>
  //       ) : cell.id === "ALDAA_ZORCHILIIN_DED_ANGI" ? (
  //         <select
  //           className="border-gray-400 rounded text-sm focus:outline-none py-1 h-8 mr-1 inputRoundedMetting pl-2 font-normal"
  //           onChange={(text) => {
  //             let any = setFilter;
  //           }}
  //         >
  //           <option className="font-medium" key={"Сонгоно уу"} value={0}>
  //             {"Сонгоно уу"}
  //           </option>
  //           <option
  //             className="font-medium"
  //             key={"Математик тооцоололтой холбоотой"}
  //             value={0}
  //           >
  //             {"Математик тооцоололтой холбоотой"}
  //           </option>
  //           <option
  //             className="font-medium"
  //             key={"НББ-ийн бодлогын буруу хэрэгжүүлсэнтэй холбоотой"}
  //             value={1}
  //           >
  //             {"НББ-ийн бодлогын буруу хэрэгжүүлсэнтэй холбоотой"}
  //           </option>
  //           <option
  //             className="font-medium"
  //             key={"Мэдээллийг тусгахгүй орхигдуулсантай холбоотой"}
  //             value={2}
  //           >
  //             {"Мэдээллийг тусгахгүй орхигдуулсантай холбоотой"}
  //           </option>
  //           <option
  //             className="font-medium"
  //             key={"Буруу тусган илэрхийлсэнтэй холбоотой"}
  //             value={1}
  //           >
  //             {"Буруу тусган илэрхийлсэнтэй холбоотой"}
  //           </option>
  //           <option className="font-medium" key={"Бусад"} value={2}>
  //             {"Бусад"}
  //           </option>
  //         </select>
  //       ) : cell.id === "UR_OGOOJ_TOOTSOH_ESEH" ? (
  //         <select
  //           className="border-gray-400 rounded text-sm focus:outline-none py-1 h-8 mr-1 inputRoundedMetting pl-2 font-normal"
  //           onChange={(text) => {
  //             let any = setFilter;
  //           }}
  //         >
  //           <option className="font-medium" key={"Сонгоно уу"} value={0}>
  //             {"Сонгоно уу"}
  //           </option>
  //           <option className="font-medium" key={"Тийм"} value={0}>
  //             {"Тийм"}
  //           </option>
  //           <option className="font-medium" key={"Үгүй"} value={1}>
  //             {"Үгүй"}
  //           </option>
  //         </select>
  //       ) : cell.id === "UR_OGOOJIIN_TOROL" ? (
  //         <select
  //           className="border-gray-400 rounded text-sm focus:outline-none py-1 h-8 mr-1 inputRoundedMetting pl-2 font-normal"
  //           onChange={(text) => {
  //             let any = setFilter;
  //           }}
  //         >
  //           <option className="font-medium" key={"Сонгоно уу"} value={0}>
  //             {"Сонгоно уу"}
  //           </option>
  //           <option className="font-medium" key={"Санхүүгийн"} value={0}>
  //             {"Санхүүгийн"}
  //           </option>
  //           <option className="font-medium" key={"Санхүүгийн бус"} value={1}>
  //             {"Санхүүгийн бус"}
  //           </option>
  //         </select>
  //       ) : cell.id === "" || cell.id === "" ? (
  //         <input
  //           type="date"
  //           value={dateFormat(param.row.original[cell.id], "yyyy-mm-dd")}
  //           onChange={(e) => {
  //             let temp = data;
  //             //@ts-ignore
  //             temp[index][cell.id] = dateFormat(e.target.value, "yyyy-mm-dd");
  //             // @ts-ignore
  //             setData([...temp]);
  //           }}
  //         />
  //       ) : cell.id === "" ? (
  //         <textarea
  //           value={param.row.original[cell.id]}
  //           className={
  //             index % 2 > 0
  //               ? "flex text-center h-8 bg-gray-100"
  //               : "flex text-center h-8"
  //           }
  //           style={{
  //             minHeight: "33px",
  //             border: "1px solid",
  //             borderRadius: "4px",
  //             color: "gray",
  //           }}
  //           onChange={(e) => {
  //             let temp = data;
  //             //@ts-ignore
  //             temp[index][cell.id] = e.target.value;
  //             // @ts-ignore
  //             setData([...temp]);
  //           }}
  //         />
  //       ) : null}
  //     </div>
  //   );
  // }

  useEffect(() => {
    fetchData();
  }, [props.mayagtData]);

  async function fetchData() {
    DataRequest({
      url: Stat_URL + "BM3List",
      method: "POST",
      data: {
        PERIOD_LABEL:2021, //PERIOD_LABEL
        DEPARTMENT_ID:101
      },
    })
      .then(function (response) {
        console.log(response);
        if (response.data !== undefined && response?.data.length>0) {
           setData(response.data);
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
          title={"ТАЙЛАНТ ОНЫ АЛДААНЫ БҮРТГЭЛ З-ТАББМ-3"}
          widthS={"20rem"}
          widthL={"10rem"}
        />
        <div className="flex justify-between mb-2 ">
          <div style={{ height: 28 }} className="flex flex-row  cursor-pointer">
          <ButtonSearch  globalFilter={globalFilter} setGlobalFilter={(value)=> setGlobalFilter(value)}/>
          <button
          onClick={() => {
            getExportFileBlob(columns,data,'З-ТАББМ-3')
          }}
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
        <div style={{ display: "flex", justifyContent: "end" }}>
        <ButtonSave saveToDB = {()=>saveToDB()}/>
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
                {table.getState().pagination.pageIndex + 1}{" - "}
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

export default Mayagt_3;
