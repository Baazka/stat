import React, { useState, useEffect, useReducer } from "react";
import Stat_URL from "../Stat_URL";

const axios = require("axios");
var dateFormat = require("dateformat");
const userDetils = JSON.parse(localStorage.getItem("userDetails"));

function AuditType(props) {
  const [data, loadData] = useState([]);
  useEffect(() => {
    async function fetchData() {
      let listItems = await axios(Stat_URL + "library/" + "audittype/");

      loadData(listItems.data);
    }
    fetchData();
  }, [props]);
  let listItems;
  if (data !== undefined) {
    listItems = (
      <select
        disabled={props.edit}
        value={props.data.Audit.AUDIT_TYPE}
        style={
          ({ border: "1px solid black", borderRadius: "4px" }, props.styleLib)
        }
        onChange={(text) => {
          let value = props.data;
          value.Audit.AUDIT_TYPE = text.target.value;
          value.Audit.oldIndex = props.index;
          value.Audit.CREATED_BY = userDetils?.USER_ID;
          value.Audit.CREATED_DATE = dateFormat(new Date(), "dd-mmm-yy");
          props.setData({ ...value });
        }}
      >
        {props.title !== undefined ? (
          <option value="" disabled selected hidden>
            {props.title}
          </option>
        ) : null}
        <option value={999}>Сонгоно уу</option>
        {data?.map((nation, index) => (
          <option key={nation.AUDIT_TYPE_NAME} value={nation.AUDIT_TYPE}>
            {nation.AUDIT_TYPE_NAME}
          </option>
        ))}
      </select>
    );
  } else {
    listItems = <p>ачаалж байна...</p>;
  }
  return listItems;
}

function Period(props) {
  const [data, loadData] = useState([]);
  useEffect(() => {
    async function fetchData() {
      let listItems = await axios(Stat_URL + "library/" + "period/");
      if (listItems.data !== undefined && listItems.data.length > 0)
        loadData(listItems.data);
    }
    fetchData();
  }, [props]);
  let listItems;
  if (data !== undefined) {
    listItems = (
      <select
        disabled={props.edit}
        value={props.data?.Audit.PERIOD_ID}
        className="border rounded text-sm focus:outline-none py-0.5"
        // style={
        //   ({ border: "1px solid black", borderRadius: "4px" }, props.styleLib)
        // }
        onChange={(text) => {
          let value = props.data;
          value.Audit.PERIOD_ID = text.target.value;
          value.Audit.oldIndex = props.index;
          value.Audit.CREATED_BY = userDetils?.USER_ID;
          value.Audit.CREATED_DATE = dateFormat(new Date(), "dd-mmm-yy");
          props.setData({ ...value });
        }}
      >
        {props.title !== undefined ? (
          <option value="999" disabled selected hidden>
            {props.title}
          </option>
        ) : null}
        <option value={999}>Бүгд</option>
        {data?.map((nation, index) => (
          <option key={nation.YEAR_LABEL} value={nation.PERIOD_ID}>
            {nation.YEAR_LABEL}
          </option>
        ))}
      </select>
    );
  } else {
    listItems = <p>ачаалж байна...</p>;
  }
  return listItems;
}

