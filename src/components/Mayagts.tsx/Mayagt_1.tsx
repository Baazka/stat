import React, { useEffect, useState } from "react";
import Title from "../Title";
import "../../pages/Home.css";
import Comment from "../comment";
import FooterValue from "../Footervalue";
import ButtonConfirm from "../ButtonConfirm";
import ButtonRequest from "../ButtonRequest";
import Stat_Url from "../../Stat_URL";
import ButtonSearch from "../ButtonSearch";
import ButtonSave from "../SaveButton";
import { excel } from "../../assets/zurag";
import CurrencyInput from "react-currency-input-field";
import { getExportFileBlob } from "../../functions/excel_export";
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
import DataRequest from "../../functions/make_Request";
import { RankingInfo, rankItem } from "@tanstack/match-sorter-utils";
import { read, writeFileXLSX,utils } from "xlsx";

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

// function Excel() {
//   const objects = [0];

//   const schema = [
//     {
//       column: "№",
//       Sticky: true,
//       type: Number,
//       width: 5,
//       value: (student: any) => student.N,
//     },
//     {
//       column: "Аудитын он",
//       wrap: true,
//       sticky: true,
//       position: "sticky",
//       state: "frozen",
//       width: 30,
//       type: String,
//       value: (student: any) => student.Status,
//     },
//     {
//       column: "Аудитын төрөл",
//       wrap: true,
//       sticky: true,
//       position: "sticky",
//       state: "frozen",
//       width: 30,
//       type: String,
//       value: (student: any) => student.Name,
//     },
//     {
//       column: "Аудитын нэр, сэдэв",
//       wrap: true,
//       width: 30,
//       type: String,
//       value: (student: any) => student.Name,
//     },
//     {
//       column: "Аудитын код",
//       wrap: true,
//       width: 30,
//       type: String,
//       value: (student: any) => student.Name,
//     },
//     {
//       column: "Албан шаардлагын огноо",
//       wrap: true,
//       width: 30,
//       type: String,
//       value: (student: any) => student.Name,
//     },
//     {
//       column: "Албан шаардлагын дугаар",
//       wrap: true,
//       sticky: "top-0",
//       width: 30,
//       type: String,
//       value: (student: any) => student.Name,
//     },
//     {
//       column: "Хүлээлгэн өгсөн огноо",
//       wrap: true,
//       sticky: "top-0",
//       width: 30,
//       type: String,
//       value: (student: any) => student.Name,
//     },
//     {
//       column: "Зөрчлийг арилгах огноо",
//       wrap: true,
//       sticky: "top-0",
//       width: 30,
//       type: String,
//       value: (student: any) => student.Name,
//     },
//     {
//       column: "Зөрчлийн товч утга",
//       wrap: true,
//       sticky: "top-0",
//       width: 30,
//       type: String,
//       value: (student: any) => student.Name,
//     },
//     {
//       column: "Тухайн үр дүнг алдаа зөрчилд тооцох эсэх",
//       wrap: true,
//       sticky: "top-0",
//       width: 30,
//       type: String,
//       value: (student: any) => student.Name,
//     },
//     {
//       column: "Алдаа, зөрчлийн ангилал",
//       wrap: true,
//       sticky: "top-0",
//       width: 30,
//       type: String,
//       value: (student: any) => student.Name,
//     },
//     {
//       column: "Албан шаардлагын дүн (төгрөг)",
//       wrap: true,
//       sticky: "top-0",
//       width: 30,
//       type: String,
//       value: (student: any) => student.Name,
//     },
//     {
//       column: "Төвлөрүүлэх дансны төрөл (төгрөг)",
//       wrap: true,
//       sticky: "top-0",
//       width: 30,
//       type: String,
//       value: (student: any) => student.Name,
//     },
//     {
//       column: "Шалгагдагч байгууллагын нэр",
//       wrap: true,
//       sticky: "top-0",
//       width: 30,
//       type: String,
//       value: (student: any) => student.Name,
//     },
//     {
//       column: "Регистрийн дугаар",
//       wrap: true,
//       sticky: "top-0",
//       width: 30,
//       type: String,
//       value: (student: any) => student.Name,
//     },
//     {
//       column: "Төсөв захирагчийн ангилал",
//       wrap: true,
//       sticky: "top-0",
//       width: 30,
//       type: String,
//       value: (student: any) => student.Name,
//     },
//     {
//       column: "Овог, нэр",
//       wrap: true,
//       sticky: "top-0",
//       width: 30,
//       type: String,
//       value: (student: any) => student.Name,
//     },
//     {
//       column: "Албан тушаал",
//       wrap: true,
//       sticky: "top-0",
//       width: 30,
//       type: String,
//       value: (student: any) => student.Name,
//     },
//     {
//       column: "Аудиторын код",
//       wrap: true,
//       sticky: "top-0",
//       width: 30,
//       type: String,
//       value: (student: any) => student.Name,
//     },
//     {
//       column: "Зөрчлийг арилгасан баримтын огноо",
//       wrap: true,
//       sticky: "top-0",
//       width: 30,
//       type: String,
//       value: (student: any) => student.Name,
//     },
//     {
//       column: "Биелсэн албан шаардлагын дүн (төгрөг)",
//       wrap: true,
//       sticky: "top-0",
//       width: 30,
//       type: String,
//       value: (student: any) => student.Name,
//     },
//     {
//       column: "Бүртгэлээс хасагдсан дүн (төгрөг)",
//       wrap: true,
//       sticky: "top-0",
//       width: 30,
//       type: String,
//       value: (student: any) => student.Name,
//     },
//     {
//       column: "Бүртгэлээс хасагдсан огноо",
//       wrap: true,
//       sticky: "top-0",
//       width: 30,
//       type: String,
//       value: (student: any) => student.Name,
//     },
//     {
//       column: "Бүртгэлээс хасагдсан дугаар",
//       wrap: true,
//       sticky: "top-0",
//       width: 30,
//       type: String,
//       value: (student: any) => student.Name,
//     },
//     {
//       column: "Хугацааны төлөв",
//       wrap: true,
//       sticky: "top-0",
//       width: 30,
//       type: String,
//       value: (student: any) => student.Name,
//     },
//     {
//       column: "Эрх бүхий байгууллагад шилжүүлсэн эсэх ",
//       wrap: true,
//       sticky: "top-0",
//       width: 30,
//       type: String,
//       value: (student: any) => student.Name,
//     },
//     {
//       column: "Үр өгөөжийн төрөл",
//       wrap: true,
//       sticky: "top-0",
//       width: 30,
//       type: String,
//       value: (student: any) => student.Name,
//     },
//     {
//       column: "Үр өгөөжөөр тооцсон эсэх",
//       wrap: true,
//       sticky: "top-0",
//       width: 30,
//       type: String,
//       value: (student: any) => student.Name,
//     },
//     {
//       column: "Төлөвлөсөн санхүүгийн үр өгөөжийн дүн (төгрөг)",
//       wrap: true,
//       sticky: "top-0",
//       width: 30,
//       type: String,
//       value: (student: any) => student.Name,
//     },
//     {
//       column: "санхүүгийн үр өгөөжийн дүн (төгрөг)",
//       wrap: true,
//       sticky: "top-0",
//       width: 30,
//       type: String,
//       value: (student: any) => student.Name,
//     },

