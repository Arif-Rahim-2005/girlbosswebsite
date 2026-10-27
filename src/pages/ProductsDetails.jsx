import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { apiRequest } from "../api/api";

export default function ProductDetails() {
  const { slug } = useParams();

  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchProduct() {
      try {
        setLoading(true);
        setError("");
        setProduct(null);
        setSelectedImage(null);

        const data = await apiRequest("/products");

        const foundProduct = (data.products || []).find(
          (item) => item.slug === slug,
        );

        if (!foundProduct) {
          setError("not-found");
          return;
        }

        setProduct(foundProduct);

        // Put the primary image first, followed by the other images.
        const images = [...(foundProduct.images || [])].sort(
          (a, b) => Number(b.is_primary) - Number(a.is_primary),
        );

        if (images.length > 0) {
          setSelectedImage(images[0]);
        }
      } catch (err) {
        setError(err.message || "Unable to load this product.");
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [slug]);

  if (loading) {
    return (
      <>
        <Navbar />
        <main className="flex min-h-screen items-center justify-center bg-[#F5F0E7] px-5 pt-24">
          <p className="text-[#44352D]/70">Loading product details...</p>
        </main>
        <Footer />
      </>
    );
  }

  if (error || !product) {
    return (
      <>
        <Navbar />
        <main className="flex min-h-screen items-center justify-center bg-[#F5F0E7] px-5 pt-24">
          <div className="text-center">
            <h1 className="font-serif text-3xl font-semibold text-[#44352D]">
              {error === "not-found"
                ? "Product Not Found"
                : "Unable to Load Product"}
            </h1>

            <p className="mt-3 text-sm text-neutral-500">
              {error === "not-found"
                ? "Sorry, we couldn't find the product you're looking for."
                : error}
            </p>

            <Link
              to="/products"
              className="mt-6 inline-flex rounded-full bg-[#44352D] px-6 py-3 text-sm font-medium text-[#FAF5EB] transition-colors hover:bg-[#362419]"
            >
              Browse Our Products
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const fallbackImage = `https://placehold.co/800x900/F1E7D5/44352D?text=${encodeURIComponent(
    product.product_name,
  )}`;

  const productImages = [...(product.images || [])].sort(
    (a, b) => Number(b.is_primary) - Number(a.is_primary),
  );

  const mainImage = selectedImage?.image_url || fallbackImage;

  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#F5F0E7] px-5 pb-20 pt-32 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          {/* Breadcrumb */}
          <nav
            className="mb-8 text-sm text-neutral-500"
            aria-label="Breadcrumb"
          >
            <Link
              to="/products"
              className="transition-colors hover:text-[#A7833E]"
            >
              Products
            </Link>

            <span className="mx-2">/</span>

            <span className="text-[#44352D]">{product.product_name}</span>
          </nav>

          {/* Product Gallery and Information */}
          <div className="grid grid-cols-1 items-start gap-10 md:grid-cols-2 md:gap-16">
            {/* Product Image Gallery */}
            <div className="min-w-0">
              {/* Main Image */}
              <div className="overflow-hidden rounded-3xl bg-[#F1E7D5]">
                <img
                  key={mainImage}
                  src={mainImage}
                  alt={product.product_name}
                  className="aspect-[4/5] w-full object-cover"
                  onError={(event) => {
                    event.currentTarget.onerror = null;
                    event.currentTarget.src = fallbackImage;
                  }}
                />
              </div>

              {/* Image Thumbnails */}
              {productImages.length > 1 && (
                <div
                  className="mt-4 grid grid-cols-4 gap-3 sm:grid-cols-5"
                  aria-label="Product image gallery"
                >
                  {productImages.map((image, index) => {
                    const isSelected = selectedImage?.id === image.id;

                    return (
                      <button
                        key={image.id}
                        type="button"
                        onClick={() => setSelectedImage(image)}
                        aria-label={`View image ${index + 1} of ${product.product_name}`}
                        aria-pressed={isSelected}
                        className={`overflow-hidden rounded-xl border-2 bg-[#F1E7D5] transition-all ${
                          isSelected
                            ? "border-[#A7833E] ring-2 ring-[#A7833E]/20"
                            : "border-transparent opacity-75 hover:border-[#A7833E]/50 hover:opacity-100"
                        }`}
                      >
                        <img
                          src={image.image_url}
                          alt={`${product.product_name} view ${index + 1}`}
                          loading="lazy"
                          className="aspect-square w-full object-cover"
                          onError={(event) => {
                            event.currentTarget.onerror = null;
                            event.currentTarget.src = fallbackImage;
                          }}
                        />
                      </button>
                    );
                  })}
                </div>
              )}

              {productImages.length > 1 && (
                <p className="mt-3 text-xs text-neutral-500">
                  Select an image to view another angle.
                </p>
              )}
            </div>

            {/* Product Details */}
            <div className="py-2 md:py-8">
              <p className="text-xs font-medium uppercase tracking-[0.3em] text-[#A7833E]">
                Our Collection
              </p>

              <h1 className="mt-4 font-serif text-4xl font-semibold text-[#44352D] sm:text-5xl">
                {product.product_name}
              </h1>

              <p className="mt-5 text-base leading-7 text-neutral-500">
                {product.product_description}
              </p>

              <div className="my-8 border-t border-[#44352D]/10" />

              {/* Price */}
              <div>
                <p className="text-xs uppercase tracking-widest text-neutral-500">
                  Price per pack
                </p>

                <p className="mt-2 font-serif text-2xl font-medium text-[#A7833E]">
                  {product.price_per_pack != null
                    ? `KSh ${Number(product.price_per_pack).toLocaleString(
                        "en-KE",
                      )}`
                    : "Price on enquiry"}
                </p>
              </div>

              {/* Packaging */}
              <div className="mt-6">
                <p className="text-xs uppercase tracking-widest text-neutral-500">
                  Packaging
                </p>

                <p className="mt-2 text-sm text-[#44352D]">
                  {product.packaging || "Contact us for details"}
                </p>
              </div>

              {/* Availability */}
              <div className="mt-6">
                <p className="text-xs uppercase tracking-widest text-neutral-500">
                  Availability
                </p>

                <p className="mt-2 text-sm text-[#44352D]">
                  {product.availability || "Contact us to enquire"}
                </p>
              </div>

              <div className="my-8 border-t border-[#44352D]/10" />

              {/* Enquiry Button */}
              <a
                href="https://www.instagram.com/modesty.girlboss.enterprises/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-3 rounded-full bg-[#44352D] px-7 py-4 text-sm font-medium text-[#FAF5EB] transition-colors hover:bg-[#362419] sm:w-auto"
              >
                Enquire on Instagram
                <span aria-hidden="true">↗</span>
              </a>

              <p className="mt-4 text-xs leading-6 text-neutral-500">
                Contact us for further information about this product.
              </p>
            </div>
          </div>

          {/* Back to Products */}
          <div className="mt-16 border-t border-[#44352D]/10 pt-8">
            <Link
              to="/products"
              className="inline-flex items-center gap-2 text-sm font-medium text-[#44352D] transition-colors hover:text-[#A7833E]"
            >
              <span aria-hidden="true">←</span>
              Back to All Products
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
