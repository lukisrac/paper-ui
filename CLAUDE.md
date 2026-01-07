# CLAUDE.md - AI Assistant Guide for paper-ui

This document provides comprehensive guidance for AI assistants working with the paper-ui codebase.

## Project Overview

**paper-ui** is a React UI component library built with TypeScript and Vite. It features a hand-drawn, playful aesthetic using the Patrick Hand font and provides accessible components built on top of React Aria Components.

### Tech Stack

- **Framework**: React 18.2 with TypeScript 5.2
- **Build Tool**: Vite 5.2 with LightningCSS for CSS transformation
- **Package Manager**: Bun
- **UI Foundation**: React Aria Components (for accessibility)
- **Development**: Storybook 8.1
- **Testing**: Lost Pixel & Chromatic (visual regression testing)
- **Code Quality**: ESLint, Prettier
- **CI/CD**: GitHub Actions

## Project Structure

```
paper-ui/
├── .github/workflows/     # CI/CD workflows (Chromatic, Lost Pixel)
├── .storybook/           # Storybook configuration
├── public/               # Static assets
├── src/
│   ├── components/       # UI components (see Component Structure below)
│   │   ├── button/
│   │   │   ├── button.tsx
│   │   │   ├── button.css
│   │   │   └── button.stories.ts
│   │   └── toggle-button/
│   │       ├── toggle-button.tsx
│   │       ├── toggle-button.css
│   │       └── toggle-button.stories.ts
│   ├── styles/           # Global styles
│   │   ├── base.css      # CSS custom properties, colors, fonts, reset
│   │   ├── typography.css # Typography utility classes
│   │   └── reset.css     # CSS reset
│   ├── utils/            # Utility functions
│   │   └── cx.ts         # className composition utility
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── package.json
├── tsconfig.json
├── vite.config.ts
├── prettier.config.js
├── .eslintrc.cjs
└── lostpixel.config.ts
```

## Development Workflow

### Package Manager

**CRITICAL**: This project uses **Bun** as the package manager, NOT npm or yarn.

- Install dependencies: `bun install`
- Run dev server: `bun dev`
- Build: `bun build`
- Lint: `bun lint`
- Run Storybook: `bun storybook`
- Build Storybook: `bun build-storybook`

### Available Scripts

```json
{
  "dev": "vite",                                    // Start dev server
  "build": "tsc && vite build",                     // Type check and build
  "lint": "eslint . --ext ts,tsx",                  // Lint TypeScript files
  "preview": "vite preview",                        // Preview production build
  "storybook": "storybook dev -p 6006",            // Run Storybook dev server
  "build-storybook": "storybook build",            // Build Storybook
  "chromatic": "chromatic --exit-zero-on-changes"  // Run Chromatic
}
```

### Git Workflow

- **Main development branch**: Create feature branches from main
- **Branch naming**: Use descriptive names prefixed with `claude/` for AI-generated work
- **Commits**: Write clear, descriptive commit messages
- **CI/CD**: All pushes trigger Chromatic and Lost Pixel visual regression tests

## Component Development Guidelines

### Component Structure

Each component follows this structure:

```
component-name/
├── component-name.tsx      # Component implementation
├── component-name.css      # Component styles
└── component-name.stories.ts # Storybook stories
```

### Naming Conventions

- **Files**: kebab-case (e.g., `toggle-button.tsx`)
- **Components**: PascalCase (e.g., `ToggleButton`)
- **Props interface**: Always named `Props`
- **CSS classes**: BEM-like with modifiers (e.g., `button--size-large`)
- **State classes**: Prefixed with `is-` (e.g., `is-hovered`, `is-disabled`)

### TypeScript Conventions

```typescript
// ✅ GOOD: Clear Props interface, extends from React Aria when needed
interface Props extends ToggleButtonProps {
    className?: string;
    isIconButton?: boolean;
    size?: "small" | "default" | "large";
}

export function ToggleButton(props: Props) {
    // Implementation
}
```

**TypeScript Settings**:
- Strict mode enabled
- No unused locals/parameters
- No fallthrough cases in switch
- JSX: react-jsx

### React Aria Components Integration

All interactive components should be built on React Aria Components for accessibility:

```typescript
import { Button as ReactAriaButton, ButtonProps } from "react-aria-components";

// Wrap React Aria components and add custom styling
export function Button(props: Props) {
    return (
        <ReactAriaButton
            className={({ isDisabled, isFocusVisible, isHovered, isPressed }) =>
                cx(
                    "button",
                    `button--size-${props.size ?? "default"}`,
                    isDisabled && "is-disabled",
                    isHovered && "is-hovered",
                    // ... more state classes
                )
            }
            // ... props
        >
            {props.children}
        </ReactAriaButton>
    );
}
```

### CSS Conventions

**CSS Architecture**:
- CSS is co-located with components
- Uses LightningCSS for transformation (supports nesting, modern CSS)
- Custom properties for theming
- BEM-like naming methodology
- State-based styling with render props from React Aria

