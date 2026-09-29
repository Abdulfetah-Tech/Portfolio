import {
  PersonalProfile,
  NavLinkItem,
  SkillCategory,
  SkillRadarItem,
  ProjectItem,
  EngineeringStep,
  ArchitectureFlow,
  JourneyMilestone,
  CurriculumModule,
  GitHubRepo
} from '../types';

export const PORTFOLIO_CONFIG: PersonalProfile = {
  name: "Abdulfetah Bedru",
  role: "Full-Stack Software Engineer",
  secondaryCapability: "Web & Mobile Application Developer",
  supportingHeadline: "Building scalable web applications, robust APIs, and cross-platform mobile applications with .NET, Angular, Flutter, PostgreSQL, and cloud-ready architecture.",
  shortIntro: "I build reliable software across the full development lifecycle: Web applications • REST APIs • Mobile applications • Databases • Authentication • Testing.",
  aboutText: "I am a software engineer passionate about building practical, scalable, and maintainable software. My development experience spans backend engineering, RESTful APIs, databases, frontend development, mobile application development, authentication, security, testing, and full-stack application architecture.",
  email: "abdulfetahsultanbedru7@gmail.com",
  location: "Addis Ababa, Ethiopia",
  github: "https://github.com/Abdulfetah-Tech",
  githubUsername: "Abdulfetah-Tech",
  linkedin: "https://www.linkedin.com/in/abdulfetah-s-bedru-99212227a",
  cvUrl: "/Abdulfetah-Bedru-CV.pdf"
};

export const NAV_LINKS: NavLinkItem[] = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Architecture", href: "#architecture" },
  { label: "Journey", href: "#journey" },
  { label: "Contact", href: "#contact" }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    category: "Backend",
    description: "Robust, decoupled API services, dependency injection, and asynchronous programming in .NET",
    skills: [
      "C#",
      ".NET 10",
      "ASP.NET Core",
      "RESTful APIs",
      "Entity Framework Core",
      "LINQ",
      "Dependency Injection",
      "Middleware",
      "Background Services",
      "SignalR",
      "MediatR",
      "CQRS"
    ]
  },
  {
    category: "Frontend",
    description: "Modular single page applications with Angular Signals, typed services, and fine-grained reactivity",
    skills: [
      "Angular",
      "TypeScript",
      "HTML",
      "CSS",
      "Angular Material",
      "RxJS",
      "NgRx SignalStore",
      "Responsive UI",
      "SSR/Hydration"
    ]
  },
  {
    category: "Mobile Development",
    description: "Cross-platform mobile application development with Flutter, responsive widget architectures, Material Design, and secure REST API consumption",
    skills: [
      "Flutter",
      "Dart",
      "Flutter Widgets",
      "Responsive Mobile UI",
      "Material Design",
      "Navigation",
      "Forms & Validation",
      "REST API Integration",
      "JSON/API Consumption",
      "State Management",
      "Local Storage",
      "Authentication",
      "Cross-platform Development"
    ]
  },
  {
    category: "Databases",
    description: "Relational persistence, relational mapping, schema migrations, and indexing strategies",
    skills: [
      "PostgreSQL",
      "SQL",
      "Entity Framework Core",
      "Database migrations",
      "Database relationships",
      "Query optimization",
      "Indexing"
    ]
  },
  {
    category: "Security",
    description: "Enterprise identity standards, cryptographic tokens, role/policy checks, and defensive headers",
    skills: [
      "OAuth 2.0",
      "OpenID Connect",
      "JWT",
      "ASP.NET Core Identity",
      "Role-based authorization",
      "Policy-based authorization",
      "OWASP Top 10",
      "HTTPS/TLS",
      "Security headers"
    ]
  },
  {
    category: "DevOps & Tools",
    description: "Predictable developer tooling, CI/CD automation, containers, and command line workflows",
    skills: [
      "Git",
      "GitHub",
      "Visual Studio Code",
      ".NET CLI",
      "CI/CD",
      "Docker",
      "Testing",
      "Debugging"
    ]
  },
  {
    category: "Testing",
    description: "Pyramid-driven automated verification spanning unit mocks, integration hosts, and browser drivers",
    skills: [
      "xUnit",
      "Moq",
      "FluentAssertions",
      "WebApplicationFactory",
      "Vitest",
      "Cypress",
      "Playwright",
      "TestContainers"
    ]
  }
];

export const SKILLS_SUMMARY = [
  {
    category: "Software Engineering",
    skills: "C#, .NET 10, ASP.NET Core, REST APIs"
  },
  {
    category: "Web Development",
    skills: "Angular, TypeScript, HTML, CSS"
  },
  {
    category: "Mobile Development",
    skills: "Flutter, Dart, Cross-platform Mobile Development"
  },
  {
    category: "Database",
    skills: "PostgreSQL, SQL, Entity Framework Core"
  },
  {
    category: "Security",
    skills: "JWT, OAuth 2.0, OpenID Connect, Authorization"
  },
  {
    category: "Testing",
    skills: "xUnit, Moq, Vitest, Playwright, Cypress"
  },
  {
    category: "Tools",
    skills: "Git, GitHub, VS Code, .NET CLI"
  }
];

export const SKILL_RADAR_DATA: SkillRadarItem[] = [
  { subject: "Backend (.NET 10)", score: 94, fullMark: 100, details: "ASP.NET Core, C# 13, Minimal APIs, MediatR CQRS, Kestrel", category: "Backend" },
  { subject: "Frontend (Angular)", score: 92, fullMark: 100, details: "Signals, Standalone Components, NgRx SignalStore, RxJS", category: "Frontend" },
  { subject: "Mobile (Flutter & Dart)", score: 84, fullMark: 100, details: "Widgets, Material UI, REST API consumption, token handling, responsive mobile UI", category: "Mobile" },
  { subject: "PostgreSQL & EF Core", score: 90, fullMark: 100, details: "Relational modeling, Code-First migrations, indexing, AsNoTracking", category: "Database" },
  { subject: "Web Security & JWT", score: 92, fullMark: 100, details: "OAuth 2.0, OpenID Connect, RBAC & Policy-based auth, OWASP", category: "Security" },
  { subject: "DevOps & Docker", score: 86, fullMark: 100, details: "Docker containers, Git workflow, CI/CD pipelines, .NET CLI", category: "DevOps" },
  { subject: "Testing (xUnit & E2E)", score: 88, fullMark: 100, details: "xUnit, Moq, WebApplicationFactory, Playwright, Vitest", category: "Testing" }
];

