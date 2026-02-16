# Mobile Collection Card Layout Update

## Changes Implemented
- **Target**: Mobile view (below 768px) for the "Collection" section promo card.
- **Layout**: Switched from horizontal split to vertical stack.
- **Image**: positioned at top, full width, `position: relative` (removed absolute positioning).
- **Text**: positioned below image, with `padding: 20px` for readability.
- **Height**: Changed from fixed `340px` to `auto` to accommodate content without compression.
- **Typography**: Slightly reduced heading size for mobile.

## Affected Files
- `css/style.css`: Updated `.mobile-collection-slider .promo-wide-card` and its children within the `@media (max-width: 768px)` block.

## Verification
- Desktop layout remains unchanged as the CSS selector is scoped to `.mobile-collection-slider`.
- Mobile layout now vertically stacks the promo card content as requested.
