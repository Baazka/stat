import { useState } from "react";

let stylesNew = {
  TextBold: {
    fontWeight: "bold",
    color: "#606060",
  },
};

function SidebarCM(props: any) {
  return (
    <div
      className="mr-1 ml-4 mb-7 w-full"
      style={{ width: !props.menuShow ? 350 : 100 }}
    >
      <table className="items-center bg-transparent border-collapse">
        <thead className="TableHeadBackroundcolor">
          <>
            <tr>
              <th
                className="border-b text-white border-gray-200 align-middle font-light  py-1"
                style={{ backgroundColor: "#b7b6b6" }}
              >
                <div className="flex py-1 cursor-pointer">
                  <a
                    onClick={() => props.setMenuShow(!props.menuShow)}
                    style={{ marginRight: "10px", marginLeft: "4px" }}
                  >
                    {!props.menuShow ? ">> " : "<< "}
                  </a>
                  <span className="text-xs font-bold uppercase mr-3">
                    Маягтууд
                  </span>
                </div>
              </th>
            </tr>
            {props.Fdata?.map((value: any, index: any) => (
              <tr key={index}>
                <td
                  className="text-left text-black p-2 cursor-pointer"
                  style={{
                    backgroundColor:
                      props.data.index === index ? "#e5e5e5" : "white",
                  }}
                  onClick={() => {
                    props.setData({ index: index, value: value });
                    localStorage.setItem(
                      "cmMenu",
                      JSON.stringify({
                        index: index,
                        value: value,
                        MenuData: props.Fdata,
                      })
                    );
                  }}
                >
                  {!props.menuShow ? (
                    <span className="text-xs text-black py-0.5">
                      {value.DOCUMENT_NAME}
                    </span>
                  ) : (
                    <span className="text-xs text-black py-0.5">
                      {value.DOCUMENT_SHORT_NAME}
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </>
        </thead>
      </table>
    </div>
  );
}

export default SidebarCM;
