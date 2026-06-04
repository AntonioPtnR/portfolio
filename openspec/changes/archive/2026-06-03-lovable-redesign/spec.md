# Lovable Redesign Specification

## Purpose

Define the premium Lovable redesign for the Astro portfolio as new behaviour across visual shell, sections, motion, and accessibility.

## Requirements

### Requirement PAL-001 — Theme tokens and contrast-safe palette
The system MUST provide dark-by-default and light theme tokens matching the approved palette for backgrounds, cards, text, borders, and primary actions, and SHALL keep body text at AA contrast in both themes.

**Non-functional constraints**: No new dependencies; token changes MUST preserve static build compatibility; colour usage MUST avoid text below 70% effective opacity.

#### Scenario: Dark theme loads by default
- **Given** a first-time visitor with no saved theme preference
- **When** the portfolio renders
- **Then** the interface uses the dark palette with `#050A14` primary background and approved text/border tokens

#### Scenario: Light theme remains consistent
- **Given** a visitor switches to light theme
- **When** the page updates
- **Then** cards, text, borders, and primary actions use the approved light palette without losing readability

### Requirement LAY-001 — Premium shell and responsive canvas
The system MUST render content inside a centered responsive shell up to 1280px wide and SHALL display a subtle grid background that does not interfere with content legibility or interaction.

**Non-functional constraints**: Mobile-first layout; background treatment MUST be lightweight and pointer-safe; section spacing MUST remain consistent from mobile to desktop.

#### Scenario: Desktop width is constrained
- **Given** a viewport at or above desktop width
- **When** the home page renders
- **Then** the main content remains centred within a 1280px maximum width

#### Scenario: Grid background stays decorative
- **Given** any viewport size
- **When** the visitor scrolls or interacts with content
- **Then** the grid background remains subtle, non-blocking, and visually behind all interactive elements

### Requirement NAV-001 — Sticky blurred navigation
The system MUST provide a sticky 72px navigation bar with blurred backdrop, brand label `</> Antonio`, section links, a theme toggle, and a CV download action.

**Non-functional constraints**: Navigation MUST remain usable on keyboard and touch; sticky behaviour MUST not obscure section targets.

#### Scenario: Primary navigation is always available
- **Given** a visitor scrolls down the page
- **When** the header reaches the top boundary
- **Then** the navigation remains sticky with preserved readability and controls

#### Scenario: Navigation exposes all required actions
- **Given** the header is visible
- **When** the visitor inspects the navigation controls
- **Then** links for Sobre Mí, Formación, Experiencia, Portfolio, and Contacto appear alongside theme toggle and CV download button

### Requirement HER-001 — Two-column hero with terminal identity card
The system MUST render a two-column desktop hero with premium introductory copy, primary and secondary CTAs, technology badges, and a terminal-style identity card.

**Non-functional constraints**: Hero typography MUST scale responsively; the terminal card MUST fit mobile layouts without horizontal overflow.

#### Scenario: Desktop hero presents both columns
- **Given** a desktop viewport
- **When** the hero section renders
- **Then** the left column shows the approved title, subtitle, description, CTAs, and badges, and the right column shows the terminal card

#### Scenario: Mobile hero collapses safely
- **Given** a mobile viewport
- **When** the hero section renders
- **Then** content stacks vertically and the terminal card remains fully visible and readable

### Requirement ABO-001 — About section with trust signals
The system MUST provide a Sobre Mí section with avatar presentation, descriptive copy, and four metric cards for experience, projects, technologies, and commitment.

**Non-functional constraints**: Metrics MUST remain readable at small widths; avatar treatment MUST not require a new asset pipeline.

#### Scenario: About content communicates profile quickly
- **Given** a visitor reaches the Sobre Mí section
- **When** the section renders
- **Then** the visitor sees avatar, title, profile description, and the four approved metrics

#### Scenario: Metrics adapt responsively
- **Given** a narrow viewport
- **When** the metrics area renders
- **Then** cards reflow without clipped text or overlapping content

### Requirement EDU-001 — Alternating education timeline
The system MUST present education entries in a vertical timeline with alternating card alignment on larger screens and a single-column fallback on smaller screens.

**Non-functional constraints**: Timeline behaviour MUST stay readable on mobile; chronology MUST remain clear regardless of alignment.

#### Scenario: Desktop timeline alternates entries
- **Given** a desktop viewport with education data
- **When** the Formación section renders
- **Then** entries alternate left and right around a shared timeline axis

