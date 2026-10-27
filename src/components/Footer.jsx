import { Link } from "react-router-dom";

export default function Footer() {
  const links = [
    { name: "Home", path: "/" },
    { name: "Products", path: "/products" },
    { name: "Posts", path: "/posts" },
    { name: "About", path: "/about" },
  ];

  return (
    <footer className="border-t border-[#E8E6E1] bg-[#44352D] text-[#F5F0E7]">
      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:px-12">
        <div className="flex flex-col items-center gap-6 text-center">
          {/* Brand */}
          <Link to="/" className="flex flex-col items-center gap-2">
            <span className="font-serif text-2xl font-semibold">
              Modesty Girlboss
            </span>
            <span className="font-serif text-sm tracking-[0.3em] text-[#D6B66D]">
              Enterprises
            </span>
          </Link>

          {/* Navigation */}
          <nav className="flex flex-wrap items-center justify-center gap-5 text-sm text-[#F1E7D5]/70">
            {links.map((link, index) => (
              <span key={link.path} className="flex items-center gap-5">
                {index > 0 && <span className="text-[#F1E7D5]/30">·</span>}

                <Link
                  to={link.path}
                  className="transition-colors hover:text-[#D6B66D]"
                >
                  {link.name}
                </Link>
              </span>
            ))}
          </nav>

          {/* Instagram */}
          <a
            href="https://www.instagram.com/modesty.girlboss.enterprises/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full border border-[#F1E7D5]/30 px-5 py-2.5 text-sm transition-colors hover:border-[#D6B66D] hover:text-[#D6B66D]"
          >
            <span aria-hidden="true">
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
                className="lucide lucide-instagram"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
              </svg>
            </span>
            Follow on Instagram
          </a>

          {/* Copyright */}
          <p className="text-xs text-[#F1E7D5]/40">
            © {new Date().getFullYear()} Modesty Girlboss Enterprises. All
            rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
