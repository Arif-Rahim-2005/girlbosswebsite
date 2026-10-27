import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Products from "./pages/Products";
import About from "./pages/About";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotAuthorised from "./pages/NotAuthorised";
import ProductDetails from "./pages/ProductsDetails";

import AdminRoute from "./components/AdminRoute"
import AdminDashboard from "./pages/AdminDashboard";
import AdminProducts from "./pages/AdminProducts";
import AdminUsers from "./pages/AdminUsers";
import AdminPosts from "./pages/AdminPosts"
import Posts from "./pages/Posts"
import PostDetail from "./pages/PostsDetails";



export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public pages */}
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/not-authorised" element={<NotAuthorised />} />
        <Route path="/posts/:slug" element={<PostDetail />} />
        <Route path="/products/:slug" element={<ProductDetails />} />
        {/* Admin dashboard */}
        <Route element={<AdminRoute />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/products" element={<AdminProducts />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/posts" element={<AdminPosts />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
