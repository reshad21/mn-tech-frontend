/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useCreateOrderMutation } from "../redux/features/order/orderApi";

const CheckoutPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [createOrder] = useCreateOrderMutation();

  const onSubmit = async (data: any) => {
    console.log("get form data==>", data);
    const toastId = toast.loading("Processing Order...");
    try {
      const { fullName, address, phone, email, paymentMethod, finalAmount } =
        data;
      const orderData = {
        userInfo: { fullName, address, phone, email, paymentMethod },
        finalAmount,
        transactionId: new Date().getTime().toString(),
      };
      const res = await createOrder(orderData).unwrap();
      console.log("Order successfully placed:", res);
      if (res.success) {
        window.location.href = res?.data?.payment_url;
      } else {
        toast.error("Payment not done", { id: toastId });
      }
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-8 p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label htmlFor="fullName" className="block font-medium mb-2">
            Full Name
          </label>
          <input
            type="text"
            id="fullName"
            {...register("fullName", { required: "Full Name is required" })}
            className="w-full border-gray-300 rounded-lg p-2"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="address" className="block font-medium mb-2">
            Address
          </label>
          <input
            type="text"
            id="address"
            {...register("address", { required: "Address is required" })}
            className="w-full border-gray-300 rounded-lg p-2"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="phone" className="block font-medium mb-2">
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            {...register("phone", {
              required: "Phone number is required",
              pattern: {
                value: /^[0-9]{10,15}$/,
                message: "Invalid phone number",
              },
            })}
            className="w-full border-gray-300 rounded-lg p-2"
          />
          {errors.phone && (
            <p className="text-red-500 text-sm">Invalid Phone Number</p>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="email" className="block font-medium mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                message: "Invalid email address",
              },
            })}
            className="w-full border-gray-300 rounded-lg p-2"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">Invalid email address</p>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="paymentMethod" className="block font-medium mb-2">
            Payment Method
          </label>
          <select
            id="paymentMethod"
            {...register("paymentMethod")}
            className="w-full border-gray-300 rounded-lg p-2"
          >
            <option value="stripe">Stripe</option>
            <option value="amerPay">AmerPay</option>
            <option value="cash">Cash</option>
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="finalAmount" className="block font-medium mb-2">
            Final Amount (৳)
          </label>
          <input
            type="number"
            id="finalAmount"
            {...register("finalAmount", {
              required: "Amount is required",
              min: 0,
            })}
            className="w-full border-gray-300 rounded-lg p-2"
          />
          {errors.finalAmount && (
            <p className="text-red-500 text-sm">Amount is required</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Donate Now
        </button>
      </form>
    </div>
  );
};

export default CheckoutPage;