#### Scenario: Mobile timeline simplifies layout
- **Given** a mobile viewport
- **When** the Formación section renders
- **Then** entries collapse into a single readable vertical flow while preserving order and dates

### Requirement EXP-001 — Experience timeline with technology badges
The system MUST present experience entries in a premium timeline and SHALL include visible technology badges for each role where data exists.

**Non-functional constraints**: Badge density MUST not reduce scanability; long role content MUST wrap cleanly.

#### Scenario: Experience cards expose stack information
- **Given** experience entries include technology metadata
- **When** the Experiencia section renders
- **Then** each relevant card shows its associated technology badges

#### Scenario: Timeline remains readable with varied content
- **Given** entries have different description lengths
- **When** the Experiencia section renders
- **Then** cards preserve hierarchy, spacing, and chronological clarity

### Requirement POR-001 — Filtered portfolio grid
The system MUST provide a portfolio grid with category filters for Todos, Frontend, Backend, Full Stack, and DevOps, and SHALL show premium hover feedback on project cards.

**Non-functional constraints**: Filtering MUST work without new dependencies; interactions SHOULD feel immediate on modern mobile and desktop browsers.

#### Scenario: Filtering narrows visible projects
- **Given** the portfolio contains projects in multiple categories
- **When** the visitor selects a category filter
- **Then** only matching projects remain visible and the active filter state is clear

#### Scenario: Cards communicate interactivity
- **Given** a pointer-capable device
- **When** the visitor hovers a project card
- **Then** the card lifts slightly, shows premium shadowing, and strengthens its blue border emphasis

### Requirement CON-001 — Two-column contact section
The system MUST render a two-column contact section with descriptive contact information on the left and the contact form on the right.

**Non-functional constraints**: Form usability MUST remain intact on mobile; content order MUST stay logical for keyboard and assistive technology users.

#### Scenario: Contact information matches approved content
- **Given** a visitor reaches Contacto
- **When** the section renders
- **Then** the section shows the approved title, description, email, LinkedIn, GitHub, and Murcia, España location

#### Scenario: Form remains primary action area
- **Given** a desktop viewport
- **When** the section renders
- **Then** the form appears in the right column with fields for Nombre, Email, Asunto, Mensaje, and Enviar Mensaje

### Requirement FOO-001 — Minimal footer
The system MUST provide a minimal footer showing `© 2026 Antonio` and a concise reference to the portfolio stack.

**Non-functional constraints**: Footer content MUST stay legible in both themes and MUST not introduce unnecessary vertical weight.

#### Scenario: Footer closes the page cleanly
- **Given** a visitor reaches the bottom of the page
- **When** the footer renders
- **Then** copyright and stack reference are both visible without competing with primary content

### Requirement ANI-001 — Subtle motion system
The system SHOULD provide fade-up entry motion, 100ms stagger support, 200–300ms interaction transitions, and gentle hover scaling while respecting reduced-motion preferences.

**Non-functional constraints**: Motion MUST remain subtle; animation support MUST not require external libraries; reduced-motion users MUST receive non-animated equivalents.

#### Scenario: Standard motion enhances entry
- **Given** a user without reduced-motion preference
- **When** sections and cards appear or become interactive
- **Then** fade-up, stagger, and hover motion follow the approved timing and subtlety

#### Scenario: Reduced motion disables non-essential animation
- **Given** a user prefers reduced motion
- **When** the portfolio renders and interactions occur
- **Then** non-essential animations are removed or minimised without hiding content or state changes

### Requirement ACC-001 — Keyboard and AA accessibility baseline
The system MUST provide visible focus states, keyboard navigation across all interactive controls, a skip-to-content path, responsive reading comfort, and AA-level contrast for functional text.

**Non-functional constraints**: Accessibility safeguards MUST hold in both themes; verification target is `npm run build` plus manual keyboard/contrast review.

#### Scenario: Keyboard user can navigate the shell
- **Given** a visitor uses only the keyboard
- **When** they move through the page controls
- **Then** focus remains visible, order is logical, and all header, filter, toggle, CTA, and form controls are operable

#### Scenario: Skip link and contrast support first interaction
- **Given** a keyboard or assistive-technology user lands on the page
- **When** the first focusable element receives focus
- **Then** a skip-to-content path is available and visible text remains AA-compliant in the active theme
