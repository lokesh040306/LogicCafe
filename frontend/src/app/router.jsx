import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home/Home";
import Patterns from "../pages/Patterns/Patterns";
import PatternDetail from "../pages/PatternDetail/PatternDetail";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import Profile from "../pages/Profile/Profile";
import NotFound from "../pages/NotFound";
import Practice from "../pages/Practice/Practice";

import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

import ProtectedRoute from "./ProtectedRoute";
import GuestRoute from "./GuestRoute";

const Router = () => {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-zinc-950 text-zinc-100">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/patterns" element={<Patterns />} />
          <Route path="/patterns/:patternId" element={<PatternDetail />} />

          {/* Guest only */}
          <Route
            path="/login"
            element={
              <GuestRoute>
                <Login />
              </GuestRoute>
            }
          />
          <Route
            path="/register"
            element={
              <GuestRoute>
                <Register />
              </GuestRoute>
            }
          />

          {/* Protected */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          {/* Protected */}
          <Route
            path="/practice"
            element={
              <ProtectedRoute>
                <Practice />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
    </>
  );
};

export default Router;
