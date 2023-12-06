import { useEffect, useState } from "react";

export default function Dialog(props:any) {
  const [dialogBg, setDialogBg] = useState("bg-white rounded-md shadow-lg");
  useEffect(() => {
    let temp = dialogBg;
    switch (props.width) {
      case "xl":
        setDialogBg((temp += " w-4/5 "));
        break;
      case "lg":
        setDialogBg((temp += " w-3/4 "));
        break;
      case "md":
        setDialogBg((temp += " w-2/4 "));
        break;
      default:
        setDialogBg((temp += " w-1/4 "));
        break;
    }
  }, []);

  return (
    props.open && (
      <div
        className="fixed h-screen w-screen top-0 left-0 flex justify-center items-center z-40"
        style={{
          backgroundColor: "rgba(0,0,100,0.2)",
          zIndex: "1",
        }}
      >
        <div className={dialogBg}>
          <header
            className="flex items-center justify-between border-b-2 px-4 py-2 mb-2 text-white rounded-t-md"
            style={{ backgroundColor: "rgb(59, 130, 246)" }}
          >
            <p className="text-xl">{props.title}</p>
            <span
              className="cursor-pointer"
              onClick={() => props.handleClose()}
            >
              X
            </span>
          </header>
          <div className="p-4 m-h=[300px] max-h-[700px] overflow-auto">
            {props.children}
          </div>
        </div>
      </div>
    )
  );
}
