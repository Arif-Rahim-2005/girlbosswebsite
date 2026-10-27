import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, CalendarDays, BookOpen } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { apiRequest } from "../api/api";

export default function PostDetail() {
  const { slug } = useParams();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function fetchPost() {
      setLoading(true);
      setError("");
      setPost(null);

      try {
        const data = await apiRequest("/posts");
        const posts = Array.isArray(data) ? data : data.posts || [];
        const foundPost = posts.find((item) => item.slug === slug);

        if (!foundPost) {
          throw new Error("This post could not be found.");
        }

        if (!cancelled) {
          setPost(foundPost);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message || "Unable to load this post.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchPost();

    return () => {
      cancelled = true;
    };
  }, [slug]);

  const formattedDate = post?.created_at
    ? new Date(post.created_at).toLocaleDateString("en-KE", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "";

  return (
    <div className="min-h-screen bg-[#FFFDF8] text-[#35271F]">
      <Navbar />

      <main>
        {/* Back navigation */}
        <section className="mx-auto max-w-5xl px-4 pt-8 sm:px-6 lg:px-8">
          <Link
            to="/posts"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#A7833E] transition hover:text-[#35271F]"
          >
            <ArrowLeft size={17} />
            Back to Our Stories
          </Link>
        </section>

        {loading ? (
          <section className="mx-auto max-w-5xl px-4 py-24 text-center">
            <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-[#E8DFD0] border-t-[#A7833E]" />
            <p className="mt-5 text-sm text-[#806F60]">Loading story...</p>
          </section>
        ) : error ? (
          <section className="mx-auto max-w-5xl px-4 py-24 text-center">
            <BookOpen size={42} className="mx-auto text-[#A7833E]" />

            <h1 className="mt-5 font-serif text-3xl font-semibold">
              Story not found
            </h1>

            <p className="mt-3 text-[#806F60]">{error}</p>

            <Link
              to="/posts"
              className="mt-7 inline-flex rounded-lg bg-[#35271F] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#4A382D]"
            >
              Explore Our Stories
            </Link>
          </section>
        ) : (
          <article className="mx-auto max-w-4xl px-4 pb-20 pt-10 sm:px-6 lg:px-8">
            {/* Article heading */}
            <header className="mx-auto max-w-3xl text-center">
              <span className="inline-block rounded-full border border-[#D8C7A4] bg-[#F7F0E2] px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#8C6A2D]">
                Our Stories
              </span>

              <h1 className="mt-6 font-serif text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl">
                {post.title}
              </h1>

              {formattedDate && (
                <div className="mt-5 flex items-center justify-center gap-2 text-sm text-[#806F60]">
                  <CalendarDays size={16} className="text-[#A7833E]" />
                  <time dateTime={post.created_at}>{formattedDate}</time>
                </div>
              )}

              <div className="mx-auto mt-7 h-px w-20 bg-[#C6A15B]" />
            </header>

            {/* Featured image */}
            {post.images?.length > 0 && (
              <div className="mt-10 overflow-hidden rounded-2xl border border-[#E8DFD0] bg-[#F7F0E2]">
                <img
                  src={post.images[0].image_url}
                  alt={post.title}
                  className="max-h-[560px] w-full object-cover"
                />
              </div>
            )}

            {/* Article content */}
            <div className="mx-auto mt-10 max-w-3xl">
              <div className="whitespace-pre-wrap break-words text-base leading-8 text-[#59483C] sm:text-lg sm:leading-9">
                {post.content}
              </div>
            </div>

            {/* Additional images */}
            {post.images?.length > 1 && (
              <section className="mt-12">
                <h2 className="mb-6 font-serif text-2xl font-semibold">
                  More from this story
                </h2>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  {post.images.slice(1).map((image) => (
                    <div
                      key={image.id}
                      className="overflow-hidden rounded-xl border border-[#E8DFD0] bg-white"
                    >
                      <img
                        src={image.image_url}
                        alt={post.title}
                        loading="lazy"
                        className="h-72 w-full object-cover transition duration-500 hover:scale-105"
                      />
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Return to stories */}
            <div className="mt-14 border-t border-[#E8DFD0] pt-8 text-center">
              <p className="font-serif text-xl">
                Discover more from Modesty Girlboss
              </p>

              <Link
                to="/posts"
                className="mt-5 inline-flex items-center gap-2 rounded-lg bg-[#35271F] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#4A382D]"
              >
                More Stories
                <ArrowLeft size={16} className="rotate-180" />
              </Link>
            </div>
          </article>
        )}
      </main>

      <Footer />
    </div>
  );
}
