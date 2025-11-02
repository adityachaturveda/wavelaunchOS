# Studio OS Product Requirements Document (PRD)

**Project Name:** Studio OS  
**Project Type:** Full-Stack Internal Web Application  
**Target Audience:** Wavelaunch Studio Founders & Core Team (Internal Only)  
**Status:** Planning Phase  
**Document Version:** 1.0  
**Last Updated:** October 29, 2025  
**Author:** PM Agent (John)

---

## Goals and Background Context

### Goals

* Consolidate all creator and brand data into a single, secure, centralized platform
* Eliminate manual spreadsheet dependency and scattered tool usage across the organization
* Implement robust security for sensitive credentials and operational data with full audit trails
* Enable 80% automation of deliverable and report generation through AI-powered tools
* Provide real-time visibility into project health, priorities, and risk indicators through intelligent dashboards
* Reduce founder administrative burden to free up strategic focus time
* Establish the foundation for scalable creator brand lifecycle management

### Background Context

Wavelaunch Studio currently manages creator brands and operational data across fragmented platforms including spreadsheets, Notion pages, email threads, and WhatsApp conversations. This fragmentation creates security vulnerabilities for sensitive credentials, causes missed milestones and status updates, and forces founders to spend excessive time on manual administrative tasks rather than strategic growth initiatives.

Studio OS addresses these challenges by providing a founder-exclusive web application that serves as the single source of truth for all operational, brand, and creator data. The platform will centralize credential management with encryption, automate document generation using AI, and surface priority items through intelligent dashboards. This MVP focuses exclusively on internal team use, with no client-facing features or external API access.

### Change Log

| Date | Version | Description | Author |
|------|---------|-------------|--------|
| October 29, 2025 | 1.0 | Initial PRD creation | PM Agent (John) |

---

## Requirements

### Functional Requirements

**FR1:** The system shall provide basic database authentication with email and password for authorized team members.

**FR2:** The system shall provide session management with automatic timeout and secure session handling.

**FR3:** The system shall provide a public-facing application form with 24+ customizable questions hosted on an external page.

**FR4:** The system shall automatically capture and store application form submissions into the CRM database, creating new creator/brand records.

**FR5:** The system shall allow users to create and manage creator profiles with data populated from application form submissions.

**FR6:** The system shall allow users to create and manage brand profiles with customizable fields.

**FR7:** The system shall track and display relationships between creators and brands.

**FR8:** The system shall provide an encrypted credential vault for storing sensitive authentication information (passwords, API keys, tokens).

**FR9:** The system shall allow users to reveal, mask, and copy credentials from the vault with one-click actions.

**FR10:** The system shall track and log all access to credentials in the vault, recording who accessed what and when.

**FR11:** The system shall enable secure credential sharing within the authorized team with access controls.

**FR12:** The system shall allow users to create and track project milestones for each brand/creator relationship.

**FR13:** The system shall calculate and display health scores for projects based on configurable logic (milestone completion, last activity, risk indicators).

**FR14:** The system shall provide a status workflow management system for tracking project progression through defined stages.

**FR15:** The system shall display priority indicators for projects to surface urgent items.

**FR16:** The system shall provide a studio-wide dashboard showing priority projects, risk alerts, and health score visualizations.

**FR17:** The system shall surface actionable quick-action items on the dashboard based on project status and health.

**FR18:** The system shall provide an AI deliverable generator that creates documents and reports based on stored project data from application forms and CRM records.

**FR19:** The system shall allow users to create and manage custom AI prompt templates for different types of deliverables.

**FR20:** The system shall generate assets (documents, reports, summaries) using AI prompts with one-click automation leveraging application form data.

**FR21:** The system shall provide a template management system for organizing and reusing AI prompt templates.

**FR22:** The system shall log all sensitive operations including credential access, data modifications, and user actions in a comprehensive audit log.

**FR23:** The system shall display access logs showing who accessed what resources and when.

**FR24:** The system shall maintain change history for all creator, brand, and project records.

**FR25:** The system shall monitor and log security events including failed login attempts and unauthorized access attempts.

**FR26:** The system shall allow users to search and filter audit logs by date, user, action type, and resource.

**FR27:** The system shall validate application form submissions before storing them in the database to ensure data quality.

### Non-Functional Requirements

**NFR1:** The system shall encrypt all sensitive data at rest using industry-standard encryption algorithms (AES-256 or equivalent).

**NFR2:** The system shall encrypt all data in transit using TLS 1.3 or higher.

**NFR3:** The system shall enforce strong password requirements (minimum 12 characters, mix of uppercase, lowercase, numbers, special characters).

**NFR4:** The system shall complete dashboard loading and data retrieval operations within 2 seconds under normal load conditions.

**NFR5:** The system shall support real-time or near-real-time updates (within 5 seconds) for status changes and priority indicators.

**NFR6:** The system shall be designed to scale to support at least 1000 creator/brand records without performance degradation.

**NFR7:** The system shall be deployed on a reliable cloud platform (Vercel, Netlify, or Fly.io) with 99.5% uptime SLA.

**NFR8:** The system shall implement automated backup procedures with daily backups retained for at least 30 days.

**NFR9:** The system shall provide health monitoring and alerting for system availability and performance issues.

**NFR10:** The system shall be accessible only to explicitly authorized Wavelaunch Studio team members.

**NFR11:** The system shall implement routine access reviews with audit logs available for security compliance.

**NFR12:** The system shall conduct regular security audits at least quarterly to identify and remediate vulnerabilities.

**NFR13:** The system shall provide data validation checks during application form submission and import operations to prevent data corruption.

**NFR14:** The system shall maintain referential integrity between creators, brands, projects, and credentials.

**NFR15:** The system shall be designed with a web-based responsive interface accessible from desktop browsers with light mode UI.

**NFR16:** The system shall integrate with AI APIs (such as Claude, GPT, or similar) for deliverable generation capabilities using application form data.

**NFR17:** The system shall be maintainable by a small development team with clear separation of concerns and documented architecture.

**NFR18:** The external application form shall be publicly accessible without authentication while the CRM remains secured for internal team only.

---

## User Interface Design Goals

### Overall UX Vision

Studio OS prioritizes **operational efficiency and clarity** for internal founder workflows. The interface should feel like a powerful, professional command center—not a consumer app. The design philosophy centers on:

