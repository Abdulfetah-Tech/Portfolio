import { GoogleGenAI, Chat } from "@google/genai";
import { PORTFOLIO_CONFIG } from "../config/portfolio";
import { SYSTEM_INSTRUCTION } from "../constants";

let chatSession: Chat | null = null;

export const initializeChat = (): Chat | null => {
  if (chatSession) return chatSession;

  const apiKey = process.env.API_KEY || process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn("API_KEY is not configured in environment variables. Using fallback resume responder.");
    return null;
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    chatSession = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });
    return chatSession;
  } catch (err) {
    console.error("Failed to initialize GoogleGenAI chat session:", err);
    return null;
  }
};

// Fallback response generator in case Gemini API key is unset or network fails
function generateFallbackResponse(userPrompt: string): string {
  const query = userPrompt.toLowerCase();

  if (query.includes('training') || query.includes('curriculum') || query.includes('course') || query.includes('module')) {
    return "Abdulfetah completed a rigorous 12-module technical training in Full-Stack Web Application Development with .NET & Angular. The curriculum covered modern C# 13, .NET 10, ASP.NET Core Web APIs, Entity Framework Core 10, Clean Architecture, CQRS with MediatR, SignalR real-time hubs, Angular Signals, NgRx SignalStore, OAuth/JWT security, and automated testing with xUnit, Vitest, and Playwright.";
  }

  if (query.includes('skill') || query.includes('technolog') || query.includes('stack') || query.includes('.net') || query.includes('angular') || query.includes('postgres')) {
    return `Abdulfetah Bedru is a Full-Stack Software Engineer with depth across:\n• Backend: C#, .NET 10, ASP.NET Core, RESTful APIs, Entity Framework Core, LINQ, DI, Middleware, Background Services, SignalR, MediatR, CQRS\n• Frontend: Angular, TypeScript, HTML, CSS, Angular Material, RxJS, NgRx SignalStore, Responsive UI, SSR/Hydration\n• Databases: PostgreSQL, SQL, EF Core migrations, relationships, query optimization, indexing\n• Security: OAuth 2.0, OpenID Connect, JWT, ASP.NET Core Identity, RBAC & Policy authorization, OWASP Top 10, HTTPS/TLS\n• Testing: xUnit, Moq, FluentAssertions, WebApplicationFactory, Vitest, Playwright, TestContainers`;
  }

  if (query.includes('project') || query.includes('tms') || query.includes('fetan') || query.includes('onegov')) {
    return "Abdulfetah's featured projects include:\n1. TMS API: Production-style ASP.NET Core Web API for training management with EF Core, PostgreSQL, DTOs, OpenAPI/Scalar, and validation.\n2. Fetan Digital Platform: On-demand marketplace connecting customers with verified trade professionals (electrician, plumber, carpenter, painter, mason, welder).\n3. OneGov: Integrated e-government services platform with SSO, civil registry, and microservices architecture.\n4. Full-Stack TMS: Complete Angular + ASP.NET Core + PostgreSQL system with JWT, role-based authorization, and SignalR.";
  }

  if (query.includes('journey') || query.includes('background') || query.includes('astu') || query.includes('education')) {
    return "Abdulfetah holds a Bachelor of Science (BSc) in Computer Science and Engineering from Adama Science and Technology University (ASTU). His development journey progressed systematically from programming fundamentals to backend engineering, database modeling, REST APIs, modern Angular, security, automated testing, and full-stack architecture.";
  }

  if (query.includes('contact') || query.includes('email') || query.includes('hire') || query.includes('cv') || query.includes('resume')) {
    return `You can reach Abdulfetah Bedru directly via:\n• Email: ${PORTFOLIO_CONFIG.email}\n• LinkedIn: ${PORTFOLIO_CONFIG.linkedin}\n• GitHub: ${PORTFOLIO_CONFIG.github}\nHe is open to full-stack, backend, and software engineering opportunities globally. You can also download his CV directly from the portfolio.`;
  }

  return `Abdulfetah Bedru is a Full-Stack Software Engineer specializing in .NET 10, Angular, PostgreSQL, and cloud-ready architectures. Feel free to ask about his backend APIs, database engineering, Angular SignalStore patterns, or contact information!`;
}

export const sendMessageStream = async function* (message: string) {
  try {
    const chat = initializeChat();
    if (!chat) {
      const fallback = generateFallbackResponse(message);
      const chunks = fallback.split(' ');
      for (const chunk of chunks) {
        yield chunk + ' ';
        await new Promise(r => setTimeout(r, 20));
      }
      return;
    }

    const result = await chat.sendMessageStream({ message });
    for await (const chunk of result) {
      if (chunk.text) {
        yield chunk.text;
      }
    }
  } catch (error) {
    console.error("Error sending message to Gemini:", error);
    const fallback = generateFallbackResponse(message);
    yield fallback;
  }
};
