export const APP_NAME = "DevArena";
export const APP_TAGLINE = "Your personal technology knowledge hub";

export const INTEREST_CATEGORIES = [
  {
    id: "software-engineering",
    label: "Software Engineering",
    interests: [
      { slug: "backend-development", name: "Backend Development" },
      { slug: "frontend-development", name: "Frontend Development" },
      { slug: "full-stack-development", name: "Full-Stack Development" },
      { slug: "mobile-app-development", name: "Mobile App Development" },
      { slug: "software-architecture", name: "Software Architecture" },
      { slug: "system-design", name: "System Design" },
    ],
  },
  {
    id: "data-and-ai",
    label: "Data and AI",
    interests: [
      { slug: "data-engineering", name: "Data Engineering" },
      { slug: "data-science", name: "Data Science" },
      { slug: "machine-learning", name: "Machine Learning" },
      { slug: "artificial-intelligence", name: "Artificial Intelligence" },
      { slug: "ai-engineering", name: "AI Engineering" },
      { slug: "mlops", name: "MLOps" },
      { slug: "data-analytics", name: "Data Analytics" },
      { slug: "big-data", name: "Big Data" },
    ],
  },
  {
    id: "infrastructure-and-cloud",
    label: "Infrastructure and Cloud",
    interests: [
      { slug: "devops", name: "DevOps" },
      { slug: "cloud-computing", name: "Cloud Computing" },
      { slug: "aws", name: "AWS" },
      { slug: "azure", name: "Azure" },
      { slug: "google-cloud", name: "Google Cloud" },
      { slug: "platform-engineering", name: "Platform Engineering" },
      { slug: "site-reliability-engineering", name: "Site Reliability Engineering" },
      { slug: "distributed-systems", name: "Distributed Systems" },
    ],
  },
  {
    id: "security",
    label: "Security",
    interests: [
      { slug: "cybersecurity", name: "Cybersecurity" },
      { slug: "application-security", name: "Application Security" },
      { slug: "ethical-hacking", name: "Ethical Hacking" },
      { slug: "penetration-testing", name: "Penetration Testing" },
      { slug: "devsecops", name: "DevSecOps" },
    ],
  },
  {
    id: "other",
    label: "Other Technology Areas",
    interests: [
      { slug: "computer-science", name: "Computer Science" },
      { slug: "algorithms-and-data-structures", name: "Algorithms and Data Structures" },
      { slug: "database-systems", name: "Database Systems" },
      { slug: "open-source", name: "Open Source" },
      { slug: "emerging-technologies", name: "Emerging Technologies" },
      { slug: "blockchain", name: "Blockchain" },
      { slug: "developer-productivity", name: "Developer Productivity" },
    ],
  },
] as const;

