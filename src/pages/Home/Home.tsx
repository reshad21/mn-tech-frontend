import { Link } from "react-router";
import Product from "../../components/Ui/Product";

const Home = () => {
  return (
    <div className="min-h-screen">
      <div className="flex flex-col md:flex-row gap-8 mb-12">
        {/* Product Section */}
        <div className="flex-1">
          <Product />
        </div>

        {/* Sidebar Section */}
        <div className="w-full md:w-1/4">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Others</h1>
          <Link
            to="/play-quize"
            className="block bg-blue-500 text-white text-center py-3 px-4 rounded-lg shadow-md hover:bg-blue-600 transition duration-300"
          >
            Play Quiz
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
