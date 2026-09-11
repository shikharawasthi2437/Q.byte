# QBite Student Experience Upgrade

## Goal
Turn the current placeholder into a complete, frontend-only QBite hackathon demo while preserving the existing light orange, light gray/white, youthful campus identity. All queue, order, menu, notification, capacity, and profile content will use replaceable sample data rather than live infrastructure.

## Build
- Create a shared mobile-first QBite shell with desktop header, mobile bottom navigation, notification panel, offline notice, and semantic orange/neutral design tokens.
- Add dedicated Home, Menu, Orders, Tracking, Pickup Ticket, Checkout, Confirmation, Favorites, Notifications, and Profile pages with route-specific page titles and descriptions.
- Model menu items, active/history orders, queue metrics, pickup slots, alerts, canteen status, notifications, and student stats in one typed demo-data module so a backend can replace each source later.
- Add shared food cards, status badges, queue meter, order progress, canteen status, stat cards, empty/error/loading patterns, and quantity/cart controls.

## Student flow
- Home: canteen status, announcement, live queue, active-order snapshot, favorites, personal time-saved stats, and a concise traditional-vs-QBite comparison.
- Menu: campus-popular items, search, combinable category/diet/availability/popular filters, mobile filter sheet, quick favorite/add interactions, and disabled out-of-stock items.
- Cart and checkout: floating cart, quantities, optional limited note, pickup counter, capacity-aware slots, and a rule-based recommended slot.
- Orders: active and previous orders, accessible status badges, reorder into the current cart, eligible cancellation confirmation, empty states, and completed-order time-saved message.
- Tracking and pickup: five-stage progress, live queue indicator, ready estimate, prominent pickup slot/counter, and a large campus pickup ticket with QR-style visual.
- Profile and notifications: student details, activity links, personal QBite stats, and realistic order alerts.

## Interaction and validation
- Keep cart, favorites, filter choices, notification state, order cancellation, and demo order placement in shared in-memory React state.
- Add quick-add feedback and restrained motion with reduced-motion support; keep touch targets large and the floating cart clear of mobile navigation.
- Validate core navigation and interactions at desktop and mobile sizes, then check preview diagnostics for errors.

## Notes
- No live backend, push notifications, AI recommendations, payment flow, or real-time simulation will be added.
- Metrics and student/order details will be clearly framed as demo data and remain easy to replace later.
