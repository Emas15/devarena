import type { SeedRoadmap } from "../types";

export const cloudEngineerRoadmap: SeedRoadmap = {
  slug: "cloud-engineer",
  title: "Complete Cloud Engineering Roadmap",
  role_name: "Cloud Engineer",
  category: "Cloud and Infrastructure",
  summary:
    "Master cloud networking, IAM, compute, storage, IaC, containers, and operational excellence across major cloud platforms.",
  overview: {
    whatTheyDo:
      "Cloud engineers design, build, and operate cloud infrastructure—networking, identity, compute, storage, and platform services that applications run on.",
    problemsSolved:
      "They solve insecure defaults, sprawling accounts, unreliable deployments, cost overruns, and environments that cannot be reproduced.",
    typicalDay:
      "Writing Terraform, reviewing IAM policies, designing VPC architectures, automating provisioning, and supporting application teams with cloud landing zones.",
    employers:
      "Enterprises migrating to cloud, SaaS companies, consultancies, and cloud center-of-excellence teams.",
    fundamentalSkills: [
      "Cloud networking",
      "IAM",
      "Compute & storage",
      "Infrastructure as code",
      "Containers",
      "Observability",
      "Cost management",
      "Security baselines",
    ],
  },
  prerequisites: [
    {
      title: "Operating systems and networking basics",
      description: "Comfort with Linux, IP addressing, DNS, and HTTP helps accelerate cloud learning.",
    },
    {
      title: "Scripting ability",
      description: "Bash or Python for automation and glue code.",
    },
  ],
  difficulty: "beginner",
  estimated_months: 9,
  stages: [
    {
      title: "Cloud fundamentals and core services",
      description: "Learn shared responsibility, regions/AZs, and primary compute/storage/network building blocks.",
      why_it_matters: "Every architecture decision rests on these primitives.",
      topics: [
        {
          title: "Cloud concepts and shared responsibility",
          description: "IaaS/PaaS/SaaS, regions, availability zones, and account/organization models.",
          why_it_matters: "Misunderstanding responsibility boundaries causes security and reliability gaps.",
          project_ideas: [
            "Map a sample app to IaaS vs PaaS choices and justify trade-offs",
            "Create an account structure diagram for prod/non-prod",
          ],
          resources: [
            {
              title: "AWS Cloud Essentials",
              url: "https://aws.amazon.com/getting-started/cloud-essentials/",
              platform: "AWS",
              difficulty: "beginner",
              is_free: true,
              resource_type: "documentation",
            },
            {
              title: "Microsoft Azure Fundamentals Docs",
              url: "https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/",
              platform: "Microsoft Learn",
              difficulty: "beginner",
              is_free: true,
              resource_type: "documentation",
            },
            {
              title: "Google Cloud Overview",
              url: "https://cloud.google.com/docs/overview",
              platform: "Google Cloud",
              difficulty: "beginner",
              is_free: true,
              resource_type: "documentation",
            },
          ],
        },
        {
          title: "Compute, storage, and databases",
          description: "VMs, managed containers, object storage, block storage, and managed databases.",
          why_it_matters: "Selecting the right service is half of cloud engineering.",
          project_ideas: [
            "Host a static site on object storage + CDN",
            "Deploy an app VM with managed PostgreSQL",
          ],
          resources: [
            {
              title: "Amazon EC2 User Guide",
              url: "https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/concepts.html",
              platform: "AWS Docs",
              difficulty: "beginner",
              is_free: true,
              resource_type: "documentation",
            },
            {
              title: "Amazon S3 User Guide",
              url: "https://docs.aws.amazon.com/AmazonS3/latest/userguide/Welcome.html",
              platform: "AWS Docs",
              difficulty: "beginner",
              is_free: true,
              resource_type: "documentation",
            },
          ],
        },
      ],
    },
    {
      title: "Networking and identity",
      description: "Design VPCs/VNets, routing, load balancing, and least-privilege IAM.",
      why_it_matters: "Most cloud outages and breaches involve network or identity mistakes.",
      topics: [
        {
          title: "Virtual networks, DNS, and load balancing",
          description: "Subnets, route tables, NAT, security groups/NSGs, DNS, and L4/L7 load balancers.",
          why_it_matters: "Applications cannot be reliable or secure without sound network design.",
          project_ideas: [
            "Build a public/private subnet architecture with a bastion pattern",
            "Front an app with a load balancer and health checks",
          ],
          resources: [
            {
              title: "Amazon VPC User Guide",
              url: "https://docs.aws.amazon.com/vpc/latest/userguide/what-is-amazon-vpc.html",
              platform: "AWS Docs",
              difficulty: "intermediate",
              is_free: true,
              resource_type: "documentation",
            },
            {
              title: "Azure Virtual Network Docs",
              url: "https://learn.microsoft.com/en-us/azure/virtual-network/",
              platform: "Microsoft Learn",
              difficulty: "intermediate",
              is_free: true,
              resource_type: "documentation",
            },
          ],
        },
        {
          title: "IAM and access management",
          description: "Users/roles/policies, federation, service identities, and key management basics.",
          why_it_matters: "Identity is the primary security boundary in cloud.",
          project_ideas: [
            "Replace long-lived keys with role assumption",
            "Write least-privilege policies for a deploy pipeline",
          ],
          resources: [
            {
              title: "AWS IAM User Guide",
              url: "https://docs.aws.amazon.com/IAM/latest/UserGuide/introduction.html",
              platform: "AWS Docs",
              difficulty: "intermediate",
              is_free: true,
              resource_type: "documentation",
            },
            {
              title: "Google Cloud IAM Docs",
              url: "https://cloud.google.com/iam/docs",
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
      title: "Infrastructure as code",
      description: "Provision and change cloud resources reproducibly with Terraform or cloud-native IaC.",
      why_it_matters: "Manual consoles do not scale and cannot be reviewed.",
      topics: [
        {
          title: "Terraform for cloud provisioning",
          description: "State, modules, workspaces/backends, and policy checks.",
          why_it_matters: "IaC is the standard interface for cloud engineering teams.",
          project_ideas: [
            "Terraform a three-tier network + compute stack",
            "Split environment configs for staging and production",
          ],
          resources: [
            {
              title: "Terraform AWS Provider Docs",
              url: "https://registry.terraform.io/providers/hashicorp/aws/latest/docs",
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
          title: "Cloud-native IaC options",
          description: "CloudFormation/Bicep/Pulumi overview and when each fits.",
          why_it_matters: "Enterprises often standardize on one IaC toolchain.",
          project_ideas: [
            "Recreate a small stack in a second IaC tool and compare DX",
            "Add plan checks to CI for infrastructure PRs",
          ],
          resources: [
            {
              title: "AWS CloudFormation User Guide",
              url: "https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/Welcome.html",
              platform: "AWS Docs",
              difficulty: "intermediate",
              is_free: true,
              resource_type: "documentation",
            },
            {
              title: "Pulumi Documentation",
              url: "https://www.pulumi.com/docs/",
              platform: "Pulumi",
              difficulty: "intermediate",
              is_free: true,
              resource_type: "documentation",
            },
          ],
        },
      ],
    },
    {
      title: "Containers, platform services, and automation",
      description: "Run workloads on containers/serverless and automate operational tasks.",
      why_it_matters: "Modern cloud engineering often means platforms for developers, not only VMs.",
      topics: [
        {
          title: "Containers on cloud",
          description: "ECR/ACR/Artifact Registry, ECS/EKS/GKE/AKS basics, and serverless containers.",
          why_it_matters: "Application teams expect container platforms.",
          project_ideas: [
            "Deploy a containerized API to a managed container service",
            "Add autoscaling and health checks",
          ],
          resources: [
            {
              title: "Amazon ECS Developer Guide",
              url: "https://docs.aws.amazon.com/AmazonECS/latest/developerguide/Welcome.html",
              platform: "AWS Docs",
              difficulty: "intermediate",
              is_free: true,
              resource_type: "documentation",
            },
            {
              title: "Kubernetes Docs",
              url: "https://kubernetes.io/docs/home/",
              platform: "kubernetes.io",
              difficulty: "intermediate",
              is_free: true,
              resource_type: "documentation",
            },
          ],
        },
        {
          title: "Serverless and event-driven cloud",
          description: "Functions, queues, event buses, and managed workflow services.",
          why_it_matters: "Many cloud-native designs are event-driven and pay-per-use.",
          project_ideas: [
            "Build an image-processing pipeline with object storage events + functions",
            "Implement async fan-out with a queue",
          ],
          resources: [
            {
              title: "AWS Lambda Developer Guide",
              url: "https://docs.aws.amazon.com/lambda/latest/dg/welcome.html",
              platform: "AWS Docs",
              difficulty: "intermediate",
              is_free: true,
              resource_type: "documentation",
            },
            {
              title: "Google Cloud Functions Docs",
              url: "https://cloud.google.com/functions/docs",
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
      title: "Reliability, cost, and security operations",
      description: "Operate cloud estates with monitoring, budgets, backups, and security baselines.",
      why_it_matters: "Cloud engineer success is measured in uptime, cost, and security posture.",
      topics: [
        {
          title: "Observability and resilience",
          description: "Metrics/logs/alarms, multi-AZ design, backups, and disaster recovery tiers.",
          why_it_matters: "Cloud does not make systems resilient by default.",
          project_ideas: [
            "Define RPO/RTO for a service and implement backups/restores",
            "Create alarms for error rate and saturation",
          ],
          resources: [
            {
              title: "AWS Well-Architected Reliability Pillar",
              url: "https://docs.aws.amazon.com/wellarchitected/latest/reliability-pillar/welcome.html",
              platform: "AWS Docs",
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
          title: "Cost and security baselines",
          description: "Tagging, budgets, rightsizing, encryption, CIS baselines, and GuardDuty-like detection.",
          why_it_matters: "Uncontrolled spend and weak baselines are common cloud failure modes.",
          project_ideas: [
            "Implement cost allocation tags and a monthly budget alert",
            "Enable encryption defaults and config rules for public buckets",
          ],
          resources: [
            {
              title: "AWS Cost Management Docs",
              url: "https://docs.aws.amazon.com/cost-management/",
              platform: "AWS Docs",
              difficulty: "intermediate",
              is_free: true,
              resource_type: "documentation",
            },
            {
              title: "CIS Amazon Web Services Foundations Benchmark",
              url: "https://www.cisecurity.org/benchmark/amazon_web_services",
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
      description: "Build landing-zone style projects and prepare for cloud interviews/certifications.",
      why_it_matters: "Portfolios and clear architecture stories prove practical cloud judgment.",
      topics: [
        {
          title: "Cloud portfolio architectures",
          description: "Multi-tier apps, landing zones, and GitOps-friendly infrastructure repos.",
          why_it_matters: "Employers hire for end-to-end ownership of environments.",
          project_ideas: [
            "Terraform a multi-account-like structure with shared networking modules",
            "Deploy a containerized app with HTTPS, autoscaling, and observability",
          ],
          resources: [
            {
              title: "AWS Architecture Center",
              url: "https://aws.amazon.com/architecture/",
              platform: "AWS",
              difficulty: "intermediate",
              is_free: true,
              resource_type: "documentation",
            },
            {
              title: "Azure Architecture Center",
              url: "https://learn.microsoft.com/en-us/azure/architecture/",
              platform: "Microsoft Learn",
              difficulty: "intermediate",
              is_free: true,
              resource_type: "documentation",
            },
          ],
        },
        {
          title: "Interview and certification prep",
          description: "Scenario questions on networking/IAM and optional associate-level certifications.",
          why_it_matters: "Cloud interviews are heavily scenario and design based.",
          project_ideas: [
            "Practice designing a secure multi-tier web architecture on a whiteboard",
            "Take a practice exam after finishing hands-on labs",
          ],
          resources: [
            {
              title: "AWS Certification",
              url: "https://aws.amazon.com/certification/",
              platform: "AWS",
              difficulty: "intermediate",
              is_free: true,
              resource_type: "documentation",
            },
            {
              title: "freeCodeCamp AWS / Cloud courses",
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
