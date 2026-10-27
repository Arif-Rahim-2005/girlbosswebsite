import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { apiRequest } from "../api/api";

function ArrowRightIcon({ size = 16 }) {
  return (
    <svg
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
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  );
}

function CookieIcon() {
  return (
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
  );
}

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loadingFeatured, setLoadingFeatured] = useState(true);

  const [latestPosts, setLatestPosts] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(true);

  useEffect(() => {
    async function fetchFeaturedProducts() {
      try {
        const data = await apiRequest("/products");

        const products = Array.isArray(data)
          ? data
          : Array.isArray(data.products)
            ? data.products
            : [];

        setFeaturedProducts(
          products.filter(
            (product) =>
              product.is_featured === true &&
              product.availability === "Available",
          ),
        );
      } catch (error) {
        console.error("Failed to load featured products:", error);
      } finally {
        setLoadingFeatured(false);
      }
    }

    fetchFeaturedProducts();
  }, []);

  useEffect(() => {
    async function fetchLatestPosts() {
      try {
        const data = await apiRequest("/posts");

        const posts = Array.isArray(data)
          ? data
          : Array.isArray(data.posts)
            ? data.posts
            : [];

        const publishedPosts = posts
          .filter((post) => post.status === "published")
          .sort(
            (a, b) =>
              new Date(b.created_at || 0).getTime() -
              new Date(a.created_at || 0).getTime(),
          );

        setLatestPosts(publishedPosts.slice(0, 3));
      } catch (error) {
        console.error("Failed to load latest posts:", error);
      } finally {
        setLoadingPosts(false);
      }
    }

    fetchLatestPosts();
  }, []);

  return (
    <>
      <Navbar />

      <main>
        {/* Hero Section */}
        <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
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
          <div className="mx-auto max-w-6xl">
            <div className="mb-10 text-center">
              <span className="text-xs font-medium uppercase tracking-[0.3em] text-[#A7833E]">
                Our Products
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
                <CookieIcon />
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
                <ArrowRightIcon />
              </Link>
            </div>
          </div>
        </section>

        {/* Featured Products Section */}
        <section className="bg-gradient-to-t from-ivory-200 via-ivory-100 to-ivory-50 px-5 py-20 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-6xl">
            <div className="mb-10 text-center">
              <span className="text-xs font-medium uppercase tracking-[0.3em] text-[#A7833E]">
                Handpicked for You
              </span>

              <h2 className="mt-3 font-serif text-3xl font-semibold text-[#44352D] sm:text-4xl">
                Our Featured Treats
              </h2>

              <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-neutral-500 sm:text-base">
                Discover some of our favourite sweet delights.
              </p>
            </div>

            {loadingFeatured ? (
              <p className="py-12 text-center text-sm text-[#44352D]/65">
                Loading our featured treats...
              </p>
            ) : featuredProducts.length > 0 ? (
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4">
                {featuredProducts.map((product) => {
                  const primaryImage =
                    product.images?.find((image) => image.is_primary) ||
                    product.images?.[0];

                  return (
                    <Link
                      key={product.id}
                      to={`/products/${product.slug}`}
                      className="group overflow-hidden rounded-2xl border border-[#44352D]/10 bg-[#FAF5EB] transition duration-300 hover:-translate-y-1 hover:shadow-lg"
                    >
                      <div className="aspect-square overflow-hidden bg-[#F1E7D5]">
                        {primaryImage?.image_url ? (
                          <img
                            src={primaryImage.image_url}
                            alt={product.product_name}
                            loading="lazy"
                            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center text-sm text-[#44352D]/50">
                            Image coming soon
                          </div>
                        )}
                      </div>

                      <div className="p-4 sm:p-5">
                        <h3 className="font-serif text-lg font-semibold text-[#44352D] transition-colors group-hover:text-[#A7833E] sm:text-xl">
                          {product.product_name}
                        </h3>

                        <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-[#44352D]/65 sm:text-sm">
                          {product.product_description}
                        </p>

                        <p className="mt-4 text-sm font-semibold text-[#A7833E]">
                          KSh{" "}
                          {Number(product.price_per_pack).toLocaleString(
                            "en-KE",
                          )}
                        </p>

                        <span className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-[#44352D]">
                          Discover More <ArrowRightIcon />
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            ) : (
              <div className="rounded-2xl border border-[#44352D]/10 bg-[#F5F0E7] px-6 py-12 text-center">
                <p className="font-serif text-xl font-medium text-[#44352D]">
                 Featured products coming soon
                </p>

                <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-[#44352D]/70">
                  Our featured treats are being prepared. Explore our full
                  collection to discover something delightful.
                </p>

                <Link
                  to="/products"
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#44352D] px-6 py-3 text-sm font-medium text-[#F5F0E7] transition-colors duration-300 hover:bg-[#362419]"
                >
                  Explore All Products <ArrowRightIcon />
                </Link>
              </div>
            )}
          </div>
        </section>

        {/* Latest Blog Posts Section */}
        <section className="bg-[#F5F0E7] px-5 py-20 sm:px-8 sm:py-24 lg:px-12">
          <div className="mx-auto max-w-6xl">
            {/* Section Heading */}
            <div className="mb-10 text-center">
              <span className="text-xs font-medium uppercase tracking-[0.3em] text-[#A7833E]">
                From Our Blog
              </span>

              <h2 className="mt-3 font-serif text-3xl font-semibold text-[#44352D] sm:text-4xl">
                Stories & Sweet Traditions
              </h2>

              <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-neutral-500 sm:text-base">
                Explore our latest stories, discover coastal traditions, and
                learn more about the treats we love.
              </p>
            </div>

            {/* Blog Posts */}
            {loadingPosts ? (
              <p className="py-12 text-center text-sm text-[#44352D]/65">
                Loading our latest stories...
              </p>
            ) : latestPosts.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {latestPosts.map((post) => {
                  const postImage = post.images?.[0]?.image_url;

                  const plainTextContent = (post.content || "")
                    .replace(/<[^>]*>/g, "")
                    .replace(/\s+/g, " ")
                    .trim();

                  const excerpt =
                    plainTextContent.length > 150
                      ? `${plainTextContent.slice(0, 150)}...`
                      : plainTextContent ||
                        "Discover more in our latest story.";

                  const postDate = post.published_at || post.created_at;

                  return (
                    <article
                      key={post.id}
                      className="group overflow-hidden rounded-2xl border border-[#44352D]/10 bg-[#FAF5EB] transition duration-300 hover:-translate-y-1 hover:shadow-lg"
                    >
                      <Link
                        to={`/posts/${post.slug}`}
                        aria-label={`Read ${post.title}`}
                      >
                        <div className="aspect-[16/10] overflow-hidden bg-[#F1E7D5]">
                          {postImage ? (
                            <img
                              src={postImage}
                              alt={post.title}
                              loading="lazy"
                              className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                            />
                          ) : (
                            <div className="flex h-full items-center justify-center text-sm text-[#44352D]/50">
                              Modesty Girlboss Journal
                            </div>
                          )}
                        </div>
                      </Link>

                      <div className="p-6">
                        <p className="text-xs font-medium uppercase tracking-wider text-[#A7833E]">
                          {postDate
                            ? new Date(postDate).toLocaleDateString("en-KE", {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              })
                            : "Latest Story"}
                        </p>

                        <Link to={`/posts/${post.slug}`}>
                          <h3 className="mt-3 font-serif text-xl font-semibold text-[#44352D] transition-colors group-hover:text-[#A7833E]">
                            {post.title}
                          </h3>
                        </Link>

                        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-[#44352D]/70">
                          {excerpt}
                        </p>

                        <Link
                          to={`/posts/${post.slug}`}
                          className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#44352D] transition-colors hover:text-[#A7833E]"
                        >
                          Read Story <ArrowRightIcon />
                        </Link>
                      </div>
                    </article>
                  );
                })}
              </div>
            ) : (
              <div className="rounded-2xl border border-[#44352D]/10 bg-[#FAF5EB] px-6 py-12 text-center">
                <h3 className="font-serif text-xl font-medium text-[#44352D]">
                  Stories Coming Soon
                </h3>

                <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-[#44352D]/70">
                  We're preparing stories about our traditions, products, and
                  journey. Check back soon.
                </p>
              </div>
            )}

            {/* View All Posts */}
            <div className="mt-10 text-center">
              <Link
                to="/posts"
                className="inline-flex items-center gap-2 rounded-full border border-[#44352D]/20 px-6 py-3 text-sm font-medium text-[#44352D] transition-colors hover:bg-[#44352D] hover:text-[#F5F0E7]"
              >
                Explore All Stories <ArrowRightIcon />
              </Link>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="bg-ivory-100 px-5 py-20 sm:px-8">
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
        <section className="bg-ivory-100 px-5 py-20 sm:px-8">
          <div className="mx-auto max-w-2xl">
            <div className="rounded-3xl border border-neutral-200 bg-gradient-to-br from-[#FAF5EB] to-[#F1E7D5] p-10 text-center shadow-sm sm:p-14">
              <div className="flex justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#A7833E"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle
                    cx="17.5"
                    cy="6.5"
                    r="0.75"
                    fill="#A7833E"
                    stroke="none"
                  />
                </svg>
              </div>
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
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
                Message Us
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}