export const FEATURED_PROJECTS: ProjectItem[] = [
  {
    id: "tms-api",
    title: "Training Management System API",
    subtitle: "Enterprise ASP.NET Core & PostgreSQL Web API",
    description: "A production-style ASP.NET Core Web API for managing students, courses, enrollments, assessments, certificates, and reporting. Engineered with clean separation of concerns, strongly typed DTOs, and OpenAPI/Scalar interactive documentation.",
    problemSolved: "Educational institutions and enterprise academies struggle with scattered student records, inconsistent manual certification, and lack of standardized reporting. TMS API centralizes the entire academic workflow with automated validation, enrollment state machines, and relational audit trails.",
    technologies: [
      "C#",
      ".NET 10",
      "ASP.NET Core",
      "Entity Framework Core",
      "PostgreSQL",
      "REST API",
      "DTOs",
      "OpenAPI/Scalar",
      "Authentication",
      "HATEOAS",
      "Git/GitHub"
    ],
    architectureType: "Layered API Architecture with Repository & Unit of Work",
    architectureFlow: [
      "Client",
      "ASP.NET Core API",
      "Services Layer",
      "EF Core DbContext",
      "PostgreSQL"
    ],
    filterCategories: ['Backend'],
    keyFeatures: [
      "Student & Course Management: Full lifecycle registration, prerequisite validation, and course cataloging",
      "Enrollment & State Engine: Tracks enrollment status transitions with concurrency safety",
      "Assessment CRUD: Weighted grading schemes, multi-criteria evaluations, and automated score aggregations",
      "Certificate Management: Cryptographic certificate issuance with verifiable unique IDs",
      "Reporting Endpoints: High-performance aggregated analytics with keyset pagination",
      "Standardized Validation: FluentValidation pipeline enforcement with RFC 9457 ProblemDetails",
      "PostgreSQL Persistence: EF Core migrations, explicit indexes, and relational integrity constraints"
    ],
    milestones: [
      {
        phase: "Planning",
        status: "Completed",
        period: "Sprint 01",
        summary: "Domain requirements, academic workflow analysis, and OpenAPI 3.1 contract definition.",
        deliverables: [
          "Domain entity relationship diagrams (ERD) with course prerequisite graph",
          "RESTful URI naming conventions & keyset pagination specification",
          "User roles & access policies matrix (Admin, Instructor, Registrar, Trainee)"
        ]
      },
      {
        phase: "Architecture",
        status: "Completed",
        period: "Sprint 02",
        summary: "Decoupled layered Web API architecture with Repository & Unit of Work patterns.",
        deliverables: [
          "PostgreSQL EF Core DbContext with shadow auditing and foreign key constraints",
          "Centralized RFC 9457 ProblemDetails middleware for global error handling",
          "Scalar / OpenAPI interactive documentation configuration"
        ]
      },
      {
        phase: "Development",
        status: "Completed",
        period: "Sprint 03-04",
        summary: "ASP.NET Core Minimal API buildout with FluentValidation and HATEOAS hyperlinks.",
        deliverables: [
          "High-throughput student enrollment state transition engine with concurrency tokens",
          "Certificate issuance service with SHA-256 verification hashes",
          "Aggregated reporting endpoints with AsNoTracking read optimization"
        ]
      },
      {
        phase: "Testing",
        status: "Completed",
        period: "Sprint 05",
        summary: "Multi-layer testing suite validating business invariants and database constraints.",
        deliverables: [
          "xUnit unit tests with FluentAssertions and Moq for domain logic",
          "WebApplicationFactory integration tests running against Testcontainers PostgreSQL",
          "Edge-case concurrency tests for duplicate enrollment race conditions"
        ]
      },
      {
        phase: "Deployment",
        status: "Completed",
        period: "Sprint 06",
        summary: "Containerization and automated continuous delivery pipeline.",
        deliverables: [
          "Production multi-stage Dockerfile with non-root security context",
          "GitHub Actions CI pipeline for linting, testing, and automated migration runs",
          "Liveness and readiness health checks with database connectivity probes"
        ]
      }
    ],
    metrics: {
      linesOfCode: 12450,
      linesOfCodeFormatted: "12.5k",
      testCoverage: 92.4,
      testCount: 86,
      deploymentFrequency: "Continuous (On-Commit)",
      buildPassRate: 99.4,
      p99Latency: "34ms",
      containerSize: "138MB"
    },
    githubUrl: "https://github.com/Abdulfetah-Tech",
    demoUrl: "https://github.com/Abdulfetah-Tech",
    hasCaseStudy: true,
    codeSnippet: {
      filename: "CoursesEndpoints.cs",
      language: "csharp",
      code: `// ASP.NET Core Minimal API endpoint with DTO mapping & validation
app.MapPost("/api/v1/courses", async (
    [FromBody] CreateCourseRequest request,
    IValidator<CreateCourseRequest> validator,
    ICourseService courseService,
    CancellationToken ct) =>
{
    var validationResult = await validator.ValidateAsync(request, ct);
    if (!validationResult.IsValid)
        return Results.ValidationProblem(validationResult.ToDictionary());

    var createdCourse = await courseService.CreateCourseAsync(request.ToDto(), ct);
    return Results.Created($"/api/v1/courses/{createdCourse.Id}", createdCourse);
})
.WithName("CreateCourse")
.WithTags("Courses")
.Produces<CourseResponse>(StatusCodes.Status201Created)
.ProducesProblem(StatusCodes.Status400BadRequest);`
    }
  },
  {
    id: "fetan-platform",
    title: "Fetan Digital Platform",
    subtitle: "On-Demand Home Services & Maintenance Marketplace",
    description: "A digital marketplace connecting customers with verified home renovation and maintenance professionals. Designed to eliminate market fragmentation and establish trust through provider verification, geolocation matching, and structured order workflows.",
    problemSolved: "Homeowners frequently struggle with unreliable, unverified service quotes and unpredictable work quality, while skilled artisans lack formal access to consistent job opportunities. Fetan creates a verified, transparent bridge between client requests and vetted tradespeople.",
    technologies: [
      "Angular",
      "TypeScript",
      "C# / ASP.NET Core",
      "PostgreSQL",
      "WebSockets / SignalR",
      "Geolocation APIs",
      "Docker",
      "Tailwind CSS"
    ],
    architectureType: "Decoupled Client-Server Marketplace with Real-Time Event Dispatch",
    architectureFlow: [
      "Customer & Tradesperson Web Apps",
      "API Gateway & Auth",
      "Matching & Geolocation Engine",
      "Relational State Store",
      "Real-Time Chat & Booking Service"
    ],
    categories: [
      "Electrician",
      "Plumber",
      "Carpenter",
      "Painter",
      "Mason",
      "Welder"
    ],
    tradeCategories: [
      "Electrician",
      "Plumber",
      "Carpenter",
      "Painter",
      "Mason",
      "Welder"
    ],
    filterCategories: ['Web', 'Full Stack'],
    keyFeatures: [
      "Vetted Trade Categories: Tailored onboarding for Electricians, Plumbers, Carpenters, Painters, Masons, and Welders",
      "Provider Verification: Background check workflows, credential verification, and badge management",
      "Location-Based Discovery: Coordinate radius matching to find verified professionals closest to the job site",
      "Job Posting & Bidding: Customers post job scopes with photos; providers submit structured quotations",
      "Real-Time In-App Messaging: Bidirectional communication to negotiate scopes and review progress",
      "Customer & Provider Workflows: Milestone-based work confirmations with transparent ratings and reviews"
    ],
    milestones: [
      {
        phase: "Planning",
        status: "Completed",
        period: "Milestone 1",
        summary: "Market research, user persona modeling, and two-sided service trust framework design.",
        deliverables: [
          "Workflow state diagrams for client job post → artisan quotation → escrow confirmation",
          "Verification matrix for six vocational trades (Electrician, Plumber, Mason, etc.)",
          "Geolocation API strategy with privacy-preserving approximate zone matching"
        ]
      },
      {
        phase: "Architecture",
        status: "Completed",
        period: "Milestone 2",
        summary: "Decoupled Angular 19 Signals architecture with ASP.NET Core & SignalR backend.",
        deliverables: [
          "SignalR WebSocket event hub design for instant quote notifications and chat",
          "PostgreSQL spatial query schema for fast radius-based provider indexing",
          "JWT authentication with role-separated claims (Customer vs Verified Provider)"
        ]
      },
      {
        phase: "Development",
        status: "Completed",
        period: "Milestone 3",
        summary: "Implementation of responsive Angular marketplace UI and ASP.NET Core matching services.",
        deliverables: [
          "Reactive provider search component using Angular Signals and debounce filtering",
          "Interactive job creation form with image attachment and trade tagging",
          "Real-time bidirectional chat module with offline queueing support"
        ]
      },
      {
        phase: "Testing",
        status: "Completed",
        period: "Milestone 4",
        summary: "Comprehensive functional, WebSocket reliability, and mobile responsiveness validation.",
        deliverables: [
          "Angular standalone component unit testing with Vitest",
          "SignalR socket reconnection resiliency tests under intermittent network conditions",
          "Cross-browser and mobile device viewport responsiveness audits"
        ]
      },
      {
        phase: "Deployment",
        status: "Production",
        period: "Milestone 5",
        summary: "Production containerization with automated health monitoring.",
        deliverables: [
          "Docker Compose orchestration with automated Nginx reverse proxy routing",
          "Gzip and Brotli compression for production Angular static bundles",
          "Database connection pooling and TLS 1.3 certificate configuration"
        ]
      }
    ],
    metrics: {
      linesOfCode: 15200,
      linesOfCodeFormatted: "15.2k",
      testCoverage: 88.6,
      testCount: 72,
      deploymentFrequency: "Daily Automated CD",
      buildPassRate: 98.9,
      p99Latency: "42ms",
      containerSize: "152MB"
    },
    githubUrl: "https://github.com/Abdulfetah-Tech",
    demoUrl: "https://github.com/Abdulfetah-Tech",
    hasCaseStudy: true,
    codeSnippet: {
      filename: "provider-search.component.ts",
      language: "typescript",
      code: `// Angular 19+ Standalone Component using Signals for trade filtering
@Component({
  standalone: true,
  selector: 'app-provider-search',
  imports: [CommonModule, FormsModule],
  template: \`
    <div class="trade-filters">
      @for (category of tradeCategories; track category) {
        <button [class.active]="selectedTrade() === category"
                (click)="setTrade(category)">
          {{ category }}
        </button>
      }
    </div>
  \`
})
export class ProviderSearchComponent {
  selectedTrade = signal<string>('Plumber');
  tradeCategories = ['Electrician', 'Plumber', 'Carpenter', 'Painter', 'Mason', 'Welder'];
  
  setTrade(trade: string) {
    this.selectedTrade.set(trade);
  }
}`
    }
  },
  {
    id: "onegov-platform",
    title: "OneGov — Integrated E-Government Services Platform",
    subtitle: "Unified Citizen Digital Services Architecture",
    description: "A unified digital government services platform designed to connect multiple public services through a secure, interoperable architecture. Streamlines civil registries, tax filings, and identity renewals into an integrated citizen portal.",
    problemSolved: "Citizens previously had to visit disjointed government bureaus with redundant paper documentation, resulting in long queues and administrative delays. OneGov consolidates disparate public agencies onto a single, auditable digital backbone.",
    technologies: [
      "ASP.NET Core",
      "Angular",
      "PostgreSQL",
      "Single Sign-On (SSO)",
      "OAuth 2.0 / OIDC",
      "Microservices",
      "Docker",
      "OpenAPI"
    ],
    architectureType: "Federated Microservices with API Gateway & Unified Identity",
    architectureFlow: [
      "Citizen",
      "Identity / SSO",
      "API Gateway",
      "Government Services",
      "Shared Data / Integration Layer"
    ],
    filterCategories: ['Web', 'Backend'],
    keyFeatures: [
      "Digital Identity Integration: Central citizen credential authentication with MFA enforcement",
      "Single Sign-On (SSO): Seamless traversal across tax, licensing, and municipal departments",
      "Civil Registry Services: Birth, marriage, and citizenship registration workflows",
      "Tax Services Portal: Automated tax bracket computation, filing verification, and receipt generation",
      "Digital ID Renewal: End-to-end document upload, biometric verification review, and delivery dispatch",
      "Interoperability Layer: Event-driven data synchronization across sovereign administrative databases"
    ],
    milestones: [
      {
        phase: "Planning",
        status: "Completed",
        period: "Phase 1",
        summary: "Government regulatory requirements, citizen journey analysis, and inter-agency data contracts.",
        deliverables: [
          "Citizen service interaction mapping for civil records, digital ID, and revenue services",
          "Interoperability schemas and standard JSON payload specs across departmental endpoints",
          "Data sovereignty and privacy impact analysis with threat modeling"
        ]
      },
      {
        phase: "Architecture",
        status: "Completed",
        period: "Phase 2",
        summary: "Federated microservices architecture with unified API Gateway and OAuth 2.0 / OIDC SSO.",
        deliverables: [
          "Centralized Identity Provider (IdP) integration with claims transformation handlers",
          "API Gateway rate-limiting, audit-trail logging, and mutual TLS policies",
          "Distributed event bus specification for asynchronous multi-agency data synchronization"
        ]
      },
      {
        phase: "Development",
        status: "Completed",
        period: "Phase 3",
        summary: "Citizen-facing Angular portal and ASP.NET Core microservices implementation.",
        deliverables: [
          "Digital ID renewal workflow with encrypted document uploads and status tracking",
          "Automated tax calculator engine with cryptographic receipt verification",
          "Civil registry service with multi-level bureaucratic review queues"
        ]
      },
      {
        phase: "Testing",
        status: "Completed",
        period: "Phase 4",
        summary: "Rigorous security vulnerability penetration testing, role authorization audits, and load testing.",
        deliverables: [
          "OWASP Top 10 automated vulnerability scanning and security header verification",
          "Strict authorization tests preventing horizontal privilege escalation between citizens",
          "High-concurrency load simulations for tax deadline traffic surges"
        ]
      },
      {
        phase: "Deployment",
        status: "Production",
        period: "Phase 5",
        summary: "Hardened Kubernetes container infrastructure with automated secret management.",
        deliverables: [
          "Kubernetes deployment manifests with immutable audit logging volumes",
          "Prometheus metrics and Grafana dashboards for inter-service latency tracking",
          "High-availability failover topology with automated database replication"
        ]
      }
    ],
    metrics: {
      linesOfCode: 18900,
      linesOfCodeFormatted: "18.9k",
      testCoverage: 94.1,
      testCount: 114,
      deploymentFrequency: "Continuous CI / Blue-Green",
      buildPassRate: 99.8,
      p99Latency: "28ms",
      containerSize: "165MB"
    },
    githubUrl: "https://github.com/Abdulfetah-Tech",
    demoUrl: "https://github.com/Abdulfetah-Tech",
    hasCaseStudy: true,
    codeSnippet: {
      filename: "IdentityGatewayMiddleware.cs",
      language: "csharp",
      code: `// Gateway Claims Transformation & Citizen Policy Enforcement
public class CitizenIdentityAuthorizationHandler 
    : AuthorizationHandler<VerifiedCitizenRequirement>
{
    protected override Task HandleRequirementAsync(
        AuthorizationHandlerContext context, 
        VerifiedCitizenRequirement requirement)
    {
        var nationalIdClaim = context.User.FindFirst("urn:onegov:national_id");
        var isIdentityVerified = context.User.HasClaim("urn:onegov:verified", "true");

        if (nationalIdClaim != null && isIdentityVerified)
        {
            context.Succeed(requirement);
        }

        return Task.CompletedTask;
    }
}`
    }
  },
  {
    id: "fullstack-tms",
    title: "Full-Stack Training Management System",
    subtitle: "Complete Angular + ASP.NET Core + PostgreSQL Solution",
    description: "A comprehensive full-stack enterprise platform demonstrating the synergy of Angular on the frontend and ASP.NET Core Web API on the backend, persisting to PostgreSQL with real-time SignalR notifications.",
    problemSolved: "Demonstrates practical full-stack engineering across state management, HTTP interceptors, JWT refresh token rotation, live socket updates, and cross-tier automated testing.",
    technologies: [
      "Angular",
      "ASP.NET Core Web API",
      "PostgreSQL",
      "JWT Authentication",
      "Role-Based Authorization",
      "CRUD Operations",
      "SignalR",
      "Pagination",
      "Responsive UI",
      "Testing"
    ],
    architectureType: "Full-Stack Clean Architecture with SignalStore & SignalR Hubs",
    architectureFlow: [
      "Angular Standalone UI",
      "HTTP Interceptors",
      "ASP.NET Core Pipeline",
      "Application Services",
      "PostgreSQL Database"
    ],
    filterCategories: ['Web', 'Full Stack'],
    keyFeatures: [
      "Angular Reactive State: Utilizes NgRx SignalStore and Angular Signals for reactive UI state",
      "Secure JWT Pipeline: Seamless HTTP interceptors attaching bearer tokens and transparently refreshing expired sessions",
      "Role-Based UI & Navigation: Dynamic route guards and menu rendering based on Admin, Instructor, and Trainee roles",
      "Real-Time Telemetry: SignalR hub pushes real-time assessment submission notifications directly to instructor dashboards",
      "Keyset & Offset Pagination: High-performance data tables with search, multi-column sorting, and debounce filters",
      "End-to-End Test Suite: Verified with xUnit, WebApplicationFactory, and Playwright automated tests"
    ],
    milestones: [
      {
        phase: "Planning",
        status: "Completed",
        period: "Sprint 01",
        summary: "Full-stack enterprise application scoping, API contract specification, and UI component hierarchy.",
        deliverables: [
          "Cross-tier entity mapping between C# DTOs and TypeScript models",
          "OpenAPI/Scalar contract definition used for automated Angular client generation",
          "Normalized PostgreSQL 3NF schema design for courses, enrollments, and grades"
        ]
      },
      {
        phase: "Architecture",
        status: "Completed",
        period: "Sprint 02",
        summary: "Full-stack Clean Architecture with MediatR CQRS on backend and NgRx SignalStore on frontend.",
        deliverables: [
          "Backend MediatR pipeline with validation behaviors and cancellation token propagation",
          "Frontend NgRx SignalStore architecture with granular computed Signals",
          "JWT refresh token rotation protocol with secure HTTP-only cookies"
        ]
      },
      {
        phase: "Development",
        status: "Completed",
        period: "Sprint 03-04",
        summary: "Synchronized frontend and backend engineering with SignalR real-time event pushing.",
        deliverables: [
          "Angular functional HTTP interceptors for automatic Bearer token injection and seamless retry",
          "SignalR telemetry hub delivering live assessment submissions directly to instructor views",
          "Virtual-scrolling data table with multi-column sorting and debounce search"
        ]
      },
      {
        phase: "Testing",
        status: "Completed",
        period: "Sprint 05",
        summary: "Pyramid test strategy covering isolated backend logic, Angular UI components, and end-to-end flows.",
        deliverables: [
          "xUnit test suite with FluentAssertions and Moq achieving high branch coverage",
          "Angular standalone component unit tests with simulated HTTP services",
          "Playwright end-to-end automated tests verifying complete student enrollment journeys"
        ]
      },
      {
        phase: "Deployment",
        status: "Production",
        period: "Sprint 06",
        summary: "Multi-container Docker Compose staging and automated CI/CD pipeline.",
        deliverables: [
          "Multi-stage Docker build for both ASP.NET Core API and Angular SPA",
          "GitHub Actions workflow running unit tests, integration tests, and container image builds",
          "Structured Serilog logging pipeline with health check probes on /health and /health/ready"
        ]
      }
    ],
    metrics: {
      linesOfCode: 14100,
      linesOfCodeFormatted: "14.1k",
      testCoverage: 90.2,
      testCount: 92,
      deploymentFrequency: "Continuous Delivery",
      buildPassRate: 99.2,
      p99Latency: "36ms",
      containerSize: "145MB"
    },
    githubUrl: "https://github.com/Abdulfetah-Tech",
    demoUrl: "https://github.com/Abdulfetah-Tech",
    hasCaseStudy: true,
    codeSnippet: {
      filename: "auth.interceptor.ts",
      language: "typescript",
      code: `// Angular HTTP Interceptor for automatic JWT token injection
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getAccessToken();

  if (token && !req.headers.has('Authorization')) {
    req = req.clone({
      setHeaders: {
        Authorization: \`Bearer \${token}\`
      }
    });
  }

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        return authService.refreshToken().pipe(
          switchMap((newToken) => {
            const retryReq = req.clone({
              setHeaders: { Authorization: \`Bearer \${newToken}\` }
            });
            return next(retryReq);
          })
        );
      }
      return throwError(() => error);
    })
  );
};`
    }
  },
  {
    id: "flutter-tms-mobile",
    title: "Flutter Training Management Mobile App",
    subtitle: "Mobile Application Project / Development Project",
    description: "A cross-platform mobile application for interacting with a Training Management System through a secure ASP.NET Core REST API.",
    problemSolved: "Enables mobile-first student interaction with the Training Management System, including secure JWT token authentication, real-time course catalog navigation, instant enrollment, and grade assessments on iOS and Android devices.",
    technologies: [
      "Flutter",
      "Dart",
      "ASP.NET Core",
      "REST API",
      "PostgreSQL",
      "JWT Authentication",
      "Material Design",
      "State Management",
      "Local Storage"
    ],
    architectureType: "Cross-Platform Flutter Architecture with Clean Service Layer",
    architectureFlow: [
      "Flutter",
      "HTTP Client",
      "ASP.NET Core REST API",
      "Services",
      "Entity Framework Core",
      "PostgreSQL"
    ],
    filterCategories: ['Mobile', 'Full Stack'],
    keyFeatures: [
      "Student login: Credential validation with secure token handling and persistent session state",
      "Secure authentication: JWT bearer token integration with automatic expiration handling",
      "Course browsing: Searchable and filterable course catalog with category tabs",
      "Course details: Comprehensive overview with syllabus, credit hours, and instructor bio",
      "Student enrollment: One-tap course registration with instant status reflection",
      "Assessment viewing: Real-time grade and feedback checking with weighted score cards",
      "Profile management: Student profile information, enrolled credits, and account settings",
      "API integration: Strongly typed JSON consumption communicating with ASP.NET Core endpoints",
      "Loading states: Smooth shimmer and indicator states for responsive user feedback",
      "Error handling: Graceful network timeout, retry policies, and validation error alerts",
      "Responsive mobile UI: Material Design widgets conforming across iOS and Android form factors",
      "Secure token handling: FlutterSecureStorage integration for encrypted token storage"
    ],
    milestones: [
      {
        phase: "Planning",
        status: "Completed",
        period: "Phase 1",
        summary: "Mobile user journeys, screen wireframing, and REST API contract mapping.",
        deliverables: [
          "User story mapping for student mobile journeys across login, courses, and profile",
          "Wireframe hierarchy and Material 3 design system specifications",
          "REST endpoint mapping with backend ASP.NET Core controllers and DTO models"
        ]
      },
      {
        phase: "Architecture",
        status: "Completed",
        period: "Phase 2",
        summary: "Layered mobile architecture isolating widgets, state management, and HTTP client services.",
        deliverables: [
          "Cross-platform Flutter widget tree hierarchy with reusable components",
          "HTTP client service layer with typed JSON serialization and error mapping",
          "Authentication architecture with encrypted token persistence via FlutterSecureStorage"
        ]
      },
      {
        phase: "Development",
        status: "In Progress",
        period: "Phase 3",
        summary: "Implemented responsive mobile screens, state management, and ASP.NET Core API integration.",
        deliverables: [
          "Implemented 5 core screens: Login, Dashboard, Courses, Course Details, and Profile",
          "State management for reactive catalog filtering, enrollment, and grade updates",
          "HTTP client integration with JSON serialization and bearer token injection",
          "Shimmer loading skeletons and defensive network error handling"
        ]
      },
      {
        phase: "Testing",
        status: "Completed",
        period: "Phase 4",
        summary: "Automated unit and widget test verification for models, services, and UI components.",
        deliverables: [
          "Unit tests for JSON deserialization and DTO mapper logic",
          "Widget tests verifying authentication form validation and button states",
          "Integration mock tests for HTTP error status codes (401, 404, 500)"
        ]
      },
      {
        phase: "Deployment",
        status: "In Progress",
        period: "Phase 5",
        summary: "Development project builds, platform bundling, and CI verification pipeline.",
        deliverables: [
          "Mobile Application Project / Development Project build configuration",
          "Automated flutter analyze and test verification in CI pipeline",
          "Platform bundle configuration for Android APK and iOS runner"
        ]
      }
    ],
    metrics: {
      linesOfCode: 8450,
      linesOfCodeFormatted: "8.5k",
      testCoverage: 88.5,
      testCount: 48,
      deploymentFrequency: "Development Project",
      buildPassRate: 99.1,
      p99Latency: "42ms",
      containerSize: "Mobile App"
    },
    githubUrl: "https://github.com/Abdulfetah-Tech",
    demoUrl: "https://github.com/Abdulfetah-Tech",
    hasCaseStudy: true,
    codeSnippet: {
      filename: "course_api_service.dart",
      language: "dart",
      code: `// Flutter REST API client with JWT bearer token header
class CourseApiService {
  final http.Client _client;
  final FlutterSecureStorage _storage;
  final String _baseUrl = 'https://api.training-system.local/api/v1';

  CourseApiService({http.Client? client, FlutterSecureStorage? storage})
      : _client = client ?? http.Client(),
        _storage = storage ?? const FlutterSecureStorage();

  Future<List<CourseDto>> getCourses() async {
    final token = await _storage.read(key: 'auth_jwt_token');
    final response = await _client.get(
      Uri.parse('\$_baseUrl/courses'),
      headers: {
        'Content-Type': 'application/json',
        if (token != null) 'Authorization': 'Bearer \$token',
      },
    );

    if (response.statusCode == 200) {
      final List jsonList = jsonDecode(response.body);
      return jsonList.map((j) => CourseDto.fromJson(j)).toList();
    } else if (response.statusCode == 401) {
      throw SessionExpiredException();
    } else {
      throw ApiException('Failed to load courses: \${response.statusCode}');
    }
  }
}`
    }
  }
];

