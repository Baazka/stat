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
import CM_1A from "../components/S_News.tsx/CM_1A";

function Mayagt() {
  // @ts-ignore
  const mayagtData = JSON.parse(localStorage.getItem("Stat"));
  // @ts-ignore
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));

  return (
    <div>
      {mayagtData.DOCUMENT_ID === 1 ? (
        <Mayagt_1 mayagtData={mayagtData} userDetails={userDetails} />
      ) : mayagtData.DOCUMENT_ID === 2 ? (
        <Mayagt_2 mayagtData={mayagtData} userDetails={userDetails} />
      ) : mayagtData.DOCUMENT_ID === 3 ? (
        <Mayagt_3 mayagtData={mayagtData} userDetails={userDetails} />
      ) : mayagtData.DOCUMENT_ID === 4 ? (
        <Mayagt_4 mayagtData={mayagtData} userDetails={userDetails} />
      ) : mayagtData.DOCUMENT_ID === 5 ? (
        <Mayagt_5 mayagtData={mayagtData} userDetails={userDetails} />
      ) : mayagtData.DOCUMENT_ID === 6 ? (
        <Mayagt_6 mayagtData={mayagtData} userDetails={userDetails} />
      ) : mayagtData.DOCUMENT_ID === 7 ? (
        <Mayagt_7 mayagtData={mayagtData} userDetails={userDetails} />
      ) : mayagtData.DOCUMENT_ID === 8 ? (
        <Mayagt_8 mayagtData={mayagtData} userDetails={userDetails} />
      ) : mayagtData.DOCUMENT_ID === 9 ? (
        <Mayagt_9 mayagtData={mayagtData} userDetails={userDetails} />
      ) : mayagtData.DOCUMENT_ID === 10 ? (
        <Mayagt_10 mayagtData={mayagtData} userDetails={userDetails} />
      ) : mayagtData.DOCUMENT_ID === 11 ? (
        <Mayagt_11 mayagtData={mayagtData} userDetails={userDetails} />
      ) : mayagtData.DOCUMENT_ID === 12 ? (
        <Mayagt_12 mayagtData={mayagtData} userDetails={userDetails} />
      ) : mayagtData.DOCUMENT_ID === 13 ? (
        <Mayagt_13 mayagtData={mayagtData} userDetails={userDetails} />
      ) : mayagtData.DOCUMENT_ID === 14 ? (
        <Mayagt_14 mayagtData={mayagtData} userDetails={userDetails} />
      ) : mayagtData.DOCUMENT_ID === 15 ? (
        <Mayagt_15 mayagtData={mayagtData} userDetails={userDetails} />
      ) : mayagtData.DOCUMENT_ID === "З-ТАБСМ-1 А" ? (
        <CM_1A mayagtData={mayagtData} userDetails={userDetails} />
      ) : null}
    </div>
  );
}

export default Mayagt;
