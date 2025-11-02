# Animation & Micro-interactions

## Motion Principles

Studio OS uses motion purposefully to:
1. **Provide Feedback:** Confirm user actions (button clicks, saves, copies)
2. **Guide Attention:** Draw focus to important changes (new alerts, score updates)
3. **Show Relationships:** Connect related elements (parent-child, cause-effect)
4. **Reduce Cognitive Load:** Smooth transitions maintain context and orientation

**Constraints:**
- Respect `prefers-reduced-motion` media query (disable decorative animations)
- Keep animations fast (150-300ms for most transitions)
- Never block user actions with animations
- Use easing curves that feel natural (ease-in-out for most, ease-out for entrances)

## Key Animations

- **Button Click:** Scale down to 0.95, duration 100ms, ease-in-out - Tactile feedback for all button interactions
  
- **Card Hover:** Elevation increase (shadow depth), subtle lift (2px translateY), duration 200ms, ease-out - Makes cards feel interactive and inviting

- **Side Panel Entrance:** Slide from right with backdrop fade-in, duration 300ms, ease-out - Smooth context preservation when opening details

- **Toast Notification:** Slide up from bottom-right, auto-dismiss after 4s with fade-out, duration 250ms, ease-out - Non-intrusive success/error feedback

- **Health Score Update:** Pulse effect (scale 1 → 1.1 → 1), color transition to new status, duration 400ms, ease-in-out - Draws attention to important metric changes

- **Credential Reveal:** Fade-in of actual value with shimmer effect, countdown timer animates, duration 300ms, ease-in - Makes security interaction feel intentional

- **Loading States:** Skeleton screens with shimmer wave (2s loop), progress bars with indeterminate animation - Reduces perceived wait time

- **Priority Flag Change:** Bounce effect when priority increases, subtle shake when decreases, duration 300ms, ease-out - Reinforces importance of priority changes

- **Search Results Appear:** Staggered fade-in from top (50ms delay between items), duration 200ms each, ease-out - Makes result appearance feel snappy

- **Audit Log Live Update:** Brief highlight flash (yellow background fade-in/out), duration 800ms, ease-in-out - Draws attention to new entries in real-time feed

---
