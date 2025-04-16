import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingPage from "./components/globals/home/Landingpage";
import SignInPage from "./components/globals/auth/Signinpage";
import RegisterPage from "./components/globals/auth/Signuppage";
import { Toaster } from "sonner";
import BlogFeedPage from "./components/globals/blog/Blogfeed";
import BlogDetailPage from "./components/globals/singleblog/Blogdetailpage";
import Createpost from "./components/globals/CreateBlogs/CreateBlog";
import ProfilePage from "./components/globals/profile/Profilepage";
import AboutPage from "./components/globals/about/About";
import { ProtectedRoute } from "./components/globals/auth/ProtectedRoute";

function App() {
  return (
    <div>
      <Toaster />
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/blog" element={<BlogFeedPage />} />
          <Route path="/blog/:id" element={<BlogDetailPage />} />
          <Route path="/about" element={<AboutPage />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/create" element={<Createpost />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;