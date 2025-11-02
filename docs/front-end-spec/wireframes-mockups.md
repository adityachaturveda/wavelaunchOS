# Wireframes & Mockups

**Primary Design Files:** To be created in Figma after specification approval

## Key Screen Layouts

### Screen: Studio Dashboard

**Purpose:** Central command center providing at-a-glance visibility into all priority items, health scores, and recent activity

**Key Elements:**
- **Header Bar:** Global search (prominent), quick action buttons (+ New Creator/Brand/Project, Generate Deliverable), notifications bell, user avatar menu
- **Priority Projects Widget (Top Left, 40% width):** 
  - Card-based layout showing 5-8 priority projects
  - Each card: Brand name, health score badge, last updated, primary action button
  - Sort/filter controls: Priority, Health, Last Updated
- **Health Score Summary (Top Right, 30% width):**
  - Donut chart showing distribution (Healthy/At Risk/Critical)
  - Total project count
  - Trend indicator (↑↓ vs last week)
- **Risk Alerts (Middle, Full Width):**
  - Horizontal timeline of critical items requiring attention
  - Color-coded by severity (red > yellow > blue)
  - Click to expand inline
- **Recent Activity Feed (Bottom Left, 40% width):**
  - Live activity widget (last 10 actions)
  - User avatar, action description, timestamp
  - Real-time updates with subtle animation
- **Quick Actions (Bottom Right, 30% width):**
  - Large button tiles for common operations
  - "Add Creator", "Access Vault", "Generate Report", "View All Projects"

**Interaction Notes:**
- Dashboard widgets are drag-and-drop repositionable (saved per user)
- All widgets support expand/collapse state
- Keyboard shortcut hints on hover
- Clicking health score badge opens project detail side panel without navigation

**Design File Reference:** [To be created: Dashboard Overview frame]

### Screen: Creator Detail

**Purpose:** Comprehensive view of a single creator with all associated brands, projects, and activity history

**Key Elements:**
- **Hero Section:**
  - Creator avatar (uploaded or generated initials)
  - Name (editable inline)
  - Application submission date
  - Status badge (Active, Inactive, Pending)
  - Quick actions: Edit, Archive, Export, Generate Brief
- **Tab Navigation:**
  - Overview | Projects | Linked Brands | Activity History
- **Overview Tab:**
  - Creator Bio (from application form)
  - Contact Information (email, phone, social handles)
  - Key Stats: Total brands, active projects, generated deliverables
  - Application Form Responses (expandable sections)
  - Custom Fields (user-defined key-value pairs)
- **Projects Tab:**
  - Table view: Project Name, Brand, Status, Health, Last Updated
  - Click row to open project detail side panel
- **Linked Brands Tab:**
  - Card grid of associated brands
  - Show relationship type and date established
- **Activity History Tab:**
  - Timeline view of all actions related to this creator
  - Filterable by action type and date range

**Interaction Notes:**
- Breadcrumbs: CRM > Creators > [Creator Name]
- Side panel opens on right for related entities (no full-page navigation)
- All editable fields save on blur with visual confirmation
- Export button generates PDF creator summary

**Design File Reference:** [To be created: Creator Detail frames]

### Screen: Credential Vault

**Purpose:** Secure storage and access interface for sensitive credentials with comprehensive audit logging

**Key Elements:**
- **Header Section:**
  - Search bar (filter by name, type, associated entity)
  - Filter pills: Type (Password, API Key, Token), Associated With (Creator, Brand, Project)
  - Add Credential button (primary CTA)
- **Credential Grid (Default View):**
  - Card-based layout (3 columns on desktop)
  - Each card: 
    - Credential name (bold)
    - Type icon (lock, key, token)
    - Associated entity (clickable link)
    - Masked value (••••••••)
    - Action buttons: Reveal (eye icon), Copy (clipboard icon), Share (person icon)
    - Last accessed timestamp
