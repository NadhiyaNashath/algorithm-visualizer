import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import BubbleSort from './pages/BubbleSort';
import InsertionSort from './pages/InsertionSort';

export default function App() {

  console.log('App component is rendering');
  
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/bubble-sort" element={<BubbleSort />} />
        <Route path='/insertion-sort' element={<InsertionSort />} />
      </Routes>
    </div>
  );
}
