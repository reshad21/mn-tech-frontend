/* eslint-disable @typescript-eslint/no-explicit-any */

import { Link } from "react-router";
import { useGetAllPaymentRequestQuery } from "../redux/features/paymentrequest/paymentrequestApi";

const PaymentList = () => {
  const {
    data: payments,
    isLoading,
    error,
  } = useGetAllPaymentRequestQuery(undefined, {
    pollingInterval: 30000, // Poll every 30 seconds
  });
  // Handle error state
  if (isLoading) {
    return <p className="text-blue-500">Loading...</p>;
  }
  // Handle error state
  if (error) {
    return (
      <p className="text-rose-500 text-center">
        Can Not Fetch Data From DB Comeback After some moment..!
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {payments?.data.map((payment: any) => (
        <div key={payment.id} className="border p-4">
          <div className="mb-4">
            <h3 className="font-bold">{payment.title}</h3>
            <p>Amount: ${payment.amount}</p>
            <p>
              Status:{" "}
              <span className="text-blue-700 font-semibold">
                {payment.status}
              </span>
            </p>
          </div>
          <Link to="/checkout">Pay Now</Link>
        </div>
      ))}
    </div>
  );
};

export default PaymentList;
