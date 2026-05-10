import { useState } from "react";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { LandingPage } from "./components/LandingPage";
import { WhoIsWatching } from "./components/WhoIsWatching";
import { Portfolio } from "./components/Portfolio";

type AppState = "landing" | "profiles" | "portfolio";

export default function App() {
  const [currentView, setCurrentView] = useState<AppState>("landing");

  const handleEnterSite = () => {
    setCurrentView("profiles");
  };

  const handleSelectProfile = () => {
    setCurrentView("portfolio");
  };

  return (
    <ErrorBoundary>
      {currentView === "landing" && <LandingPage onEnter={handleEnterSite} />}
      {currentView === "profiles" && <WhoIsWatching onSelectProfile={handleSelectProfile} />}
      {currentView === "portfolio" && <Portfolio />}
    </ErrorBoundary>
  );
}