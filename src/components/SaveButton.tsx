import React, { useEffect, useState } from "react";
import { saveIcon } from "../assets/zurag";



function ButtonSave(props: any) {

 
  return (
    <div style={{ display: "flex", justifyContent: "end" }}>
      <button
        className="inline-flex items-center rounded ml-2 mr-1 mt-5"
        style={{
          border: "1px solid #2684fe",
        }}
        onClick={() => props.saveToDB()}
      >
        <div className="bg-white px-1">
          <img src={saveIcon} width="18px" height="18px "></img>
        </div>
        <div
          style={{
            backgroundColor: "#2684fe",
          }}
          className=" text-white px-1"
        >
          Хадгалах
        </div>
      </button>
    </div>
  );
}

export default ButtonSave;
