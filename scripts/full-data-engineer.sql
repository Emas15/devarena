do $$
declare
  rid uuid;
  sid uuid;
  tid uuid;
begin
  select id into rid from public.roadmaps where slug = 'data-engineer';
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
  values (rid, 1, 'Programming Fundamentals', 'Build the coding foundation every data engineer needs: Python, scripting, and version control with Git and GitHub.', 'Pipelines, transformations, and tooling are software. Strong fundamentals make every later stage faster and safer.')
  returning id into sid;

  insert into public.roadmap_topics (stage_id, topic_order, title, description, why_it_matters, project_ideas)
  values (sid, 1, 'Python for data work', 'Learn Python syntax, data structures, file I/O, virtual environments, and writing readable modules for data scripts.', 'Python is the default language for ETL scripts, Airflow DAGs, Spark jobs, and cloud SDKs in data engineering.', ARRAY['Write a CSV cleaner that validates columns and writes Parquet-like output as CSV/JSON', 'Build a CLI that downloads a public API payload and saves normalized records']::text[])
  returning id into tid;

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'Python 3 Official Tutorial', 'Official language tutorial covering core syntax and standard library basics.', 'https://docs.python.org/3/tutorial/', 'docs.python.org', 'beginner', true, 'documentation');

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'Python for Everybody (freeCodeCamp)', 'Beginner-friendly full course covering Python foundations.', 'https://www.freecodecamp.org/news/python-for-everybody/', 'freeCodeCamp', 'beginner', true, 'course');

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'freeCodeCamp Python YouTube Course', 'Long-form Python course suitable for absolute beginners.', 'https://www.youtube.com/watch?v=rfscVS0vtbw', 'YouTube', 'beginner', true, 'video');

  insert into public.roadmap_topics (stage_id, topic_order, title, description, why_it_matters, project_ideas)
  values (sid, 2, 'Git and GitHub', 'Version control workflows: commits, branches, pull requests, and collaborating on pipeline code.', 'Production data code lives in Git. Reviews, rollbacks, and CI all depend on solid version control habits.', ARRAY['Put your Python scripts in a GitHub repo with a clear README and .gitignore', 'Practice a feature-branch PR workflow on a small data utility']::text[])
  returning id into tid;

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'Git Documentation', 'Official Git reference and everyday commands.', 'https://git-scm.com/doc', 'git-scm.com', 'beginner', true, 'documentation');

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'GitHub Skills: Introduction to GitHub', 'Hands-on GitHub learning path for issues, PRs, and collaboration.', 'https://skills.github.com/', 'GitHub', 'beginner', true, 'course');

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'Pro Git Book', 'Free official Pro Git book for deeper understanding.', 'https://git-scm.com/book/en/v2', 'git-scm.com', 'intermediate', true, 'book');

  insert into public.roadmap_topics (stage_id, topic_order, title, description, why_it_matters, project_ideas)
  values (sid, 3, 'Scripting and Linux basics', 'Navigate the shell, pipe commands, schedule simple jobs, and manage files used by data workflows.', 'Most data platforms are Linux-based. Shell fluency speeds debugging, deployments, and local pipeline work.', ARRAY['Write a bash script that downloads files, validates sizes, and logs results', 'Create a Makefile or simple shell entrypoints for your Python ETL']::text[])
  returning id into tid;

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'GNU Bash Manual', 'Official Bash reference for scripting and interactive use.', 'https://www.gnu.org/software/bash/manual/', 'gnu.org', 'intermediate', true, 'documentation');

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'The Linux Command Line (free book)', 'Practical introduction to Linux command-line tools.', 'https://linuxcommand.org/tlcl.php', 'linuxcommand.org', 'beginner', true, 'book');

  insert into public.roadmap_stages (roadmap_id, stage_order, title, description, why_it_matters)
  values (rid, 2, 'SQL and Databases', 'Master SQL querying, joins, aggregations, window functions, and relational design with PostgreSQL.', 'SQL is the lingua franca of warehouses, lakehouses, and analytical transformations. Weak SQL blocks every later tool.')
  returning id into sid;

  insert into public.roadmap_topics (stage_id, topic_order, title, description, why_it_matters, project_ideas)
  values (sid, 1, 'SQL fundamentals and joins', 'SELECT, WHERE, GROUP BY, JOIN types, subqueries, and writing correct multi-table queries.', 'Almost every warehouse transformation and data check is expressed in SQL first.', ARRAY['Solve a set of join/aggregation exercises against a sample retail schema', 'Reproduce business metrics with documented grain and filters']::text[])
  returning id into tid;

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'PostgreSQL Tutorial', 'Official PostgreSQL documentation tutorial section.', 'https://www.postgresql.org/docs/current/tutorial.html', 'postgresql.org', 'beginner', true, 'documentation');

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'SQL Tutorial – Mode Analytics', 'Clear SQL lessons with interactive examples.', 'https://mode.com/sql-tutorial/', 'Mode', 'beginner', true, 'tutorial');

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'freeCodeCamp SQL Course', 'Full SQL course covering queries and relational concepts.', 'https://www.freecodecamp.org/news/learn-sql-course/', 'freeCodeCamp', 'beginner', true, 'course');

  insert into public.roadmap_topics (stage_id, topic_order, title, description, why_it_matters, project_ideas)
  values (sid, 2, 'Window functions and CTEs', 'RANK, ROW_NUMBER, LAG/LEAD, running totals, and readable CTE-based query design.', 'Window functions power ranking, sessionization, SCD helpers, and many warehouse marts.', ARRAY['Build cohort retention queries with window functions', 'Rewrite nested subqueries into CTEs and compare readability']::text[])
  returning id into tid;

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'PostgreSQL Window Functions', 'Official docs for window function syntax and framing.', 'https://www.postgresql.org/docs/current/tutorial-window.html', 'postgresql.org', 'intermediate', true, 'documentation');

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'Use The Index, Luke', 'Practical SQL performance and indexing guidance.', 'https://use-the-index-luke.com/', 'use-the-index-luke.com', 'intermediate', true, 'article');

  insert into public.roadmap_topics (stage_id, topic_order, title, description, why_it_matters, project_ideas)
  values (sid, 3, 'Relational design with PostgreSQL', 'Normalization basics, keys, constraints, indexes, and designing schemas for analytics and ops.', 'Bad schemas create pipeline complexity forever. Good keys and constraints protect data quality.', ARRAY['Design a PostgreSQL schema for an e-commerce domain with FKs and indexes', 'Load sample CSVs and enforce uniqueness/check constraints']::text[])
  returning id into tid;

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'PostgreSQL Documentation', 'Complete PostgreSQL reference for DDL, DML, and administration.', 'https://www.postgresql.org/docs/current/', 'postgresql.org', 'intermediate', true, 'documentation');

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'PostgreSQL Exercises', 'Interactive SQL practice against a sample database.', 'https://pgexercises.com/', 'pgexercises.com', 'beginner', true, 'exercise');

  insert into public.roadmap_stages (roadmap_id, stage_order, title, description, why_it_matters)
  values (rid, 3, 'Data Engineering Foundations', 'Learn data formats, ETL vs ELT, dimensional modeling, warehouses, lakes, and data quality practices.', 'These concepts are the mental model behind every pipeline and platform you will build.')
  returning id into sid;

  insert into public.roadmap_topics (stage_id, topic_order, title, description, why_it_matters, project_ideas)
  values (sid, 1, 'Data formats and storage', 'CSV, JSON, Avro, Parquet, compression, partitioning, and when columnar formats win.', 'Format and partition choices dominate cost and performance in lakes and Spark jobs.', ARRAY['Convert a large CSV dataset to Parquet with sensible partitions', 'Benchmark query times on row vs columnar layouts for the same dataset']::text[])
  returning id into tid;

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'Apache Parquet Documentation', 'Official Parquet format documentation.', 'https://parquet.apache.org/docs/', 'Apache Parquet', 'intermediate', true, 'documentation');

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'Apache Avro Specification', 'Schema-based binary serialization used heavily in streaming systems.', 'https://avro.apache.org/docs/current/', 'Apache Avro', 'intermediate', true, 'documentation');

  insert into public.roadmap_topics (stage_id, topic_order, title, description, why_it_matters, project_ideas)
  values (sid, 2, 'ETL, ELT, and data modeling', 'Batch load patterns, star schemas, facts/dimensions, SCD basics, and layered raw/staging/marts design.', 'Modeling decisions determine whether analysts trust tables and whether pipelines stay maintainable.', ARRAY['Design a star schema for orders, customers, and products', 'Implement an idempotent load from raw files into staging and mart tables']::text[])
  returning id into tid;

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'dbt Learn – Fundamentals', 'Modern ELT transformation concepts with dbt Core.', 'https://docs.getdbt.com/docs/introduction', 'dbt Docs', 'beginner', true, 'documentation');

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'Kimball Group – Dimensional Modeling Techniques', 'Classic dimensional modeling guidance used in warehouses.', 'https://www.kimballgroup.com/data-warehouse-business-intelligence-resources/kimball-techniques/dimensional-modeling-techniques/', 'Kimball Group', 'intermediate', true, 'article');

  insert into public.roadmap_topics (stage_id, topic_order, title, description, why_it_matters, project_ideas)
  values (sid, 3, 'Warehouses, lakes, and data quality', 'When to use warehouses vs lakes, quality checks, contracts, and documenting table ownership.', 'Untrusted data is unused data. Quality and ownership practices separate hobby pipelines from production platforms.', ARRAY['Add row-count, null-rate, and uniqueness checks to a warehouse load', 'Write a short data contract for a core fact table']::text[])
  returning id into tid;

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'Great Expectations Documentation', 'Open-source data quality and validation framework.', 'https://docs.greatexpectations.io/', 'Great Expectations', 'intermediate', true, 'documentation');

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'AWS Data Lakes and Analytics Overview', 'Cloud vendor overview of lake and analytics building blocks.', 'https://docs.aws.amazon.com/whitepapers/latest/building-data-lakes/building-data-lake-aws.html', 'AWS Docs', 'intermediate', true, 'documentation');

  insert into public.roadmap_stages (roadmap_id, stage_order, title, description, why_it_matters)
  values (rid, 4, 'Data Processing', 'Process large datasets with Apache Spark and learn streaming foundations with Apache Kafka.', 'When data outgrows a single database, distributed batch and streaming systems become required skills.')
  returning id into sid;

  insert into public.roadmap_topics (stage_id, topic_order, title, description, why_it_matters, project_ideas)
  values (sid, 1, 'Apache Spark and batch processing', 'DataFrames, transformations/actions, partitions, shuffles, joins, and reading Parquet at scale.', 'Spark remains a core engine for large-scale batch ETL and lakehouse processing.', ARRAY['Rewrite a pandas ETL as a PySpark job over multi-GB files', 'Use the Spark UI to explain and reduce shuffle-heavy stages']::text[])
  returning id into tid;

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'Apache Spark Documentation', 'Official Spark docs including SQL and DataFrame APIs.', 'https://spark.apache.org/docs/latest/', 'Apache Spark', 'intermediate', true, 'documentation');

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'PySpark Overview', 'Python API guide for Spark applications.', 'https://spark.apache.org/docs/latest/api/python/index.html', 'Apache Spark', 'intermediate', true, 'documentation');

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'Spark Tutorial (freeCodeCamp)', 'Accessible introduction to Spark concepts and usage.', 'https://www.freecodecamp.org/news/apache-spark-tutorial/', 'freeCodeCamp', 'beginner', true, 'article');

  insert into public.roadmap_topics (stage_id, topic_order, title, description, why_it_matters, project_ideas)
  values (sid, 2, 'Distributed computing concepts', 'Parallelism, fault tolerance, partitioning strategies, skew, and cost/performance trade-offs.', 'Without these concepts, Spark jobs are slow, expensive, and mysterious when they fail.', ARRAY['Experiment with repartition vs coalesce on a skewed dataset', 'Document shuffle sources in a join-heavy pipeline']::text[])
  returning id into tid;

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'Spark Programming Guide', 'Core Spark programming model and execution concepts.', 'https://spark.apache.org/docs/latest/rdd-programming-guide.html', 'Apache Spark', 'intermediate', true, 'documentation');

  insert into public.roadmap_topics (stage_id, topic_order, title, description, why_it_matters, project_ideas)
  values (sid, 3, 'Streaming fundamentals with Kafka', 'Topics, partitions, producers/consumers, consumer groups, and event-driven pipeline patterns.', 'Real-time and near-real-time products depend on durable event logs and streaming consumers.', ARRAY['Produce synthetic click events to Kafka and consume them into a table', 'Demonstrate consumer group rebalancing with multiple consumers']::text[])
  returning id into tid;

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'Apache Kafka Documentation', 'Official Kafka intro, APIs, and operations guides.', 'https://kafka.apache.org/documentation/', 'Apache Kafka', 'intermediate', true, 'documentation');

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'Kafka Introduction', 'High-level Kafka concepts and use cases.', 'https://kafka.apache.org/intro', 'Apache Kafka', 'beginner', true, 'documentation');

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'Confluent Kafka Tutorials', 'Hands-on Kafka tutorials from Confluent.', 'https://developer.confluent.io/tutorials/', 'Confluent', 'intermediate', true, 'tutorial');

  insert into public.roadmap_stages (roadmap_id, stage_order, title, description, why_it_matters)
  values (rid, 5, 'Workflow Orchestration', 'Schedule and monitor pipelines with Apache Airflow: DAGs, retries, sensors, and operational hygiene.', 'Unscheduled scripts do not make a platform. Orchestration turns jobs into reliable production workflows.')
  returning id into sid;

  insert into public.roadmap_topics (stage_id, topic_order, title, description, why_it_matters, project_ideas)
  values (sid, 1, 'Apache Airflow fundamentals', 'DAGs, operators, task dependencies, scheduling intervals, and local Airflow development.', 'Airflow is widely used to coordinate warehouse loads, Spark submits, and multi-step data workflows.', ARRAY['Create a daily Airflow DAG that extracts, loads, and validates a public dataset', 'Add sensors and email/Slack failure notifications to a DAG']::text[])
  returning id into tid;

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'Apache Airflow Documentation', 'Official Airflow docs for DAGs, operators, and deployment.', 'https://airflow.apache.org/docs/', 'Apache Airflow', 'intermediate', true, 'documentation');

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'Airflow Tutorial', 'Getting started tutorial for writing your first DAGs.', 'https://airflow.apache.org/docs/apache-airflow/stable/tutorial/index.html', 'Apache Airflow', 'beginner', true, 'tutorial');

  insert into public.roadmap_topics (stage_id, topic_order, title, description, why_it_matters, project_ideas)
  values (sid, 2, 'Scheduling, monitoring, and error handling', 'Retries, backfills, SLAs, idempotency, catching failed tasks, and making pipelines re-runnable.', 'Production data work is mostly operations: recovering safely from failures without duplicating facts.', ARRAY['Make a load idempotent using MERGE/UPSERT semantics and DAG retries', 'Implement a backfill DAG for historical date partitions']::text[])
  returning id into tid;

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'Airflow Best Practices', 'Official guidance for DAG design and operational patterns.', 'https://airflow.apache.org/docs/apache-airflow/stable/best-practices.html', 'Apache Airflow', 'intermediate', true, 'documentation');

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'Astronomer Learn – Airflow', 'Practical Airflow lessons and patterns.', 'https://www.astronomer.io/docs/learn/', 'Astronomer', 'intermediate', true, 'tutorial');

  insert into public.roadmap_stages (roadmap_id, stage_order, title, description, why_it_matters)
  values (rid, 6, 'Cloud Infrastructure', 'Learn cloud storage, compute, managed data services, IAM, and security patterns on a major cloud (AWS-focused with transferable concepts).', 'Most modern data platforms run on cloud object storage and managed warehouses or compute engines.')
  returning id into sid;

  insert into public.roadmap_topics (stage_id, topic_order, title, description, why_it_matters, project_ideas)
  values (sid, 1, 'Cloud storage and data services', 'Object storage (S3), warehouses/query engines, and managed ingestion/transform services.', 'Landing zones, lake layers, and warehouse loads nearly always start with cloud object storage.', ARRAY['Land raw files in S3 with a date partition layout and query them with Athena or Spark', 'Build a simple extract-to-S3-to-Postgres pipeline']::text[])
  returning id into tid;

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'Amazon S3 User Guide', 'Official AWS documentation for S3 buckets, objects, and access.', 'https://docs.aws.amazon.com/AmazonS3/latest/userguide/Welcome.html', 'AWS Docs', 'beginner', true, 'documentation');

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'Amazon Athena User Guide', 'Serverless SQL over data in S3.', 'https://docs.aws.amazon.com/athena/latest/ug/what-is.html', 'AWS Docs', 'intermediate', true, 'documentation');

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'AWS Glue Developer Guide', 'Managed ETL and catalog services on AWS.', 'https://docs.aws.amazon.com/glue/latest/dg/what-is-glue.html', 'AWS Docs', 'intermediate', true, 'documentation');

  insert into public.roadmap_topics (stage_id, topic_order, title, description, why_it_matters, project_ideas)
  values (sid, 2, 'Permissions, security, and cost awareness', 'IAM least privilege, encryption basics, secrets handling, and watching data-platform spend.', 'Over-privileged roles and unbounded scans are common production failures in data teams.', ARRAY['Create an IAM policy that only allows read access to one raw prefix', 'Estimate query cost before and after partition pruning']::text[])
  returning id into tid;

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'AWS IAM User Guide', 'Identity and access management fundamentals on AWS.', 'https://docs.aws.amazon.com/IAM/latest/UserGuide/introduction.html', 'AWS Docs', 'intermediate', true, 'documentation');

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'Google Cloud Storage Documentation', 'Comparable object storage concepts on GCP.', 'https://cloud.google.com/storage/docs', 'Google Cloud', 'beginner', true, 'documentation');

  insert into public.roadmap_stages (roadmap_id, stage_order, title, description, why_it_matters)
  values (rid, 7, 'Advanced Concepts', 'Lakehouse architecture, governance, performance tuning, scalable pipeline design, and observability.', 'Senior data engineers own platform reliability, cost, and trust—not only individual jobs.')
  returning id into sid;

  insert into public.roadmap_topics (stage_id, topic_order, title, description, why_it_matters, project_ideas)
  values (sid, 1, 'Lakehouse and table formats', 'Delta Lake / Iceberg concepts, ACID on object storage, time travel, and schema evolution.', 'Open table formats unify batch/streaming and warehouse-like reliability on lakes.', ARRAY['Build a medallion (bronze/silver/gold) pipeline with a table format', 'Demonstrate time travel and schema evolution on a sample table']::text[])
  returning id into tid;

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'Delta Lake Documentation', 'Official Delta Lake docs for lakehouse table semantics.', 'https://docs.delta.io/latest/index.html', 'Delta Lake', 'advanced', true, 'documentation');

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'Apache Iceberg Documentation', 'Open table format docs for large analytic tables.', 'https://iceberg.apache.org/docs/latest/', 'Apache Iceberg', 'advanced', true, 'documentation');

  insert into public.roadmap_topics (stage_id, topic_order, title, description, why_it_matters, project_ideas)
  values (sid, 2, 'Governance, optimization, and observability', 'Lineage, access controls, query/job tuning, metrics, logs, and alerting for pipelines.', 'Without governance and observability, scale turns into silent data incidents.', ARRAY['Add structured logging and success/failure metrics to a pipeline', 'Create a runbook for a failed daily load including rollback steps']::text[])
  returning id into tid;

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'OpenLineage Documentation', 'Open standard for data lineage collection.', 'https://openlineage.io/docs/', 'OpenLineage', 'advanced', true, 'documentation');

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'Datadog Data Observability Concepts', 'Vendor-neutral ideas for monitoring data pipelines and freshness.', 'https://docs.datadoghq.com/data_jobs/', 'Datadog', 'advanced', true, 'documentation');

  insert into public.roadmap_stages (roadmap_id, stage_order, title, description, why_it_matters)
  values (rid, 8, 'Real-World Projects', 'Ship beginner through advanced portfolio projects that prove end-to-end data engineering skills.', 'Employers hire evidence. Projects that run, recover, and are explained well beat tool checklists.')
  returning id into sid;

  insert into public.roadmap_topics (stage_id, topic_order, title, description, why_it_matters, project_ideas)
  values (sid, 1, 'Beginner and intermediate projects', 'Build smaller pipelines that still demonstrate modeling, tests, and documentation.', 'Early projects cement SQL/Python habits and give you artifacts for interviews quickly.', ARRAY['Public API → Postgres warehouse with dbt marts and tests', 'CSV/JSON lake landing zone with quality checks and Airflow scheduling']::text[])
  returning id into tid;

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'dbt Best Practices', 'Project structure and testing guidance for analytics code.', 'https://docs.getdbt.com/best-practices', 'dbt Docs', 'intermediate', true, 'documentation');

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'Awesome Public Datasets', 'Curated public datasets for portfolio work.', 'https://github.com/awesomedata/awesome-public-datasets', 'GitHub', 'beginner', true, 'repository');

  insert into public.roadmap_topics (stage_id, topic_order, title, description, why_it_matters, project_ideas)
  values (sid, 2, 'Advanced end-to-end and business projects', 'Combine batch/streaming, cloud storage, orchestration, and BI-facing marts for a business scenario.', 'Capstone projects show you can own a domain problem, not just a single technology.', ARRAY['E-commerce clickstream: Kafka → Spark/Flink → lakehouse → dashboard metrics', 'Finance-style SCD Type 2 dimensions with incremental loads and reconciliation reports']::text[])
  returning id into tid;

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'The Data Engineering Cookbook (GitHub)', 'Community-maintained data engineering learning and project ideas.', 'https://github.com/andkret/Cookbook', 'GitHub', 'intermediate', true, 'repository');

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'Airbyte Data Engineering Resources', 'Practical articles on pipelines and modern data stack patterns.', 'https://airbyte.com/data-engineering-resources', 'Airbyte', 'intermediate', true, 'article');

  insert into public.roadmap_stages (roadmap_id, stage_order, title, description, why_it_matters)
  values (rid, 9, 'Career Preparation', 'Prepare portfolio, GitHub presence, interview skills (SQL, coding, system design), and applications.', 'Skills alone are not enough—clear evidence and interview readiness turn learning into offers.')
  returning id into sid;

  insert into public.roadmap_topics (stage_id, topic_order, title, description, why_it_matters, project_ideas)
  values (sid, 1, 'Portfolio and GitHub profile', 'Polish READMEs, architecture diagrams, setup instructions, and a narrative for each project.', 'Recruiters and hiring managers often see your repos before they see you.', ARRAY['Write architecture + trade-off sections for your best pipeline project', 'Record a short walkthrough video of a DAG and warehouse mart']::text[])
  returning id into tid;

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'GitHub Docs – Profiling your profile', 'Official guidance for GitHub profile README and pinning repos.', 'https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-github-profile', 'GitHub Docs', 'beginner', true, 'documentation');

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'How to Write a Good README', 'Practical README structure advice from Make a README.', 'https://www.makeareadme.com/', 'makeareadme.com', 'beginner', true, 'article');

  insert into public.roadmap_topics (stage_id, topic_order, title, description, why_it_matters, project_ideas)
  values (sid, 2, 'Interviews: SQL, coding, and system design', 'Practice SQL drills, Python coding, and data pipeline/system design explanations.', 'Data engineering interviews stress correctness under constraints and clear architectural reasoning.', ARRAY['Timed SQL drills with window functions and tricky joins', 'Whiteboard a batch + streaming order analytics platform and defend trade-offs']::text[])
  returning id into tid;

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'LeetCode Database Problems', 'Popular SQL interview practice set.', 'https://leetcode.com/problemset/database/', 'LeetCode', 'intermediate', true, 'exercise');

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'Designing Data-Intensive Applications (book site)', 'Canonical systems thinking for storage, streams, and batch/stream designs.', 'https://dataintensive.net/', 'dataintensive.net', 'advanced', false, 'book');

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'freeCodeCamp System Design Playlist', 'Accessible system design explanations useful for data platforms too.', 'https://www.youtube.com/@freecodecamp', 'YouTube', 'intermediate', true, 'video');

end $$;