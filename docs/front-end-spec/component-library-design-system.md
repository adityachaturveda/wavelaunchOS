# Component Library / Design System

**Design System Approach:** 
Build custom design system using shadcn/ui as foundation, extended with Studio OS-specific components. Prioritize consistency, reusability, and accessibility (WCAG 2.1 AA minimum).

## Core Components

### Component: Health Score Badge

**Purpose:** Visual indicator of project health displayed throughout application

**Variants:**
- Size: Small (16px), Medium (24px), Large (32px)
- Status: Healthy (green), At Risk (yellow), Critical (red), Unknown (gray)
- Style: Filled circle, Outlined circle, Filled pill, Outlined pill

**States:**
- Default: Static display
- Hover: Shows tooltip with breakdown (e.g., "72% - Good milestone completion")
- Active/Clicked: Expands to show detailed health factors
- Loading: Animated pulse while calculating

**Usage Guidelines:**
- Always include numeric score (0-100) alongside color
- Pair with text label for accessibility
- Use pill variant when space allows for context (e.g., "Health: 72% Good")
- Never use color alone to convey status

### Component: Credential Card

**Purpose:** Secure display container for sensitive credentials with reveal/copy/share actions

**Variants:**
- Compact: Icon, name, masked value, copy button only
- Standard: + Type badge, associated entity link, last accessed
- Expanded: + Access history, share status, edit/delete actions

**States:**
- Masked (default): Value shown as •••••••• or *******
- Revealed: Actual value visible with 30s countdown timer
- Copied: Brief visual feedback (green checkmark, toast notification)
- Shared: Indicator showing "Shared with 3 team members"
- Disabled: Grayed out if user lacks access permission

**Usage Guidelines:**
- Default to masked state always
- Reveal requires explicit user action (click eye icon)
- Auto-mask after timeout with prominent countdown
- Log every reveal/copy action
- Never allow credentials in clipboard longer than 60 seconds

### Component: Priority Flag

**Purpose:** Visual indicator to mark high-priority items across projects, tasks, and entities

**Variants:**
- P0 (Critical): Red flag, "Urgent" label
- P1 (High): Orange flag, "High Priority"
- P2 (Medium): Yellow flag, "Medium Priority"  
- P3 (Low): Blue flag, "Low Priority"
- None: No flag

**States:**
- Static display
- Editable: Dropdown to change priority level
- Hover: Shows tooltip with priority details and last updated

**Usage Guidelines:**
- Limit P0 usage to truly urgent items only
- Always show in consistent location (top-right of cards/rows)
- Allow quick priority changes via dropdown
- Log priority changes in audit trail

### Component: Action Button Group

**Purpose:** Consistent button grouping for primary/secondary actions in panels and modals

**Variants:**
- Two-button: Primary (filled) + Secondary (outlined)
- Three-button: Primary + Secondary + Destructive (red outlined)
- Split: Primary with dropdown for additional actions

**States:**
- Default
- Hover (elevation increase)
- Active (pressed state)
- Loading (spinner replaces text)
- Disabled (grayed out, not clickable)

**Usage Guidelines:**
- Primary action always on right (Western reading pattern)
- Destructive actions require confirmation modal
- Loading state maintains button width (no layout shift)
- Keyboard: Tab navigation, Enter/Space to activate

### Component: Side Panel

**Purpose:** Context-preserving detail view that slides in from right side of screen

**Variants:**
- Narrow (400px): Quick views, simple forms
- Medium (600px): Standard detail views
- Wide (800px): Complex forms, multi-column content

**States:**
- Hidden (off-screen right)
- Sliding In (animated entrance)
- Open (fully visible with backdrop)
- Sliding Out (animated exit)

**Usage Guidelines:**
- Use for detail views to avoid full-page navigation
- Include close button (X) in top-right
- Click backdrop to close (with confirmation if unsaved changes)
- Keyboard: Escape to close, Tab trap within panel
- Stack multiple panels if needed (breadcrumb trail at top)

### Component: Status Badge

**Purpose:** Indicate current status of projects, creators, brands, and workflows

**Variants:**
- Draft (gray): Initial state, incomplete
- Active (green): Currently operational
- Pending (yellow): Awaiting action/approval
- Paused (blue): Temporarily inactive
- Completed (green checkmark): Finished successfully
- Archived (gray strikethrough): Historical record

**States:**
- Static display
- Editable (dropdown to change status)
- Transitioning (brief animation on status change)

**Usage Guidelines:**
- Always use consistent color mapping
- Include icon alongside text for quick scanning
- Allow status changes with workflow validation
- Log all status changes with timestamp and user

### Component: Search Palette (Command Palette)

**Purpose:** Keyboard-first global search and navigation interface

**Variants:**
- Full (all entity types searchable)
- Scoped (limited to current section)

**States:**
- Hidden (activated by Cmd/Ctrl+K)
- Open (modal overlay with search input focused)
- Searching (loading spinner during query)
- Results Displayed (grouped by entity type)
- Empty State ("No results found")

**Usage Guidelines:**
- Always accessible via keyboard shortcut
- Search across all entity types (Creators, Brands, Projects, Credentials)
- Show recent searches and frequent items
- Support fuzzy matching
- Navigate results with arrow keys, Enter to select
- Escape to close

---
