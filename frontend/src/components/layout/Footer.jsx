/**
 * Simple footer
 * No clutter, no links overload
 * Subtle animations only
 */
const Footer = () => {
  return (
    <footer className="border-t border-zinc-800 bg-zinc-950">
      <div className="mx-auto max-w-7xl px-6 py-6 text-center">
        <p className="text-sm text-zinc-500 transition-all duration-300 hover:text-zinc-300 hover:tracking-wide">
          © {new Date().getFullYear()}{" "}
          <span className="font-medium text-zinc-400">
            DSA Patterns
          </span>{" "}
          · Learn smarter, not harder
        </p>

        {/* subtle animated divider */}
        <div className="mx-auto mt-3 h-px w-0 bg-zinc-700 transition-all duration-500 hover:w-24" />
      </div>
    </footer>
  );
};

export default Footer;