function FormType(props) {
  const [data, loadData] = useState([]);
  useEffect(() => {
    async function fetchData() {
      let listItems = await axios(Stat_URL + "library/" + "formtype/");
      if (listItems.data !== undefined && listItems.data.length > 0)
        loadData(listItems.data);
    }
    fetchData();
  }, [props]);
  let listItems;
  if (data !== undefined) {
    listItems = (
      <select
        disabled={props.edit}
        value={props.data?.Audit.AUDIT_FORM_TYPE}
        style={
          ({ border: "1px solid black", borderRadius: "4px" }, props.styleLib)
        }
        className={props.className}
        onChange={(text) => {
          let value = props.data;
          value.Audit.AUDIT_FORM_TYPE = text.target.value;
          value.Audit.oldIndex = props.index;
          value.Audit.CREATED_BY = userDetils?.USER_ID;
          value.Audit.CREATED_DATE = dateFormat(new Date(), "dd-mmm-yy");
          props.setData({ ...value });
        }}
      >
        {props.title !== undefined ? (
          <option value="999" disabled selected hidden>
            {props.title}
          </option>
        ) : null}
        <option value={999}>Сонгоно уу</option>
        {data?.map((nation, index) => (
          <option key={nation.FORM_TYPE_NAME} value={nation.AUDIT_FORM_TYPE}>
            {nation.FORM_TYPE_NAME}
          </option>
        ))}
      </select>
    );
  } else {
    listItems = <p>ачаалж байна...</p>;
  }
  return listItems;
}

function OrgType(props) {
  const [data, loadData] = useState([]);
  useEffect(() => {
    async function fetchData() {
      let listItems = await axios(Stat_URL + "library/" + "orgtype/");
      if (listItems.data !== undefined && listItems.data.length > 0)
        loadData(listItems.data);
    }
    fetchData();
  }, [props]);
  let listItems;
  if (data !== undefined) {
    listItems = (
      <select
        disabled={props.edit}
        value={props.data?.Audit.AUDIT_ORG_TYPE}
        style={
          ({ border: "1px solid black", borderRadius: "4px" }, props.styleLib)
        }
        onChange={(text) => {
          let value = props.data;
          value.Audit.CHECK_DEPARTMENT_ID = 999;
          // value.Team.filter((element, index) =>
          //   element.ROLE_ID === 6 ? (element.IS_ACTIVE = 0) : element.IS_ACTIVE
          // );
          value.Audit.AUDIT_ORG_TYPE = text.target.value;
          value.Audit.oldIndex = props.index;
          value.Audit.CREATED_BY = userDetils?.USER_ID;
          value.Audit.CREATED_DATE = dateFormat(new Date(), "dd-mmm-yy");
          props.setData({ ...value });
          props.setOrgType({
            type: text.target.value,
          });
        }}
      >
        {props.title !== undefined ? (
          <option value="" disabled selected hidden>
            {props.title}
          </option>
        ) : null}
        <option value={999}>Сонгоно уу</option>
        {data?.map((nation, index) => (
          <option
            key={nation.AUDIT_ORG_CHECK_NAME}
            value={nation.AUDIT_ORG_TYPE}
          >
            {nation.AUDIT_ORG_CHECK_NAME}
          </option>
        ))}
      </select>
    );
  } else {
    listItems = <p>ачаалж байна...</p>;
  }
  return listItems;
}

function SubOrgType(props) {
  const [data, loadData] = useState([]);
  useEffect(() => {
    async function fetchData() {
      let listItems = await axios(
        Stat_URL + "library/" + "checkdepartment/" + props.user_id
      );
      if (listItems.data !== undefined && listItems.data.length > 0)
        loadData(listItems.data);
    }
    fetchData();
  }, [props]);
  let listItems;
  if (data !== undefined) {
    listItems = (
      <select
        disabled={props.edit}
        value={props.data?.Audit.CHECK_DEPARTMENT_ID}
        style={
          ({ border: "1px solid black", borderRadius: "4px" }, props.styleLib)
        }
        onChange={(text) => {
          let value = props.data;
          value.Audit.CHECK_DEPARTMENT_ID = text.target.value;
          if (text.target.value !== 999) {
            value.Audit.AUDIT_CHECK_DEP_ID = data.find(
              (a) => a.ID.toString() === text.target.value
            )?.DEPARTMENT_ID;
            value.Audit.USER_DEPARTMENT_ID = data.find(
              (a) => a.ID.toString() === text.target.value
            )?.DEPARTMENT_ID;
          }
          value.Audit.oldIndex = props.index;
          value.Audit.CREATED_BY = userDetils?.USER_ID;
          value.Audit.CREATED_DATE = dateFormat(new Date(), "dd-mmm-yy");
          props.setData({ ...value });
        }}
      >
        {props.title !== undefined ? (
          <option value="" disabled selected hidden>
            {props.title}
          </option>
        ) : null}
        <option value={999}>Сонгоно уу</option>
        {data?.map((nation, index) => (
          <option key={nation.DEPARTMENT_NAME} value={nation.ID}>
            {nation.DEPARTMENT_NAME}
          </option>
        ))}
      </select>
    );
  } else {
    listItems = <p>ачаалж байна...</p>;
  }
  return listItems;
}

