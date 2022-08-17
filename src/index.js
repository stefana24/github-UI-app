import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import store from "./redux/store";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UsersListing from "./components/UsersListing";
import UserRepos from "./components/UserRepos";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}></Route>
        <Route path="/:login" element={<UserRepos />} />
        <Route path="/users" element={<UsersListing />} />
      </Routes>
    </BrowserRouter>
  </Provider>
);
