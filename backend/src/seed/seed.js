import mongoose from "mongoose";
import dotenv from "dotenv";

import { Pattern } from "../models/Pattern.model.js";
import { Problem } from "../models/Problem.model.js";

import { patternsSeed } from "./patterns.seed.js";

// 🔹 IMPORT ALL PROBLEM SEEDS
import { twoPointersProblems } from "./problems/twoPointers.seed.js";
import { fastSlowPointersProblems } from "./problems/fastSlowPointers.seed.js";
import { slidingWindowProblems } from "./problems/slidingWindow.seed.js";
import { cyclicSortProblems } from "./problems/cyclicSort.seed.js";
import { linkedListReversalProblems } from "./problems/linkedListReversal.seed.js";
import { mergeIntervalsProblems } from "./problems/mergeIntervals.seed.js";
import { stackProblems } from "./problems/stack.seed.js";
import { monotonicStackProblems } from "./problems/monotonicStack.seed.js";
import { hashMapProblems } from "./problems/hashMap.seed.js";
import { treeBFSProblems } from "./problems/treeBFS.seed.js";
import { treeDFSProblems } from "./problems/treeDFS.seed.js";
import { graphProblems } from "./problems/graph.seed.js";
import { subsetsProblems } from "./problems/subsets.seed.js";
import { binarySearchProblems } from "./problems/binarySearch.seed.js";
import { twoHeapsProblems } from "./problems/twoHeaps.seed.js";
import { bitwiseXorProblems } from "./problems/bitwiseXor.seed.js";
import { kWayMergeProblems } from "./problems/kWayMerge.seed.js";
import { greedyProblems } from "./problems/greedy.seed.js";
import { knapsackProblems } from "./problems/knapsack.seed.js";
import { trieProblems } from "./problems/trie.seed.js";
import { unionFindProblems } from "./problems/unionFind.seed.js";

dotenv.config();

/**
 * Connect DB
 */
const connectDB = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("📦 DB NAME:", mongoose.connection.name);
};

/**
 * Seed Patterns → return name → _id map
 */
const seedPatterns = async () => {
  const patternMap = {};

  for (const pattern of patternsSeed) {
    const doc = await Pattern.findOneAndUpdate(
      { name: pattern.name },
      { $set: pattern },
      { upsert: true, new: true }
    );

    patternMap[pattern.name] = doc._id;
  }

  console.log("✅ Patterns seeded:", Object.keys(patternMap).length);
  return patternMap;
};

/**
 * All problems grouped by pattern name
 * ⚠️ Names MUST match patternsSeed.name exactly
 */
const allProblemSeeds = [
  { pattern: "Two Pointers", data: twoPointersProblems },
  { pattern: "Fast & Slow Pointers", data: fastSlowPointersProblems },
  { pattern: "Sliding Window", data: slidingWindowProblems },
  { pattern: "Cyclic Sort", data: cyclicSortProblems },
  { pattern: "In-place Reversal of Linked List", data: linkedListReversalProblems },
  { pattern: "Merge Intervals", data: mergeIntervalsProblems },
  { pattern: "Stack", data: stackProblems },
  { pattern: "Monotonic Stack", data: monotonicStackProblems },
  { pattern: "Hash Map", data: hashMapProblems },
  { pattern: "Tree BFS", data: treeBFSProblems },
  { pattern: "Tree DFS", data: treeDFSProblems },
  { pattern: "Graph", data: graphProblems },
  { pattern: "Subsets", data: subsetsProblems },
  { pattern: "Binary Search", data: binarySearchProblems },
  { pattern: "Two Heaps", data: twoHeapsProblems },
  { pattern: "Bitwise XOR", data: bitwiseXorProblems },
  { pattern: "K-Way Merge", data: kWayMergeProblems },
  { pattern: "Greedy", data: greedyProblems },
  { pattern: "0/1 Knapsack", data: knapsackProblems },
  { pattern: "Trie", data: trieProblems },
  { pattern: "Union Find", data: unionFindProblems },
];

/**
 * Seed Problems
 */
const seedProblems = async (patternMap) => {
  let count = 0;

  for (const group of allProblemSeeds) {
    const patternId = patternMap[group.pattern];

    if (!patternId) {
      console.warn(`⚠️ Pattern not found: ${group.pattern}`);
      continue;
    }

    for (const problem of group.data) {
      await Problem.findOneAndUpdate(
        { title: problem.title },
        {
          $set: {
            title: problem.title,
            difficulty: problem.difficulty,
            week: problem.week,
            topicTags: problem.topicTags,
            leetcodeLink: problem.leetcode,
            gfgLink: problem.gfg,
            pattern: patternId,
          },
        },
        { upsert: true, new: true }
      );

      count++;
    }
  }

  console.log(`✅ Problems seeded: ${count}`);
};

/**
 * RUNNER
 */
const runSeed = async () => {
  try {
    console.log("🔥 SEED STARTED");

    await connectDB();

    const patternMap = await seedPatterns();
    await seedProblems(patternMap);

    console.log("🎉 SEED COMPLETED SUCCESSFULLY");
    process.exit(0);
  } catch (err) {
    console.error("❌ SEED FAILED", err);
    process.exit(1);
  }
};

runSeed();
