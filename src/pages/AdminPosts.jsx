import { useCallback, useEffect, useState } from "react";
import {
  Plus,
  Search,
  RefreshCw,
  FileText,
  Eye,
  Pencil,
  Trash2,
  X,
  Save,
  LoaderCircle,
  ImagePlus,
  ExternalLink,
} from "lucide-react";

import { Link, useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { apiRequest } from "../api/api";

const EMPTY_FORM = {
  title: "",
  content: "",
  status: "draft",
};

export default function AdminPosts() {
  const navigate = useNavigate();

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const [modalOpen, setModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [selectedImages, setSelectedImages] = useState([]);

  const [deletePost, setDeletePost] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const loadPosts = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = await apiRequest("/posts/manage");

      setPosts(Array.isArray(response.posts) ? response.posts : []);
    } catch (err) {
      setError(err.message || "Unable to load posts.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
      return;
    }

    loadPosts();
  }, [loadPosts, navigate]);

  const openCreateModal = () => {
    setEditingPost(null);
    setForm(EMPTY_FORM);
    setSelectedImages([]);
    setMessage("");
    setError("");
    setModalOpen(true);
  };

  const openEditModal = (post) => {
    setEditingPost(post);

    setForm({
      title: post.title || "",
      content: post.content || "",
      status: post.status || "draft",
    });

    setSelectedImages([]);
    setMessage("");
    setError("");
    setModalOpen(true);
  };

  const closeModal = () => {
    if (saving) return;

    setModalOpen(false);
    setEditingPost(null);
    setForm(EMPTY_FORM);
    setSelectedImages([]);
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleImageChange = (event) => {
    setSelectedImages(Array.from(event.target.files || []));
  };

  const handleSave = async (event) => {
    event.preventDefault();

    setError("");
    setMessage("");

    if (!form.title.trim() || !form.content.trim()) {
      setError("Please enter both a title and content.");
      return;
    }

    const formData = new FormData();

    formData.append("title", form.title.trim());
    formData.append("content", form.content.trim());
    formData.append("status", form.status);

    // Images are accepted when creating a post.
    if (!editingPost) {
      selectedImages.forEach((image) => {
        formData.append("images", image);
      });
    }

    setSaving(true);

    try {
      if (editingPost) {
        // Existing post: update its text and status.
        await apiRequest(`/posts/${editingPost.id}`, {
          method: "PATCH",
          body: formData,
        });

        // Add any newly selected images using the dedicated endpoint.
        if (selectedImages.length > 0) {
          const imageData = new FormData();

          selectedImages.forEach((image) => {
            imageData.append("images", image);
          });

          imageData.append("mode", "add");

          await apiRequest(`/posts/${editingPost.id}/images`, {
            method: "POST",
            body: imageData,
          });
        }

        setMessage("Post updated successfully.");
      } else {
        await apiRequest("/posts", {
          method: "POST",
          body: formData,
        });

        setMessage("Post created successfully.");
      }

      setModalOpen(false);
      setEditingPost(null);
      setForm(EMPTY_FORM);
      setSelectedImages([]);

      await loadPosts();
    } catch (err) {
      setError(err.message || "Unable to save the post.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deletePost) return;

    setDeleting(true);
    setError("");
    setMessage("");

    try {
      await apiRequest(`/posts/${deletePost.id}`, {
        method: "DELETE",
      });

      setPosts((previous) =>
        previous.filter((post) => post.id !== deletePost.id),
      );

      setMessage("Post deleted successfully.");
      setDeletePost(null);
    } catch (err) {
      setError(err.message || "Unable to delete the post.");
    } finally {
      setDeleting(false);
    }
  };

  const handleStatusChange = async (post, newStatus) => {
    setError("");
    setMessage("");

    const formData = new FormData();
    formData.append("status", newStatus);

    try {
      await apiRequest(`/posts/${post.id}`, {
        method: "PATCH",
        body: formData,
      });

      setPosts((previous) =>
        previous.map((item) =>
          item.id === post.id ? { ...item, status: newStatus } : item,
        ),
      );

      setMessage(
        newStatus === "published"
          ? "Post published successfully."
          : "Post saved as a draft.",
      );
    } catch (err) {
      setError(err.message || "Unable to update post status.");
    }
  };

  const filteredPosts = posts.filter((post) => {
    const matchesSearch = post.title
      ?.toLowerCase()
      .includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || post.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const totalPublished = posts.filter(
    (post) => post.status === "published",
  ).length;

  const totalDrafts = posts.filter((post) => post.status === "draft").length;

  const formatDate = (date) => {
    if (!date) return "—";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) return "—";

    return parsedDate.toLocaleDateString("en-KE", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#30251F] pt-24">
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        {/* Page heading */}
        <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <Link
              to="/admin"
              className="text-sm text-[#A7833E] hover:text-[#44352D]"
            >
              ← Back to dashboard
            </Link>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-[#A98245]">
              Administration
            </p>

            <h1 className="font-serif text-3xl font-semibold sm:text-4xl">
              Manage Posts
            </h1>

            <p className="mt-2 text-sm text-[#766A60]">
              Create, edit, publish, and manage your blog posts.
            </p>
          </div>

          <button
            type="button"
            onClick={openCreateModal}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#30251F] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#4A392F]"
          >
            <Plus size={18} />
            Create Post
          </button>
        </div>

        {/* Feedback messages */}
        {error && (
          <div
            role="alert"
            className="mb-5 flex items-start justify-between gap-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
          >
            <span>{error}</span>

            <button
              type="button"
              onClick={() => setError("")}
              aria-label="Dismiss error"
            >
              <X size={18} />
            </button>
          </div>
        )}

        {message && (
          <div
            role="status"
            className="mb-5 flex items-start justify-between gap-3 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-800"
          >
            <span>{message}</span>

            <button
              type="button"
              onClick={() => setMessage("")}
              aria-label="Dismiss message"
            >
              <X size={18} />
            </button>
          </div>
        )}

        {/* Summary cards */}
        <div className="mb-8 grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-[#E9E0D4] bg-white p-5">
            <div className="flex items-center justify-between">
              <p className="text-sm text-[#766A60]">Total Posts</p>

              <FileText className="text-[#A98245]" size={21} />
            </div>

            <p className="mt-3 text-3xl font-semibold">{posts.length}</p>
          </div>

          <div className="rounded-xl border border-[#E9E0D4] bg-white p-5">
            <div className="flex items-center justify-between">
              <p className="text-sm text-[#766A60]">Published</p>

              <Eye className="text-green-700" size={21} />
            </div>

            <p className="mt-3 text-3xl font-semibold">{totalPublished}</p>
          </div>

          <div className="rounded-xl border border-[#E9E0D4] bg-white p-5">
            <div className="flex items-center justify-between">
              <p className="text-sm text-[#766A60]">Drafts</p>

              <Pencil className="text-amber-700" size={21} />
            </div>

            <p className="mt-3 text-3xl font-semibold">{totalDrafts}</p>
          </div>
        </div>

        {/* Search and filters */}
        <section className="overflow-hidden rounded-xl border border-[#E9E0D4] bg-white">
          <div className="flex flex-col gap-4 border-b border-[#EEE6DC] p-5 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative w-full lg:max-w-md">
              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9A8C7F]"
              />

              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search posts by title..."
                className="w-full rounded-lg border border-[#E5DACE] bg-[#FFFEFC] py-3 pl-10 pr-4 text-sm outline-none focus:border-[#A98245]"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {["all", "published", "draft"].map((status) => (
                <button
                  key={status}
                  type="button"
                  onClick={() => setStatusFilter(status)}
                  className={`rounded-lg px-4 py-2 text-sm font-medium capitalize transition ${
                    statusFilter === status
                      ? "bg-[#30251F] text-white"
                      : "border border-[#E5DACE] text-[#766A60] hover:bg-[#FAF7F2]"
                  }`}
                >
                  {status === "all" ? "All Posts" : status}
                </button>
              ))}

              <button
                type="button"
                onClick={loadPosts}
                disabled={loading}
                title="Refresh posts"
                className="rounded-lg border border-[#E5DACE] p-2.5 text-[#766A60] hover:bg-[#FAF7F2] disabled:opacity-50"
              >
                <RefreshCw
                  size={17}
                  className={loading ? "animate-spin" : ""}
                />
              </button>
            </div>
          </div>

          {/* Posts table */}
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-left">
              <thead className="bg-[#FAF7F2] text-xs uppercase tracking-wider text-[#766A60]">
                <tr>
                  <th className="px-5 py-4 font-semibold">Post</th>
                  <th className="px-5 py-4 font-semibold">Status</th>
                  <th className="px-5 py-4 font-semibold">Images</th>
                  <th className="px-5 py-4 font-semibold">Created</th>
                  <th className="px-5 py-4 text-right font-semibold">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-[#F0E8DE]">
                {loading ? (
                  <tr>
                    <td colSpan="5" className="px-5 py-14 text-center">
                      <LoaderCircle
                        size={26}
                        className="mx-auto animate-spin text-[#A98245]"
                      />

                      <p className="mt-3 text-sm text-[#766A60]">
                        Loading posts...
                      </p>
                    </td>
                  </tr>
                ) : filteredPosts.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-5 py-14 text-center">
                      <FileText size={30} className="mx-auto text-[#C6B7A6]" />

                      <p className="mt-3 font-medium">No posts found</p>

                      <p className="mt-1 text-sm text-[#766A60]">
                        Try another search or create a new post.
                      </p>
                    </td>
                  </tr>
                ) : (
                  filteredPosts.map((post) => (
                    <tr key={post.id} className="transition hover:bg-[#FFFEFC]">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          {post.images?.[0]?.image_url ? (
                            <img
                              src={post.images[0].image_url}
                              alt=""
                              className="h-14 w-14 shrink-0 rounded-lg border border-[#E9E0D4] object-cover"
                            />
                          ) : (
                            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-[#F5EEE4]">
                              <ImagePlus size={21} className="text-[#A98245]" />
                            </div>
                          )}

                          <div className="max-w-sm">
                            <p className="font-medium">{post.title}</p>

                            <p className="mt-1 text-xs text-[#8A7D71]">
                              ID: {post.id}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold capitalize ${
                            post.status === "published"
                              ? "bg-green-50 text-green-800"
                              : "bg-amber-50 text-amber-800"
                          }`}
                        >
                          {post.status}
                        </span>
                      </td>

                      <td className="px-5 py-4 text-sm text-[#766A60]">
                        {post.images?.length || 0}
                      </td>

                      <td className="px-5 py-4 text-sm text-[#766A60]">
                        {formatDate(post.created_at)}
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex items-center justify-end gap-2">
                          {post.status === "published" && (
                            <a
                              href={`/posts/${post.slug}`}
                              target="_blank"
                              rel="noreferrer"
                              title="View published post"
                              className="rounded-lg border border-[#E5DACE] p-2 text-[#766A60] hover:bg-[#FAF7F2]"
                            >
                              <ExternalLink size={16} />
                            </a>
                          )}

                          <button
                            type="button"
                            onClick={() => openEditModal(post)}
                            title="Edit post"
                            className="rounded-lg border border-[#E5DACE] p-2 text-[#766A60] hover:bg-[#FAF7F2]"
                          >
                            <Pencil size={16} />
                          </button>

                          <button
                            type="button"
                            onClick={() => setDeletePost(post)}
                            title="Delete post"
                            className="rounded-lg border border-red-100 p-2 text-red-600 hover:bg-red-50"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="border-t border-[#EEE6DC] px-5 py-4 text-sm text-[#766A60]">
            Showing {filteredPosts.length} of {posts.length} posts
          </div>
        </section>
      </main>

      {/* Create/Edit modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/50 p-4">
          <div className="my-auto w-full max-w-2xl rounded-2xl bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#EEE6DC] px-6 py-5">
              <div>
                <h2 className="font-serif text-2xl font-semibold">
                  {editingPost ? "Edit Post" : "Create Post"}
                </h2>

                <p className="mt-1 text-sm text-[#766A60]">
                  Add your post details below.
                </p>
              </div>

              <button
                type="button"
                onClick={closeModal}
                disabled={saving}
                className="rounded-lg p-2 text-[#766A60] hover:bg-[#FAF7F2]"
                aria-label="Close modal"
              >
                <X size={21} />
              </button>
            </div>

            <form onSubmit={handleSave}>
              <div className="space-y-5 px-6 py-6">
                {error && (
                  <div
                    role="alert"
                    className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                  >
                    {error}
                  </div>
                )}

                <div>
                  <label
                    htmlFor="post-title"
                    className="mb-2 block text-sm font-medium"
                  >
                    Post Title
                  </label>

                  <input
                    id="post-title"
                    name="title"
                    value={form.title}
                    onChange={handleFormChange}
                    required
                    maxLength={200}
                    placeholder="Enter a post title"
                    className="w-full rounded-lg border border-[#E5DACE] px-4 py-3 text-sm outline-none focus:border-[#A98245]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="post-content"
                    className="mb-2 block text-sm font-medium"
                  >
                    Content
                  </label>

                  <textarea
                    id="post-content"
                    name="content"
                    value={form.content}
                    onChange={handleFormChange}
                    required
                    rows={8}
                    placeholder="Write your post content..."
                    className="w-full resize-y rounded-lg border border-[#E5DACE] px-4 py-3 text-sm leading-6 outline-none focus:border-[#A98245]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="post-status"
                    className="mb-2 block text-sm font-medium"
                  >
                    Publication Status
                  </label>

                  <select
                    id="post-status"
                    name="status"
                    value={form.status}
                    onChange={handleFormChange}
                    className="w-full rounded-lg border border-[#E5DACE] bg-white px-4 py-3 text-sm outline-none focus:border-[#A98245]"
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="post-images"
                    className="mb-2 block text-sm font-medium"
                  >
                    {editingPost
                      ? "Add More Images (Optional)"
                      : "Post Images (Optional)"}
                  </label>

                  <input
                    id="post-images"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageChange}
                    className="block w-full rounded-lg border border-[#E5DACE] px-3 py-3 text-sm file:mr-4 file:rounded-md file:border-0 file:bg-[#F5EEE4] file:px-3 file:py-2 file:font-medium file:text-[#30251F]"
                  />

                  {selectedImages.length > 0 && (
                    <p className="mt-2 text-xs text-[#766A60]">
                      {selectedImages.length} image(s) selected
                    </p>
                  )}

                  {editingPost && (
                    <p className="mt-2 text-xs text-[#8A7D71]">
                      Existing images are preserved. Selected images will be
                      added.
                    </p>
                  )}
                </div>
              </div>

              <div className="flex flex-col-reverse gap-3 border-t border-[#EEE6DC] px-6 py-5 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={closeModal}
                  disabled={saving}
                  className="rounded-lg border border-[#E5DACE] px-5 py-3 text-sm font-medium hover:bg-[#FAF7F2] disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#30251F] px-5 py-3 text-sm font-medium text-white hover:bg-[#4A392F] disabled:opacity-50"
                >
                  {saving ? (
                    <LoaderCircle size={17} className="animate-spin" />
                  ) : (
                    <Save size={17} />
                  )}

                  {saving
                    ? "Saving..."
                    : editingPost
                      ? "Save Changes"
                      : "Create Post"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete confirmation modal */}
      {deletePost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-600">
              <Trash2 size={22} />
            </div>

            <h2 className="font-serif text-2xl font-semibold">Delete Post?</h2>

            <p className="mt-3 text-sm leading-6 text-[#766A60]">
              Are you sure you want to delete{" "}
              <strong className="text-[#30251F]">{deletePost.title}</strong>?
              This action cannot be undone.
            </p>

            <p className="mt-2 text-xs leading-5 text-[#8A7D71]">
              The associated database records and Cloudinary images will also be
              deleted when the server operation succeeds.
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setDeletePost(null)}
                disabled={deleting}
                className="rounded-lg border border-[#E5DACE] px-4 py-2.5 text-sm font-medium hover:bg-[#FAF7F2]"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleDelete}
                disabled={deleting}
                className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-50"
              >
                {deleting && (
                  <LoaderCircle size={16} className="animate-spin" />
                )}

                {deleting ? "Deleting..." : "Delete Post"}
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
