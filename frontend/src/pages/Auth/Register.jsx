import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { register as registerApi } from "../../services/auth.service";
import { useApp } from "../../app/providers/AppProvider";

import Card from "../../components/ui/Card";

/**
 * Register Page
 * - Same style as Login
 * - Button-first
 * - Calm & professional
 */
const Register = () => {
  const navigate = useNavigate();
  const { login, setLoading } = useApp();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const authData = await registerApi(form);

      if (!authData?.token || !authData?.user) {
        throw new Error("Invalid response from server");
      }

      // auto-login after register
      login(authData);
      navigate("/patterns");
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          err?.message ||
          "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex min-h-[80vh] items-center justify-center px-6">
      <Card className="w-full max-w-md p-8">
        {/* Title */}
        <h1 className="mb-6 text-2xl font-semibold text-zinc-100">
          Register
        </h1>

        {/* Error */}
        {error && (
          <div className="mb-4 rounded-md border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-400">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div>
            <label className="mb-1 block text-sm text-zinc-400">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your full name"
              required
              className="w-full rounded-md border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm text-white placeholder-zinc-500 focus:border-primary focus:outline-none"
            />
          </div>

          {/* Email */}
          <div>
            <label className="mb-1 block text-sm text-zinc-400">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
              className="w-full rounded-md border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm text-white placeholder-zinc-500 focus:border-primary focus:outline-none"
            />
          </div>

          {/* Password */}
          <div>
            <label className="mb-1 block text-sm text-zinc-400">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
              className="w-full rounded-md border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm text-white placeholder-zinc-500 focus:border-primary focus:outline-none"
            />
          </div>

          {/* VERY CLEAR BUTTON */}
          <button
            type="submit"
            className="
              mt-4
              w-full
              rounded-md
              bg-primary
              py-3
              text-sm
              font-semibold
              text-zinc-950
              transition
              hover:opacity-90
              active:scale-[0.99]
            "
          >
            Register
          </button>
        </form>

        {/* Footer */}
        <p className="mt-6 text-center text-sm text-zinc-400">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-primary hover:underline"
          >
            Login
          </Link>
        </p>
      </Card>
    </section>
  );
};

export default Register;
