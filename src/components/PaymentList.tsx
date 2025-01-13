/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from "react-router-dom"; // Adjusted to use 'react-router-dom'
import { useGetAllPaymentRequestQuery } from "../redux/features/paymentrequest/paymentrequestApi";

const PaymentList = () => {
  const {
    data: payments,
    isLoading,
    error,
  } = useGetAllPaymentRequestQuery(undefined, {
    pollingInterval: 30000, // Poll every 30 seconds
  });

  if (isLoading) {
    return <p className="text-blue-500">Loading...</p>;
  }

  if (error) {
    return (
      <p className="text-rose-500 text-center">
        Cannot fetch data from the database. Please try again later.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-4 gap-4">
        {payments?.data.map((payment: any) => (
          <div key={payment.id} className="border p-4">
            <div className="mb-4">
              <h3 className="font-bold">{payment.title}</h3>
              <p>Amount: ${payment.amount}</p>
              <p>
                Status:{" "}
                <span
                  className={`font-semibold ${
                    payment.status === "approved"
                      ? "text-green-700"
                      : "text-blue-700"
                  }`}
                >
                  {payment.status}
                </span>
              </p>
            </div>
            {payment.status === "approved" ? (
              <Link
                className="bg-blue-500 text-white px-3 py-2 border rounded-md"
                to="/checkout"
              >
                Pay Now
              </Link>
            ) : (
              <button
                className="bg-gray-400 text-white px-3 py-2 border rounded-md cursor-not-allowed"
                disabled
              >
                Not Approved
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaymentList;
