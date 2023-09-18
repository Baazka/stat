import React, { useEffect, useState } from "react";
import {
  useNavigate,
  createHashRouter,
  RouterProvider,
} from "react-router-dom";
import Title from "../Title";
import { excel } from "../../assets/zurag";
import "../../pages/Home.css";
import Comment from "../comment";
import FooterValue from "../Footervalue";
import dateFormat from "dateformat";
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

const data = [
  [
    {
      value: "№",
      fontWeight: "bold",
      align: "center",
      backgroundColor: "#aabbcc",
      position: "sticky",
      style: { width: { wpx: 200 } },
    },
    {
      width: "60px",

      value: "배송 무게(Kg)",
      position: "sticky",
      fontWeight: "bold",
      align: "center",

      backgroundColor: "#aabbcc",
    },
    {
      value: "배송비",
      position: "sticky",
      fontWeight: "bold",
      align: "center",

      backgroundColor: "#aabbcc",
    },
    {
      value: "배송 무게(Kg)",
      position: "sticky",
      fontWeight: "bold",
      align: "center",
      wrap: true,

      backgroundColor: "#aabbcc",
    },

    {
      value: "배송비",
      position: "sticky",
      fontWeight: "bold",
      align: "center",

      backgroundColor: "#aabbcc",
    },
  ],
  [
    {
      value: 20,
      width: "60px",
      align: "center",
    },
    {
      value: 6600,
      width: 500,
      align: "center",
    },
    {
      value: 2000,

      align: "center",
    },
    {
      value: 660,
      align: "center",
    },
  ],
];
function Excel() {
  const exportSheet = () => {
    writeXlsxFile(data, {
      headerStyle: {
        backgroundColor: "#aabbcc",
        height: 23,
        fontWeight: "bold",
        position: "sticky",
        fontSize: 13,
        align: "center",
        wrap: true,
      },
      fileName: "sample.xlsx",
    });
  };
  return (
    <div className="App">
      <button
        onClick={exportSheet}
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

const now = new Date();

type Stat_m2 = {
  AUDIT_TOROL: string;
  AUDIT_NER_SEDEV: string;
  AUDIT_KOD: string;
  HOSLUULAN_GUITSETGEH_ESEH: string;
  SEDVIIN_UNDESLL: string;
  TOSOW_ZAHIRGCH_ANGILL: string;
  AUDIT_HH_BAI_TOROL: string;
  AUDIT_HH_BAI_NEGJ_NER: string;
  AUDIT_HH_BAI_TOROL_NN: string;
  BAIGUULLGUG_TROL: string;
  SHALGAGDAGCH_BAIGUULLAGIN_NR: string;
  REGISTER: number;
  TOSOW_ZAHIRAGCH_ANGILAL: string;
  BAI_UIL_AJIL_UNDSEN_CHIGLL: string;
};
function Mayagt_2() {
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );

  const [globalFilter, setGlobalFilter] = React.useState("");

  const columns = React.useMemo<ColumnDef<Stat_m2, any>[]>(
    () => [
      {
        accessorFn: (row, index) => index + 1,
        id: "№",
      },
      {
        accessorKey: "AUDIT_TOROL",
        cell: (info) => info.getValue(),
        header: () => "Аудитын төрөл",
      },
      {
        accessorKey: "AUDIT_NER_SEDEV",
        header: () => "Аудитын нэр, сэдэв",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "AUDIT_KOD",
        header: () => "Аудитын код",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "HOSLUULAN_GUITSETGEH_ESEH",
        header: () => "Хослуулан гүйцэтгэсэн эсэх",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "SEDVIIN_UNDESLL",
        header: "Сэдвийн үндэслэл",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "AUDIT_HH_HELBER",
        header: "Аудит хийх хэлбэр",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "AUDIT_HH_BAI_TOROL",
        header: "Аудит хийх байгууллагын төрөл",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "AUDIT_HH_NEGJ_NER",
        header: "Аудит хийх нэгжийн нэр",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "AUDIT_HH_BAI_TOROL_NN",
        header: "Аудит хийх байгууллага, нэгжийн нэр",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "BAIGUULLGUG_TROL",
        header: () => "Байгууллагын төрөл",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "SHALGAGDAGCH_BAIGUULLAGIN_NR",
        header: () => "Шалгагдагч байгууллагын нэр",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "REGISTER",
        header: "Регистрийн дугаар",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "TOSOW_ZAHIRAGCH_ANGILAL",
        header: "Төсөв захирагчийн ангилал",
        cell: (info) => info.getValue(),
      },

      {
        accessorKey: "BAI_UIL_AJIL_UNDSEN_CHIGLL",
        header: "Салбарын харьяалал",
        cell: (info) => info.getValue(),
      },
    ],
    []
  );

  let Stat_m2 = [{}];
  const [data, setData] = React.useState<Stat_m2[]>(Stat_m2);
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
  //       ) : cell.id === "HOSLUULAN_GUITSETGEH_ESEH" ? (
  //         <select
  //           className="border rounded text-sm focus:outline-none py-1 h-8 mr-1 inputRoundedMetting pl-2 "
  //           onChange={(text) => {
  //             let any = setFilter;
  //           }}
  //         >
  //           <option className="font-medium" key={"Сонгоно уу"} value={0}>
  //             {"Сонгоно уу"}
  //           </option>
  //           <option className="font-medium" key={"Тийм"} value={1}>
  //             {"Тийм"}
  //           </option>
  //           <option className="font-medium" key={"Үгүй"} value={2}>
  //             {"Үгүй"}
  //           </option>
  //         </select>
  //       ) : cell.id === "SEDVIIN_UNDESLL" ? (
  //         <select
  //           className="border rounded text-sm focus:outline-none py-1 h-8 mr-1 inputRoundedMetting pl-2"
  //           onChange={(text) => {
  //             let any = setFilter;
  //           }}
  //         >
  //           <option className="font-medium" key={"Сонгоно уу"} value={0}>
  //             {"Сонгоно уу"}
  //           </option>
  //           <option className="font-medium" key={"Хуулийн дагуу"} value={1}>
  //             {"Хуулийн дагуу"}
  //           </option>
  //           <option className="font-medium" key={"Бодлогоор"} value={2}>
  //             {"Бодлогоор"}
  //           </option>
  //           <option className="font-medium" key={"Төлөвлөгөөт бус"} value={3}>
  //             {"Төлөвлөгөөт бус"}
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
  //       ) : cell.id === "AUDIT_HH_BAI_TOROL" ? (
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
  //             key={"Төрийн аудитын байгууллага"}
  //             value={1}
  //           >
  //             {"Төрийн аудитын байгууллага"}
  //           </option>
  //           <option
  //             className="font-medium"
  //             key={"Аудитын хуулийн этгээд"}
  //             value={2}
  //           >
  //             {"Аудитын хуулийн этгээд"}
  //           </option>
  //         </select>
  //       ) : cell.id === "BAIGUULLGUG_TROL" ? (
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
  //             key={"Санхүүгийн тайлангийн аудит"}
  //             value={1}
  //           >
  //             {"Төрийн аудитын байгууллага"}
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
  //       ) : cell.id === "TOSOW_ZAHIRAGCH_ANGILAL" ? (
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
  //       ) : cell.id === "BAI_UIL_AJIL_UNDSEN_CHIGLL" ? (
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
  //             key={"А-Хөдөө аж ахуй, ойн ахуй, загас барилт, ан агнуур"}
  //             value={1}
  //           >
  //             {"А-Хөдөө аж ахуй, ойн ахуй, загас барилт, ан агнуур"}
  //           </option>
  //           <option
  //             className="font-medium"
  //             key={"В-Уул уурхай, олборлолт"}
  //             value={2}
  //           >
  //             {"C-Боловсруулах үйлдвэр"}
  //           </option>
  //           <option
  //             className="font-medium"
  //             key={"C-Боловсруулах үйлдвэр"}
  //             value={3}
  //           >
  //             {"C-Боловсруулах үйлдвэр"}
  //           </option>
  //           <option
  //             className="font-medium"
  //             key={"D-Цахилгаан, хий, уур, агааржуулалт"}
  //             value={4}
  //           >
  //             {"D-Цахилгаан, хий, уур, агааржуулалт"}
  //           </option>
  //           <option
  //             className="font-medium"
  //             key={
  //               "E-Ус хангамж, сувагжилтын систем, хог хаягдал зайлуулах болон хүрээлэн буй орчныг дахин сэргээх үйл ажиллагаа"
  //             }
  //             value={5}
  //           >
  //             {
  //               "E-Ус хангамж, сувагжилтын систем, хог хаягдал зайлуулах болон хүрээлэн буй орчныг дахин сэргээх үйл ажиллагаа"
  //             }
  //           </option>
  //           <option className="font-medium" key={"F-Барилга"} value={6}>
  //             {"F-Барилга"}
  //           </option>
  //           <option
  //             className="font-medium"
  //             key={
  //               "G-Бөөний болон жижиглэн худалдаа, машин, мотоциклийн засвар үйлчилгээ"
  //             }
  //             value={7}
  //           >
  //             {
  //               "G-Бөөний болон жижиглэн худалдаа, машин, мотоциклийн засвар үйлчилгээ"
  //             }
  //           </option>
  //           <option
  //             className="font-medium"
  //             key={"H-Тээвэр, агуулахын үйл ажиллагаа"}
  //             value={8}
  //           >
  //             {"H-Тээвэр, агуулахын үйл ажиллагаа"}
  //           </option>
  //           <option
  //             className="font-medium"
  //             key={"I-Зочид буудал, байр, сууц болон нийтийн хоолны үйлчилгээ"}
  //             value={9}
  //           >
  //             {"I-Зочид буудал, байр, сууц болон нийтийн хоолны үйлчилгээ"}
  //           </option>
  //           <option
  //             className="font-medium"
  //             key={"J-Мэдээлэл, холбоо"}
  //             value={10}
  //           >
  //             {"J-Мэдээлэл, холбоо"}
  //           </option>
  //           <option
  //             className="font-medium"
  //             key={"K-Санхүүгийн болон даатгалын үйл ажиллагаа"}
  //             value={11}
  //           >
  //             {"K-Санхүүгийн болон даатгалын үйл ажиллагаа"}
  //           </option>
  //           <option
  //             className="font-medium"
  //             key={"L-Үл хөдлөх хөрөнгийн үйл ажиллагаа"}
  //             value={12}
  //           >
  //             {"L-Үл хөдлөх хөрөнгийн үйл ажиллагаа"}
  //           </option>
  //           <option
  //             className="font-medium"
  //             key={"М-Мэргэжлийн, шинжлэх ухаан болон техникийн үйл ажиллагаа"}
  //             value={13}
  //           >
  //             {"М-Мэргэжлийн, шинжлэх ухаан болон техникийн үйл ажиллагаа"}
  //           </option>
  //           <option
  //             className="font-medium"
  //             key={"N-Удирдлагын болон дэмжлэг үзүүлэх үйл ажиллагаа"}
  //             value={14}
  //           >
  //             {"N-Удирдлагын болон дэмжлэг үзүүлэх үйл ажиллагаа"}
  //           </option>
  //           <option
  //             className="font-medium"
  //             key={
  //               "О-Төрийн удирдлага, батлан хамгаалах үйл ажиллагаа, албан журмын нийгмийн хамгаалал"
  //             }
  //             value={16}
  //           >
  //             {
  //               "О-Төрийн удирдлага, батлан хамгаалах үйл ажиллагаа, албан журмын нийгмийн хамгаалал"
  //             }
  //           </option>
  //           <option className="font-medium" key={"Р-Боловсрол"} value={17}>
  //             {"Р-Боловсрол"}
  //           </option>
  //           <option
  //             className="font-medium"
  //             key={"Q-Хүний эрүүл иэнд, нийгмийн халамжийн үйл ажиллагаа"}
  //             value={18}
  //           >
  //             {"Q-Хүний эрүүл иэнд, нийгмийн халамжийн үйл ажиллагаа"}
  //           </option>
  //           <option
  //             className="font-medium"
  //             key={"R-Урлаг, үзвэр, тоглоом наадам"}
  //             value={19}
  //           >
  //             {"R-Урлаг, үзвэр, тоглоом наадам"}
  //           </option>
  //           <option
  //             className="font-medium"
  //             key={"S-Үйлчилгээний бусад үйл ажиллагаа"}
  //             value={20}
  //           >
  //             {"S-Үйлчилгээний бусад үйл ажиллагаа"}
  //           </option>
  //           <option
  //             className="font-medium"
  //             key={
  //               "Т-Хүн хөлслөн ажиллуулдаг өрхийн үйл ажиллагаа; өрхийн өөрийн хэрэглээнд зориулан үйлдвэрлэгдсэн, нэр төрлөөр нь тодорхойлох боломжгүй бүтээгдэхүүн үйлчилгээ"
  //             }
  //             value={21}
  //           >
  //             {
  //               "Т-Хүн хөлслөн ажиллуулдаг өрхийн үйл ажиллагаа; өрхийн өөрийн хэрэглээнд зориулан үйлдвэрлэгдсэн, нэр төрлөөр нь тодорхойлох боломжгүй бүтээгдэхүүн үйлчилгээ"
  //             }
  //           </option>
  //           <option
  //             className="font-medium"
  //             key={
  //               "U-Олон улсын байгууллага, суурин төлөөлөгчийн үйл ажиллагаа"
  //             }
  //             value={22}
  //           >
  //             {"U-Олон улсын байгууллага, суурин төлөөлөгчийн үйл ажиллагаа"}
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
  //       ) : cell.id === "AUDIT_NER_SEDEV" ||
  //         cell.id === "AUDIT_KOD" ||
  //         cell.id === "AUDIT_HH_NEGJ_NER" ||
  //         cell.id === "AUDIT_HH_BAI_TOROL_NN" ||
  //         cell.id === "SHALGAGDAGCH_BAIGUULLAGIN_NR" ||
  //         cell.id === "REGISTER" ? (
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
          padding: "0.5rem 0 0 1rem",
        }}
      >
        <Title
          title={
            "ТАЙЛАНТ ОНЫ ШАЛГАГДАГЧ ЭТГЭЭД БОЛОН АУДИТАД ХАМРАГДАГЧИЙИН БҮРТГЭЛ З-ТАББМ-2"
          }
          widthS={"39rem"}
          widthL={"20rem"}
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

export default Mayagt_2;
