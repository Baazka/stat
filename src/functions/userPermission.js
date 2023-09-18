function UserPremission(userType, scope) {
  if (userType !== undefined && userType !== null) {
    if (2 <= userType && userType <= 3) userType = "BRANCH_AUDITOR";
    if (4 <= userType && userType <= 6) userType = "BRANCH_DIRECTOR";
    let USERTYPE = "";
    try {
      USERTYPE = userType.toUpperCase();
    } catch (e) {}
    if (USERTYPE === "ADMIN" || userType === 1) {
      return true;
    }
    if (scope === "HUVAARI") {
      if (USERTYPE === "BRANCH_DIRECTOR") return true;
      else return false;
    } else if (scope === "MAYAGTEDIT") {
      if (USERTYPE === "BRANCH_AUDITOR") {
        if (
          localStorage.getItem("userDetails") !== undefined &&
          JSON.parse(localStorage.getItem("userDetails")).USER_TYPE_NAME ===
            "HEAD_CHBG"
        )
          return false;
        else return true;
      } else return false;
    } else if (scope === "MAYAGT") {
      if (USERTYPE === "BRANCH_DIRECTOR") return true;
      else return false;
    }
  } else {
    return false;
  }
}

export default UserPremission;
