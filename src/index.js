import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { SidebarFilterContextProvider } from "./Pages/store/sidebarFilterContext";
import { Provider } from "react-redux";
import store from "./Pages/store";


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>        {/**here we are using the redux store  */}
  {/* <SidebarFilterContextProvider> */}
    <App />
  {/* </SidebarFilterContextProvider> */}
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
