const axios = require("axios");

export async function Data_Request(param) {
  return await axios({
    method: param.method, //put
    url: param.url,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },

    data: param.data,
  });
}