function Hak(props) {
  const [data, loadData] = useState([]);
  useEffect(() => {
    async function fetchData() {
      let listItems = await axios(Stat_URL + "library/" + "hak");
      if (listItems.data !== undefined && listItems.data.length > 0)
        loadData(listItems.data);
    }
    fetchData();
  }, [props]);
  let listItems;
  if (data !== undefined) {
    listItems = (
      <select
        disabled={props.edit}
        value={props.data?.Audit.CHECK_DEPARTMENT_ID}
        style={
          ({ border: "1px solid black", borderRadius: "4px" }, props.styleLib)
        }
        onChange={(text) => {
          let value = props.data;
          value.Audit.CHECK_DEPARTMENT_ID = text.target.value;
          value.Audit.oldIndex = props.index;
          value.Audit.CREATED_BY = userDetils?.USER_ID;
          value.Audit.CREATED_DATE = dateFormat(new Date(), "dd-mmm-yy");
          props.setData({ ...value });
        }}
      >
        {props.title !== undefined ? (
          <option value="" disabled selected hidden>
            {props.title}
          </option>
        ) : null}
        <option value={999}>Сонгоно уу</option>
        {data?.map((nation, index) => (
          <option key={nation.DEPARTMENT_NAME} value={nation.DEPARTMENT_ID}>
            {nation.DEPARTMENT_NAME}
            {""} {nation.DEPARTMENT_REGNO}
          </option>
        ))}
      </select>
    );
  } else {
    listItems = <p>ачаалж байна...</p>;
  }
  return listItems;
}

function Department(props) {
  const [data, loadData] = useState([]);
  useEffect(() => {
    async function fetchData() {
      let listItems = await axios(Stat_URL + "library/" + "department/");
      if (listItems.data !== undefined && listItems.data.length > 0)
        loadData(listItems.data);
    }
    fetchData();
  }, [props]);
  let listItems;
  if (data !== undefined) {
    listItems = (
      <select
        disabled={props.edit}
        value={props.data?.Audit.DEPARTMENT_ID}
        className="border rounded text-sm focus:outline-none py-1"
        // style={
        //   ({ border: "1px solid black", borderRadius: "4px" }, props.styleLib)
        // }
        onChange={(text) => {
          let value = props.data;
          value.Audit.DEPARTMENT_ID = text.target.value;
          value.Audit.oldIndex = props.index;
          value.Audit.CREATED_BY = userDetils?.USER_ID;
          value.Audit.CREATED_DATE = dateFormat(new Date(), "dd-mmm-yy");
          props.setData({ ...value });
        }}
      >
        {props.title !== undefined ? (
          <option value="999" disabled selected hidden>
            {props.title}
          </option>
        ) : null}
        <option value={999}>Бүгд</option>
        {data?.map((nation, index) => (
          <option key={nation.DEPARTMENT_NAME} value={nation.DEPARTMENT_ID}>
            {nation.DEPARTMENT_NAME}
          </option>
        ))}
      </select>
    );
  } else {
    listItems = <p>ачаалж байна...</p>;
  }
  return listItems;
}

