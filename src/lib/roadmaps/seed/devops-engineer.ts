import type { SeedRoadmap } from "../types";

export const devopsEngineerRoadmap: SeedRoadmap = {
  slug: "devops-engineer",
  title: "Complete DevOps Engineering Roadmap",
  role_name: "DevOps Engineer",
  category: "Cloud and Infrastructure",
  summary:
    "Learn Linux, CI/CD, containers, infrastructure as code, cloud operations, and reliability practices that ship software safely.",
  overview: {
    whatTheyDo:
      "DevOps engineers connect development and operations—automating builds, deployments, infrastructure, observability, and feedback loops so teams can release frequently with confidence.",
    problemsSolved:
      "They reduce manual releases, environment drift, long recovery times, and the wall between writing code and running it in production.",
    typicalDay:
      "Improving pipelines, reviewing Terraform/K8s changes, debugging failed deploys, hardening security defaults, and partnering with developers on operability.",
    employers:
      "Software companies, cloud-native startups, enterprises modernizing delivery, and managed service providers.",
    fundamentalSkills: [
      "Linux",
      "CI/CD",
      "Containers",
      "Kubernetes basics",
      "Infrastructure as code",
      "Cloud platforms",
      "Monitoring",
      "Scripting",
    ],
  },
  prerequisites: [
    {
      title: "Basic programming or scripting",
      description: "Ability to write simple scripts and read application code.",
    },
    {
      title: "Networking fundamentals",
      description: "IP, DNS, HTTP, and firewalls at a conceptual level help a lot.",
    },
  ],
  difficulty: "beginner",
  estimated_months: 9,
  stages: [
    {
      title: "Linux, networking, and scripting",
      description: "Operate systems from the shell and automate repetitive tasks.",
      why_it_matters: "Cloud VMs and containers still behave like Linux machines underneath.",
      topics: [
        {
          title: "Linux administration essentials",
          description: "Processes, permissions, systemd, networking tools, and log inspection.",
          why_it_matters: "Incident response often starts with SSH and logs.",
          project_ideas: [
            "Provision a Linux VM and harden SSH + firewall basics",
            "Write runbooks for common service failure symptoms",
          ],
          resources: [
            {
              title: "Linux Journey",
              url: "https://linuxjourney.com/",
              platform: "linuxjourney.com",
              difficulty: "beginner",
              is_free: true,
              resource_type: "course",
            },
            {
              title: "The Linux Command Line book",
              url: "https://linuxcommand.org/tlcl.php",
              platform: "linuxcommand.org",
              difficulty: "beginner",
              is_free: true,
              resource_type: "book",
            },
          ],
        },
        {
          title: "Bash and Python automation",
          description: "Script deployments, health checks, and glue between tools.",
          why_it_matters: "Automation is the core DevOps habit.",
          project_ideas: [
            "Script blue/green smoke checks after deploy",
            "Automate certificate expiry alerts",
          ],
          resources: [
            {
              title: "GNU Bash Manual",
              url: "https://www.gnu.org/software/bash/manual/",
              platform: "gnu.org",
              difficulty: "intermediate",
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
      ],
    },
    {
      title: "Version control and CI/CD",
      description: "Build automated pipelines that test and deliver software continuously.",
      why_it_matters: "Reliable delivery pipelines are the daily product of DevOps work.",
      topics: [
        {
          title: "Git workflows for teams",
          description: "Branching strategies, protected branches, code review, and release tags.",
          why_it_matters: "Delivery quality starts with how code enters the mainline.",
          project_ideas: [
            "Set up branch protection + required checks",
            "Document a trunk-based or GitHub Flow release process",
          ],
          resources: [
            {
              title: "Git Documentation",
              url: "https://git-scm.com/doc",
              platform: "git-scm.com",
              difficulty: "beginner",
              is_free: true,
              resource_type: "documentation",
            },
            {
              title: "GitHub Actions Documentation",
              url: "https://docs.github.com/en/actions",
              platform: "GitHub Docs",
              difficulty: "beginner",
              is_free: true,
              resource_type: "documentation",
            },
          ],
        },
        {
          title: "Continuous integration and delivery",
          description: "Build, test, artifact, deploy stages; secrets; environments; progressive delivery.",
          why_it_matters: "Manual releases do not scale and are risky.",
          project_ideas: [
            "Create a CI pipeline that builds, tests, and publishes a container image",
            "Add staging → production promotion with approvals",
          ],
          resources: [
            {
              title: "GitLab CI/CD Docs",
              url: "https://docs.gitlab.com/ee/ci/",
              platform: "GitLab",
              difficulty: "intermediate",
              is_free: true,
              resource_type: "documentation",
            },
            {
              title: "Continuous Delivery book site",
              url: "https://continuousdelivery.com/",
              platform: "continuousdelivery.com",
              difficulty: "intermediate",
              is_free: true,
              resource_type: "article",
            },
          ],
        },
      ],
    },
    {
      title: "Containers and orchestration",
      description: "Package apps with Docker and run them on Kubernetes.",
      why_it_matters: "Containers are the default deployment unit for modern services.",
      topics: [
        {
          title: "Docker fundamentals",
          description: "Images, layers, multi-stage builds, registries, and local compose stacks.",
          why_it_matters: "Consistent runtime environments eliminate works-on-my-machine failures.",
          project_ideas: [
            "Containerize a web API with a multi-stage Dockerfile",
            "Compose app + database + reverse proxy locally",
          ],
          resources: [
            {
              title: "Docker Docs – Get Started",
              url: "https://docs.docker.com/get-started/",
              platform: "Docker",
              difficulty: "beginner",
              is_free: true,
              resource_type: "documentation",
            },
            {
              title: "Dockerfile Best Practices",
              url: "https://docs.docker.com/develop/develop-images/dockerfile_best-practices/",
              platform: "Docker",
              difficulty: "intermediate",
              is_free: true,
              resource_type: "documentation",
            },
          ],
        },
        {
          title: "Kubernetes basics",
          description: "Pods, Deployments, Services, ConfigMaps/Secrets, and rolling updates.",
          why_it_matters: "Kubernetes is the common control plane for container workloads.",
          project_ideas: [
            "Deploy an app to a local cluster (kind/minikube) with health probes",
            "Perform a rolling update and a rollback",
          ],
          resources: [
            {
              title: "Kubernetes Documentation",
              url: "https://kubernetes.io/docs/home/",
              platform: "kubernetes.io",
              difficulty: "intermediate",
              is_free: true,
              resource_type: "documentation",
            },
            {
              title: "Kubernetes Basics Tutorial",
              url: "https://kubernetes.io/docs/tutorials/kubernetes-basics/",
              platform: "kubernetes.io",
              difficulty: "beginner",
              is_free: true,
              resource_type: "tutorial",
            },
          ],
        },
      ],
    },
    {
      title: "Infrastructure as code and cloud",
      description: "Provision reproducible infrastructure with Terraform and cloud services.",
      why_it_matters: "ClickOps drifts; IaC is reviewable, repeatable, and auditable.",
      topics: [
        {
          title: "Terraform and IaC workflows",
          description: "Providers, state, modules, plans/applies, and remote backends.",
          why_it_matters: "IaC is how modern teams manage cloud estates.",
          project_ideas: [
            "Terraform a VPC, subnet, and compute instance",
            "Split reusable modules for network and app tiers",
          ],
          resources: [
            {
              title: "Terraform Documentation",
              url: "https://developer.hashicorp.com/terraform/docs",
              platform: "HashiCorp",
              difficulty: "intermediate",
              is_free: true,
              resource_type: "documentation",
            },
            {
              title: "Terraform Tutorials",
              url: "https://developer.hashicorp.com/terraform/tutorials",
              platform: "HashiCorp",
              difficulty: "beginner",
              is_free: true,
              resource_type: "tutorial",
            },
          ],
        },
        {
          title: "Cloud platform foundations",
          description: "IAM, networking, compute, storage, and managed Kubernetes on one major cloud.",
          why_it_matters: "DevOps work is inseparable from cloud primitives.",
          project_ideas: [
            "Deploy a container app to a managed Kubernetes service",
            "Implement least-privilege IAM for a deploy role",
          ],
          resources: [
            {
              title: "AWS Well-Architected Framework",
              url: "https://docs.aws.amazon.com/wellarchitected/latest/framework/welcome.html",
              platform: "AWS Docs",
              difficulty: "intermediate",
              is_free: true,
              resource_type: "documentation",
            },
            {
              title: "Google Cloud Architecture Framework",
              url: "https://cloud.google.com/architecture/framework",
              platform: "Google Cloud",
              difficulty: "intermediate",
              is_free: true,
              resource_type: "documentation",
            },
          ],
        },
      ],
    },
    {
      title: "Observability, reliability, and security",
      description: "Monitor systems, respond to incidents, and bake in security defaults.",
      why_it_matters: "Shipping is incomplete without knowing production health.",
      topics: [
        {
          title: "Metrics, logs, and alerts",
          description: "Prometheus/Grafana-style metrics, log aggregation, SLOs, and actionable alerts.",
          why_it_matters: "Noisy or silent alerting both cause outages to last longer.",
          project_ideas: [
            "Define SLIs/SLOs for an API and wire alerts",
            "Build a Grafana dashboard for latency and error rate",
          ],
          resources: [
            {
              title: "Prometheus Documentation",
              url: "https://prometheus.io/docs/introduction/overview/",
              platform: "Prometheus",
              difficulty: "intermediate",
              is_free: true,
              resource_type: "documentation",
            },
            {
              title: "Grafana Documentation",
              url: "https://grafana.com/docs/",
              platform: "Grafana",
              difficulty: "intermediate",
              is_free: true,
              resource_type: "documentation",
            },
            {
              title: "Google SRE Book",
              url: "https://sre.google/sre-book/table-of-contents/",
              platform: "Google SRE",
              difficulty: "advanced",
              is_free: true,
              resource_type: "book",
            },
          ],
        },
        {
          title: "DevSecOps basics",
          description: "Secrets management, image scanning, policy as code, and supply-chain hygiene.",
          why_it_matters: "Security failures in the pipeline become production breaches.",
          project_ideas: [
            "Scan container images in CI and fail on critical CVEs",
            "Move secrets out of env files into a secrets manager",
          ],
          resources: [
            {
              title: "OWASP DevSecOps Guideline",
              url: "https://owasp.org/www-project-devsecops-guideline/",
              platform: "OWASP",
              difficulty: "intermediate",
              is_free: true,
              resource_type: "documentation",
            },
            {
              title: "CIS Benchmarks",
              url: "https://www.cisecurity.org/cis-benchmarks",
              platform: "CIS",
              difficulty: "advanced",
              is_free: true,
              resource_type: "documentation",
            },
          ],
        },
      ],
    },
    {
      title: "Projects and career preparation",
      description: "Build a delivery platform portfolio and prepare for DevOps interviews.",
      why_it_matters: "Employers hire demonstrated automation and operational judgment.",
      topics: [
        {
          title: "End-to-end delivery projects",
          description: "From git push to monitored production with IaC and rollback paths.",
          why_it_matters: "Capstone platforms show you can own the delivery lifecycle.",
          project_ideas: [
            "Full stack app with GitHub Actions, Terraform, Docker, K8s, and Grafana",
            "GitOps-style deploy using a pull-based controller",
          ],
          resources: [
            {
              title: "CNCF Landscape",
              url: "https://landscape.cncf.io/",
              platform: "CNCF",
              difficulty: "intermediate",
              is_free: true,
              resource_type: "documentation",
            },
            {
              title: "Argo CD Documentation",
              url: "https://argo-cd.readthedocs.io/",
              platform: "Argo CD",
              difficulty: "advanced",
              is_free: true,
              resource_type: "documentation",
            },
          ],
        },
        {
          title: "Interview prep",
          description: "Linux troubleshooting, CI/CD design, Kubernetes scenarios, and incident stories.",
          why_it_matters: "DevOps interviews are scenario-heavy and practical.",
          project_ideas: [
            "Write postmortems for two simulated outages",
            "Practice whiteboard: design a CI/CD system for microservices",
          ],
          resources: [
            {
              title: "Kubernetes Interview Topics (official concepts)",
              url: "https://kubernetes.io/docs/concepts/",
              platform: "kubernetes.io",
              difficulty: "intermediate",
              is_free: true,
              resource_type: "documentation",
            },
            {
              title: "freeCodeCamp DevOps / Docker courses",
              url: "https://www.youtube.com/@freecodecamp",
              platform: "YouTube",
              difficulty: "beginner",
              is_free: true,
              resource_type: "video",
            },
          ],
        },
      ],
    },
  ],
};
