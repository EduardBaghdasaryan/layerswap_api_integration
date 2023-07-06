import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
<<<<<<< HEAD
import App from "./App.js";
import Swap from "./Swap";
import SwapList from "./SwapList";
=======
import App from "./App";
import Swap from "./Swap";
import Swaps from "./Swaps";
>>>>>>> 311950705064b8fb398e1182aba4c717ee06f8ff

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/:id",
    element: <Swap />,
  },
  {
    path: "/swaps",
    element: <Swaps />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
