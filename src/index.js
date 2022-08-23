import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { store, persistor } from "./app/store";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UsersListing from "./components/UsersListing";
import UserRepos from "./components/UserRepos";
import RepoFilesList from "./components/RepoFilesList";
import NotFound from "./components/pages/NotFound";
import CodePreview from "./components/CodePreview";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}></Route>
          <Route path="/:login" element={<UserRepos />} />
          <Route path="/users" element={<UsersListing />} />
          <Route path="/404" element={<NotFound />} />
          <Route path=":login/repoFiles" element={<RepoFilesList />} />
          <Route path="/convert" element={<CodePreview />} />
        </Routes>
      </BrowserRouter>
    </PersistGate>
  </Provider>
);
