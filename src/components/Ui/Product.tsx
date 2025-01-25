import ProductCard from "./ProductCard";

const Product = ({ className }: { className?: string }) => {
  return (
    <div className={`grid grid-cols-3 gap-5 ${className}`}>
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
    </div>
  );
};

export default Product;
