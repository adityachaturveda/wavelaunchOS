# Responsiveness Strategy

## Breakpoints

| Breakpoint | Min Width | Max Width | Target Devices | Priority |
|------------|-----------|-----------|----------------|----------|
| Mobile | 320px | 767px | Phones, small tablets | Medium |
| Tablet | 768px | 1279px | Tablets, small laptops | Low |
| Desktop | 1280px | 1919px | Standard desktops, laptops | **High** |
| Wide | 1920px | - | Large monitors, ultrawide displays | Medium |

**Note:** Studio OS is primarily a desktop application for founders/team members. Mobile support is **secondary** but required for on-the-go credential access and status checks.

## Adaptation Patterns

**Layout Changes:**

**Desktop (Primary):**
- Fixed left sidebar (240px width, collapsible to 64px icon-only)
- Main content area uses full remaining width
- Two-column layouts for dashboard widgets (60/40 split)
- Side panels slide in from right (400-800px width)
- Modals centered with max-width 600px

**Tablet:**
- Sidebar auto-collapses to icon-only (64px)
- Single-column dashboard widgets (stacked vertically)
- Side panels expand to 90% screen width
- Tables adapt to card view for better mobile scanning

**Mobile:**
- Bottom tab bar navigation (replaces left sidebar)
- Full-width single-column layout throughout
- Side panels become full-screen modals
- Tables convert to stacked cards with swipeable rows
- Global search becomes dedicated search page

**Navigation Changes:**

**Desktop:** Fixed left sidebar with expanded labels  
**Tablet:** Collapsible sidebar, hamburger menu  
**Mobile:** Bottom tab bar (5 primary sections), hamburger for secondary nav

**Content Priority:**

**Desktop:** Show all data, utilize screen real estate fully  
**Tablet:** Hide secondary metadata, focus on primary info  
**Mobile:** Progressive disclosure - show essentials, tap to expand details

**Key Content Priorities (Mobile):**
1. Health scores and status indicators (always visible)
2. Primary actions (prominent buttons)
3. Search and navigation
4. Secondary metadata (expandable sections)
5. Audit logs and detailed history (linked to dedicated pages)

**Interaction Changes:**

**Desktop:**
- Hover states on interactive elements
- Right-click context menus (optional)
- Keyboard shortcuts (extensive support)
- Double-click to edit inline

**Tablet:**
- Touch-optimized (larger targets)
- Long-press for context menus
- Reduced keyboard shortcut reliance
- Single-tap to edit

**Mobile:**
- Touch-exclusive (44px minimum targets)
- Swipe gestures (swipe row to reveal actions)
- Bottom sheet modals (easier thumb reach)
- Pull-to-refresh on lists

---
