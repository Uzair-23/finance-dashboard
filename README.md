# Finance Dashboard

A production-grade, modern finance management SPA built with React.js, Tailwind CSS, and Recharts. Features a luxury dark-mode aesthetic with role-based access control, comprehensive transaction management, and insightful financial analytics.

## 🎯 Features

### Core Features

- **Dashboard**: Real-time financial overview with summary cards, balance trends, and spending breakdown
- **Transaction Management**: Full CRUD operations with advanced filtering, sorting, and pagination
- **Insights Analytics**: Financial insights, category breakdown, and monthly comparisons
- **Role-Based Access Control**: Admin and Viewer roles with contextual UI
- **Dark Mode**: Persistent dark mode toggle with system preference detection
- **Export to CSV**: Download filtered transaction data for external analysis
- **Data Persistence**: localStorage integration for seamless data persistence

### Technical Features

- **Responsive Design**: Mobile-first approach with Tailwind's breakpoints
- **Glassmorphism UI**: Modern card designs with backdrop blur effects
- **Smooth Animations**: Staggered fade-in animations on component load
- **Advanced Filtering**: Filter by type, category, date range, and search queries
- **Data Visualization**: Recharts integration for interactive charts and graphs
- **Form Validation**: Comprehensive form validation with error messaging
- **State Management**: Zustand for lightweight, performant state management

## 🛠️ Tech Stack

| Technology          | Purpose                                            |
| ------------------- | -------------------------------------------------- |
| **React.js**        | UI library with functional components and hooks    |
| **Tailwind CSS**    | Utility-first CSS framework for styling            |
| **Zustand**         | Lightweight state management solution              |
| **React Router v6** | Client-side routing and navigation                 |
| **Recharts**        | Composable charting library for data visualization |
| **Lucide React**    | Beautiful, consistent icon set                     |
| **DM Sans & Syne**  | Google Fonts for typography                        |

### Why These Choices?

- **React.js**: Industry standard, excellent ecosystem, and component reusability
- **Tailwind CSS**: Rapid development, consistent design system, minimal bundle size
- **Zustand**: Simple, unopinionated state management without boilerplate
- **Recharts**: Responsive, accessible, and easy-to-customize charts
- **React Router**: Latest v6 API with hooks support for navigation
- **Lucide React**: Modern icon library with consistent styling

## 📁 Project Structure

```
src/
├── assets/                 # Static images and icons
├── components/
│   ├── common/            # Reusable UI components (Button, Card, Modal, Badge)
│   ├── dashboard/         # Dashboard-specific components
│   ├── layout/            # Layout components (Sidebar, Navbar)
│   ├── transactions/      # Transaction page components
│   └── insights/          # Insights page components
├── hooks/                 # Custom React hooks
├── store/                 # Zustand stores
├── data/                  # Mock data and constants
├── utils/                 # Helper functions
├── pages/                 # Page components
├── App.jsx               # Root app component with routing
├── App.css               # Global styles
├── main.jsx              # React entry point
└── index.css             # Tailwind and custom styles
```

## 🚀 Getting Started

### Prerequisites

- Node.js 16+
- npm or yarn

### Installation

1. **Clone and install dependencies:**

```bash
cd "finance dashboard"
npm install
```

2. **Start development server:**

```bash
npm run dev
```

3. **Build for production:**

```bash
npm run build
```

4. **Preview production build:**

```bash
npm run preview
```

## 📖 Feature Walkthrough

### Dashboard

- **Summary Cards**: Display total balance, monthly income/expenses, and savings rate with month-over-month changes
- **Balance Trend Chart**: Line chart showing balance progression over the last 4 months
- **Spending Breakdown**: Donut chart visualizing expenses by category
- **Recent Transactions**: Last 5 transactions with date and amount

### Transactions

- **Advanced Filtering**: Filter by transaction type, category, date range, or search by merchant/description
- **Sortable Table**: Click column headers to sort by date, merchant, category, or amount
- **Pagination**: 10 transactions per page with previous/next navigation
- **Admin Features** (Admin Role Only):
  - Add new transactions with validation
  - Edit existing transactions
  - Delete transactions with confirmation
  - Export filtered data to CSV

### Insights

- **Highlight Cards**: Key metrics including highest spending category, biggest expense, most frequent merchant, and savings trend
- **Monthly Comparison**: Grouped bar chart comparing income vs expense across 4 months
- **Category Breakdown**: Table showing spending by category with percentage and visual indicator

### Role-Based Access Control

- **Viewer**: Read-only access to all data, no add/edit/delete operations
- **Admin**: Full CRUD capabilities with add/edit/delete UI
- **Role Badge**: Current role displayed in sidebar and navbar
- **Role Switcher**: Easy switching between roles for testing

### Dark Mode