**CSS Naming Pattern**:
```css
.component-name {
    /* Base styles */
}

.component-name--modifier-value {
    /* Modifier variant (size, variant, etc.) */
}

.component-name.is-state {
    /* State classes (is-hovered, is-disabled, etc.) */
}
```

**Example**:
```css
.button {
    /* Base button styles */
    --bg-color: var(--color-black);
    background-color: var(--bg-color);
}

.button--size-large {
    /* Size variant */
    font: var(--font-body-lg);
    padding: 0.75rem 1rem;
}

.button--variant-outline {
    /* Variant modifier */
    --bg-color: var(--color-white);
}

.button.is-hovered {
    /* State class */
    background-color: var(--bg-color-hover);
}
```

**CSS Custom Properties**:

All colors, fonts, and design tokens are defined in `src/styles/base.css`:

```css
:root {
    /* Colors */
    --color-black: #1b1b1b;
    --color-white: #ffffff;
    --color-gray-100: #eeeeee;
    /* ... more colors */

    /* Typography */
    --font-family: 'Patrick Hand', cursive;
    --font-display-lg: 64px/120% var(--font-family);
    --font-body: 18px/24px var(--font-family);
    /* ... more font scales */
}
```

**IMPORTANT CSS Rules**:
1. CSS properties MUST be sorted alphabetically (enforced by Prettier)
2. Use nested CSS with `&` syntax (supported by LightningCSS)
3. Use CSS custom properties for all colors and spacing
4. Use the `cx()` utility for className composition

### className Composition

Use the custom `cx()` utility from `src/utils/cx.ts`:

```typescript
import { cx } from "../../utils/cx";

className={cx(
    "button",
    `button--size-${size ?? "default"}`,
    isDisabled && "is-disabled",
    props.className, // Always last to allow overrides
)}
```

### Storybook Stories

Each component must have a Storybook story file:

```typescript
import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./button.tsx";

const meta = {
    title: "components/Button",
    component: Button,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
    args: {
        children: "Button",
        variant: "primary",
        size: "default",
    },
};
```

## Code Quality Standards

### ESLint Configuration

```javascript
{
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "plugin:storybook/recommended",
  ]
}
```

### Prettier Configuration

**Important Prettier Settings**:
```javascript
{
  printWidth: 120,
  tabWidth: 4,
  semi: true,
  singleQuote: false,
  trailingComma: "all",
  bracketSpacing: true,
  bracketSameLine: false,
}
```

**CSS-specific**: CSS properties are automatically sorted alphabetically via `prettier-plugin-css-order`.

### Before Committing

1. Run `bun lint` to check for ESLint errors
2. Run `bun build` to ensure TypeScript compiles without errors
3. Verify all Storybook stories render correctly: `bun storybook`

## Design System

### Typography Scale

- **Display Large**: 64px/120% (--font-display-lg)
- **Display**: 48px/60px (--font-display)
- **H1**: 34px/normal (--font-h1)
- **H2**: 28px/120% (--font-h2)
- **H3**: 24px/normal (--font-h3)
- **Body Large**: 22px/28px (--font-body-lg)
- **Body**: 18px/24px (--font-body)
- **Caption**: 16px/normal (--font-caption)
- **Tiny**: 14px/18px (--font-tiny)

### Color System

