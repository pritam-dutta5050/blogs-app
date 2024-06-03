import ReactDOM from "react-dom/client";
// import './index.css';
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import WithRedirectToHome from "./utils/WithredirectToHome";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
const WrappedHomePage = WithRedirectToHome(App);
root.render(
  // <React.StrictMode>
  < WrappedHomePage/>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
