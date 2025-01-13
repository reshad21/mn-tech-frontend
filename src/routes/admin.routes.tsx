import PaymentForm from "../components/PaymentForm";
import PaymentRequestsComponent from "../components/PaymentRequestsComponent";

export const adminPaths = [
  {
    index: true,
    // label: "Overview",
    element: <PaymentRequestsComponent />,
  },
  {
    path: "allusers",
    label: "All Users",
    element: <PaymentRequestsComponent />,
  },
  {
    path: "my-donation", // Relative path
    label: "My Donation",
    element: <PaymentForm />,
  },
];
