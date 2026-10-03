import { PanelLeft, PanelRight } from "lucide-react";
import { useSettings } from "../context/SettingsContext";
import "./Settings.css";

export default function Settings() {
  const { dockPosition, setDockPosition } = useSettings();

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Settings</h1>
          <p className="page-header__meta">Tune the app to how you like to work.</p>
        </div>
      </div>

      <section className="settings-card neu-flat">
        <div className="settings-card__text">
          <h3>Dock placement</h3>
          <p>Choose which side of the screen the navigation dock sits on.</p>
        </div>

        <div className="dock-toggle">
          <button
            className={`dock-toggle__option transition-neu ${dockPosition === "left" ? "dock-toggle__option--active" : "neu-flat"}`}
            onClick={() => setDockPosition("left")}
          >
            <PanelLeft size={18} />
            Left
          </button>
          <button
            className={`dock-toggle__option transition-neu ${dockPosition === "right" ? "dock-toggle__option--active" : "neu-flat"}`}
            onClick={() => setDockPosition("right")}
          >
            <PanelRight size={18} />
            Right
          </button>
        </div>
      </section>
    </div>
  );
}
