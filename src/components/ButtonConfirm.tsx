import { printIcon, batlah } from "../assets/zurag";
function ButtonConfirm(props: any) {
  return (
    <div style={{ height: 30, marginRight: "7px" }} className="cursor-pointer">
      <div style={{ height: 28 }} className="flex flex-row  cursor-pointer">
        <button
          className="inline-flex items-center rounded ml-2 py-2 h-8"
          style={{
            border: "1px solid #2684fe",
          }}
        >
          <div className="bg-white">
            <img src={batlah} width="28px" height="20px" />
          </div>
          <div
            style={{
              backgroundColor: "#2684fe",
            }}
            className=" text-white px-1 py-1 rounded-r"
          >
            {" "}
            Батлах
          </div>
        </button>
      </div>
    </div>
  );
}

export default ButtonConfirm;
