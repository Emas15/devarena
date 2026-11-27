import type { SeedRoadmap } from "../types";

export const aiEngineerRoadmap: SeedRoadmap = {
  slug: "ai-engineer",
  title: "Complete AI Engineering Roadmap",
  role_name: "AI Engineer",
  category: "Data and AI",
  summary:
    "Learn to build LLM-powered applications: prompting, retrieval, agents, evaluation, safety, and production AI systems.",
  overview: {
    whatTheyDo:
      "AI engineers design and ship applications that use foundation models—RAG systems, agents, tool-calling workflows, eval harnesses, and productized AI features.",
    problemsSolved:
      "They solve brittle prompts, hallucinations, weak retrieval, missing evaluations, high latency/cost, and unsafe model behavior in user-facing products.",
    typicalDay:
      "Iterating prompts and retrieval, wiring tools/APIs, measuring evals, optimizing cost/latency, and collaborating with product on AI UX.",
    employers:
      "Startups building AI products, enterprise AI platform teams, SaaS companies adding copilots, and applied research engineering groups.",
    fundamentalSkills: [
      "Python",
      "LLM APIs",
      "Prompt engineering",
      "RAG",
      "Embeddings & vector search",
      "Evaluation",
      "Agents/tools",
      "Production backend skills",
    ],
  },
  prerequisites: [
    {
      title: "Software engineering basics",
      description: "Comfort building APIs/apps and using Git. AI engineering is applied software work.",
    },
    {
      title: "Python fluency",
      description: "Ability to write modules, call APIs, and handle async/data processing in Python.",
    },
  ],
  difficulty: "intermediate",
  estimated_months: 8,
  stages: [
    {
      title: "Software and LLM foundations",
      description: "Strengthen backend/Python skills and understand how modern LLMs are used via APIs.",
      why_it_matters: "AI features fail when the surrounding software is weak.",
      topics: [
        {
          title: "Python services for AI apps",
          description: "APIs, async I/O, packaging, environment/secrets, and structured logging.",
          why_it_matters: "Most AI systems are services that call models and tools.",
          project_ideas: [
            "Build a FastAPI service that proxies chat completions with streaming",
            "Add request tracing IDs and token-usage logging",
          ],
          resources: [
            {
              title: "FastAPI Documentation",
              url: "https://fastapi.tiangolo.com/",
              platform: "FastAPI",
              difficulty: "beginner",
              is_free: true,
              resource_type: "documentation",
            },
            {
              title: "Python Tutorial",
              url: "https://docs.python.org/3/tutorial/",
              platform: "docs.python.org",
              difficulty: "beginner",
              is_free: true,
              resource_type: "documentation",
            },
          ],
        },
        {
          title: "LLM API fundamentals",
          description: "Tokens, context windows, temperature, tool/function calling, and streaming responses.",
          why_it_matters: "Product behavior depends on understanding model interfaces and constraints.",
          project_ideas: [
            "Compare temperature/top-p effects on a fixed prompt suite",
            "Implement tool calling for a calculator/search helper",
          ],
          resources: [
            {
              title: "OpenAI API Documentation",
              url: "https://platform.openai.com/docs/overview",
              platform: "OpenAI",
              difficulty: "beginner",
              is_free: true,
              resource_type: "documentation",
            },
            {
              title: "Anthropic Claude Docs",
              url: "https://docs.anthropic.com/",
              platform: "Anthropic",
              difficulty: "beginner",
              is_free: true,
              resource_type: "documentation",
            },
            {
              title: "Google Gemini API Docs",
              url: "https://ai.google.dev/gemini-api/docs",
              platform: "Google AI",
              difficulty: "beginner",
              is_free: true,
              resource_type: "documentation",
            },
          ],
        },
      ],
    },
    {
      title: "Prompting, structured outputs, and UX",
      description: "Design prompts and product interactions that are reliable for users.",
      why_it_matters: "Prompting is product logic for LLM apps.",
      topics: [
        {
          title: "Prompt engineering patterns",
          description: "System prompts, few-shot examples, constraints, and decomposition strategies.",
          why_it_matters: "Clear instructions and examples reduce variance and hallucinations.",
          project_ideas: [
            "Create a prompt library with versioning for a support assistant",
            "Build a grader that scores prompt variants on a fixed dataset",
          ],
          resources: [
            {
              title: "OpenAI Prompt Engineering Guide",
              url: "https://platform.openai.com/docs/guides/prompt-engineering",
              platform: "OpenAI",
              difficulty: "beginner",
              is_free: true,
              resource_type: "documentation",
            },
            {
              title: "Anthropic Prompt Engineering Overview",
              url: "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview",
              platform: "Anthropic",
              difficulty: "beginner",
              is_free: true,
              resource_type: "documentation",
            },
          ],
        },
        {
          title: "Structured outputs and guardrails",
          description: "JSON schemas, validation, refusal handling, and safe tool execution boundaries.",
          why_it_matters: "Downstream systems need predictable machine-readable outputs.",
          project_ideas: [
            "Force structured extraction into a Zod/Pydantic schema with retries",
            "Add policy checks before executing side-effecting tools",
          ],
          resources: [
            {
              title: "OpenAI Structured Outputs",
              url: "https://platform.openai.com/docs/guides/structured-outputs",
              platform: "OpenAI",
              difficulty: "intermediate",
              is_free: true,
              resource_type: "documentation",
            },
            {
              title: "Pydantic Documentation",
              url: "https://docs.pydantic.dev/",
              platform: "Pydantic",
              difficulty: "beginner",
              is_free: true,
              resource_type: "documentation",
            },
          ],
        },
      ],
    },
    {
      title: "Embeddings, retrieval, and RAG",
      description: "Ground model responses in your data with embeddings and retrieval pipelines.",
      why_it_matters: "RAG is the practical path to domain-specific AI without full fine-tuning.",
      topics: [
        {
          title: "Embeddings and vector search",
          description: "Chunking, embedding models, similarity search, and vector database basics.",
          why_it_matters: "Retrieval quality usually dominates generation quality in RAG apps.",
          project_ideas: [
            "Index a documentation corpus and evaluate top-k retrieval",
            "Experiment with chunk sizes and overlap on answer faithfulness",
          ],
          resources: [
            {
              title: "OpenAI Embeddings Guide",
              url: "https://platform.openai.com/docs/guides/embeddings",
              platform: "OpenAI",
              difficulty: "beginner",
              is_free: true,
              resource_type: "documentation",
            },
            {
              title: "Pinecone Learn – Vector Search",
              url: "https://www.pinecone.io/learn/",
              platform: "Pinecone",
              difficulty: "beginner",
              is_free: true,
              resource_type: "article",
            },
            {
              title: "Chroma Documentation",
              url: "https://docs.trychroma.com/",
              platform: "Chroma",
              difficulty: "beginner",
              is_free: true,
              resource_type: "documentation",
            },
          ],
        },
        {
          title: "RAG system design",
          description: "Ingestion, hybrid search, reranking, citations, and failure modes.",
          why_it_matters: "Naive RAG fails on real enterprise corpora without careful design.",
          project_ideas: [
            "Build a docs Q&A bot with source citations",
            "Add hybrid keyword + vector retrieval and compare eval scores",
          ],
          resources: [
            {
              title: "LangChain RAG Tutorial",
              url: "https://python.langchain.com/docs/tutorials/rag/",
              platform: "LangChain",
              difficulty: "intermediate",
              is_free: true,
              resource_type: "tutorial",
            },
            {
              title: "LlamaIndex Documentation",
              url: "https://docs.llamaindex.ai/",
              platform: "LlamaIndex",
              difficulty: "intermediate",
              is_free: true,
              resource_type: "documentation",
            },
          ],
        },
      ],
    },
    {
      title: "Agents, tools, and orchestration",
      description: "Compose multi-step AI workflows that call tools and external systems safely.",
      why_it_matters: "Many product features need planning, memory, and tool use—not a single prompt.",
      topics: [
        {
          title: "Tool-using agents",
          description: "Function calling, planner/executor patterns, memory, and human-in-the-loop.",
          why_it_matters: "Agents amplify capability and risk; design must be deliberate.",
          project_ideas: [
            "Build an agent that can search docs, call an API, and draft an answer",
            "Add confirmation steps before write actions",
          ],
          resources: [
            {
              title: "OpenAI Function Calling Guide",
              url: "https://platform.openai.com/docs/guides/function-calling",
              platform: "OpenAI",
              difficulty: "intermediate",
              is_free: true,
              resource_type: "documentation",
            },
            {
              title: "LangGraph Documentation",
              url: "https://langchain-ai.github.io/langgraph/",
              platform: "LangGraph",
              difficulty: "advanced",
              is_free: true,
              resource_type: "documentation",
            },
          ],
        },
        {
          title: "Workflow orchestration frameworks",
          description: "When to use chains vs graphs vs plain code for maintainable AI systems.",
          why_it_matters: "Framework choices affect debuggability and production ownership.",
          project_ideas: [
            "Rebuild a LangChain flow in plain Python and compare clarity",
            "Add tracing for each agent step and tool call",
          ],
          resources: [
            {
              title: "LangSmith Documentation",
              url: "https://docs.smith.langchain.com/",
              platform: "LangSmith",
              difficulty: "intermediate",
              is_free: true,
              resource_type: "documentation",
            },
            {
              title: "Haystack Documentation",
              url: "https://docs.haystack.deepset.ai/",
              platform: "Haystack",
              difficulty: "intermediate",
              is_free: true,
              resource_type: "documentation",
            },
          ],
        },
      ],
    },
    {
      title: "Evaluation, safety, cost, and production",
      description: "Measure quality, control risk, and operate AI features under latency and budget constraints.",
      why_it_matters: "Without evals and ops, AI demos never become trustworthy products.",
      topics: [
        {
          title: "Evaluation harnesses",
          description: "Golden sets, rubric/LLM-as-judge carefully, regression testing for prompts/RAG.",
          why_it_matters: "You cannot improve what you do not measure.",
          project_ideas: [
            "Create a 50-example eval set with automatic scoring",
            "Block merges when eval scores regress beyond a threshold",
          ],
          resources: [
            {
              title: "OpenAI Evals",
              url: "https://github.com/openai/evals",
              platform: "GitHub",
              difficulty: "advanced",
              is_free: true,
              resource_type: "repository",
            },
            {
              title: "Ragas Documentation",
              url: "https://docs.ragas.io/",
              platform: "Ragas",
              difficulty: "intermediate",
              is_free: true,
              resource_type: "documentation",
            },
          ],
        },
        {
          title: "Safety, cost, and deployment",
          description: "Content filters, PII handling, caching, rate limits, model routing, and observability.",
          why_it_matters: "Production AI must be safe, affordable, and operable.",
          project_ideas: [
            "Add semantic cache + model routing by difficulty",
            "Ship an AI feature with red-team prompts and refusal tests",
          ],
          resources: [
            {
              title: "OWASP Top 10 for LLM Applications",
              url: "https://owasp.org/www-project-top-10-for-large-language-model-applications/",
              platform: "OWASP",
              difficulty: "intermediate",
              is_free: true,
              resource_type: "documentation",
            },
            {
              title: "NVIDIA NeMo Guardrails Docs",
              url: "https://docs.nvidia.com/nemo/guardrails/index.html",
              platform: "NVIDIA",
              difficulty: "advanced",
              is_free: true,
              resource_type: "documentation",
            },
          ],
        },
      ],
    },
    {
      title: "Portfolio and career preparation",
      description: "Ship AI products that demonstrate judgment beyond calling an API.",
      why_it_matters: "Employers want engineers who can evaluate and operate AI systems, not only demo them.",
      topics: [
        {
          title: "AI product portfolio",
          description: "Full apps with RAG/agents, evals, tracing, and clear architecture write-ups.",
          why_it_matters: "Strong portfolios show product thinking and reliability.",
          project_ideas: [
            "Domain RAG assistant with citations, eval dashboard, and cost report",
            "Internal copilot that uses tools against a real API with audit logs",
          ],
          resources: [
            {
              title: "Hugging Face Documentation",
              url: "https://huggingface.co/docs",
              platform: "Hugging Face",
              difficulty: "intermediate",
              is_free: true,
              resource_type: "documentation",
            },
            {
              title: "freeCodeCamp AI / LLM tutorials",
              url: "https://www.freecodecamp.org/news/tag/artificial-intelligence/",
              platform: "freeCodeCamp",
              difficulty: "beginner",
              is_free: true,
              resource_type: "article",
            },
          ],
        },
        {
          title: "Interview readiness",
          description: "Explain RAG trade-offs, eval design, failure modes, and system diagrams.",
          why_it_matters: "AI engineer interviews emphasize practical system design and evaluation.",
          project_ideas: [
            "Whiteboard a customer-support AI architecture with safety controls",
            "Prepare stories about debugging retrieval failures",
          ],
          resources: [
            {
              title: "Anthropic Docs – Building with Claude",
              url: "https://docs.anthropic.com/en/docs/overview",
              platform: "Anthropic",
              difficulty: "beginner",
              is_free: true,
              resource_type: "documentation",
            },
            {
              title: "OpenAI Cookbook",
              url: "https://cookbook.openai.com/",
              platform: "OpenAI",
              difficulty: "intermediate",
              is_free: true,
              resource_type: "tutorial",
            },
          ],
        },
      ],
    },
  ],
};
