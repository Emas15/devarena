do $$
declare
  rid uuid;
  sid uuid;
  tid uuid;
begin
  select id into rid from public.roadmaps where slug = 'cloud-engineer';
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
  values (rid, 1, 'Cloud fundamentals and core services', 'Learn shared responsibility, regions/AZs, and primary compute/storage/network building blocks.', 'Every architecture decision rests on these primitives.')
  returning id into sid;

  insert into public.roadmap_topics (stage_id, topic_order, title, description, why_it_matters, project_ideas)
  values (sid, 1, 'Cloud concepts and shared responsibility', 'IaaS/PaaS/SaaS, regions, availability zones, and account/organization models.', 'Misunderstanding responsibility boundaries causes security and reliability gaps.', ARRAY['Map a sample app to IaaS vs PaaS choices and justify trade-offs', 'Create an account structure diagram for prod/non-prod']::text[])
  returning id into tid;

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'AWS Cloud Essentials', '', 'https://aws.amazon.com/getting-started/cloud-essentials/', 'AWS', 'beginner', true, 'documentation');

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'Microsoft Azure Fundamentals Docs', '', 'https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/', 'Microsoft Learn', 'beginner', true, 'documentation');

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'Google Cloud Overview', '', 'https://cloud.google.com/docs/overview', 'Google Cloud', 'beginner', true, 'documentation');

  insert into public.roadmap_topics (stage_id, topic_order, title, description, why_it_matters, project_ideas)
  values (sid, 2, 'Compute, storage, and databases', 'VMs, managed containers, object storage, block storage, and managed databases.', 'Selecting the right service is half of cloud engineering.', ARRAY['Host a static site on object storage + CDN', 'Deploy an app VM with managed PostgreSQL']::text[])
  returning id into tid;

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'Amazon EC2 User Guide', '', 'https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/concepts.html', 'AWS Docs', 'beginner', true, 'documentation');

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'Amazon S3 User Guide', '', 'https://docs.aws.amazon.com/AmazonS3/latest/userguide/Welcome.html', 'AWS Docs', 'beginner', true, 'documentation');

  insert into public.roadmap_stages (roadmap_id, stage_order, title, description, why_it_matters)
  values (rid, 2, 'Networking and identity', 'Design VPCs/VNets, routing, load balancing, and least-privilege IAM.', 'Most cloud outages and breaches involve network or identity mistakes.')
  returning id into sid;

  insert into public.roadmap_topics (stage_id, topic_order, title, description, why_it_matters, project_ideas)
  values (sid, 1, 'Virtual networks, DNS, and load balancing', 'Subnets, route tables, NAT, security groups/NSGs, DNS, and L4/L7 load balancers.', 'Applications cannot be reliable or secure without sound network design.', ARRAY['Build a public/private subnet architecture with a bastion pattern', 'Front an app with a load balancer and health checks']::text[])
  returning id into tid;

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'Amazon VPC User Guide', '', 'https://docs.aws.amazon.com/vpc/latest/userguide/what-is-amazon-vpc.html', 'AWS Docs', 'intermediate', true, 'documentation');

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'Azure Virtual Network Docs', '', 'https://learn.microsoft.com/en-us/azure/virtual-network/', 'Microsoft Learn', 'intermediate', true, 'documentation');

  insert into public.roadmap_topics (stage_id, topic_order, title, description, why_it_matters, project_ideas)
  values (sid, 2, 'IAM and access management', 'Users/roles/policies, federation, service identities, and key management basics.', 'Identity is the primary security boundary in cloud.', ARRAY['Replace long-lived keys with role assumption', 'Write least-privilege policies for a deploy pipeline']::text[])
  returning id into tid;

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'AWS IAM User Guide', '', 'https://docs.aws.amazon.com/IAM/latest/UserGuide/introduction.html', 'AWS Docs', 'intermediate', true, 'documentation');

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'Google Cloud IAM Docs', '', 'https://cloud.google.com/iam/docs', 'Google Cloud', 'intermediate', true, 'documentation');

  insert into public.roadmap_stages (roadmap_id, stage_order, title, description, why_it_matters)
  values (rid, 3, 'Infrastructure as code', 'Provision and change cloud resources reproducibly with Terraform or cloud-native IaC.', 'Manual consoles do not scale and cannot be reviewed.')
  returning id into sid;

  insert into public.roadmap_topics (stage_id, topic_order, title, description, why_it_matters, project_ideas)
  values (sid, 1, 'Terraform for cloud provisioning', 'State, modules, workspaces/backends, and policy checks.', 'IaC is the standard interface for cloud engineering teams.', ARRAY['Terraform a three-tier network + compute stack', 'Split environment configs for staging and production']::text[])
  returning id into tid;

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'Terraform AWS Provider Docs', '', 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs', 'HashiCorp', 'intermediate', true, 'documentation');

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'Terraform Tutorials', '', 'https://developer.hashicorp.com/terraform/tutorials', 'HashiCorp', 'beginner', true, 'tutorial');

  insert into public.roadmap_topics (stage_id, topic_order, title, description, why_it_matters, project_ideas)
  values (sid, 2, 'Cloud-native IaC options', 'CloudFormation/Bicep/Pulumi overview and when each fits.', 'Enterprises often standardize on one IaC toolchain.', ARRAY['Recreate a small stack in a second IaC tool and compare DX', 'Add plan checks to CI for infrastructure PRs']::text[])
  returning id into tid;

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'AWS CloudFormation User Guide', '', 'https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/Welcome.html', 'AWS Docs', 'intermediate', true, 'documentation');

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'Pulumi Documentation', '', 'https://www.pulumi.com/docs/', 'Pulumi', 'intermediate', true, 'documentation');

  insert into public.roadmap_stages (roadmap_id, stage_order, title, description, why_it_matters)
  values (rid, 4, 'Containers, platform services, and automation', 'Run workloads on containers/serverless and automate operational tasks.', 'Modern cloud engineering often means platforms for developers, not only VMs.')
  returning id into sid;

  insert into public.roadmap_topics (stage_id, topic_order, title, description, why_it_matters, project_ideas)
  values (sid, 1, 'Containers on cloud', 'ECR/ACR/Artifact Registry, ECS/EKS/GKE/AKS basics, and serverless containers.', 'Application teams expect container platforms.', ARRAY['Deploy a containerized API to a managed container service', 'Add autoscaling and health checks']::text[])
  returning id into tid;

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'Amazon ECS Developer Guide', '', 'https://docs.aws.amazon.com/AmazonECS/latest/developerguide/Welcome.html', 'AWS Docs', 'intermediate', true, 'documentation');

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'Kubernetes Docs', '', 'https://kubernetes.io/docs/home/', 'kubernetes.io', 'intermediate', true, 'documentation');

  insert into public.roadmap_topics (stage_id, topic_order, title, description, why_it_matters, project_ideas)
  values (sid, 2, 'Serverless and event-driven cloud', 'Functions, queues, event buses, and managed workflow services.', 'Many cloud-native designs are event-driven and pay-per-use.', ARRAY['Build an image-processing pipeline with object storage events + functions', 'Implement async fan-out with a queue']::text[])
  returning id into tid;

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'AWS Lambda Developer Guide', '', 'https://docs.aws.amazon.com/lambda/latest/dg/welcome.html', 'AWS Docs', 'intermediate', true, 'documentation');

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'Google Cloud Functions Docs', '', 'https://cloud.google.com/functions/docs', 'Google Cloud', 'intermediate', true, 'documentation');

  insert into public.roadmap_stages (roadmap_id, stage_order, title, description, why_it_matters)
  values (rid, 5, 'Reliability, cost, and security operations', 'Operate cloud estates with monitoring, budgets, backups, and security baselines.', 'Cloud engineer success is measured in uptime, cost, and security posture.')
  returning id into sid;

  insert into public.roadmap_topics (stage_id, topic_order, title, description, why_it_matters, project_ideas)
  values (sid, 1, 'Observability and resilience', 'Metrics/logs/alarms, multi-AZ design, backups, and disaster recovery tiers.', 'Cloud does not make systems resilient by default.', ARRAY['Define RPO/RTO for a service and implement backups/restores', 'Create alarms for error rate and saturation']::text[])
  returning id into tid;

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'AWS Well-Architected Reliability Pillar', '', 'https://docs.aws.amazon.com/wellarchitected/latest/reliability-pillar/welcome.html', 'AWS Docs', 'intermediate', true, 'documentation');

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'Google SRE Book', '', 'https://sre.google/sre-book/table-of-contents/', 'Google SRE', 'advanced', true, 'book');

  insert into public.roadmap_topics (stage_id, topic_order, title, description, why_it_matters, project_ideas)
  values (sid, 2, 'Cost and security baselines', 'Tagging, budgets, rightsizing, encryption, CIS baselines, and GuardDuty-like detection.', 'Uncontrolled spend and weak baselines are common cloud failure modes.', ARRAY['Implement cost allocation tags and a monthly budget alert', 'Enable encryption defaults and config rules for public buckets']::text[])
  returning id into tid;

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'AWS Cost Management Docs', '', 'https://docs.aws.amazon.com/cost-management/', 'AWS Docs', 'intermediate', true, 'documentation');

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'CIS Amazon Web Services Foundations Benchmark', '', 'https://www.cisecurity.org/benchmark/amazon_web_services', 'CIS', 'advanced', true, 'documentation');

  insert into public.roadmap_stages (roadmap_id, stage_order, title, description, why_it_matters)
  values (rid, 6, 'Projects and career preparation', 'Build landing-zone style projects and prepare for cloud interviews/certifications.', 'Portfolios and clear architecture stories prove practical cloud judgment.')
  returning id into sid;

  insert into public.roadmap_topics (stage_id, topic_order, title, description, why_it_matters, project_ideas)
  values (sid, 1, 'Cloud portfolio architectures', 'Multi-tier apps, landing zones, and GitOps-friendly infrastructure repos.', 'Employers hire for end-to-end ownership of environments.', ARRAY['Terraform a multi-account-like structure with shared networking modules', 'Deploy a containerized app with HTTPS, autoscaling, and observability']::text[])
  returning id into tid;

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'AWS Architecture Center', '', 'https://aws.amazon.com/architecture/', 'AWS', 'intermediate', true, 'documentation');

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'Azure Architecture Center', '', 'https://learn.microsoft.com/en-us/azure/architecture/', 'Microsoft Learn', 'intermediate', true, 'documentation');

  insert into public.roadmap_topics (stage_id, topic_order, title, description, why_it_matters, project_ideas)
  values (sid, 2, 'Interview and certification prep', 'Scenario questions on networking/IAM and optional associate-level certifications.', 'Cloud interviews are heavily scenario and design based.', ARRAY['Practice designing a secure multi-tier web architecture on a whiteboard', 'Take a practice exam after finishing hands-on labs']::text[])
  returning id into tid;

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'AWS Certification', '', 'https://aws.amazon.com/certification/', 'AWS', 'intermediate', true, 'documentation');

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'freeCodeCamp AWS / Cloud courses', '', 'https://www.youtube.com/@freecodecamp', 'YouTube', 'beginner', true, 'video');

end $$;