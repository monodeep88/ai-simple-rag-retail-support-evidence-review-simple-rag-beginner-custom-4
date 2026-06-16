import { useState } from "react";
import "./styles.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";
const STARTER_QUESTIONS = ["What is our return policy for electronic items purchased online?", "How do I process a price match request for a competitor's advertised price?", "What are the steps to troubleshoot a customer's smart TV not connecting to Wi-Fi?"];

export default function App() {
  const [question, setQuestion] = useState(STARTER_QUESTIONS[0]);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event) {
    event.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const response = await fetch(`${API_URL}/api/ask`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.detail || "Request failed");
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="page">
      <section className="hero">
        <p className="eyebrow">Simple RAG</p>
        <h1>Retail Support Evidence Review Simple RAG - Beginner Custom 4</h1>
        <p>Retail support often requires agents to quickly access and synthesize information from a large volume of internal documents (e.g., return policies, price match guidelines, product specifications, repair procedures). This project addresses the challenge of information retrieval by providing a RAG system that delivers precise answers with direct citations to the relevant source documents, improving agent efficiency and accuracy in real-time customer interactions.</p>
        <p className="persona">Built for: {'name': 'Customer Support Agent (Beginner Level)', 'description': 'A new or junior customer support agent at a retail company, responsible for handling customer inquiries regarding product returns, warranty claims, troubleshooting, and general policy questions. Needs a quick, reliable way to find accurate information without extensive manual document searching.', 'pain_points': ['Difficulty finding specific information within vast document libraries.', 'Ensuring accuracy and consistency in answers.', 'Time pressure during customer calls/chats.', 'Need to cite sources for audit or verification.']}</p>
      </section>

      <section className="workspace">
        <form onSubmit={submit} className="panel question-panel">
          <label htmlFor="question">Question or task</label>
          <textarea
            id="question"
            value={question}
            onChange={(event) => setQuestion(event.target.value)}
            rows="7"
          />
          <button disabled={loading}>{loading ? "Running..." : "Run assistant"}</button>
          <div className="starter-list">
            {STARTER_QUESTIONS.map((item) => (
              <button type="button" key={item} className="starter" onClick={() => setQuestion(item)}>{item}</button>
            ))}
          </div>
          {error && <p className="error">{error}</p>}
        </form>

        <div className="panel result-panel">
          <h2>Answer</h2>
          {!result && <p className="muted">The answer, sources, and agent timeline will appear here.</p>}
          {result && (
            <>
              <p className="answer">{result.answer}</p>
              <h3>Sources</h3>
              <div className="source-list">
                {result.sources.map((source) => (
                  <article key={`${source.title}-${source.score}`} className="source">
                    <strong>{source.title}</strong>
                    <span>Score {source.score}</span>
                    <p>{source.snippet}</p>
                  </article>
                ))}
              </div>
              <h3>Agent timeline</h3>
              <ol className="timeline">
                {result.steps.map((step) => (
                  <li key={step.step}>
                    <strong>{step.step}</strong>
                    <span>{step.status}</span>
                    <p>{step.detail}</p>
                  </li>
                ))}
              </ol>
            </>
          )}
        </div>
      </section>
    </main>
  );
}
