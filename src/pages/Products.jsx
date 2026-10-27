import { useEffect, useState } from "react";
import ProductCard from "../components/ProductsCard";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { apiRequest } from "../api/api";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchProducts() {
      try {
        setError("");

        const data = await apiRequest("/products");

        setProducts(
          (data.products || []).map((product) => ({
            id: product.id,
            name: product.product_name,
            slug: product.slug,
            description: product.product_description,
            price: product.price_per_pack,
            image:
              product.images?.find((image) => image.is_primary)?.image_url ||
              product.images?.[0]?.image_url ||
              `https://placehold.co/600x750/F1E7D5/44352D?text=${encodeURIComponent(product.product_name)}`,
          })),
        );
      } catch (err) {
        setError(err.message || "Unable to load products. Please try again.");
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#F5F0E7] px-5 pb-20 pt-32 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          {/* Page Heading */}
          <div className="mb-14 text-center">
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-[#A7833E]">
              Our Collection
            </p>

            <h1 className="mt-4 font-serif text-4xl font-semibold text-[#44352D] sm:text-5xl">
              Our Products
            </h1>

            <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-neutral-500 sm:text-base">
              Discover our selection of traditional coastal sweets, thoughtfully
              made with care and quality.
            </p>
          </div>

          {/* Loading State */}
          {loading && (
            <p className="py-12 text-center text-[#44352D]/70">
              Loading our products...
            </p>
          )}

          {/* Error State */}
          {!loading && error && (
            <div className="py-12 text-center">
              <p className="text-red-700">{error}</p>

              <button
                type="button"
                onClick={() => window.location.reload()}
                className="mt-4 rounded-full bg-[#44352D] px-6 py-3 text-sm text-white transition hover:bg-[#362419]"
              >
                Try Again
              </button>
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && products.length === 0 && (
            <p className="py-12 text-center text-[#44352D]/70">
              Our products will be available here soon.
            </p>
          )}

          {/* Product Grid */}
          {!loading && !error && products.length > 0 && (
            <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
