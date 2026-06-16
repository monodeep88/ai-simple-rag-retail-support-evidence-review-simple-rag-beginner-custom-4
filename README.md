# Retail Support Policy & Product Evidence Review RAG

    ## Project Overview

    Retail Support Policy & Product Evidence Review RAG is a complete full-stack AI project for **Simple RAG** at **Beginner** difficulty. It includes a FastAPI backend, a React frontend, sample documents, vector search with ChromaDB support, source citations, timeline logs, structured run storage, Docker files, and tests.

    Retail support often requires agents to quickly access and synthesize information from a large volume of internal documents (e.g., return policies, price match guidelines, product specifications, repair procedures). This project addresses the challenge of information retrieval by providing a RAG system that delivers precise answers with direct citations to the relevant source documents, improving agent efficiency and accuracy in real-time customer interactions.

    Difficulty controls project complexity, architecture depth, AI model selection, and how advanced the generated codebase is.

    - Architecture depth: minimal backend, simple folder structure, easy README, low-cost/free model
    - Generated stack: FastAPI backend, React UI, local vector fallback, simple tests
    - README style: beginner-friendly setup and clear expected output

    ## Tech Stack

    - Backend: Python, FastAPI, Pydantic, SQLAlchemy
    - AI/RAG: LangChain-ready prompt layer, ChromaDB vector storage, local deterministic fallback model
    - Workflow: Agent pipeline with planner, retrieval, tool, reasoning, and final answer steps
    - Frontend: React and Vite
    - Database: SQLite by default, PostgreSQL through Docker Compose
    - Testing: pytest
    - Difficulty: Beginner

    ## Folder Structure

    ```text
    ai-simple-rag-retail-support-evidence-review-simple-rag-beginner-custom-4/
      backend/
        app/
          main.py
          config.py
          db.py
          schemas.py
          data/sample_docs/
          services/
            text.py
            vector_store.py
            llm.py
            tools.py
            pipeline.py
        tests/
          test_project_contract.py
        requirements.txt
        Dockerfile
      frontend/
        src/
          App.jsx
          main.jsx
          styles.css
        package.json
        Dockerfile
      docker-compose.yml
      .env.example
      README.md
    ```

    ## Environment Variables

    ```env
    OPENAI_API_KEY=
    OPENAI_MODEL=gpt-4o-mini
    DATABASE_URL=sqlite:///./app.db
    ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000
    VITE_API_URL=http://localhost:8000
    ```

    The app runs without an OpenAI key by using a deterministic local answer model. Add `OPENAI_API_KEY` to use LangChain with OpenAI.

    ## Installation

    ```bash
    cd backend
    python -m venv .venv
    .venv\Scripts\activate
    pip install -r requirements.txt
    ```

    ```bash
    cd ../frontend
    npm install
    ```

    ## Run Backend

    ```bash
    cd backend
    uvicorn app.main:app --reload --port 8000
    ```

    ## Run Frontend

    ```bash
    cd frontend
    npm run dev
    ```

    ## Run With Docker

    ```bash
    docker compose up --build
    ```

    ## Example API Request

    ```bash
    curl -X POST http://localhost:8000/api/ask ^
      -H "Content-Type: application/json" ^
      -d "{\"question\": \"What is the refund policy?\"}"
    ```

    ## Example User Question

    ```text
    What should I do if a customer asks for a refund without an order id?
    ```

    ## Expected Output

    The API returns:

    - `answer`: a grounded answer generated from retrieved context
    - `sources`: cited document chunks with similarity scores
    - `steps`: planner, retriever, reasoning, tool-call, and final-answer timeline logs
    - `project_type`: `Simple RAG`

    ## How The RAG/Agent Flow Works

    User question -> load documents -> split chunks -> embed -> Chroma similarity search -> answer with citations.

    ## AI-Customized Domain Workflow

    - **Setup**: Clone repository, install backend dependencies (`pip install -r requirements.txt`), install frontend dependencies (`npm install`).
- **Document Ingestion**: Place relevant `.txt` files in the `/docs` directory. Run the FastAPI backend, which will automatically load and index these documents into the vector store upon startup or a dedicated endpoint.
- **Backend Start**: Navigate to the backend directory and run `uvicorn main:app --reload`.
- **Frontend Start**: Navigate to the frontend directory and run `npm start`.
- **Query**: Open the frontend URL in a browser (e.g., `http://localhost:3000`). Type a question related to retail policies or products into the search box.
- **Review**: Submit the query. The application will display a concise answer and a list of source document filenames.
- **Iterate**: Refine queries or add more documents to the `/docs` folder and restart the backend to update the index.

    ## Business Rules

    - All RAG responses must include at least one source citation (filename).
- Answers should be concise and directly address the user's question.
- The system should prioritize facts from official company documents over general knowledge.
- Max 3 relevant document chunks are used as context for the LLM to avoid token limits and focus on precision for beginner level.
- Responses must avoid speculative or out-of-scope information.

    1. The backend loads sample documents from `backend/app/data/sample_docs`.
    2. Documents are split into chunks.
    3. Chunks are embedded and stored in ChromaDB when available, with a local fallback for development.
    4. User questions are matched against relevant chunks.
    5. Agent-specific steps run: planner, retriever, tool call, reasoning, reviewer, or graph nodes.
    6. The final answer is returned with source citations and a timeline.

    ## Testing

    ```bash
    cd backend
    pytest
    ```
