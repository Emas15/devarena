-- seed machine-learning-engineer
delete from public.roadmap_resources where topic_id in (
  select t.id from public.roadmap_topics t
  join public.roadmap_stages s on s.id = t.stage_id
  join public.roadmaps rm on rm.id = s.roadmap_id
  where rm.slug = 'machine-learning-engineer'
);
delete from public.roadmap_topics where stage_id in (
  select s.id from public.roadmap_stages s
  join public.roadmaps rm on rm.id = s.roadmap_id
  where rm.slug = 'machine-learning-engineer'
);
delete from public.roadmap_stages where roadmap_id in (
  select id from public.roadmaps where slug = 'machine-learning-engineer'
);
insert into public.roadmaps (slug, title, role_name, category, summary, overview, prerequisites, difficulty, estimated_months, is_published)
values (
  'machine-learning-engineer',
  'Complete Machine Learning Engineering Roadmap',
  'Machine Learning Engineer',
  'Data and AI',
  'Progress from Python and math foundations through classical ML, deep learning, MLOps, and production model serving.',
  '{"whatTheyDo":"Machine learning engineers turn data and models into reliable production systems—feature pipelines, training jobs, evaluation, deployment, and monitoring.","problemsSolved":"They bridge the gap between notebooks and production: data leakage, brittle training, silent model drift, and unscalable inference.","typicalDay":"Improving datasets/features, running experiments, reviewing metrics, packaging models, debugging serving latency, and partnering with data scientists and platform teams.","employers":"Tech product companies, ads/recommendation orgs, fintech, healthcare AI teams, and ML platform groups.","fundamentalSkills":["Python","Statistics","Classical ML","Deep learning basics","Feature engineering","Experiment tracking","Model serving","MLOps"]}'::jsonb,
  '[{"title":"Programming comfort","description":"Python basics and willingness to write clean, tested code—not only notebooks."},{"title":"Math readiness","description":"High-school algebra plus willingness to learn probability, linear algebra, and calculus intuition."}]'::jsonb,
  'intermediate',
  11,
  true
)
on conflict (slug) do update set
  title = excluded.title,
  role_name = excluded.role_name,
  category = excluded.category,
  summary = excluded.summary,
  overview = excluded.overview,
  prerequisites = excluded.prerequisites,
  difficulty = excluded.difficulty,
  estimated_months = excluded.estimated_months,
  is_published = true,
  updated_at = now();
do $$
declare
  rid uuid;
  sid uuid;
  tid uuid;
