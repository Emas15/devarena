-- seed devops-engineer
delete from public.roadmap_resources where topic_id in (
  select t.id from public.roadmap_topics t
  join public.roadmap_stages s on s.id = t.stage_id
  join public.roadmaps rm on rm.id = s.roadmap_id
  where rm.slug = 'devops-engineer'
);
delete from public.roadmap_topics where stage_id in (
  select s.id from public.roadmap_stages s
  join public.roadmaps rm on rm.id = s.roadmap_id
  where rm.slug = 'devops-engineer'
);
delete from public.roadmap_stages where roadmap_id in (
  select id from public.roadmaps where slug = 'devops-engineer'
);
insert into public.roadmaps (slug, title, role_name, category, summary, overview, prerequisites, difficulty, estimated_months, is_published)
values (
  'devops-engineer',
  'Complete DevOps Engineering Roadmap',
  'DevOps Engineer',
  'Cloud and Infrastructure',
  'Learn Linux, CI/CD, containers, infrastructure as code, cloud operations, and reliability practices that ship software safely.',
  '{"whatTheyDo":"DevOps engineers connect development and operations—automating builds, deployments, infrastructure, observability, and feedback loops so teams can release frequently with confidence.","problemsSolved":"They reduce manual releases, environment drift, long recovery times, and the wall between writing code and running it in production.","typicalDay":"Improving pipelines, reviewing Terraform/K8s changes, debugging failed deploys, hardening security defaults, and partnering with developers on operability.","employers":"Software companies, cloud-native startups, enterprises modernizing delivery, and managed service providers.","fundamentalSkills":["Linux","CI/CD","Containers","Kubernetes basics","Infrastructure as code","Cloud platforms","Monitoring","Scripting"]}'::jsonb,
  '[{"title":"Basic programming or scripting","description":"Ability to write simple scripts and read application code."},{"title":"Networking fundamentals","description":"IP, DNS, HTTP, and firewalls at a conceptual level help a lot."}]'::jsonb,
  'beginner',
  9,
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
  select id into rid from public.roadmaps where slug = 'devops-engineer';

  insert into public.roadmap_stages (roadmap_id, stage_order, title, description, why_it_matters)
  values (rid, 1, 'Linux, networking, and scripting', 'Operate systems from the shell and automate repetitive tasks.', 'Cloud VMs and containers still behave like Linux machines underneath.')
  returning id into sid;

  insert into public.roadmap_topics (stage_id, topic_order, title, description, why_it_matters, project_ideas)
  values (sid, 1, 'Linux administration essentials', 'Processes, permissions, systemd, networking tools, and log inspection.', 'Incident response often starts with SSH and logs.', '["Provision a Linux VM and harden SSH + firewall basics","Write runbooks for common service failure symptoms"]'::text[])
  returning id into tid;

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'Linux Journey', '', 'https://linuxjourney.com/', 'linuxjourney.com', 'beginner', true, 'course');

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'The Linux Command Line book', '', 'https://linuxcommand.org/tlcl.php', 'linuxcommand.org', 'beginner', true, 'book');

  insert into public.roadmap_topics (stage_id, topic_order, title, description, why_it_matters, project_ideas)
  values (sid, 2, 'Bash and Python automation', 'Script deployments, health checks, and glue between tools.', 'Automation is the core DevOps habit.', '["Script blue/green smoke checks after deploy","Automate certificate expiry alerts"]'::text[])
  returning id into tid;

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'GNU Bash Manual', '', 'https://www.gnu.org/software/bash/manual/', 'gnu.org', 'intermediate', true, 'documentation');

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'Python Tutorial', '', 'https://docs.python.org/3/tutorial/', 'docs.python.org', 'beginner', true, 'documentation');

  insert into public.roadmap_stages (roadmap_id, stage_order, title, description, why_it_matters)
  values (rid, 2, 'Version control and CI/CD', 'Build automated pipelines that test and deliver software continuously.', 'Reliable delivery pipelines are the daily product of DevOps work.')
  returning id into sid;

  insert into public.roadmap_topics (stage_id, topic_order, title, description, why_it_matters, project_ideas)
  values (sid, 1, 'Git workflows for teams', 'Branching strategies, protected branches, code review, and release tags.', 'Delivery quality starts with how code enters the mainline.', '["Set up branch protection + required checks","Document a trunk-based or GitHub Flow release process"]'::text[])
  returning id into tid;

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'Git Documentation', '', 'https://git-scm.com/doc', 'git-scm.com', 'beginner', true, 'documentation');

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'GitHub Actions Documentation', '', 'https://docs.github.com/en/actions', 'GitHub Docs', 'beginner', true, 'documentation');

  insert into public.roadmap_topics (stage_id, topic_order, title, description, why_it_matters, project_ideas)
  values (sid, 2, 'Continuous integration and delivery', 'Build, test, artifact, deploy stages; secrets; environments; progressive delivery.', 'Manual releases do not scale and are risky.', '["Create a CI pipeline that builds, tests, and publishes a container image","Add staging → production promotion with approvals"]'::text[])
  returning id into tid;

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'GitLab CI/CD Docs', '', 'https://docs.gitlab.com/ee/ci/', 'GitLab', 'intermediate', true, 'documentation');

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'Continuous Delivery book site', '', 'https://continuousdelivery.com/', 'continuousdelivery.com', 'intermediate', true, 'article');

  insert into public.roadmap_stages (roadmap_id, stage_order, title, description, why_it_matters)
  values (rid, 3, 'Containers and orchestration', 'Package apps with Docker and run them on Kubernetes.', 'Containers are the default deployment unit for modern services.')
  returning id into sid;

  insert into public.roadmap_topics (stage_id, topic_order, title, description, why_it_matters, project_ideas)
  values (sid, 1, 'Docker fundamentals', 'Images, layers, multi-stage builds, registries, and local compose stacks.', 'Consistent runtime environments eliminate works-on-my-machine failures.', '["Containerize a web API with a multi-stage Dockerfile","Compose app + database + reverse proxy locally"]'::text[])
  returning id into tid;

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'Docker Docs – Get Started', '', 'https://docs.docker.com/get-started/', 'Docker', 'beginner', true, 'documentation');

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'Dockerfile Best Practices', '', 'https://docs.docker.com/develop/develop-images/dockerfile_best-practices/', 'Docker', 'intermediate', true, 'documentation');

  insert into public.roadmap_topics (stage_id, topic_order, title, description, why_it_matters, project_ideas)
  values (sid, 2, 'Kubernetes basics', 'Pods, Deployments, Services, ConfigMaps/Secrets, and rolling updates.', 'Kubernetes is the common control plane for container workloads.', '["Deploy an app to a local cluster (kind/minikube) with health probes","Perform a rolling update and a rollback"]'::text[])
  returning id into tid;

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'Kubernetes Documentation', '', 'https://kubernetes.io/docs/home/', 'kubernetes.io', 'intermediate', true, 'documentation');

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'Kubernetes Basics Tutorial', '', 'https://kubernetes.io/docs/tutorials/kubernetes-basics/', 'kubernetes.io', 'beginner', true, 'tutorial');

  insert into public.roadmap_stages (roadmap_id, stage_order, title, description, why_it_matters)
  values (rid, 4, 'Infrastructure as code and cloud', 'Provision reproducible infrastructure with Terraform and cloud services.', 'ClickOps drifts; IaC is reviewable, repeatable, and auditable.')
  returning id into sid;

  insert into public.roadmap_topics (stage_id, topic_order, title, description, why_it_matters, project_ideas)
  values (sid, 1, 'Terraform and IaC workflows', 'Providers, state, modules, plans/applies, and remote backends.', 'IaC is how modern teams manage cloud estates.', '["Terraform a VPC, subnet, and compute instance","Split reusable modules for network and app tiers"]'::text[])
  returning id into tid;

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'Terraform Documentation', '', 'https://developer.hashicorp.com/terraform/docs', 'HashiCorp', 'intermediate', true, 'documentation');

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'Terraform Tutorials', '', 'https://developer.hashicorp.com/terraform/tutorials', 'HashiCorp', 'beginner', true, 'tutorial');

  insert into public.roadmap_topics (stage_id, topic_order, title, description, why_it_matters, project_ideas)
  values (sid, 2, 'Cloud platform foundations', 'IAM, networking, compute, storage, and managed Kubernetes on one major cloud.', 'DevOps work is inseparable from cloud primitives.', '["Deploy a container app to a managed Kubernetes service","Implement least-privilege IAM for a deploy role"]'::text[])
  returning id into tid;

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'AWS Well-Architected Framework', '', 'https://docs.aws.amazon.com/wellarchitected/latest/framework/welcome.html', 'AWS Docs', 'intermediate', true, 'documentation');

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'Google Cloud Architecture Framework', '', 'https://cloud.google.com/architecture/framework', 'Google Cloud', 'intermediate', true, 'documentation');

  insert into public.roadmap_stages (roadmap_id, stage_order, title, description, why_it_matters)
  values (rid, 5, 'Observability, reliability, and security', 'Monitor systems, respond to incidents, and bake in security defaults.', 'Shipping is incomplete without knowing production health.')
  returning id into sid;

  insert into public.roadmap_topics (stage_id, topic_order, title, description, why_it_matters, project_ideas)
  values (sid, 1, 'Metrics, logs, and alerts', 'Prometheus/Grafana-style metrics, log aggregation, SLOs, and actionable alerts.', 'Noisy or silent alerting both cause outages to last longer.', '["Define SLIs/SLOs for an API and wire alerts","Build a Grafana dashboard for latency and error rate"]'::text[])
  returning id into tid;

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'Prometheus Documentation', '', 'https://prometheus.io/docs/introduction/overview/', 'Prometheus', 'intermediate', true, 'documentation');

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'Grafana Documentation', '', 'https://grafana.com/docs/', 'Grafana', 'intermediate', true, 'documentation');

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'Google SRE Book', '', 'https://sre.google/sre-book/table-of-contents/', 'Google SRE', 'advanced', true, 'book');

  insert into public.roadmap_topics (stage_id, topic_order, title, description, why_it_matters, project_ideas)
  values (sid, 2, 'DevSecOps basics', 'Secrets management, image scanning, policy as code, and supply-chain hygiene.', 'Security failures in the pipeline become production breaches.', '["Scan container images in CI and fail on critical CVEs","Move secrets out of env files into a secrets manager"]'::text[])
  returning id into tid;

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'OWASP DevSecOps Guideline', '', 'https://owasp.org/www-project-devsecops-guideline/', 'OWASP', 'intermediate', true, 'documentation');

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'CIS Benchmarks', '', 'https://www.cisecurity.org/cis-benchmarks', 'CIS', 'advanced', true, 'documentation');

  insert into public.roadmap_stages (roadmap_id, stage_order, title, description, why_it_matters)
  values (rid, 6, 'Projects and career preparation', 'Build a delivery platform portfolio and prepare for DevOps interviews.', 'Employers hire demonstrated automation and operational judgment.')
  returning id into sid;

  insert into public.roadmap_topics (stage_id, topic_order, title, description, why_it_matters, project_ideas)
  values (sid, 1, 'End-to-end delivery projects', 'From git push to monitored production with IaC and rollback paths.', 'Capstone platforms show you can own the delivery lifecycle.', '["Full stack app with GitHub Actions, Terraform, Docker, K8s, and Grafana","GitOps-style deploy using a pull-based controller"]'::text[])
  returning id into tid;

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'CNCF Landscape', '', 'https://landscape.cncf.io/', 'CNCF', 'intermediate', true, 'documentation');

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'Argo CD Documentation', '', 'https://argo-cd.readthedocs.io/', 'Argo CD', 'advanced', true, 'documentation');

  insert into public.roadmap_topics (stage_id, topic_order, title, description, why_it_matters, project_ideas)
  values (sid, 2, 'Interview prep', 'Linux troubleshooting, CI/CD design, Kubernetes scenarios, and incident stories.', 'DevOps interviews are scenario-heavy and practical.', '["Write postmortems for two simulated outages","Practice whiteboard: design a CI/CD system for microservices"]'::text[])
  returning id into tid;

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'Kubernetes Interview Topics (official concepts)', '', 'https://kubernetes.io/docs/concepts/', 'kubernetes.io', 'intermediate', true, 'documentation');

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'freeCodeCamp DevOps / Docker courses', '', 'https://www.youtube.com/@freecodecamp', 'YouTube', 'beginner', true, 'video');
end $$;