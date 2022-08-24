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
import Login from "./components/Login";
import Register from "./components/Register";
import ResetPassword from "./components/ResetPassword";
import PrivateRoute from "./components/pages/PrivateRoutes";
import { ThemeProvider } from "@mui/styles";
import { theme } from "./app/material-ui/materialUITheme";

import app from "./app/firebase/firebaseConfig";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <App />
                </PrivateRoute>
              }
            ></Route>
            <Route
              path="/:login"
              element={
                <PrivateRoute>
                  <UserRepos />
                </PrivateRoute>
              }
            />
            <Route
              path="/users"
              element={
                <PrivateRoute>
                  <UsersListing />
                </PrivateRoute>
              }
            />
            <Route path="/404" element={<NotFound />} />
            <Route
              path=":login/repoFiles"
              element={
                <PrivateRoute>
                  <RepoFilesList />
                </PrivateRoute>
              }
            />
            <Route
              path="/convert"
              element={
                <PrivateRoute>
                  <CodePreview />
                </PrivateRoute>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/resetPassword" element={<ResetPassword />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </PersistGate>
  </Provider>
);
