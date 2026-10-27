import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import logo from "../assets/logo.jpeg";


export default function About() {
  return (
    <>
      <Navbar />
      <main>
        <div className="pt-20 bg-ivory-100">
          <section className="px-8 py-20">
            <div className="mx-auto max-w-3xl">
              {/* Page Heading */}
              <div className="text-center">
                <span className="text-xs font-medium uppercase tracking-[0.3em] text-[#A7833E]">
                  About
                </span>

                <h1 className="mt-4 font-serif text-4xl font-semibold text-[#44352D] sm:text-5xl">
                  Our Story
                </h1>
              </div>

              <div className="my-8 flex justify-center sm:mb-10">
                <img
                  src={logo}
                  alt="Modesty Girlboss Enterprises logo"
                  className="h-40 w-auto object-contain sm:h-48 md:h-56 lg:h-64 border-be-gold-500 border"
                />
              </div>

              {/* Our Story */}
              <div className="mt-12 rounded-3xl border border-neutral-200 bg-[#fefaf3] p-8 shadow-sm sm:p-12">
                <p className="text-lg leading-relaxed text-neutral-500">
                  Modesty Girlboss Enterprises is a premier provider of
                  delightful delicacies crafted to satisfy and delight. We are
                  passionate about delivering exceptional, high-quality treats
                  that elevate your enjoyment.
                </p>
              </div>

              {/* Tagline */}
              <div className="mt-10 rounded-3xl border border-neutral-200 bg-gradient-to-br from-[#FAF5EB] to-[#F1E7D5] p-8 text-center shadow-sm sm:p-12">
                <h2 className="font-serif text-2xl font-semibold text-[#44352D]">
                  Our Tagline
                </h2>

                <p className="mt-4 font-serif text-xl italic text-[#A7833E]">
                  A little sweetness, thoughtfully made
                </p>

                <h2 className="font-serif text-2xl font-semibold text-[#44352D] mt-4">
                  Our Mission
                </h2>

                <p className="mt-4 font-serif text-xl italic text-[#A7833E]">
                  Delivering sweet delights rooted in modesty, quality, and
                  innovation.
                </p>
                <h2 className="font-serif text-2xl font-semibold text-[#44352D] mt-4">
                  Our Vision
                </h2>

                <p className="mt-4 font-serif text-xl italic text-[#A7833E]">
                  To redefine indulgence by blending taste, modesty, and
                  empowerment..
                </p>
              </div>

              {/* Instagram */}
              <div className="mt-10 text-center">
                <a
                  href="https://www.instagram.com/modesty.girlboss.enterprises/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-[#44352D] px-6 py-3 text-sm font-medium text-[#FAF5EB] transition-colors hover:bg-[#362419]"
                >
                  <span aria-hidden="true">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="lucide lucide-instagram"
                    >
                      <rect
                        width="20"
                        height="20"
                        x="2"
                        y="2"
                        rx="5"
                        ry="5"
                      ></rect>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                    </svg>
                  </span>
                  Follow Our Journey
                </a>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
