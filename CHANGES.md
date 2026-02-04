# Unmerged Changes

---

feat: add custom CSS responsive button component with mobile/desktop icons

- Replaces Tailwind `hidden md:block` with custom media queries
- Icons switch at 768px breakpoint (up/down, right/left arrows)
- Maintains original button styling and hover effects

---

fix: only show get shareable url if base64url textarea is not empty

---

fix: delete custom CSS responsive button component (obsolete)

> External icon libraries (like Iconoir) often apply a rule like display: inline-block; to their icons. In standard CSS, if that rule is stronger than Tailwind's hidden (display: none), the icon stays visible.