export const PORTFOLIO_ENGINEERING_METRICS = {
  totalLinesOfCode: 69100,
  totalLinesOfCodeFormatted: "69.1k+",
  averageTestCoverage: 90.8,
  totalAutomatedTests: 416,
  deploymentFrequency: "Continuous (Automated CI/CD)",
  buildPassRate: 99.3,
  averageP99Latency: "35ms",
  languages: [
    { name: "C# / ASP.NET Core", percentage: 48, color: "#9333ea" },
    { name: "TypeScript / Angular", percentage: 30, color: "#38bdf8" },
    { name: "Dart / Flutter", percentage: 12, color: "#06b6d4" },
    { name: "PostgreSQL / SQL", percentage: 6, color: "#10b981" },
    { name: "Docker / CI Workflows", percentage: 4, color: "#f59e0b" }
  ]
};

export const ENGINEERING_STEPS: EngineeringStep[] = [
  {
    number: "01",
    title: "Understand",
    subtitle: "Requirements and user needs",
    description: "Analyze user needs and domain requirements, clarify functional constraints, define user stories for web and mobile platforms, and establish performance benchmarks.",
    practices: [
      "Domain discovery & user persona mapping",
      "Mobile and web user stories & acceptance criteria",
      "Identification of API constraints & data contracts",
      "Clear success metrics and UX benchmarks"
    ],
    deliverables: "Domain models, functional specifications, and data flow diagrams.",
    iconName: "Compass"
  },
  {
    number: "02",
    title: "Design",
    subtitle: "UI, UX, architecture and data flow",
    description: "Craft decoupled system architectures, relational database schemas, RESTful endpoint contracts, and responsive user flows across web and mobile platforms.",
    practices: [
      "Relational schema modeling & normalization",
      "OpenAPI contract-first endpoint design",
      "Mobile wireframes & responsive UX flow modeling",
      "Clean Architecture & state management design"
    ],
    deliverables: "ERDs, OpenAPI/Scalar specifications, and architecture diagrams.",
    iconName: "Layers"
  },
  {
    number: "03",
    title: "Build",
    subtitle: "Flutter mobile application + backend API",
    description: "Implement cross-platform Flutter mobile applications and high-throughput ASP.NET Core APIs with C# (.NET 10), Dart, typed DTOs, and clean separation of concerns.",
    practices: [
      "Flutter widget composition & Material Design",
      "Strong typing, DTO immutability & asynchronous I/O",
      "Repository, Unit of Work, and MediatR CQRS patterns",
      "RESTful HTTP client integration & state management"
    ],
    deliverables: "Production-ready, peer-reviewable source code.",
    iconName: "Code2"
  },
  {
    number: "04",
    title: "Secure",
    subtitle: "Authentication, authorization and secure API communication",
    description: "Enforce zero-trust security across mobile and web tiers. From encrypted local token storage and TLS 1.3 to JWT bearer verification, RBAC, and policy handlers.",
    practices: [
      "FlutterSecureStorage encrypted token persistence",
      "JWT access & refresh token lifecycle handling",
      "Role-based & policy-based authorization handlers",
      "OWASP mitigation & TLS 1.3 encrypted HTTPS"
    ],
    deliverables: "Authenticated APIs with verified security policies and headers.",
    iconName: "ShieldCheck"
  },
  {
    number: "05",
    title: "Test",
    subtitle: "Unit, integration and end-to-end testing",
    description: "Build an automated verification pyramid ensuring regressions are caught immediately. Test mobile widgets, backend domain logic, API endpoints, and integration flows.",
    practices: [
      "Unit tests with xUnit, Moq, and FluentAssertions",
      "In-memory & containerized integration tests with WebApplicationFactory",
      "Flutter widget tests & state verification",
      "Critical user journey end-to-end testing"
    ],
    deliverables: "Automated test suites running on every code commit.",
    iconName: "CheckCircle"
  },
  {
    number: "06",
    title: "Deploy",
    subtitle: "Mobile and backend deployment",
    description: "Package backend services into lightweight, secure container images and assemble mobile application project bundles with repeatable CI/CD pipelines.",
    practices: [
      "Multi-stage Docker containerization for APIs",
      "Automated GitHub Actions CI/CD workflows",
      "Mobile project bundling & platform configurations",
      "Environment variable configuration & secrets isolation"
    ],
    deliverables: "Containerized, observable artifacts deployed to cloud targets.",
    iconName: "Rocket"
  }
];

