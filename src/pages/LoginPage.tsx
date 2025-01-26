/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { setUser, TUser } from "../redux/features/auth/authSlice";
import { useAppDispatch } from "../redux/hooks";
import { verifyToken } from "../utils/verifyToken";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [login] = useLoginMutation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const toastId = toast.loading("Logging in...");
    try {
      const res = await login({ email, password }).unwrap();
      const user = verifyToken(res.data.accessToken) as TUser;
      dispatch(setUser({ user: user, token: res.data.accessToken }));
      // navigate(`/dashboard/${user?.role}`);
      navigate(`/`);
      toast.success("Logged in successfully", { id: toastId, duration: 2000 });
    } catch (error) {
      toast.error(
        "Login failed. Please check your credentials and try again.",
        { id: toastId }
      );
    }
  };

  const navigateToRegister = () => {
    navigate("/signup");
  };

  const handlePresetLogin = (role: "admin" | "user") => {
    const credentials = {
      admin: { email: "admin@example.com", password: "password123" },
      user: { email: "reshad@gmail.com", password: "password123" },
    }[role];

    setEmail(credentials.email);
    setPassword(credentials.password);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-md p-8 sm:p-10">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
          Welcome Back
        </h1>

        <div className="flex justify-center space-x-4 mb-6">
          <button
            onClick={() => handlePresetLogin("admin")}
            className="px-4 py-2 bg-purple-700 text-white font-medium rounded-lg hover:bg-purple-800 transition"
          >
            Admin Login
          </button>
          <button
            onClick={() => handlePresetLogin("user")}
            className="px-4 py-2 bg-blue-700 text-white font-medium rounded-lg hover:bg-blue-800 transition"
          >
            User Login
          </button>
        </div>

        <form onSubmit={onSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 text-white font-bold rounded-lg hover:bg-indigo-700 transition duration-300"
          >
            Login
          </button>
        </form>

        <p className="text-center mt-6 text-sm text-gray-600">
          Don't have an account?{" "}
          <button
            onClick={navigateToRegister}
            className="font-medium text-indigo-600 hover:text-indigo-800"
          >
            Register here
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
