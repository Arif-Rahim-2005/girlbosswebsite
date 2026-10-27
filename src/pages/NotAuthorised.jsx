import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function NotAuthorised() {
  return (
    <>
      <Navbar />

      <main className="flex min-h-screen flex-col bg-[#F5F0E7]">
        <section className="relative flex flex-1 items-center justify-center overflow-hidden px-5 py-28 sm:px-8">
          {/* Decorative background */}
          <div className="absolute -left-24 top-1/4 h-72 w-72 rounded-full bg-[#C6A15B]/10 blur-3xl" />
          <div className="absolute -right-24 bottom-1/4 h-80 w-80 rounded-full bg-[#44352D]/5 blur-3xl" />

          <div className="relative z-10 mx-auto w-full max-w-xl text-center">
            {/* Lock icon */}
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-[#C6A15B]/30 bg-[#C6A15B]/10 text-[#A7833E]">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="36"
                height="36"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <rect x="3" y="11" width="18" height="11" rx="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                <path d="m10 16 4 4" />
                <path d="m14 16-4 4" />
              </svg>
            </div>

            {/* Heading */}
            <p className="mt-8 text-xs font-medium uppercase tracking-[0.35em] text-[#A7833E]">
              Access Restricted
            </p>

            <h1 className="mt-4 font-serif text-4xl font-semibold leading-tight text-[#44352D] sm:text-5xl">
              This Area Is Reserved
            </h1>

            <p className="mx-auto mt-5 max-w-md text-sm leading-7 text-[#44352D]/70 sm:text-base">
              It looks like you don't have permission to access this page.
              Our admin dashboard is reserved for authorised team members.
            </p>

            {/* Divider */}
            <div className="mx-auto mt-8 h-px w-16 bg-[#C6A15B]" />

            <p className="mt-6 font-serif text-lg italic text-[#44352D]/80">
              A little sweetness, thoughtfully made.
            </p>

            {/* Actions */}
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                to="/"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#44352D] px-7 py-3.5 text-sm font-medium text-[#F5F0E7] transition duration-300 hover:bg-[#362419] sm:w-auto"
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
                  <path d="m3 10 9-7 9 7" />
                  <path d="M5 9v12h14V9" />
                  <path d="M9 21v-8h6v8" />
                </svg>
                Return Home
              </Link>

              <Link
                to="/login"
                className="inline-flex w-full items-center justify-center rounded-full border border-[#44352D]/20 px-7 py-3.5 text-sm font-medium text-[#44352D] transition duration-300 hover:border-[#C6A15B] hover:bg-white/40 sm:w-auto"
              >
                Sign In
              </Link>
            </div>

            {/* Support message */}
            <p className="mt-10 text-xs leading-relaxed text-[#44352D]/50">
              Believe this is a mistake? Please contact the site administrator
              for assistance.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
;