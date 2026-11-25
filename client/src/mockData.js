export const mockCards = [
  {
    id: "c1",
    listId: "l1",
    title: "Design login page",
    position: 1,
    labels: [{ id: "lb1", name: "Frontend", color: "#61bd4f" }],
    dueDate: "2026-11-20",
    assignees: [{ id: "u1", name: "Sara Ali" }, { id: "u2", name: "Omar" }],
    commentCount: 2,
  },
  {
    id: "c2",
    listId: "l1",
    title: "Set up database",
    position: 2,
    labels: [],
    dueDate: null,
    assignees: [{ id: "u2", name: "Omar" }],
    commentCount: 0,
  },
  {
    id: "c3",
    listId: "l2",
    title: "Write API docs",
    position: 1,
    labels: [{ id: "lb2", name: "Docs", color: "#f2d600" }],
    dueDate: "2026-11-26",
    assignees: [],
    commentCount: 1,
  },
  {
    id: "c4",
    listId: "l2",
    title: "Review pull requests",
    position: 2,
    labels: [],
    dueDate: "2026-12-10",
    assignees: [{ id: "u1", name: "Sara Ali" }],
    commentCount: 0,
  },
];

export const mockLists = [
  { id: "l1", title: "To Do" },
  { id: "l2", title: "In Progress" },
];