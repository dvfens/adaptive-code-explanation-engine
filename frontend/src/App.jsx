import { useState } from 'react';
import './App.css';

// Import the external explanation service (to be implemented)
// import { explainCode } from './services/explainCode';

function App() {
  const [code, setCode] = useState('');
  const [mode, setMode] = useState('Student');
  const [explanation, setExplanation] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleExplain = async () => {
    // Validate input
    if (!code.trim()) {
      setError('Please paste some code to explain.');
      setExplanation('');
      return;
    }

    // Clear previous state
    setError('');
    setIsLoading(true);
    setExplanation('');

    try {
      // Call external async function (placeholder for now)
      // const result = await explainCode(code, mode);
      
      // Temporary mock response until backend integration
      const result = `[${mode} Mode]\n\nYour code explanation will appear here once the backend service is connected.\n\nCode length: ${code.length} characters`;
      
      setExplanation(result);
    } catch (err) {
      setError(err.message || 'Failed to explain code. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="App">
      <header>
        <h1>Adaptive Code Explanation Engine</h1>
      </header>
      
      <main>
        <section className="input-section">
          <label htmlFor="code-input">Paste Your Code:</label>
          <textarea
            id="code-input"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Paste your source code here..."
            rows={15}
            aria-label="Code input"
            disabled={isLoading}
          />
        </section>

        <section className="controls">
          <div className="control-group">
            <label htmlFor="mode-select">Explanation Mode:</label>
            <select
              id="mode-select"
              value={mode}
              onChange={(e) => setMode(e.target.value)}
              aria-label="Explanation mode"
              disabled={isLoading}
            >
              <option value="Student">Student</option>
              <option value="Senior Developer">Senior Developer</option>
              <option value="ELI5">ELI5</option>
            </select>
          </div>

          <button 
            onClick={handleExplain}
            disabled={isLoading}
            aria-busy={isLoading}
          >
            {isLoading ? 'Explaining...' : 'Explain Code'}
          </button>
        </section>

        {error && (
          <div className="error-message" role="alert">
            {error}
          </div>
        )}

        <section className="output-section">
          <label htmlFor="output-box">Explanation:</label>
          <div 
            id="output-box"
            className="output-box"
            role="region"
            aria-live="polite"
            aria-label="Code explanation output"
          >
            {explanation || 'Your explanation will appear here...'}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
