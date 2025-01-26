import CheckoutPage from "../pages/CheckoutPage";
import Home from "../pages/Home/Home";
import LoginPage from "../pages/LoginPage";
import PlayQuize from "../pages/PlayQuize/PlayQuize";
import SignUpPage from "../pages/SignUpPage";
import ProtectedRoute from "./ProtectedRoute";
export const frontendPaths = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/play-quize",
    element: (
      <ProtectedRoute>
        <PlayQuize />
      </ProtectedRoute>
    ),
  },
  {
    path: "/signup",
    element: <SignUpPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/checkout/:productId",
    element: <CheckoutPage />,
  },
  // {
  //   path: "/checkout",
  //   element: (
  //     <ProtectedRoute>
  //       <CheckoutPage />
  //     </ProtectedRoute>
  //   ),
  // },
];
