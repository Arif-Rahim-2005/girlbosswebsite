import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiRequest } from "../api/api";
import ProductForm from "../components/PoductForm";

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Product form state
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");
  const [success, setSuccess] = useState("");

  async function fetchProducts() {
    try {
      setError("");

      const data = await apiRequest("/products");
      setProducts(data.products || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  // Open the form to add or edit a product
  function openModal(product = null) {
    setEditingProduct(product);
    setFormError("");
    setSuccess("");
    setShowModal(true);
  }

  // Close the form
  function closeModal() {
    if (submitting) return;

    setShowModal(false);
    setEditingProduct(null);
    setFormError("");
  }

  // Handle form submission and API requests
  async function handleProductSubmit(body, validationError) {
    if (validationError) {
      setFormError(validationError);
      return;
    }

    if (!body) {
      setFormError("Please check your product details and try again.");
      return;
    }

    setSubmitting(true);
    setFormError("");
    setSuccess("");

    try {
      let data;

      if (editingProduct) {
        data = await apiRequest(`/products/${editingProduct.id}`, {
          method: "PATCH",
          body,
        });
      } else {
        data = await apiRequest("/products", {
          method: "POST",
          body,
        });
      }

      setSuccess(
        data.message ||
          (editingProduct
            ? "Product updated successfully."
            : "Product added successfully."),
      );

      setShowModal(false);
      setEditingProduct(null);

      setLoading(true);
      await fetchProducts();
    } catch (err) {
      setFormError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#F5F0E7] px-5 pb-16 pt-28 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex flex-col justify-between gap-5 border-b border-[#44352D]/15 pb-8 sm:flex-row sm:items-center">
          <div>
            <Link
              to="/admin"
              className="text-sm text-[#A7833E] hover:text-[#44352D]"
            >
              ← Back to dashboard
            </Link>

            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.3em] text-[#A7833E]">
              Product Management
            </p>

            <h1 className="mt-3 font-serif text-4xl font-semibold text-[#44352D] sm:text-5xl">
              Your Products
            </h1>

            <p className="mt-3 text-sm text-[#44352D]/65">
              View and manage your products in one place.
            </p>
          </div>

          <button
            type="button"
            onClick={() => openModal()}
            className="self-start rounded-full bg-[#44352D] px-6 py-3 text-sm font-medium text-[#F5F0E7] transition-colors hover:bg-[#362419] sm:self-auto"
          >
            + Add Product
          </button>
        </div>

        {/* Success Message */}
        {success && (
          <div
            role="status"
            className="mt-6 rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-800"
          >
            {success}
          </div>
        )}

        {/* Product Count */}
        <div className="mt-8">
          <p className="text-sm text-[#44352D]/65">
            {loading
              ? "Loading products..."
              : `${products.length} ${
                  products.length === 1 ? "product" : "products"
                }`}
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <div className="py-20 text-center text-[#44352D]/65">
            Loading your products...
          </div>
        )}

        {/* Listing Error */}
        {!loading && error && (
          <div className="mt-8 rounded-2xl border border-red-200 bg-red-50 p-6">
            <p className="font-medium text-red-800">Couldn't load products</p>

            <p className="mt-2 text-sm text-red-700">{error}</p>

            <button
              type="button"
              onClick={() => {
                setLoading(true);
                fetchProducts();
              }}
              className="mt-4 text-sm font-semibold text-red-800 underline"
            >
              Try again
            </button>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && products.length === 0 && (
          <div className="mt-8 rounded-2xl border border-[#44352D]/10 bg-[#FAF5EB] px-6 py-16 text-center">
            <h2 className="font-serif text-2xl font-semibold text-[#44352D]">
              No products yet
            </h2>

            <p className="mt-3 text-sm text-[#44352D]/65">
              Add your first product to get started.
            </p>

            <button
              type="button"
              onClick={() => openModal()}
              className="mt-6 rounded-full bg-[#44352D] px-6 py-3 text-sm font-medium text-[#F5F0E7] hover:bg-[#362419]"
            >
              Add your first product
            </button>
          </div>
        )}

        {/* Product Grid */}
        {!loading && !error && products.length > 0 && (
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => {
              const primaryImage =
                product.images?.find((image) => image.is_primary) ||
                product.images?.[0];

              return (
                <article
                  key={product.id}
                  className="overflow-hidden rounded-2xl border border-[#44352D]/10 bg-[#FAF5EB]"
                >
                  <div className="aspect-[4/3] bg-[#F1E7D5]">
                    {primaryImage?.image_url ? (
                      <img
                        src={primaryImage.image_url}
                        alt={product.product_name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-sm text-[#44352D]/50">
                        No image available
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    <div className="flex items-start justify-between gap-3">
                      <h2 className="font-serif text-xl font-semibold text-[#44352D]">
                        {product.product_name}
                      </h2>

                      <span className="shrink-0 text-sm font-semibold text-[#A7833E]">
                        KSh{" "}
                        {Number(product.price_per_pack).toLocaleString("en-KE")}
                      </span>
                    </div>

                    <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-[#44352D]/65">
                      {product.product_description}
                    </p>

                    <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-[#44352D]/10 pt-4">
                      <span className="text-xs text-[#44352D]/60">
                        Packaging: {product.packaging}
                      </span>

                      <span
                        className={`rounded-full px-3 py-1 text-xs font-medium ${
                          product.availability === "Available"
                            ? "bg-green-100 text-green-800"
                            : "bg-[#F1E7D5] text-[#44352D]"
                        }`}
                      >
                        {product.availability}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => openModal(product)}
                      className="mt-5 w-full rounded-full border border-[#44352D]/20 px-5 py-3 text-sm font-medium text-[#44352D] transition-colors hover:bg-[#44352D] hover:text-white"
                    >
                      Edit Product
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>

      {/* Product Form Modal */}
      {showModal && (
        <ProductForm
          key={editingProduct?.id ?? "new-product"}
          product={editingProduct}
          onSubmit={handleProductSubmit}
          onClose={closeModal}
          submitting={submitting}
          formError={formError}
        />
      )}
    </div>
  );
}
