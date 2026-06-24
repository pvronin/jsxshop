import { motion } from "framer-motion";
import ProductCard from "./ProductCard";

export default function ProductGrid({ products }) {


  if (products.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-16 text-center text-xl text-gray-500 border border-gray-200">
        😔 محصولی یافت نشد.
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8 min-h-auto"
    >
      {products.map((item) => (
        <ProductCard key={item.id} item={item} />
      ))}
    </motion.div>
  );
}
