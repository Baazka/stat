import React, { useState } from "react";
import PropTypes from "prop-types";

const axios = require("axios");

export async function DataRequest(param) {
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