export const CAREER_ROLES = [
  { slug: "software-engineer", name: "Software Engineer", category: "Software Engineering" },
  { slug: "frontend-engineer", name: "Frontend Engineer", category: "Software Engineering" },
  { slug: "backend-engineer", name: "Backend Engineer", category: "Software Engineering" },
  { slug: "full-stack-engineer", name: "Full-Stack Engineer", category: "Software Engineering" },
  { slug: "mobile-application-developer", name: "Mobile Application Developer", category: "Software Engineering" },
  { slug: "systems-engineer", name: "Systems Engineer", category: "Software Engineering" },
  { slug: "embedded-software-engineer", name: "Embedded Software Engineer", category: "Software Engineering" },
  { slug: "software-architect", name: "Software Architect", category: "Software Engineering" },
  { slug: "data-engineer", name: "Data Engineer", category: "Data and AI" },
  { slug: "analytics-engineer", name: "Analytics Engineer", category: "Data and AI" },
  { slug: "data-analyst", name: "Data Analyst", category: "Data and AI" },
  { slug: "data-scientist", name: "Data Scientist", category: "Data and AI" },
  { slug: "machine-learning-engineer", name: "Machine Learning Engineer", category: "Data and AI" },
  { slug: "ai-engineer", name: "AI Engineer", category: "Data and AI" },
  { slug: "mlops-engineer", name: "MLOps Engineer", category: "Data and AI" },
  { slug: "ai-infrastructure-engineer", name: "AI Infrastructure Engineer", category: "Data and AI" },
  { slug: "cloud-engineer", name: "Cloud Engineer", category: "Cloud and Infrastructure" },
  { slug: "devops-engineer", name: "DevOps Engineer", category: "Cloud and Infrastructure" },
  { slug: "site-reliability-engineer", name: "Site Reliability Engineer", category: "Cloud and Infrastructure" },
  { slug: "platform-engineer", name: "Platform Engineer", category: "Cloud and Infrastructure" },
  { slug: "infrastructure-engineer", name: "Infrastructure Engineer", category: "Cloud and Infrastructure" },
  { slug: "solutions-architect", name: "Solutions Architect", category: "Cloud and Infrastructure" },
  { slug: "distributed-systems-engineer", name: "Distributed Systems Engineer", category: "Cloud and Infrastructure" },
  { slug: "cybersecurity-engineer", name: "Cybersecurity Engineer", category: "Security" },
  { slug: "security-analyst", name: "Security Analyst", category: "Security" },
  { slug: "application-security-engineer", name: "Application Security Engineer", category: "Security" },
  { slug: "cloud-security-engineer", name: "Cloud Security Engineer", category: "Security" },
  { slug: "penetration-tester", name: "Penetration Tester", category: "Security" },
  { slug: "devsecops-engineer", name: "DevSecOps Engineer", category: "Security" },
  { slug: "database-administrator", name: "Database Administrator", category: "Other" },
  { slug: "database-engineer", name: "Database Engineer", category: "Other" },
  { slug: "qa-automation-engineer", name: "QA Automation Engineer", category: "Other" },
  { slug: "blockchain-developer", name: "Blockchain Developer", category: "Other" },
  { slug: "game-developer", name: "Game Developer", category: "Other" },
  { slug: "computer-vision-engineer", name: "Computer Vision Engineer", category: "Other" },
  { slug: "nlp-engineer", name: "NLP Engineer", category: "Other" },
] as const;

export const EXPERIENCE_LEVELS = [
  { value: "complete_beginner", label: "Complete Beginner", description: "Just getting started with technology" },
  { value: "beginner", label: "Beginner", description: "Learning fundamentals" },
  { value: "intermediate", label: "Intermediate", description: "Comfortable building projects" },
  { value: "advanced", label: "Advanced", description: "Deep expertise in some areas" },
  { value: "professional", label: "Professional", description: "Working in industry" },
] as const;

export const LEARNING_PREFERENCES = [
  { slug: "technical-tutorials", name: "Technical tutorials" },
  { slug: "engineering-case-studies", name: "Engineering case studies" },
  { slug: "real-world-projects", name: "Real-world project experiences" },
  { slug: "industry-trends", name: "Industry trends" },
  { slug: "personal-experiences", name: "Personal experiences from engineers" },
  { slug: "career-advice", name: "Career advice" },
  { slug: "research-deep-dives", name: "Research and technical deep dives" },
  { slug: "opinion-discussions", name: "Opinion pieces and discussions" },
  { slug: "interview-preparation", name: "Interview preparation" },
] as const;

