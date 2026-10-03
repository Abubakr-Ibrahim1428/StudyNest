import { Home, NotebookText, ListChecks, Settings } from "lucide-react";
import { useSettings } from "../context/SettingsContext";
import "./Dock.css";

const NAV_ITEMS = [
  { key: "home", label: "Home", icon: Home },
  { key: "notes", label: "Notes", icon: NotebookText },
  { key: "checklist", label: "Checklist", icon: ListChecks },
  { key: "settings", label: "Settings", icon: Settings },
];

export default function Dock({ activePage, onNavigate }) {
  const { dockPosition } = useSettings();

  return (
    <nav className={`dock dock--${dockPosition}`} aria-label="Primary">
      <div className="dock__brand neu-flat" aria-hidden="true">
        SN
      </div>

      <div className="dock__items">
        {NAV_ITEMS.map(({ key, label, icon: Icon }) => {
          const isActive = activePage === key;
          return (
            <button
              key={key}
              className={`dock__btn transition-neu ${isActive ? "dock__btn--active" : "neu-raised"}`}
              onClick={() => onNavigate(key)}
              aria-current={isActive ? "page" : undefined}
              title={label}
            >
              <Icon size={20} strokeWidth={2} />
              <span className="dock__label">{label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
