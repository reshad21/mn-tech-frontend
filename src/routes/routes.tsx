import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import NotFoundPage from "../components/Ui/NotFound";
import { frontendPaths } from "./frontend.routes";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: frontendPaths,
  },
  //   {
  //     path: "dashboard/admin",
  //     element: <DashboardLayout />,
  //     children: adminPaths,
  //   },
  //   {
  //     path: "dashboard/user",
  //     element: <DashboardLayout />,
  //     children: userPaths,
  //   },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
export default router;
