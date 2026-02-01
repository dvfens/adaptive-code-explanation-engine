import { useState } from "react";
import "./App.css";

function App() {
  const [code, setCode] = useState("");
  const [mode, setMode] = useState("Student");
  const [explanation, setExplanation] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleExplain = async () => {
    setLoading(true);
    setError("");
    setExplanation("");

    try {
      const res = await fetch("http://localhost:5000/explain", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code,
          mode,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      setExplanation(data.explanation);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>Adaptive Code Explanation Engine</h1>

      <label>Paste Your Code:</label>
      <textarea
        rows={12}
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Paste your source code here..."
      />

      <div className="controls">
        <select value={mode} onChange={(e) => setMode(e.target.value)}>
          <option value="Student">Student</option>
          <option value="Senior Developer">Senior Developer</option>
          <option value="ELI5">ELI5</option>
        </select>

        <button onClick={handleExplain} disabled={loading}>
          {loading ? "Explaining..." : "Explain Code"}
        </button>
      </div>

      <div className="output">
        <h3>Explanation:</h3>

        {error && <p style={{ color: "red" }}>{error}</p>}

        {explanation && <pre>{explanation}</pre>}
      </div>
    </div>
  );
}

export default App;
