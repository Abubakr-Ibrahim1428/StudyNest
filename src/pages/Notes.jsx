import { useMemo, useState } from "react";
import { Plus, Pencil, Trash2, NotebookText } from "lucide-react";
import { useData } from "../context/DataContext";
import Modal from "../components/Modal";
import "../components/Form.css";
import "./Notes.css";

const CARD_ACCENTS = ["accent-a", "accent-b", "accent-c", "accent-d"];

export default function Notes() {
  const { notes, subjects, addNote, updateNote, deleteNote } = useData();
  const [activeSubject, setActiveSubject] = useState("all");
  const [editingNote, setEditingNote] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const filtered = useMemo(() => {
    if (activeSubject === "all") return notes;
    return notes.filter((n) => n.subject === activeSubject);
  }, [notes, activeSubject]);

  const openNew = () => {
    setEditingNote(null);
    setShowForm(true);
  };

  const openEdit = (note) => {
    setEditingNote(note);
    setShowForm(true);
  };

  const handleSubmit = (data) => {
    if (editingNote) {
      updateNote(editingNote.id, data);
    } else {
      addNote(data);
    }
    setShowForm(false);
  };

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Notes</h1>
          <p className="page-header__meta">{notes.length} note{notes.length !== 1 ? "s" : ""} saved</p>
        </div>
        <button className="fab transition-neu" onClick={openNew} aria-label="Add note">
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

      {filtered.length === 0 ? (
        <div className="empty-state neu-flat">
          <NotebookText size={30} color="var(--text-faint)" />
          <h3 style={{ marginTop: 12 }}>No notes here yet</h3>
          <p>Write down what you don't want to forget before the next lecture.</p>
        </div>
      ) : (
        <div className="notes-grid">
          {filtered.map((note, i) => (
            <article key={note.id} className={`note-card neu-raised transition-neu ${CARD_ACCENTS[i % CARD_ACCENTS.length]}`}>
              <div className="note-card__top">
                {note.subject && <span className="subject-tag">{note.subject}</span>}
                <div className="note-card__actions">
                  <button className="btn-icon transition-neu" onClick={() => openEdit(note)} aria-label="Edit note">
                    <Pencil size={15} />
                  </button>
                  <button className="btn-icon transition-neu" onClick={() => deleteNote(note.id)} aria-label="Delete note">
                    <Trash2 size={15} />
                  </button>
                </div>
              </div>
              <h3 className="note-card__title">{note.title}</h3>
              <p className="note-card__text">{note.text}</p>
            </article>
          ))}
        </div>
      )}

      {showForm && (
        <Modal title={editingNote ? "Edit note" : "New note"} onClose={() => setShowForm(false)}>
          <NoteForm initial={editingNote} onSubmit={handleSubmit} />
        </Modal>
      )}
    </div>
  );
}

function NoteForm({ initial, onSubmit }) {
  const [title, setTitle] = useState(initial?.title ?? "");
  const [text, setText] = useState(initial?.text ?? "");
  const [subject, setSubject] = useState(initial?.subject ?? "");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    onSubmit({ title: title.trim(), text: text.trim(), subject: subject.trim() });
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      <div className="field">
        <label htmlFor="note-title">Title</label>
        <input
          id="note-title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. Recursion base cases"
          autoFocus
        />
      </div>
      <div className="field">
        <label htmlFor="note-subject">Subject / tag</label>
        <input
          id="note-subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="e.g. Algorithms"
        />
      </div>
      <div className="field">
        <label htmlFor="note-text">Note</label>
        <textarea
          id="note-text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write what you want to remember..."
        />
      </div>
      <button type="submit" className="btn-primary transition-neu">
        {initial ? "Save changes" : "Add note"}
      </button>
    </form>
  );
}
