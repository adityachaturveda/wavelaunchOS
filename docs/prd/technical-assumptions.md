# Technical Assumptions

## Repository Structure: Monorepo

**Decision**: Monorepo using a workspace structure

**Structure**:
```
/apps/application-form    # Public-facing application form
/apps/crm                 # Internal CRM dashboard
/packages/shared          # Shared types, utilities, database schema, validation
/packages/database        # Prisma schema and migrations
```

**Rationale**: A monorepo allows code sharing between the public application form and internal CRM (shared types, database schema, validation logic) while maintaining clear separation of concerns. This reduces duplication and ensures consistency in data handling.

## Service Architecture

**Decision**: Monolithic applications within monorepo structure

**Architecture**:
- Each app (application-form, CRM) is a self-contained Next.js application
- API routes handle backend logic within each app
- Shared business logic extracted to `/packages/shared`
- Direct database access via Prisma ORM from both apps

**Rationale**: For an internal tool with straightforward CRUD operations, credential management, and AI integration, monolithic apps keep deployment simple and avoid the overhead of microservices coordination. The monorepo structure provides modularity without distributed system complexity.

## Testing Requirements

**Decision**: Unit + Integration Testing

**Testing Strategy**:
- **Unit Tests**: Business logic, utility functions, data transformations (Jest + React Testing Library)
- **Integration Tests**: API endpoints, database operations, authentication flows (Jest + Supertest)
- **Manual Testing**: UI flows, credential vault operations, AI deliverable generation
- **Focus Areas**: Security-critical code (credential encryption, audit logging, authentication)

**Rationale**: Given the security requirements (credential vault, audit logs, authentication), solid test coverage is essential. Unit and integration tests provide confidence without the maintenance overhead of full E2E testing. Manual testing handles complex UI workflows and AI interactions.

## Additional Technical Assumptions and Requests

### Frontend Framework
**Stack**: Next.js 14+ (App Router) with React 18+

**Rationale**: 
- Next.js provides excellent developer experience with file-based routing
- App Router enables server components for better performance
- Built-in API routes eliminate need for separate backend
- Server-side rendering improves initial load performance for dashboard
- Excellent TypeScript support

### Database
**Database**: PostgreSQL 15+

**ORM**: Prisma

**Rationale**:
- PostgreSQL provides robust relational data model for creators, brands, projects, and relationships
- ACID compliance ensures data integrity for audit logs and credential management
- JSON fields support for flexible 24+ question application form data
- Row-level security capabilities for future multi-tenancy
- Prisma provides type-safe database access and excellent migration tooling

### Styling Framework
**Styling**: Tailwind CSS 3+

**UI Components**: shadcn/ui (Radix UI primitives with Tailwind)

**Rationale**:
- Tailwind enables rapid UI development with utility-first approach
- Consistent design system through configuration
- Small bundle size with purging unused styles
- shadcn/ui provides accessible, customizable components (tables, forms, dialogs, side panels)
- Perfect for data-dense interfaces with list views

### Hosting & Deployment
**Hosting**: Vercel

**Rationale**:
- Native Next.js optimization and zero-config deployment
- Edge network for fast global access
- Built-in preview deployments for testing
- Automatic HTTPS and SSL certificates
- Environment variable management
- Generous free tier, scalable pricing
- Postgres integration via Vercel Postgres or external Supabase/Neon

**Database Hosting**: Supabase or Neon (serverless PostgreSQL)

### AI Integration
**Primary Provider**: Anthropic Claude (Claude 3.5 Sonnet)

**Secondary Provider**: OpenAI (GPT-4)

**Fallback Strategy**:
1. Attempt request with Claude API (faster, better for document generation)
2. On failure (rate limit, downtime, error), automatically retry with OpenAI GPT-4
3. Log which provider was used for each generation in audit logs
4. Configurable provider preference per template type (some templates may work better with specific models)

**Implementation**: 
- Abstraction layer (`/packages/shared/ai-client.ts`) handles provider selection and fallback logic
- API keys stored in environment variables
- Usage tracking for cost monitoring

**Rationale**: 
- Dual provider ensures high availability (99.9%+ uptime)
- Claude excels at structured document generation and following templates
- GPT-4 provides backup and alternative capabilities
- Cost optimization through provider selection
- No vendor lock-in

### Authentication & Authorization
**Authentication**: NextAuth.js v5 (Auth.js)

**Strategy**: Credentials provider with database sessions

**Implementation**:
- Email/password stored in PostgreSQL (bcrypt hashed)
- Session tokens stored in database for revocation capability
- Strong password requirements enforced (12+ chars, complexity)
- Session timeout after 7 days of inactivity
- CSRF protection enabled

**Authorization**:
- Role-based access control (RBAC): Admin, Founder, Team Member
- Stored in User table, checked via middleware
- Future-proof for granular permissions if needed

**Rationale**: NextAuth.js provides battle-tested authentication with excellent Next.js integration, session management, and security features out of the box.

### Additional Technical Decisions

**TypeScript**: Strict mode enabled for type safety across frontend and backend

**State Management**: React Server Components + client-side React hooks (useState, useReducer) - no global state library needed for MVP

**Form Handling**: 
- Application Form: React Hook Form + Zod validation
- CRM Forms: React Hook Form + Zod validation
- Shared Zod schemas in `/packages/shared/validation`

**File Upload** (if needed for credentials/documents): Vercel Blob Storage or Uploadthing

**Monitoring & Logging**: 
- Vercel Analytics for performance
- Sentry for error tracking (optional)
- Custom audit logging to PostgreSQL

**Environment Variables**:
```
DATABASE_URL
NEXTAUTH_SECRET
NEXTAUTH_URL
ANTHROPIC_API_KEY
OPENAI_API_KEY
ENCRYPTION_KEY (for credential vault)
```

---
