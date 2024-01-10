import { Fragment } from "react";
import { useNavigate,useLocation } from "react-router-dom"; 
import logo from "../assets/zurag/logo.png";
import Stat_URL from "../Stat_URL";
import {
  userPro,
  DownIcon,
  saveIcon,
  y,
  user_edit,
  log_out,
  password,
} from "../assets/zurag";
import React, { useState, useEffect, useRef } from "react";
import DataRequest  from "../functions/make_Request";
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
import { RankingInfo, rankItem } from "@tanstack/match-sorter-utils";
import { RevolvingDot } from "react-loader-spinner";
import { Menu, Transition } from "@headlessui/react";
import  Dialog  from "../pages/Dialog";
import dateFormat, { masks } from "dateformat";
import CurrencyInput from "react-currency-input-field";



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
// @ts-ignore
function arrayCheck(emptyArray){
  if (
    typeof emptyArray != "undefined" &&
    emptyArray !== null 
    &&
    emptyArray.length !== null &&
    emptyArray.length > 0
)
    return true;
else return  false;
}
function Header(props) {
  
  const [notification, setNotification] = useState(false);
  const [notificationData, setNotificationData] =  useState([]);
  const [showDialogOpen, setShowDialogOpen] = useState(false);


  let navigate = useNavigate();
   let location = useLocation()
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));
  const ref = useRef(null);

 
  const [loaderSpinner, setloaderSpinner] = useState(0);
  const [notfilter, setFilter] = useState({
    AUDIT_CODE: null,
    TYPE: null,
  });

  function checkRoleBatlakh(ROLE, LEVEL_ID, MODULE_TYPE, CREATED_BY) {
    
    if ((ROLE === 2 ) && LEVEL_ID === 0) {
       return true;
     } else if ((ROLE === 3 ) && LEVEL_ID === 1) {
       return true;
     } else if ((ROLE === 4 ) && LEVEL_ID === 2) {
       return true;
     } else {
       return false;
     }
    }
   function checkRoleTsutslah(ROLE, LEVEL_ID, MODULE_TYPE, CREATED_BY) {
   
     if ((ROLE === 2 ) && LEVEL_ID === 1) {
      return true;
    } else if ((ROLE === 3 ) && LEVEL_ID === 2) {
      return true;
    } else if ((ROLE === 4 ) && LEVEL_ID === 3) {
      return true;
    } else {
      return false;
    }
  }
  
  function checkNotification() {
     setloaderSpinner(1);
    if (localStorage.getItem("userDetails") !== undefined) {
      let userDetils = JSON.parse(localStorage.getItem("userDetails"));
      if (userDetils !== undefined && userDetils.USER_ID !== undefined) {
        DataRequest({
          url: Stat_URL + "NotificationList/",
          method: "POST",
          data: {
            AUDIT_ID: notfilter.AUDIT_CODE,
            USER_ID: userDetils.USER_ID,
          },
        }).then((response) => {
          if (response?.data !== undefined && response.data.length > 0) {
            let temp = [];
            for (let i = 0; i < response.data.length; i++) {
              if (
                response.data[i].REQUEST_TYPE === 1
                  ? checkRoleBatlakh(
                    response.data[i].ROLE_ID,
                      response.data[i].PRO_STATUS,
                    )
                  : checkRoleTsutslah(
                    response.data[i].ROLE_ID,
                    response.data[i].PRO_STATUS,
                      response.data[i].MODULE_TYPE,
                      response.data[i].CREATED_BY
                    )
              ) {
                temp = temp.filter((a) => a.ID !== response.data[i].ID);
                temp.push(response.data[i]);
              }
            }
            setNotificationData(temp);
            setloaderSpinner(0);
          } else {
            setNotificationData([]);
            setloaderSpinner(0);
          }
        });
      }
    }

  }

  useEffect(() => {
    checkNotification();
  }, [props]);

  useEffect(() => {
    ref.current = setInterval(checkNotification, 3 * 60 * 1000);

    return () => {
      if (ref.current) {
        clearInterval(ref.current);
      }
    };
  }, []);

  

  function logOutFunction() {
    localStorage.removeItem("userDetails");
    navigate("/");
  }
 
  

  return (
    <div className="sticky top-0 z-40 ">
      <div className="BackroundcolorBlue border-collapse ">
        <div
          style={{ padding: "0px 0px 0px 0px" }}
          className=" h-15  text-black"
        >
          <div className="w-full h-13 px-5 flex  justify-between whiteColor Hide_User_about_onWeb Header_border">
            <nav className="HideOnWeb">
              <div className="mb-4 px-4">
                <div className="space-y-6">
                  <button
                    className="mobile-menu-button focus:outline-none focus:bg-gray-600 flex justify-between mt-4 -ml-2"
                    onClick={() => props.setSidebarSwitch(!props.sidebarSwitch)}
                  >
                    <div className="w-full flex items-center text-blue-500 h-10  bg-gray-50 hover:bg-gray-200  cursor-pointer rounded-md">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M4 6h16M4 12h16M4 18h16"
                        />
                      </svg>
                    </div>
                  </button>
                </div>
              </div>
            </nav>

            <div className="items-center flex">
              <nav className="HideOnMobile">
                <div className="relative text-gray-300">
                  <img src={logo} width="80" height="80" />
                </div>
              </nav>

              <div className="relative p-3 text-center">
                <span
                  className="
                  text-center 
                  font-medium"
                  style={{ color: "#002d73" }}
                >
                  ҮНДЭСНИЙ АУДИТЫН
                  <br />
                  ГАЗАР
                </span>
              </div>
            </div>
            <div className="flex items-center ">
            {arrayCheck(notificationData) ? (
                <div id="dropDown">
                  <Menu as="div" className="relative inline-block text-left">
                    <div>
                      <Menu.Button className=" text-center px-4 py-2 items-center inline-flex w-full justify-center rounded-md    text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-100">
                        <div
                          id="nav"
                          onClick={() => {
                            setNotification(true);
                          }}
                        >
                          <div class="messages">
                            {arrayCheck(notificationData.filter((a) => a.IS_SHOW === 0))
                               ? (
                              <div class="badge">
                                <div class="message-count">
                                  {
                                  // arrayCheck(notificationData.filter(
                                  //   (a) => a.IS_SHOW === 0
                                  // )) >= 1000
                                  //   ? "999+"

                                  arrayCheck(notificationData.filter(
                                        (a) => a.IS_SHOW === 0
                                      ))?notificationData.filter(
                                        (a) => a.IS_SHOW === 0
                                      ).length:null}
                                </div>
                              </div>
                            ) : null}
                          </div>
                        </div>
                        <span
                          onClick={() => {
                            setNotification(true);
                          }}
                          className="ml-1 mr-2"
                        >
                          Мэдэгдэл
                        </span>
                      </Menu.Button>
                    </div>
                  </Menu>
                </div>
              ) : null}
              <div id="dropDown">
                <Menu as="div" className="relative inline-block text-left ">
                  <div>
                    <Menu.Button className=" text-center px-4 py-2 items-center inline-flex w-full justify-center rounded-md    text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-100 Hide_User_about_onWeb">
                      <img
                        src={userPro}
                        className="w-8 h-8 rounded-full shadow-lg"
                      />
                      <span className="ml-2 mr-1 HideOnMobile">
                        {userDetails !== undefined
                          ? userDetails?.USER_NAME
                          : ""}{" "}
                      </span>
                      <img
                        src={DownIcon}
                        width="12px"
                        className="HideOnMobile"
                      />
                    </Menu.Button>
                  </div>

                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-60 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="py-1">
                        <Menu.Item>
                          {({ active }) => (
                            <div
                              className="py-3 px-3 flex text-gray-700 dark:text-gray-200 dark:hover:text-white items-center justify-start"
                              style={{
                                borderBottom:
                                  "1px solid rgba(226, 225, 225, 0.7)",
                              }}
                            >
                              <img src={userPro} className="user_photo" />
                              <div className="break-all text-xs ml-4">
                                <span className="font-bold">
                                  {userDetails !== undefined
                                    ? userDetails?.DEPARTMENT_NAME
                                    : ""}{" "}
                                </span>
                                <br />
                                <span className="font-thin">
                                  {userDetails !== undefined
                                    ? userDetails?.USER_NAME
                                    : ""}{" "}
                                </span>
                              </div>
                            </div>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <>
                              {userDetails.USER_TYPE_NAME === "AKT_ORG" ||
                              userDetails.USER_TYPE_NAME === "ADMIN" ? (
                                <div
                                  className="py-1 px-2 flex text-gray-700 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 justify-start dark:hover:text-white items-center ml-3"
                                  onClick={() => {
                                    setShowDialogOpen(true);
                                    // userEdit();
                                  }}
                                >
                                  <img src={user_edit} width="20px" />
                                  <span className="block py-2 px-2 text-sm ">
                                    Бүртгэл засах
                                  </span>
                                </div>
                              ) : null}
                            </>
                          )}
                        </Menu.Item>
                      </div>
                    
                      <div className="py-1">
                        <Menu.Item>
                          {({ active }) => (
                            <div
                              className="py-1 px-2 flex text-gray-700 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 justify-start dark:hover:text-white items-center ml-3"
                              onClick={() => logOutFunction()}
                            >
                              <img src={log_out} width="20px" />
                              <span className="block py-2 px-2 text-sm ">
                                Гарах{" "}
                              </span>
                            </div>
                          )}
                        </Menu.Item>
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
             {
              notification?
              <NotificationDialog notification = {notification} setNotification={setNotification} data={arrayCheck(notificationData) ? notificationData : []} navigate={navigate} location={location}/>:null
             }

            </div>

          </div>
        </div>
      </div>
      <div className="flex flex-row justify-end">
        <div className="BackroundcolorBlue w-full h-0.5 "></div>
        <div
          style={{
            // borderTop: "8px solid #2684fe",
            width: "25%",
            height: "8px",
            backgroundColor: "#2684fe",
            marginTop: "-3px",
          }}
        ></div>
      </div>
    </div>
  );
}