/** Interest slug → related keywords for ranking / search expansion */
export const INTEREST_KEYWORDS: Record<string, string[]> = {
  "data-engineering": [
    "data engineering", "spark", "kafka", "airflow", "etl", "elt", "data pipeline",
    "data warehouse", "dbt", "snowflake", "databricks", "flink", "data lake",
  ],
  "machine-learning": [
    "machine learning", "ml", "scikit-learn", "xgboost", "model training", "feature engineering",
  ],
  "artificial-intelligence": ["artificial intelligence", "ai", "llm", "gpt", "transformers", "genai"],
  "ai-engineering": ["ai engineering", "llmops", "rag", "agents", "prompt engineering", "langchain"],
  devops: ["devops", "ci/cd", "kubernetes", "docker", "terraform", "ansible", "observability"],
  "cloud-computing": ["cloud", "iaas", "paas", "serverless"],
  aws: ["aws", "amazon web services", "s3", "lambda", "ec2", "eks"],
  azure: ["azure", "microsoft azure", "aks"],
  "google-cloud": ["gcp", "google cloud", "bigquery", "gke"],
  cybersecurity: ["cybersecurity", "security", "threat", "vulnerability", "soc"],
  "backend-development": ["backend", "api", "microservices", "nodejs", "golang", "java", "spring"],
  "frontend-development": ["frontend", "react", "nextjs", "vue", "css", "typescript ui"],
  "full-stack-development": ["full stack", "fullstack", "web development"],
  "system-design": ["system design", "scalability", "architecture", "distributed"],
  mlops: ["mlops", "model deployment", "feature store", "model monitoring"],
  "distributed-systems": ["distributed systems", "consensus", "raft", "consistency"],
  "database-systems": ["database", "sql", "postgres", "mongodb", "redis", "indexing"],
  blockchain: ["blockchain", "web3", "ethereum", "solidity"],
  "computer-science": ["computer science", "algorithms", "operating systems", "networking"],
  "algorithms-and-data-structures": ["algorithms", "data structures", "leetcode", "complexity"],
};

/** Interest → Reddit communities */
export const INTEREST_SUBREDDITS: Record<string, string[]> = {
  "data-engineering": ["dataengineering", "ETL", "dataengineering", "apachespark", "data"],
  "machine-learning": ["MachineLearning", "learnmachinelearning", "MLQuestions"],
  "artificial-intelligence": ["artificial", "OpenAI", "LocalLLaMA"],
  "ai-engineering": ["LocalLLaMA", "LangChain", "MachineLearning"],
  devops: ["devops", "kubernetes", "docker", "cicd"],
  aws: ["aws", "AmazonWebServices"],
  azure: ["AZURE"],
  "google-cloud": ["googlecloud"],
  "cloud-computing": ["cloudcomputing", "cloud"],
  cybersecurity: ["cybersecurity", "netsec", "AskNetsec"],
  "application-security": ["netsec", "websecurity"],
  "backend-development": ["backend", "node", "golang", "java"],
  "frontend-development": ["webdev", "reactjs", "frontend"],
  "full-stack-development": ["webdev", "programming"],
  "system-design": ["ExperiencedDevs", "softwarearchitecture"],
  "computer-science": ["computerscience", "learnprogramming"],
  "algorithms-and-data-structures": ["leetcode", "cscareerquestions"],
  mlops: ["MLOps", "MachineLearning"],
  "site-reliability-engineering": ["sre", "devops"],
  "platform-engineering": ["devops", "kubernetes", "PlatformEngineering"],
  blockchain: ["ethereum", "solana", "cryptotechnology"],
  "database-systems": ["Database", "PostgreSQL", "mongodb"],
};

/** Interest → YouTube search queries (used when YOUTUBE_API_KEY is set) */
export const INTEREST_YOUTUBE_QUERIES: Record<string, string[]> = {
  "data-engineering": [
    "data engineering tutorial",
    "apache spark kafka airflow",
    "data pipeline architecture",
  ],
  "machine-learning": ["machine learning tutorial", "scikit-learn deep learning"],
  "artificial-intelligence": ["AI explained", "large language models tutorial"],
  "ai-engineering": ["AI engineering RAG agents", "LLM application development"],
  devops: ["devops tutorial kubernetes docker", "CI CD pipeline"],
  aws: ["AWS tutorial for beginners", "AWS solutions architecture"],
  cybersecurity: ["cybersecurity fundamentals", "ethical hacking tutorial"],
  "backend-development": ["backend engineering tutorial", "REST API system design"],
  "frontend-development": ["React TypeScript tutorial", "frontend system design"],
  "system-design": ["system design interview", "distributed systems explained"],
  mlops: ["MLOps tutorial", "ML model deployment"],
};

/**
 * Interest → YouTube channel IDs for public RSS (no API key).
 * Feeds: https://www.youtube.com/feeds/videos.xml?channel_id=...
 */
