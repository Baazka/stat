import "../pages/Home.css";
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
function Comment() {
  // React.useEffect(() => {
  //   fetchData();
  // }, []);
  // function comment() {
  //   DataRequest({
  //     URL: Stat_URL + "ot_comment/",
  //     method: "POST",
  //     data: {
  //       PROCESS_ID: status.ID,
  //       COMMENT_TEXT: commentText,
  //       CREATED_BY: userDetils?.USER_ID,
  //       CREATED_DATE: dateFormat(new Date(), "dd-mmm-yyyy hh:MM:ss"),
  //       ID: null,

  //       // FAS_AUDIT_ID: props.audID,
  //       // DOCUMENT_ID: props.docID,
  //       // CREATED_BY: userDetils?.USER_ID,
  //       // CREATED_DATE: dateFormat(new Date(), "dd-mmm-yy"),
  //     },
  //   })
  //     .then(function (response) {
  //       if (
  //         (response.data?.code === 405 &&
  //           response.data?.result?.errorNum === 6502) ||
  //         (response.data?.code === 405 &&
  //           response.data?.result?.errorNum === 1461)
  //       ) {
  //         alert("сэтгэгдэлийн тэмдэгт хэтэрсэн байна");
  //       } else if (response?.data?.message === "success") {
  //         fetchData();
  //         setCommentText("");
  //       }
  //     })
  //     .catch(function (error) {
  //       alert("системийн алдаа");
  //     });
  // }

  // function deleteComment(value) {
  //   if  (window.confirm("Устгахдаа итгэлтэй байна уу?"))
  //     DataRequest({
  //       URL: Stat_URL + "ot_commentDelete/",
  //       method: "POST",
  //       data: {
  //         ID: value.ID,
  //         CREATED_BY: userDetils.USER_ID,
  //         CREATED_DATE: dateFormat(new Date(), "dd-mmm-yyyy hh:MM:ss"),

  //         // FAS_AUDIT_ID: props.audID,
  //         // DOCUMENT_ID: props.docID,
  //         // CREATED_BY: userDetils?.USER_ID,
  //         // CREATED_DATE: dateFormat(new Date(), "dd-mmm-yy"),
  //       },
  //     });
  //       .then(function (response) {
  //         if (response?.data?.message === "success") {
  //           fetchData();
  //         }
  //       });
  //       .catch(function (error) {
  //         alert("системийн алдаа")
  //       });
  // }
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