Primary colors defined in `src/styles/base.css`:
- Black: `--color-black` (#1b1b1b)
- White: `--color-white` (#ffffff)
- Grays: 100-500 scale
- Extended palette: blue, brown, green, neutral, purple, red, yellow (with 50-1000 scales)

### Component Sizes

Standard size scale for components:
- `small`: Compact variant
- `default`: Standard size
- `large`: Larger variant

### Component Variants

Common variant patterns:
- `primary`: Primary/filled style
- `outline`: Outlined style
- `ghost`: Transparent background

## Visual Regression Testing

### Chromatic

- Runs on every push via GitHub Actions
- Requires `CHROMATIC_PROJECT_TOKEN` secret
- Command: `bun chromatic`

### Lost Pixel

- Runs on every push via GitHub Actions
- Requires `LOST_PIXEL_API_KEY` secret
- Takes screenshots of Storybook stories
- Config in `lostpixel.config.ts`

## Common Tasks for AI Assistants

### Adding a New Component

1. Create directory in `src/components/component-name/`
2. Create three files:
   - `component-name.tsx` (component implementation)
   - `component-name.css` (styles)
   - `component-name.stories.ts` (Storybook stories)
3. Follow the existing component patterns (see Button or ToggleButton as examples)
4. Use React Aria Components as the foundation
5. Add proper TypeScript types with a `Props` interface
6. Implement size variants (`small`, `default`, `large`)
7. Support common props: `className`, `isDisabled`, `size`
8. Use the `cx()` utility for className composition
9. Add CSS with custom properties and BEM-like naming
10. Create Storybook stories for all variants
11. Test in Storybook: `bun storybook`
12. Run lint: `bun lint`

### Modifying Existing Components

1. Read the component file first to understand the current implementation
2. Read the CSS file to understand styling approach
3. Maintain consistency with existing patterns
4. Update Storybook stories if adding new props or variants
5. Ensure TypeScript types are updated
6. Test changes in Storybook
7. Run lint and build before committing

### Styling Guidelines

1. **Always use CSS custom properties** for colors, spacing, and fonts
2. **Use BEM-like naming**: `.component-name--modifier`
3. **Use state classes**: `.is-hovered`, `.is-disabled`, etc.
4. **Alphabetically sort CSS properties** (Prettier enforces this)
5. **Use nested CSS** with `&` for modifiers and states
6. **Component-specific variables**: Define local CSS custom properties at component level
7. **Follow the size scale**: small, default, large

### React Aria Integration

When wrapping React Aria components:
1. Import the base component and its Props type
2. Extend the Props type with custom props
3. Pass through all relevant props
4. Use render props for dynamic className based on state
5. Map custom prop names to React Aria conventions (e.g., `onClick` → `onPress`)

### TypeScript Patterns

```typescript
// ✅ Import React Aria types
import { ButtonProps } from "react-aria-components";

// ✅ Define clear Props interface
interface Props {
    // Document if extending React Aria props
    autoFocus?: boolean;
    className?: string;
    children?: ButtonProps["children"];
    isDisabled?: boolean;
    onClick?: () => void;
    size?: "small" | "default" | "large";
    variant?: "primary" | "outline" | "ghost";
}

// ✅ Export named function
export function Button(props: Props) {
    // Implementation
}
```

## Anti-Patterns to Avoid

❌ **Don't** use inline styles (use CSS files and custom properties)
❌ **Don't** use npm or yarn (use Bun)
❌ **Don't** create components without TypeScript types
❌ **Don't** create components without Storybook stories
❌ **Don't** use arbitrary values (use design tokens from base.css)
❌ **Don't** manually sort CSS properties (let Prettier handle it)
❌ **Don't** import React (using new JSX transform)
❌ **Don't** use default exports for components (use named exports)
❌ **Don't** create inaccessible components (use React Aria)

## File Templates

### Component Template

```typescript
import { Component as ReactAriaComponent, ComponentProps } from "react-aria-components";
import { cx } from "../../utils/cx";

interface Props {
    className?: string;
    children?: ComponentProps["children"];
    isDisabled?: boolean;
    size?: "small" | "default" | "large";
}

export function ComponentName(props: Props) {
    return (
        <ReactAriaComponent
            className={({ isDisabled, isFocusVisible, isHovered, isPressed }) =>
                cx(
                    "component-name",
                    `component-name--size-${props.size ?? "default"}`,
                    isDisabled && "is-disabled",
                    isFocusVisible && "is-focus-visible",
                    isHovered && "is-hovered",
                    isPressed && "is-pressed",
                    props.className,
                )
            }
            isDisabled={props.isDisabled}
        >
            {props.children}
        </ReactAriaComponent>
    );
}
```

### CSS Template

```css
.component-name {
    /* CSS custom properties */
    --bg-color: var(--color-white);
    --border-color: var(--color-black);

    /* Base styles (alphabetically sorted) */
    background-color: var(--bg-color);
    border: 3px solid var(--border-color);
    cursor: pointer;

    /* Size variants */
    &.component-name--size-default {
        font: var(--font-body);
        padding: 0.5rem 1rem;
    }

    &.component-name--size-large {
        font: var(--font-body-lg);
        padding: 0.75rem 1rem;
    }

    /* State styles */
    &.is-hovered {
        /* Hover styles */
    }

    &.is-disabled {
        cursor: not-allowed;
    }
}
```

### Storybook Template

```typescript
import type { Meta, StoryObj } from "@storybook/react";
import { ComponentName } from "./component-name.tsx";

const meta = {
    title: "components/ComponentName",
    component: ComponentName,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
} satisfies Meta<typeof ComponentName>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
    args: {
        children: "Component",
        size: "default",
    },
};
```

## Testing Checklist

Before marking work as complete:

- [ ] Component renders in Storybook without errors
- [ ] All size variants work correctly
- [ ] Disabled state works properly
- [ ] Focus states are visible
- [ ] TypeScript compiles without errors (`bun build`)
- [ ] ESLint passes (`bun lint`)
- [ ] CSS properties are alphabetically sorted
- [ ] Component follows existing naming conventions
- [ ] Props interface is properly typed
- [ ] Storybook stories cover all variants

## Additional Resources

- **React Aria Components**: https://react-spectrum.adobe.com/react-aria/
- **Vite**: https://vitejs.dev/
- **Storybook**: https://storybook.js.org/
- **LightningCSS**: https://lightningcss.dev/

## Questions?

When uncertain about implementation details:
1. Look at existing components (Button, ToggleButton) as references
2. Check `src/styles/base.css` for available design tokens
3. Consult the component structure and naming conventions above
4. Follow React Aria Components documentation for accessibility patterns
