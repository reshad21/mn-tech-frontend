/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Space, Table, Tag } from "antd";
import React, { useState } from "react";

interface PaymentRequest {
  id: number;
  userName: string;
  paymentTitle: string;
  amount: number;
  status: "Pending" | "Approved" | "Rejected";
}

const PaymentRequestsComponent: React.FC = () => {
  // Updated dummy data with paymentTitle
  const [paymentRequests, setPaymentRequests] = useState<PaymentRequest[]>([
    {
      id: 1,
      userName: "John Doe",
      paymentTitle: "Monthly Subscription",
      amount: 100,
      status: "Pending",
    },
    {
      id: 2,
      userName: "Jane Smith",
      paymentTitle: "Annual Membership",
      amount: 250,
      status: "Approved",
    },
    {
      id: 3,
      userName: "Sam Wilson",
      paymentTitle: "One-time Donation",
      amount: 50,
      status: "Pending",
    },
  ]);

  // Approve payment
  const handleApprove = (id: number) => {
    setPaymentRequests((prev) =>
      prev.map((req) => (req.id === id ? { ...req, status: "Approved" } : req))
    );
  };

  // Reject payment
  const handleReject = (id: number) => {
    setPaymentRequests((prev) =>
      prev.map((req) => (req.id === id ? { ...req, status: "Rejected" } : req))
    );
  };

  // Table columns
  const columns = [
    {
      title: "User Name",
      dataIndex: "userName",
      key: "userName",
    },
    {
      title: "Payment Title",
      dataIndex: "paymentTitle",
      key: "paymentTitle",
    },
    {
      title: "Amount ($)",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => {
        const color =
          status === "Approved"
            ? "green"
            : status === "Rejected"
            ? "red"
            : "gold";
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_: any, record: PaymentRequest) => (
        <Space size="middle">
          <Button
            type="primary"
            onClick={() => handleApprove(record.id)}
            disabled={record.status !== "Pending"}
          >
            Approve
          </Button>
          <Button
            danger
            onClick={() => handleReject(record.id)}
            disabled={record.status !== "Pending"}
          >
            Reject
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: 24 }}>
      <h2>Payment Requests</h2>
      <Table
        dataSource={paymentRequests.map((item) => ({ ...item, key: item.id }))}
        columns={columns}
        bordered
      />
    </div>
  );
};

export default PaymentRequestsComponent;
