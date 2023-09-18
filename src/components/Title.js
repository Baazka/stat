import { useNavigate } from "react-router-dom";
import back from "../assets/zurag/icons/back.svg";
function Title(props) {
  const Navigate = useNavigate();
  return (
    <div className="pb-3">
      <div className="flex flex-row  cursor-pointer">
        <img
          src={back}
          style={{ color: "#2684fe" }}
          width="20px"
          height="20px"
          onClick={() => Navigate(-1)}
        />
        <p
          className="font text-xl ml-2 font-medium uppercase"
          style={{ color: "#2684fe" }}
        >
          {props.title}
        </p>
      </div>

      <div className="flex flex-row h-3">
        <div className="longdash" style={{ width: props.widthL }}></div>
        <div className="second" style={{ width: props.widthS }}></div>
      </div>
    </div>
  );
}
export default Title;
