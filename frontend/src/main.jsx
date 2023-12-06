import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { Provider } from "react-redux";
import store from "./components/redux/store.jsx";

import { Toaster } from "react-hot-toast";
import { GoogleOAuthProvider } from "@react-oauth/google";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GoogleOAuthProvider
      clientId={import.meta.env.VITE_REACT_APP_GOOGLE_AUTH_CLIENT_ID}
    >
      <Provider store={store}>
        <Toaster position="top-center" reverseOrder={false} />
        <App />
      </Provider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);
