import { Routes, Route } from "react-router-dom";
import Navigation from "./shared/Navigation";
import Dashboard from "./pages/Dashboard";
import SongLibrary from "./pages/SongLibrary";
import Completed from "./pages/Completed";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import "./App.css";
function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1 className="app-title">🎸 Woodshed</h1>
        <Navigation />
      </header>

      <main className="app-main">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/library" element={<SongLibrary />} />
          <Route path="/completed" element={<Completed />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
