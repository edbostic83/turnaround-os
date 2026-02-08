import React, { useState } from 'react';
import { 
  AlertCircle, 
  CheckCircle2, 
  ChevronRight, 
  ClipboardCheck, 
  Library, 
  RotateCcw, 
  ShieldAlert, 
  Zap, 
  BookOpen, 
  Home,
  FileText,
  ExternalLink,
  Copy
} from 'lucide-react';

const APP_TITLE = "F to B Turnaround Operating System";

// VERIFIED DEEP LINKS FROM LIVE GOOGLE SITE
const SITE_LINKS = {
  home: "https://sites.google.com/desotoisd.org/from-f-to-b-how-teamwork-trans/home",
  startHere: "https://sites.google.com/desotoisd.org/from-f-to-b-how-teamwork-trans/start-here-90-minute-setup",
  diagnostic: "https://sites.google.com/desotoisd.org/from-f-to-b-how-teamwork-trans/start-here-90-minute-setup/the-diagnostic-knoster-weakest-link-selector",
  playbooks: {
    professionalLearning: "https://sites.google.com/desotoisd.org/from-f-to-b-how-teamwork-trans/playbooks/professional-learning-loop-playbook",
    behavior: "https://sites.google.com/desotoisd.org/from-f-to-b-how-teamwork-trans/playbooks/behavior-as-infrastructure-playbook",
    intervention: "https://sites.google.com/desotoisd.org/from-f-to-b-how-teamwork-trans/playbooks/intervention-alignment-playbook",
    compliance: "https://sites.google.com/desotoisd.org/from-f-to-b-how-teamwork-trans/compliance-playbook",
    leadershipCulture: "https://sites.google.com/desotoisd.org/from-f-to-b-how-teamwork-trans/leadership-culture-a-team",
    communications: "https://sites.google.com/desotoisd.org/from-f-to-b-how-teamwork-trans/communications-as-infrastructure-playbook",
    dataEvidence: "https://sites.google.com/desotoisd.org/from-f-to-b-how-teamwork-trans/data-evidence-as-infrastructure-playbook",
    sustainability: "https://sites.google.com/desotoisd.org/from-f-to-b-how-teamwork-trans/sustainability-and-scale-playbook",
    leadershipUnderPressure: "https://sites.google.com/desotoisd.org/from-f-to-b-how-teamwork-trans/leadership-moves-under-pressure-playbook"
  }
};

