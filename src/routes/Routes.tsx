import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layout/RootLayout";
import Homepage from "../pages/HomePage";
import HistoryPage from "../pages/HistoryPage";
import FavoritePage from "../pages/FavoritePage";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Homepage />,
      },
      {
        path: "/favorite",
        element: <FavoritePage />,
      },
      {
        path: "/history",
        element: <HistoryPage />,
      },
    ],
  },
]);
