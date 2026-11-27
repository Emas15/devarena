do $$
declare
  rid uuid;
  sid uuid;
  tid uuid;
begin
  select id into rid from public.roadmaps where slug = 'ai-engineer';
  if rid is null then raise exception 'missing roadmap'; end if;
  delete from public.roadmap_resources where topic_id in (
    select t.id from public.roadmap_topics t
    join public.roadmap_stages s on s.id = t.stage_id
    where s.roadmap_id = rid
  );
  delete from public.roadmap_topics where stage_id in (
    select id from public.roadmap_stages where roadmap_id = rid
  );
  delete from public.roadmap_stages where roadmap_id = rid;

  insert into public.roadmap_stages (roadmap_id, stage_order, title, description, why_it_matters)
  values (rid, 1, 'Software and LLM foundations', 'Strengthen backend/Python skills and understand how modern LLMs are used via APIs.', 'AI features fail when the surrounding software is weak.')
  returning id into sid;

  insert into public.roadmap_topics (stage_id, topic_order, title, description, why_it_matters, project_ideas)
  values (sid, 1, 'Python services for AI apps', 'APIs, async I/O, packaging, environment/secrets, and structured logging.', 'Most AI systems are services that call models and tools.', ARRAY['Build a FastAPI service that proxies chat completions with streaming', 'Add request tracing IDs and token-usage logging']::text[])
  returning id into tid;

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'FastAPI Documentation', '', 'https://fastapi.tiangolo.com/', 'FastAPI', 'beginner', true, 'documentation');

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'Python Tutorial', '', 'https://docs.python.org/3/tutorial/', 'docs.python.org', 'beginner', true, 'documentation');

  insert into public.roadmap_topics (stage_id, topic_order, title, description, why_it_matters, project_ideas)
  values (sid, 2, 'LLM API fundamentals', 'Tokens, context windows, temperature, tool/function calling, and streaming responses.', 'Product behavior depends on understanding model interfaces and constraints.', ARRAY['Compare temperature/top-p effects on a fixed prompt suite', 'Implement tool calling for a calculator/search helper']::text[])
  returning id into tid;

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'OpenAI API Documentation', '', 'https://platform.openai.com/docs/overview', 'OpenAI', 'beginner', true, 'documentation');

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'Anthropic Claude Docs', '', 'https://docs.anthropic.com/', 'Anthropic', 'beginner', true, 'documentation');

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'Google Gemini API Docs', '', 'https://ai.google.dev/gemini-api/docs', 'Google AI', 'beginner', true, 'documentation');

  insert into public.roadmap_stages (roadmap_id, stage_order, title, description, why_it_matters)
  values (rid, 2, 'Prompting, structured outputs, and UX', 'Design prompts and product interactions that are reliable for users.', 'Prompting is product logic for LLM apps.')
  returning id into sid;

  insert into public.roadmap_topics (stage_id, topic_order, title, description, why_it_matters, project_ideas)
  values (sid, 1, 'Prompt engineering patterns', 'System prompts, few-shot examples, constraints, and decomposition strategies.', 'Clear instructions and examples reduce variance and hallucinations.', ARRAY['Create a prompt library with versioning for a support assistant', 'Build a grader that scores prompt variants on a fixed dataset']::text[])
  returning id into tid;

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'OpenAI Prompt Engineering Guide', '', 'https://platform.openai.com/docs/guides/prompt-engineering', 'OpenAI', 'beginner', true, 'documentation');

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'Anthropic Prompt Engineering Overview', '', 'https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/overview', 'Anthropic', 'beginner', true, 'documentation');

  insert into public.roadmap_topics (stage_id, topic_order, title, description, why_it_matters, project_ideas)
  values (sid, 2, 'Structured outputs and guardrails', 'JSON schemas, validation, refusal handling, and safe tool execution boundaries.', 'Downstream systems need predictable machine-readable outputs.', ARRAY['Force structured extraction into a Zod/Pydantic schema with retries', 'Add policy checks before executing side-effecting tools']::text[])
  returning id into tid;

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'OpenAI Structured Outputs', '', 'https://platform.openai.com/docs/guides/structured-outputs', 'OpenAI', 'intermediate', true, 'documentation');

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'Pydantic Documentation', '', 'https://docs.pydantic.dev/', 'Pydantic', 'beginner', true, 'documentation');

  insert into public.roadmap_stages (roadmap_id, stage_order, title, description, why_it_matters)
  values (rid, 3, 'Embeddings, retrieval, and RAG', 'Ground model responses in your data with embeddings and retrieval pipelines.', 'RAG is the practical path to domain-specific AI without full fine-tuning.')
  returning id into sid;

  insert into public.roadmap_topics (stage_id, topic_order, title, description, why_it_matters, project_ideas)
  values (sid, 1, 'Embeddings and vector search', 'Chunking, embedding models, similarity search, and vector database basics.', 'Retrieval quality usually dominates generation quality in RAG apps.', ARRAY['Index a documentation corpus and evaluate top-k retrieval', 'Experiment with chunk sizes and overlap on answer faithfulness']::text[])
  returning id into tid;

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'OpenAI Embeddings Guide', '', 'https://platform.openai.com/docs/guides/embeddings', 'OpenAI', 'beginner', true, 'documentation');

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'Pinecone Learn – Vector Search', '', 'https://www.pinecone.io/learn/', 'Pinecone', 'beginner', true, 'article');

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'Chroma Documentation', '', 'https://docs.trychroma.com/', 'Chroma', 'beginner', true, 'documentation');

  insert into public.roadmap_topics (stage_id, topic_order, title, description, why_it_matters, project_ideas)
  values (sid, 2, 'RAG system design', 'Ingestion, hybrid search, reranking, citations, and failure modes.', 'Naive RAG fails on real enterprise corpora without careful design.', ARRAY['Build a docs Q&A bot with source citations', 'Add hybrid keyword + vector retrieval and compare eval scores']::text[])
  returning id into tid;

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'LangChain RAG Tutorial', '', 'https://python.langchain.com/docs/tutorials/rag/', 'LangChain', 'intermediate', true, 'tutorial');

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'LlamaIndex Documentation', '', 'https://docs.llamaindex.ai/', 'LlamaIndex', 'intermediate', true, 'documentation');

  insert into public.roadmap_stages (roadmap_id, stage_order, title, description, why_it_matters)
  values (rid, 4, 'Agents, tools, and orchestration', 'Compose multi-step AI workflows that call tools and external systems safely.', 'Many product features need planning, memory, and tool use—not a single prompt.')
  returning id into sid;

  insert into public.roadmap_topics (stage_id, topic_order, title, description, why_it_matters, project_ideas)
  values (sid, 1, 'Tool-using agents', 'Function calling, planner/executor patterns, memory, and human-in-the-loop.', 'Agents amplify capability and risk; design must be deliberate.', ARRAY['Build an agent that can search docs, call an API, and draft an answer', 'Add confirmation steps before write actions']::text[])
  returning id into tid;

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'OpenAI Function Calling Guide', '', 'https://platform.openai.com/docs/guides/function-calling', 'OpenAI', 'intermediate', true, 'documentation');

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'LangGraph Documentation', '', 'https://langchain-ai.github.io/langgraph/', 'LangGraph', 'advanced', true, 'documentation');

  insert into public.roadmap_topics (stage_id, topic_order, title, description, why_it_matters, project_ideas)
  values (sid, 2, 'Workflow orchestration frameworks', 'When to use chains vs graphs vs plain code for maintainable AI systems.', 'Framework choices affect debuggability and production ownership.', ARRAY['Rebuild a LangChain flow in plain Python and compare clarity', 'Add tracing for each agent step and tool call']::text[])
  returning id into tid;

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'LangSmith Documentation', '', 'https://docs.smith.langchain.com/', 'LangSmith', 'intermediate', true, 'documentation');

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'Haystack Documentation', '', 'https://docs.haystack.deepset.ai/', 'Haystack', 'intermediate', true, 'documentation');

  insert into public.roadmap_stages (roadmap_id, stage_order, title, description, why_it_matters)
  values (rid, 5, 'Evaluation, safety, cost, and production', 'Measure quality, control risk, and operate AI features under latency and budget constraints.', 'Without evals and ops, AI demos never become trustworthy products.')
  returning id into sid;

  insert into public.roadmap_topics (stage_id, topic_order, title, description, why_it_matters, project_ideas)
  values (sid, 1, 'Evaluation harnesses', 'Golden sets, rubric/LLM-as-judge carefully, regression testing for prompts/RAG.', 'You cannot improve what you do not measure.', ARRAY['Create a 50-example eval set with automatic scoring', 'Block merges when eval scores regress beyond a threshold']::text[])
  returning id into tid;

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'OpenAI Evals', '', 'https://github.com/openai/evals', 'GitHub', 'advanced', true, 'repository');

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'Ragas Documentation', '', 'https://docs.ragas.io/', 'Ragas', 'intermediate', true, 'documentation');

  insert into public.roadmap_topics (stage_id, topic_order, title, description, why_it_matters, project_ideas)
  values (sid, 2, 'Safety, cost, and deployment', 'Content filters, PII handling, caching, rate limits, model routing, and observability.', 'Production AI must be safe, affordable, and operable.', ARRAY['Add semantic cache + model routing by difficulty', 'Ship an AI feature with red-team prompts and refusal tests']::text[])
  returning id into tid;

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'OWASP Top 10 for LLM Applications', '', 'https://owasp.org/www-project-top-10-for-large-language-model-applications/', 'OWASP', 'intermediate', true, 'documentation');

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'NVIDIA NeMo Guardrails Docs', '', 'https://docs.nvidia.com/nemo/guardrails/index.html', 'NVIDIA', 'advanced', true, 'documentation');

  insert into public.roadmap_stages (roadmap_id, stage_order, title, description, why_it_matters)
  values (rid, 6, 'Portfolio and career preparation', 'Ship AI products that demonstrate judgment beyond calling an API.', 'Employers want engineers who can evaluate and operate AI systems, not only demo them.')
  returning id into sid;

  insert into public.roadmap_topics (stage_id, topic_order, title, description, why_it_matters, project_ideas)
  values (sid, 1, 'AI product portfolio', 'Full apps with RAG/agents, evals, tracing, and clear architecture write-ups.', 'Strong portfolios show product thinking and reliability.', ARRAY['Domain RAG assistant with citations, eval dashboard, and cost report', 'Internal copilot that uses tools against a real API with audit logs']::text[])
  returning id into tid;

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'Hugging Face Documentation', '', 'https://huggingface.co/docs', 'Hugging Face', 'intermediate', true, 'documentation');

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'freeCodeCamp AI / LLM tutorials', '', 'https://www.freecodecamp.org/news/tag/artificial-intelligence/', 'freeCodeCamp', 'beginner', true, 'article');

  insert into public.roadmap_topics (stage_id, topic_order, title, description, why_it_matters, project_ideas)
  values (sid, 2, 'Interview readiness', 'Explain RAG trade-offs, eval design, failure modes, and system diagrams.', 'AI engineer interviews emphasize practical system design and evaluation.', ARRAY['Whiteboard a customer-support AI architecture with safety controls', 'Prepare stories about debugging retrieval failures']::text[])
  returning id into tid;

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'Anthropic Docs – Building with Claude', '', 'https://docs.anthropic.com/en/docs/overview', 'Anthropic', 'beginner', true, 'documentation');

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'OpenAI Cookbook', '', 'https://cookbook.openai.com/', 'OpenAI', 'intermediate', true, 'tutorial');

end $$;