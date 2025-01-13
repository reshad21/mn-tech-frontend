import PaymentForm from "../components/PaymentForm";
import PaymentList from "../components/PaymentList";

export const userPaths = [
  {
    index: true,
    // label: "Overview",
    element: <PaymentForm />,
  },
  {
    path: "my-donation", // Relative path
    label: "My Donation",
    element: <PaymentForm />,
  },
  {
    path: "all-payments", // Relative path
    label: "All Payments",
    element: <PaymentList />,
  },
];
