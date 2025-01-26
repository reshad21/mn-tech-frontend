/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetAllProductRequestQuery } from "../../redux/features/product/productrequestApi";
import ProductCard from "./ProductCard";

const Product = ({ className }: { className?: string }) => {
  const {
    data: products,
    isLoading,
    error,
  } = useGetAllProductRequestQuery(undefined, {
    pollingInterval: 30000, // Poll every 30 seconds
  });

  console.log("get products==>", products?.data);

  if (isLoading) {
    return <p className="text-blue-500">Loading...</p>;
  }

  if (error) {
    return (
      <p className="text-rose-500 text-center">
        Cannot fetch data from the database. Please try again later.
      </p>
    );
  }
  return (
    <div className={`grid grid-cols-3 gap-5 ${className}`}>
      {products?.data.map((product: any) => (
        <ProductCard product={product} />
      ))}
    </div>
  );
};

export default Product;
