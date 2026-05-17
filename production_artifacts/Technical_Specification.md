# 🛋️ LazySpend — Technical Specification

**Version**: 2.1  
**Date**: 2026-05-17  
**Author**: Product Manager (AI Pipeline)  
**Status**: ⏳ Awaiting Approval

---

## 1. Executive Summary

**LazySpend** is a hyper-minimalist personal finance application designed for the "lazy user." Traditional budgeting apps fail because they require too much data entry. LazySpend fixes this by focusing on **absolute minimal friction** and **shorthand data entry**.

The app features a clean interface, one-tap quick-add buttons, shorthand pricing (e.g., typing "15" means 15,000), quantity management, and an easy-to-use navbar for accessing spending statistics.

**Key Value Proposition**: Zero-friction expense tracking with shorthand inputs and essential statistics, designed specifically for minimal effort.

---

## 2. Requirements

### 2.1 Functional Requirements

| ID | Feature | Description |
|----|---------|-------------|
| FR-01 | **Shorthand Pricing Engine** | All price inputs use a "thousands" shorthand. Entering `15` equals `15,000`. Entering `0.5` equals `500`. Entering `1.5` equals `1,500`. The UI will display the actual calculated value to confirm. |
| FR-02 | **Quick-Tap Presets with Quantity (+)** | Large buttons for common expenses. When a preset is tapped, it adds an item. A visible `+` (and `-`) counter allows the user to quickly adjust the quantity (e.g., 2 coffees) before confirming. |
| FR-03 | **Smart Input** | A single input field that accepts natural shorthand (e.g., "15 lunch" logs 15,000 for lunch). |
| FR-04 | **The "Safe to Spend" Dashboard** | The main home screen displays a massive, central number showing the remaining budget for the month. |
| FR-05 | **Bottom Navbar** | A persistent bottom navigation bar with three tabs: `Home` (logging/dashboard), `Daily Stats`, and `Monthly Stats`. |
| FR-06 | **Daily & Monthly Statistics** | The Stats views show minimalist, easy-to-read summaries of spending per day and per month (total spent, average per day, and a simple list of transactions). |
| FR-07 | **Local Storage Persistence** | App works completely offline with zero signup. Data is saved in browser `localStorage`. |

### 2.2 Non-Functional Requirements

| ID | Requirement | Description |
|----|-------------|-------------|
| NFR-01 | **Frictionless UI/UX** | The time from opening the app to logging an expense must be under 2 seconds. |
| NFR-02 | **Minimalist Aesthetic** | Clean, lots of whitespace, muted color palette (monochrome or soft pastels), large typography. No clutter. |
| NFR-03 | **Mobile-First** | Designed specifically for one-handed mobile use. Major interactive elements and navbar at the bottom. |

---

## 3. Architecture & Tech Stack

### 3.1 Technology Choices

| Layer | Technology | Justification |
|-------|-----------|---------------|
| **Build Tool** | Vite 5.x | Lightning-fast HMR and build. |
| **UI Framework** | React 18.x | Component-based, hooks for state management. |
| **Styling** | Tailwind CSS v4 | Utility-first, perfect for rapid UI creation. |
| **Icons** | Lucide React | Clean, minimalist icons. |
| **State/Storage** | Context API + `localStorage` | Simple state management. |

### 3.2 Project Structure

```
app_build/
├── index.html
├── package.json
├── vite.config.js
├── src/
│   ├── main.jsx                  # Entry point
│   ├── App.jsx                   # Root component with routing/tabs
│   ├── index.css                 # Tailwind & Base styles
│   │
│   ├── context/
│   │   └── AppContext.jsx        # Global state provider
│   │
│   ├── hooks/
│   │   ├── useLocalStorage.js    # Persistence hook
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.jsx        # Bottom navigation bar
│   │   │   └── Layout.jsx        # Main wrapper
│   │   ├── home/
│   │   │   ├── SafeToSpend.jsx   # Big remaining number
│   │   │   ├── QuickTapGrid.jsx  # Grid of quick-add buttons with quantity
│   │   │   └── SmartInput.jsx    # Shorthand input field
│   │   ├── stats/
│   │   │   ├── DailyStats.jsx    # Daily report view
│   │   │   └── MonthlyStats.jsx  # Monthly report view
│   │   └── shared/
│   │       └── TransactionList.jsx # Reusable transaction list
│   │
│   └── utils/
│       ├── parser.js             # Logic for shorthand parsing (x * 1000)
│       └── formatters.js         # Currency and date formatting
```

---

## 4. State Management

### 4.1 Core State Shape

```javascript
{
  budget: 2000000, // Actual value stored, not shorthand
  transactions: [
    {
      id: "uuid",
      amount: 15000,
      quantity: 1,
      title: "Lunch",
      timestamp: 1684321234567
    }
  ],
  presets: [
    { id: "p1", title: "Coffee", baseAmount: 15000, icon: "☕" },
    { id: "p2", title: "Snack", baseAmount: 5000, icon: "🍪" },
    { id: "p3", title: "Transport", baseAmount: 12000, icon: "🚗" },
    { id: "p4", title: "Shopping", baseAmount: 50000, icon: "🛒" }
  ],
  activeTab: 'home' // 'home', 'daily', 'monthly'
}
```

---

## 5. UI/UX Design System

### 5.1 Design Philosophy: "Less is More"
- **Colors**: Primarily grayscale. White background (`#ffffff`), off-white panels (`#f9fafb`), dark slate text (`#1e293b`). A single accent color used sparingly.
- **Typography**: Inter (Google Font). Heavy reliance on font weight and size for hierarchy.
- **Shorthand Display**: When a user types `15`, the UI subtly shows `= Rp 15.000` below the input to confirm the translation.

### 5.2 Screen Layouts
1. **Home Tab**: 
   - Top: "Safe to Spend" huge number.
   - Middle: Smart input text field with shorthand translation preview.
   - Lower Middle: 2x2 grid of presets. Tapping one opens a tiny inline counter `[-] 1 [+]` to adjust quantity before saving.
2. **Daily Stats Tab**: Simple list of today's spending, total spent today, and recent days' totals.
3. **Monthly Stats Tab**: Total spent this month, daily average, and a clean list of all transactions for the month.
4. **Bottom Navbar**: Persistent bar with icons for Home, Daily, Monthly.

---

> **⏸️ APPROVAL GATE**
>
> This specification is now ready for your review.
> I have incorporated the shorthand pricing (`15` = `15,000`), the quantity `+` adjustments for presets, and the bottom Navbar for Daily/Monthly statistics.
>
> **Do you approve this specification?** Type **"Approved"** to proceed to the coding phase, or provide feedback for revisions.
