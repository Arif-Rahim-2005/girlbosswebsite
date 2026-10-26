import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function AdminDashboard() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("role");

    navigate("/login");
  }

  const sections = [
    {
      title: "Products",
      description: "Add new sweets, update product details, and manage images.",
      link: "/admin/products",
      action: "Manage products",
    },
    {
      title: "Blog Posts",
      description: "Write stories, save drafts, and publish blog posts.",
      link: "/admin/posts",
      action: "Manage posts",
    },
    {
      title: "Users",
      description: "View and manage users",
      link: "/admin/users",
      action: "Manage users",
    },
  ];

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#F5F0E7] px-5 pb-16 pt-28 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <div className="flex flex-col justify-between gap-6 border-b border-[#44352D]/15 pb-8 sm:flex-row sm:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#A7833E]">
                Modesty Girlboss Enterprises
              </p>

              <h1 className="mt-3 font-serif text-4xl font-semibold text-[#44352D] sm:text-5xl">
                Admin Dashboard
              </h1>

              <p className="mt-3 text-sm text-[#44352D]/65">
                Welcome back, {user.username || "Admin"}. Manage your business
                from here.
              </p>
            </div>

            <button
              onClick={handleLogout}
              className="self-start rounded-full border border-[#44352D]/20 px-6 py-3 text-sm font-medium text-[#44352D] transition-colors hover:border-[#44352D] hover:bg-[#44352D] hover:text-[#F5F0E7] sm:self-auto"
            >
              Log out
            </button>
          </div>


          {/* Management Sections */}
          <section className="mt-14">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#A7833E]">
                Workspace
              </p>
              <h2 className="mt-2 font-serif text-3xl font-semibold text-[#44352D]">
                Manage your content
              </h2>
            </div>

            <div className="mt-6 grid gap-5 md:grid-cols-2">
              {sections.map((section) => (
                <div
                  key={section.title}
                  className="rounded-2xl border border-[#44352D]/10 bg-[#FAF5EB] p-7 transition-shadow hover:shadow-md sm:p-8"
                >
                  <h3 className="font-serif text-2xl font-semibold text-[#44352D]">
                    {section.title}
                  </h3>

                  <p className="mt-3 max-w-md text-sm leading-relaxed text-[#44352D]/65">
                    {section.description}
                  </p>

                  <Link
                    to={section.link}
                    className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#44352D] px-5 py-3 text-sm font-medium text-[#F5F0E7] transition-colors hover:bg-[#362419]"
                  >
                    {section.action}
                    <span aria-hidden="true">→</span>
                  </Link>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
}
