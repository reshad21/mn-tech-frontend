import CheckoutPage from "../pages/CheckoutPage";
import Home from "../pages/Home/Home";
import LoginPage from "../pages/LoginPage";
import SignUpPage from "../pages/SignUpPage";
export const frontendPaths = [
  {
    path: "/",
    element: <Home />,
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
    path: "/checkout",
    element: <CheckoutPage />,
  },
  // {
  //   path: "/products",
  //   element: (
  //     <ProtectedRoute>
  //       <Productpage />
  //     </ProtectedRoute>
  //   ),
  // },
];
