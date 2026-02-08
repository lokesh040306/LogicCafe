export const shuffle = (arr) => {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};

export const generatePracticeSet = ({
  problems,
  completedIds = [],
  count = 3,
}) => {
  if (!problems.length) return [];

  const unsolved = problems.filter(
    (p) => !completedIds.includes(p._id)
  );

  const source = unsolved.length ? unsolved : problems;

  const buckets = {
    medium: [],
    easy: [],
    hard: [],
  };

  source.forEach((p) => {
    buckets[p.difficulty]?.push(p);
  });

  const ordered = [
    ...shuffle(buckets.medium),
    ...shuffle(buckets.easy),
    ...shuffle(buckets.hard),
  ];

  return ordered.slice(0, count);
};