function Filter({
  column,
  table,
}: {
  column: Column<any, any>;
  table: Table<any>;
}) {
  const firstValue = table
    .getPreFilteredRowModel()
    .flatRows[0]?.getValue(column.id);

  return (
    <div className="flex space-x-2">
      <input
        type="text"
        value={(column.getFilterValue() ?? "") as string}
        onChange={(e) => column.setFilterValue(e.target.value)}
        placeholder={`Search...`}
        className="border shadow rounded w-full"
      />
    </div>
  );
}
function NotificationDialog({data,notification,setNotification,navigate,location}){

  const [globalFilter, setGlobalFilter] = React.useState("");
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  async function MoreNotification(value) {
    let sendData = value;
    sendData.IS_SHOW = 1;
    sendData.MODULE_TYPE = value.MODULE_TYPE;
    DataRequest({
      url: Stat_URL + "NotificationUpdate/",
      method: "POST",
      data: sendData,
    })
      .then(async function (response) {
        if (
          (response.data?.code === 405 &&
            response.data?.result?.errorNum === 6502) ||
          (response.data?.code === 405 &&
            response.data?.result?.errorNum === 1461)
        ) {
          alert("Тэмдэгт хэтэрсэн байна");
        } else if (response?.data.message === "Хадгаллаа."){
    
          //STAT
          DataRequest({
            url: Stat_URL + "statisticListOne/",
            method: "POST",
            data: {
              ID: value.AUDIT_ID,
            },
          }).then(async function (lists) {
            if (lists.data.length > 0) {
              localStorage.removeItem("Stat");
              localStorage.setItem("Stat", JSON.stringify(lists.data[0]));
              
                      if (location.pathname === "/web/Home/Form") {
                        window.location.reload();
                      } else {
                        navigate("/web/Home/Form");
                      }
                      setNotification(false);
                    }
                 
                })
                .catch(function (error) {
                  alert("Aмжилтгүй");
                });
          }
              
           
          
        
      })
      .catch(function (error) {
        alert("Aмжилтгүй");
      });
  }

  const columns = React.useMemo(
    () => [
      {
        accessorKey: "BUDGET_SHORT_NAME",
        accessorFn: (value, index) => (
          <div
              className="py-1 flex items-center justify-between  cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200  dark:hover:text-white"
              style={{
                borderBottom: "1.5px solid rgba(226, 225, 225, 0.7)",
              }}
              onClick={() => MoreNotification(value)}
            >
              {(
                <div className="w-11/12">
                  <div
                    className="text-xl font-medium"
                    style={{
                      fontSize: 14,
                      color: value.IS_SHOW === 0 ? "black" : "#58555A",
                    }}
                  >
                  
                    <span
                      style={{
                        fontSize: 14,
                        fontWeight: "bold",
                      }}
                    >
                      {value.DEPARTMENT_NAME}
                    </span>{" "}
                    -ын{" "}
                    <span
                      style={{
                        fontSize: 14,
                        fontWeight: "bold",
                      }}
                    >
                      {value.DOCUMENT_SHORT_NAME}
                    </span>{" "}
                    баримтыг{" "}
                    {value.REQUEST_TYPE === 0 ? (
                      <span
                        style={{
                          fontSize: 14,
                          color: "red",
                        }}
                      >
                        цуцлах
                      </span>
                    ) : (
                      <span
                        style={{
                          fontSize: 14,
                          color: "#32CD32",
                        }}
                      >
                        батлах
                      </span>
                    )}{" "}
                    хүсэлт {value.USER_NAME}-с ирлээ
                  </div>

                  <p
                    style={{
                      fontSize: 11,
                      color: "grey",
                    }}
                  >
                    {dateFormat(
                      value.UPDATED_DATE !== null
                        ? value.UPDATED_DATE
                        : value.CREATED_DATE,
                      "yyyy-mm-dd hh:MM:ss"
                    )}
                  </p>
                </div>
              )}

              <div>
                {value.IS_SHOW === 0 ? (
                  <img className="h-6 w-6" src={y} />
                ) : null}
              </div>
            </div>
          
        ),
      
        cell: (info) => info.getValue(),
        header: "",
        footer: (props) => props.column.id,
        enableColumnFilter : false,
      },

    ],
    []
  );

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
    enableRowSelection: true, //enable row selection for all rows
    // enableRowSelection: row => row.original.age > 18, // or enable row selection conditionally per row
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
  });
  return ( <Dialog
    open={notification}
    title="Мэдэгдэл"
    handleClose={() => setNotification(false)}
    width={""}
  >
  <div style={{ maxHeight: "550px", overflowY: "scroll" }}>
  <div className="flex justify-between h-8 p-2 mb-3">
<div className="flex ">
  <DebouncedInput
    value={globalFilter ?? ""}
    onChange={(value) => setGlobalFilter(String(value))}
    className="p-1.5 font-lg shadow border border-block rounded h-8"
    placeholder="Search all columns..."
  />
</div>
</div>
<div style={{ overflow: "scroll" }}>
<div />
<table className="w-full">
  <thead >
    {table.getHeaderGroups().map((headerGroup) => (
      <tr key={headerGroup.id}>
        {headerGroup.headers.map((header) => {
          return (
            <th
              key={header.id}
              colSpan={header.colSpan}
              style={{ verticalAlign: "bottom" }}
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
  <tbody className="overflow-scroll ">
    {table.getRowModel().rows.map((row, i) => {
      return (
        <tr
          key={row.id}
        >
          {row.getVisibleCells().map((cell, index) => {
            return (
              <td key={cell.id} className="p-2 text-left">
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
</div>
   
  </div>
</Dialog>
)
}

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
    <div className="flex  w-full items-center justify-between">
      <label className="mr-4">Хайлт:</label>
      <input
        type="text"
        value={value || ""}
        className="text-sm border rounded-md h-7"
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder="Хайх утгаа оруулна уу..."
        
      />

  
    </div>
  );
}
function IndeterminateCheckbox({
  indeterminate,
  className = "",
  data,
  loadData,
  tsonkh,
  row,
  setTsonkh,
  ...rest
}: { indeterminate?: boolean } & HTMLProps<HTMLInputElement>) {
  const ref = React.useRef<HTMLInputElement>(null!);

  React.useEffect(() => {
    if (typeof indeterminate === "boolean") {
      ref.current.indeterminate = !rest.checked && indeterminate;
    }
  }, [ref, indeterminate]);
  function saveToDB(value) {
    
    if (tsonkh !== 1) {
      let temp = data;
     temp.ENT_ID = row.original.ENT_ID;
     temp.ENT_NAME = row.original.ENT_NAME;
     temp.ORG_REGISTER_NO = row.original.ORG_REGISTER_NO;
     loadData(temp);
      setTsonkh(0);
    }

    //  }
  }

  return tsonkh === 1 ? (
    <input
      type="checkbox"
      ref={ref}
      className={className + " cursor-pointer"}
      {...rest}
    />
  ) : (
    <input
      type="checkbox"
      ref={ref}
      className={className + " cursor-pointer"}
      onClick={(value) => saveToDB(ref)}
      {...rest}
    />
  );
}
export default Header;