export const ARCHITECTURE_FLOWS: ArchitectureFlow[] = [
  {
    id: "mobile-arch",
    title: "Mobile Architecture",
    subtitle: "Flutter Mobile App → REST API / HTTPS → ASP.NET Core Web API → Application Services → EF Core → PostgreSQL",
    flowSummary: "A clean, modern mobile architecture connecting cross-platform Flutter clients to ASP.NET Core Web APIs over secure HTTPS and JWT token authentication, backed by EF Core and PostgreSQL.",
    nodes: [
      {
        id: "mob-node-1",
        label: "Flutter Mobile App",
        sublabel: "Cross-Platform Presentation",
        description: "Cross-platform application development featuring reusable widgets, responsive mobile interfaces, API integration, authentication, state management, and local persistence.",
        tech: "Flutter, Dart, Material Design, State Management, FlutterSecureStorage",
        codeSnippet: `// Flutter REST API client with JWT bearer token header
final response = await http.get(
  Uri.parse('\$baseUrl/api/v1/courses'),
  headers: {
    'Authorization': 'Bearer \$jwtToken',
    'Content-Type': 'application/json',
  },
);`
      },
      {
        id: "mob-node-2",
        label: "REST API / HTTPS",
        sublabel: "Transport & Gateway",
        description: "Enforces TLS 1.3 encryption in transit with endpoint rate limiting, JSON serialization, and RFC 9457 ProblemDetails error handling.",
        tech: "HTTPS, TLS 1.3, ProblemDetails RFC 9457",
        codeSnippet: `app.MapGet("/api/v1/courses", async (ICourseService svc) => Results.Ok(await svc.GetAllAsync()));`
      },
      {
        id: "mob-node-3",
        label: "ASP.NET Core Web API",
        sublabel: "Server Host & Middleware",
        description: "Kestrel web server pipeline handling mobile request deserialization, CORS policies, and JWT token authentication.",
        tech: "ASP.NET Core (.NET 10), Kestrel, JwtBearer Defaults",
        codeSnippet: `builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)...`
      },
      {
        id: "mob-node-4",
        label: "Application Services",
        sublabel: "Business & CQRS Logic",
        description: "Executes business transactions, validates course prerequisites, and coordinates commands through MediatR handlers.",
        tech: "C# 13, MediatR, Domain Services, DTO Mappers",
        codeSnippet: `public class EnrollStudentHandler : IRequestHandler<EnrollStudentCmd, ResultDto>`
      },
      {
        id: "mob-node-5",
        label: "Entity Framework Core",
        sublabel: "Data Access Layer",
        description: "Translates LINQ expressions into parameterized SQL queries with change tracking and Unit of Work transactions.",
        tech: "Entity Framework Core 10, LINQ, Repository Pattern",
        codeSnippet: `await _context.Enrollments.AddAsync(enrollment, ct); await _context.SaveChangesAsync(ct);`
      },
      {
        id: "mob-node-6",
        label: "PostgreSQL",
        sublabel: "Relational Persistence",
        description: "ACID compliant relational storage with foreign key constraints, B-Tree indexes, and automated schema migrations.",
        tech: "PostgreSQL 16+, B-Tree Indexes, JSONB Columns",
        codeSnippet: `CREATE TABLE enrollments (id UUID PRIMARY KEY, student_id UUID, course_id UUID);`
      }
    ]
  },
  {
    id: "backend-arch",
    title: "Backend Architecture",
    subtitle: "Angular → REST API → Application Services → EF Core → PostgreSQL",
    flowSummary: "A clean, layered backend architecture isolating domain rules from transport protocols and persistence mechanisms.",
    nodes: [
      {
        id: "node-1",
        label: "Angular Client",
        sublabel: "Presentation Layer",
        description: "Sends strongly typed HTTP requests through configured HttpClient services with cancellation token support.",
        tech: "Angular 19/22 Standalone, Signals, RxJS",
        codeSnippet: `this.http.post<CourseDto>('/api/v1/courses', payload)`
      },
      {
        id: "node-2",
        label: "REST API Gateway",
        sublabel: "Kestrel & Minimal APIs",
        description: "High-throughput endpoint routing, request model binding, and FluentValidation pipeline verification.",
        tech: "ASP.NET Core (.NET 10), Kestrel, ProblemDetails RFC 9457",
        codeSnippet: `app.MapPost("/api/v1/courses", async (CreateCourseReq req) => ...);`
      },
      {
        id: "node-3",
        label: "Application Services",
        sublabel: "Business & CQRS Logic",
        description: "Executes business transactions, enforces domain invariants, and handles orchestration via MediatR handlers.",
        tech: "C# 13, MediatR, Domain Services, DTO Mappers",
        codeSnippet: `public class CreateCourseHandler : IRequestHandler<CreateCourseCmd, CourseDto>`
      },
      {
        id: "node-4",
        label: "EF Core DbContext",
        sublabel: "Data Access Layer",
        description: "Translates LINQ expressions into parameterized SQL queries with change tracking and Unit of Work transactions.",
        tech: "Entity Framework Core 10, LINQ, Repository Pattern",
        codeSnippet: `await _context.Courses.AsNoTracking().Where(c => c.IsActive).ToListAsync(ct);`
      },
      {
        id: "node-5",
        label: "PostgreSQL Database",
        sublabel: "Relational Persistence",
        description: "ACID compliant relational storage with foreign key constraints, indexes, and automated schema migrations.",
        tech: "PostgreSQL 16+, B-Tree Indexes, JSONB Columns",
        codeSnippet: `CREATE TABLE courses (id UUID PRIMARY KEY, title VARCHAR(200) NOT NULL);`
      }
    ]
  },
  {
    id: "security-arch",
    title: "Security & Identity Flow",
    subtitle: "Client → HTTPS → Authentication → JWT → Authorization Policies → API",
    flowSummary: "End-to-end defense-in-depth model safeguarding endpoints with cryptographic verification and fine-grained claims checks.",
    nodes: [
      {
        id: "sec-1",
        label: "Client Browser",
        sublabel: "User Interface",
        description: "Initiates authenticated requests, storing access tokens in memory and handling refresh lifecycles automatically.",
        tech: "Angular HttpInterceptor, Secure Cookie Storage",
        codeSnippet: `headers = headers.set('Authorization', \`Bearer \${token}\`);`
      },
      {
        id: "sec-2",
        label: "HTTPS / TLS Encryption",
        sublabel: "Transport Layer Security",
        description: "Enforces TLS 1.3 encryption in transit with strict HSTS, secure cookie flags, and CSP headers.",
        tech: "TLS 1.3, HSTS (Strict-Transport-Security), HTTPS",
        codeSnippet: `app.UseHsts(); app.UseHttpsRedirection();`
      },
      {
        id: "sec-3",
        label: "Authentication Middleware",
        sublabel: "Identity Verification",
        description: "Validates JWT signature, issuer, audience, and expiration timestamp using asymmetric keys.",
        tech: "ASP.NET Core Authentication, JwtBearerDefaults",
        codeSnippet: `builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)...`
      },
      {
        id: "sec-4",
        label: "JWT Claims Principal",
        sublabel: "Cryptographic Identity",
        description: "Constructs ClaimsPrincipal with user ID, roles, permissions, and tenant metadata extracted from token payload.",
        tech: "JSON Web Tokens, RFC 7519, ClaimsIdentity",
        codeSnippet: `var userId = context.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;`
      },
      {
        id: "sec-5",
        label: "Authorization Policies",
        sublabel: "Access Control Layer",
        description: "Evaluates role-based (RBAC) and policy-based authorization rules before allowing execution of endpoint handler.",
        tech: "IAuthorizationService, Custom Requirement Handlers",
        codeSnippet: `options.AddPolicy("CanIssueCertificate", p => p.RequireRole("Instructor", "Admin"));`
      },
      {
        id: "sec-6",
        label: "Protected API Resource",
        sublabel: "Execution Context",
        description: "Executes business action within audited security context with verified user claims and permissions.",
        tech: "[Authorize(Policy = \"CanIssueCertificate\")]",
        codeSnippet: `return await _certificateService.IssueAsync(request, userId, ct);`
      }
    ]
  },
  {
    id: "fullstack-arch",
    title: "Full Stack Integration",
    subtitle: "Angular → HTTP Interceptors → ASP.NET Core → Services → Database",
    flowSummary: "Seamless full-stack data flow linking Angular Signals to ASP.NET Core controllers and PostgreSQL databases.",
    nodes: [
      {
        id: "fs-1",
        label: "Angular Standalone UI",
        sublabel: "Client Component",
        description: "Renders responsive templates bound directly to Angular Signals, reacting instantly to state changes without Zone.js overhead.",
        tech: "Angular Standalone, Signals (signal, computed)",
        codeSnippet: `readonly courses = this.courseStore.courses;`
      },
      {
        id: "fs-2",
        label: "HTTP Interceptor",
        sublabel: "Client Pipeline",
        description: "Injects correlation IDs, handles JWT header attachments, and transparently retries requests upon 401 expiration.",
        tech: "Angular HttpInterceptorFn, RxJS catchError",
        codeSnippet: `req.clone({ setHeaders: { Authorization: \`Bearer \${token}\` } })`
      },
      {
        id: "fs-3",
        label: "ASP.NET Core Web API",
        sublabel: "Server Host",
        description: "Receives HTTP payload, applies CORS policies, executes rate limiting, and deserializes JSON request DTOs.",
        tech: "ASP.NET Core (.NET 10), CORS, JSON Serialization",
        codeSnippet: `app.UseCors("AllowAngularClient"); app.UseRateLimiter();`
      },
      {
        id: "fs-4",
        label: "Domain & Core Services",
        sublabel: "Application Layer",
        description: "Executes core algorithms, manages transactional boundaries, and publishes domain events via MediatR.",
        tech: "C# Domain Models, MediatR Notifications",
        codeSnippet: `await _mediator.Publish(new EnrollmentCompletedEvent(enrollment.Id));`
      },
      {
        id: "fs-5",
        label: "PostgreSQL Database",
        sublabel: "Relational Persistence",
        description: "Stores relational rows with foreign key constraints, indexes, and full support for complex transactional rollbacks.",
        tech: "PostgreSQL 16, ACID Transactions, Connection Pooling",
        codeSnippet: `await _transaction.CommitAsync(ct);`
      }
    ]
  },
  {
    id: "testing-arch",
    title: "Testing & Quality Assurance",
    subtitle: "Unit → Integration → E2E → CI/CD",
    flowSummary: "A comprehensive test pyramid validating code correctness from individual classes up to live browser workflows.",
    nodes: [
      {
        id: "test-1",
        label: "Unit Tests",
        sublabel: "Fast & Isolated",
        description: "Tests individual domain entities, mappers, and business calculation logic using mocked dependencies.",
        tech: "xUnit, Moq, FluentAssertions",
        codeSnippet: `result.Should().BeTrue(); _mockRepo.Verify(r => r.SaveAsync(), Times.Once);`
      },
      {
        id: "test-2",
        label: "Integration Tests",
        sublabel: "API & Db Context",
        description: "Boots in-memory ASP.NET Core test server and runs real HTTP requests against PostgreSQL test containers.",
        tech: "WebApplicationFactory<Program>, TestContainers",
        codeSnippet: `var response = await _client.PostAsJsonAsync("/api/v1/courses", payload);`
      },
      {
        id: "test-3",
        label: "End-to-End (E2E) Tests",
        sublabel: "Browser Automation",
        description: "Drives headless browsers through user login, form submissions, and data table rendering in real Angular UI.",
        tech: "Playwright, Cypress, Headless Chromium",
        codeSnippet: `await page.click('button[type="submit"]'); await expect(page.locator('.toast')).toBeVisible();`
      },
      {
        id: "test-4",
        label: "CI/CD Pipeline",
        sublabel: "Automated Quality Gate",
        description: "Executes full test suite on pull requests, certifying that zero regressions or lint errors reach production branches.",
        tech: "GitHub Actions, dotnet test, npm test",
        codeSnippet: `run: dotnet test --configuration Release --verbosity normal`
      }
    ]
  }
];

