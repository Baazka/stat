import React, { useEffect, useState } from "react";
function Button(props: any) {
  return (
    <div
      onClick={() => props.action()}
      className="inline-flex mb-2 items-center rounded ml-2 mr-1 mt-5"
      style={{
        border:
          props.borderColor === undefined
            ? "1px solid #2684fe"
            : "1px solid" + props.borderColor,
      }}
    >
      <div className="bg-white">
        <img
          src={props.Icon}
          width={props.Pwidth !== undefined ? props.Pwidth : "20px"}
          height={props.Pheight !== undefined ? props.Pheight : "20px"}
          className="mx-1"
        ></img>
      </div>
      <div
        style={{
          backgroundColor: props.color === undefined ? "#2684fe" : props.color,
        }}
        className=" text-white  py-0 px-1"
      >
        {props.Title}
      </div>
    </div>
  );
}
export default Button;