function BudgetType(props) {
  const [data, loadData] = useState([]);
  useEffect(() => {
    async function fetchData() {
      let listItems = await axios(Stat_URL + "library/" + "budgettype/");
      if (listItems.data !== undefined && listItems.data.length > 0)
        loadData(listItems.data);
    }
    fetchData();
  }, [props]);
  let listItems;
  if (data !== undefined) {
    listItems = (
      <select
        disabled={props.edit}
        value={props.data?.Audit.BUDGET_TYPE_ID}
        className="border rounded text-sm focus:outline-none py-1"
        // style={
        //   ({ border: "1px solid black", borderRadius: "4px" }, props.styleLib)
        // }
        onChange={(text) => {
          let value = props.data;
          value.Audit.BUDGET_TYPE_ID = text.target.value;
          value.Audit.oldIndex = props.index;
          value.Audit.CREATED_BY = userDetils?.USER_ID;
          value.Audit.CREATED_DATE = dateFormat(new Date(), "dd-mmm-yy");
          props.setData({ ...value });
        }}
      >
        {props.title !== undefined ? (
          <option value="999" disabled selected hidden>
            {props.title}
          </option>
        ) : null}
        <option value={999}>Бүгд</option>
        {data?.map((nation, index) => (
          <option key={nation.DEPARTMENT_NAME} value={nation.BUDGET_TYPE_ID}>
            {nation.BUDGET_SHORT_NAME}
          </option>
        ))}
      </select>
    );
  } else {
    listItems = <p>ачаалж байна...</p>;
  }
  return listItems;
}

function Aimag({ dataP, setData, index }) {
  const [data, loadData] = useState([]);
  useEffect(() => {
    async function fetchData() {
      let listItems = await axios(Stat_URL + "library/office");
      if (listItems.data !== undefined && listItems.data.length > 0)
        loadData(listItems.data);
    }
    fetchData();
  }, [dataP]);
  let listItems;
  if (data !== undefined) {
    listItems = (
      <select
        disabled={false}
        value={dataP[index]?.IND_VALUE}
        onChange={(text) => {
          let temp = [...dataP];
          let textVal = data.find(
            (a) => a.OFFICE_ID.toString() === text.target.value.toString()
          );
          temp[index].IND_VALUE = text.target.value;
          temp[index].IND_VALUE_TEXT = textVal.OFFICE_NAME;
          setData(temp);
        }}
      >
        <option value={0}>Сонгоно уу</option>
        {data?.map((nation, index) => (
          <option key={index} value={nation.OFFICE_ID}>
            {nation.OFFICE_NAME}
          </option>
        ))}
      </select>
    );
  } else {
    listItems = <p>ачаалж байна...</p>;
  }
  return listItems;
}

