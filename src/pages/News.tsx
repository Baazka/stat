import CM_1A from "../components/S_News.tsx/CM_1A";
import CM_1B from "../components/S_News.tsx/CM_1B";
import CM_1C from "../components/S_News.tsx/CM_1C";
import CM_2A from "../components/S_News.tsx/CM_2A";
import CM_2B from "../components/S_News.tsx/CM_2B";
import CM_2C from "../components/S_News.tsx/CM_2C";
import CM_3A from "../components/S_News.tsx/CM_3A";
import CM_3B from "../components/S_News.tsx/CM_3B";
import CM_3C from "../components/S_News.tsx/CM_3C";
import CM_4 from "../components/S_News.tsx/CM_4A";
import CM_5A from "../components/S_News.tsx/CM_5A";
import CM_5B from "../components/S_News.tsx/CM_5B";
import CM_5C from "../components/S_News.tsx/CM_5C";
import CM_5D from "../components/S_News.tsx/CM_5D";
import CM_5E from "../components/S_News.tsx/CM_5E";
import CM_5F from "../components/S_News.tsx/CM_5F";
import CM_6 from "../components/S_News.tsx/CM_6";
import CM_7 from "../components/S_News.tsx/CM_7";
import CM_8 from "../components/S_News.tsx/CM_8";
import CM_9A from "../components/S_News.tsx/CM_9A";
import CM_9B from "../components/S_News.tsx/CM_9B";
import CM_9C from "../components/S_News.tsx/CM_9C";
import CM_9D from "../components/S_News.tsx/CM_9D";
import CM_9E from "../components/S_News.tsx/CM_9E";
import CM_9F from "../components/S_News.tsx/CM_9F";
import CM_10 from "../components/S_News.tsx/CM_10";
import CM_11 from "../components/S_News.tsx/CM_11";

function News() {
  // @ts-ignore
  const NewsData = JSON.parse(localStorage.getItem("News"));

  return (
    <div>
      {NewsData.TORIIN_AUDIT_BAI === "З-ТАБCM-1А" ? (
        <CM_1A />
      ) : NewsData.TORIIN_AUDIT_BAI === "З-ТАБCM-1Б" ? (
        <CM_1B />
      ) : NewsData.TORIIN_AUDIT_BAI === "З-ТАБCM-1В" ? (
        <CM_1C />
      ) : NewsData.TORIIN_AUDIT_BAI === "З-ТАБCM-2A" ? (
        <CM_2A />
      ) : NewsData.TORIIN_AUDIT_BAI === "З-ТАБCM-2Б" ? (
        <CM_2B />
      ) : NewsData.TORIIN_AUDIT_BAI === "З-ТАБCM-2В" ? (
        <CM_2C />
      ) : NewsData.TORIIN_AUDIT_BAI === "З-ТАБCM-3А" ? (
        <CM_3A />
      ) : NewsData.TORIIN_AUDIT_BAI === "З-ТАБCM-3Б" ? (
        <CM_3B />
      ) : NewsData.TORIIN_AUDIT_BAI === "З-ТАБCM-3В" ? (
        <CM_3C />
      ) : NewsData.TORIIN_AUDIT_BAI === "З-ТАБCM-4" ? (
        <CM_4 />
      ) : NewsData.TORIIN_AUDIT_BAI === "З-ТАБCM-5А" ? (
        <CM_5A />
      ) : NewsData.TORIIN_AUDIT_BAI === "З-ТАБCM-5Б" ? (
        <CM_5B />
      ) : NewsData.TORIIN_AUDIT_BAI === "З-ТАБCM-5В" ? (
        <CM_5C />
      ) : NewsData.TORIIN_AUDIT_BAI === "З-ТАБCM-5Г" ? (
        <CM_5D />
      ) : NewsData.TORIIN_AUDIT_BAI === "З-ТАБCM-5Д" ? (
        <CM_5E />
      ) : NewsData.TORIIN_AUDIT_BAI === "З-ТАБCM-5Е" ? (
        <CM_5F />
      ) : NewsData.TORIIN_AUDIT_BAI === "З-ТАБCM-6" ? (
        <CM_6 />
      ) : NewsData.TORIIN_AUDIT_BAI === "З-ТАБCM-7" ? (
        <CM_7 />
      ) : NewsData.TORIIN_AUDIT_BAI === "З-ТАБCM-8" ? (
        <CM_8 />
      ) : NewsData.TORIIN_AUDIT_BAI === "З-ТАБCM-9A" ? (
        <CM_9A />
      ) : NewsData.TORIIN_AUDIT_BAI === "З-ТАБCM-9Б" ? (
        <CM_9B />
      ) : NewsData.TORIIN_AUDIT_BAI === "З-ТАБCM-9В" ? (
        <CM_9C />
      ) : NewsData.TORIIN_AUDIT_BAI === "З-ТАБCM-9Г" ? (
        <CM_9D />
      ) : NewsData.TORIIN_AUDIT_BAI === "З-ТАБCM-9Д" ? (
        <CM_9E />
      ) : NewsData.TORIIN_AUDIT_BAI === "З-ТАБCM-9Е" ? (
        <CM_9F />
      ) : NewsData.TORIIN_AUDIT_BAI === "З-ТАБCM-10" ? (
        <CM_10 />
      ) : NewsData.TORIIN_AUDIT_BAI === "З-ТАБCM-11" ? (
        <CM_11 />
      ) : null}
    </div>
  );
}

export default News;