- **Information density balanced with clarity**: Surface critical data at a glance without overwhelming
- **Fast, keyboard-friendly workflows**: Founders should be able to navigate and execute common tasks rapidly
- **Trust and security visibility**: UI should reinforce the security and audit capabilities, making users feel confident
- **Minimal friction for daily tasks**: Onboarding creators, checking status, accessing credentials should take seconds, not minutes

### Key Interaction Paradigms

1. **Dashboard-First Navigation**: The dashboard serves as mission control—users start here daily to see priorities, risks, and quick actions
2. **Contextual Side Panels**: Detail views (creator profiles, credential vaults) open in side panels to maintain context rather than full-page navigation
3. **Quick Actions Everywhere**: One-click operations for common tasks (copy credential, update status, generate report)
4. **Inline Editing**: Edit fields directly in tables/cards rather than navigating to separate edit screens
5. **Smart Search & Filtering**: Global search bar with intelligent filtering to find any creator, brand, or project instantly
6. **Status Indicators**: Visual health scores and risk badges throughout the interface using color coding (green/yellow/red)

### Core Screens and Views

1. **Login Screen** - Basic database authentication with email/password
2. **Studio Dashboard** - Priority projects, health scores, risk alerts, recent activity, quick actions
3. **Creators List** - Searchable/filterable list view of all creators with health indicators
4. **Creator Detail View** - Full creator profile with data from application form, linked brands, projects, credentials, and history
5. **Brands List** - Searchable/filterable list view of all brands with status and relationships
6. **Brand Detail View** - Full brand profile with linked creators, projects, milestones, and deliverables
7. **Credential Vault** - Secure vault interface with reveal/mask/copy functionality and access logs
8. **Project Status Board** - List view showing all projects with milestones and workflows
9. **AI Deliverable Generator** - Template selection, data input, prompt customization, and generation interface
10. **Audit Log Viewer** - Searchable, filterable log of all system activities with export capabilities
11. **Settings/Admin Panel** - User management, access controls, system configuration
12. **External Application Form** (public-facing) - Standalone 24+ question form that feeds data directly into CRM

### Accessibility: WCAG AA

The system will target **WCAG 2.1 Level AA** compliance to ensure:
- Sufficient color contrast ratios (4.5:1 for normal text, 3:1 for large text)
- Keyboard navigation support for all interactive elements
- Screen reader compatibility with proper ARIA labels
- Focus indicators for keyboard users
- Text alternatives for visual information

### Branding

**Professional Internal Tool Aesthetic**: Studio OS should convey professionalism, security, and efficiency rather than consumer-friendly playfulness.

- **Color Palette**: Light mode with clean whites, soft grays for backgrounds, accent colors for status (green=healthy, yellow=caution, red=risk), and a professional primary brand color (suggest deep blue or teal for trust/security associations)
- **Typography**: Clean, modern sans-serif (Inter, SF Pro, or Roboto) optimized for data-dense interfaces
- **Visual Style**: Minimalist with clear hierarchy, subtle shadows/borders, generous whitespace in reading areas but compact in data views
- **Icons**: Consistent icon set (Heroicons, Lucide, or Feather Icons) for actions and status indicators

### Target Device and Platforms: Web Responsive (Desktop-First)

**Primary Target**: Desktop browsers (Chrome, Firefox, Safari, Edge) at 1440px+ viewport widths  
**Secondary Target**: Laptop/tablet screens (1024px-1440px) with responsive adaptations  
**Not Supported in MVP**: Mobile phones (sub-768px)

---

## Technical Assumptions

### Repository Structure: Monorepo

**Decision**: Monorepo using a workspace structure

**Structure**:
```
/apps/application-form    # Public-facing application form
/apps/crm                 # Internal CRM dashboard
/packages/shared          # Shared types, utilities, database schema, validation
/packages/database        # Prisma schema and migrations
```

**Rationale**: A monorepo allows code sharing between the public application form and internal CRM (shared types, database schema, validation logic) while maintaining clear separation of concerns. This reduces duplication and ensures consistency in data handling.

### Service Architecture

**Decision**: Monolithic applications within monorepo structure

**Architecture**:
- Each app (application-form, CRM) is a self-contained Next.js application
- API routes handle backend logic within each app
- Shared business logic extracted to `/packages/shared`
- Direct database access via Prisma ORM from both apps

**Rationale**: For an internal tool with straightforward CRUD operations, credential management, and AI integration, monolithic apps keep deployment simple and avoid the overhead of microservices coordination. The monorepo structure provides modularity without distributed system complexity.

### Testing Requirements

**Decision**: Unit + Integration Testing

**Testing Strategy**:
- **Unit Tests**: Business logic, utility functions, data transformations (Jest + React Testing Library)
- **Integration Tests**: API endpoints, database operations, authentication flows (Jest + Supertest)
- **Manual Testing**: UI flows, credential vault operations, AI deliverable generation
- **Focus Areas**: Security-critical code (credential encryption, audit logging, authentication)

**Rationale**: Given the security requirements (credential vault, audit logs, authentication), solid test coverage is essential. Unit and integration tests provide confidence without the maintenance overhead of full E2E testing. Manual testing handles complex UI workflows and AI interactions.

### Additional Technical Assumptions and Requests

#### Frontend Framework
**Stack**: Next.js 14+ (App Router) with React 18+

**Rationale**: 
- Next.js provides excellent developer experience with file-based routing
- App Router enables server components for better performance
- Built-in API routes eliminate need for separate backend
- Server-side rendering improves initial load performance for dashboard
- Excellent TypeScript support

#### Database
**Database**: PostgreSQL 15+

**ORM**: Prisma

**Rationale**:
- PostgreSQL provides robust relational data model for creators, brands, projects, and relationships
- ACID compliance ensures data integrity for audit logs and credential management
- JSON fields support for flexible 24+ question application form data
- Row-level security capabilities for future multi-tenancy
- Prisma provides type-safe database access and excellent migration tooling

#### Styling Framework
**Styling**: Tailwind CSS 3+

**UI Components**: shadcn/ui (Radix UI primitives with Tailwind)

**Rationale**:
- Tailwind enables rapid UI development with utility-first approach
- Consistent design system through configuration
- Small bundle size with purging unused styles
- shadcn/ui provides accessible, customizable components (tables, forms, dialogs, side panels)
- Perfect for data-dense interfaces with list views

#### Hosting & Deployment
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

#### AI Integration
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

#### Authentication & Authorization
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

#### Additional Technical Decisions

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

## Epic List

