import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Navbar() {
const [menuOpen, setMenuOpen] = useState(false);
const location = useLocation();
const navigate = useNavigate();

const navLinks = [
{ label: "Home", path: "/" },
{ label: "Products", path: "/products" },
{ label: "About", path: "/about" },
];

const isActive = (path) => {
if (path === "/") return location.pathname === "/";
if (path === "/products") return location.pathname === "/products";
return location.pathname === path;
};

const closeMenu = () => setMenuOpen(false);

  return (
    <header className="fixed left-0 right-0 top-0 z-50 bg-[#F5F0E7]/80 backdrop-blur-md transition-all duration-300">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8 lg:px-12">
        {/* Brand */}{" "}
        <Link
          to="/"
          onClick={closeMenu}
          aria-label="Go to homepage"
          className="flex items-center gap-3 transition-opacity hover:opacity-80"
        >
          {" "}
          <div className="flex flex-col leading-none">
            {" "}
            <span className="font-serif text-lg font-semibold text-[#493323]">
              Modesty Girlboss{" "}
            </span>
            <span className="font-serif text-sm font-normal tracking-widest text-[#b08a45]">
              Enterprises
            </span>
          </div>
        </Link>
        {/* Desktop navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.path}
              className={`relative text-sm font-medium transition-colors duration-200 ${
                isActive(link.path)
                  ? "text-[#493323]"
                  : "text-neutral-500 hover:text-[#493323]"
              }`}
            >
              {link.label}

              {isActive(link.path) && (
                <span className="absolute -bottom-1.5 left-0 right-0 h-px bg-[#b08a45]" />
              )}
            </Link>
          ))}

          {/* Admin access */}
          <button
            type="button"
            onClick={() => navigate("/login")}
            aria-label="Admin access"
            className="flex items-center gap-1.5 rounded-full border border-neutral-300 px-3.5 py-1.5 text-xs font-medium text-neutral-500 transition-colors hover:border-[#b08a45] hover:text-[#493323]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            Admin
          </button>
        </nav>
        {/* Mobile menu button */}
        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          className="rounded-lg p-2 text-[#493323] md:hidden"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="m18 6-12 12" />
              <path d="m6 6 12 12" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="4" x2="20" y1="12" y2="12" />
              <line x1="4" x2="20" y1="6" y2="6" />
              <line x1="4" x2="20" y1="18" y2="18" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile navigation */}
      {menuOpen && (
        <nav className="border-t border-[#eadfce] bg-[#fffaf3] px-6 py-4 shadow-lg md:hidden">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.path}
                onClick={closeMenu}
                className={`text-sm font-medium ${
                  isActive(link.path)
                    ? "text-[#493323]"
                    : "text-neutral-500 hover:text-[#493323]"
                }`}
              >
                {link.label}
              </Link>
            ))}

            <button
              type="button"
              onClick={() => {
                closeMenu();
                navigate("/login");
              }}
              className="flex items-center gap-2 self-start text-sm font-medium text-neutral-500 hover:text-[#493323]"
            >
              Admin Access
            </button>
          </div>
        </nav>
      )}
    </header>
  );
}
