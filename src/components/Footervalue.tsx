import React, { useEffect, useState } from "react";
import "../pages/Home.css";
import {
  sortingFns,
  FilterFn,
  SortingFn,
  useReactTable,
} from "@tanstack/react-table";
import dateFormat from "dateformat";

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
function FooterValue() {
  const [data, loadData] = useState({});

  return (
    <>
      <div className="text-base">
        <div
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <div
            style={{
              marginRight: "0px",
              textAlign: "right",
              marginTop: "0.2rem",
            }}
          >
            Бэлтгэсэн:
          </div>
          <div
            className="border-b-2"
            style={{
              color: "#636363",
              borderRadius: "5px",
              marginRight: "50px",
              marginTop: "0.2rem",
              paddingRight: "20px",
              paddingLeft: "10px",
            }}
          ></div>
        </div>
      </div>

      <div className="text-base">
        <div
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <div
            style={{
              marginRight: "0px",
              textAlign: "right",
              marginTop: "0.2rem",
            }}
          >
            Код:
          </div>
          <div
            className="border-b-2"
            style={{
              color: "#636363",
              borderRadius: "5px",
              marginRight: "50px",
              marginTop: "0.2rem",
              paddingRight: "20px",
              paddingLeft: "10px",
            }}
          ></div>
        </div>
      </div>
      <div className="text-base">
        <div
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <div
            style={{
              marginRight: "0px",
              textAlign: "right",
              marginTop: "0.2rem",
            }}
          >
            Огноо:
          </div>
          <div
            style={{
              color: "#636363",
              paddingLeft: "7px",
              paddingRight: "7px",
              marginTop: "0.2rem",
              border: 10,
            }}
          >
            <input
              className="border-gray-400 border-b-2  text-sm focus:outline-none py-1 h-5 mr-1 pl-2"
              value={dateFormat(data?.CREATED_DATE, "yyyy-mm-dd")}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default FooterValue;