export const JOURNEY_MILESTONES: JourneyMilestone[] = [
  {
    stage: "01",
    focus: "Computer Science & Engineering Foundation",
    description: "Completed comprehensive computer science and engineering education at Adama Science and Technology University (ASTU), building deep roots in data structures, algorithms, operating systems, and computer networks.",
    keySkills: ["Computer Science & Engineering (ASTU)", "Data Structures & Algorithms", "Operating Systems", "Computer Networks"]
  },
  {
    stage: "02",
    focus: "Programming Fundamentals",
    description: "Deep-dived into object-oriented principles, algorithmic problem solving, memory management, and typing systems with C++, Java, and C#.",
    keySkills: ["C++", "C#", "Object-Oriented Programming (OOP)", "Algorithmic Complexity"]
  },
  {
    stage: "03",
    focus: "Web Development Foundations",
    description: "Built semantic, responsive user interfaces using modern HTML5, CSS3, modern JavaScript, and DOM lifecycle manipulation.",
    keySkills: ["HTML5", "CSS3", "JavaScript (ES6+)", "Responsive Design", "Web Standards"]
  },
  {
    stage: "04",
    focus: "Backend Engineering",
    description: "Advanced into server-side programming with C# and the .NET runtime, understanding Kestrel, asynchronous I/O, middleware pipelines, and dependency injection.",
    keySkills: [".NET Platform", "ASP.NET Core", "C# Async/Await", "Kestrel Server", "Middleware Pipeline"]
  },
  {
    stage: "05",
    focus: "Database Engineering & SQL",
    description: "Mastered relational database modeling with PostgreSQL, writing optimized SQL queries, understanding indexes, and configuring Entity Framework Core Code-First migrations.",
    keySkills: ["PostgreSQL", "SQL", "Entity Framework Core", "Code-First Migrations", "Query Optimization"]
  },
  {
    stage: "06",
    focus: "RESTful Web APIs",
    description: "Designed production-grade RESTful APIs with strict HTTP verb semantics, DTO transformations, FluentValidation, OpenAPI/Scalar documentation, and HATEOAS standards.",
    keySkills: ["REST API Design", "DTOs", "FluentValidation", "OpenAPI / Scalar", "ProblemDetails (RFC 9457)"]
  },
  {
    stage: "07",
    focus: "Modern Angular Frontend",
    description: "Embraced Angular's modern ecosystem: standalone components, Angular Signals for fine-grained reactivity, TypeScript strict mode, and NgRx SignalStore.",
    keySkills: ["Angular", "TypeScript", "Angular Signals", "NgRx SignalStore", "RxJS", "Angular Material"]
  },
  {
    stage: "08",
    focus: "Security & Identity",
    description: "Engineered robust defense mechanisms across client and server tiers: OAuth 2.0, OpenID Connect, JWT refresh token rotation, and ASP.NET Core Identity policy authorization.",
    keySkills: ["OAuth 2.0 / OIDC", "JWT Authentication", "ASP.NET Core Identity", "RBAC & Policies", "OWASP Top 10"]
  },
  {
    stage: "09",
    focus: "Automated Testing & Quality",
    description: "Implemented test-driven development (TDD) pipelines using xUnit and Moq for unit tests, WebApplicationFactory for integration, and Playwright for browser E2E tests.",
    keySkills: ["xUnit", "Moq", "FluentAssertions", "WebApplicationFactory", "Playwright", "Vitest"]
  },
  {
    stage: "10",
    focus: "Full-Stack Architecture",
    description: "Unifying all disciplines into scalable, cloud-ready full-stack software systems with Clean Architecture, CQRS with MediatR, SignalR real-time hubs, and containerized Docker delivery.",
    keySkills: ["Full-Stack Architecture", "Clean Architecture", "CQRS / MediatR", "SignalR", "Docker", "CI/CD"]
  }
];