//     // {
//     //   column: "Name",
//     //   type: String,
//     //   value: (student) => student.Name,
//     // },
//     // {
//     //   column: "Cost",
//     //   type: Number,
//     //   format: "#,##0.00",
//     //   value: (student) => student.cost,
//     // },
//     // {
//     //   column: "Paid",
//     //   type: Boolean,
//     //   value: (student) => student.paid,
//     // },
//   ];



//   //   writeXlsxFile(objects, {
//   //     schema,
//   //     headerStyle: {
//   //       backgroundColor: "#aabbcc",
//   //       fontWeight: "bold",
//   //       fontSize: 13,
//   //       align: "center",
//   //       alignVertical: "top",
//   //       wrap: true,
//   //     },
//   //     fileName: "З-ТАББМ-5",
//   //   });
//   // };
//   return (
//     <div className="s">
//       <button
//         onClick={exportar}
//         className="inline-flex items-center rounded ml-2 py-1 h-7"
//         style={{
//           border: "1px solid #3cb371",
//         }}
//       >
//         <div className="bg-white">
//           <img src={excel} width="20px" height="20px" className="mx-1"></img>
//         </div>
//         <div
//           style={{
//             backgroundColor: "#3cb371",
//           }}
//           className=" text-white rounded-r px-1 h-7"
//         >
//           Excel
//         </div>
//       </button>
//     </div>
//   );
// }