begin
  select id into rid from public.roadmaps where slug = 'machine-learning-engineer';

  insert into public.roadmap_stages (roadmap_id, stage_order, title, description, why_it_matters)
  values (rid, 1, 'Python, data, and math foundations', 'Build the scientific Python stack and the math intuition ML depends on.', 'Every later framework assumes NumPy/pandas fluency and statistical literacy.')
  returning id into sid;

  insert into public.roadmap_topics (stage_id, topic_order, title, description, why_it_matters, project_ideas)
  values (sid, 1, 'Scientific Python', 'NumPy, pandas, matplotlib/seaborn, and reproducible environments.', 'Data wrangling quality dominates model quality.', '["Exploratory analysis report on a public tabular dataset","Build reusable data-cleaning utilities with tests"]'::text[])
  returning id into tid;

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'NumPy Documentation', 'Official NumPy reference and user guide.', 'https://numpy.org/doc/stable/', 'numpy.org', 'beginner', true, 'documentation');

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'pandas Documentation', 'DataFrame APIs and analysis workflows.', 'https://pandas.pydata.org/docs/', 'pandas.pydata.org', 'beginner', true, 'documentation');

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'Python Data Science Handbook', 'Free online book covering NumPy, pandas, and ML basics.', 'https://jakevdp.github.io/PythonDataScienceHandbook/', 'jakevdp.github.io', 'intermediate', true, 'book');

  insert into public.roadmap_topics (stage_id, topic_order, title, description, why_it_matters, project_ideas)
  values (sid, 2, 'Probability and linear algebra intuition', 'Distributions, expectation, variance, vectors/matrices, and gradients at a practical level.', 'You cannot debug loss curves or embeddings without this vocabulary.', '["Simulate sampling distributions and confidence intervals","Implement linear regression with NumPy and compare to sklearn"]'::text[])
  returning id into tid;

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'Khan Academy – Statistics and Probability', 'Free foundational probability and statistics lessons.', 'https://www.khanacademy.org/math/statistics-probability', 'Khan Academy', 'beginner', true, 'course');

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, '3Blue1Brown – Essence of Linear Algebra', 'Visual intuition for vectors, matrices, and transformations.', 'https://www.youtube.com/playlist?list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab', 'YouTube', 'beginner', true, 'video');

  insert into public.roadmap_stages (roadmap_id, stage_order, title, description, why_it_matters)
  values (rid, 2, 'Classical machine learning', 'Supervised/unsupervised algorithms, metrics, validation, and feature engineering.', 'Many production problems are still best solved with classical models.')
  returning id into sid;

  insert into public.roadmap_topics (stage_id, topic_order, title, description, why_it_matters, project_ideas)
  values (sid, 1, 'Supervised learning and evaluation', 'Linear/logistic models, trees/ensembles, cross-validation, and metric selection.', 'Wrong metrics and leakage create models that look good and fail live.', '["End-to-end classification pipeline with proper train/validation splits","Compare tree ensembles vs linear models with calibration plots"]'::text[])
  returning id into tid;

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'scikit-learn User Guide', 'Official guide for estimators, metrics, and model selection.', 'https://scikit-learn.org/stable/user_guide.html', 'scikit-learn', 'beginner', true, 'documentation');

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'Google Machine Learning Crash Course', 'Practical ML concepts with exercises.', 'https://developers.google.com/machine-learning/crash-course', 'Google Developers', 'beginner', true, 'course');

  insert into public.roadmap_topics (stage_id, topic_order, title, description, why_it_matters, project_ideas)
  values (sid, 2, 'Feature engineering and data leakage', 'Encoding, scaling, time-aware splits, target leakage, and pipelines.', 'Feature mistakes are the most common silent ML failure mode.', '["Build sklearn Pipelines that prevent leakage","Create time-based validation for a forecasting-like problem"]'::text[])
  returning id into tid;

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'scikit-learn Pipelines', 'Compose transformers and estimators safely.', 'https://scikit-learn.org/stable/modules/compose.html', 'scikit-learn', 'intermediate', true, 'documentation');

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'Kaggle Intermediate ML Course', 'Practical lessons on pipelines, categorical variables, and leakage.', 'https://www.kaggle.com/learn/intermediate-machine-learning', 'Kaggle', 'intermediate', true, 'course');

  insert into public.roadmap_stages (roadmap_id, stage_order, title, description, why_it_matters)
  values (rid, 3, 'Deep learning foundations', 'Neural networks, modern frameworks, and common architectures for vision/text.', 'Deep learning powers representation learning for complex unstructured data.')
  returning id into sid;

  insert into public.roadmap_topics (stage_id, topic_order, title, description, why_it_matters, project_ideas)
  values (sid, 1, 'Neural nets with PyTorch', 'Tensors, autograd, training loops, regularization, and GPU basics.', 'PyTorch is a dominant framework for research-to-production ML engineering.', '["Train an MLP and a CNN on a standard dataset","Implement early stopping, checkpointing, and metric logging"]'::text[])
  returning id into tid;

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'PyTorch Tutorials', 'Official beginner-to-advanced PyTorch tutorials.', 'https://pytorch.org/tutorials/', 'pytorch.org', 'intermediate', true, 'tutorial');

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'fast.ai Practical Deep Learning', 'Top-down practical deep learning course.', 'https://course.fast.ai/', 'fast.ai', 'intermediate', true, 'course');

  insert into public.roadmap_topics (stage_id, topic_order, title, description, why_it_matters, project_ideas)
  values (sid, 2, 'Modern architectures overview', 'CNNs, transformers at a conceptual level, transfer learning, and fine-tuning.', 'MLE roles expect you to adapt pretrained models, not train everything from scratch.', '["Fine-tune an image classifier with transfer learning","Fine-tune a small text classifier with a transformer encoder"]'::text[])
  returning id into tid;

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'Hugging Face NLP Course', 'Transformers, tokenizers, and fine-tuning workflows.', 'https://huggingface.co/learn/nlp-course/', 'Hugging Face', 'intermediate', true, 'course');

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'DeepLearning.AI', 'Structured deep learning and generative AI courses.', 'https://www.deeplearning.ai/', 'DeepLearning.AI', 'intermediate', false, 'course');

  insert into public.roadmap_stages (roadmap_id, stage_order, title, description, why_it_matters)
  values (rid, 4, 'Experimentation and ML systems', 'Track experiments, manage datasets/models, and design reproducible training systems.', 'Without experiment hygiene, teams cannot iterate or audit models.')
  returning id into sid;

  insert into public.roadmap_topics (stage_id, topic_order, title, description, why_it_matters, project_ideas)
  values (sid, 1, 'Experiment tracking and model registry', 'Parameters, metrics, artifacts, lineage, and promoting models through stages.', 'Production ML needs reproducibility and controlled rollouts.', '["Track experiments with MLflow and register a champion model","Compare three feature sets with identical evaluation protocol"]'::text[])
  returning id into tid;

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'MLflow Documentation', 'Tracking, projects, models, and registry.', 'https://mlflow.org/docs/latest/index.html', 'MLflow', 'intermediate', true, 'documentation');

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'Weights & Biases Docs', 'Experiment tracking and visualization platform docs.', 'https://docs.wandb.ai/', 'W&B', 'intermediate', true, 'documentation');

  insert into public.roadmap_topics (stage_id, topic_order, title, description, why_it_matters, project_ideas)
  values (sid, 2, 'Training pipelines and feature stores (intro)', 'Batch feature generation, training job orchestration, and avoiding train/serve skew.', 'Skew between training and serving features breaks models quietly.', '["Build a scheduled training pipeline from raw data to registered model","Document feature definitions used by both training and inference"]'::text[])
  returning id into tid;

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'Feast Documentation', 'Open-source feature store for ML systems.', 'https://docs.feast.dev/', 'Feast', 'advanced', true, 'documentation');

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'Made With ML', 'Practical MLOps and production ML curriculum.', 'https://madewithml.com/', 'madewithml.com', 'intermediate', true, 'course');

  insert into public.roadmap_stages (roadmap_id, stage_order, title, description, why_it_matters)
  values (rid, 5, 'Deployment, monitoring, and MLOps', 'Serve models, monitor drift/performance, and operate ML in production.', 'An unmonitored model is a liability.')
  returning id into sid;

  insert into public.roadmap_topics (stage_id, topic_order, title, description, why_it_matters, project_ideas)
  values (sid, 1, 'Model serving', 'Batch vs online inference, APIs, serialization, and latency/throughput trade-offs.', 'MLE value is realized when predictions are available to products reliably.', '["Serve a model behind a FastAPI endpoint with request validation","Compare batch scoring vs real-time inference for the same model"]'::text[])
  returning id into tid;

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'FastAPI Documentation', 'Modern Python API framework commonly used for model services.', 'https://fastapi.tiangolo.com/', 'FastAPI', 'beginner', true, 'documentation');

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'BentoML Documentation', 'Framework for packaging and serving ML models.', 'https://docs.bentoml.com/', 'BentoML', 'intermediate', true, 'documentation');

  insert into public.roadmap_topics (stage_id, topic_order, title, description, why_it_matters, project_ideas)
  values (sid, 2, 'Monitoring and responsible ML', 'Data drift, performance decay, bias checks, and rollback strategies.', 'Models degrade as the world changes.', '["Add prediction logging and a drift dashboard","Define a model rollback plan triggered by metric thresholds"]'::text[])
  returning id into tid;

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'Evidently Documentation', 'Open-source ML monitoring and evaluation toolkit.', 'https://docs.evidentlyai.com/', 'Evidently', 'intermediate', true, 'documentation');

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'Google Responsible AI Practices', 'Guidance for fairness, interpretability, and safe deployment.', 'https://ai.google/responsibility/responsible-ai-practices/', 'Google AI', 'intermediate', true, 'article');

  insert into public.roadmap_stages (roadmap_id, stage_order, title, description, why_it_matters)
  values (rid, 6, 'Portfolio projects and career prep', 'Ship end-to-end ML systems and prepare for MLE interviews.', 'Hiring focuses on production judgment plus solid ML fundamentals.')
  returning id into sid;

  insert into public.roadmap_topics (stage_id, topic_order, title, description, why_it_matters, project_ideas)
  values (sid, 1, 'End-to-end ML projects', 'Problem framing, data, training, evaluation, deployment, and monitoring in one repo.', 'Portfolio systems prove you can own the full lifecycle.', '["Churn prediction service with training pipeline + API + drift checks","Recommendation baseline with offline metrics and an online A/B stub"]'::text[])
  returning id into tid;

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'Awesome Machine Learning', 'Curated list of ML frameworks and learning resources.', 'https://github.com/josephmisiti/awesome-machine-learning', 'GitHub', 'beginner', true, 'repository');

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'Papers With Code', 'Papers, code, and benchmarks for modern ML methods.', 'https://paperswithcode.com/', 'Papers With Code', 'advanced', true, 'repository');

  insert into public.roadmap_topics (stage_id, topic_order, title, description, why_it_matters, project_ideas)
  values (sid, 2, 'MLE interview preparation', 'ML theory, coding, system design for ML, and behavioral stories.', 'Interviews mix algorithms, statistics, and production scenarios.', '["Write an ML system design for real-time fraud scoring","Practice explaining bias-variance and metric trade-offs aloud"]'::text[])
  returning id into tid;

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'Made With ML', 'End-to-end ML engineering curriculum useful for interview depth.', 'https://madewithml.com/', 'madewithml.com', 'intermediate', true, 'course');

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'scikit-learn Choosing the Right Estimator', 'Practical map for selecting classical algorithms.', 'https://scikit-learn.org/stable/machine_learning_map.html', 'scikit-learn', 'beginner', true, 'documentation');
end $$;