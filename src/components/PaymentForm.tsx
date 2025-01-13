/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button } from "antd";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { useCreatePaymentRequestMutation } from "../redux/features/paymentrequest/paymentrequestApi";
import { useAppSelector } from "../redux/hooks";
import { TResponse } from "../Types/global";

type PaymentFormData = {
  title: string;
  amount: number;
  email?: string; // Optional email field to include in the request
  status: string;
};

const PaymentForm = () => {
  const { control, handleSubmit, reset } = useForm<PaymentFormData>({
    defaultValues: {
      title: "",
      amount: 0,
    },
  });
  const user = useAppSelector((state) => state.auth.user);
  const [createRequest] = useCreatePaymentRequestMutation();

  const onSubmit = async (data: PaymentFormData) => {
    const toastId = toast.loading("Creating payment request...");
    try {
      // Append user email to the data
      const payload = {
        ...data,
        amount: Number(data.amount), // Convert amount to number
        email: user?.email,
        status: "pending",
      };

      const res = (await createRequest(payload)) as TResponse<PaymentFormData>;
      if (res.error) {
        toast.error(res.error?.data?.message, { id: toastId });
      } else {
        toast.success("Payment request sent successfully", { id: toastId });
        reset(); // Reset form fields after successful submission
      }
    } catch (error) {
      toast.error("Something went wrong!", { id: toastId });
    }
  };

  return (
    <>
      <h2 className="text-center text-4xl text-slate-800 font-semibold">
        Donation Request Form
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 w-3/4 mx-auto"
      >
        <Controller
          name="title"
          control={control}
          rules={{ required: "Payment title is required" }}
          render={({ field, fieldState }) => (
            <div>
              <label className="font-semibold">Title</label>
              <input
                {...field}
                type="text"
                placeholder="Payment Title"
                className="border-2 p-2 w-full border-slate-500 rounded-md"
              />
              {fieldState.error && (
                <p className="text-red-500">{fieldState.error.message}</p>
              )}
            </div>
          )}
        />
        <Controller
          name="amount"
          control={control}
          rules={{
            required: "Amount is required",
            min: { value: 1, message: "Amount must be greater than 0" },
          }}
          render={({ field, fieldState }) => (
            <div>
              <label className="font-semibold">Amount</label>
              <input
                {...field}
                type="number"
                placeholder="Amount"
                className="border-2 p-2 w-full border-slate-500 rounded-md"
              />
              {fieldState.error && (
                <p className="text-red-500">{fieldState.error.message}</p>
              )}
            </div>
          )}
        />
        <Button type="primary" htmlType="submit">
          Payment Request
        </Button>
      </form>
    </>
  );
};

export default PaymentForm;
