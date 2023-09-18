import { printIcon } from "../assets/zurag";
function ButtonRequest(props: any) {
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
              style={{ width: "24px", height: "20px" }}
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                color="#2684fe"
              />
            </svg>
          </div>
          <div
            style={{
              backgroundColor: "#2684fe",
            }}
            className=" text-white px-1 py-1 rounded-r"
          >
            Хүсэлт илгээх
          </div>
        </button>
      </div>
    </div>
  );
}

export default ButtonRequest;
