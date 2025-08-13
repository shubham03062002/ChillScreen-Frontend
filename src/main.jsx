import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react"; // ✅ Added import
import { store, persistor } from "./redux/store"; // ✅ Import both

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
        <App />
        <ToastContainer position="top-right" autoClose={3000} />
      </PersistGate>
    </Provider>
  </StrictMode>
);
