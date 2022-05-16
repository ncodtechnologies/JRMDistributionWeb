import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

import rootReducer from "./slices";
import "react-notifications/lib/notifications.css";
import { NotificationContainer } from "react-notifications";

const store = configureStore({
  reducer: rootReducer,
});

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter basename="/admin">
        <AppRoutes />
        <NotificationContainer />
      </BrowserRouter>
    </Provider>
  );
}
export default App;
