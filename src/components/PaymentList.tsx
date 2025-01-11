import { useEffect, useState } from "react";

const PaymentList = () => {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    const fetchPayments = async () => {
      const res = await fetch("/api/payments");
      const data = await res.json();
      setPayments(data);
    };
    fetchPayments();
  }, []);

  return (
    <div className="space-y-4">
      {payments.map((payment) => (
        <div key={payment.id} className="border p-4">
          <h3 className="font-bold">{payment.title}</h3>
          <p>Amount: ${payment.amount}</p>
          <p>Status: {payment.status}</p>
        </div>
      ))}
    </div>
  );
};

export default PaymentList;