const PLAYBOOKS = {
  pl: {
    title: "Professional Learning Loop",
    domain: "Professional Learning",
    knoster: "Skills",
    move: "Instructional PL Loop",
    path: "Playbooks → Professional Learning Loop Playbook",
    url: SITE_LINKS.playbooks.professionalLearning,
    guardrails: ["DO NOT conduct full 45-minute formal evaluations right now.", "DO NOT give feedback on more than one thing at a time."],
    sprint: [
      { day: "Day 1", task: "Define ONE instructional move and its 'Operational Definition'." },
      { day: "Day 3", task: "Practice the move in PLC for 15 minutes. No talking, just doing." },
      { day: "Day 5", task: "Conduct five 10-minute walkthroughs using a simple Yes/No tally." },
      { day: "Day 10", task: "Evidence Huddle: Review % of 'Yes' and name the one barrier." }
    ]
  },
  behavior: {
    title: "Behavior as Infrastructure",
    domain: "Behavior/Culture",
    knoster: "Vision / Incentives",
    move: "Behavior Infrastructure Launch",
    path: "Playbooks → Behavior as Infrastructure Playbook",
    url: SITE_LINKS.playbooks.behavior,
    guardrails: ["DO NOT create a new, complex point system or 'store' today.", "DO NOT engage in 'why did you do that' debates; use the script."],
    sprint: [
      { day: "Day 1", task: "Define the 'Top 3' non-negotiable hallway behaviors." },
      { day: "Day 3", task: "Hold a 10-minute 'Stand-up' to model the Standard Response Script." },
      { day: "Day 5", task: "A-Team stays in hallways during all transitions to narrate positives." },
      { day: "Day 10", task: "Evidence Huddle: Identify the one 'blind spot' location to staff." }
    ]
  },
  compliance: {
    title: "Compliance Playbook",
    domain: "Compliance",
    knoster: "Action Plan",
    move: "Title I Execution Gate",
    path: "Top Nav → Compliance Playbook",
    url: SITE_LINKS.playbooks.compliance,
    guardrails: ["DO NOT try to back-fill documentation for months ago yet.", "DO NOT approve any new spend until the Gate checklist is signed."],
    sprint: [
      { day: "Day 1", task: "Create the 'Single Source of Truth' digital folder (The Box)." },
      { day: "Day 3", task: "Run the 'Execution Gate' on every event for the next 30 days." },
      { day: "Day 5", task: "30-minute 'Audit Huddle' to verify sign-ins and agendas." },
      { day: "Day 10", task: "Finalize the 'Monthly Evidence Cover Sheet' for current month." }
    ]
  },
  intervention: {
    title: "Intervention Alignment",
    domain: "Intervention/MTSS",
    knoster: "Resources",
    move: "Intervention Sync & Material Lock",
    path: "Playbooks → Intervention Alignment Playbook",
    url: SITE_LINKS.playbooks.intervention,
    guardrails: ["DO NOT change student groups mid-week.", "DO NOT allow interventionist schedules to be pulled for coverage."],
    sprint: [
      { day: "Day 1", task: "Audit the Intervention Master Schedule for coverage conflicts." },
      { day: "Day 3", task: "Verify that all interventionists have their required kits/materials." },
      { day: "Day 5", task: "Conduct a 'Materials Audit'—are kids actually touching resources?" },
      { day: "Day 10", task: "Evidence Huddle: Review data for top 10% of high-need kids." }
    ]
  },
  capacity: {
    title: "Leadership & Culture",
    domain: "A-Team Capacity",
    knoster: "Action Plan",
    move: "A-Team Evidence Huddle",
    path: "Top Nav → Leadership & Culture (A-Team)",
    url: SITE_LINKS.playbooks.leadershipCulture,
    guardrails: ["DO NOT add new initiatives to the staff newsletter this week.", "DO NOT discuss personal opinions; only discuss evidence from trackers."],
    sprint: [
      { day: "Day 1", task: "Set the 30-minute weekly Huddle time; lock it on all calendars." },
      { day: "Day 3", task: "Finalize the A-Team 'One Message' channel (Unified Voice)." },
      { day: "Day 5", task: "Run first Huddle: 10m Evidence, 10m Barriers, 10m Decisions." },
      { day: "Day 10", task: "Audit the Decision Log. Is every item assigned an owner and date?" }
    ]
  }
};

const QUESTIONS = [
  { id: 1, domain: 'pl', text: "Does every teacher receive one bite-sized 'look-for' feedback every week?", label: "Skills" },
  { id: 2, domain: 'pl', text: "Are PLCs used for practicing teaching moves rather than logistics?", label: "Skills" },
  { id: 3, domain: 'intervention', text: "Is there a list of students receiving Tier 2/3 support updated every 10 days?", label: "Resources" },
  { id: 4, domain: 'intervention', text: "Do interventionists have locked schedules and all required materials?", label: "Action Plan" },
  { id: 5, domain: 'behavior', text: "Can every staff member name the top 3 behavior expectations?", label: "Vision" },
  { id: 6, domain: 'behavior', text: "Is there a documented, script-based response to discipline used by all?", label: "Incentives" },
  { id: 7, domain: 'compliance', text: "Is there a 'Single Source of Truth' folder for Title I evidence?", label: "Action Plan" },
  { id: 8, domain: 'compliance', text: "Does every expenditure pass the 'Execution Gate' (Planned + Calendared)?", label: "Resources" },
  { id: 9, domain: 'capacity', text: "Does the A-Team meet for a 30-minute 'Evidence Huddle' weekly?", label: "Action Plan" },
  { id: 10, domain: 'capacity', text: "Are leadership decisions communicated via one unified 'One Message'?", label: "Vision" }
];

