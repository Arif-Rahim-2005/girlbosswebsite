import { useCallback, useEffect, useState } from "react";
import {
  Users,
  ShieldCheck,
  Trash2,
  Search,
  RefreshCw,
  AlertCircle,
  X,
  CheckCircle2,
  LoaderCircle,
  Shield,
} from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { apiRequest } from "../api/api";

function getRoleLabel(role) {
  return role === "admin" ? "Administrator" : "User";
}

function getInitial(user) {
  return (user?.username || user?.email || "?").charAt(0).toUpperCase();
}

export default function AdminUsers() {
  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [workingId, setWorkingId] = useState(null);
  const [confirmation, setConfirmation] = useState(null);
  const [notice, setNotice] = useState(null);

  const token = localStorage.getItem("token");

  const currentUser = (() => {
    try {
      return JSON.parse(localStorage.getItem("user") || "null");
    } catch {
      return null;
    }
  })();

  const loadUsers = useCallback(async () => {
    if (!localStorage.getItem("token")) {
      navigate("/login", { replace: true });
      return;
    }

    setLoading(true);
    setError("");

    try {
      const data = await apiRequest("/users");

      if (!Array.isArray(data)) {
        throw new Error("The server returned an unexpected user list.");
      }

      setUsers(data);
    } catch (err) {
      setError(err.message || "Unable to load users.");

      if (
        err.message?.toLowerCase().includes("unauthorized") ||
        err.message?.toLowerCase().includes("access denied") ||
        err.message?.toLowerCase().includes("invalid user")
      ) {
        navigate("/admin", { replace: true });
      }
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  const filteredUsers = users.filter((user) => {
    const query = search.trim().toLowerCase();

    if (!query) return true;

    return [user.username, user.email, user.role, String(user.id)].some(
      (value) =>
        String(value || "")
          .toLowerCase()
          .includes(query),
    );
  });

  const showNotice = (type, message) => {
    setNotice({ type, message });
  };

  const startAction = (type, user, value = null) => {
    setNotice(null);
    setConfirmation({ type, user, value });
  };

  const confirmAction = async () => {
    if (!confirmation) return;

    const { type, user, value } = confirmation;

    setWorkingId(user.id);

    try {
      if (type === "role") {
        const data = await apiRequest(`/users/${user.id}`, {
          method: "PATCH",
          body: JSON.stringify({ role: value }),
        });

        showNotice(
          "success",
          data.message || `${user.username}'s role has been updated.`,
        );
      } else if (type === "delete") {
        const data = await apiRequest(`/users/${user.id}`, {
          method: "DELETE",
        });

        showNotice(
          "success",
          data.message || `${user.username}'s account has been deleted.`,
        );
      }

      setConfirmation(null);
      await loadUsers();
    } catch (err) {
      showNotice("error", err.message || "The action could not be completed.");
    } finally {
      setWorkingId(null);
    }
  };

  const isSelf = (user) =>
    currentUser && Number(user.id) === Number(currentUser.id);

  const adminCount = users.filter((user) => user.role === "admin").length;

  const confirmationDetails = {
    role: {
      title: "Change user role?",
      message: `This will change ${confirmation?.user?.username}'s role to ${getRoleLabel(confirmation?.value)}.`,
      button: "Update role",
    },
    delete: {
      title: "Delete account?",
      message: `This will permanently delete ${confirmation?.user?.username}'s account. This action cannot be undone.`,
      button: "Delete account",
    },
  };

  const confirmationInfo = confirmation
    ? confirmationDetails[confirmation.type]
    : null;

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-[#FAF7F2] pt-20">
        <header className="border-b border-[#E8DFD0] bg-[#FFFDF8]">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-7 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-center gap-4">
              <Link
                to="/admin"
                className="inline-flex items-center gap-2 rounded-lg border border-[#E8DFD0] px-3 py-2 text-sm font-medium text-[#A7833E] transition hover:border-[#D8C7A4] hover:bg-[#F7F0E2] hover:text-[#44352D]"
              >
                <span aria-hidden="true">←</span>
                Back to dashboard
              </Link>

              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#35271F] text-[#D6B36A]">
                <Users size={23} />
              </div>

              <div>
                <h1 className="font-serif text-2xl font-semibold sm:text-3xl">
                  User Management
                </h1>

                <p className="mt-1 text-sm text-[#806F60]">
                  Manage registered users and administrator permissions.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={loadUsers}
              disabled={loading}
              className="inline-flex items-center gap-2 rounded-lg border border-[#D8C7A4] bg-white px-4 py-2.5 text-sm font-semibold text-[#35271F] transition hover:bg-[#F7F0E2] disabled:opacity-60"
            >
              <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
              Refresh
            </button>
          </div>
        </header>
        <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          {notice && (
            <div
              role="status"
              className={`mb-6 flex items-start gap-3 rounded-xl border p-4 ${
                notice.type === "success"
                  ? "border-green-200 bg-green-50 text-green-800"
                  : "border-red-200 bg-red-50 text-red-800"
              }`}
            >
              {notice.type === "success" ? (
                <CheckCircle2 size={19} className="mt-0.5 shrink-0" />
              ) : (
                <AlertCircle size={19} className="mt-0.5 shrink-0" />
              )}

              <p className="flex-1 text-sm font-medium">{notice.message}</p>

              <button
                type="button"
                onClick={() => setNotice(null)}
                aria-label="Dismiss notification"
              >
                <X size={17} />
              </button>
            </div>
          )}

          {/* Summary cards */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <SummaryCard
              title="Total users"
              value={users.length}
              description="Registered accounts"
              icon={<Users size={21} />}
            />

            <SummaryCard
              title="Administrators"
              value={adminCount}
              description="Accounts with administrator permissions"
              icon={<ShieldCheck size={21} />}
            />
          </div>

          {/* Users table */}
          <section className="mt-8 overflow-hidden rounded-2xl border border-[#E8DFD0] bg-white shadow-sm">
            <div className="flex flex-col gap-4 border-b border-[#E8DFD0] p-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="font-serif text-xl font-semibold">All Users</h2>

                <p className="mt-1 text-sm text-[#806F60]">
                  View accounts and manage user permissions.
                </p>
              </div>

              <div className="relative w-full sm:max-w-sm">
                <Search
                  size={18}
                  className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#A39380]"
                />

                <input
                  type="search"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search by name, email, role or ID..."
                  aria-label="Search users"
                  className="w-full rounded-lg border border-[#E8DFD0] bg-[#FFFDF8] py-2.5 pl-10 pr-4 text-sm outline-none transition placeholder:text-[#A39380] focus:border-[#B9944B] focus:ring-2 focus:ring-[#D6B36A]/20"
                />
              </div>
            </div>

            {loading ? (
              <div className="flex min-h-64 flex-col items-center justify-center gap-3 text-[#806F60]">
                <LoaderCircle size={30} className="animate-spin" />
                <p className="text-sm">Loading users...</p>
              </div>
            ) : error ? (
              <div className="flex min-h-64 flex-col items-center justify-center p-8 text-center">
                <AlertCircle size={30} className="text-red-600" />

                <h3 className="mt-4 font-semibold">Could not load users</h3>

                <p className="mt-2 max-w-lg text-sm text-[#806F60]">{error}</p>

                <button
                  type="button"
                  onClick={loadUsers}
                  className="mt-5 rounded-lg bg-[#35271F] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#4B382C]"
                >
                  Try again
                </button>
              </div>
            ) : filteredUsers.length === 0 ? (
              <div className="flex min-h-64 flex-col items-center justify-center p-8 text-center">
                <Users size={34} className="text-[#C8BBA8]" />

                <h3 className="mt-3 font-semibold">No users found</h3>

                <p className="mt-1 text-sm text-[#806F60]">
                  {search
                    ? "Try a different search term."
                    : "No registered accounts are available."}
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[720px] text-left text-sm">
                  <thead>
                    <tr className="border-b border-[#E8DFD0] bg-[#FAF7F0] text-xs uppercase tracking-wider text-[#806F60]">
                      <th className="px-5 py-4 font-semibold">User</th>
                      <th className="px-5 py-4 font-semibold">Role</th>
                      <th className="px-5 py-4 font-semibold">Registered</th>
                      <th className="px-5 py-4 text-right font-semibold">
                        Actions
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-[#F0E9DE]">
                    {filteredUsers.map((user) => {
                      const self = isSelf(user);
                      const busy = workingId === user.id;

                      return (
                        <tr
                          key={user.id}
                          className="transition hover:bg-[#FFFCF5]"
                        >
                          <td className="px-5 py-4">
                            <div className="flex items-center gap-3">
                              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#F2E8D5] font-semibold text-[#795B2D]">
                                {getInitial(user)}
                              </div>

                              <div className="min-w-0">
                                <p className="font-semibold text-[#35271F]">
                                  {user.username || "Unnamed user"}

                                  {self && (
                                    <span className="ml-2 text-xs font-normal text-[#A39380]">
                                      You
                                    </span>
                                  )}
                                </p>

                                <p className="mt-1 truncate text-xs text-[#806F60]">
                                  {user.email}
                                </p>

                                <p className="mt-1 text-xs text-[#A39380]">
                                  ID: {user.id}
                                </p>
                              </div>
                            </div>
                          </td>

                          <td className="px-5 py-4">
                            <div className="flex flex-col items-start gap-1.5">
                              <span
                                className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold ${
                                  user.role === "admin"
                                    ? "border-[#D6B36A] bg-[#FBF3DF] text-[#795B2D]"
                                    : "border-[#E8DFD0] bg-[#FAF7F0] text-[#806F60]"
                                }`}
                              >
                                {user.role === "admin" ? (
                                  <ShieldCheck size={13} />
                                ) : (
                                  <Shield size={13} />
                                )}

                                {getRoleLabel(user.role)}
                              </span>

                              <select
                                value={user.role || "user"}
                                onChange={(event) =>
                                  startAction("role", user, event.target.value)
                                }
                                disabled={self || busy}
                                aria-label={`Change role for ${user.username}`}
                                className="max-w-44 rounded-lg border border-[#E8DFD0] bg-white px-3 py-2 text-xs outline-none focus:border-[#B9944B] disabled:cursor-not-allowed disabled:bg-[#F5F0E7] disabled:opacity-60"
                              >
                                <option value="user">User</option>
                                <option value="admin">Administrator</option>
                              </select>
                            </div>
                          </td>

                          <td className="px-5 py-4 text-sm text-[#806F60]">
                            {user.created_at
                              ? new Date(user.created_at).toLocaleDateString()
                              : "—"}
                          </td>

                          <td className="px-5 py-4">
                            <div className="flex justify-end">
                              <button
                                type="button"
                                onClick={() => startAction("delete", user)}
                                disabled={self || busy}
                                className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs font-semibold text-red-700 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-40"
                                title={
                                  self
                                    ? "You cannot delete your own account here."
                                    : "Delete account"
                                }
                              >
                                {busy ? (
                                  <LoaderCircle
                                    size={14}
                                    className="animate-spin"
                                  />
                                ) : (
                                  <Trash2 size={14} />
                                )}
                                Delete
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}

            {!loading && !error && filteredUsers.length > 0 && (
              <div className="border-t border-[#E8DFD0] bg-[#FAF7F0] px-5 py-3 text-xs text-[#806F60]">
                Showing {filteredUsers.length} of {users.length} users
              </div>
            )}
          </section>
        </main>
        {/* Confirmation dialog */}
        {confirmation && confirmationInfo && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#241A14]/50 p-4 backdrop-blur-sm"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget && workingId === null) {
                setConfirmation(null);
              }
            }}
          >
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby="confirm-title"
              className="w-full max-w-md rounded-2xl border border-[#E8DFD0] bg-[#FFFDF8] p-6 shadow-2xl"
            >
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-xl ${
                  confirmation.type === "delete"
                    ? "bg-red-50 text-red-600"
                    : "bg-[#F2E8D5] text-[#795B2D]"
                }`}
              >
                {confirmation.type === "delete" ? (
                  <Trash2 size={23} />
                ) : (
                  <ShieldCheck size={23} />
                )}
              </div>

              <h2
                id="confirm-title"
                className="mt-4 font-serif text-xl font-semibold text-[#35271F]"
              >
                {confirmationInfo.title}
              </h2>

              <p className="mt-2 text-sm leading-6 text-[#806F60]">
                {confirmationInfo.message}
              </p>

              <div className="mt-6 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setConfirmation(null)}
                  disabled={workingId !== null}
                  className="rounded-lg border border-[#E8DFD0] px-4 py-2.5 text-sm font-semibold text-[#35271F] hover:bg-[#FAF7F0] disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={confirmAction}
                  disabled={workingId !== null}
                  className={`inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60 ${
                    confirmation.type === "delete"
                      ? "bg-red-600 hover:bg-red-700"
                      : "bg-[#35271F] hover:bg-[#4B382C]"
                  }`}
                >
                  {workingId !== null && (
                    <LoaderCircle size={15} className="animate-spin" />
                  )}

                  {confirmationInfo.button}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </>
  );
}

function SummaryCard({ title, value, icon, description }) {
  return (
    <div className="rounded-2xl border border-[#E8DFD0] bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-[#806F60]">{title}</p>

          <p className="mt-2 font-serif text-3xl font-semibold text-[#35271F]">
            {value}
          </p>
        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F2E8D5] text-[#795B2D]">
          {icon}
        </div>
      </div>

      <p className="mt-3 text-xs text-[#806F60]">{description}</p>
    </div>
  );
}
