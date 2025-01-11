import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-5xl font-bold mb-4">404</h1>
      <p className="text-xl">
        Oops! The page you're looking for doesn't exist.
      </p>
      <Link to="/" className="text-blue-500 mt-6">
        Go Back to Homepage
      </Link>
    </div>
  );
};

export default NotFoundPage;
