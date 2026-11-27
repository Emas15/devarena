import type { SeedRoadmap } from "../types";

export const cybersecurityEngineerRoadmap: SeedRoadmap = {
  slug: "cybersecurity-engineer",
  title: "Complete Cybersecurity Engineering Roadmap",
  role_name: "Cybersecurity Engineer",
  category: "Security",
  summary:
    "Build defensive security skills across networking, OS hardening, application security, cloud security, detection, and incident response.",
  overview: {
    whatTheyDo:
      "Cybersecurity engineers protect systems and data by designing controls, finding weaknesses, detecting threats, and helping organizations recover from incidents.",
    problemsSolved:
      "They reduce breach risk from misconfigurations, vulnerable software, weak identity controls, and slow detection/response.",
    typicalDay:
      "Reviewing architectures, hardening systems, analyzing alerts, validating remediations, writing detection rules, and advising engineering teams on secure design.",
    employers:
      "Enterprises, security consultancies, MSSPs, fintech, healthcare, government contractors, and product security teams.",
    fundamentalSkills: [
      "Networking",
      "Operating systems",
      "Identity & access",
      "Application security",
      "Cloud security",
      "Threat detection",
      "Incident response",
      "Scripting",
    ],
  },
  prerequisites: [
    {
      title: "IT or programming fundamentals",
      description: "Comfort with computers, networks, and preferably basic scripting.",
    },
    {
      title: "Ethical mindset",
      description: "Security skills must be practiced legally on systems you own or have permission to test.",
    },
  ],
  difficulty: "beginner",
  estimated_months: 10,
  stages: [
    {
      title: "Security foundations",
      description: "Learn core security principles, threat models, and cryptography basics.",
      why_it_matters: "Tools change; principles of confidentiality, integrity, and availability do not.",
      topics: [
        {
          title: "Security principles and threat modeling",
          description: "CIA triad, least privilege, defense in depth, and STRIDE-style threat modeling.",
          why_it_matters: "Good engineers reason about risk before buying tools.",
          project_ideas: [
            "Threat-model a simple web app and list mitigations",
            "Write a security design review checklist for PRs",
          ],
          resources: [
            {
              title: "NIST Cybersecurity Framework",
              url: "https://www.nist.gov/cyberframework",
              platform: "NIST",
              difficulty: "beginner",
              is_free: true,
              resource_type: "documentation",
            },
            {
              title: "OWASP Threat Modeling",
              url: "https://owasp.org/www-community/Threat_Modeling",
              platform: "OWASP",
              difficulty: "intermediate",
              is_free: true,
              resource_type: "documentation",
            },
          ],
        },
        {
          title: "Applied cryptography basics",
          description: "Hashing, symmetric/asymmetric crypto, TLS, and common misuse patterns.",
          why_it_matters: "Crypto misuse is a frequent root cause of security failures.",
          project_ideas: [
            "Inspect a site's TLS configuration and document findings",
            "Compare password hashing approaches and explain why unsalted hashes fail",
          ],
          resources: [
            {
              title: "Cryptography I (Stanford Online / Coursera landing via Dan Boneh materials)",
              url: "https://www.coursera.org/learn/crypto",
              platform: "Coursera",
              difficulty: "intermediate",
              is_free: false,
              resource_type: "course",
            },
            {
              title: "MDN – Transport Layer Security",
              url: "https://developer.mozilla.org/en-US/docs/Web/Security/Transport_Layer_Security",
              platform: "MDN",
              difficulty: "beginner",
              is_free: true,
              resource_type: "documentation",
            },
          ],
        },
      ],
    },
    {
      title: "Networking and operating systems for security",
      description: "Understand how packets, hosts, and identities actually work so you can defend them.",
      why_it_matters: "You cannot secure what you cannot explain.",
      topics: [
        {
          title: "TCP/IP and network security controls",
          description: "Ports, protocols, firewalls, proxies, VPNs, and packet analysis basics.",
          why_it_matters: "Network paths define attack surface and detection opportunities.",
          project_ideas: [
            "Capture and analyze HTTP/DNS traffic in a lab",
            "Configure host firewall rules for a least-privilege service profile",
          ],
          resources: [
            {
              title: "Wireshark User's Guide",
              url: "https://www.wireshark.org/docs/wsug_html/",
              platform: "Wireshark",
              difficulty: "intermediate",
              is_free: true,
              resource_type: "documentation",
            },
            {
              title: "Cloudflare Learning Center – Networking",
              url: "https://www.cloudflare.com/learning/network-layer/what-is-a-protocol/",
              platform: "Cloudflare",
              difficulty: "beginner",
              is_free: true,
              resource_type: "article",
            },
          ],
        },
        {
          title: "Linux/Windows hardening essentials",
          description: "Permissions, services, logging, patching, and secure baseline configurations.",
          why_it_matters: "Endpoint and server hardening stops many commodity attacks.",
          project_ideas: [
            "Harden a Linux VM against a CIS-inspired checklist",
            "Enable and review audit logs for privileged actions",
          ],
          resources: [
            {
              title: "CIS Benchmarks",
              url: "https://www.cisecurity.org/cis-benchmarks",
              platform: "CIS",
              difficulty: "intermediate",
              is_free: true,
              resource_type: "documentation",
            },
            {
              title: "Linux man-pages project",
              url: "https://www.kernel.org/doc/man-pages/",
              platform: "kernel.org",
              difficulty: "intermediate",
              is_free: true,
              resource_type: "documentation",
            },
          ],
        },
      ],
    },
    {
      title: "Application security",
      description: "Find and fix vulnerabilities in web and API applications.",
      why_it_matters: "Applications are a primary breach vector for modern organizations.",
      topics: [
        {
          title: "OWASP Top Ten and secure coding",
          description: "Injection, broken auth, SSRF, access control flaws, and secure defaults.",
          why_it_matters: "Most exploited bugs are known classes with known mitigations.",
          project_ideas: [
            "Fix intentionally vulnerable lab apps (legally, locally)",
            "Add security unit tests for authz checks",
          ],
          resources: [
            {
              title: "OWASP Top Ten",
              url: "https://owasp.org/www-project-top-ten/",
              platform: "OWASP",
              difficulty: "beginner",
              is_free: true,
              resource_type: "documentation",
            },
            {
              title: "OWASP Cheat Sheet Series",
              url: "https://cheatsheetseries.owasp.org/",
              platform: "OWASP",
              difficulty: "intermediate",
              is_free: true,
              resource_type: "documentation",
            },
            {
              title: "OWASP Web Security Testing Guide",
              url: "https://owasp.org/www-project-web-security-testing-guide/",
              platform: "OWASP",
              difficulty: "advanced",
              is_free: true,
              resource_type: "documentation",
            },
          ],
        },
        {
          title: "Secure SDLC and dependency risk",
          description: "SAST/DAST concepts, SCA, secrets detection, and security in CI.",
          why_it_matters: "Security engineers scale by improving the development process.",
          project_ideas: [
            "Add dependency scanning and secret scanning to a sample repo",
            "Write a secure code review guide for your stack",
          ],
          resources: [
            {
              title: "OWASP Software Component Verification Standard",
              url: "https://owasp.org/www-project-software-component-verification-standard/",
              platform: "OWASP",
              difficulty: "advanced",
              is_free: true,
              resource_type: "documentation",
            },
            {
              title: "GitHub Code Security Docs",
              url: "https://docs.github.com/en/code-security",
              platform: "GitHub Docs",
              difficulty: "intermediate",
              is_free: true,
              resource_type: "documentation",
            },
          ],
        },
      ],
    },
    {
      title: "Cloud and identity security",
      description: "Secure cloud estates and modern identity systems.",
      why_it_matters: "Identity and cloud misconfigurations dominate recent breach reports.",
      topics: [
        {
          title: "Cloud security posture",
          description: "IAM least privilege, public exposure, encryption, logging, and benchmark alignments.",
          why_it_matters: "Cloud engineers and security engineers share this battleground.",
          project_ideas: [
            "Audit a lab cloud account for public buckets and admin roles",
            "Enable cloud audit logs and alert on suspicious API calls",
          ],
          resources: [
            {
              title: "AWS Security Documentation",
              url: "https://docs.aws.amazon.com/security/",
              platform: "AWS Docs",
              difficulty: "intermediate",
              is_free: true,
              resource_type: "documentation",
            },
            {
              title: "CIS AWS Foundations Benchmark",
              url: "https://www.cisecurity.org/benchmark/amazon_web_services",
              platform: "CIS",
              difficulty: "advanced",
              is_free: true,
              resource_type: "documentation",
            },
          ],
        },
        {
          title: "Identity, SSO, and zero trust concepts",
          description: "MFA, federation, OAuth/OIDC risks, and device/user trust signals.",
          why_it_matters: "Stolen credentials remain one of the most effective attack methods.",
          project_ideas: [
            "Design an SSO + MFA architecture for a SaaS admin portal",
            "Review OAuth redirect URI pitfalls in a sample app",
          ],
          resources: [
            {
              title: "NIST SP 800-63 Digital Identity Guidelines",
              url: "https://pages.nist.gov/800-63-3/",
              platform: "NIST",
              difficulty: "advanced",
              is_free: true,
              resource_type: "documentation",
            },
            {
              title: "OAuth 2.0 Security Best Current Practice (RFC 9700)",
              url: "https://www.rfc-editor.org/rfc/rfc9700.html",
              platform: "IETF / RFC Editor",
              difficulty: "advanced",
              is_free: true,
              resource_type: "documentation",
            },
          ],
        },
      ],
    },
    {
      title: "Detection, response, and blue team practice",
      description: "Detect attacks, investigate alerts, and respond with clear playbooks.",
      why_it_matters: "Prevention fails; detection and response limit damage.",
      topics: [
        {
          title: "Logging, SIEM concepts, and detection engineering",
          description: "Telemetry sources, correlation, detections-as-code, and alert quality.",
          why_it_matters: "Security teams drown without high-signal detections.",
          project_ideas: [
            "Write detections for failed logins and impossible travel in a lab",
            "Build a small log pipeline from apps to a searchable store",
          ],
          resources: [
            {
              title: "Sigma Detection Rules",
              url: "https://github.com/SigmaHQ/sigma",
              platform: "GitHub",
              difficulty: "intermediate",
              is_free: true,
              resource_type: "repository",
            },
            {
              title: "MITRE ATT&CK",
              url: "https://attack.mitre.org/",
              platform: "MITRE",
              difficulty: "intermediate",
              is_free: true,
              resource_type: "documentation",
            },
          ],
        },
        {
          title: "Incident response basics",
          description: "Preparation, identification, containment, eradication, recovery, and lessons learned.",
          why_it_matters: "Incidents are when security engineering proves its value.",
          project_ideas: [
            "Write an IR playbook for ransomware-like symptoms in a lab",
            "Run a tabletop exercise and capture action items",
          ],
          resources: [
            {
              title: "NIST SP 800-61 Computer Security Incident Handling Guide",
              url: "https://csrc.nist.gov/pubs/sp/800/61/r2/final",
              platform: "NIST",
              difficulty: "intermediate",
              is_free: true,
              resource_type: "documentation",
            },
            {
              title: "SANS Incident Handler's Handbook (overview pages)",
              url: "https://www.sans.org/white-papers/",
              platform: "SANS",
              difficulty: "intermediate",
              is_free: true,
              resource_type: "article",
            },
          ],
        },
      ],
    },
    {
      title: "Projects and career preparation",
      description: "Build a security portfolio ethically and prepare for security engineering interviews.",
      why_it_matters: "Demonstrated labs, write-ups, and judgment matter more than tool name-dropping.",
      topics: [
        {
          title: "Home lab and portfolio write-ups",
          description: "Document legal labs, detections, hardening guides, and architecture reviews.",
          why_it_matters: "Hiring managers look for clear thinking and ethical practice.",
          project_ideas: [
            "Publish a hardened cloud lab architecture with detections",
            "Write a case study remediating OWASP issues in a demo app",
          ],
          resources: [
            {
              title: "OWASP Juice Shop",
              url: "https://owasp.org/www-project-juice-shop/",
              platform: "OWASP",
              difficulty: "beginner",
              is_free: true,
              resource_type: "repository",
            },
            {
              title: "Hack The Box Academy (legal labs)",
              url: "https://academy.hackthebox.com/",
              platform: "Hack The Box",
              difficulty: "intermediate",
              is_free: false,
              resource_type: "course",
            },
          ],
        },
        {
          title: "Interview and certification paths",
          description: "Scenario interviews, plus optional certs (Security+, cloud security, OSCP-adjacent paths) chosen carefully.",
          why_it_matters: "Security interviews test reasoning under realistic constraints.",
          project_ideas: [
            "Practice explaining a breach postmortem using MITRE ATT&CK",
            "Prepare a secure design review of a familiar system",
          ],
          resources: [
            {
              title: "CompTIA Security+ exam objectives (official)",
              url: "https://www.comptia.org/certifications/security",
              platform: "CompTIA",
              difficulty: "beginner",
              is_free: true,
              resource_type: "documentation",
            },
            {
              title: "freeCodeCamp Information Security",
              url: "https://www.freecodecamp.org/learn/information-security/",
              platform: "freeCodeCamp",
              difficulty: "beginner",
              is_free: true,
              resource_type: "course",
            },
          ],
        },
      ],
    },
  ],
};
