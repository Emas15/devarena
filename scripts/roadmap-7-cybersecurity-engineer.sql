-- seed cybersecurity-engineer
delete from public.roadmap_resources where topic_id in (
  select t.id from public.roadmap_topics t
  join public.roadmap_stages s on s.id = t.stage_id
  join public.roadmaps rm on rm.id = s.roadmap_id
  where rm.slug = 'cybersecurity-engineer'
);
delete from public.roadmap_topics where stage_id in (
  select s.id from public.roadmap_stages s
  join public.roadmaps rm on rm.id = s.roadmap_id
  where rm.slug = 'cybersecurity-engineer'
);
delete from public.roadmap_stages where roadmap_id in (
  select id from public.roadmaps where slug = 'cybersecurity-engineer'
);
insert into public.roadmaps (slug, title, role_name, category, summary, overview, prerequisites, difficulty, estimated_months, is_published)
values (
  'cybersecurity-engineer',
  'Complete Cybersecurity Engineering Roadmap',
  'Cybersecurity Engineer',
  'Security',
  'Build defensive security skills across networking, OS hardening, application security, cloud security, detection, and incident response.',
  '{"whatTheyDo":"Cybersecurity engineers protect systems and data by designing controls, finding weaknesses, detecting threats, and helping organizations recover from incidents.","problemsSolved":"They reduce breach risk from misconfigurations, vulnerable software, weak identity controls, and slow detection/response.","typicalDay":"Reviewing architectures, hardening systems, analyzing alerts, validating remediations, writing detection rules, and advising engineering teams on secure design.","employers":"Enterprises, security consultancies, MSSPs, fintech, healthcare, government contractors, and product security teams.","fundamentalSkills":["Networking","Operating systems","Identity & access","Application security","Cloud security","Threat detection","Incident response","Scripting"]}'::jsonb,
  '[{"title":"IT or programming fundamentals","description":"Comfort with computers, networks, and preferably basic scripting."},{"title":"Ethical mindset","description":"Security skills must be practiced legally on systems you own or have permission to test."}]'::jsonb,
  'beginner',
  10,
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
  select id into rid from public.roadmaps where slug = 'cybersecurity-engineer';

  insert into public.roadmap_stages (roadmap_id, stage_order, title, description, why_it_matters)
  values (rid, 1, 'Security foundations', 'Learn core security principles, threat models, and cryptography basics.', 'Tools change; principles of confidentiality, integrity, and availability do not.')
  returning id into sid;

  insert into public.roadmap_topics (stage_id, topic_order, title, description, why_it_matters, project_ideas)
  values (sid, 1, 'Security principles and threat modeling', 'CIA triad, least privilege, defense in depth, and STRIDE-style threat modeling.', 'Good engineers reason about risk before buying tools.', '["Threat-model a simple web app and list mitigations","Write a security design review checklist for PRs"]'::text[])
  returning id into tid;

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'NIST Cybersecurity Framework', '', 'https://www.nist.gov/cyberframework', 'NIST', 'beginner', true, 'documentation');

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'OWASP Threat Modeling', '', 'https://owasp.org/www-community/Threat_Modeling', 'OWASP', 'intermediate', true, 'documentation');

  insert into public.roadmap_topics (stage_id, topic_order, title, description, why_it_matters, project_ideas)
  values (sid, 2, 'Applied cryptography basics', 'Hashing, symmetric/asymmetric crypto, TLS, and common misuse patterns.', 'Crypto misuse is a frequent root cause of security failures.', '["Inspect a site''s TLS configuration and document findings","Compare password hashing approaches and explain why unsalted hashes fail"]'::text[])
  returning id into tid;

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'Cryptography I (Stanford Online / Coursera landing via Dan Boneh materials)', '', 'https://www.coursera.org/learn/crypto', 'Coursera', 'intermediate', false, 'course');

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'MDN – Transport Layer Security', '', 'https://developer.mozilla.org/en-US/docs/Web/Security/Transport_Layer_Security', 'MDN', 'beginner', true, 'documentation');

  insert into public.roadmap_stages (roadmap_id, stage_order, title, description, why_it_matters)
  values (rid, 2, 'Networking and operating systems for security', 'Understand how packets, hosts, and identities actually work so you can defend them.', 'You cannot secure what you cannot explain.')
  returning id into sid;

  insert into public.roadmap_topics (stage_id, topic_order, title, description, why_it_matters, project_ideas)
  values (sid, 1, 'TCP/IP and network security controls', 'Ports, protocols, firewalls, proxies, VPNs, and packet analysis basics.', 'Network paths define attack surface and detection opportunities.', '["Capture and analyze HTTP/DNS traffic in a lab","Configure host firewall rules for a least-privilege service profile"]'::text[])
  returning id into tid;

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'Wireshark User''s Guide', '', 'https://www.wireshark.org/docs/wsug_html/', 'Wireshark', 'intermediate', true, 'documentation');

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'Cloudflare Learning Center – Networking', '', 'https://www.cloudflare.com/learning/network-layer/what-is-a-protocol/', 'Cloudflare', 'beginner', true, 'article');

  insert into public.roadmap_topics (stage_id, topic_order, title, description, why_it_matters, project_ideas)
  values (sid, 2, 'Linux/Windows hardening essentials', 'Permissions, services, logging, patching, and secure baseline configurations.', 'Endpoint and server hardening stops many commodity attacks.', '["Harden a Linux VM against a CIS-inspired checklist","Enable and review audit logs for privileged actions"]'::text[])
  returning id into tid;

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'CIS Benchmarks', '', 'https://www.cisecurity.org/cis-benchmarks', 'CIS', 'intermediate', true, 'documentation');

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'Linux man-pages project', '', 'https://www.kernel.org/doc/man-pages/', 'kernel.org', 'intermediate', true, 'documentation');

  insert into public.roadmap_stages (roadmap_id, stage_order, title, description, why_it_matters)
  values (rid, 3, 'Application security', 'Find and fix vulnerabilities in web and API applications.', 'Applications are a primary breach vector for modern organizations.')
  returning id into sid;

  insert into public.roadmap_topics (stage_id, topic_order, title, description, why_it_matters, project_ideas)
  values (sid, 1, 'OWASP Top Ten and secure coding', 'Injection, broken auth, SSRF, access control flaws, and secure defaults.', 'Most exploited bugs are known classes with known mitigations.', '["Fix intentionally vulnerable lab apps (legally, locally)","Add security unit tests for authz checks"]'::text[])
  returning id into tid;

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'OWASP Top Ten', '', 'https://owasp.org/www-project-top-ten/', 'OWASP', 'beginner', true, 'documentation');

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'OWASP Cheat Sheet Series', '', 'https://cheatsheetseries.owasp.org/', 'OWASP', 'intermediate', true, 'documentation');

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'OWASP Web Security Testing Guide', '', 'https://owasp.org/www-project-web-security-testing-guide/', 'OWASP', 'advanced', true, 'documentation');

  insert into public.roadmap_topics (stage_id, topic_order, title, description, why_it_matters, project_ideas)
  values (sid, 2, 'Secure SDLC and dependency risk', 'SAST/DAST concepts, SCA, secrets detection, and security in CI.', 'Security engineers scale by improving the development process.', '["Add dependency scanning and secret scanning to a sample repo","Write a secure code review guide for your stack"]'::text[])
  returning id into tid;

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'OWASP Software Component Verification Standard', '', 'https://owasp.org/www-project-software-component-verification-standard/', 'OWASP', 'advanced', true, 'documentation');

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'GitHub Code Security Docs', '', 'https://docs.github.com/en/code-security', 'GitHub Docs', 'intermediate', true, 'documentation');

  insert into public.roadmap_stages (roadmap_id, stage_order, title, description, why_it_matters)
  values (rid, 4, 'Cloud and identity security', 'Secure cloud estates and modern identity systems.', 'Identity and cloud misconfigurations dominate recent breach reports.')
  returning id into sid;

  insert into public.roadmap_topics (stage_id, topic_order, title, description, why_it_matters, project_ideas)
  values (sid, 1, 'Cloud security posture', 'IAM least privilege, public exposure, encryption, logging, and benchmark alignments.', 'Cloud engineers and security engineers share this battleground.', '["Audit a lab cloud account for public buckets and admin roles","Enable cloud audit logs and alert on suspicious API calls"]'::text[])
  returning id into tid;

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'AWS Security Documentation', '', 'https://docs.aws.amazon.com/security/', 'AWS Docs', 'intermediate', true, 'documentation');

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'CIS AWS Foundations Benchmark', '', 'https://www.cisecurity.org/benchmark/amazon_web_services', 'CIS', 'advanced', true, 'documentation');

  insert into public.roadmap_topics (stage_id, topic_order, title, description, why_it_matters, project_ideas)
  values (sid, 2, 'Identity, SSO, and zero trust concepts', 'MFA, federation, OAuth/OIDC risks, and device/user trust signals.', 'Stolen credentials remain one of the most effective attack methods.', '["Design an SSO + MFA architecture for a SaaS admin portal","Review OAuth redirect URI pitfalls in a sample app"]'::text[])
  returning id into tid;

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'NIST SP 800-63 Digital Identity Guidelines', '', 'https://pages.nist.gov/800-63-3/', 'NIST', 'advanced', true, 'documentation');

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'OAuth 2.0 Security Best Current Practice (RFC 9700)', '', 'https://www.rfc-editor.org/rfc/rfc9700.html', 'IETF / RFC Editor', 'advanced', true, 'documentation');

  insert into public.roadmap_stages (roadmap_id, stage_order, title, description, why_it_matters)
  values (rid, 5, 'Detection, response, and blue team practice', 'Detect attacks, investigate alerts, and respond with clear playbooks.', 'Prevention fails; detection and response limit damage.')
  returning id into sid;

  insert into public.roadmap_topics (stage_id, topic_order, title, description, why_it_matters, project_ideas)
  values (sid, 1, 'Logging, SIEM concepts, and detection engineering', 'Telemetry sources, correlation, detections-as-code, and alert quality.', 'Security teams drown without high-signal detections.', '["Write detections for failed logins and impossible travel in a lab","Build a small log pipeline from apps to a searchable store"]'::text[])
  returning id into tid;

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'Sigma Detection Rules', '', 'https://github.com/SigmaHQ/sigma', 'GitHub', 'intermediate', true, 'repository');

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'MITRE ATT&CK', '', 'https://attack.mitre.org/', 'MITRE', 'intermediate', true, 'documentation');

  insert into public.roadmap_topics (stage_id, topic_order, title, description, why_it_matters, project_ideas)
  values (sid, 2, 'Incident response basics', 'Preparation, identification, containment, eradication, recovery, and lessons learned.', 'Incidents are when security engineering proves its value.', '["Write an IR playbook for ransomware-like symptoms in a lab","Run a tabletop exercise and capture action items"]'::text[])
  returning id into tid;

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'NIST SP 800-61 Computer Security Incident Handling Guide', '', 'https://csrc.nist.gov/pubs/sp/800/61/r2/final', 'NIST', 'intermediate', true, 'documentation');

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'SANS Incident Handler''s Handbook (overview pages)', '', 'https://www.sans.org/white-papers/', 'SANS', 'intermediate', true, 'article');

  insert into public.roadmap_stages (roadmap_id, stage_order, title, description, why_it_matters)
  values (rid, 6, 'Projects and career preparation', 'Build a security portfolio ethically and prepare for security engineering interviews.', 'Demonstrated labs, write-ups, and judgment matter more than tool name-dropping.')
  returning id into sid;

  insert into public.roadmap_topics (stage_id, topic_order, title, description, why_it_matters, project_ideas)
  values (sid, 1, 'Home lab and portfolio write-ups', 'Document legal labs, detections, hardening guides, and architecture reviews.', 'Hiring managers look for clear thinking and ethical practice.', '["Publish a hardened cloud lab architecture with detections","Write a case study remediating OWASP issues in a demo app"]'::text[])
  returning id into tid;

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'OWASP Juice Shop', '', 'https://owasp.org/www-project-juice-shop/', 'OWASP', 'beginner', true, 'repository');

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'Hack The Box Academy (legal labs)', '', 'https://academy.hackthebox.com/', 'Hack The Box', 'intermediate', false, 'course');

  insert into public.roadmap_topics (stage_id, topic_order, title, description, why_it_matters, project_ideas)
  values (sid, 2, 'Interview and certification paths', 'Scenario interviews, plus optional certs (Security+, cloud security, OSCP-adjacent paths) chosen carefully.', 'Security interviews test reasoning under realistic constraints.', '["Practice explaining a breach postmortem using MITRE ATT&CK","Prepare a secure design review of a familiar system"]'::text[])
  returning id into tid;

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'CompTIA Security+ exam objectives (official)', '', 'https://www.comptia.org/certifications/security', 'CompTIA', 'beginner', true, 'documentation');

  insert into public.roadmap_resources (topic_id, title, description, url, platform, difficulty, is_free, resource_type)
  values (tid, 'freeCodeCamp Information Security', '', 'https://www.freecodecamp.org/learn/information-security/', 'freeCodeCamp', 'beginner', true, 'course');
end $$;