export default function App() {
  const [view, setView] = useState('home');
  const [scores, setScores] = useState({});
  const [resultPlaybook, setResultPlaybook] = useState(null);

  const calculateResult = () => {
    const domainScores = { pl: 0, compliance: 0, behavior: 0, capacity: 0, intervention: 0 };
    QUESTIONS.forEach(q => { domainScores[q.domain] += (scores[q.id] || 0); });
    let lowest = 'pl';
    let minScore = 999;
    Object.keys(domainScores).forEach(key => { if (domainScores[key] < minScore) { minScore = domainScores[key]; lowest = key; } });
    setResultPlaybook(PLAYBOOKS[lowest]);
    setView('result');
  };

  const isFormComplete = QUESTIONS.every(q => scores[q.id] !== undefined);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        
        {/* Navigation Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4 border-b border-slate-200 pb-6">
          <div className="flex items-center gap-3">
            <div className="bg-emerald-600 p-2 rounded-lg text-white"><Zap size={24} /></div>
            <h1 className="text-xl font-bold tracking-tight text-slate-800 uppercase leading-none">{APP_TITLE}</h1>
          </div>
          <nav className="flex gap-2">
            <button onClick={() => setView('home')} className={`px-3 py-1.5 rounded-md text-sm transition ${view === 'home' ? 'bg-slate-800 text-white' : 'hover:bg-slate-200'}`}><Home size={16} className="inline mr-1" /> Home</button>
            <button onClick={() => setView('library')} className={`px-3 py-1.5 rounded-md text-sm transition ${view === 'library' ? 'bg-slate-800 text-white' : 'hover:bg-slate-200'}`}><Library size={16} className="inline mr-1" /> Library</button>
            <button onClick={() => setView('log')} className={`px-3 py-1.5 rounded-md text-sm transition ${view === 'log' ? 'bg-slate-800 text-white' : 'hover:bg-slate-200'}`}><FileText size={16} className="inline mr-1" /> Log</button>
          </nav>
        </header>

        {/* Home View */}
        {view === 'home' && (
          <div className="space-y-12 animate-in fade-in duration-500">
            <section className="text-center space-y-4">
              <h2 className="text-3xl font-extrabold text-slate-900 leading-tight">Master One Move.</h2>
              <p className="text-slate-600 max-w-xl mx-auto text-lg leading-relaxed">Turnaround is the art of excluding distractions. Start with a panic button or the systemic diagnostic.</p>
            </section>

            {/* Panic Mode */}
            <section className="space-y-6">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                <ShieldAlert size={16} className="text-red-500" /> 🆘 Panic Mode: Direct Access
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button onClick={() => { setResultPlaybook(PLAYBOOKS.pl); setView('result'); }} className="group bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition text-left border-l-4 border-l-orange-500">
                  <h4 className="font-bold text-lg mb-2 group-hover:text-orange-600 transition">Instruction is slipping</h4>
                  <p className="text-xs text-slate-500 leading-relaxed italic">Walkthroughs show inconsistencies.</p>
                  <ChevronRight className="mt-4 text-slate-300 group-hover:text-orange-500" />
                </button>
                <button onClick={() => { setResultPlaybook(PLAYBOOKS.behavior); setView('result'); }} className="group bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition text-left border-l-4 border-l-red-500">
                  <h4 className="font-bold text-lg mb-2 group-hover:text-red-600 transition">Behavior is eating the day</h4>
                  <p className="text-xs text-slate-500 leading-relaxed italic">The office is full and staff is tired.</p>
                  <ChevronRight className="mt-4 text-slate-300 group-hover:text-red-500" />
                </button>
                <button onClick={() => { setResultPlaybook(PLAYBOOKS.compliance); setView('result'); }} className="group bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition text-left border-l-4 border-l-blue-500">
                  <h4 className="font-bold text-lg mb-2 group-hover:text-blue-600 transition">Compliance anxiety</h4>
                  <p className="text-xs text-slate-500 leading-relaxed italic">Folders are empty or an audit is near.</p>
                  <ChevronRight className="mt-4 text-slate-300 group-hover:text-blue-500" />
                </button>
              </div>
            </section>

            {/* Full Diagnostic Entry */}
            <section className="bg-slate-800 rounded-2xl p-8 text-white flex flex-col md:flex-row items-center gap-8 shadow-xl relative overflow-hidden">
              <div className="space-y-4 flex-1 relative z-10">
                <h3 className="text-2xl font-bold">The Systemic Diagnostic</h3>
                <p className="text-slate-300 leading-relaxed">Identify the specific Knoster bottleneck. Move from Identifying symptoms to selecting a specific 10-day move.</p>
                <button onClick={() => setView('form')} className="bg-emerald-500 hover:bg-emerald-400 text-white font-bold py-3 px-8 rounded-full transition shadow-lg">Start 10-Question Audit</button>
              </div>
              <div className="opacity-10 absolute -right-10 -bottom-10 rotate-12"><ClipboardCheck size={240} /></div>
            </section>
          </div>
        )}

        {/* Form View */}
        {view === 'form' && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="bg-slate-50 p-6 border-b border-slate-200 flex justify-between items-center">
              <div>
                <h3 className="font-bold text-lg">Turnaround Diagnostic</h3>
                <p className="text-sm text-slate-500">Score 0 (None), 1 (Inconsistent), 2 (Consistent).</p>
              </div>
              <button onClick={() => setView('home')} className="text-slate-400 hover:text-slate-600"><RotateCcw /></button>
            </div>
            <div className="divide-y divide-slate-100 p-2">
              {QUESTIONS.map((q) => (
                <div key={q.id} className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1 max-w-md">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{q.label}</span>
                    <p className="font-medium text-slate-800 leading-tight">{q.text}</p>
                  </div>
                  <div className="flex bg-slate-100 p-1 rounded-lg">
                    {[0, 1, 2].map((val) => (
                      <button key={val} onClick={() => setScores(prev => ({ ...prev, [q.id]: val }))} className={`w-12 h-10 rounded-md font-bold transition ${scores[q.id] === val ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}>{val}</button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="p-6 bg-slate-50 border-t border-slate-200 flex justify-end">
              <button disabled={!isFormComplete} onClick={calculateResult} className={`py-3 px-8 rounded-full font-bold transition ${isFormComplete ? 'bg-emerald-600 text-white shadow-lg' : 'bg-slate-300 text-slate-500 cursor-not-allowed'}`}>Generate Sprint Plan</button>
            </div>
          </div>
        )}

        {/* Result View */}
        {view === 'result' && resultPlaybook && (
          <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
            <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-lg flex items-start gap-3">
              <CheckCircle2 className="text-emerald-600 shrink-0 mt-0.5" />
              <p className="text-emerald-800 text-sm italic italic leading-relaxed">"Systemic friction is a natural byproduct of turnaround work; the struggle you feel today is the process of a broken system recalibrating."</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
                  <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6 border-b border-slate-100 pb-2">A) Diagnosis</h2>
                  <div className="space-y-6">
                    <div>
                      <p className="text-slate-500 text-[10px] uppercase font-bold tracking-widest mb-1">Target Domain</p>
                      <p className="text-2xl font-bold text-slate-900 leading-tight">{resultPlaybook.domain}</p>
                    </div>
                    <div className="flex gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100 items-center">
                      <AlertCircle className="text-slate-400 shrink-0" />
                      <p className="text-slate-600 text-sm leading-relaxed">System stalling due to gap in <span className="font-bold text-slate-800">{resultPlaybook.knoster}</span>. Execute the stabilization move below.</p>
                    </div>
                    <div>
                      <p className="text-slate-500 text-[10px] uppercase font-bold tracking-widest mb-1">B) One Next Move</p>
                      <p className="text-2xl font-bold text-emerald-700 leading-tight">Execute: {resultPlaybook.move}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
                  <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-6">C) 10-Day Sprint Plan</h2>
                  <div className="space-y-0 relative">
                    <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-slate-100"></div>
                    {resultPlaybook.sprint.map((s, idx) => (
                      <div key={idx} className="relative pl-12 pb-8 last:pb-0">
                        <div className="absolute left-0 w-8 h-8 rounded-full bg-slate-900 text-white flex items-center justify-center text-xs font-bold z-10 border-4 border-white shadow-sm">{idx + 1}</div>
                        <div>
                          <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-tighter">{s.day}</span>
                          <p className="font-bold text-slate-800 leading-tight text-lg">{s.task}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-slate-900 rounded-2xl p-6 text-white shadow-lg">
                  <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">D) Click Path</h2>
                  <div className="p-3 bg-slate-800 rounded-xl border border-slate-700 mb-4 text-xs font-mono text-emerald-400 leading-tight">{resultPlaybook.path}</div>
                  <a href={resultPlaybook.url} target="_blank" rel="noopener noreferrer" className="w-full flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-400 py-4 rounded-lg font-bold transition shadow-lg shadow-emerald-900/40"><ExternalLink size={18} /> Open Playbook</a>
                </div>

                <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                  <h2 className="text-xs font-bold text-red-500 uppercase tracking-widest mb-4">Guardrails</h2>
                  <ul className="space-y-3">
                    {resultPlaybook.guardrails.map((g, i) => (
                      <li key={i} className="flex gap-3 text-sm text-slate-600 leading-relaxed"><span className="text-red-500 font-bold">✕</span> {g}</li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 bg-slate-100 rounded-xl text-center">
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1 italic">Final Directive</p>
                  <p className="text-sm text-slate-600 font-medium">Mastery requires exclusion. <span className="font-bold text-slate-800 underline">Do not add anything else.</span></p>
                </div>

                <button onClick={() => setView('home')} className="w-full py-3 text-slate-400 rounded-xl hover:bg-slate-50 font-medium transition flex items-center justify-center gap-2 underline text-xs">Start New Audit</button>
              </div>
            </div>
          </div>
        )}

        {/* Library View */}
        {view === 'library' && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden animate-in fade-in duration-500">
            <div className="p-6 bg-slate-50 border-b border-slate-200"><h3 className="font-bold text-lg">The Full Resource Library</h3></div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-100 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-widest text-[10px]">
                  <tr><th className="p-4">Playbook Title</th><th className="p-4">Direct Link</th></tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr><td className="p-4 font-bold text-slate-800">Home</td><td className="p-4"><a href={SITE_LINKS.home} target="_blank" className="text-emerald-600 hover:underline">Link</a></td></tr>
                  <tr><td className="p-4 font-bold text-slate-800">Start Here (90-min Setup)</td><td className="p-4"><a href={SITE_LINKS.startHere} target="_blank" className="text-emerald-600 hover:underline">Link</a></td></tr>
                  <tr><td className="p-4 font-bold text-slate-800">The Diagnostic (Knoster)</td><td className="p-4"><a href={SITE_LINKS.diagnostic} target="_blank" className="text-emerald-600 hover:underline">Link</a></td></tr>
                  {Object.entries(SITE_LINKS.playbooks).map(([key, url]) => (
                    <tr key={key} className="hover:bg-slate-50 transition">
                      <td className="p-4 font-bold text-slate-800 capitalize">{key.replace(/([A-Z])/g, ' $1')}</td>
                      <td className="p-4"><a href={url} target="_blank" className="text-emerald-600 font-bold hover:underline">Open Playbook</a></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Evidence Log View */}
        {view === 'log' && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 space-y-8 animate-in fade-in duration-500">
            <header className="border-b border-slate-200 pb-4 flex justify-between items-end">
              <div><h2 className="text-2xl font-bold text-slate-900">Friday Evidence Log</h2><p className="text-slate-500 text-sm">Submit by 4:00 PM every Friday. Proof over stories.</p></div>
              <Activity className="text-emerald-600 hidden md:block" size={32} />
            </header>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="space-y-1"><label className="text-[10px] font-bold uppercase text-slate-400">Active Sprint Move</label><input type="text" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-lg" /></div>
                <div className="space-y-1"><label className="text-[10px] font-bold uppercase text-slate-400">Process Fidelity %</label><input type="text" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-lg" /></div>
              </div>
              <div className="space-y-4">
                <div className="space-y-1"><label className="text-[10px] font-bold uppercase text-slate-400">#1 System Friction</label><textarea rows="2" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-lg" /></div>
                <div className="space-y-1"><label className="text-[10px] font-bold uppercase text-slate-400">Monday Fix</label><textarea rows="2" className="w-full p-4 bg-slate-50 border border-slate-200 rounded-lg" /></div>
              </div>
            </div>
            <div className="flex justify-center pt-6"><button className="bg-emerald-600 text-white font-bold py-4 px-16 rounded-xl hover:bg-emerald-500 transition shadow-lg shadow-emerald-900/20">Archive Weekly Evidence</button></div>
          </div>
        )}

        <footer className="mt-12 pt-8 border-t border-slate-200 text-center">
          <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest leading-loose">Respect the Work. Respect the People. Build the System.</p>
        </footer>
      </div>
    </div>
  );
}