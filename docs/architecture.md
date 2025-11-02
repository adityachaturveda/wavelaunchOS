# Studio OS Frontend Architecture Document

## Change Log

| Date             | Version | Description                                                       | Author  |
| ---------------- | ------- | ----------------------------------------------------------------- | ------- |
| October 29, 2025 | 1.0     | Initial Frontend Architecture                                     | Winston |
| October 30, 2025 | 1.1     | Added shadcn/ui integration and external component strategy       | [Edited] |

## 1. Overview

Defines the technical frontend architecture for Studio OS, a secure internal web application for managing creator brands, credentials, and workflows at Wavelaunch Studio.

- **Security-First**
- **Founder-Centric Workflows**
- **AI-Powered Automation**
- **Performance Reliability**

## 2. Key Architectural Decisions

| Category          | Technology           | Version | Purpose / Rationale                                                  |
| ----------------- | -------------------- | ------- | -------------------------------------------------------------------- |
| Framework         | Next.js (App Router) | 14.2    | SSR/SSG, built-in routing, top performance                           |
| UI Library        | React                | 18.3    | Component-based, great for state management                          |
| Component Library | shadcn/ui            | Latest  | Extensible, accessible, customizable. See section below               |
| Styling           | Tailwind CSS         | 3.4     | Utility CSS, design tokens                                           |
| State             | Zustand, Context API | 4.5     | Hybrid global/local state                                            |
| Auth              | NextAuth.js          | 5.0-beta| Secure session management                                            |
| Validation        | Zod                  | 3.22    | Type-safe schemas, matches React Hook Form                           |
| ...               | ...                  | ...     | ...                                                                  |

## 3. Component Library & UI Strategy

### 3.1 shadcn/ui Integration

- **Primary component source:** [shadcn/ui](https://ui.shadcn.com/)
- **Installation:**

  ```bash
  npx shadcn-ui@latest init
  ```

- **Component management:**
  - Pull external UI primitives using:

    ```bash
    npx shadcn-ui@latest add <component>
    ```

    *e.g.*, `npx shadcn-ui@latest add button card dialog table`
  - All shadcn/ui components are placed in:

    ```text
    components/ui/
    ```

  - Once added, components are editable source code, not npm package abstractions.

- **Built on:**
  - [Radix UI primitives (accessibility first)](https://www.radix-ui.com/)
  - [Tailwind CSS](https://tailwindcss.com/) for styling

- **Customization:**
  - You may freely edit, extend, or theme any component after adding it.
  - Use the `cn()` utility in `lib/utils.ts` or `lib/utils/cn.ts` for class merging, following project pattern.

- **Why shadcn/ui:**
  - External component library reduces UI/UX debt.
  - Components follow the most current UX best practices and accessibility standards.
  - All components are open code—AI and humans can fully customize and understand them.

### 3.2 Custom/Third-party Components

- When project requirements exceed shadcn/ui scope:
  - Evaluate other Tailwind-compatible libraries (e.g., Headless UI, Lucide icons).
  - Add as per project needs, documented with rationale in `front-end-spec.md`.

## 4. Project Structure (relevant parts)

- `components/ui/` — All shadcn/ui primitives and variants live here.
- `components/shared/` — Cross-feature reusable components.
- Reference [Radix UI](https://www.radix-ui.com/) docs for advanced usage.

## 5. Component Usage Guide

1. When creating a new UI primitive:
   - Always check shadcn/ui catalog first.
   - If present, pull with `npx shadcn-ui@latest add <component>` and customize as needed.
2. For all major reusable elements (button, input, dialog, toast, etc.):
   - Use shadcn/ui as system of record.
   - All styling via Tailwind.
3. Feature-specific components should compose primitives from `components/ui/`.
4. Do **not** pull generic components from npm unless not available in shadcn/ui and justified with rationale.

## 6. Implementation Steps (Quick Reference)

```bash
# 1. Initialize shadcn/ui (if not already done)
npx shadcn@latest init

# 2. Add required components
npx shadcn-ui@latest add button card dialog table ...

# 3. Use as regular React components and customize source as needed
```

## 7. Sample Component Use

```tsx
import { Button } from "@/components/ui/button";

export default function Example() {
  return (
    <Button variant="default">
      Click me!
    </Button>
  );
}
```

Customization is allowed (see component code in `/components/ui/button.tsx`).

## 8. Key References

- **shadcn/ui**: https://ui.shadcn.com/
- **Radix UI**: https://www.radix-ui.com/
- **Tailwind CSS**: https://tailwindcss.com/

*This document aligns with the BMAD Method and is designed for easy AI and developer consumption. The "component library" section is now explicit for both human and AI agents to minimize confusion and rework.*