function Mayagt_1(props: any) {
  const mayagtData = props.mayagtData;
  const userDetils = props.userDetils;
  const [saveData,setSaveData] = useState(new Set())
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [globalFilter, setGlobalFilter] = React.useState("");

  const columns = React.useMemo(
    () => [
      {
        accessorFn: (row, index) => index + 1,
        accessorKey:  "№",
        header: "№",
        size:10
      },
      {
        accessorKey: "AUDIT_TYPE_NAME",
        header: "Аудитын төрөл",
        cell: (info) => info.getValue(),
      },

      {
        accessorKey: "AUDIT_NAME",
        header: "Аудитын нэр, сэдэв",
        minSize: 250,
        
        cell: (info) => info.getValue(),
      },

      {
        accessorKey: "AUDIT_CODE",
        header: "Аудитын код",
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
        accessorKey: "SALBAR_ANGILAL",
        header: "Салбарын харьяалал",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "HOSLUULAN_GUITSETGSN",
        header: "Хослуулан гүйцэтгэсэн эсэх",
        cell: (info) => info.getValue(),
      },

      {
        accessorKey: "AUDIT_TYPE",
        header: "Аудит хийх хэлбэр",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "AUDIT_HIIGGUI_SHALTGAAN",
        header: "Аудит хийгээгүй шалтгаан",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "DUGNELT",
        header: "Дүгнэлт",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "TATGALZSAN_SHALTGAAN",
        header: "Татгалзсан шалтгаан",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "IS_EXPERT_ATTEND",
        header: "Шинжээч оролцсон эсэх",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "IS_PRESS_REPORT",
        header: "Хэвлэмэл тайлан бэлтгэсэн эсэх",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "WORK_PEOPLE",
        header: "Ажилласан хүн",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "WORK_DAY",
        header: "Ажилласан өдөр",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "WORK_TIME",
        header: "Ажилласан илүү цаг",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "TUL_BENEFIT",
        header: "Төлөвлөсөн санхүүгийн үр өгөөжийн дүн (төгрөг)",
        cell: (info) => info.getValue(),
        accessorFn: (row, index) => (
          <div>
         <CurrencyInput
              id="input-example"
              defaultValue={row.TUL_BENEFIT}
              decimalsLimit={2}
              disabled
              style={{ textAlign: "center",backgroundColor:'transparent' }}
             />
         </div>
        ),
      },
      {
        accessorKey: "TOD_BENEFIT",
        header:  "Тодорхойлсон санхүүгийн үр өгөөжийн дүн (төгрөг)",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "AUDIT_ORG_TYPE",
        header: "Аудит хийх байгууллагын төрөл",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "AUDIT_ORG_CHECK_NAME",
        header:  "Аудит хийх нэгжийн нэр",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "DEPARTMENT_NAME",
        header: "Аудит хийх байгууллага, нэгжийн нэр",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "AUDITOR_LEAD",
        header: "Багийн ахлах",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "AUDITOR_MEMBER",
        header: "Багийн гишүүд",
        cell: (info) => info.getValue(),
        wraptext: true,
      },
    ],
    []
  );


  const [data, loadData] = React.useState([]);


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

  function Draw_input(param: any, cell: any, index: number,cell_all) {
    return (
      <div>
        {cell.id === "IS_EXPERT_ATTEND" ||
        cell.id === "IS_PRESS_REPORT" ? (
          <select
            className="border rounded text-sm focus:outline-none py-1 h-8 mr-1 inputRoundedMetting pl-2"
            value = {param.row.original[cell.id]}
            onChange={(text) => {
              let temp = data;
              temp[index][cell.id] = text.target.value
              let tset = saveData
              tset.add(index)
              setSaveData(tset)
              loadData([...temp])
              
           }}
          >
            <option className="font-medium" key={"Сонгоно уу"} value={999}>
              {"Сонгоно уу"}
            </option>
            <option className="font-medium" key={"Тийм"} value={1}>
              {"Тийм"}
            </option>
            <option className="font-medium" key={"Үгүй"} value={0}>
              {"Үгүй"}
            </option>
          </select>
        ) : cell.id === "WORK_PEOPLE" ||
          cell.id === "WORK_DAY" ||
          cell.id === "WORK_TIME" ? (
          <input
            value={param.row.original[cell.id]}
            type ="number"
            className={
              index % 2 > 0
                ? "flex text-center h-8 bg-gray-100"
                : "flex text-center h-8"
            }
            style={{
              minHeight: "33px",
              border: "1px solid",
              borderRadius: "4px",
              color: "gray",
            }}
            onChange={(e) => {
              let temp = data;
              temp[index][cell.id] = e.target.value;
              let tset = saveData
              tset.add(index)
              setSaveData(tset)
            
              loadData([...temp]);
            }}
          />
        ) : flexRender(
          cell_all.column.columnDef.cell,
          cell_all.getContext()
        )}
      </div>
    );
  }

  useEffect(() => {
    fetchData();
  }, [props.mayagtData]);

  async function fetchData() {
    
    DataRequest({
      url: Stat_Url + "BM1List",
      method: "POST",
      data:{
        // STAT_ID : mayagtData.ID,
        PERIOD_LABEL:mayagtData.PERIOD_YEAR, //PERIOD_LABEL
        DEPARTMENT_ID:mayagtData.DEPARTMENT_ID
      }
    })
      .then(function (response) {
     
        if(response.data !== undefined && response.data.length >0){
          loadData(response.data)
        }
      
      })
      .catch(function (error) {
        console.log(error,'error');
        alert("Aмжилтгүй");
      });
  }
  function saveToDB(){
   let temp = []
 //  console.log(saveData,'saveData');
    for(let i of saveData){
       temp.push(data[i])
    }
    console.log(temp,'save data');
  DataRequest({
      url: Stat_Url + "BM1IU",
      method: "POST",
      data:{
        // STAT_ID : mayagtData.ID,
       data:temp,
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
  // function getExportFileBlob( columns, data ) {
  //     console.log(columns.length);
  //   let excel_header = []
  //   let data_header = []
  //   let excel_data = []

  //   columns.forEach((value,index)=> {
  //     excel_header.push(value.header)
  //     data_header.push(value.accessorKey)
  //   })
  //   excel_data.push(excel_header)
  //   data.forEach((value,i) =>{
  //     let array = []
  //     data_header.forEach((data_name,index)=>{
  //       if(data_name === '№'){
  //         array.push(i+1)
  //       }else{
  //       array.push(value[data_name])
  //       }
  //     })
  //     excel_data.push(array)
      
  //   })

  //   var wb = utils.book_new(); var ws = utils.aoa_to_sheet(excel_data); utils.book_append_sheet(wb, ws, "Sheet1");
  //   writeFileXLSX(wb, "test.xlsx", { compression: true});
   
  //     // XLSX example
  
  //     // const header = columns.map((c) => c.exportValue);
  //     // const compatibleData = data.map((row) => {
  //     //   const obj = {};
  //     //   header.forEach((col, index) => {
  //     //     obj[col] = row[index];
  //     //   });
  //     //   return obj;
  //     // });
  
  //     // let wb = XLSX.utils.book_new();
  //     // let ws1 = XLSX.utils.json_to_sheet(compatibleData, {
  //     //   header,
  //     // });
  //     // XLSX.utils.book_append_sheet(wb, ws1, "React Table Data");
  //     // XLSX.writeFile(wb, `${fileName}.xlsx`);
  
 
  //     return false;
   
  // }
  return (
    <>
      <div
        style={{
          maxHeight: window.innerHeight - 129,
          padding: "0.5rem 0 0 1rem",
        }}
      >
        <Title
          title={"ТАЙЛАНТ ОНД ГҮЙЦЭТГЭСЭН АУДИТЫН БҮРТГЭЛ З-ТАББМ-1"}
          widthS={"28rem"}
          widthL={"10rem"}
        />
        <div className="flex justify-between mb-2 ">
          <div style={{ height: 28 }} className="flex flex-row  cursor-pointer">
            <ButtonSearch  globalFilter={globalFilter} setGlobalFilter={(value)=> setGlobalFilter(value)}/>
            <button
          onClick={() => {
            getExportFileBlob(columns,data,'З-ТАББМ-1')
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
          <table    {...{
            style: {
              width: table.getCenterTotalSize(),
            },
          }}>
            <thead className="TableHeadBackroundcolor">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <th
                      {...{
                        key: header.id,
                        colSpan: header.colSpan,
                        style: {
                          width: header.getSize(),
                        },
                      }}
                       >
                        {header.isPlaceholder ? null : (
                          <>
                            <div
                              {...{
                                onMouseDown: header.getResizeHandler(),
                                onTouchStart: header.getResizeHandler(),
                                className: `resizer ${
                                  header.column.getIsResizing() ? 'isResizing' : ''
                                }`,
                                
                              }}
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
                        <td  {...{
                          key: cell.id,
                          style: {
                            width: cell.column.getSize(),
                          },
                        }} className="p-2 ">
                          {index === 0
                            ? flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                              )
                            : Draw_input(cell.getContext(), cell.column, i,cell)}
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



export default Mayagt_1;