export const CURRICULUM_MODULES: CurriculumModule[] = [
  {
    number: 1,
    title: "C# Essentials",
    topics: [
      ".NET SDK CLI tooling",
      "OOP (Inheritance, Polymorphism, Interfaces)",
      "Collections & Generics",
      "Exception handling patterns",
      "Async/await and Task parallelism",
      "Delegates, events, and lambdas"
    ],
    outcome: "Core fluency in idiomatic, high-performance C# programming."
  },
  {
    number: 2,
    title: "TypeScript Essentials",
    topics: [
      "Strict type system annotations",
      "Interfaces, type aliases, and generics",
      "Enums, decorators, and module systems",
      "tsconfig.json bundler configuration",
      "NPM ecosystem & scripts"
    ],
    outcome: "Compile-time safety and strong typing synchronization across frontend and backend."
  },
  {
    number: 3,
    title: "Git & Tooling Essentials",
    topics: [
      "Git branching, merging, and rebase",
      "Pull request reviews & GitHub workflows",
      "Merge conflict diagnosis & resolution",
      "VS Code extensions, launch configs & debugger tooling"
    ],
    outcome: "Production-ready collaborative version control and debugging workflow."
  },
  {
    number: 4,
    title: ".NET Platform & ASP.NET Core Fundamentals",
    topics: [
      ".NET 10 architecture, runtime & SDK internals",
      "Kestrel web server & request pipeline",
      "Dependency Injection lifetimes (Transient, Scoped, Singleton)",
      "appsettings.json & Options pattern",
      "Structured logging with ILogger/Serilog"
    ],
    outcome: "Foundational mastery of ASP.NET Core application bootstrapping and configuration."
  },
  {
    number: 5,
    title: "Data Access with Entity Framework Core & LINQ",
    topics: [
      "LINQ queries (query & method syntax)",
      "EF Core DbContext & Code-First migrations",
      "Relationships (1:1, 1:N, M:N) via Fluent API",
      "AsNoTracking and query optimization",
      "Repository and Unit of Work patterns",
      "EF Core 10 features (JSON columns, ExecuteUpdate)"
    ],
    outcome: "Type-safe, high-performance database modeling and data access."
  },
  {
    number: 6,
    title: "Building RESTful Web APIs with ASP.NET Core",
    topics: [
      "REST constraints & resource naming conventions",
      "Controllers ([ApiController]) vs Minimal APIs",
      "FluentValidation & ProblemDetails (RFC 9457)",
      "Pagination, filtering, sorting & DTOs",
      "OpenAPI / Scalar API documentation",
      "AutoMapper & HATEOAS conventions"
    ],
    outcome: "Standardized, production-quality REST APIs consumed reliably by clients."
  },
  {
    number: 7,
    title: "Advanced Web API Development",
    topics: [
      "API versioning (URL, header, query string)",
      "Caching strategies with .NET 10 HybridCache & Redis",
      "Rate limiting and request throttling",
      "BackgroundService & Hangfire job queues",
      "SignalR real-time communication hubs",
      "MediatR pattern & CQRS architecture",
      "Resilient HTTP clients with Polly"
    ],
    outcome: "Fault-tolerant, scalable enterprise backend services."
  },
  {
    number: 8,
    title: "Angular Fundamentals",
    topics: [
      "Angular CLI & Standalone Components",
      "Angular Signals (signal, computed, effect)",
      "Modern control flow syntax (@if, @for, @switch)",
      "Router navigation, route guards & lazy loading",
      "Reactive forms & custom validators",
      "HttpClient & RxJS operators"
    ],
    outcome: "Reactive, modular Single Page Applications with modern Angular."
  },
  {
    number: 9,
    title: "Angular Advanced Concepts",
    topics: [
      "Shared state management with NgRx SignalStore",
      "Angular Material & CDK reusable components",
      "Performance optimization (OnPush, @defer)",
      "SSR & hydration readiness",
      "Internationalization (i18n)",
      "Offline & IndexedDB storage patterns"
    ],
    outcome: "Enterprise frontend architectures with fine-grained reactivity."
  },
  {
    number: 10,
    title: "Security, Authentication & Authorization",
    topics: [
      "OAuth 2.0 & OpenID Connect (OIDC)",
      "ASP.NET Core Identity user management",
      "JWT generation, validation & refresh rotation",
      "Role-based and policy-based authorization handlers",
      "OWASP Top 10 mitigation (XSS, CSRF, SQLi)",
      "HTTPS/TLS enforcement & security headers"
    ],
    outcome: "Defense-in-depth full-stack security protecting resources and identities."
  },
  {
    number: 11,
    title: "Full-Stack Integration: Angular + ASP.NET Web API",
    topics: [
      "End-to-end CRUD connectivity across full stack",
      "CORS policy configuration",
      "HTTP interceptors for automatic JWT injection & refresh",
      "Role-based UI guards & dynamic navigation",
      "SignalR real-time client with auto-reconnect",
      "Master-detail views & optimistic updates"
    ],
    outcome: "Complete end-to-end integration between Angular client and .NET backend."
  },
  {
    number: 12,
    title: "Testing & Quality Assurance",
    topics: [
      "Test pyramid & TDD (Red-Green-Refactor)",
      "C# unit testing with xUnit, Moq & FluentAssertions",
      "Integration testing with WebApplicationFactory",
      "Angular testing with Vitest & TestBed",
      "Browser E2E testing with Playwright / Cypress",
      "CI/CD automated test verification"
    ],
    outcome: "Comprehensive automated test suites preventing production regressions."
  }
];

