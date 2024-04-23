import React, { useEffect, useState } from "react";
import { bottomArrow } from "../assets/zurag";

function DocInfo() {
  const mayagtData = JSON.parse(localStorage.getItem("Stat") || "{}");
  const [medeelel, setMedeelel] = useState(false);
  return (
    <>
      <div
        className="flex flex-row mb-3 cursor-pointer"
        onClick={() => setMedeelel(!medeelel)}
      >
        <img
          src={bottomArrow}
          style={{ transform: medeelel ? "rotate(180deg)" : "" }}
          width="25px"
          alt="bottomArrow"
        />
        <span className="text-base ml-1" style={{ fontSize: 12 }}>
          МАЯГТЫН МЭДЭЭЛЭЛ
        </span>
      </div>
      {medeelel ? (
        <div className="grid grid-rows-2  lg:grid-flow-col md:grid-flow-row sm:grid-flow-row">
          <div className="flex p-1">
            <div className="w-4/12">
              <label className="block md:text-right mb-1 md:mb-0 pr-4">
                Тайлант хугацаа:
              </label>
            </div>
            <div className="w-8/12">
              <input
                style={{ width: "100%" }}
                className="inputRounded"
                disabled
                value={mayagtData?.PERIOD_LABEL}
              />
            </div>
          </div>
          <div className="flex p-1">
            <div className="w-4/12">
              <label className="block md:text-right mb-1 md:mb-0 pr-4">
                Аудитын төрөл:
              </label>
            </div>
            <div className="w-8/12">
              <input
                style={{ width: "100%" }}
                className="inputRounded"
                disabled
                value={mayagtData?.AUDIT_TYPE_NAME}
              />
            </div>
          </div>
          <div className="flex p-1">
            <div className="w-4/12">
              <label className="block md:text-right mb-1 md:mb-0 pr-4">
                Төрийн аудитын байгууллага:
              </label>
            </div>
            <div className="w-8/12">
              <div className="borderSpan" style={{ width: "100%" }}>
                <span>{mayagtData?.DEPARTMENT_NAME}</span>
              </div>
            </div>
          </div>
          <div className="flex p-1">
            <div className="w-4/12">
              <label className="block md:text-right mb-1 md:mb-0 pr-4">
                Маягтын нэр:
              </label>
            </div>
            <div className="w-8/12">
              <textarea
                style={{ width: "100%" }}
                className="inputRounded"
                disabled
                value={mayagtData?.DOCUMENT_NAME}
                rows={1}
              />
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
export default DocInfo;
