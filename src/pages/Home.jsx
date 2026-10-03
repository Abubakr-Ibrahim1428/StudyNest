import { useMemo } from "react";
import { NotebookText, ListChecks, ArrowRight, Flame } from "lucide-react";
import { useData } from "../context/DataContext";
import "./Home.css";

const PRIORITY_ORDER = { high: 0, medium: 1, low: 2 };

export default function Home({ onNavigate }) {
  const { notes, tasks } = useData();

  const recentNotes = useMemo(
    () => [...notes].sort((a, b) => b.createdAt - a.createdAt).slice(0, 3),
    [notes]
  );

  const topTasks = useMemo(
    () =>
      [...tasks]
        .filter((t) => !t.done)
        .sort((a, b) => PRIORITY_ORDER[a.priority] - PRIORITY_ORDER[b.priority])
        .slice(0, 4),
    [tasks]
  );

  const openCount = tasks.filter((t) => !t.done).length;
  const highCount = tasks.filter((t) => !t.done && t.priority === "high").length;

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Overview</h1>
          <p className="page-header__meta">Here's where things stand today.</p>
        </div>
      </div>

      <div className="stat-row">
        <div className="stat-card neu-raised">
          <NotebookText size={18} color="var(--cyan)" />
          <span className="stat-card__value">{notes.length}</span>
          <span className="stat-card__label">Notes saved</span>
        </div>
        <div className="stat-card neu-raised">
          <ListChecks size={18} color="var(--cyan)" />
          <span className="stat-card__value">{openCount}</span>
          <span className="stat-card__label">Tasks open</span>
        </div>
        <div className="stat-card neu-raised">
          <Flame size={18} color="var(--priority-high)" />
          <span className="stat-card__value">{highCount}</span>
          <span className="stat-card__label">High priority</span>
        </div>
      </div>

      <div className="home-columns">
        <section className="home-section neu-flat">
          <div className="home-section__header">
            <h2>Recent notes</h2>
            <button className="text-link transition-neu" onClick={() => onNavigate("notes")}>
              View all <ArrowRight size={14} />
            </button>
          </div>
          {recentNotes.length === 0 ? (
            <p className="home-section__empty">No notes yet — start jotting things down.</p>
          ) : (
            <ul className="home-list">
              {recentNotes.map((n) => (
                <li key={n.id} className="home-list__item">
                  <span className="home-list__title">{n.title}</span>
                  {n.subject && <span className="subject-tag">{n.subject}</span>}
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="home-section neu-flat">
          <div className="home-section__header">
            <h2>Top priority tasks</h2>
            <button className="text-link transition-neu" onClick={() => onNavigate("checklist")}>
              View all <ArrowRight size={14} />
            </button>
          </div>
          {topTasks.length === 0 ? (
            <p className="home-section__empty">Nothing pending — you're caught up.</p>
          ) : (
            <ul className="home-list">
              {topTasks.map((t) => (
                <li key={t.id} className="home-list__item">
                  <span className={`priority-dot priority-dot--${t.priority}`} />
                  <span className="home-list__title">{t.text}</span>
                  {t.subject && <span className="subject-tag">{t.subject}</span>}
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}
