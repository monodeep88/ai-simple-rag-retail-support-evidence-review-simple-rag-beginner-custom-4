# Generation Notes

Mode: ai

Model: gemini / gemini-2.5-flash

Fallback reason: OpenAI limit reached. Automatically switched to Gemini.

Short description:

A beginner-friendly RAG application enabling retail support agents to quickly find answers and supporting evidence from internal policy documents, product manuals, and troubleshooting guides using natural language queries. Includes a FastAPI backend, React frontend, and source citations.

Architecture notes:

- {'overview': 'A full-stack application with a clear separation of concerns. The backend, built with FastAPI, handles document ingestion, RAG logic (embedding, vector search, LLM orchestration), and API endpoints. The frontend, built with React, provides a user-friendly interface for querying and displaying results with citations. All components are designed for simplicity suitable for a beginner project.', 'data_flow': 'User query -> React Frontend -> FastAPI Backend -> Embed Query -> Vector Store Search (for relevant document chunks) -> LLM (with query and chunks as context) -> LLM Response (answer + source references) -> FastAPI Backend -> React Frontend (display answer + citations).'}
