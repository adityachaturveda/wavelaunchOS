# Information Architecture (IA)

## Site Map / Screen Inventory

```mermaid
graph TD
    A[Login] --> B[Studio Dashboard]
    
    B --> C[CRM Section]
    C --> C1[Creators List]
    C --> C2[Brands List]
    C --> C3[Projects List]
    C1 --> C1a[Creator Detail]
    C2 --> C2a[Brand Detail]
    C3 --> C3a[Project Detail]
    
    B --> D[Credential Vault]
    D --> D1[All Credentials]
    D --> D2[Recent Access Log]
    D --> D3[Shared Credentials]
    
    B --> E[AI Deliverables]
    E --> E1[Generate New]
    E --> E2[Templates Library]
    E --> E3[Generated Assets]
    
    B --> F[Audit & Security]
    F --> F1[Audit Logs]
    F --> F2[Security Events]
    F --> F3[User Activity]
    
    B --> G[Settings]
    G --> G1[User Profile]
    G --> G2[Team Management]
    G --> G3[System Settings]
    
    H[External: Application Form] -.->|Submits to| C1
```

## Navigation Structure

**Primary Navigation:** 
Fixed left sidebar (collapsible) with icon + label navigation:
- Studio Dashboard (home icon)
- CRM (database icon)
- Credential Vault (lock icon)
- AI Deliverables (sparkles icon)
- Audit & Security (shield icon)
- Settings (gear icon)

Active section highlighted with accent color bar and background tint.

**Secondary Navigation:**
Contextual tab navigation appears in main content area when viewing detail screens:
- Creator Detail: Overview | Projects | History | Activity
- Brand Detail: Overview | Creators | Projects | Credentials | History
- Project Detail: Overview | Milestones | Deliverables | Team | History

**Breadcrumb Strategy:**
Breadcrumbs appear at top of main content area for deep navigation:
- Format: Section > Subsection > Current Item
- Example: CRM > Brands > "Creator Brand Name" > Project Details
- Each segment is clickable to navigate up hierarchy

**Global Elements:**
- **Header Bar:** Logo, Global Search, Quick Actions, User Menu, Notifications
- **Command Palette:** Accessible via Cmd/Ctrl+K for keyboard-first navigation

---
