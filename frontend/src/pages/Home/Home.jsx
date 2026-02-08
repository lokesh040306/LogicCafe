import { Link } from "react-router-dom";

/**
 * Home Page
 * Purpose:
 * - Explain philosophy
 * - Clear CTA
 * - Not a problem list
 */
const Home = () => {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <div className="max-w-3xl">
        {/* Heading */}
        <h1 className="text-4xl font-bold leading-tight tracking-tight md:text-5xl">
          Master DSA by{" "}
          <span className="relative inline-block text-primary">
            Patterns
            {/* underline animation */}
            <span className="absolute -bottom-1 left-0 h-[3px] w-0 bg-primary transition-all duration-500 hover:w-full" />
          </span>
          , not by memorizing problems.
        </h1>

        {/* Description */}
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-zinc-400 transition-opacity duration-500">
          This platform organizes Data Structures & Algorithms in a
          pattern-first way, helping you understand the thinking process behind
          problems instead of blindly solving lists.
        </p>

        {/* Key points */}
        <ul className="mt-10 space-y-4 text-zinc-300">
          {[
            "Learn one pattern → solve many problems",
            "Clear difficulty progression",
            "Built for deep understanding, not speed-running",
          ].map((point, idx) => (
            <li
              key={idx}
              className="flex items-start gap-3 transition-transform duration-300 hover:translate-x-1"
            >
              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-primary" />
              <span>{point}</span>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="mt-12">
          <Link
            to="/patterns"
            className="inline-flex items-center rounded-lg bg-primary px-7 py-3 text-sm font-semibold text-white transition-all duration-300 hover:scale-[1.04] hover:bg-indigo-500 hover:shadow-lg hover:shadow-primary/30"
          >
            Explore Patterns
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Home;
