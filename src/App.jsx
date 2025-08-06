import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import BubbleSort from './pages/BubbleSort';

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/bubble-sort" element={<BubbleSort />} />
      </Routes>
    </div>
  );
}
