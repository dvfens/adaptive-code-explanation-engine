import { useState } from 'react';
import './App.css';

function App() {
  const [code, setCode] = useState('');
  const [mode, setMode] = useState('Student');
  const [explanation, setExplanation] = useState('');

  const handleExplain = () => {
    // Placeholder logic - no API calls as per requirements
    setExplanation(`Code will be explained in ${mode} mode. (Backend integration pending)`);
  };

  return (
    <div className="App">
      <h1>Adaptive Code Explanation Engine</h1>
      
      <div className="input-section">
        <label htmlFor="code-input">Paste Your Code:</label>
        <textarea
          id="code-input"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Paste your source code here..."
          rows={15}
        />
      </div>

      <div className="controls">
        <label htmlFor="mode-select">Explanation Mode:</label>
        <select
          id="mode-select"
          value={mode}
          onChange={(e) => setMode(e.target.value)}
        >
          <option value="Student">Student</option>
          <option value="Senior Developer">Senior Developer</option>
          <option value="ELI5">ELI5</option>
        </select>

        <button onClick={handleExplain}>Explain Code</button>
      </div>

      <div className="output-section">
        <label>Explanation:</label>
        <div className="output-box">
          {explanation || 'Your explanation will appear here...'}
        </div>
      </div>
    </div>
  );
}

export default App;