export const FEATURED_REPOSITORIES: GitHubRepo[] = [
  {
    name: "tms-aspnet-core-api",
    description: "Production-style ASP.NET Core Web API for Training Management Systems with EF Core, PostgreSQL, and OpenAPI/Scalar.",
    language: "C#",
    stars: 18,
    forks: 4,
    updated: "Updated recently",
    url: "https://github.com/Abdulfetah-Tech",
    tags: [".NET 10", "ASP.NET Core", "PostgreSQL", "EF Core", "Clean Architecture"]
  },
  {
    name: "fetan-platform",
    description: "Digital marketplace connecting customers with verified home renovation and maintenance tradespeople.",
    language: "TypeScript",
    stars: 24,
    forks: 7,
    updated: "Updated recently",
    url: "https://github.com/Abdulfetah-Tech",
    tags: ["Angular", "C#", "SignalR", "PostgreSQL", "Tailwind CSS"]
  },
  {
    name: "onegov-integrated-platform",
    description: "E-government microservices platform unifying citizen registry, tax filing, and digital identity management.",
    language: "C#",
    stars: 15,
    forks: 3,
    updated: "Updated recently",
    url: "https://github.com/Abdulfetah-Tech",
    tags: ["Microservices", "OAuth 2.0", "SSO", "Docker", "REST API"]
  },
  {
    name: "angular-signals-signalstore-starter",
    description: "Enterprise Angular starter demonstrating standalone architecture, Signals, NgRx SignalStore, and JWT interceptors.",
    language: "TypeScript",
    stars: 29,
    forks: 8,
    updated: "Updated recently",
    url: "https://github.com/Abdulfetah-Tech",
    tags: ["Angular", "Signals", "NgRx SignalStore", "RxJS", "Tailwind"]
  }
];
