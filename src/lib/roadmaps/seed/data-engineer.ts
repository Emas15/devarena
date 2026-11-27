import type { SeedRoadmap } from "../types";

export const dataEngineerRoadmap: SeedRoadmap = {
  slug: "data-engineer",
  title: "Complete Data Engineering Roadmap",
  role_name: "Data Engineer",
  category: "Data and AI",
  summary:
    "A structured path from programming and SQL foundations through pipelines, Spark, Kafka, Airflow, and cloud data platforms to portfolio-ready projects.",
  overview: {
    whatTheyDo:
      "Data engineers design, build, and maintain reliable systems that move, transform, and store data so analysts, scientists, and products can use it with confidence.",
    problemsSolved:
      "They solve broken pipelines, inconsistent schemas, slow warehouse queries, late-arriving events, and the gap between raw source systems and trustworthy analytics tables.",
    typicalDay:
      "A typical day includes reviewing failed DAG runs, improving SQL or Spark jobs, modeling warehouse tables, coordinating with analysts on data contracts, and hardening monitoring and backfills.",
    employers:
      "Tech companies, fintech, e-commerce, healthcare, media, consulting firms, and any organization running a modern data stack or lakehouse.",
    fundamentalSkills: [
      "Python",
      "SQL",
      "Data modeling",
      "ETL/ELT",
      "Distributed processing",
      "Cloud data services",
      "Orchestration",
      "Data quality",
    ],
  },
  prerequisites: [
    {
      title: "Basic programming comfort",
      description:
        "Ability to write simple scripts, use variables, loops, and functions. Prior Python experience helps but is not required.",
    },
    {
      title: "Computer literacy",
      description:
        "Comfort with files, folders, installing software, and using a terminal or command prompt.",
    },
    {
      title: "Optional: intro CS concepts",
      description:
        "Familiarity with algorithms, data structures, and how networks/APIs work will accelerate later stages.",
    },
  ],
  difficulty: "beginner",
  estimated_months: 10,
  stages: [
    {
      title: "Programming Fundamentals",
      description:
        "Build the coding foundation every data engineer needs: Python, scripting, and version control with Git and GitHub.",
      why_it_matters:
        "Pipelines, transformations, and tooling are software. Strong fundamentals make every later stage faster and safer.",
      topics: [
        {
          title: "Python for data work",
          description:
            "Learn Python syntax, data structures, file I/O, virtual environments, and writing readable modules for data scripts.",
          why_it_matters:
            "Python is the default language for ETL scripts, Airflow DAGs, Spark jobs, and cloud SDKs in data engineering.",
          project_ideas: [
            "Write a CSV cleaner that validates columns and writes Parquet-like output as CSV/JSON",
            "Build a CLI that downloads a public API payload and saves normalized records",
          ],
          resources: [
            {
              title: "Python 3 Official Tutorial",
              description: "Official language tutorial covering core syntax and standard library basics.",
              url: "https://docs.python.org/3/tutorial/",
              platform: "docs.python.org",
              difficulty: "beginner",
              is_free: true,
              resource_type: "documentation",
            },
            {
              title: "Python for Everybody (freeCodeCamp)",
              description: "Beginner-friendly full course covering Python foundations.",
              url: "https://www.freecodecamp.org/news/python-for-everybody/",
              platform: "freeCodeCamp",
              difficulty: "beginner",
              is_free: true,
              resource_type: "course",
            },
            {
              title: "freeCodeCamp Python YouTube Course",
              description: "Long-form Python course suitable for absolute beginners.",
              url: "https://www.youtube.com/watch?v=rfscVS0vtbw",
              platform: "YouTube",
              difficulty: "beginner",
              is_free: true,
              resource_type: "video",
            },
          ],
        },
        {
          title: "Git and GitHub",
          description:
            "Version control workflows: commits, branches, pull requests, and collaborating on pipeline code.",
          why_it_matters:
            "Production data code lives in Git. Reviews, rollbacks, and CI all depend on solid version control habits.",
          project_ideas: [
            "Put your Python scripts in a GitHub repo with a clear README and .gitignore",
            "Practice a feature-branch PR workflow on a small data utility",
          ],
          resources: [
            {
              title: "Git Documentation",
              description: "Official Git reference and everyday commands.",
              url: "https://git-scm.com/doc",
              platform: "git-scm.com",
              difficulty: "beginner",
              is_free: true,
              resource_type: "documentation",
            },
            {
              title: "GitHub Skills: Introduction to GitHub",
              description: "Hands-on GitHub learning path for issues, PRs, and collaboration.",
              url: "https://skills.github.com/",
              platform: "GitHub",
              difficulty: "beginner",
              is_free: true,
              resource_type: "course",
            },
            {
              title: "Pro Git Book",
              description: "Free official Pro Git book for deeper understanding.",
              url: "https://git-scm.com/book/en/v2",
              platform: "git-scm.com",
              difficulty: "intermediate",
              is_free: true,
              resource_type: "book",
            },
          ],
        },
        {
          title: "Scripting and Linux basics",
          description:
            "Navigate the shell, pipe commands, schedule simple jobs, and manage files used by data workflows.",
          why_it_matters:
            "Most data platforms are Linux-based. Shell fluency speeds debugging, deployments, and local pipeline work.",
          project_ideas: [
            "Write a bash script that downloads files, validates sizes, and logs results",
            "Create a Makefile or simple shell entrypoints for your Python ETL",
          ],
          resources: [
            {
              title: "GNU Bash Manual",
              description: "Official Bash reference for scripting and interactive use.",
              url: "https://www.gnu.org/software/bash/manual/",
              platform: "gnu.org",
              difficulty: "intermediate",
              is_free: true,
              resource_type: "documentation",
            },
            {
              title: "The Linux Command Line (free book)",
              description: "Practical introduction to Linux command-line tools.",
              url: "https://linuxcommand.org/tlcl.php",
              platform: "linuxcommand.org",
              difficulty: "beginner",
              is_free: true,
              resource_type: "book",
            },
          ],
        },
      ],
    },
    {
      title: "SQL and Databases",
      description:
        "Master SQL querying, joins, aggregations, window functions, and relational design with PostgreSQL.",
      why_it_matters:
        "SQL is the lingua franca of warehouses, lakehouses, and analytical transformations. Weak SQL blocks every later tool.",
      topics: [
        {
          title: "SQL fundamentals and joins",
          description:
            "SELECT, WHERE, GROUP BY, JOIN types, subqueries, and writing correct multi-table queries.",
          why_it_matters:
            "Almost every warehouse transformation and data check is expressed in SQL first.",
          project_ideas: [
            "Solve a set of join/aggregation exercises against a sample retail schema",
            "Reproduce business metrics with documented grain and filters",
          ],
          resources: [
            {
              title: "PostgreSQL Tutorial",
              description: "Official PostgreSQL documentation tutorial section.",
              url: "https://www.postgresql.org/docs/current/tutorial.html",
              platform: "postgresql.org",
              difficulty: "beginner",
              is_free: true,
              resource_type: "documentation",
            },
            {
              title: "SQL Tutorial – Mode Analytics",
              description: "Clear SQL lessons with interactive examples.",
              url: "https://mode.com/sql-tutorial/",
              platform: "Mode",
              difficulty: "beginner",
              is_free: true,
              resource_type: "tutorial",
            },
            {
              title: "freeCodeCamp SQL Course",
              description: "Full SQL course covering queries and relational concepts.",
              url: "https://www.freecodecamp.org/news/learn-sql-course/",
              platform: "freeCodeCamp",
              difficulty: "beginner",
              is_free: true,
              resource_type: "course",
            },
          ],
        },
        {
          title: "Window functions and CTEs",
          description:
            "RANK, ROW_NUMBER, LAG/LEAD, running totals, and readable CTE-based query design.",
          why_it_matters:
            "Window functions power ranking, sessionization, SCD helpers, and many warehouse marts.",
          project_ideas: [
            "Build cohort retention queries with window functions",
            "Rewrite nested subqueries into CTEs and compare readability",
          ],
          resources: [
            {
              title: "PostgreSQL Window Functions",
              description: "Official docs for window function syntax and framing.",
              url: "https://www.postgresql.org/docs/current/tutorial-window.html",
              platform: "postgresql.org",
              difficulty: "intermediate",
              is_free: true,
              resource_type: "documentation",
            },
            {
              title: "Use The Index, Luke",
              description: "Practical SQL performance and indexing guidance.",
              url: "https://use-the-index-luke.com/",
              platform: "use-the-index-luke.com",
              difficulty: "intermediate",
              is_free: true,
              resource_type: "article",
            },
          ],
        },
        {
          title: "Relational design with PostgreSQL",
          description:
            "Normalization basics, keys, constraints, indexes, and designing schemas for analytics and ops.",
          why_it_matters:
            "Bad schemas create pipeline complexity forever. Good keys and constraints protect data quality.",
          project_ideas: [
            "Design a PostgreSQL schema for an e-commerce domain with FKs and indexes",
            "Load sample CSVs and enforce uniqueness/check constraints",
          ],
          resources: [
            {
              title: "PostgreSQL Documentation",
              description: "Complete PostgreSQL reference for DDL, DML, and administration.",
              url: "https://www.postgresql.org/docs/current/",
              platform: "postgresql.org",
              difficulty: "intermediate",
              is_free: true,
              resource_type: "documentation",
            },
            {
              title: "PostgreSQL Exercises",
              description: "Interactive SQL practice against a sample database.",
              url: "https://pgexercises.com/",
              platform: "pgexercises.com",
              difficulty: "beginner",
              is_free: true,
              resource_type: "exercise",
            },
          ],
        },
      ],
    },
    {
      title: "Data Engineering Foundations",
      description:
        "Learn data formats, ETL vs ELT, dimensional modeling, warehouses, lakes, and data quality practices.",
      why_it_matters:
        "These concepts are the mental model behind every pipeline and platform you will build.",
      topics: [
        {
          title: "Data formats and storage",
          description:
            "CSV, JSON, Avro, Parquet, compression, partitioning, and when columnar formats win.",
          why_it_matters:
            "Format and partition choices dominate cost and performance in lakes and Spark jobs.",
          project_ideas: [
            "Convert a large CSV dataset to Parquet with sensible partitions",
            "Benchmark query times on row vs columnar layouts for the same dataset",
          ],
          resources: [
            {
              title: "Apache Parquet Documentation",
              description: "Official Parquet format documentation.",
              url: "https://parquet.apache.org/docs/",
              platform: "Apache Parquet",
              difficulty: "intermediate",
              is_free: true,
              resource_type: "documentation",
            },
            {
              title: "Apache Avro Specification",
              description: "Schema-based binary serialization used heavily in streaming systems.",
              url: "https://avro.apache.org/docs/current/",
              platform: "Apache Avro",
              difficulty: "intermediate",
              is_free: true,
              resource_type: "documentation",
            },
          ],
        },
        {
          title: "ETL, ELT, and data modeling",
          description:
            "Batch load patterns, star schemas, facts/dimensions, SCD basics, and layered raw/staging/marts design.",
          why_it_matters:
            "Modeling decisions determine whether analysts trust tables and whether pipelines stay maintainable.",
          project_ideas: [
            "Design a star schema for orders, customers, and products",
            "Implement an idempotent load from raw files into staging and mart tables",
          ],
          resources: [
            {
              title: "dbt Learn – Fundamentals",
              description: "Modern ELT transformation concepts with dbt Core.",
              url: "https://docs.getdbt.com/docs/introduction",
              platform: "dbt Docs",
              difficulty: "beginner",
              is_free: true,
              resource_type: "documentation",
            },
            {
              title: "Kimball Group – Dimensional Modeling Techniques",
              description: "Classic dimensional modeling guidance used in warehouses.",
              url: "https://www.kimballgroup.com/data-warehouse-business-intelligence-resources/kimball-techniques/dimensional-modeling-techniques/",
              platform: "Kimball Group",
              difficulty: "intermediate",
              is_free: true,
              resource_type: "article",
            },
          ],
        },
        {
          title: "Warehouses, lakes, and data quality",
          description:
            "When to use warehouses vs lakes, quality checks, contracts, and documenting table ownership.",
          why_it_matters:
            "Untrusted data is unused data. Quality and ownership practices separate hobby pipelines from production platforms.",
          project_ideas: [
            "Add row-count, null-rate, and uniqueness checks to a warehouse load",
            "Write a short data contract for a core fact table",
          ],
          resources: [
            {
              title: "Great Expectations Documentation",
              description: "Open-source data quality and validation framework.",
              url: "https://docs.greatexpectations.io/",
              platform: "Great Expectations",
              difficulty: "intermediate",
              is_free: true,
              resource_type: "documentation",
            },
            {
              title: "AWS Data Lakes and Analytics Overview",
              description: "Cloud vendor overview of lake and analytics building blocks.",
              url: "https://docs.aws.amazon.com/whitepapers/latest/building-data-lakes/building-data-lake-aws.html",
              platform: "AWS Docs",
              difficulty: "intermediate",
              is_free: true,
              resource_type: "documentation",
            },
          ],
        },
      ],
    },
    {
      title: "Data Processing",
      description:
        "Process large datasets with Apache Spark and learn streaming foundations with Apache Kafka.",
      why_it_matters:
        "When data outgrows a single database, distributed batch and streaming systems become required skills.",
      topics: [
        {
          title: "Apache Spark and batch processing",
          description:
            "DataFrames, transformations/actions, partitions, shuffles, joins, and reading Parquet at scale.",
          why_it_matters:
            "Spark remains a core engine for large-scale batch ETL and lakehouse processing.",
          project_ideas: [
            "Rewrite a pandas ETL as a PySpark job over multi-GB files",
            "Use the Spark UI to explain and reduce shuffle-heavy stages",
          ],
          resources: [
            {
              title: "Apache Spark Documentation",
              description: "Official Spark docs including SQL and DataFrame APIs.",
              url: "https://spark.apache.org/docs/latest/",
              platform: "Apache Spark",
              difficulty: "intermediate",
              is_free: true,
              resource_type: "documentation",
            },
            {
              title: "PySpark Overview",
              description: "Python API guide for Spark applications.",
              url: "https://spark.apache.org/docs/latest/api/python/index.html",
              platform: "Apache Spark",
              difficulty: "intermediate",
              is_free: true,
              resource_type: "documentation",
            },
            {
              title: "Spark Tutorial (freeCodeCamp)",
              description: "Accessible introduction to Spark concepts and usage.",
              url: "https://www.freecodecamp.org/news/apache-spark-tutorial/",
              platform: "freeCodeCamp",
              difficulty: "beginner",
              is_free: true,
              resource_type: "article",
            },
          ],
        },
        {
          title: "Distributed computing concepts",
          description:
            "Parallelism, fault tolerance, partitioning strategies, skew, and cost/performance trade-offs.",
          why_it_matters:
            "Without these concepts, Spark jobs are slow, expensive, and mysterious when they fail.",
          project_ideas: [
            "Experiment with repartition vs coalesce on a skewed dataset",
            "Document shuffle sources in a join-heavy pipeline",
          ],
          resources: [
            {
              title: "Spark Programming Guide",
              description: "Core Spark programming model and execution concepts.",
              url: "https://spark.apache.org/docs/latest/rdd-programming-guide.html",
              platform: "Apache Spark",
              difficulty: "intermediate",
              is_free: true,
              resource_type: "documentation",
            },
          ],
        },
        {
          title: "Streaming fundamentals with Kafka",
          description:
            "Topics, partitions, producers/consumers, consumer groups, and event-driven pipeline patterns.",
          why_it_matters:
            "Real-time and near-real-time products depend on durable event logs and streaming consumers.",
          project_ideas: [
            "Produce synthetic click events to Kafka and consume them into a table",
            "Demonstrate consumer group rebalancing with multiple consumers",
          ],
          resources: [
            {
              title: "Apache Kafka Documentation",
              description: "Official Kafka intro, APIs, and operations guides.",
              url: "https://kafka.apache.org/documentation/",
              platform: "Apache Kafka",
              difficulty: "intermediate",
              is_free: true,
              resource_type: "documentation",
            },
            {
              title: "Kafka Introduction",
              description: "High-level Kafka concepts and use cases.",
              url: "https://kafka.apache.org/intro",
              platform: "Apache Kafka",
              difficulty: "beginner",
              is_free: true,
              resource_type: "documentation",
            },
            {
              title: "Confluent Kafka Tutorials",
              description: "Hands-on Kafka tutorials from Confluent.",
              url: "https://developer.confluent.io/tutorials/",
              platform: "Confluent",
              difficulty: "intermediate",
              is_free: true,
              resource_type: "tutorial",
            },
          ],
        },
      ],
    },
    {
      title: "Workflow Orchestration",
      description:
        "Schedule and monitor pipelines with Apache Airflow: DAGs, retries, sensors, and operational hygiene.",
      why_it_matters:
        "Unscheduled scripts do not make a platform. Orchestration turns jobs into reliable production workflows.",
      topics: [
        {
          title: "Apache Airflow fundamentals",
          description:
            "DAGs, operators, task dependencies, scheduling intervals, and local Airflow development.",
          why_it_matters:
            "Airflow is widely used to coordinate warehouse loads, Spark submits, and multi-step data workflows.",
          project_ideas: [
            "Create a daily Airflow DAG that extracts, loads, and validates a public dataset",
            "Add sensors and email/Slack failure notifications to a DAG",
          ],
          resources: [
            {
              title: "Apache Airflow Documentation",
              description: "Official Airflow docs for DAGs, operators, and deployment.",
              url: "https://airflow.apache.org/docs/",
              platform: "Apache Airflow",
              difficulty: "intermediate",
              is_free: true,
              resource_type: "documentation",
            },
            {
              title: "Airflow Tutorial",
              description: "Getting started tutorial for writing your first DAGs.",
              url: "https://airflow.apache.org/docs/apache-airflow/stable/tutorial/index.html",
              platform: "Apache Airflow",
              difficulty: "beginner",
              is_free: true,
              resource_type: "tutorial",
            },
          ],
        },
        {
          title: "Scheduling, monitoring, and error handling",
          description:
            "Retries, backfills, SLAs, idempotency, catching failed tasks, and making pipelines re-runnable.",
          why_it_matters:
            "Production data work is mostly operations: recovering safely from failures without duplicating facts.",
          project_ideas: [
            "Make a load idempotent using MERGE/UPSERT semantics and DAG retries",
            "Implement a backfill DAG for historical date partitions",
          ],
          resources: [
            {
              title: "Airflow Best Practices",
              description: "Official guidance for DAG design and operational patterns.",
              url: "https://airflow.apache.org/docs/apache-airflow/stable/best-practices.html",
              platform: "Apache Airflow",
              difficulty: "intermediate",
              is_free: true,
              resource_type: "documentation",
            },
            {
              title: "Astronomer Learn – Airflow",
              description: "Practical Airflow lessons and patterns.",
              url: "https://www.astronomer.io/docs/learn/",
              platform: "Astronomer",
              difficulty: "intermediate",
              is_free: true,
              resource_type: "tutorial",
            },
          ],
        },
      ],
    },
    {
      title: "Cloud Infrastructure",
      description:
        "Learn cloud storage, compute, managed data services, IAM, and security patterns on a major cloud (AWS-focused with transferable concepts).",
      why_it_matters:
        "Most modern data platforms run on cloud object storage and managed warehouses or compute engines.",
      topics: [
        {
          title: "Cloud storage and data services",
          description:
            "Object storage (S3), warehouses/query engines, and managed ingestion/transform services.",
          why_it_matters:
            "Landing zones, lake layers, and warehouse loads nearly always start with cloud object storage.",
          project_ideas: [
            "Land raw files in S3 with a date partition layout and query them with Athena or Spark",
            "Build a simple extract-to-S3-to-Postgres pipeline",
          ],
          resources: [
            {
              title: "Amazon S3 User Guide",
              description: "Official AWS documentation for S3 buckets, objects, and access.",
              url: "https://docs.aws.amazon.com/AmazonS3/latest/userguide/Welcome.html",
              platform: "AWS Docs",
              difficulty: "beginner",
              is_free: true,
              resource_type: "documentation",
            },
            {
              title: "Amazon Athena User Guide",
              description: "Serverless SQL over data in S3.",
              url: "https://docs.aws.amazon.com/athena/latest/ug/what-is.html",
              platform: "AWS Docs",
              difficulty: "intermediate",
              is_free: true,
              resource_type: "documentation",
            },
            {
              title: "AWS Glue Developer Guide",
              description: "Managed ETL and catalog services on AWS.",
              url: "https://docs.aws.amazon.com/glue/latest/dg/what-is-glue.html",
              platform: "AWS Docs",
              difficulty: "intermediate",
              is_free: true,
              resource_type: "documentation",
            },
          ],
        },
        {
          title: "Permissions, security, and cost awareness",
          description:
            "IAM least privilege, encryption basics, secrets handling, and watching data-platform spend.",
          why_it_matters:
            "Over-privileged roles and unbounded scans are common production failures in data teams.",
          project_ideas: [
            "Create an IAM policy that only allows read access to one raw prefix",
            "Estimate query cost before and after partition pruning",
          ],
          resources: [
            {
              title: "AWS IAM User Guide",
              description: "Identity and access management fundamentals on AWS.",
              url: "https://docs.aws.amazon.com/IAM/latest/UserGuide/introduction.html",
              platform: "AWS Docs",
              difficulty: "intermediate",
              is_free: true,
              resource_type: "documentation",
            },
            {
              title: "Google Cloud Storage Documentation",
              description: "Comparable object storage concepts on GCP.",
              url: "https://cloud.google.com/storage/docs",
              platform: "Google Cloud",
              difficulty: "beginner",
              is_free: true,
              resource_type: "documentation",
            },
          ],
        },
      ],
    },
    {
      title: "Advanced Concepts",
      description:
        "Lakehouse architecture, governance, performance tuning, scalable pipeline design, and observability.",
      why_it_matters:
        "Senior data engineers own platform reliability, cost, and trust—not only individual jobs.",
      topics: [
        {
          title: "Lakehouse and table formats",
          description:
            "Delta Lake / Iceberg concepts, ACID on object storage, time travel, and schema evolution.",
          why_it_matters:
            "Open table formats unify batch/streaming and warehouse-like reliability on lakes.",
          project_ideas: [
            "Build a medallion (bronze/silver/gold) pipeline with a table format",
            "Demonstrate time travel and schema evolution on a sample table",
          ],
          resources: [
            {
              title: "Delta Lake Documentation",
              description: "Official Delta Lake docs for lakehouse table semantics.",
              url: "https://docs.delta.io/latest/index.html",
              platform: "Delta Lake",
              difficulty: "advanced",
              is_free: true,
              resource_type: "documentation",
            },
            {
              title: "Apache Iceberg Documentation",
              description: "Open table format docs for large analytic tables.",
              url: "https://iceberg.apache.org/docs/latest/",
              platform: "Apache Iceberg",
              difficulty: "advanced",
              is_free: true,
              resource_type: "documentation",
            },
          ],
        },
        {
          title: "Governance, optimization, and observability",
          description:
            "Lineage, access controls, query/job tuning, metrics, logs, and alerting for pipelines.",
          why_it_matters:
            "Without governance and observability, scale turns into silent data incidents.",
          project_ideas: [
            "Add structured logging and success/failure metrics to a pipeline",
            "Create a runbook for a failed daily load including rollback steps",
          ],
          resources: [
            {
              title: "OpenLineage Documentation",
              description: "Open standard for data lineage collection.",
              url: "https://openlineage.io/docs/",
              platform: "OpenLineage",
              difficulty: "advanced",
              is_free: true,
              resource_type: "documentation",
            },
            {
              title: "Datadog Data Observability Concepts",
              description: "Vendor-neutral ideas for monitoring data pipelines and freshness.",
              url: "https://docs.datadoghq.com/data_jobs/",
              platform: "Datadog",
              difficulty: "advanced",
              is_free: true,
              resource_type: "documentation",
            },
          ],
        },
      ],
    },
    {
      title: "Real-World Projects",
      description:
        "Ship beginner through advanced portfolio projects that prove end-to-end data engineering skills.",
      why_it_matters:
        "Employers hire evidence. Projects that run, recover, and are explained well beat tool checklists.",
      topics: [
        {
          title: "Beginner and intermediate projects",
          description:
            "Build smaller pipelines that still demonstrate modeling, tests, and documentation.",
          why_it_matters:
            "Early projects cement SQL/Python habits and give you artifacts for interviews quickly.",
          project_ideas: [
            "Public API → Postgres warehouse with dbt marts and tests",
            "CSV/JSON lake landing zone with quality checks and Airflow scheduling",
          ],
          resources: [
            {
              title: "dbt Best Practices",
              description: "Project structure and testing guidance for analytics code.",
              url: "https://docs.getdbt.com/best-practices",
              platform: "dbt Docs",
              difficulty: "intermediate",
              is_free: true,
              resource_type: "documentation",
            },
            {
              title: "Awesome Public Datasets",
              description: "Curated public datasets for portfolio work.",
              url: "https://github.com/awesomedata/awesome-public-datasets",
              platform: "GitHub",
              difficulty: "beginner",
              is_free: true,
              resource_type: "repository",
            },
          ],
        },
        {
          title: "Advanced end-to-end and business projects",
          description:
            "Combine batch/streaming, cloud storage, orchestration, and BI-facing marts for a business scenario.",
          why_it_matters:
            "Capstone projects show you can own a domain problem, not just a single technology.",
          project_ideas: [
            "E-commerce clickstream: Kafka → Spark/Flink → lakehouse → dashboard metrics",
            "Finance-style SCD Type 2 dimensions with incremental loads and reconciliation reports",
          ],
          resources: [
            {
              title: "The Data Engineering Cookbook (GitHub)",
              description: "Community-maintained data engineering learning and project ideas.",
              url: "https://github.com/andkret/Cookbook",
              platform: "GitHub",
              difficulty: "intermediate",
              is_free: true,
              resource_type: "repository",
            },
            {
              title: "Airbyte Data Engineering Resources",
              description: "Practical articles on pipelines and modern data stack patterns.",
              url: "https://airbyte.com/data-engineering-resources",
              platform: "Airbyte",
              difficulty: "intermediate",
              is_free: true,
              resource_type: "article",
            },
          ],
        },
      ],
    },
    {
      title: "Career Preparation",
      description:
        "Prepare portfolio, GitHub presence, interview skills (SQL, coding, system design), and applications.",
      why_it_matters:
        "Skills alone are not enough—clear evidence and interview readiness turn learning into offers.",
      topics: [
        {
          title: "Portfolio and GitHub profile",
          description:
            "Polish READMEs, architecture diagrams, setup instructions, and a narrative for each project.",
          why_it_matters:
            "Recruiters and hiring managers often see your repos before they see you.",
          project_ideas: [
            "Write architecture + trade-off sections for your best pipeline project",
            "Record a short walkthrough video of a DAG and warehouse mart",
          ],
          resources: [
            {
              title: "GitHub Docs – Profiling your profile",
              description: "Official guidance for GitHub profile README and pinning repos.",
              url: "https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-github-profile",
              platform: "GitHub Docs",
              difficulty: "beginner",
              is_free: true,
              resource_type: "documentation",
            },
            {
              title: "How to Write a Good README",
              description: "Practical README structure advice from Make a README.",
              url: "https://www.makeareadme.com/",
              platform: "makeareadme.com",
              difficulty: "beginner",
              is_free: true,
              resource_type: "article",
            },
          ],
        },
        {
          title: "Interviews: SQL, coding, and system design",
          description:
            "Practice SQL drills, Python coding, and data pipeline/system design explanations.",
          why_it_matters:
            "Data engineering interviews stress correctness under constraints and clear architectural reasoning.",
          project_ideas: [
            "Timed SQL drills with window functions and tricky joins",
            "Whiteboard a batch + streaming order analytics platform and defend trade-offs",
          ],
          resources: [
            {
              title: "LeetCode Database Problems",
              description: "Popular SQL interview practice set.",
              url: "https://leetcode.com/problemset/database/",
              platform: "LeetCode",
              difficulty: "intermediate",
              is_free: true,
              resource_type: "exercise",
            },
            {
              title: "Designing Data-Intensive Applications (book site)",
              description: "Canonical systems thinking for storage, streams, and batch/stream designs.",
              url: "https://dataintensive.net/",
              platform: "dataintensive.net",
              difficulty: "advanced",
              is_free: false,
              resource_type: "book",
            },
            {
              title: "freeCodeCamp System Design Playlist",
              description: "Accessible system design explanations useful for data platforms too.",
              url: "https://www.youtube.com/@freecodecamp",
              platform: "YouTube",
              difficulty: "intermediate",
              is_free: true,
              resource_type: "video",
            },
          ],
        },
      ],
    },
  ],
};