export const INTEREST_YOUTUBE_CHANNELS: Record<string, string[]> = {
  "data-engineering": [
    "UC8butISFwT-Wl7EV0hUK0BQ", // freeCodeCamp
    "UCJQJAI7IjbLcpsjWdSzZi5g", // Thu Vu data
  ],
  "machine-learning": [
    "UCcIXc5mJsHVYTZD6p0hBSQg", // StatQuest
    "UCfzlCWGWYyIQ0aLC5w48gBQ", // Sentdex
  ],
  "artificial-intelligence": [
    "UC8butISFwT-Wl7EV0hUK0BQ",
    "UCSHZKyawb77ixDdsGog4iWA", // Lex Fridman
  ],
  "ai-engineering": [
    "UC8butISFwT-Wl7EV0hUK0BQ",
    "UCr8O8l5cCX85Pem1LLmr5Xw", // AssemblyAI
  ],
  devops: [
    "UC8butISFwT-Wl7EV0hUK0BQ",
    "UCZNhwAWhur8sYov4pWtlq0Q", // Nana
  ],
  aws: ["UC8butISFwT-Wl7EV0hUK0BQ", "UCdngmbVKX1Tgre699-XLlUA"], // TechWorld with Nana / AWS
  cybersecurity: ["UC8butISFwT-Wl7EV0hUK0BQ", "UCs6nmQViDpUw0nuIx9c_WvA"], // NetworkChuck-ish / use NetworkChuck
  "backend-development": [
    "UC8butISFwT-Wl7EV0hUK0BQ",
    "UC29ju8bIPH5as8OGnQzwJyA", // Traversy Media
  ],
  "frontend-development": [
    "UC8butISFwT-Wl7EV0hUK0BQ",
    "UC29ju8bIPH5as8OGnQzwJyA",
    "UCsBjURrPoezykLs9EqgamOA", // Fireship
  ],
  "full-stack-development": [
    "UC8butISFwT-Wl7EV0hUK0BQ",
    "UC29ju8bIPH5as8OGnQzwJyA",
    "UCsBjURrPoezykLs9EqgamOA",
  ],
  "system-design": [
    "UC8butISFwT-Wl7EV0hUK0BQ",
    "UC9vLsnFg62EkwUyw9_Dnoxw", // ByteByteGo
  ],
  "computer-science": ["UC8butISFwT-Wl7EV0hUK0BQ"],
  mlops: ["UC8butISFwT-Wl7EV0hUK0BQ"],
  "software-architecture": ["UC8butISFwT-Wl7EV0hUK0BQ"],
};

export const NAV_ITEMS = [
  { href: "/home", label: "Home", icon: "Home" },
  { href: "/articles", label: "Blogs & Articles", icon: "BookOpen" },
  { href: "/reddit", label: "Reddit", icon: "MessageSquare" },
  { href: "/youtube", label: "YouTube", icon: "Video" },
  { href: "/roadmaps", label: "Career Roadmaps", icon: "Map" },
  { href: "/following", label: "Following", icon: "Users" },
  { href: "/bookmarks", label: "Bookmarks", icon: "Bookmark" },
  { href: "/blogs", label: "My Blogs", icon: "PenSquare" },
  { href: "/progress", label: "Learning Progress", icon: "Trophy" },
  { href: "/profile", label: "Profile", icon: "User" },
  { href: "/settings", label: "Settings", icon: "Settings" },
] as const;

export const SOURCE_LABELS: Record<string, string> = {
  medium: "Medium",
  substack: "Substack",
  devto: "DEV",
  hashnode: "Hashnode",
  hackernews: "Hacker News",
  reddit: "Reddit",
  youtube: "YouTube",
  devarena: "DevArena",
  engineering_blog: "Engineering Blog",
};

export const XP_REWARDS = {
  read_article: 5,
  complete_topic: 25,
  complete_stage: 50,
  publish_blog: 100,
  daily_streak: 10,
  bookmark: 2,
  comment: 8,
} as const;