1. **Epic 1: Foundation & Authentication** - Establish project infrastructure, database schema, and basic authentication system
2. **Epic 2: Application Form & Data Ingestion** - Build public-facing application form with automated CRM data capture
3. **Epic 3: Creator & Brand Management** - Implement core CRUD operations for managing creator and brand profiles
4. **Epic 4: Credential Vault** - Build secure encrypted credential storage with reveal/mask/copy functionality
5. **Epic 5: Project Status & Health Tracking** - Implement milestone tracking, health scoring, and status workflows
6. **Epic 6: Studio Dashboard** - Create intelligent dashboard with priorities, risk alerts, and quick actions
7. **Epic 7: AI Deliverable Generator** - Build AI-powered document generation with template management and dual-provider fallback
8. **Epic 8: Audit Logging & Security** - Implement comprehensive audit logging and access tracking across all operations

---

## Epic Details

### Epic 1: Foundation & Authentication

**Epic Goal**: Establish project infrastructure, database schema, deployment pipeline, and secure authentication system that allows authorized team members to log in and access the CRM.

**User Stories**:

**US1.1: Project Setup and Infrastructure**
- **As a** developer
- **I want** a configured Next.js monorepo with proper workspace structure
- **So that** both the application form and CRM apps can share code and be developed efficiently

**Acceptance Criteria**:
- Monorepo created with `/apps/application-form`, `/apps/crm`, `/packages/shared`, `/packages/database`
- TypeScript strict mode configured
- Tailwind CSS + shadcn/ui installed and configured
- ESLint and Prettier configured
- Package.json scripts for dev, build, test created
- Git repository initialized with proper .gitignore

**US1.2: Database Schema Design**
- **As a** developer
- **I want** a complete PostgreSQL database schema using Prisma
- **So that** all entities (Users, Creators, Brands, Projects, Credentials, AuditLogs) are properly modeled

**Acceptance Criteria**:
- Prisma schema defined with all core tables: Users, Creators, Brands, Projects, Credentials, ApplicationFormSubmissions, AuditLogs, AITemplates
- Relationships established (one-to-many, many-to-many where needed)
- Timestamps (createdAt, updatedAt) on all tables
- Indexes created for performance (email lookups, foreign keys)
- Migration files generated and applied
- Seed data script created for development

**US1.3: Database Hosting Setup**
- **As a** developer
- **I want** a hosted PostgreSQL database (Supabase or Neon)
- **So that** the application has persistent data storage

**Acceptance Criteria**:
- PostgreSQL database provisioned on Supabase or Neon
- Connection string configured in environment variables
- Database accessible from development and production environments
- SSL/TLS encryption enabled for connections
- Automated backups configured (daily, 30-day retention)

**US1.4: Basic Authentication System**
- **As a** team member
- **I want** to log in with my email and password
- **So that** I can securely access the CRM

**Acceptance Criteria**:
- NextAuth.js v5 configured with credentials provider
- Login page created with email/password form
- Passwords hashed using bcrypt (10 rounds minimum)
- Strong password validation enforced (12+ chars, uppercase, lowercase, number, special char)
- Session created on successful login (7-day expiration)
- Session stored in PostgreSQL Sessions table
- Protected routes middleware implemented (redirects to login if unauthenticated)
- Logout functionality implemented (destroys session)

**US1.5: User Management Foundation**
- **As an** admin
- **I want** to create user accounts for team members
- **So that** authorized people can access the CRM

**Acceptance Criteria**:
- Users table includes: id, email, passwordHash, role (Admin/Founder/TeamMember), createdAt, updatedAt
- Admin seed user created for initial access
- Basic user creation API endpoint (`POST /api/admin/users`)
- Role-based access control middleware created
- User list page accessible by admins only

**US1.6: Deployment Pipeline**
- **As a** developer
- **I want** automated deployment to Vercel
- **So that** changes are deployed automatically and reliably

**Acceptance Criteria**:
- Vercel project created and connected to Git repository
- Environment variables configured in Vercel (DATABASE_URL, NEXTAUTH_SECRET, etc.)
- Both apps (application-form, CRM) configured for deployment
- Preview deployments created for pull requests
- Production deployment triggered on main branch merge
- Health check endpoint created (`GET /api/health`)
- Deployment notifications configured

**US1.7: Basic Layout and Navigation**
- **As a** team member
- **I want** a consistent layout with navigation
- **So that** I can access different sections of the CRM

**Acceptance Criteria**:
- Root layout created with header, sidebar navigation, main content area
- Navigation menu includes: Dashboard, Creators, Brands, Projects, Credentials, Deliverables, Audit Logs, Settings
- User profile dropdown in header (shows email, logout button)
- Responsive layout works on desktop and laptop screens
- Light mode styling applied with professional aesthetic
- Loading states handled gracefully

---

### Epic 2: Application Form & Data Ingestion

**Epic Goal**: Build a public-facing application form with 24+ questions that automatically captures submissions and creates creator/brand records in the CRM database.

**User Stories**:

**US2.1: Application Form Schema Design**
- **As a** product owner
- **I want** to define the 24+ questions for the application form
- **So that** we collect all necessary creator/brand information

**Acceptance Criteria**:
- Form schema defined with all required fields (name, email, contact info, social handles, brand details, content types, audience demographics, goals, etc.)
- Field types specified (text, email, URL, number, select, multi-select, textarea)
- Validation rules defined for each field (required, format, min/max length)
- Zod validation schema created in `/packages/shared/validation`
- Schema documented in README or docs

**US2.2: Public Application Form UI**
- **As a** creator/brand
- **I want** to fill out an application form
- **So that** I can apply to work with Wavelaunch Studio

**Acceptance Criteria**:
- Public form page created at `/apps/application-form/app/apply`
- All 24+ questions rendered as form fields
- Form styled with Tailwind CSS (clean, professional, mobile-responsive)
- Multi-step form with progress indicator (optional, or single long form)
- Client-side validation using React Hook Form + Zod
- Clear error messages for validation failures
- Submit button with loading state
- Success confirmation page after submission
- No authentication required to access form

**US2.3: Form Submission API**
- **As a** developer
- **I want** an API endpoint that receives form submissions
- **So that** data is validated and stored in the database

**Acceptance Criteria**:
- API endpoint created (`POST /api/application-form/submit`)
- Server-side validation using Zod schema
- Data sanitized to prevent injection attacks
- Submission stored in ApplicationFormSubmissions table with status="Pending"
- Duplicate submission check (same email within 30 days shows warning)
- Error handling with appropriate HTTP status codes
- Rate limiting implemented (max 5 submissions per IP per hour)
- Returns success response with submission ID

