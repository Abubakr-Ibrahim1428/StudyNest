export const sampleNotes = [
  {
    id: "n1",
    title: "Express middleware order",
    text: "Middleware runs top to bottom. Error handlers need 4 args (err, req, res, next) and must go last.",
    subject: "Backend",
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 2,
  },
  {
    id: "n2",
    title: "React state batching",
    text: "State updates inside event handlers are batched in React 18+, even outside handlers now.",
    subject: "React",
    createdAt: Date.now() - 1000 * 60 * 60 * 24,
  },
  {
    id: "n3",
    title: "MariaDB indexes",
    text: "Composite index column order matters — put the most selective / most-filtered column first.",
    subject: "Databases",
    createdAt: Date.now() - 1000 * 60 * 60 * 5,
  },
];

export const sampleTasks = [
  {
    id: "t1",
    text: "Finish Express auth middleware assignment",
    subject: "Backend",
    dueDate: "2026-08-13",
    priority: "high",
    done: false,
    createdAt: Date.now() - 1000 * 60 * 60 * 30,
  },
  {
    id: "t2",
    text: "Read chapter on MariaDB joins",
    subject: "Databases",
    dueDate: "2026-08-15",
    priority: "medium",
    done: false,
    createdAt: Date.now() - 1000 * 60 * 60 * 20,
  },
  {
    id: "t3",
    text: "Tidy up React component props",
    subject: "React",
    dueDate: "2026-08-20",
    priority: "low",
    done: true,
    createdAt: Date.now() - 1000 * 60 * 60 * 10,
  },
];
