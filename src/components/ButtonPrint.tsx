import { printIcon } from "../assets/zurag";
function ButtonPrint(props: any) {
  return (
    <div style={{ height: 28, marginRight: "7px" }} className="cursor-pointer">
      <div style={{ height: 28 }} className="flex flex-row  cursor-pointer">
        <button
          className="inline-flex items-center rounded ml-2 py-2 h-8"
          style={{
            border: "1px solid #2684fe",
          }}
        >
          <div className="bg-white">
            <img src={printIcon} width="24px" height="20px" />
          </div>
          <div
            style={{
              backgroundColor: "#2684fe",
            }}
            className=" text-white px-1 py-1 rounded-r"
          >
            {" "}
            Хэвлэх
          </div>
        </button>
      </div>
    </div>
  );
}

export default ButtonPrint;
