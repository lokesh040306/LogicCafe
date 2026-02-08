import { Link, NavLink, useNavigate } from "react-router-dom";
import { useApp } from "../../app/providers/AppProvider";

/**
 * Top navigation bar
 * - Same simple layout
 * - Home + Practice + Patterns
 * - Subtle underline animation
 */
const Navbar = () => {
  const { user, isLoggedIn, logout } = useApp();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const baseLink =
    "relative text-sm font-medium text-zinc-400 transition-colors duration-200 hover:text-zinc-200";

  const activeLink = "text-primary";

  const underline = (isActive) =>
    `absolute -bottom-1 left-0 h-[2px] bg-primary transition-all duration-300 ${
      isActive ? "w-full" : "w-0 group-hover:w-full"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800 bg-zinc-950/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <Link to="/" className="text-lg font-semibold text-white">
          DSA<span className="text-primary">Patterns</span>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-6">
          {[
            { to: "/", label: "Home" },
            { to: "/practice", label: "Practice" },
            { to: "/patterns", label: "Patterns" },
          ].map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `group ${baseLink} ${
                  isActive ? activeLink : ""
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {label}
                  <span className={underline(isActive)} />
                </>
              )}
            </NavLink>
          ))}

          {!isLoggedIn ? (
            <>
              <NavLink
                to="/login"
                className="text-sm text-zinc-400 hover:text-zinc-200"
              >
                Login
              </NavLink>

              <NavLink
                to="/register"
                className="rounded-md bg-primary px-3 py-1.5 text-sm font-semibold text-zinc-950 hover:opacity-90"
              >
                Register
              </NavLink>
            </>
          ) : (
            <>
              <NavLink
                to="/profile"
                className={({ isActive }) =>
                  `group ${baseLink} ${
                    isActive ? activeLink : "text-zinc-300"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    Profile
                    <span className={underline(isActive)} />
                  </>
                )}
              </NavLink>

              {/* <button
                onClick={handleLogout}
                className="text-sm font-medium text-zinc-400 hover:text-red-400 transition"
              >
                Logout
              </button> */}
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
