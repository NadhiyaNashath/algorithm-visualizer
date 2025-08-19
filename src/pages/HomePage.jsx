import { useNavigate } from 'react-router-dom';
import { ArrowRightLeft } from 'lucide-react';

export default function HomePage() {
  console.log('HomePage is rendering');
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex flex-col items-center justify-center p-8">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-cyan-200">
          Algorithm Visualizer
        </h1>
        <p className="text-blue-200 text-lg opacity-90">
          Interactive learning through visualization
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl">
        <div 
          className="group relative bg-gradient-to-br from-blue-800/50 to-indigo-800/50 backdrop-blur-sm border border-blue-400/20 rounded-2xl p-8 cursor-pointer transition-all duration-300 hover:scale-105 hover:border-blue-400/40"
          onClick={() => navigate('/bubble-sort')}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-transparent rounded-2xl opacity-0"></div>
          
          <div className="relative z-10 text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-xl flex items-center justify-center mx-auto mb-4">
                <ArrowRightLeft />
            </div>
            
            <h2 className="text-2xl font-semibold text-white mb-2">
              Bubble Sort
            </h2>
          </div>

        </div>
      </div>
    </div>
  );
}