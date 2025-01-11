import { useEffect, useState } from "react";

const AdminPaymentList = () => {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    const fetchPayments = async () => {
      const res = await fetch("/api/payments");
      const data = await res.json();
      setPayments(data);
    };
    fetchPayments();
  }, []);

  const handleUpdateStatus = async (id, status) => {
    await fetch(`/api/payments/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    });
    setPayments((prev) =>
      prev.map((payment) =>
        payment.id === id ? { ...payment, status } : payment
      )
    );
  };

  return (
    <div className="space-y-4">
      {payments.map((payment) => (
        <div key={payment.id} className="border p-4">
          <h3 className="font-bold">{payment.title}</h3>
          <p>Amount: ${payment.amount}</p>
          <p>Status: {payment.status}</p>
          <div className="space-x-2">
            <button
              onClick={() => handleUpdateStatus(payment.id, "approved")}
              className="bg-green-500 text-white py-1 px-2 rounded"
            >
              Approve
            </button>
            <button
              onClick={() => handleUpdateStatus(payment.id, "rejected")}
              className="bg-red-500 text-white py-1 px-2 rounded"
            >
              Reject
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminPaymentList;