**US2.4: Automatic Creator/Brand Record Creation**
- **As a** founder
- **I want** application form submissions to automatically create creator and brand records
- **So that** I don't have to manually enter data into the CRM

**Acceptance Criteria**:
- Form submission triggers background job/function to process data
- Creator record created in Creators table with data from submission
- Brand record created if brand information provided in submission
- Creator-Brand relationship established if applicable
- Application form data stored as JSON in Creator record for full context
- Creator status set to "New Application"
- Email notification sent to founders about new submission (optional for MVP)
- Submission status updated to "Processed"

**US2.5: Application Form Submissions Management**
- **As a** founder
- **I want** to view all application form submissions in the CRM
- **So that** I can review and approve new applications

**Acceptance Criteria**:
- Submissions list page in CRM (`/crm/applications`)
- Table shows: submission date, applicant name, email, status, actions
- Filter by status (Pending, Processed, Rejected)
- Search by name or email
- Click row to view full submission details in side panel
- Action buttons: View Full Details, Approve, Reject
- Approve action creates/updates Creator record with status="Active"
- Reject action updates submission status to "Rejected"

**US2.6: Application Form Analytics**
- **As a** founder
- **I want** to see basic metrics about form submissions
- **So that** I can track application volume and conversion

**Acceptance Criteria**:
- Dashboard widget showing: total submissions this month, pending review count, approval rate
- Simple chart showing submissions over time (last 30 days)
- Average time to process (from submission to approval/rejection)
- Top referral sources if tracking is implemented

---

### Epic 3: Creator & Brand Management

**Epic Goal**: Implement comprehensive CRUD operations for managing creator and brand profiles with full editing capabilities and relationship tracking.

**User Stories**:

**US3.1: Creators List View**
- **As a** founder
- **I want** to see a list of all creators
- **So that** I can quickly browse and access creator information

**Acceptance Criteria**:
- Creators page created (`/crm/creators`)
- List view displaying all creators in table format
- Columns: Name, Email, Status, Health Score, Brands, Last Activity, Actions
- Search functionality (searches name, email)
- Filter by status (New Application, Active, Inactive, Paused)
- Sort by name, status, health score, last activity
- Pagination (50 creators per page)
- Click row to open creator detail side panel
- Quick actions: Edit, View Details, Archive

**US3.2: Creator Detail View**
- **As a** founder
- **I want** to view complete creator profile information
- **So that** I can see all details and history in one place

**Acceptance Criteria**:
- Creator detail opens in side panel (keeps list view context)
- Displays all creator fields from application form
- Shows linked brands with relationship type
- Shows active projects with current status
- Shows credentials associated with this creator
- Shows activity timeline (created, updated, status changes)
- Edit button opens inline editing mode
- Archive/Delete button (with confirmation dialog)
- Navigation to related records (brands, projects)

**US3.3: Create/Edit Creator**
- **As a** founder
- **I want** to manually create or edit creator profiles
- **So that** I can add creators who didn't use the application form or update existing information

**Acceptance Criteria**:
- "Add Creator" button on creators list page
- Create form with all required fields (name, email, contact info, social handles, etc.)
- Edit mode activates inline in side panel
- Form validation with clear error messages
- Save changes updates Creator record in database
- Audit log entry created for create/update operations
- Success notification displayed
- Updated data immediately reflected in list view
- Cancel button discards changes without saving

**US3.4: Brands List View**
- **As a** founder
- **I want** to see a list of all brands
- **So that** I can manage brand information

**Acceptance Criteria**:
- Brands page created (`/crm/brands`)
- List view displaying all brands in table format
- Columns: Brand Name, Associated Creators, Status, Projects, Last Activity, Actions
- Search functionality (searches brand name)
- Filter by status (Active, Inactive, Paused)
- Sort by name, status, last activity
- Pagination (50 brands per page)
- Click row to open brand detail side panel
- Quick actions: Edit, View Details, Archive

**US3.5: Brand Detail View**
- **As a** founder
- **I want** to view complete brand profile information
- **So that** I can see all brand details and relationships

**Acceptance Criteria**:
- Brand detail opens in side panel
- Displays all brand fields (name, description, industry, target audience, content types, etc.)
- Shows linked creators with relationship description
- Shows active projects for this brand
- Shows brand-specific credentials
- Shows activity timeline
- Edit button opens inline editing mode
- Archive/Delete button (with confirmation)

**US3.6: Create/Edit Brand**
- **As a** founder
- **I want** to manually create or edit brand profiles
- **So that** I can manage brand information

**Acceptance Criteria**:
- "Add Brand" button on brands list page
- Create form with all brand fields
- Edit mode activates inline in side panel
- Form validation with clear error messages
- Save changes updates Brand record
- Audit log entry created
- Success notification displayed
- Cancel button discards changes

**US3.7: Creator-Brand Relationship Management**
- **As a** founder
- **I want** to link creators to brands
- **So that** I can track which creators work with which brands

**Acceptance Criteria**:
- In creator detail view, "Link Brand" button available
- Modal/dropdown to select brand and specify relationship type (Owner, Manager, Collaborator, etc.)
- Relationship stored in join table (CreatorBrands)
- Relationship displayed in both creator and brand detail views
- Unlink relationship option available
- Multiple creators can be linked to one brand
- Multiple brands can be linked to one creator

---

### Epic 4: Credential Vault

**Epic Goal**: Build a secure encrypted credential storage system with reveal/mask/copy functionality and comprehensive access tracking.

**User Stories**:

**US4.1: Credential Vault Data Model**
- **As a** developer
- **I want** a secure database schema for storing encrypted credentials
- **So that** sensitive authentication data is protected

**Acceptance Criteria**:
- Credentials table created with fields: id, name, type (Password, API Key, Token, SSH Key), encryptedValue, creatorId, brandId, url, username, notes, createdBy, createdAt, updatedAt
- Encryption key stored in environment variable (ENCRYPTION_KEY)
- Encryption/decryption utility functions created using Node crypto module (AES-256-GCM)
- Credentials always encrypted before storage
- Decryption only happens on-demand when revealing
- Database backup excludes encryption key (key stored separately)

**US4.2: Credentials List View**
- **As a** founder
- **I want** to see all stored credentials
- **So that** I can access them when needed

