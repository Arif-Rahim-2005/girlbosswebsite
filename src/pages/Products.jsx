import ProductCard from "../components/ProductsCard";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

 const products = [
   {
     id: 1,
     name: "Labania",
     slug: "labania",
     description: "A traditional sweet made for moments worth sharing.",
     price: null,
     image: "https://placehold.co/600x750/F1E7D5/44352D?text=Labania",
   },
   {
     id: 2,
     name: "Kashata",
     slug: "kashata",
     description: "A beloved coastal treat with a delightful sweetness.",
     price: null,
     image: "https://placehold.co/600x750/F1E7D5/44352D?text=Kashata",
   },
   {
     id: 3,
     name: "Halwa",
     slug: "halwa",
     description: "A rich traditional delicacy enjoyed on special occasions.",
     price: null,
     image: "https://placehold.co/600x750/F1E7D5/44352D?text=Halwa",
   },
   {
     id: 4,
     name: "Ukwaju",
     slug: "ukwaju",
     description: "A tangy tamarind treat loved by many.",
     price: null,
     image: "https://placehold.co/600x750/F1E7D5/44352D?text=Ukwaju",
   },
   {
     id: 5,
     name: "Achari",
     slug: "achari",
     description: "A flavourful traditional treat with a distinctive taste.",
     price: null,
     image: "https://placehold.co/600x750/F1E7D5/44352D?text=Achari",
   },
 ];

export default function Products() {
  return (
    <>
      <main className="min-h-screen bg-[#F5F0E7] px-5 pb-20 pt-32 sm:px-8 lg:px-12">
        <Navbar />

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

          {/* Product Grid */}
          <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
