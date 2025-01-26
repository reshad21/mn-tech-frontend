import { Link } from "react-router";

export type TProduct = {
  _id: string;
  img: string;
  description: string;
  name: string;
  price: number;
};

const ProductCard = ({ product }: { product: TProduct }) => {
  return (
    <div className="card bg-white w-full shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transition duration-300">
      <figure className="relative">
        <img
          src={product.img}
          alt="Shoes"
          className="w-full h-64 object-cover"
        />
        <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md">
          Sale
        </div>
      </figure>
      <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-800">{product?.name}</h2>
        <p className="text-gray-800">{product?.description}</p>

        <div className="flex items-center justify-between mt-4">
          <span className="text-lg font-bold text-gray-800">
            ${product.price}
          </span>
          <Link
            to={`/checkout/${product?._id}`}
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