**Acceptance Criteria**:
- Credentials page created (`/crm/credentials`)
- List view displaying credentials in table format
- Columns: Name, Type, Associated With (Creator/Brand), Last Accessed, Actions
- Credential values displayed as masked (••••••••)
- Search by name or associated entity
- Filter by type (Password, API Key, Token, SSH Key)
- Filter by creator or brand
- Sort by name, type, last accessed
- "Add Credential" button available

**US4.3: Create/Edit Credential**
- **As a** founder
- **I want** to store new credentials or update existing ones
- **So that** sensitive authentication data is centralized and secure

**Acceptance Criteria**:
- "Add Credential" button opens creation form
- Form fields: Name, Type, Value, URL (optional), Username (optional), Notes (optional), Associate with Creator/Brand
- Value field has "Show/Hide" toggle
- Validation ensures required fields filled
- On save, value encrypted before storing in database
- Audit log entry created (credential created/updated, NOT the actual value)
- Success notification displayed
- Edit mode available from credential detail view
- Edit allows updating all fields except encrypted value (must delete and recreate for security)

**US4.4: Reveal/Mask/Copy Credential**
- **As a** founder
- **I want** to reveal, mask, or copy credential values with one click
- **So that** I can access credentials quickly and securely

**Acceptance Criteria**:
- Each credential row has three action buttons: Reveal (eye icon), Copy (clipboard icon), Open URL (link icon if URL exists)
- Click "Reveal" decrypts value and displays it in plain text for 30 seconds, then auto-masks
- Click "Copy" decrypts value and copies to clipboard without revealing on screen
- Copy action shows temporary "Copied!" notification
- Click "Open URL" opens credential URL in new tab (if URL field populated)
- All actions trigger audit log entry (who accessed what credential and when)
- Keyboard shortcuts supported (Ctrl/Cmd+C to copy focused credential)

**US4.5: Credential Access Logging**
- **As a** founder
- **I want** all credential access tracked in audit logs
- **So that** I can monitor who accessed sensitive data

**Acceptance Criteria**:
- Every credential reveal/copy action creates audit log entry
- Log entry includes: timestamp, user, action (reveal/copy), credential name, credential ID
- Credential detail view shows access history (last 50 accesses)
- Access history displays: date/time, user, action performed
- Export access logs to CSV functionality
- Security events (failed decryption attempts) logged separately

**US4.6: Credential Detail View**
- **As a** founder
- **I want** to view full credential details including access history
- **So that** I can see metadata and audit trail

**Acceptance Criteria**:
- Credential detail opens in side panel
- Displays all metadata: name, type, associated entity, URL, username, notes, created by, created date
- Value shown as masked with reveal/copy buttons
- Access history table shown (last 50 accesses)
- Edit button (opens edit form)
- Delete button (with confirmation dialog)
- Delete requires entering user password for confirmation (destructive action)

**US4.7: Secure Credential Sharing**
- **As a** founder
- **I want** to share specific credentials with team members
- **So that** they can access necessary credentials without revealing values in insecure channels

**Acceptance Criteria**:
- "Share" button on credential detail view
- Modal to select team members to share with
- Share action grants read access to selected users
- Shared credential appears in their credentials list (marked as "Shared with you")
- Share action logged in audit log
- Revoke share option available
- Shared credential inherits same security (reveal/copy with audit trail)

---

### Epic 5: Project Status & Health Tracking

**Epic Goal**: Implement milestone tracking, health scoring logic, status workflow management, and priority indicators for all projects.

**User Stories**:

**US5.1: Projects Data Model**
- **As a** developer
- **I want** a comprehensive project data model
- **So that** projects can be tracked with milestones and health metrics

**Acceptance Criteria**:
- Projects table created: id, name, description, creatorId, brandId, status, healthScore, priority, startDate, targetEndDate, actualEndDate, createdBy, createdAt, updatedAt
- Milestones table created: id, projectId, name, description, dueDate, completedDate, status, order
- ProjectStatusHistory table for tracking status changes
- Health score calculation logic defined (based on milestone completion %, overdue milestones, last activity)
- Priority levels defined (Low, Medium, High, Urgent)
- Status workflow defined (Planning, In Progress, On Hold, At Risk, Completed, Cancelled)

**US5.2: Projects List View**
- **As a** founder
- **I want** to see all projects in a list view
- **So that** I can monitor project status at a glance

**Acceptance Criteria**:
- Projects page created (`/crm/projects`)
- List view displays projects with columns: Project Name, Creator, Brand, Status, Health Score, Priority, Next Milestone, Actions
- Health score shown as colored indicator (green 80-100, yellow 50-79, red 0-49)
- Priority shown as badge (Urgent=red, High=orange, Medium=blue, Low=gray)
- Filter by status, priority, health score range
- Search by project name, creator, brand
- Sort by name, status, health score, priority, start date
- "Create Project" button available
- Click row opens project detail side panel

**US5.3: Create/Edit Project**
- **As a** founder
- **I want** to create new projects and edit existing ones
- **So that** I can track work for creator/brand relationships

**Acceptance Criteria**:
- "Create Project" button opens creation form
- Form fields: Name, Description, Creator (dropdown), Brand (dropdown), Status, Priority, Start Date, Target End Date
- Validation ensures required fields filled
- Creator and Brand dropdowns populated from database
- Save creates Project record
- Edit mode available from project detail view
- Status changes logged in ProjectStatusHistory
- Audit log entry created
- Success notification displayed

**US5.4: Milestone Management**
- **As a** founder
- **I want** to create and track milestones for each project
- **So that** I can monitor progress toward project goals

**Acceptance Criteria**:
- Project detail view has "Milestones" section
- List of milestones displayed with: Name, Due Date, Status (Not Started, In Progress, Completed, Overdue), Actions
- "Add Milestone" button opens inline creation form
- Milestone form: Name, Description, Due Date
- Milestones sortable by drag-and-drop to change order
- Check/uncheck milestone to mark complete
- Marking milestone complete records completedDate
- Overdue milestones highlighted in red
- Delete milestone option (with confirmation)
- Milestone completion updates project health score automatically

**US5.5: Health Score Calculation**
- **As a** founder
- **I want** projects to automatically calculate health scores
- **So that** I can identify at-risk projects quickly

