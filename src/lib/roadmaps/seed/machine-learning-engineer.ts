import type { SeedRoadmap } from "../types";

export const machineLearningEngineerRoadmap: SeedRoadmap = {
  slug: "machine-learning-engineer",
  title: "Complete Machine Learning Engineering Roadmap",
  role_name: "Machine Learning Engineer",
  category: "Data and AI",
  summary:
    "Progress from Python and math foundations through classical ML, deep learning, MLOps, and production model serving.",
  overview: {
    whatTheyDo:
      "Machine learning engineers turn data and models into reliable production systems—feature pipelines, training jobs, evaluation, deployment, and monitoring.",
    problemsSolved:
      "They bridge the gap between notebooks and production: data leakage, brittle training, silent model drift, and unscalable inference.",
    typicalDay:
      "Improving datasets/features, running experiments, reviewing metrics, packaging models, debugging serving latency, and partnering with data scientists and platform teams.",
    employers:
      "Tech product companies, ads/recommendation orgs, fintech, healthcare AI teams, and ML platform groups.",
    fundamentalSkills: [
      "Python",
      "Statistics",
      "Classical ML",
      "Deep learning basics",
      "Feature engineering",
      "Experiment tracking",
      "Model serving",
      "MLOps",
    ],
  },
  prerequisites: [
    {
      title: "Programming comfort",
      description: "Python basics and willingness to write clean, tested code—not only notebooks.",
    },
    {
      title: "Math readiness",
      description: "High-school algebra plus willingness to learn probability, linear algebra, and calculus intuition.",
    },
  ],
  difficulty: "intermediate",
  estimated_months: 11,
  stages: [
    {
      title: "Python, data, and math foundations",
      description: "Build the scientific Python stack and the math intuition ML depends on.",
      why_it_matters: "Every later framework assumes NumPy/pandas fluency and statistical literacy.",
      topics: [
        {
          title: "Scientific Python",
          description: "NumPy, pandas, matplotlib/seaborn, and reproducible environments.",
          why_it_matters: "Data wrangling quality dominates model quality.",
          project_ideas: [
            "Exploratory analysis report on a public tabular dataset",
            "Build reusable data-cleaning utilities with tests",
          ],
          resources: [
            {
              title: "NumPy Documentation",
              description: "Official NumPy reference and user guide.",
              url: "https://numpy.org/doc/stable/",
              platform: "numpy.org",
              difficulty: "beginner",
              is_free: true,
              resource_type: "documentation",
            },
            {
              title: "pandas Documentation",
              description: "DataFrame APIs and analysis workflows.",
              url: "https://pandas.pydata.org/docs/",
              platform: "pandas.pydata.org",
              difficulty: "beginner",
              is_free: true,
              resource_type: "documentation",
            },
            {
              title: "Python Data Science Handbook",
              description: "Free online book covering NumPy, pandas, and ML basics.",
              url: "https://jakevdp.github.io/PythonDataScienceHandbook/",
              platform: "jakevdp.github.io",
              difficulty: "intermediate",
              is_free: true,
              resource_type: "book",
            },
          ],
        },
        {
          title: "Probability and linear algebra intuition",
          description: "Distributions, expectation, variance, vectors/matrices, and gradients at a practical level.",
          why_it_matters: "You cannot debug loss curves or embeddings without this vocabulary.",
          project_ideas: [
            "Simulate sampling distributions and confidence intervals",
            "Implement linear regression with NumPy and compare to sklearn",
          ],
          resources: [
            {
              title: "Khan Academy – Statistics and Probability",
              description: "Free foundational probability and statistics lessons.",
              url: "https://www.khanacademy.org/math/statistics-probability",
              platform: "Khan Academy",
              difficulty: "beginner",
              is_free: true,
              resource_type: "course",
            },
            {
              title: "3Blue1Brown – Essence of Linear Algebra",
              description: "Visual intuition for vectors, matrices, and transformations.",
              url: "https://www.youtube.com/playlist?list=PLZHQObOWTQDPD3MizzM2xVFitgF8hE_ab",
              platform: "YouTube",
              difficulty: "beginner",
              is_free: true,
              resource_type: "video",
            },
          ],
        },
      ],
    },
    {
      title: "Classical machine learning",
      description: "Supervised/unsupervised algorithms, metrics, validation, and feature engineering.",
      why_it_matters: "Many production problems are still best solved with classical models.",
      topics: [
        {
          title: "Supervised learning and evaluation",
          description: "Linear/logistic models, trees/ensembles, cross-validation, and metric selection.",
          why_it_matters: "Wrong metrics and leakage create models that look good and fail live.",
          project_ideas: [
            "End-to-end classification pipeline with proper train/validation splits",
            "Compare tree ensembles vs linear models with calibration plots",
          ],
          resources: [
            {
              title: "scikit-learn User Guide",
              description: "Official guide for estimators, metrics, and model selection.",
              url: "https://scikit-learn.org/stable/user_guide.html",
              platform: "scikit-learn",
              difficulty: "beginner",
              is_free: true,
              resource_type: "documentation",
            },
            {
              title: "Google Machine Learning Crash Course",
              description: "Practical ML concepts with exercises.",
              url: "https://developers.google.com/machine-learning/crash-course",
              platform: "Google Developers",
              difficulty: "beginner",
              is_free: true,
              resource_type: "course",
            },
          ],
        },
        {
          title: "Feature engineering and data leakage",
          description: "Encoding, scaling, time-aware splits, target leakage, and pipelines.",
          why_it_matters: "Feature mistakes are the most common silent ML failure mode.",
          project_ideas: [
            "Build sklearn Pipelines that prevent leakage",
            "Create time-based validation for a forecasting-like problem",
          ],
          resources: [
            {
              title: "scikit-learn Pipelines",
              description: "Compose transformers and estimators safely.",
              url: "https://scikit-learn.org/stable/modules/compose.html",
              platform: "scikit-learn",
              difficulty: "intermediate",
              is_free: true,
              resource_type: "documentation",
            },
            {
              title: "Kaggle Intermediate ML Course",
              description: "Practical lessons on pipelines, categorical variables, and leakage.",
              url: "https://www.kaggle.com/learn/intermediate-machine-learning",
              platform: "Kaggle",
              difficulty: "intermediate",
              is_free: true,
              resource_type: "course",
            },
          ],
        },
      ],
    },
    {
      title: "Deep learning foundations",
      description: "Neural networks, modern frameworks, and common architectures for vision/text.",
      why_it_matters: "Deep learning powers representation learning for complex unstructured data.",
      topics: [
        {
          title: "Neural nets with PyTorch",
          description: "Tensors, autograd, training loops, regularization, and GPU basics.",
          why_it_matters: "PyTorch is a dominant framework for research-to-production ML engineering.",
          project_ideas: [
            "Train an MLP and a CNN on a standard dataset",
            "Implement early stopping, checkpointing, and metric logging",
          ],
          resources: [
            {
              title: "PyTorch Tutorials",
              description: "Official beginner-to-advanced PyTorch tutorials.",
              url: "https://pytorch.org/tutorials/",
              platform: "pytorch.org",
              difficulty: "intermediate",
              is_free: true,
              resource_type: "tutorial",
            },
            {
              title: "fast.ai Practical Deep Learning",
              description: "Top-down practical deep learning course.",
              url: "https://course.fast.ai/",
              platform: "fast.ai",
              difficulty: "intermediate",
              is_free: true,
              resource_type: "course",
            },
          ],
        },
        {
          title: "Modern architectures overview",
          description: "CNNs, transformers at a conceptual level, transfer learning, and fine-tuning.",
          why_it_matters: "MLE roles expect you to adapt pretrained models, not train everything from scratch.",
          project_ideas: [
            "Fine-tune an image classifier with transfer learning",
            "Fine-tune a small text classifier with a transformer encoder",
          ],
          resources: [
            {
              title: "Hugging Face NLP Course",
              description: "Transformers, tokenizers, and fine-tuning workflows.",
              url: "https://huggingface.co/learn/nlp-course/",
              platform: "Hugging Face",
              difficulty: "intermediate",
              is_free: true,
              resource_type: "course",
            },
            {
              title: "DeepLearning.AI",
              description: "Structured deep learning and generative AI courses.",
              url: "https://www.deeplearning.ai/",
              platform: "DeepLearning.AI",
              difficulty: "intermediate",
              is_free: false,
              resource_type: "course",
            },
          ],
        },
      ],
    },
    {
      title: "Experimentation and ML systems",
      description: "Track experiments, manage datasets/models, and design reproducible training systems.",
      why_it_matters: "Without experiment hygiene, teams cannot iterate or audit models.",
      topics: [
        {
          title: "Experiment tracking and model registry",
          description: "Parameters, metrics, artifacts, lineage, and promoting models through stages.",
          why_it_matters: "Production ML needs reproducibility and controlled rollouts.",
          project_ideas: [
            "Track experiments with MLflow and register a champion model",
            "Compare three feature sets with identical evaluation protocol",
          ],
          resources: [
            {
              title: "MLflow Documentation",
              description: "Tracking, projects, models, and registry.",
              url: "https://mlflow.org/docs/latest/index.html",
              platform: "MLflow",
              difficulty: "intermediate",
              is_free: true,
              resource_type: "documentation",
            },
            {
              title: "Weights & Biases Docs",
              description: "Experiment tracking and visualization platform docs.",
              url: "https://docs.wandb.ai/",
              platform: "W&B",
              difficulty: "intermediate",
              is_free: true,
              resource_type: "documentation",
            },
          ],
        },
        {
          title: "Training pipelines and feature stores (intro)",
          description: "Batch feature generation, training job orchestration, and avoiding train/serve skew.",
          why_it_matters: "Skew between training and serving features breaks models quietly.",
          project_ideas: [
            "Build a scheduled training pipeline from raw data to registered model",
            "Document feature definitions used by both training and inference",
          ],
          resources: [
            {
              title: "Feast Documentation",
              description: "Open-source feature store for ML systems.",
              url: "https://docs.feast.dev/",
              platform: "Feast",
              difficulty: "advanced",
              is_free: true,
              resource_type: "documentation",
            },
            {
              title: "Made With ML",
              description: "Practical MLOps and production ML curriculum.",
              url: "https://madewithml.com/",
              platform: "madewithml.com",
              difficulty: "intermediate",
              is_free: true,
              resource_type: "course",
            },
          ],
        },
      ],
    },
    {
      title: "Deployment, monitoring, and MLOps",
      description: "Serve models, monitor drift/performance, and operate ML in production.",
      why_it_matters: "An unmonitored model is a liability.",
      topics: [
        {
          title: "Model serving",
          description: "Batch vs online inference, APIs, serialization, and latency/throughput trade-offs.",
          why_it_matters: "MLE value is realized when predictions are available to products reliably.",
          project_ideas: [
            "Serve a model behind a FastAPI endpoint with request validation",
            "Compare batch scoring vs real-time inference for the same model",
          ],
          resources: [
            {
              title: "FastAPI Documentation",
              description: "Modern Python API framework commonly used for model services.",
              url: "https://fastapi.tiangolo.com/",
              platform: "FastAPI",
              difficulty: "beginner",
              is_free: true,
              resource_type: "documentation",
            },
            {
              title: "BentoML Documentation",
              description: "Framework for packaging and serving ML models.",
              url: "https://docs.bentoml.com/",
              platform: "BentoML",
              difficulty: "intermediate",
              is_free: true,
              resource_type: "documentation",
            },
          ],
        },
        {
          title: "Monitoring and responsible ML",
          description: "Data drift, performance decay, bias checks, and rollback strategies.",
          why_it_matters: "Models degrade as the world changes.",
          project_ideas: [
            "Add prediction logging and a drift dashboard",
            "Define a model rollback plan triggered by metric thresholds",
          ],
          resources: [
            {
              title: "Evidently Documentation",
              description: "Open-source ML monitoring and evaluation toolkit.",
              url: "https://docs.evidentlyai.com/",
              platform: "Evidently",
              difficulty: "intermediate",
              is_free: true,
              resource_type: "documentation",
            },
            {
              title: "Google Responsible AI Practices",
              description: "Guidance for fairness, interpretability, and safe deployment.",
              url: "https://ai.google/responsibility/responsible-ai-practices/",
              platform: "Google AI",
              difficulty: "intermediate",
              is_free: true,
              resource_type: "article",
            },
          ],
        },
      ],
    },
    {
      title: "Portfolio projects and career prep",
      description: "Ship end-to-end ML systems and prepare for MLE interviews.",
      why_it_matters: "Hiring focuses on production judgment plus solid ML fundamentals.",
      topics: [
        {
          title: "End-to-end ML projects",
          description: "Problem framing, data, training, evaluation, deployment, and monitoring in one repo.",
          why_it_matters: "Portfolio systems prove you can own the full lifecycle.",
          project_ideas: [
            "Churn prediction service with training pipeline + API + drift checks",
            "Recommendation baseline with offline metrics and an online A/B stub",
          ],
          resources: [
            {
              title: "Awesome Machine Learning",
              description: "Curated list of ML frameworks and learning resources.",
              url: "https://github.com/josephmisiti/awesome-machine-learning",
              platform: "GitHub",
              difficulty: "beginner",
              is_free: true,
              resource_type: "repository",
            },
            {
              title: "Papers With Code",
              description: "Papers, code, and benchmarks for modern ML methods.",
              url: "https://paperswithcode.com/",
              platform: "Papers With Code",
              difficulty: "advanced",
              is_free: true,
              resource_type: "repository",
            },
          ],
        },
        {
          title: "MLE interview preparation",
          description: "ML theory, coding, system design for ML, and behavioral stories.",
          why_it_matters: "Interviews mix algorithms, statistics, and production scenarios.",
          project_ideas: [
            "Write an ML system design for real-time fraud scoring",
            "Practice explaining bias-variance and metric trade-offs aloud",
          ],
          resources: [
            {
              title: "Made With ML",
              description: "End-to-end ML engineering curriculum useful for interview depth.",
              url: "https://madewithml.com/",
              platform: "madewithml.com",
              difficulty: "intermediate",
              is_free: true,
              resource_type: "course",
            },
            {
              title: "scikit-learn Choosing the Right Estimator",
              description: "Practical map for selecting classical algorithms.",
              url: "https://scikit-learn.org/stable/machine_learning_map.html",
              platform: "scikit-learn",
              difficulty: "beginner",
              is_free: true,
              resource_type: "documentation",
            },
          ],
        },
      ],
    },
  ],
};
