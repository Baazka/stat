var dateFormat = require("dateformat");
const checkNull = function (value) {
  if (value === undefined) return 0;
  else if (value === null) return 0;
  else if (value === "") return 0;
  else if (value === NaN) return 0;
  else return value;
};
const checkNullFloat = function (value) {
  if (value === undefined) return 0;
  else if (value === null) return 0;
  else if (value === "") return 0;
  else if (value.toString() === "NaN") return 0;
  else return parseFloat(value);
};

const checkNullInt = function (value) {
  if (value === undefined) return 0;
  else if (value === null) return 0;
  else if (value === "") return 0;
  else if (value.toString() === "NaN") return 0;
  else return parseInt(value);
};

const checkString = function (value) {
  if (value === undefined) return "";
  else if (value === null) return "";
  else if (value === NaN) return "";
  else return value.toString();
};

const checkNullDate = function (value) {
  if (value === undefined) return null;
  else if (value === null) return null;
  else if (value === "") return null;
  else if (value === NaN) return null;
  else return dateFormat(value, "yyyy-mm-dd");
};
const check_save = function (status){
  const userDetails = JSON.parse(localStorage.getItem("userDetails"));
 
  if(status.STATUS?.STATUS ===0 || status.STATUS?.STATUS === null || status.STATUS?.STATUS === undefined ||status.STATUS?.STATUS === ""){
    if(status.ROLE?.ROLE_ID === 1){
      return true
    }else if(userDetails.USER_TYPE_NAME === 'ADMIN'){
      return true
    }else
    return false
  }else if(status.STATUS?.STATUS > 0){
      return false
  }
   
  
}

export { checkNull, checkString, checkNullFloat, checkNullDate,checkNullInt,check_save };
