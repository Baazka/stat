import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Title from "./Title";
import { saveIcon } from "../assets/zurag";
import "../pages/Home.css";
import imagebackground from "../assets/zurag/background.png";
import Button from "./Button";
// import Required from "../Required";
// import Required from "./Required";
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

const fuzzySort: SortingFn<any> = (rowA, rowB, columnId) => {
  let dir = 0;

  // Only sort by rank if the column has ranking information
  if (rowA.columnFiltersMeta[columnId]) {
    dir = compareItems(
      rowA.columnFiltersMeta[columnId]?.itemRank!,
      rowB.columnFiltersMeta[columnId]?.itemRank!
    );
  }

  // Provide an alphanumeric fallback for when the item ranks are equal
  return dir === 0 ? sortingFns.alphanumeric(rowA, rowB, columnId) : dir;
};

function Burtgel() {
  const [data, loadData] = useState({});
  const [shalgagdagch, setShalgagdagch] = useState(null);

  return (
    <div
      style={{
        maxHeight: window.innerHeight - 129,
        maxWidth: window.innerWidth,
        overflowY: "scroll",
        padding: "1rem 0 0 1rem",
      }}
    >
      <div
        style={{
          backgroundImage: `url(${imagebackground})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <Title title={"ХУВААРЬ"} widthS={"5rem"} widthL={"5rem"} />
      </div>
      {shalgagdagch === null ? (
        <div className="ml-20 bg-blue-500 w-48 h-10 rounded-lg mt-6">
          <div className="space-y-4">
            <p className="text-white text-center  pt-2">ХУВААРИЙН БҮРТГЭЛ</p>
          </div>
        </div>
      ) : (
        <Burtgel />
      )}

      <div style={{ padding: "8rem 10rem 10rem 16rem" }}>
        <div className="control px-8 text-justify">
          <div className="flex flex-row ">
            <div className="grid grid-rows-4  lg:grid-flow-col md:grid-flow-row sm:grid-flow-row">
              <div className="flex pl-28 pb-6">
                <div className="w-6/12">
                  <label className="block md:text-right md:mb-0 pr-8">
                    <span className="text-xs">Тайлант хугацаа:</span>
                  </label>
                </div>
                <div className="w-6/12">
                  <select
                    className="inputRoundedMetting"
                    onChange={(text) => {}}
                  >
                    1
                    <option key={"Багаар"} value={0}>
                      {""}
                    </option>
                    <option key={"Туршилт 1"} value={1}>
                      {"Туршилт 1"}
                    </option>
                    <option key={"Туршилт 2"} value={2}>
                      {"Туршилт 2"}
                    </option>
                    <option key={"Туршилт 3"} value={3}>
                      {"Туршилт 3"}
                    </option>
                  </select>
                </div>
              </div>
              <div className="flex pl-28">
                <div className="w-6/12">
                  <label className="block md:text-right md:mb-0 pr-8">
                    <span className="text-xs">Баталгаажуулах хугацаа:</span>
                  </label>
                </div>
                <div className="w-6/12">
                  <input
                    type="date"
                    className="inputRoundedMetting"
                    onChange={(e) => {
                      loadData({
                        ...data,
                        ...{
                          FOREGONE_DATE: e.target.value,
                        },
                      });
                    }}
                  />
                </div>
              </div>
              <div className="flex pl-28">
                <div className="w-6/12">
                  <label className="block md:text-right md:mb-0 pr-8">
                    <span className="text-xs">Төрийн аудитын байгууллага:</span>
                  </label>
                </div>
                <div className="w-6/12">
                  <select
                    className="inputRoundedMetting"
                    onChange={(text) => {}}
                  >
                    <option key={"Багаар"} value={0}>
                      {""}
                    </option>
                    <option key={"Батлах 1"} value={1}>
                      {"Туршилт 1"}
                    </option>
                    <option key={"Батлах 2"} value={2}>
                      {"Туршилт 2"}
                    </option>
                    <option key={"Батлах 3"} value={3}>
                      {"Туршилт 3"}
                    </option>
                  </select>
                </div>
              </div>
              <div className="flex pl-28">
                <div className="w-6/12">
                  <label className="block md:text-right md:mb-0 pr-8">
                    <span className="text-xs">Маягтын дугаар:</span>
                  </label>
                </div>
                <div className="w-6/12">
                  <select
                    className="inputRoundedMetting"
                    onChange={(text) => {}}
                  >
                    <option key={"Багаар"} value={0}>
                      {""}
                    </option>
                    <option key={"Батлах 1"} value={1}>
                      {"Туршилт 1"}
                    </option>
                    <option key={"Батлах 2"} value={2}>
                      {"Туршилт 2"}
                    </option>
                    <option key={"Батлах 3"} value={3}>
                      {"Туршилт 3"}
                    </option>
                  </select>
                </div>
              </div>
              <div className="flex pl-28 ml-10">
                <div className="w-6/12">
                  <label className="block md:text-right md:mb-0 pr-8">
                    <span className="text-xs">Баг:</span>
                  </label>
                </div>
                <div className="w-6/12">
                  <input className="border rounded-md" />
                </div>
              </div>
              <div className="flex pl-28 ml-10">
                <div className="w-6/12">
                  <label className="block md:text-right md:mb-0 pr-8">
                    <span className="text-xs">Батлах хэрэглэгч 1:</span>
                  </label>
                </div>
                <div className="w-6/12">
                  <input className="border rounded-lg " />
                </div>
              </div>
              <div className="flex pl-28 ml-10">
                <div className="w-6/12">
                  <label className="block md:text-right md:mb-0 pr-8">
                    <span className="text-xs">Батлах хэрэглэгч 2:</span>
                  </label>
                </div>
                <div className="w-6/12">
                  <input className="border rounded-md" />
                </div>
              </div>
              <div className="flex pl-28 ml-10">
                <div className="w-6/12">
                  <label className="block md:text-right md:mb-0 pr-8">
                    <span className="text-xs">Батлах хэрэглэгч 3:</span>
                  </label>
                </div>
                <div className="w-6/12 ">
                  <input className="border rounded-md" />
                </div>
              </div>
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "end" }}>
            <button className="items-center rounded ml-2 mr-20 mt-20">
              <Button
                Title="Хадгалах"
                Icon={saveIcon}
                action={() => Required()}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Burtgel;