- **Dark-First Aesthetic**: Deep navy backgrounds (#0F172A) with slate accents
- **Persistent Toggle**: Dark mode preference saved to localStorage
- **System Preference Detection**: Respects user system color scheme preference
- **Smooth Transitions**: All color changes animate smoothly

## 🎨 Design System

### Color Palette

- **Navy**: #0F172A (Background)
- **Slate**: #1E293B (Cards), #334155 (Borders)
- **Blue**: #3B82F6 (Primary accent, interactive elements)
- **Green**: #10B981 (Income, positive values)
- **Red**: #EF4444 (Expenses, negative values)

### Typography

- **Headings**: Syne (Bold, 600-700 weight)
- **Body**: DM Sans (Regular, 400-600 weight)

### Components

- **Cards**: Glassmorphism with backdrop blur, subtle borders
- **Buttons**: Multiple variants (primary, secondary, danger, ghost)
- **Badges**: Status indicators with color-coded variants
- **Modal**: Centered dialog with overlay and smooth transitions

## 📊 Data Management

### Mock Data

- **40+ Realistic Transactions**: Spread across 4 months (Dec 2024 - Mar 2025)
- **9 Categories**: Food, Transport, Shopping, Entertainment, Salary, Rent, Healthcare, Utilities, Freelance
- **Varied Amounts**: From ₹1,050 to ₹250,000 for realistic distributions

### Data Persistence

- **localStorage Integration**: All transactions auto-saved to browser storage
- **Automatic Rehydration**: Data restored on page reload
- **Role & Theme Persistence**: User preferences maintained across sessions

### Data Format

```javascript
{
  id: 1,
  date: Date,
  amount: number,
  category: string,
  type: 'income' | 'expense',
  description: string,
  merchant: string
}
```

## 🔧 State Management

### Zustand Stores

#### `transactionStore`

- **State**: transactions[], filters, selectedTransaction
- **Actions**: addTransaction, editTransaction, deleteTransaction, setFilter, resetFilters
- **Features**: localStorage persistence, memoized filtering

#### `roleStore`

- **State**: currentRole (Admin | Viewer)
- **Actions**: setRole()
- **Features**: localStorage persistence, role-based UI rendering

#### `darkModeStore`

- **State**: isDarkMode
- **Actions**: toggleDarkMode, setDarkMode
- **Features**: localStorage persistence, automatic HTML class management

## 🪝 Custom Hooks

- `useTransactions()`: Transaction CRUD operations
- `useFilters()`: Filter management and filtered transactions
- `useRole()`: Role state and boolean helpers (isAdmin, isViewer)

## 🧮 Utility Functions

- `formatCurrency(amount)`: Format to Indian Rupee (₹)
- `formatDate(date)`: Format to "15 Jan 2025"
- `formatMonthYear(date)`: Format to "Jan 2025"
- `getPercentageChange(current, previous)`: Calculate % change
- `exportToCSV(transactions, filename)`: Export to CSV file
- `calculateBalanceTrend(transactions)`: Monthly balance progression
- `getCategorySpending(transactions)`: Spending by category
- `getMonthlyComparison(transactions)`: Income vs expense by month

## 📱 Responsive Design

- **Desktop (1024px+)**: Sidebar navigation, full-width tables
- **Tablet (768px-1023px)**: Collapsible sidebar, adjusted grid layouts
- **Mobile (<768px)**: Floating action button, bottom sheet navigation, single-column layout

## ✨ Animations

- **Fade In Up**: Staggered card entrance animations (0-150ms delays)
- **Smooth Transitions**: 200ms transition on all interactive elements
- **Hover Effects**: Card and button hover states with color transitions

## 🔐 Best Practices Implemented

- **Component Composition**: Small, focused components (<150 lines)
- **Prop Drilling Prevention**: Zustand store for state, no deep prop chains
- **Custom Hooks**: Logic separation from components
- **Pure Functions**: Utility functions without side effects
- **Error Boundaries**: Form validation with user-friendly messages
- **Loading States**: Skeleton loaders for async operations
- **Empty States**: Graceful handling of no-data scenarios
- **Accessibility**: Proper labels, focus states, keyboard navigation
- **Performance**: Memoized filtering, optimized re-renders

## 🎓 Learning Outcomes

This project demonstrates:

- React.js functional components and hooks best practices
- Modern CSS with Tailwind utility classes
- State management with Zustand
- Data visualization with Recharts
- Form handling and validation
- Responsive design patterns
- Component composition and reusability
- localStorage data persistence
- Role-based access control
- Advanced filtering and sorting

## 📝 Tips for Extension

- **Dark/Light Mode Toggle**: Already implemented, easy to customize colors
- **Real API Integration**: Replace mockData with API calls, update Zustand actions
- **Authentication**: Add login flow, store user role from backend
- **Budget Goals**: Add budget tracking and progress indicators
- **Notifications**: Implement notification center for transactions
- **Recurring Transactions**: Add support for scheduled/recurring entries
- **PDF Export**: Extend export functionality beyond CSV
- **Mobile App**: Convert to React Native using same logic
- **Deployment**: Build and deploy to Vercel, Netlify, or AWS

## 📄 License

This project is open source and available for educational and commercial use.

---

**Built with ❤️ for modern finance management**
