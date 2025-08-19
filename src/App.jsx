import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import BubbleSort from './pages/BubbleSort';

export default function App() {

  console.log('App component is rendering');
  
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/bubble-sort" element={<BubbleSort />} />
      </Routes>
    </div>
  );
}
