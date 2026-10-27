import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, CalendarDays } from "lucide-react";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { apiRequest } from "../api/api";

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function fetchPosts() {
      try {
        setLoading(true);
        setError("");

        const response = await apiRequest("/posts");

        if (!cancelled) {
          setPosts(Array.isArray(response.posts) ? response.posts : []);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message || "Unable to load posts.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    fetchPosts();

    return () => {
      cancelled = true;
    };
  }, []);

  const formatDate = (date) => {
    if (!date) return "";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) return "";

    return parsedDate.toLocaleDateString("en-KE", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const getExcerpt = (content, limit = 150) => {
    if (!content) return "";

    const plainText = content.replace(/\s+/g, " ").trim();

    if (plainText.length <= limit) return plainText;

    return `${plainText.slice(0, limit).trim()}…`;
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#35271F]">
      <Navbar />

      <main className="pt-20">
        {/* Page heading */}
        <section className="border-b border-[#E8DFD0] bg-[#FFFDF8]">
          <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 sm:py-20 lg:px-8">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-[#A7833E]">
              The Modesty Journal
            </p>

            <h1 className="font-serif text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              Stories & Inspiration
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-[#806F60] sm:text-lg">
              Discover our latest stories, inspiration, updates, and a little
              more about the world of Modesty Girlboss Enterprises.
            </p>

            <div className="mx-auto mt-7 h-px w-20 bg-[#C5A15B]" />
          </div>
        </section>

        {/* Posts section */}
        <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
          {!loading && !error && posts.length > 0 && (
            <div className="mb-8 flex items-center justify-between">
              <p className="text-sm text-[#806F60]">
                Explore our latest stories
              </p>

              <span className="text-sm text-[#A7833E]">
                {posts.length} {posts.length === 1 ? "post" : "posts"}
              </span>
            </div>
          )}

          {/* Loading state */}
          {loading && (
            <div className="py-24 text-center">
              <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-[#E8DFD0] border-t-[#A7833E]" />

              <p className="mt-5 text-sm text-[#806F60]">
                Discovering our latest stories...
              </p>
            </div>
          )}

          {/* Error state */}
          {!loading && error && (
            <div className="rounded-2xl border border-[#E8DFD0] bg-white px-6 py-14 text-center">
              <BookOpen size={36} className="mx-auto text-[#A7833E]" />

              <h2 className="mt-5 font-serif text-2xl font-semibold">
                We couldn't load the posts
              </h2>

              <p className="mt-3 text-sm text-[#806F60]">{error}</p>

              <button
                type="button"
                onClick={() => window.location.reload()}
                className="mt-6 rounded-lg bg-[#35271F] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#4A392F]"
              >
                Try Again
              </button>
            </div>
          )}

          {/* Empty state */}
          {!loading && !error && posts.length === 0 && (
            <div className="rounded-2xl border border-[#E8DFD0] bg-white px-6 py-16 text-center">
              <BookOpen
                size={40}
                className="mx-auto text-[#C5A15B]"
                strokeWidth={1.5}
              />

              <h2 className="mt-5 font-serif text-2xl font-semibold">
                Something wonderful is coming
              </h2>

              <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#806F60]">
                We don't have any published stories just yet. Please check back
                soon for updates from Modesty Girlboss Enterprises.
              </p>
            </div>
          )}

          {/* Posts grid */}
          {!loading && !error && posts.length > 0 && (
            <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => {
                const image = post.images?.[0]?.image_url;

                return (
                  <article
                    key={post.id}
                    className="group flex flex-col overflow-hidden rounded-2xl border border-[#E8DFD0] bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#35271F]/5"
                  >
                    {/* Post image */}
                    <Link
                      to={`/posts/${post.slug}`}
                      aria-label={`Read ${post.title}`}
                      className="relative block aspect-[4/3] overflow-hidden bg-[#F2E9DC]"
                    >
                      {image ? (
                        <img
                          src={image}
                          alt={post.title}
                          loading="lazy"
                          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full flex-col items-center justify-center text-[#A7833E]">
                          <BookOpen size={38} strokeWidth={1.3} />

                          <span className="mt-3 font-serif text-lg">
                            Modesty Journal
                          </span>
                        </div>
                      )}

                      <div className="absolute left-4 top-4 rounded-full border border-white/50 bg-[#FFFDF8]/95 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#80602E]">
                        Our Stories
                      </div>
                    </Link>

                    {/* Post details */}
                    <div className="flex flex-1 flex-col p-6">
                      {post.created_at && (
                        <div className="mb-4 flex items-center gap-2 text-xs text-[#A7833E]">
                          <CalendarDays size={14} />

                          <time dateTime={post.created_at}>
                            {formatDate(post.created_at)}
                          </time>
                        </div>
                      )}

                      <h2 className="font-serif text-xl font-semibold leading-snug transition group-hover:text-[#A7833E] sm:text-2xl">
                        {post.title}
                      </h2>

                      <p className="mt-3 flex-1 text-sm leading-7 text-[#806F60]">
                        {getExcerpt(post.content)}
                      </p>

                      <Link
                        to={`/posts/${post.slug}`}
                        className="mt-6 inline-flex w-fit items-center gap-2 border-b border-[#C5A15B] pb-1 text-sm font-semibold text-[#35271F] transition hover:gap-3 hover:text-[#A7833E]"
                      >
                        Read More
                        <ArrowRight size={16} />
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}
