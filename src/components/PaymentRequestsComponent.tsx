/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Space, Table, Tag } from "antd";
import React from "react";
import { toast } from "sonner";
import {
  useApprovePaymentRequestMutation,
  useGetAllPaymentRequestQuery,
  useRejectPaymentRequestMutation,
} from "../redux/features/paymentrequest/paymentrequestApi";

interface PaymentRequest {
  _id: number; // Adjust this field if your API uses a different field name (e.g., paymentRequestId)
  email: string;
  title: string;
  amount: number;
  status: "Pending" | "Approved" | "Rejected";
}

const PaymentRequestsComponent: React.FC = () => {
  // Fetch payment requests from the backend
  const {
    data: paymentRequests,
    isLoading,
    error,
  } = useGetAllPaymentRequestQuery(undefined);

  // Mutations for approve and reject
  const [approve] = useApprovePaymentRequestMutation();
  const [rejected] = useRejectPaymentRequestMutation();

  // Approve payment
  const handleApprove = (id: number) => {
    if (id) {
      approve({ id }); // Pass the correct id to the mutation
      toast.success(`Payment request #${id} approved.`);
    } else {
      console.error("ID is missing");
    }
  };

  // Reject payment
  const handleReject = (id: number) => {
    if (id) {
      rejected({ id }); // Pass the correct id to the mutation
      toast.error(`Payment request #${id} rejected.`);
    } else {
      console.error("ID is missing");
    }
  };

  // Table columns
  const columns = [
    {
      title: "User Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Payment Title",
      dataIndex: "title",
      key: "title",
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
          <Button type="primary" onClick={() => handleApprove(record._id)}>
            Approve
          </Button>
          <Button danger onClick={() => handleReject(record._id)}>
            Reject
          </Button>
        </Space>
      ),
    },
  ];

  // Handle error state
  if (error) {
    return (
      <p className="text-red-500">
        Failed to load payment requests. Please try again later.
      </p>
    );
  }

  return (
    <div style={{ padding: 24 }}>
      <h2 className="mb-5 text-4xl font-bold text-slate-800">
        Payment Requests List
      </h2>
      <Table
        dataSource={
          paymentRequests?.data.map((item: PaymentRequest) => ({
            ...item,
            key: item._id, // Ensure 'key' is set correctly for Ant Design table
          })) || []
        } // Fallback to empty array if no data
        columns={columns}
        loading={isLoading}
        bordered
        pagination={{ pageSize: 3, showSizeChanger: true }}
      />
    </div>
  );
};

export default PaymentRequestsComponent;
