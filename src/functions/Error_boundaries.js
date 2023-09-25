import React from "react";
import URL from "../Stat_URL";
import axios from "axios";
export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    axios({
      method: "post", //put
      url: URL + "front_log/",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      data: JSON.stringify(errorInfo),
    })
      .then((response) => {
        if (response.data.length > 0) {
          this.setState({ data: response.data });
        }
      })
      .catch(function (error) {});
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}
