import PaymentForm from "../components/PaymentForm";

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
];
