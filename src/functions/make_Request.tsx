import axios from "axios";

async function DataRequest(param: any) {
  try {
    return await axios({
      method: param.method, //put
      url: param.url,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      data: param.data,
    });
  } catch (error) {}
}
export default DataRequest;
