---
project_name: 'music-theory'
user_name: 'Steve'
date: '2026-01-10'
sections_completed: ['technology_stack', 'implementation_rules']
existing_patterns_found: 0
---

# Project Context for AI Agents

_This file contains critical rules and patterns that AI agents must follow when implementing code in this project. Focus on unobvious details that agents might otherwise miss._

---

## Technology Stack & Versions

- **Language:** TypeScript ^5.9.3 (Strict Mode required)
- **Runtime:** Node.js (Latest LTS recommended)
- **Package Manager:** npm
- **Testing:**
  - **Unit/Integration:** Vitest ^4.0.16 (Preferred over Jest)
  - **Library:** React Testing Library ^16.3.1
  - **Coverage:** @vitest/coverage-v8 ^4.0.16
- **Documentation:**
  - **API:** TypeDoc ^0.28.15
  - **Standard:** JSDoc ^4.0.5
- **Quality:**
  - **Linting:** ESLint ^9.39.2 (Flat config)
  - **Security:** Semgrep

## Critical Implementation Rules

### Language-Specific Rules (TypeScript)
- **Strict Typing:** `any` is strictly forbidden. Use `unknown` or distinct interfaces.
- **Async Patterns:** Always use `async/await` over raw Promises. Handle errors with `try/catch` blocks at the entry point or service layer.
- **Interfaces:** Prefix interfaces with `I` (e.g., `IUser`) is **forbidden**. Use clear names like `UserConfig` or `UserProfile`.
- **Exports:** Prefer named exports over default exports to simplify refactoring.

### Framework-Specific Rules (React)
- **Hooks:** Use custom hooks for logic reuse. Never put business logic inside the component render function.
- **Components:** Functional components only. Use `React.FC` typing is optional but props must be typed.
- **State Management:** Local state with `useState` for UI. Context API for global theme/auth. Avoid Redux unless complex state coordination is required (prefer Zustand/Jotai for simpler global state if needed).
- **Performance:** Memoize expensive calculations with `useMemo` and callbacks passed to children with `useCallback`.

### Testing Rules (Vitest)
- **Pattern:** `describe` block for the unit, `it` for the test case.
- **Mocking:** Use `vi.mock()` for external modules. Reset mocks in `beforeEach`.
- **DOM Testing:** Use user-event (`userEvent.setup()`) over `fireEvent` for more realistic interactions.
- **Structure:** Co-locate tests with components (e.g., `Button.tsx` -> `Button.test.tsx`).

### Code Quality & Style Rules
- **Naming:** PascalCase for Components/Classes, camelCase for functions/variables.
- **Comments:** JSDoc for all exported functions explaining *why*, not *what*.
- **Linting:** No console logs in production code (warn/error allowed in dev).

### Critical Don't-Miss Rules
- 🛑 **No Hardcoded Strings:** All user-facing text must be separated (prepare for i18n/localization).
- 🛑 **No Inline Styles:** Use CSS modules or Tailwind utility classes.
- 🛑 **Accessibility:** All interactive elements must have `aria-label` if no text is present.
