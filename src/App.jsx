import { useState } from "react";
import { SettingsProvider, useSettings } from "./context/SettingsContext";
import { DataProvider } from "./context/DataContext";
import Dock from "./components/Dock";
import Home from "./pages/Home";
import Notes from "./pages/Notes";
import Checklist from "./pages/Checklist";
import Settings from "./pages/Settings";
import "./App.css";

function AppShell() {
  const [page, setPage] = useState("home");
  const { dockPosition } = useSettings();

  const renderPage = () => {
    switch (page) {
      case "notes":
        return <Notes />;
      case "checklist":
        return <Checklist />;
      case "settings":
        return <Settings />;
      default:
        return <Home onNavigate={setPage} />;
    }
  };

  return (
    <div className="app">
      <Dock activePage={page} onNavigate={setPage} />
      <main className={`app__content app__content--${dockPosition}`}>
        {renderPage()}
      </main>
    </div>
  );
}

export default function App() {
  return (
    <SettingsProvider>
      <DataProvider>
        <AppShell />
      </DataProvider>
    </SettingsProvider>
  );
}