function Sum({ dataP, setData, index }) {
  const [data, loadData] = useState([]);
  useEffect(() => {
    async function fetchData() {
      let listItems = await axios(Stat_URL + "library/suboffice");
      if (dataP[6].IND_VALUE !== null && dataP[6].IND_VALUE !== "") {
        loadData(
          listItems.data?.filter(
            (a) => parseInt(a.OFFICE_ID) === parseInt(dataP[6].IND_VALUE)
          )
        );
      } else loadData(listItems.data);
    }
    fetchData();
  }, [dataP]);
  let listItems;
  if (data !== undefined) {
    listItems = (
      <select
        disabled={false}
        value={dataP[index]?.IND_VALUE}
        onChange={(text) => {
          let temp = [...dataP];
          let textVal = data.find(
            (a) => a.SUB_OFFICE_ID.toString() === text.target.value.toString()
          );
          temp[index].IND_VALUE = text.target.value;
          temp[index].IND_VALUE_TEXT = textVal.SUB_OFFICE_NAME;
          setData(temp);
        }}
      >
        <option value={0}>Сонгоно уу</option>
        {data?.map((nation, index) => (
          <option key={index} value={nation.SUB_OFFICE_ID}>
            {nation.SUB_OFFICE_NAME}
          </option>
        ))}
      </select>
    );
  } else {
    listItems = <p>ачаалж байна...</p>;
  }
  return listItems;
}
function Parentbudget(props) {
  const [data, loadData] = useState([]);
  useEffect(() => {
    async function fetchData() {
      let listItems = await axios(Stat_URL + "library/" + "parentbudget/");
      if (listItems.data !== undefined && listItems.data.length > 0)
        loadData(listItems.data);
    }
    fetchData();
  }, [props]);
  let listItems;
  if (data !== undefined && data.length > 0) {
    listItems = (
      <select
        disabled={props.edit}
        value={props.data?.Audit.PARENT_BUDGET_ID}
        className="border rounded text-sm focus:outline-none py-1"
        style={{ maxWidth: "18rem" }}
        onChange={(text) => {
          let value = props.data;
          value.Audit.PARENT_BUDGET_ID = text.target.value;
          value.Audit.oldIndex = props.index;
          value.Audit.CREATED_BY = userDetils?.USER_ID;
          value.Audit.CREATED_DATE = dateFormat(new Date(), "dd-mmm-yy");
          props.setData({ ...value });
        }}
      >
        {props.title !== undefined ? (
          <option value="999" disabled selected hidden>
            {props.title}
          </option>
        ) : null}
        <option value={999}>Бүгд</option>
        {data?.map((nation, index) => (
          <option
            key={nation.PARENT_BUDGET_NAME}
            value={nation.PARENT_BUDGET_ID}
          >
            {nation.PARENT_BUDGET_NAME}
          </option>
        ))}
      </select>
    );
  } else {
    listItems = <p>ачаалж байна...</p>;
  }
  return listItems;
}
function checkNull(value) {
  if (value === undefined) return 0;
  else if (value === null) return 0;
  else if (value === "") return 0;
  else if (value === NaN) return 0;
  else return value;
}
function TTZlib(props) {
  const [data, loadData] = useState([]);
  useEffect(() => {
    async function fetchData() {
      let listItems = await axios(Stat_URL + "library/" + "ttz/");
      if (listItems.data !== undefined && listItems.data.length > 0)
        if (
          props.data.Audit.PARENT_BUDGET_ID !== undefined &&
          props.data.Audit.PARENT_BUDGET_ID !== 999 &&
          props.data.Audit.PARENT_BUDGET_ID !== "999"
        )
          loadData(
            listItems.data.filter(
              (a) =>
                parseInt(checkNull(a.ENT_TEZ)) ===
                parseInt(checkNull(props.data.Audit.PARENT_BUDGET_ID))
            )
          );
        else loadData(listItems.data);
    }
    fetchData();
  }, [props]);
  let listItems;
  if (data !== undefined) {
    listItems = (
      <select
        disabled={props.edit}
        value={props.data?.Audit.TTZ_ID}
        className="border rounded text-sm focus:outline-none py-1"
        style={{ maxWidth: "18rem" }}
        onChange={(text) => {
          let value = props.data;
          value.Audit.TTZ_ID = text.target.value;
          value.Audit.oldIndex = props.index;
          value.Audit.CREATED_BY = userDetils?.USER_ID;
          value.Audit.CREATED_DATE = dateFormat(new Date(), "dd-mmm-yy");
          props.setData({ ...value });
        }}
      >
        {props.title !== undefined ? (
          <option value="999" disabled selected hidden>
            {props.title}
          </option>
        ) : null}
        <option value={999}>Бүгд</option>
        {data?.map((nation, index) => (
          <option key={nation.TTZ_ID} value={nation.TTZ_ID}>
            {nation.TTZ_NAME}
          </option>
        ))}
      </select>
    );
  } else {
    listItems = <p>ачаалж байна...</p>;
  }
  return listItems;
}
function NariivchlalTypeSelect(props) {
  return (
    <select
      value={props.data}
      className="border rounded text-sm focus:outline-none"
      style={{ height: 26 }}
      onChange={(text) => {
        let value = props.data;
        value = text.target.value;
        props.setData(value);
      }}
    >
      <option key={1} value={1}>
        Нарийвчлалгүй дүн
      </option>
      <option key={1000} value={1000}>
        Мянгатаар
      </option>
      <option key={1000000} value={1000000}>
        Саятаар
      </option>
    </select>
  );
}

