import { read, writeFileXLSX,utils } from "xlsx";

export function getExportFileBlob( columns, data ,name) {
  
  let excel_header = []
  let data_header = []
  let excel_data = []

  columns.forEach((value,index)=> {
    excel_header.push(value.header)
    data_header.push(value.accessorKey)
  })
  excel_data.push(excel_header)
  data.forEach((value,i) =>{
    let array = []
    data_header.forEach((data_name,index)=>{
        
      if(data_name === "№"){
        array.push(i+1)
      }else{
      array.push(value[data_name])
      }
    })
    excel_data.push(array)
    
  })

  var wb = utils.book_new(); var ws = utils.aoa_to_sheet(excel_data); utils.book_append_sheet(wb, ws, "Sheet1");
  writeFileXLSX(wb, name+".xlsx", { compression: true});
 
    // XLSX example

    // const header = columns.map((c) => c.exportValue);
    // const compatibleData = data.map((row) => {
    //   const obj = {};
    //   header.forEach((col, index) => {
    //     obj[col] = row[index];
    //   });
    //   return obj;
    // });

    // let wb = XLSX.utils.book_new();
    // let ws1 = XLSX.utils.json_to_sheet(compatibleData, {
    //   header,
    // });
    // XLSX.utils.book_append_sheet(wb, ws1, "React Table Data");
    // XLSX.writeFile(wb, `${fileName}.xlsx`);


    return false;
 
}