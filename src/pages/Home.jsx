import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function ArrowRightIcon({ size = 16 }) {
return ( <svg
   xmlns="http://www.w3.org/2000/svg"
   width={size}
   height={size}
   viewBox="0 0 24 24"
   fill="none"
   stroke="currentColor"
   strokeWidth="2"
   strokeLinecap="round"
   strokeLinejoin="round"
   aria-hidden="true"
 > <path d="M5 12h14" /> <path d="m12 5 7 7-7 7" /> </svg>
);
}

function CookieIcon() {
return ( <svg
   xmlns="http://www.w3.org/2000/svg"
   width="36"
   height="36"
   viewBox="0 0 24 24"
   fill="none"
   stroke="currentColor"
   strokeWidth="1.2"
   strokeLinecap="round"
   strokeLinejoin="round"
   aria-hidden="true"
 > <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5" /> <path d="M8.5 8.5v.01" /> <path d="M16 15.5v.01" /> <path d="M12 12v.01" /> <path d="M11 17v.01" /> <path d="M7 14v.01" /> </svg>
);
}

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
          {" "}
          <div className="absolute inset-0 bg-gradient-to-b from-ivory-50 via-ivory-100 to-ivory-200" />
          <div className="absolute -left-20 top-1/4 h-72 w-72 rounded-full bg-gold-500/5 blur-3xl" />
          <div className="absolute -right-20 bottom-1/4 h-96 w-96 rounded-full bg-espresso-500/5 blur-3xl" />
          <div className="relative z-10 px-5 text-center sm:px-8">
            <p
              className="mb-4 animate-fade-in text-xs font-medium uppercase tracking-[0.4em] text-gold-600"
              style={{ animationDelay: "0.3s" }}
            >
              Modesty Girlboss Enterprises
            </p>

            <h1
              className="mx-auto max-w-3xl animate-fade-up font-serif text-4xl font-semibold leading-tight text-espresso-500 sm:text-6xl lg:text-7xl"
              style={{ animationDelay: "0.5s" }}
            >
              A little sweetness, thoughtfully made
            </h1>

            <p
              className="mx-auto mt-6 max-w-2xl animate-fade-up text-base leading-relaxed text-neutral-500 sm:text-lg"
              style={{ animationDelay: "0.7s" }}
            >
              Delivering sweet delights rooted in modesty, quality, and
              innovation.
            </p>

            <div
              className="mt-10 flex animate-fade-up flex-col items-center justify-center gap-3 sm:flex-row"
              style={{ animationDelay: "0.9s" }}
            >
              <Link to="/products" className="btn-primary">
                Explore Our Products
                <ArrowRightIcon />
              </Link>
            </div>
          </div>
          <div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-fade-in"
            style={{ animationDelay: "1.2s" }}
          >
            <a
              href="#products"
              className="flex flex-col items-center gap-2 text-neutral-400 transition-colors hover:text-gold-600"
              aria-label="Scroll to products"
            >
              <span className="text-[10px] uppercase tracking-widest">
                Explore
              </span>
              <div className="h-12 w-px bg-gradient-to-b from-neutral-400 to-transparent" />
            </a>
          </div>
        </section>

        {/* Products Section */}
        <section
          id="products"
          className="bg-[#F5F0E7] px-5 py-20 sm:px-8 sm:py-24 lg:px-12"
        >
          {" "}
          <div className="mx-auto max-w-6xl">
            {" "}
            <div className="mb-10 text-center">
              {" "}
              <span className="text-xs font-medium uppercase tracking-[0.3em] text-[#A7833E]">
                {" "}
                Our Products{" "}
              </span>
              <h2 className="mt-3 font-serif text-3xl font-semibold text-[#44352D] sm:text-4xl">
                A Taste of Tradition
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-neutral-500 sm:text-base">
                Discover delightful traditional treats, thoughtfully prepared to
                bring a little sweetness to your day.
              </p>
            </div>
            <div className="mx-auto max-w-2xl rounded-3xl border border-[#E5DDD0] bg-[#F5F0E7] p-8 text-center shadow-sm sm:p-12">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#C6A15B]/10 text-[#A7833E]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="36"
                  height="36"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5" />
                  <path d="M8.5 8.5v.01" />
                  <path d="M16 15.5v.01" />
                  <path d="M12 12v.01" />
                  <path d="M11 17v.01" />
                  <path d="M7 14v.01" />
                </svg>
              </div>

              <h3 className="mt-5 font-serif text-2xl font-semibold text-[#44352D]">
                Something Sweet Awaits
              </h3>

              <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-neutral-500">
                Explore our collection of traditional treats, lovingly made to
                bring a little sweetness to every moment.
              </p>

              <Link
                to="/products"
                className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-[#44352D] px-6 py-3 text-sm font-medium text-white transition duration-300 hover:bg-[#362419]"
              >
                View All Products
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </section>
        {/* Featured Products Section */}
        <section className="px-8 py-20 bg-gradient-to-t via-ivory-50 via-ivory-100 to-ivory-200">
          <div className="mx-auto max-w-6xl">
            {/* Section Heading */}
            <div className="mb-10 text-center">
              <div className="mb-3 flex items-center justify-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-[#A7833E]"
                  aria-hidden="true"
                >
                  <path d="m12 3 1.9 5.8L20 11l-6.1 2.2L12 19l-1.9-5.8L4 11l6.1-2.2L12 3Z" />
                  <path d="M19 14v4" />
                  <path d="M21 16h-4" />
                </svg>

                <span className="font-sans text-xs font-medium uppercase tracking-[0.3em] text-[#A7833E]">
                  Featured
                </span>
              </div>

              <h2 className="font-serif text-3xl font-semibold text-[#44352D] sm:text-4xl">
                From Our Collection
              </h2>
            </div>

            {/* Featured Products Grid */}
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4">
              {/* Product cards will be rendered here from your backend */}
              <div className="col-span-full rounded-2xl border border-[#44352D]/10 bg-[#F5F0E7] px-6 py-12 text-center">
                <p className="font-serif text-xl font-medium text-[#44352D]">
                  Something Sweet Awaits
                </p>

                <p className="mx-auto mt-3 max-w-md font-sans text-sm leading-relaxed text-[#44352D]/70">
                  Discover our collection of traditional treats, thoughtfully
                  prepared to bring a little sweetness to your day.
                </p>

                <Link
                  to="/products"
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#44352D] px-6 py-3 font-sans text-sm font-medium text-[#F5F0E7] transition-colors duration-300 hover:bg-[#362419]"
                >
                  Explore All Products
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </section>
        {/* About Section */}
        <section className="px-8 py-20 bg-ivory-100">
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-xs font-medium uppercase tracking-[0.3em] text-[#A7833E]">
              About
            </span>

            <p className="mt-5 text-lg leading-relaxed text-neutral-500">
              Modesty Girlboss Enterprises is a premier provider of delightful
              delicacies crafted to satisfy and delight. We are passionate about
              delivering exceptional, high-quality treats that elevate your
              enjoyment.
            </p>

            <Link
              to="/about"
              className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-[#44352D] transition-colors hover:text-[#A7833E]"
            >
              Read more <span aria-hidden="true">→</span>
            </Link>
          </div>
        </section>
        {/* Contact Section */}
        <section className="px-8 py-20 bg-ivory-100">
          <div className="mx-auto max-w-2xl">
            <div className="rounded-3xl border border-neutral-200 bg-gradient-to-br from-[#FAF5EB] to-[#F1E7D5] p-10 text-center shadow-sm sm:p-14">
              <span className="text-3xl text-[#A7833E]" aria-hidden="true">
                ◎
              </span>

              <h2 className="mt-5 font-serif text-2xl font-semibold text-[#44352D] sm:text-3xl">
                Let's Connect
              </h2>

              <p className="mt-3 text-sm leading-relaxed text-neutral-500">
                Have a question about our sweets or want to place an enquiry?
                Reach out to us on Instagram.
              </p>

              <a
                href="https://www.instagram.com/modesty.girlboss.enterprises/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#44352D] px-6 py-3 text-sm font-medium text-[#FAF5EB] transition-colors hover:bg-[#362419]"
              >
                ◎ Message Us
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
