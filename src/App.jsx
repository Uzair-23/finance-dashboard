import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/layout/Sidebar';
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import Insights from './pages/Insights';
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="flex min-h-screen bg-slate-900 text-white font-dm-sans">
        <Sidebar />
        <main className="flex-1 flex flex-col md:ml-0">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/insights" element={<Insights />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;