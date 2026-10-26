import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <>
      <Link to={`/products/${product.slug}`} className="group block">
        {/* Product Image */}
        <div className="overflow-hidden rounded-2xl bg-[#F1E7D5]">
          <img
            src={product.image}
            alt={product.name}
            className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-105 sm:h-72"
          />
        </div>

        {/* Product Information */}
        <div className="mt-4">
          <div className="flex items-start justify-between gap-3">
            <h2 className="font-serif text-xl font-medium text-[#44352D] transition-colors group-hover:text-[#A7833E]">
              {product.name}
            </h2>

            <span className="shrink-0 text-sm font-medium text-[#A7833E]">
              {product.price != null
                ? `KSh ${Number(product.price).toLocaleString("en-KE")}`
                : "Price on enquiry"}
            </span>
          </div>

          <p className="mt-2 text-sm leading-relaxed text-neutral-500">
            {product.description}
          </p>

          <div className="mt-4 flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-[#A7833E] transition-colors group-hover:text-[#44352D]">
            View Details
            <span aria-hidden="true">→</span>
          </div>
        </div>
      </Link>
    </>
  );
}
