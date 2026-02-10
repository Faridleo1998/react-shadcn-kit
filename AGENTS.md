# Agents Guide

This file defines how agents (human or AI) should behave when working in this repository. The goal is to maintain **consistency**, **compatibility with shadcn/ui**, and an excellent **developer experience (DX)**, while keeping future CLI-based distribution in mind.

---

## Project context

- Library of **shadcn/ui component wrappers**
- **React 19** + **Vite**
- **TypeScript required**
- **Tailwind CSS** (shadcn default setup)
- Simple repository, package manager **npm**
- **Open source**, community-oriented project
- Future goal: installation/usage via CLI (`npx wrappers@latest add <component>`)

Wrappers expose **all original shadcn/ui props** while adding minimal abstraction to improve reuse and consistency.

---

## Project structure

```
src/
  components/
    ui/              # Base shadcn components (DO NOT MODIFY)
    form/            # react-hook-form compatible wrappers
    *.tsx            # Standard wrappers
```

### Location rules

- All **wrappers** must live in `src/components`
- If a component is intended for form usage:
  - A **react-hook-form** version must exist in `src/components/form`
- Components inside `src/components/ui` **must not be modified** under any circumstances

---

## Naming conventions

- File names must be **lowercase** and **kebab-case**
  - ✅ `input.tsx`
  - ✅ `card-customer.tsx`
  - ❌ `Input.tsx`
  - ❌ `CardCustomer.tsx`

- File names should clearly reflect the wrapped component

---

## Component creation rules

### Hard rules (DO NOT break)

- ❌ Do not modify components inside `src/components/ui`
- ❌ Do not break compatibility with original shadcn/ui props
- ❌ Do not use `any`
- ❌ Do not introduce inline styles
- ❌ Do not add new dependencies without explicit justification
- ❌ Do not modify project configuration (Vite, TS, Tailwind, etc.)

### Mandatory rules

- ✅ Expose all original shadcn/ui component props
- ✅ Keep the API as close as possible to shadcn/ui
- ✅ Prioritize **DX**, strong typing, and autocomplete
- ✅ Follow patterns from **existing components** in the repository
- ✅ Always consider future CLI-based usage

---

## React Hook Form

- If a component is usable within forms:
  - A **react-hook-form compatible** version must exist in `src/components/form`
- The RHF version must:
  - Use `Controller` or the pattern already established in the repo
  - Maintain naming and prop consistency with the base version
  - Avoid unnecessary logic duplication

---

## Typing and quality

- TypeScript is **mandatory**
- Prefer:
  - `type` over `interface` (unless the repository specifies otherwise)
  - Explicit and composable props
- Avoid:
  - Overly generic types
  - Magic or implicit props

---

## Allowed agent tasks

- 🧩 Create new shadcn component wrappers
- 🔁 Create react-hook-form versions of existing wrappers
- 🛠️ Refactor wrappers to improve DX and maintainability
- 🧪 Improve or strengthen TypeScript typings
- 📚 Improve internal code documentation
- 🤖 Design components with future CLI integration in mind

### Disallowed tasks

- 🚫 Add examples or demos (Storybook will be used in the future)
- 🚫 Change architectural decisions
- 🚫 Introduce new patterns without aligning with existing ones

---

## Agent philosophy (balanced mode)

- Strictly follow defined rules
- May **suggest improvements**, but **must not apply them unless explicitly requested**
- Prioritize stability, consistency, and developer experience
- Assume other developers and agents will work on the same codebase

---

## Golden rule

> When in doubt between innovation and consistency, **choose consistency**.

This repository is designed to grow in a predictable and reliable way for the community.
