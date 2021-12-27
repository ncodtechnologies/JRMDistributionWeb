import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

import rootReducer from "./slices";

const store = configureStore({
  reducer: rootReducer,
});

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </Provider>
  );
}
export default App;
