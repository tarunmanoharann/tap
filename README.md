# FinanceTracker+ 💰

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18.2.0-61DAFB?logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-4.4.0-646CFF?logo=vite)](https://vitejs.dev/)

FinanceTracker+ is an intelligent bill management application designed to help users track expenses, manage bills, and gain financial insights. Built with modern web technologies, it provides a seamless experience across all devices.

## ✨ Features

- 📱 **Responsive Design**: Works on mobile, tablet, and desktop
- 📊 **Interactive Analytics**: Visualize your spending patterns
- 🔔 **Bill Reminders**: Never miss a payment deadline
- 🌍 **Location-Aware**: Get localized currency and insights
- 🚀 **Performance Optimized**: Uses modern web APIs for smooth experience
- 📱 **Offline Support**: Works even with limited connectivity

## 🛠️ Technologies Used

- **Frontend**: React 18, Vite 4
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **State Management**: React Hooks
- **Web APIs**:
  - Network Information API
  - Geolocation API
  - Background Tasks API
  - Intersection Observer API

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or later)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/financetracker-plus.git
   cd financetracker-plus
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

## 📱 Usage

1. **Add Bills**: Click the "Add Bill" button to add new expenses
2. **Track Payments**: Mark bills as paid when settled
3. **View Analytics**: Check the dashboard for spending insights
4. **Clear Data**: Use the clear cache button to reset your data

## 🌟 Features in Detail

### Network-Aware Experience
- Automatically adjusts UI based on network conditions
- Optimizes data usage for slower connections
- Provides offline support with local storage

### Location-Based Insights
- Detects user location for relevant currency and language settings
- Provides localized financial insights

### Performance Optimizations
- Uses Intersection Observer for lazy loading
- Implements background tasks for non-critical operations
- Optimized rendering with React.memo and useCallback

## 📝 Project Structure

```
src/
├── components/         # Reusable components
├── App.jsx            # Main application component
└── main.jsx           # Application entry point
```



## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
