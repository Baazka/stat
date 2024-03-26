import { checkNullInt } from "./Tools";
function UserPremission(userType, scope, action) {
  if (scope === "mayagt") {
    if (action === "confirm") {
      switch (checkNullInt(userType)) {
        case 2:
          return true;
        case 3:
          return true;
        case 4:
          return true;
        default:
          return false;
      }
    } else if (action === "save") {
      switch (checkNullInt(userType)) {
        case 1:
          return true;
        default:
          return false;
      }
    }
  } else if (scope === "plan") {
    if (action === "view") {
      if (userType.toUpperCase() === "admin".toUpperCase()) {
        return true;
      } else if (userType.toUpperCase() === "STAT_ADMIN".toUpperCase()) {
        return true;
      } else if (userType.toUpperCase() === "HEAD_AUDITOR".toUpperCase()) {
        return false;
      } else if (userType.toUpperCase() === "MANAGER".toUpperCase()) {
        return false;
      } else if (userType.toUpperCase() === "AUDITOR".toUpperCase()) {
        return false;
      } else if (userType.toUpperCase() === "ALL_VIEWER".toUpperCase()) {
        return true;
      } else if (userType.toUpperCase() === "ANUZG".toUpperCase()) {
        return true;
      } else if (userType.toUpperCase() === "VIEWER".toUpperCase()) {
        return false;
      }
    } else if (action === "write") {
      switch (userType.toUpperCase()) {
        case "STAT_ADMIN".toUpperCase():
          return true;
        case "admin".toUpperCase():
          return true;
        case "MANAGER".toUpperCase():
          return true;
        default:
          return false;
      }
    } else if (action === "lock") {
      if (userType === "STAT_ADMIN") {
        return true;
      } else {
        return false;
      }
    }
  }
}

export default UserPremission;