function ShilenType(props) {
  const [data, loadData] = useState([]);
  useEffect(() => {
    async function fetchData() {
      let listItems = await axios(Stat_URL + "library/" + "shilendans/");
      if (listItems.data !== undefined && listItems.data.length > 0)
        loadData(listItems.data);
    }
    fetchData();
  }, [props]);
  let listItems;
  if (data !== undefined) {
    listItems = (
      <select
        disabled={props.edit}
        value={props.data?.Audit.SHILEN_TYPE_ID}
        style={
          ({ border: "1px solid black", borderRadius: "4px" }, props.styleLib)
        }
        onChange={(text) => {
          let value = props.data;
          value.Audit.SHILEN_TYPE_ID = text.target.value;
          value.Audit.oldIndex = props.index;
          value.Audit.CREATED_BY = userDetils?.USER_ID;
          value.Audit.CREATED_DATE = dateFormat(new Date(), "dd-mmm-yy");
          props.setData({ ...value });
        }}
      >
        {props.title !== undefined ? (
          <option value="999" disabled selected hidden>
            {props.title}
          </option>
        ) : null}
        <option value={999}>Сонгоно уу</option>
        {data?.map((nation, index) => (
          <option key={nation.NAME} value={nation.ID}>
            {nation.NAME}
          </option>
        ))}
      </select>
    );
  } else {
    listItems = <p>ачаалж байна...</p>;
  }
  return listItems;
}

function ReasonType(props) {
  const [data, loadData] = useState([]);
  useEffect(() => {
    async function fetchData() {
      let listItems = await axios(Stat_URL + "library/" + "reasontype/");
      if (listItems.data !== undefined && listItems.data.length > 0)
        loadData(listItems.data);
    }
    fetchData();
  }, [props]);
  let listItems;
  if (data !== undefined) {
    listItems = (
      <select
        disabled={props.edit}
        value={props.data?.Audit.REASON_TYPE_ID}
        style={
          ({ border: "1px solid black", borderRadius: "4px" }, props.styleLib)
        }
        onChange={(text) => {
          let value = props.data;
          value.Audit.REASON_TYPE_ID = text.target.value;
          value.Audit.oldIndex = props.index;
          value.Audit.CREATED_BY = userDetils?.USER_ID;
          value.Audit.CREATED_DATE = dateFormat(new Date(), "dd-mmm-yy");
          props.setData({ ...value });
        }}
      >
        {props.title !== undefined ? (
          <option value="999" disabled selected hidden>
            {props.title}
          </option>
        ) : null}
        <option value={999}>Сонгоно уу</option>
        {data?.map((nation, index) => (
          <option key={nation.NAME} value={nation.ID}>
            {nation.NAME}
          </option>
        ))}
      </select>
    );
  } else {
    listItems = <p>ачаалж байна...</p>;
  }
  return listItems;
}
function PeriodType(props) {
  return (
    <select
      value={props.data?.Audit.PERIOD_TYPE}
      className="border rounded text-sm focus:outline-none py-0.5"
      // style={
      //   ({ border: "1px solid black", borderRadius: "4px" }, props.styleLib)
      // }
      onChange={(text) => {
        let value = props.data;
        value.Audit.PERIOD_TYPE = text.target.value;
        props.setData({ ...value });
      }}
    >
      <option value={1}>Явцаар</option>
      <option value={2}>Эцсээр</option>
    </select>
  );
}
export {
  AuditType,
  Period,
  FormType,
  OrgType,
  SubOrgType,
  Hak,
  Department,
  BudgetType,
  Aimag,
  Sum,
  Parentbudget,
  TTZlib,
  NariivchlalTypeSelect,
  ShilenType,
  ReasonType,
  PeriodType,
};
