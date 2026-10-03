import { useMemo, useState } from "react";
import { Plus, Trash2, ListChecks } from "lucide-react";
import { useData } from "../context/DataContext";
import Modal from "../components/Modal";
import "../components/Form.css";
import "./Checklist.css";

const PRIORITY_ORDER = { high: 0, medium: 1, low: 2 };
const PRIORITY_LABEL = { high: "High", medium: "Medium", low: "Low" };

export default function Checklist() {
  const { tasks, subjects, addTask, toggleTask, deleteTask } = useData();
  const [activeSubject, setActiveSubject] = useState("all");
  const [showForm, setShowForm] = useState(false);

  const sorted = useMemo(() => {
    const filtered = activeSubject === "all" ? tasks : tasks.filter((t) => t.subject === activeSubject);
    return [...filtered].sort((a, b) => {
      if (a.done !== b.done) return a.done ? 1 : -1;
      return PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority];
    });
  }, [tasks, activeSubject]);

  const handleSubmit = (data) => {
    addTask(data);
    setShowForm(false);
  };

  const openCount = tasks.filter((t) => !t.done).length;

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Checklist</h1>
          <p className="page-header__meta">{openCount} task{openCount !== 1 ? "s" : ""} left</p>
        </div>
        <button className="fab transition-neu" onClick={() => setShowForm(true)} aria-label="Add task">
          <Plus size={22} />
        </button>
      </div>

      {subjects.length > 0 && (
        <div className="filter-row">
          <button
            className={`filter-chip transition-neu ${activeSubject === "all" ? "filter-chip--active" : "neu-flat"}`}
            onClick={() => setActiveSubject("all")}
          >
            All
          </button>
          {subjects.map((s) => (
            <button
              key={s}
              className={`filter-chip transition-neu ${activeSubject === s ? "filter-chip--active" : "neu-flat"}`}
              onClick={() => setActiveSubject(s)}
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {sorted.length === 0 ? (
        <div className="empty-state neu-flat">
          <ListChecks size={30} color="var(--text-faint)" />
          <h3 style={{ marginTop: 12 }}>Nothing on the list</h3>
          <p>Add a task before it sneaks up on you.</p>
        </div>
      ) : (
        <ul className="task-list">
          {sorted.map((task) => (
            <li key={task.id} className={`task-row neu-flat transition-neu ${task.done ? "task-row--done" : ""}`}>
              <button
                className={`task-check transition-neu ${task.done ? "task-check--done" : ""}`}
                onClick={() => toggleTask(task.id)}
                aria-label={task.done ? "Mark as not done" : "Mark as done"}
              >
                {task.done && <CheckMark />}
              </button>

              <div className="task-row__body">
                <p className="task-row__text">{task.text}</p>
                <div className="task-row__meta">
                  {task.subject && <span className="subject-tag">{task.subject}</span>}
                  {task.dueDate && <span className="task-due">Due {formatDate(task.dueDate)}</span>}
                  <span className={`priority-pill priority-pill--${task.priority}`}>
                    {PRIORITY_LABEL[task.priority]}
                  </span>
                </div>
              </div>

              <button className="btn-icon transition-neu" onClick={() => deleteTask(task.id)} aria-label="Delete task">
                <Trash2 size={16} />
              </button>
            </li>
          ))}
        </ul>
      )}

      {showForm && (
        <Modal title="New task" onClose={() => setShowForm(false)}>
          <TaskForm onSubmit={handleSubmit} />
        </Modal>
      )}
    </div>
  );
}

function CheckMark() {
  return (
    <svg width="13" height="10" viewBox="0 0 13 10" fill="none">
      <path d="M1 5L4.5 8.5L12 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function formatDate(iso) {
  const d = new Date(iso + "T00:00:00");
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

function TaskForm({ onSubmit }) {
  const [text, setText] = useState("");
  const [subject, setSubject] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("medium");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onSubmit({ text: text.trim(), subject: subject.trim(), dueDate, priority });
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <div className="field">
        <label htmlFor="task-text">Task</label>
        <input
          id="task-text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="e.g. Finish lab report"
          autoFocus
        />
      </div>
      <div className="field">
        <label htmlFor="task-subject">Subject / tag</label>
        <input
          id="task-subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="e.g. Databases"
        />
      </div>
      <div className="field-row">
        <div className="field">
          <label htmlFor="task-due">Due date</label>
          <input id="task-due" type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
        </div>
        <div className="field">
          <label htmlFor="task-priority">Priority</label>
          <select id="task-priority" value={priority} onChange={(e) => setPriority(e.target.value)}>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
      </div>
      <button type="submit" className="btn-primary transition-neu">
        Add task
      </button>
    </form>
  );
}
