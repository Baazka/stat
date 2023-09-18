import Mayagt_1 from "../components/Mayagts.tsx/Mayagt_1";
import Mayagt_2 from "../components/Mayagts.tsx/Mayagt_2";
import Mayagt_3 from "../components/Mayagts.tsx/Mayagt_3";
import Mayagt_4 from "../components/Mayagts.tsx/Mayagt_4";
import Mayagt_5 from "../components/Mayagts.tsx/Mayagt_5";
import Mayagt_6 from "../components/Mayagts.tsx/Mayagt_6";
import Mayagt_7 from "../components/Mayagts.tsx/Mayagt_7";
import Mayagt_8 from "../components/Mayagts.tsx/Mayagt_8";
import Mayagt_9 from "../components/Mayagts.tsx/Mayagt_9";
import Mayagt_10 from "../components/Mayagts.tsx/Mayagt_10";
import Mayagt_11 from "../components/Mayagts.tsx/Mayagt_11";
import Mayagt_12 from "../components/Mayagts.tsx/Mayagt_12";
import Mayagt_13 from "../components/Mayagts.tsx/Mayagt_13";
import Mayagt_14 from "../components/Mayagts.tsx/Mayagt_14";
import Mayagt_15 from "../components/Mayagts.tsx/Mayagt_15";

function Mayagt() {
  // @ts-ignore
  const mayagtData = JSON.parse(localStorage.getItem("Stat"));
  // @ts-ignore
  const userDetils = JSON.parse(localStorage.getItem("userDetails"));

  return (
    <div>
      {mayagtData.MAYGTIIN_DUGAAR === "З-ТАББМ 1" ? (
        // @ts-ignore
        <Mayagt_1 mayagtData={mayagtData} userDetils={userDetils} />
      ) : mayagtData.MAYGTIIN_DUGAAR === "З-ТАББМ 2" ? (
        <Mayagt_2 />
      ) : mayagtData.MAYGTIIN_DUGAAR === "З-ТАББМ 3" ? (
        <Mayagt_3 />
      ) : mayagtData.MAYGTIIN_DUGAAR === "З-ТАББМ 4" ? (
        <Mayagt_4 />
      ) : mayagtData.MAYGTIIN_DUGAAR === "З-ТАББМ 5" ? (
        <Mayagt_5 />
      ) : mayagtData.MAYGTIIN_DUGAAR === "З-ТАББМ 6" ? (
        <Mayagt_6 />
      ) : mayagtData.MAYGTIIN_DUGAAR === "З-ТАББМ 7" ? (
        <Mayagt_7 />
      ) : mayagtData.MAYGTIIN_DUGAAR === "З-ТАББМ 8" ? (
        <Mayagt_8 />
      ) : mayagtData.MAYGTIIN_DUGAAR === "З-ТАББМ 9" ? (
        <Mayagt_9 />
      ) : mayagtData.MAYGTIIN_DUGAAR === "З-ТАББМ 10" ? (
        <Mayagt_10 />
      ) : mayagtData.MAYGTIIN_DUGAAR === "З-ТАББМ 11" ? (
        <Mayagt_11 />
      ) : mayagtData.MAYGTIIN_DUGAAR === "З-ТАББМ 12" ? (
        <Mayagt_12 />
      ) : mayagtData.MAYGTIIN_DUGAAR === "З-ТАББМ 13" ? (
        <Mayagt_13 />
      ) : mayagtData.MAYGTIIN_DUGAAR === "З-ТАББМ 14" ? (
        <Mayagt_14 />
      ) : mayagtData.MAYGTIIN_DUGAAR === "З-ТАББМ 15" ? (
        <Mayagt_15 />
      ) : null}
    </div>
  );
}

export default Mayagt;
