
import { sortingFns, FilterFn, SortingFn } from "@tanstack/react-table";

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

function Comment() {
  return (
    <>
      <textarea
        placeholder="Commment..."
        style={{
          border: "1px solid gray",
          borderRadius: "8px",
          width: "100%",
          padding: "10px",
        }}
      />
      <button
        className="px-1  items-end "
        style={{
          borderRadius: "5px",
          marginLeft: "40px",
          backgroundColor: "#2684fe",
          color: "White",
          marginRight: "3px",
        }}
      >
        Илгээх
      </button>

      <div
        style={{
          maxHeight: "400px",
          paddingTop: "20px",
        }}
      ></div>
    </>
  );
}
export default Comment;
