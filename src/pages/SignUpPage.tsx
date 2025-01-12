/* eslint-disable @typescript-eslint/no-unused-vars */
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useRegistrationMutation } from "../redux/features/auth/authApi";
import {
  RegistrationFormInputs,
  registrationSchema,
} from "../schemas/registrationSchema";

const SignUpPage = () => {
  const navigate = useNavigate();
  const [registration] = useRegistrationMutation();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrationFormInputs>({
    resolver: zodResolver(registrationSchema),
  });

  const onSubmit: SubmitHandler<RegistrationFormInputs> = async (data) => {
    const toastId = toast.loading("Creating account...");
    try {
      const role = "user";
      const registerData = { ...data, role };
      delete registerData.confirmPassword; // Remove confirmPassword before submitting
      const res = await registration(registerData);
      if (res.error) {
        toast.error("Something went wrong", { id: toastId });
      } else {
        toast.success("Account created successfully", { id: toastId });
        navigate("/login");
      }
    } catch (error) {
      toast.error("Something went wrong!", { id: toastId });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex-1 flex justify-center items-center p-5 sm:p-10">
        <div className="w-full max-w-md">
          <p className="text-center mb-6 text-3xl font-semibold">
            Create Your Account
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium">
                Email Address:
              </label>
              <input
                id="email"
                type="email"
                {...register("email")}
                className="w-full mt-2 p-2 border rounded"
              />
              {errors.email && (
                <p className="text-red-600 text-sm">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium">
                Password:
              </label>
              <input
                id="password"
                type="password"
                {...register("password")}
                className="w-full mt-2 p-2 border rounded"
              />
              {errors.password && (
                <p className="text-red-600 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium"
              >
                Confirm Password:
              </label>
              <input
                id="confirmPassword"
                type="password"
                {...register("confirmPassword")}
                className="w-full mt-2 p-2 border rounded"
              />
              {errors.confirmPassword && (
                <p className="text-red-600 text-sm">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition"
            >
              Sign Up
            </button>
          </form>

          <div className="text-center mt-4">
            <p className="text-sm">
              Already have an account?{" "}
              <button
                onClick={() => navigate("/login")}
                className="font-semibold text-indigo-600 hover:text-indigo-800"
              >
                Log in here
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