**Acceptance Criteria**:
- Health score calculated using formula: `(completedMilestones / totalMilestones) * 70 + (overduePenalty) * 20 + (lastActivityBonus) * 10`
- Score ranges: 80-100 (Healthy/Green), 50-79 (Caution/Yellow), 0-49 (At Risk/Red)
- Overdue milestones decrease score (-5 per overdue milestone)
- Recent activity (within 7 days) increases score (+10)
- Health score recalculated whenever:
  - Milestone status changes
  - Project is updated
  - Daily automated check (cron job)
- Health score displayed as colored circle/badge in lists and detail views
- Health score history tracked for trending

**US5.6: Status Workflow Management**
- **As a** founder
- **I want** to update project status through a defined workflow
- **So that** project progression is tracked consistently

**Acceptance Criteria**:
- Status dropdown in project detail view
- Workflow states: Planning → In Progress → On Hold → At Risk → Completed / Cancelled
- Status transitions validated (e.g., can't go from Planning to Completed without In Progress)
- Status change triggers:
  - ProjectStatusHistory entry
  - Audit log entry
  - Email notification to project stakeholders (optional for MVP)
  - Health score recalculation
- Status shown with colored badge throughout UI
- Status change timestamp and user tracked
- Reason/notes field for status changes (especially On Hold, At Risk, Cancelled)

**US5.7: Priority Management**
- **As a** founder
- **I want** to set and update project priorities
- **So that** urgent work is highlighted

**Acceptance Criteria**:
- Priority dropdown in project detail view: Low, Medium, High, Urgent
- Priority can be changed at any time
- Priority change logged in audit trail
- Projects sorted by priority by default in list views (Urgent first)
- Priority badge shown in list views with color coding
- Filter by priority in project list
- High/Urgent projects highlighted in dashboard

**US5.8: Project Detail View**
- **As a** founder
- **I want** to see comprehensive project information in one view
- **So that** I can understand project status completely

**Acceptance Criteria**:
- Project detail side panel displays:
  - Header: Project name, status badge, health score, priority badge
  - Overview: Description, creator, brand, dates
  - Milestones section (with add/edit/complete functionality)
  - Activity timeline (status changes, milestone completions, notes)
  - Associated credentials (if any)
  - Edit/Delete buttons
- All sections collapsible/expandable
- Quick actions: Update Status, Add Milestone, Add Note, Generate Report
- Navigation links to related creator/brand records

---

### Epic 6: Studio Dashboard

**Epic Goal**: Create an intelligent command center dashboard displaying priority projects, risk alerts, health visualizations, and quick-action items for daily operational use.

**User Stories**:

**US6.1: Dashboard Layout & Overview**
- **As a** founder
- **I want** a comprehensive dashboard as my home page
- **So that** I can see all critical information at a glance when I log in

**Acceptance Criteria**:
- Dashboard page set as default after login (`/crm/dashboard`)
- Grid layout with widget sections: Key Metrics, Priority Projects, Risk Alerts, Health Overview, Recent Activity, Quick Actions
- Responsive layout adapts to screen size
- Clean, scannable design with clear visual hierarchy
- Refresh button to reload data
- Last updated timestamp displayed
- Loading states for all widgets

**US6.2: Key Metrics Widget**
- **As a** founder
- **I want** to see high-level metrics about my studio operations
- **So that** I understand overall portfolio health

**Acceptance Criteria**:
- Widget displays metric cards:
  - Total Active Creators (count + trend vs last month)
  - Total Active Brands (count + trend)
  - Active Projects (count + breakdown by status)
  - Average Health Score (number + trend)
  - Pending Applications (count)
  - Credentials Stored (count)
- Each metric clickable to navigate to relevant section
- Trends shown as percentage change with up/down indicator
- Color coding for concerning metrics (e.g., decreasing health score = red)

**US6.3: Priority Projects Widget**
- **As a** founder
- **I want** to see my highest priority projects prominently
- **So that** I focus on what matters most today

**Acceptance Criteria**:
- Widget displays top 10 priority projects (sorted by: Urgent first, then High, then health score)
- Each project row shows: Name, Creator, Health Score, Status, Next Milestone
- Click row opens project detail side panel
- Health scores color-coded (green/yellow/red)
- Urgent/High priority badges displayed
- Empty state if no priority projects: "All caught up! 🎉"
- "View All Projects" link at bottom

**US6.4: Risk Alerts Widget**
- **As a** founder
- **I want** automated risk alerts for concerning situations
- **So that** I can proactively address problems

**Acceptance Criteria**:
- Widget displays alerts for:
  - Projects with health score < 50 (At Risk)
  - Projects with overdue milestones (>7 days overdue)
  - Projects with no activity in 14+ days (Stale)
  - Credentials not accessed in 90+ days (Unused)
  - Failed login attempts (security)
- Each alert shows: Icon, Title, Description, Affected Entity, Action button
- Alerts sorted by severity (Critical, Warning, Info)
- Click alert navigates to relevant record
- Dismiss alert option (hides for 7 days)
- Alert count badge shown prominently
- Empty state if no alerts: "Everything looks good! 💚"

**US6.5: Health Overview Widget**
- **As a** founder
- **I want** visual health score distribution
- **So that** I can see portfolio health at a glance

**Acceptance Criteria**:
- Widget displays health score distribution chart (bar chart or donut chart)
- Categories: Healthy (80-100), Caution (50-79), At Risk (0-49)
- Shows count and percentage for each category
- Color-coded (green, yellow, red)
- Click category filters project list to that health range
- Trend indicator comparing to last month
- Average health score displayed prominently

**US6.6: Recent Activity Feed**
- **As a** founder
- **I want** to see recent system activity
- **So that** I stay informed about what's happening

**Acceptance Criteria**:
- Widget displays chronological activity feed (last 20 activities)
- Activity types included:
  - New application submitted
  - Creator/Brand created or updated
  - Project status changed
  - Milestone completed
  - Credential accessed
  - User logged in
- Each activity shows: Icon, Description, Timestamp (relative, e.g., "2 hours ago"), User
- Click activity navigates to related record
- Real-time updates (poll every 30 seconds or WebSocket)
- "View All Activity" link at bottom

**US6.7: Quick Actions Widget**
- **As a** founder
- **I want** one-click access to common tasks
- **So that** I can complete frequent operations quickly

**Acceptance Criteria**:
- Widget displays action buttons:
  - Add Creator
  - Add Brand
  - Create Project
  - Add Credential
  - Generate Deliverable
  - View Applications
  - View Audit Logs
- Each button opens relevant modal/page
- Button shows icon + label
- Recently used actions tracked and promoted to top
- Customizable action list (optional for MVP)

**US6.8: Dashboard Customization**
- **As a** founder
- **I want** to customize my dashboard layout
- **So that** I see what's most important to me

**Acceptance Criteria**:
- "Customize Dashboard" button in header
- Drag-and-drop to reorder widgets
- Show/hide widgets via toggle switches
- Widget size adjustments (small, medium, large)
- "Reset to Default" option
- Layout preferences saved per user in database
- Layout persists across sessions

---

### Epic 7: AI Deliverable Generator

**Epic Goal**: Build an AI-powered document generation system with template management, dual-provider fallback (Claude + OpenAI), and one-click automation leveraging application form and CRM data.

**User Stories**:

**US7.1: AI Provider Integration**
- **As a** developer
- **I want** to integrate both Anthropic Claude and OpenAI APIs
- **So that** the system can generate documents using AI

**Acceptance Criteria**:
- AI client abstraction layer created (`/packages/shared/ai-client.ts`)
- Anthropic Claude API integration (Claude 3.5 Sonnet)
- OpenAI API integration (GPT-4)
- Fallback logic: Try Claude first, fallback to OpenAI on failure
- Error handling for rate limits, API errors, network issues
- Retry logic with exponential backoff
- API keys stored in environment variables (ANTHROPIC_API_KEY, OPENAI_API_KEY)
- Usage tracking (tokens used, cost estimate, provider used)
- Timeout handling (30 seconds max per request)

**US7.2: AI Template Management**
- **As a** founder
- **I want** to create and manage AI prompt templates
- **So that** I can reuse effective prompts for different deliverable types

**Acceptance Criteria**:
- Templates page created (`/crm/deliverables/templates`)
- Template list view displays: Name, Type (Report, Proposal, Summary, Email, etc.), Last Used, Actions
- "Create Template" button opens template editor
- Template editor fields:
  - Name
  - Description
  - Deliverable Type
  - System Prompt (instructions for AI)
  - User Prompt Template (with variable placeholders like `{{creator.name}}`, `{{brand.name}}`, `{{project.description}}`)
  - Preferred AI Provider (Claude, OpenAI, or Auto)
  - Output Format (Markdown, Plain Text, HTML)
- Save template to database (AITemplates table)
- Edit/Delete template options
- Template preview functionality
- Clone template option

**US7.3: Data Context Builder**
- **As a** developer
- **I want** to automatically gather relevant context from the CRM
- **So that** AI has all necessary information to generate accurate deliverables

**Acceptance Criteria**:
- Context builder function that accepts: creator ID, brand ID, project ID
- Function queries database and assembles:
  - Creator profile (all fields from application form)
  - Brand profile (all fields)
  - Project details (status, milestones, health score)
  - Related credentials metadata (NOT actual values)
  - Recent activity history
- Context formatted as structured JSON or markdown
- Variable replacement system replaces placeholders in template with actual data
- Context preview shown to user before generation
- Character/token limit enforcement (stays within API limits)

**US7.4: Generate Deliverable (Single)**
- **As a** founder
- **I want** to generate a single deliverable using AI
- **So that** I can create documents quickly

**Acceptance Criteria**:
- "Generate Deliverable" page or modal accessible from dashboard/projects
- Step 1: Select template from dropdown
- Step 2: Select context (Creator, Brand, Project) - auto-populated if coming from detail view
- Step 3: Preview prompt with context filled in
- Step 4: Optional custom instructions text area
- "Generate" button starts AI request
- Loading indicator during generation (shows estimated time)
- Generated content displayed in preview panel
- Content editable before saving
- Save options: Download as file, Copy to clipboard, Save to project record
- Generation logged in audit trail (template used, provider used, tokens consumed)

**US7.5: Batch Deliverable Generation**
- **As a** founder
- **I want** to generate deliverables for multiple entities at once
- **So that** I can create reports for all creators/projects efficiently

**Acceptance Criteria**:
- Batch generation option on Templates list
- Select multiple creators/brands/projects
- Choose template to apply to all
- Confirm batch operation (shows count and estimated cost)
- Background job processes batch (queue system)
- Progress indicator shows completion status
- Notifications when batch complete
- Batch results page shows success/failure for each generation
- Download all generated deliverables as ZIP file
- Failed generations logged with error details

**US7.6: Deliverables Library**
- **As a** founder
- **I want** to view and manage all generated deliverables
- **So that** I can access past documents and track what was created

**Acceptance Criteria**:
- Deliverables page created (`/crm/deliverables`)
- List view displays: Title, Type, Created Date, Creator/Brand/Project, AI Provider Used, Actions
- Filter by type, date range, entity
- Search by title or content
- Click row to view full deliverable
- Deliverable detail shows: Content (rendered with formatting), metadata, generation parameters, edit history
- Actions: Download, Copy, Re-generate, Edit, Delete
- Edit mode allows manual content updates (tracked in edit history)
- Version history if re-generated multiple times

**US7.7: AI Provider Fallback & Monitoring**
- **As a** founder
- **I want** the system to automatically handle AI provider failures
- **So that** deliverable generation remains reliable

**Acceptance Criteria**:
- Primary provider (Claude) attempted first for all requests
- On failure (rate limit, error, timeout), automatically retry with secondary provider (OpenAI)
- Fallback logged in audit trail and deliverable metadata
- User notified if fallback occurred ("Generated using OpenAI (Claude unavailable)")
- Admin dashboard shows:
  - Provider usage statistics (% Claude vs OpenAI)
  - Success/failure rates per provider
  - Average response times
  - Total tokens consumed and estimated cost
  - Recent errors/failures
- Alert system for repeated provider failures

**US7.8: Template Marketplace (Seeded Templates)**
- **As a** founder
- **I want** pre-built templates for common deliverable types
- **So that** I can start generating content immediately without creating templates from scratch

**Acceptance Criteria**:
- Seed data includes 5-10 common templates:
  - Creator Onboarding Email
  - Monthly Progress Report
  - Brand Partnership Proposal
  - Project Status Summary
  - Content Strategy Document
  - Creator Performance Review
- Templates pre-configured with effective prompts
- Templates marked as "System Template" (read-only, can be cloned)
- Documentation for each template explaining use case
- User can clone system templates and customize

---

### Epic 8: Audit Logging & Security

**Epic Goal**: Implement comprehensive audit logging and access tracking across all operations to ensure security, compliance, and full transparency of system usage.

**User Stories**:

**US8.1: Comprehensive Audit Log System**
- **As a** developer
- **I want** a centralized audit logging system
- **So that** all sensitive operations are tracked automatically

**Acceptance Criteria**:
- AuditLogs table enhanced with fields: id, timestamp, userId, userName, action, entityType, entityId, entityName, details (JSON), ipAddress, userAgent, status
- Audit logger utility function created for easy logging throughout app
- All CRUD operations automatically logged via middleware
- Logged actions include:
  - User authentication (login, logout, failed attempts)
  - Creator/Brand create, update, delete
  - Project create, update, status changes
  - Credential create, access (reveal/copy), update, delete
  - Deliverable generation
  - Template create, update, delete
  - User management actions
  - Settings changes
- Sensitive data never logged (passwords, credential values)
- Background cleanup job removes logs older than 1 year (configurable)

**US8.2: Audit Log Viewer**
- **As a** founder
- **I want** to view audit logs with advanced filtering
- **So that** I can review system activity and investigate issues

**Acceptance Criteria**:
- Audit Logs page created (`/crm/audit-logs`)
- Table view displays: Timestamp, User, Action, Entity Type, Entity Name, Status, Details button
- Advanced filters:
  - Date range (last 7 days, last 30 days, last 90 days, custom range)
  - User (dropdown of all users)
  - Action type (dropdown of all logged actions)
  - Entity type (Creator, Brand, Project, Credential, etc.)
  - Status (Success, Failed, Warning)
- Search by entity name or description
- Sort by timestamp (newest first by default)
- Pagination (100 logs per page)
- Click row to expand and show full details (JSON formatted)
- Export logs to CSV (respects current filters)

**US8.3: Security Event Monitoring**
- **As a** founder
- **I want** specific security events highlighted
- **So that** I can identify potential security issues quickly

**Acceptance Criteria**:
- Security Events filter/tab in Audit Logs page
- Security events include:
  - Failed login attempts (3+ failures from same IP)
  - Credential access outside business hours (configurable)
  - Bulk data export operations
  - User role changes
  - Permission changes
  - Password changes
  - Multiple concurrent sessions from different IPs
  - Unusual API usage patterns
- Security events tagged with severity (Critical, High, Medium, Low)
- Dashboard widget shows security event count (last 7 days)
- Email alerts for critical security events (optional for MVP)
- Security events never expire (permanent retention)

**US8.4: User Activity Tracking**
- **As a** founder
- **I want** to see detailed activity for specific users
- **So that** I can review what team members have done

**Acceptance Criteria**:
- User detail view includes "Activity History" tab
- Activity timeline shows all actions by that user (chronological)
- Timeline grouped by day
- Each activity shows: Time, Action, Entity, Result
- Filter user activity by action type or date range
- Total activity count displayed
- Most active hours/days visualization (optional)
- Export user activity to CSV

**US8.5: Entity Change History**
- **As a** founder
- **I want** to see full change history for creators, brands, and projects
- **So that** I can understand how records evolved over time

**Acceptance Criteria**:
- Creator/Brand/Project detail views include "History" or "Activity" tab
- Change history shows:
  - What changed (field name)
  - Old value → New value
  - Who made the change
  - When change occurred
- Status changes highlighted (visual timeline)
- Milestone completions shown in project history
- Credential access events shown in creator/brand history (if linked)
- Revert changes option (for admins only) - creates new audit entry

**US8.6: Audit Log Search & Analysis**
- **As a** founder
- **I want** advanced search and analysis tools for audit logs
- **So that** I can investigate complex scenarios and patterns

**Acceptance Criteria**:
- Global search bar in Audit Logs page
- Search supports:
  - Keyword search across all log fields
  - Date range queries
  - User-specific queries
  - Entity-specific queries (e.g., "all actions on Project X")
- Saved search filters (user can save frequently used filter combinations)
- Audit log analytics dashboard:
  - Most active users (by action count)
  - Most accessed entities
  - Action type distribution (pie chart)
  - Activity heatmap (by day/hour)
  - Trend analysis (activity over time)
- Export query results to CSV/JSON

**US8.7: Compliance & Retention Policies**
- **As a** founder
- **I want** configurable retention policies for audit logs
- **So that** I comply with data regulations while managing storage costs

**Acceptance Criteria**:
- Settings page includes "Audit Log Retention" section
- Configurable retention periods:
  - Standard logs: 90 days, 180 days, 1 year, 2 years, Forever
  - Security events: 1 year minimum (configurable up to Forever)
  - Credential access logs: 2 years minimum (compliance requirement)
- Automated cleanup job runs daily
- Deleted logs exported to archive before deletion (CSV format)
- Archive files stored securely (encrypted)
- Admin notification before bulk log deletion
- Retention policy changes logged in audit trail

**US8.8: Real-Time Activity Feed**
- **As a** founder
- **I want** to see live activity happening in the system
- **So that** I can monitor real-time usage

**Acceptance Criteria**:
- "Live Activity" widget on dashboard
- Shows last 10 activities in real-time (updates every 5 seconds or via WebSocket)
- Activities displayed: User, Action, Entity, Time (seconds ago)
- Visual indicator for new activities (brief highlight animation)
- Filter live feed by action type
- Pause live updates button
- Click activity opens full audit log entry
- Option to expand to full-page live activity view

---

## Summary

This PRD defines **8 sequential epics** with **73 user stories total** that deliver the complete Studio OS MVP. Each epic builds upon the previous, delivering deployable value while maintaining a clear path to the complete MVP.

The system will be built using:
- **Frontend**: Next.js 14+ (App Router) with React 18+, Tailwind CSS, shadcn/ui
- **Backend**: Next.js API routes with Prisma ORM
- **Database**: PostgreSQL 15+ (hosted on Supabase or Neon)
- **Authentication**: NextAuth.js v5 with credentials provider
- **AI Integration**: Anthropic Claude (primary) + OpenAI GPT-4 (fallback)
- **Hosting**: Vercel
- **Repository**: Monorepo structure with workspace management

All functional requirements (FR1-FR27) and non-functional requirements (NFR1-NFR18) are addressed across the user stories, ensuring comprehensive coverage of the project brief's MVP scope.

---

**Next Steps:**
1. Save this PRD to `docs/prd.md` in your project
2. Proceed to UX Expert for frontend specification
3. Architect will create system architecture
4. Product Owner will validate all documents
5. Begin development with Epic 1

**BMAD Workflow Stage:** PRD Complete → Ready for UX Expert
