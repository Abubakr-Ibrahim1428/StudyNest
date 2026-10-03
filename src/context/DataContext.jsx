import { createContext, useContext, useMemo } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { sampleNotes, sampleTasks } from "../data/sampleData";

const DataContext = createContext(null);

function makeId() {
  return Math.random().toString(36).slice(2, 10);
}

export function DataProvider({ children }) {
  const [notes, setNotes] = useLocalStorage("studynest.notes", sampleNotes);
  const [tasks, setTasks] = useLocalStorage("studynest.tasks", sampleTasks);

  const addNote = (note) => {
    setNotes((prev) => [
      { ...note, id: makeId(), createdAt: Date.now() },
      ...prev,
    ]);
  };

  const updateNote = (id, patch) => {
    setNotes((prev) => prev.map((n) => (n.id === id ? { ...n, ...patch } : n)));
  };

  const deleteNote = (id) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
  };

  const addTask = (task) => {
    setTasks((prev) => [
      { ...task, id: makeId(), done: false, createdAt: Date.now() },
      ...prev,
    ]);
  };

  const updateTask = (id, patch) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, ...patch } : t)));
  };

  const toggleTask = (id) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const subjects = useMemo(() => {
    const set = new Set();
    notes.forEach((n) => n.subject && set.add(n.subject));
    tasks.forEach((t) => t.subject && set.add(t.subject));
    return Array.from(set).sort();
  }, [notes, tasks]);

  const value = {
    notes,
    tasks,
    subjects,
    addNote,
    updateNote,
    deleteNote,
    addTask,
    updateTask,
    toggleTask,
    deleteTask,
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export function useData() {
  const ctx = useContext(DataContext);
  if (!ctx) throw new Error("useData must be used within DataProvider");
  return ctx;
}
