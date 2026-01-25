# Testing Guide for Music Theory Application

## Overview

This project uses a multi-layered testing strategy to ensure code quality and prevent regressions:

- **Unit Tests** (Vitest) - Test individual functions and components
- **Integration Tests** (Vitest + React Testing Library) - Test component interactions
- **E2E Tests** (Playwright) - Test complete user flows in a real browser

## Running Tests Locally

### Unit & Integration Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm run test:coverage

# Run tests with UI
npm run test:ui
```

### E2E Tests

```bash
# Run E2E tests (headless)
npm run test:e2e

# Run E2E tests with UI
npm run test:e2e:ui

# Run E2E tests in headed mode (see browser)
npm run test:e2e:headed
```

## Writing Tests

### Unit Tests

Unit tests should test pure functions and business logic in isolation.

**Location**: Place tests next to the file being tested (`*.test.ts` or `*.test.tsx`)

**Example**: Testing music math utilities

```typescript
// src/utils/music-math.test.ts
import { describe, it, expect } from 'vitest'
import { noteToMidi, midiToNote } from './music-math'

describe('music-math', () => {
  describe('noteToMidi', () => {
    it('converts C4 to MIDI 60', () => {
      expect(noteToMidi('C4')).toBe(60)
    })

    it('converts A4 to MIDI 69', () => {
      expect(noteToMidi('A4')).toBe(69)
    })
  })
})
```

### Integration Tests

Integration tests verify that components work together correctly.

**Location**: `tests/integration/` directory

**Example**: Testing quiz component with progress store

```typescript
// tests/integration/QuizFlow.test.tsx
import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { InlineQuiz } from '@/components/theory/InlineQuiz'
import { useProgressStore } from '@/stores/useProgressStore'

describe('Quiz Flow Integration', () => {
  beforeEach(() => {
    useProgressStore.setState({ totalXP: 0 })
  })

  it('awards XP on correct answer', async () => {
    render(<InlineQuiz question="What is C?" correctAnswer="C" />)

    // Simulate answering
    // ... test logic

    expect(useProgressStore.getState().totalXP).toBeGreaterThan(0)
  })
})
```

### E2E Tests

E2E tests verify complete user flows in a real browser environment.

**Location**: `e2e/` directory

**Best Practice**: Use Page Object Models to encapsulate page interactions

```typescript
// e2e/profile.spec.ts
import { test, expect } from '@playwright/test'
import { ProfilePage } from './pages/ProfilePage'

test('displays updated XP after completing lesson', async ({ page }) => {
  const profile = new ProfilePage(page)

  await profile.navigate()
  const initialXP = await profile.getTotalXP()

  // Navigate to lesson and complete it
  // ...

  await profile.navigate()
  const newXP = await profile.getTotalXP()

  expect(newXP).toBeGreaterThan(initialXP)
})
```

## Test Utilities

### Factories

Use test factories to create consistent test data:

```typescript
import { createTestSubmodule, createProgressState } from '@/tests/utils/factories'

const submodule = createTestSubmodule({ id: '1.1', title: 'Custom Title' })
const progress = createProgressState({ totalXP: 500 })
```

### Test Helpers

```typescript
import { renderWithProviders, setupLocalStorage } from '@/tests/utils/test-helpers'

// Render component with router
renderWithProviders(<MyComponent />)

// Set up localStorage for tests
setupLocalStorage({ 'music-theory-progress': progress })
```

## Coverage Requirements

### Target Coverage

- **Critical Modules**: ≥90% coverage
  - `src/utils/music-math.ts`
  - `src/stores/useProgressStore.ts`
  - `src/features/audio/`
  - `src/utils/note-labels.ts`

- **Other Modules**: ≥60% coverage

### Viewing Coverage

After running `npm run test:coverage`, open `coverage/index.html` in your browser to see a detailed coverage report.

## CI/CD Integration

Tests run automatically on every push and pull request via GitHub Actions:

- **Unit Tests** - Run on every commit
- **E2E Tests** - Run on every commit
- **Build Verification** - Ensures code compiles and builds

### Workflow Files

- `.github/workflows/test.yml` - Unit test workflow
- `.github/workflows/e2e.yml` - E2E test workflow
- `.github/workflows/build.yml` - Build verification workflow

## Debugging Tests

### Debugging Unit Tests

```bash
# Run tests in debug mode
node --inspect-brk node_modules/vitest/vitest.mjs

# Or use VS Code debugger with breakpoints
```

### Debugging E2E Tests

```bash
# Run in headed mode to see browser
npm run test:e2e:headed

# Run with Playwright Inspector
npx playwright test --debug

# Run specific test file
npx playwright test e2e/lesson-completion.spec.ts
```

## Common Issues

### Issue: Tests fail in CI but pass locally

**Solution**: Ensure you're using consistent Node.js versions. CI uses Node 20.

### Issue: E2E tests are flaky

**Solution**:

- Avoid `waitForTimeout()`, use `waitForSelector()` instead
- Ensure proper `data-testid` attributes exist
- Check Page Object Models are waiting for elements properly

### Issue: Coverage is lower than expected

**Solution**:

- Check `coverage/index.html` to see uncovered lines
- Add tests for uncovered branches
- Remove dead code that can't be tested

## Best Practices

1. **Test Behavior, Not Implementation** - Tests should survive refactoring
2. **Use data-testid** - Prefer `data-testid` over CSS selectors in E2E tests
3. **Keep Tests Independent** - Each test should run in isolation
4. **Descriptive Test Names** - Use clear, behavior-focused test descriptions
5. **Avoid Test Duplication** - Don't test the same thing in unit AND E2E tests
6. **Mock External Dependencies** - Mock audio APIs, network requests, etc.

## Further Reading

- [Vitest Documentation](https://vitest.dev/)
- [Playwright Documentation](https://playwright.dev/)
- [React Testing Library](https://testing-library.com/react)
- [Playwright Best Practices](./docs/testing/PLAYWRIGHT_BEST_PRACTICES.md) (internal)
