import React, { useEffect, useState } from 'react';
import {
  Zap,
  Home,
  Library,
  FileText,
  Activity
} from 'lucide-react';

const APP_TITLE = "F to B Turnaround Operating System";

export default function App() {
  const [view, setView] = useState('home');

  const goTo = (next) => {
    window.location.hash = `#/${next}`;
    setView(next);
  };

  useEffect(() => {
    const syncFromHash = () => {
      const raw = window.location.hash || "";
      const next = raw.replace("#/", "").replace("#", "").trim();
      const allowed = new Set(["home", "library", "log"]);
      setView(allowed.has(next) ? next : "home");
    };

    syncFromHash();
    window.addEventListener("hashchange", syncFromHash);
    return () => window.removeEventListener("hashchange", syncFromHash);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-4xl mx-auto">

        {/* HEADER */}
        <header className="flex justify-between items-center mb-8 border-b pb-4">
          <div className="flex items-center gap-3">
            <div className="bg-emerald-600 p-2 rounded text-white">
              <Zap size={20} />
            </div>
            <h1 className="font-bold uppercase">{APP_TITLE}</h1>
          </div>

          <nav className="flex gap-2">
            <button onClick={() => goTo('home')}>Home</button>
            <button onClick={() => goTo('library')}>Library</button>
            <button onClick={() => goTo('log')}>Log</button>
          </nav>
        </header>

        {/* HOME */}
        {view === 'home' && (
          <div className="text-center">
            <h2 className="text-3xl font-bold">Master One Move.</h2>
            <p className="text-slate-600 mt-2">
              Turnaround is the art of excluding distractions.
            </p>
          </div>
        )}

        {/* LIBRARY */}
        {view === 'library' && (
          <div className="bg-white p-6 rounded border">
            <h3 className="font-bold mb-2">Library</h3>
            <a
              href="https://sites.google.com/desotoisd.org/from-f-to-b-how-teamwork-trans/home"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-600 underline"
            >
              Open Google Site
            </a>
          </div>
        )}

        {/* LOG */}
        {view === 'log' && (
          <div className="bg-white p-6 rounded border space-y-4">
            <h3 className="text-2xl font-bold flex items-center gap-2">
              <Activity /> Friday Evidence Log
            </h3>
            <input className="w-full p-3 border rounded" placeholder="Active Sprint Move" />
            <input className="w-full p-3 border rounded" placeholder="Process Fidelity %" />
            <textarea className="w-full p-3 border rounded" placeholder="Primary Friction" />
            <textarea className="w-full p-3 border rounded" placeholder="Monday Fix" />
          </div>
        )}
      </div>
    </div>
  );
}