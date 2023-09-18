import axios from "axios";

async function DataRequest(param: any) {
  try {
    return await axios({
      method: param.method, //put
      url: param.url,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      data: param.data,
    });
  } catch (error) {}
}
export default DataRequest;
// const columns = React.useMemo(
//   () => [
//     {
//       Header: "№",
//       accessor: (row, i) => i + 1,
//       width: 50,
//       algin: "Center",
//     },
//     {
//       Header: "Тайлант хугацаа",
//       accessor: "TAILANT_HUGATSAA",
//       width: 125,
//       algin: "Center",
//     },
//     {
//       Header: "Баталгаажуулах хугацаа",
//       accessor: "BATALGAAJUULAH_H",
//       width: 145,
//       algin: "Center",
//     },
//     {
//       Header: "Төрийн аудитын байгууллага",
//       accessor: "TORIIN_AB",
//       width: 165,
//       algin: "Center",
//     },
//     {
//       Header: "Маягтын дугаар",
//       accessor: "MAYGTIIN_DUGAAR",
//       width: 125,
//       algin: "Center",
//     },
//     {
//       Header: "Баг",
//       accessor: "BAG",
//       width: 100,
//       algin: "Center",
//     },
//     {
//       Header: "Батлах 1",
//       accessor: "BATLAH_1",
//       width: 100,
//       algin: "Center",
//     },
//     {
//       Header: "Батлах 2",
//       accessor: "BATLAH_2",
//       width: 100,
//       algin: "Center",
//     },

//     {
//       Header: "Батлах 3",
//       accessor: "BATLAH_3",
//       width: 100,
//       algin: "Center",
//     },
//     {
//       Header: "Төлөх",
//       accessor: "TOLOH",
//       width: 100,
//       algin: "Center",
//     },
//     //
//     {
//       Header: "Гүйцэтгэлийн хувь",
//       accessor: "GUITSETGELIIN_HUWI",
//       width: 145,
//       algin: "Center",
//     },
//     {
//       Header: "Бүртгэсэн огноо",
//       accessor: "BURTGSEN_OGNOO",
//       width: 145,
//       algin: "Center",
//     },
//     {
//       Header: "Бүртгэсэн хэрэглэгч",
//       accessor: "BURTGESEN",
//       width: 145,
//       algin: "Center",
//     },
//     {
//       Header: "Бүртгэсэн хэрэглэгч",
//       accessor: "URTGESEN_H",
//       width: 145,
//       algin: "Center",
//     },
//     {
//       Header: "Үйлдэл", // Header: "Аудитын үе шат",
//       accessor: (row) => (
//         <div class="flex justify-start" style={{ width: "120px" }}>
//           <button
//             class="bg-transparent text-xs"
//             type="button"
//             style={{
//               padding: "2px",
//               boxShadow: "0px 0px 0px 1px rgba(	38,132,254,0.3)",
//               borderRadius: "4px",
//               marginRight: "6px",
//             }}
//           >
//             <img
//               src={eye}
//               onClick={() => {
//                 localStorage.removeItem("Mayagt");
//                 history.push("/web/Home/form");
//                 localStorage.setItem("Mayagt", JSON.stringify(row));
//               }}
//               width="16px"
//               height="16px"
//               style={{
//                 webkituserselect: "none",
//                 khtmluserselect: "none",
//                 webkittouchcallout: "none",
//                 mozuserselect: "none",
//                 ouserselect: "none",
//                 userselect: "none",
//               }}
//               alt=""
//             />
//           </button>
//           <button
//             class="bg-transparent text-xs"
//             type="button"
//             style={{
//               padding: "2px",
//               boxShadow: "0px 0px 0px 1px rgba(	38,132,254,0.3)",
//               borderRadius: "4px",
//               marginRight: "6px",
//             }}
//           >
//             <img
//               src={editPencil}
//               width="14px"
//               height="14px"
//               style={{
//                 webkituserselect: "none",
//                 khtmluserselect: "none",
//                 webkittouchcallout: "none",
//                 mozuserselect: "none",
//                 ouserselect: "none",
//                 userselect: "none",
//               }}
//               alt=""
//             />
//           </button>
//           <button
//             class="bg-transparent text-xs"
//             type="button"
//             style={{
//               padding: "2px",
//               boxShadow: "0px 0px 0px 1px rgba(	38,132,254,0.3)",
//               borderRadius: "4px",
//               marginRight: "6px",
//             }}
//           >
//             <img
//               src={printIcon}
//               width="14px"
//               height="14px"
//               style={{
//                 webkituserselect: "none",
//                 khtmluserselect: "none",
//                 webkittouchcallout: "none",
//                 mozuserselect: "none",
//                 ouserselect: "none",
//                 userselect: "none",
//               }}
//               alt=""
//             />
//           </button>
//           {UserPremission(userDetils.USER_TYPE_NAME, "HUVAARI") ? (
//             <button
//               class="bg-transparent text-xs"
//               type="button"
//               style={{
//                 padding: "2px",
//                 boxShadow: "0px 0px 0px 1px rgba(	38,132,254,0.3)",
//                 borderRadius: "4px",
//                 marginRight: "6px",
//               }}
//             >
//               <img
//                 src={xIcon}
//                 onClick={() => {
//                   deletePlan(row);
//                 }}
//                 width="14px"
//                 height="14px"
//                 style={{
//                   webkituserselect: "none",
//                   khtmluserselect: "none",
//                   webkittouchcallout: "none",
//                   mozuserselect: "none",
//                   ouserselect: "none",
//                   userselect: "none",
//                 }}
//                 alt=""
//               />
//             </button>
//           ) : null}
//           <div
//             style={{
//               position: "relative",
//               padding: "2px",
//               boxShadow: "0px 0px 0px 1px rgba(	38,132,254,0.3)",
//               marginRight: "6px",
//               borderRadius: "4px",
//               width: "22px",
//               textAlignLast: "center",
//             }}
//           >
//             <div
//               style={{
//                 position: "absolute",
//                 height: "35px",
//                 width: "30px",
//               }}
//             ></div>
//             <span
//               style={{
//                 color: "red",
//               }}
//             >
//               {row.COMMENT_COUNT}
//             </span>
//           </div>
//         </div>
//       ),
//       width: 130,
//     },
//   ],
//   []
// );
