import { Link } from "react-router";

const ProductCard = () => {
  return (
    <div className="card bg-white w-full shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition duration-300">
      <figure className="relative">
        <img
          src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
          alt="Shoes"
          className="w-full h-64 object-cover"
        />
        <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md">
          Sale
        </div>
      </figure>
      <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-800">Stylish Shoes</h2>
        <div className="flex items-center justify-between mt-4">
          <span className="text-lg font-bold text-gray-800">$79.99</span>
          <Link
            to="/checkout"
            className="text-white py-2 px-4 rounded-lg shadow-md hover:bg-blue-700 transition duration-300 bg-orange-500"
          >
            Buy Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
