import PaymentRequestsComponent from "../components/PaymentRequestsComponent";

export const adminPaths = [
  {
    index: true,
    label: "Overview",
    element: <p>Overview chart</p>,
  },
  {
    path: "allusers", // Relative path
    label: "All Users",
    element: <PaymentRequestsComponent />,
  },
  {
    path: "profile", // Relative path
    label: "Profile",
    element: <p>Admin dashboard component</p>,
  },
  {
    path: "setting", // Relative path
    label: "Settings",
    element: <p>Admin dashboard component</p>,
  },
];
