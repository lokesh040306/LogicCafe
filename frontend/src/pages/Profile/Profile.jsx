import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import { useApp } from "../../app/providers/AppProvider";
import Card from "../../components/ui/Card";
import Badge from "../../components/ui/Badge";
import Loader from "../../components/ui/Loader";
import api from "../../services/api";

/* ---------------- Animations ---------------- */
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0 },
};

const Profile = () => {
  const { user, logout } = useApp();
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    let cancelled = false;

    const fetchProfile = async () => {
      try {
        setLoading(true);
        const res = await api.get("/profile/summary");
        if (!cancelled) setProfile(res.data.data);
      } catch (err) {
        console.error("Profile fetch failed", err);
        if (!cancelled) setProfile(null);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchProfile();
    return () => (cancelled = true);
  }, [user]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  /* ---------------- Loading ---------------- */
  if (loading) {
    return (
      <section className="mx-auto max-w-4xl px-6 py-24">
        <Card className="p-10">
          <Loader />
        </Card>
      </section>
    );
  }

  /* ---------------- Error / Not Auth ---------------- */
  if (!user || !profile) {
    return (
      <section className="mx-auto max-w-4xl px-6 py-24 text-zinc-400">
        Unable to load profile.
      </section>
    );
  }

  const { user: profileUser, account, progress, streak, quickStats } = profile;

  const displayName =
    profileUser?.fullName ||
    profileUser?.name ||
    profileUser?.email?.split("@")[0] ||
    "User";

  return (
    <motion.section
      variants={container}
      initial="hidden"
      animate="show"
      className="mx-auto max-w-4xl px-6 py-24 space-y-10"
    >
      {/* ================= PROFILE HEADER ================= */}
      <motion.div variants={item}>
        <Card className="p-8">
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 rounded-full bg-violet-500/20 flex items-center justify-center text-lg font-semibold text-violet-400">
              {displayName.charAt(0).toUpperCase()}
            </div>

            <div className="flex-1">
              <h1 className="text-xl font-semibold text-zinc-100">
                {displayName}
              </h1>
              <p className="text-sm text-zinc-400">
                {profileUser.email}
              </p>
            </div>
          </div>

          <div className="mt-6 flex gap-3">
            <Badge text={`🔥 ${streak.currentStreak} day streak`} />
            <Badge text={`🏆 Best: ${streak.bestStreak}`} />
          </div>
        </Card>
      </motion.div>

      {/* ================= PROFILE SUMMARY ================= */}
      <motion.div variants={item}>
        <Card className="p-8 space-y-3">
          <h2 className="text-sm font-medium text-zinc-200">
            Your DSA Journey
          </h2>

          <p className="text-sm text-zinc-400 leading-relaxed">
            You have solved{" "}
            <span className="text-zinc-200 font-medium">
              {progress.solvedProblems}
            </span>{" "}
            problems across{" "}
            <span className="text-zinc-200 font-medium">
              {quickStats.patternsCount}
            </span>{" "}
            patterns. Consistency matters more than speed — keep showing up daily.
          </p>

          <p className="text-xs text-zinc-500">
            Small daily progress compounds faster than you expect.
          </p>
        </Card>
      </motion.div>

      {/* ================= OVERALL PROGRESS ================= */}
      <motion.div variants={item}>
        <Card className="p-8 space-y-4">
          <p className="text-sm font-medium text-zinc-200">
            Overall DSA Progress
          </p>

          <div className="h-3 rounded-full bg-zinc-800 overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress.overallProgressPercentage}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-violet-500 to-fuchsia-500"
            />
          </div>

          <p className="text-xs text-zinc-400">
            {progress.solvedProblems} / {progress.totalProblems} problems solved
          </p>
        </Card>
      </motion.div>

      {/* ================= QUICK STATS ================= */}
      <motion.div
        variants={item}
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        {[
          {
            label: "Solved",
            value: progress.solvedProblems,
            hint: "Completed problems",
          },
          {
            label: "Pending",
            value: progress.pendingProblems,
            hint: "Yet to be solved",
          },
          {
            label: "Revision",
            value: progress.revisionProblems,
            hint: "Needs revisiting",
          },
          {
            label: "Patterns",
            value: quickStats.patternsCount,
            hint: "Patterns covered",
          },
        ].map(({ label, value, hint }) => (
          <Card
            key={label}
            className="p-5 space-y-1 transition hover:-translate-y-1 hover:shadow-lg"
          >
            <p className="text-xs text-zinc-500">{label}</p>
            <p className="text-xl font-semibold text-zinc-100">{value}</p>
            <p className="text-[11px] text-zinc-500">{hint}</p>
          </Card>
        ))}
      </motion.div>

      {/* ================= DIFFICULTY ================= */}
      <motion.div variants={item}>
        <Card className="p-8">
          <p className="mb-4 text-sm font-medium text-zinc-200">
            Difficulty Breakdown
          </p>

          <div className="grid grid-cols-3 text-center">
            <Stat label="Easy" value={quickStats.easySolved} color="text-green-400" />
            <Stat label="Medium" value={quickStats.mediumSolved} color="text-yellow-400" />
            <Stat label="Hard" value={quickStats.hardSolved} color="text-red-400" />
          </div>
        </Card>
      </motion.div>

      {/* ================= NEXT ACTION ================= */}
      <motion.div variants={item}>
        <Card className="p-8 space-y-4">
          <h2 className="text-sm font-medium text-zinc-200">
            What should you do next?
          </h2>

          {progress.pendingProblems > 0 ? (
            <p className="text-sm text-zinc-400">
              You still have{" "}
              <span className="text-zinc-200 font-medium">
                {progress.pendingProblems}
              </span>{" "}
              unsolved problems. Try completing at least one today.
            </p>
          ) : (
            <p className="text-sm text-zinc-400">
              You’re fully caught up 🎉 Consider revising older problems.
            </p>
          )}

          <button
            onClick={() => navigate("/patterns")}
            className="w-fit rounded-md bg-violet-500/10 px-4 py-2 text-sm font-medium text-violet-400 hover:bg-violet-500/20 transition"
          >
            Go to Practice →
          </button>
        </Card>
      </motion.div>

      {/* ================= ACCOUNT INFO ================= */}
      <motion.div variants={item}>
        <Card className="p-8 text-sm space-y-2 text-zinc-400">
          <p>Joined: {new Date(account.accountCreatedAt).toDateString()}</p>
          <p>Last Active: {new Date(account.lastActiveAt).toDateString()}</p>
          <p>Preferred Sheet: {account.preferredSheet}</p>
        </Card>
      </motion.div>

      {/* ================= LOGOUT ================= */}
      <motion.div variants={item}>
        <Card className="p-6 flex justify-end">
          <button
            onClick={handleLogout}
            className="rounded-md border border-red-500/30 px-4 py-2 text-sm font-medium text-red-400 hover:bg-red-500/10 transition"
          >
            Logout
          </button>
        </Card>
      </motion.div>
    </motion.section>
  );
};

/* ---------------- Small Component ---------------- */
const Stat = ({ label, value, color }) => (
  <div>
    <p className={`font-semibold ${color}`}>{value}</p>
    <p className="text-xs text-zinc-500">{label}</p>
  </div>
);

export default Profile;
