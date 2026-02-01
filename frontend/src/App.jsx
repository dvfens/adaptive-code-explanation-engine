import { useState } from "react";
import "./App.css";

export default function App() {
  const [code, setCode] = useState("");
  const [mode, setMode] = useState("ELI5");
  const [result, setResult] = useState("");

  const explainCode = async () => {
    if (!code.trim()) return;

    const res = await fetch("http://localhost:5000/explain", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code, mode }),
    });

    const data = await res.json();
    setResult(data.explanation || "No response");
  };

  return (
    <div className="page">
      <h1 className="title">
        ⚡ Adaptive Code Explanation Engine
      </h1>
      <p className="subtitle">
        AI-powered code explanations tailored to your level
      </p>

      <div className="center">
        <div className="grid">
          {/* LEFT CARD */}
          <div className="card">
            <h3>📄 Source Code</h3>

            <textarea
              placeholder="Paste your code here..."
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />

            <div className="actions">
              <select value={mode} onChange={(e) => setMode(e.target.value)}>
                <option value="ELI5">ELI5</option>
                <option value="Student">Student</option>
                <option value="Senior">Senior</option>
              </select>

              <button onClick={explainCode}>
                ✨ Explain Code
              </button>
            </div>
          </div>

          {/* RIGHT CARD */}
          <div className="card">
            {result ? (
              <pre className="output">{result}</pre>
            ) : (
              <div className="empty">
                🤖 Ready to explain your code  
                <span>Paste code and click “Explain Code”</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
