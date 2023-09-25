import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Title from "./Title";
import { saveIcon } from "../assets/zurag";
import "../pages/Home.css";
import imagebackground from "../assets/zurag/background.png";
import SaveButton from "./SaveButton";
import { sortingFns, FilterFn, SortingFn } from "@tanstack/react-table";
import { Period, Department, Document, Employee } from "../components/library";
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

function Burtgel() {
  const [data, loadData] = useState({});
  const [checker, setChecker] = useState(false);
  const [shalgagdagch, setShalgagdagch] = useState(null);

  return (
    <div
      style={{
        maxHeight: window.innerHeight - 129,
        maxWidth: window.innerWidth,
        overflow: "scroll",
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
      <div className="ml-32 w-10/12 ">
        {/* <Users
          data={data}
          setData={(value: any) => loadData(value)}
          tsonkh={tsonkh}
          setTsonkh={(value: any) => setTsonkh(value)}
        /> */}

        <div
          style={{
            display: "flex row text-base",
            padding: "8rem 0rem 0rem 0rem",
          }}
        >
          <div className="flex  md:justify-center sm:justify-end">
            <div className="flex flex-row">
              <div className="grid grid-rows-4  lg:grid-flow-col md:grid-flow-row sm:grid-flow-row ">
                <div className="flex space-x-40 space-x-reverse">
                  <div className="w-6/12">
                    <label className="block md:text-right md:mb-10  pr-6">
                      <span className="text-md">Тайлант хугацаа:</span>
                    </label>
                  </div>
                  <div className="w-6/12 ">
                    <Period
                      data={data}
                      setData={(value: any) => {
                        loadData(value);
                      }}
                    />
                  </div>
                </div>
                <div className="flex space-x-40 space-x-reverse">
                  <div className="w-6/12">
                    <label className="block md:text-right md:mb-1 pr-6">
                      <span className="text-md">Баталгаажуулах хугацаа:</span>
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
                <div className="flex space-x-40 space-x-reverse">
                  <div className="w-6/12">
                    <label className="block md:text-right md:mb-0 pr-6">
                      <span className="text-md">
                        Төрийн аудитын байгууллага:
                      </span>
                    </label>
                  </div>
                  <div className="w-6/12">
                    <Department
                      data={data}
                      setData={(value: any) => {
                        loadData(value);
                      }}
                    />
                  </div>
                </div>
                <div className="flex space-x-40 space-x-reverse">
                  <div className="w-6/12">
                    <label className="block md:text-right md:mb-0 pr-6">
                      <span className="text-md">Маягтын дугаар:</span>
                    </label>
                  </div>
                  <div className="w-6/12">
                    <Document
                      data={data}
                      setData={(value: any) => {
                        loadData(value);
                      }}
                    />
                  </div>
                </div>
                <div className="flex  space-x-40 space-x-reverse">
                  <div className="w-6/12">
                    <label className="block md:text-right md:mb-0 pr-6">
                      <span className="text-md">Баг:</span>
                    </label>
                  </div>
                  <div className="w-6/12">
                    <Employee
                      data={data}
                      setData={(value: any) => {
                        loadData(value);
                      }}
                    />
                  </div>
                </div>
                <div className="flex  space-x-40 space-x-reverse">
                  <div className="w-6/12">
                    <label className="block md:text-right md:mb-0 pr-6">
                      <span className="text-md">Батлах хэрэглэгч 1:</span>
                    </label>
                  </div>
                  <div className="w-6/12"></div>
                </div>
                <div className="flex  space-x-40 space-x-reverse">
                  <div className="w-6/12">
                    <label className="block md:text-right md:mb-0 pr-6">
                      <span className="text-md">Батлах хэрэглэгч 2:</span>
                    </label>
                  </div>
                  <div className="w-6/12">
                    <textarea className="border rounded-md h-10 text-sm" />
                  </div>
                </div>
                <div className="flex  space-x-40 space-x-reverse">
                  <div className="w-6/12">
                    <label className="block md:text-right md:mb-0 pr-6">
                      <span className="text-md">Батлах хэрэглэгч 3:</span>
                    </label>
                  </div>
                  <div className="w-6/12 ">
                    <textarea className="border rounded-md h-10 text-sm" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "end" }}>
          <button className="md:items-end rounded mr-28 ml-10 mt-20">
            <SaveButton />
          </button>
        </div>
      </div>
    </div>
  );
}
export default Burtgel;
