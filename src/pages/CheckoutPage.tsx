/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { useCreateOrderMutation } from "../redux/features/order/orderApi";
import { useGetProductByIdQuery } from "../redux/features/product/productrequestApi";

const CheckoutPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const [createOrder] = useCreateOrderMutation();
  const [finalAmount, setFinalAmount] = useState<number | null>(null);

  const { productId } = useParams();
  const { data: product, isLoading, error } = useGetProductByIdQuery(productId);

  // Handle loading and error states
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data.</div>;
  if (!product?.data) return <div>No data available.</div>;

  // Destructuring product details
  const {
    name = "",
    description = "",
    price = 0,
    image = "",
  } = product?.data || {};

  // Watch for promo code input
  const promoCode = watch("promoCode");

  //discount for promocode
  const calculateFinalAmount = () => {
    let calculatedAmount = price; // Base price of the product
    if (promoCode === "PROMO10") {
      calculatedAmount *= 0.9; // Apply 10% discount
    } else if (promoCode === "PROMO5") {
      calculatedAmount *= 0.95; // Apply 5% discount
    }
    setFinalAmount(calculatedAmount.toFixed(2)); // Update the state
  };

  const onSubmit = async (data: any) => {
    const toastId = toast.loading("Processing Order...");
    try {
      const { fullName, address, phone, email, paymentMethod } = data;
      const orderData = {
        userInfo: { fullName, address, phone, email, paymentMethod },
        finalAmount,
        transactionId: new Date().getTime().toString(),
      };
      const res = await createOrder(orderData).unwrap();
      if (res.success) {
        window.location.href = res?.data?.payment_url;
      } else {
        toast.error("Payment not done", { id: toastId });
      }
    } catch (error) {
      toast.error("Error creating order.");
    }
  };

  return (
    <div className="max-w-5xl mx-auto mt-8 p-6 grid grid-cols-1 md:grid-cols-2 gap-8 bg-gray-50 rounded-lg shadow-lg">
      {/* Left Column: Product Details */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <img
          src={image || "https://via.placeholder.com/150"}
          alt={name}
          className="w-full h-64 object-cover rounded-md mb-4"
        />
        <h2 className="text-xl font-bold mb-2">{name}</h2>
        <p className="text-gray-600 mb-4">{description}</p>
        <span className="text-lg font-semibold text-gray-800">
          Price: ${price}
        </span>
      </div>

      {/* Right Column: Checkout Form */}
      <div className="bg-white p-6 rounded-lg shadow-md">
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
            <label htmlFor="promoCode" className="block font-medium mb-2">
              Promo Code (Optional)
            </label>
            <input
              type="text"
              id="promoCode"
              {...register("promoCode")}
              onBlur={calculateFinalAmount}
              placeholder="Enter promo code"
              className="w-full border-gray-300 rounded-lg p-2"
            />
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
              value={finalAmount ?? price}
              readOnly
              className="w-full border-gray-300 rounded-lg p-2 bg-gray-100"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Make Payment
          </button>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;