- **Credential Detail Modal (On Click):**
  - Full credential information
  - Created date, creator user
  - Access history (last 10 accesses)
  - Share status (who has access)
  - Edit/Delete options
- **Add/Edit Credential Modal:**
  - Form: Name, Type, Value, Associated Entity, Access Level
  - Encryption indicator (always encrypted at rest)
  - Share with team members (multi-select)

**Interaction Notes:**
- Clicking "Reveal" shows value for 30 seconds with countdown animation
- "Copy" provides toast feedback and auto-clears clipboard after 60 seconds
- All actions immediately logged to audit trail
- Hover on credential card shows quick preview (no reveal required)
- Keyboard shortcut: Cmd/Ctrl+K to search vault

**Design File Reference:** [To be created: Credential Vault frames]

### Screen: AI Deliverable Generator

**Purpose:** Template-based interface for generating customized documents using AI with project context

**Key Elements:**
- **Step 1: Template Selection:**
  - Grid of template cards (filterable by category)
  - Each card: Template name, preview thumbnail, description, "Use Template" button
  - "Create New Template" prominent option
- **Step 2: Data Source Selection:**
  - Dropdown/autocomplete: "Select Creator, Brand, or Project"
  - Preview of available data fields from selection
  - Option to manually add context (text area)
- **Step 3: Prompt Customization (Optional):**
  - Base template prompt (read-only, expandable)
  - Additional instructions field (optional user input)
  - Variable tags visible (e.g., {{creator_name}}, {{brand_description}})
- **Step 4: Generation:**
  - Large "Generate Deliverable" button
  - Loading state (progress bar + "Generating..." message)
  - Estimated time (5-15 seconds)
- **Step 5: Review & Download:**
  - Split view: Original prompt (left) | Generated output (right)
  - Markdown preview with formatting
  - Action buttons: Regenerate, Edit, Download (PDF/MD), Save to Project
  - Version history (if regenerated multiple times)

**Interaction Notes:**
- Entire flow in single-page wizard with progress indicator
- Can exit at any step with "Save Draft" option
- Templates organized by category (Proposals, Reports, Briefs, Updates)
- Smart suggestions based on project stage
- Generated documents auto-saved to project deliverables

**Design File Reference:** [To be created: AI Generator flow frames]

### Screen: Audit Logs

**Purpose:** Comprehensive searchable log of all system activities for security compliance and troubleshooting

**Key Elements:**
- **Filter Bar (Sticky Top):**
  - Date range picker (presets: Today, Last 7 days, Last 30 days, Custom)
  - User dropdown (All Users + individual selection)
  - Action type dropdown (multi-select)
  - Entity type dropdown (Creator, Brand, Project, Credential, etc.)
  - Status chips (Success, Failed, Warning)
  - Search input (free text across all fields)
  - Export button (CSV with current filters applied)
- **Results Table:**
  - Columns: Timestamp, User, Action, Entity Type, Entity Name, Status, Details (expandable)
  - Sort by any column
  - Row expansion shows JSON formatted details
  - Color-coded status: Green (success), Red (failed), Yellow (warning)
  - Pagination: 100 logs per page
- **Security Events Tab:**
  - Special filtered view of security-relevant events
  - Severity indicators (Critical, High, Medium, Low)
  - Highlighted rows for critical events
  - Quick filter for common patterns (failed logins, unusual access times)
- **Analytics Widget (Top Right):**
  - Most active users (bar chart)
  - Action distribution (pie chart)
  - Activity heatmap (day/hour grid)

**Interaction Notes:**
- Filters persist across sessions (saved in localStorage)
- "Saved Searches" feature for frequently used filter combinations
- Click any entity name to jump to that entity's detail view
- Real-time updates (new logs appear with brief highlight animation)
- Keyboard navigation: Arrow keys to move between rows, Enter to expand

**Design File Reference:** [To be created: Audit Logs frames]

---
