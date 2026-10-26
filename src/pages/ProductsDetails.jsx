import { Link, useParams } from "react-router-dom";

const products = [
  {
    id: 1,
    name: "Labania",
    slug: "labania",
    description: "A traditional sweet made for moments worth sharing.",
    fullDescription:
      "Discover the delightful taste of Labania, one of the traditional sweets in our collection. Thoughtfully prepared for sharing with family and friends.",
    price: null,
    image: "https://placehold.co/800x900/F1E7D5/44352D?text=Labania",
  },
  {
    id: 2,
    name: "Kashata",
    slug: "kashata",
    description: "A beloved coastal treat with a delightful sweetness.",
    fullDescription:
      "Explore Kashata, a much-loved treat in our collection of traditional sweets. A lovely choice for sharing or enjoying as a special treat.",
    price: null,
    image: "https://placehold.co/800x900/F1E7D5/44352D?text=Kashata",
  },
  {
    id: 3,
    name: "Halwa",
    slug: "halwa",
    description: "A rich traditional delicacy enjoyed on special occasions.",
    fullDescription:
      "Discover Halwa, a traditional delicacy featured in our collection of coastal sweets. Explore its availability and packaging by contacting us.",
    price: null,
    image: "https://placehold.co/800x900/F1E7D5/44352D?text=Halwa",
  },
  {
    id: 4,
    name: "Ukwaju",
    slug: "ukwaju",
    description: "A tangy tamarind treat loved by many.",
    fullDescription:
      "Enjoy Ukwaju, a distinctive tamarind treat in our collection. Contact us to learn more about the available packaging and pricing.",
    price: null,
    image: "https://placehold.co/800x900/F1E7D5/44352D?text=Ukwaju",
  },
  {
    id: 5,
    name: "Achari",
    slug: "achari",
    description: "A flavourful traditional treat with a distinctive taste.",
    fullDescription:
      "Explore Achari from Modesty Girlboss Enterprises. Contact us for more information about this product and its availability.",
    price: null,
    image: "https://placehold.co/800x900/F1E7D5/44352D?text=Achari",
  },
];

export default function ProductDetails() {
  const { slug } = useParams();

  const product = products.find((item) => item.slug === slug);

  if (!product) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#F5F0E7] px-5 pt-24">
        <div className="text-center">
          <h1 className="font-serif text-3xl font-semibold text-[#44352D]">
            Product Not Found
          </h1>

          <p className="mt-3 text-sm text-neutral-500">
            Sorry, we couldn't find the product you're looking for.
          </p>

          <Link
            to="/products"
            className="mt-6 inline-flex rounded-full bg-[#44352D] px-6 py-3 text-sm font-medium text-[#FAF5EB] transition-colors hover:bg-[#362419]"
          >
            Browse Our Products
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#F5F0E7] px-5 pb-20 pt-32 sm:px-8 lg:px-12">
      <div className="mx-auto max-w-7xl">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm text-neutral-500" aria-label="Breadcrumb">
          <Link
            to="/products"
            className="transition-colors hover:text-[#A7833E]"
          >
            Products
          </Link>

          <span className="mx-2">/</span>

          <span className="text-[#44352D]">{product.name}</span>
        </nav>

        {/* Product Information */}
        <div className="grid grid-cols-1 items-start gap-10 md:grid-cols-2 md:gap-16">
          {/* Product Image */}
          <div className="overflow-hidden rounded-3xl bg-[#F1E7D5]">
            <img
              src={product.image}
              alt={product.name}
              className="aspect-[4/5] w-full object-cover"
            />
          </div>

          {/* Product Details */}
          <div className="py-2 md:py-8">
            <p className="text-xs font-medium uppercase tracking-[0.3em] text-[#A7833E]">
              Our Collection
            </p>

            <h1 className="mt-4 font-serif text-4xl font-semibold text-[#44352D] sm:text-5xl">
              {product.name}
            </h1>

            <p className="mt-5 text-base leading-7 text-neutral-500">
              {product.fullDescription}
            </p>

            <div className="my-8 border-t border-[#44352D]/10" />

            {/* Price */}
            <div>
              <p className="text-xs uppercase tracking-widest text-neutral-500">
                Price per pack
              </p>

              <p className="mt-2 font-serif text-2xl font-medium text-[#A7833E]">
                {product.price != null
                  ? `KSh ${Number(product.price).toLocaleString("en-KE")}`
                  : "Price on enquiry"}
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
              Contact us for pricing, packaging, and product availability.
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
  );
}
