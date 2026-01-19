import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./routes.jsx";
import storeReducer, { initialStore } from "./store.js";

export const Context = React.createContext(null);

function ContextProvider({ children }) {
  const [store, setStore] = React.useState(initialStore());
  const [state, dispatchBase] = React.useReducer(storeReducer, store);

  React.useEffect(() => {
    setStore(state);
  }, [state]);

  const dispatch = (action) => dispatchBase(action);

  return <Context.Provider value={{ store: state, dispatch }}>{children}</Context.Provider>;
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ContextProvider>
      <RouterProvider router={router} />
    </ContextProvider>
  </React.StrictMode>
);