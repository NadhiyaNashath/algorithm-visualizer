import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, SkipBack, ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react';

// Bubble sort steps generator
function getBubbleSortSteps(arr) {
  const steps = [];
  const array = [...arr];
  const n = array.length;
  
  // Initial state
  steps.push({
    array: [...array],
    comparing: null,
    swapped: null,
    sortedIndices: []
  });

  const sortedIndices = [];
  
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      // Show comparison
      steps.push({
        array: [...array],
        comparing: [j, j + 1],
        swapped: null,
        sortedIndices: [...sortedIndices]
      });
      
      // Check if swap is needed
      if (array[j] > array[j + 1]) {
        // Swap
        [array[j], array[j + 1]] = [array[j + 1], array[j]];
        
        // Show swap
        steps.push({
          array: [...array],
          comparing: null,
          swapped: [j, j + 1],
          sortedIndices: [...sortedIndices]
        });
      }
    }
    
    // Mark the last element as sorted
    sortedIndices.push(n - 1 - i);
    
    steps.push({
      array: [...array],
      comparing: null,
      swapped: null,
      sortedIndices: [...sortedIndices]
    });
  }
  
  // Mark the first element as sorted (it's automatically sorted when we reach here)
  if (n > 0) {
    sortedIndices.push(0);
  }
  
  // Final state
  steps.push({
    array: [...array],
    comparing: null,
    swapped: null,
    sortedIndices: [...sortedIndices]
  });
  
  return steps;
}

export default function BubbleSortVisualizer() {
  const [inputValue, setInputValue] = useState('');
  const [array, setArray] = useState(null);
  const [steps, setSteps] = useState([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const intervalRef = useRef(null);

  // Generate steps whenever array changes
  useEffect(() => {
    if (array && array.length > 0) {
      setSteps(getBubbleSortSteps(array));
      setCurrentStepIndex(0);
      setIsPlaying(false);
    } else {
      setSteps([]);
      setCurrentStepIndex(0);
      setIsPlaying(false);
    }
  }, [array]);

  useEffect(() => {
    if (isPlaying && steps.length > 0) {
      intervalRef.current = setInterval(() => {
        setCurrentStepIndex((idx) => {
          if (idx < steps.length - 1) return idx + 1;
          else {
            setIsPlaying(false);
            return idx;
          }
        });
      }, 1300);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isPlaying, steps.length]);

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (!inputValue.trim()) {
      alert('Please enter some numbers');
      return;
    }

    const parsedArray = inputValue
      .split(',')
      .map((s) => s.trim())
      .filter((s) => s !== '')
      .map(Number)
      .filter((n) => !isNaN(n));

    if (parsedArray.length > 0) {
      setArray(parsedArray);
    } else {
      alert('Please enter a valid comma-separated list of numbers');
    }
  };

  const getBarColor = (index) => {
    if (!steps.length || currentStepIndex >= steps.length) return 'bg-gradient-to-t from-blue-400 to-cyan-300 border-blue-300';
    
    const { comparing, swapped, sortedIndices } = steps[currentStepIndex];
    
    if (sortedIndices && sortedIndices.includes(index)) {
      return 'bg-gradient-to-t from-green-400 to-green-300 border-green-300';
    } else if (swapped && swapped.includes(index)) {
      return 'bg-gradient-to-t from-red-400 to-red-300 border-red-300';
    } else if (comparing && comparing.includes(index)) {
      return 'bg-gradient-to-t from-yellow-400 to-yellow-300 border-yellow-300';
    } else {
      return 'bg-gradient-to-t from-blue-400 to-cyan-300 border-blue-300';
    }
  };

  const currentStep = steps[currentStepIndex];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 p-8 flex items-center justify-center">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-cyan-200">
            Bubble Sort Visualizer
          </h1>
          <p className="text-blue-200 text-lg opacity-90">
            Watch how bubble sort compares and swaps adjacent elements
          </p>
        </div>

        {/* Input Form */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Enter numbers separated by commas (e.g. 5,3,8)"
              className="w-full sm:w-96 px-4 py-3 bg-slate-800/80 border border-blue-400/30 rounded-xl text-white placeholder-blue-300/60 focus:outline-none focus:border-blue-400/60 focus:ring-2 focus:ring-blue-400/20"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleSubmit(e);
                }
              }}
            />
            <button 
              onClick={handleSubmit}
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-cyan-600 transition-all duration-200 transform hover:scale-105"
            >
              Create Array
            </button>
          </div>
        </div>

        {/* Show message when no array is entered */}
        {!array && (
          <div className="text-center py-16">
            <div className="text-blue-200/60 text-xl mb-4">
              Enter an array of numbers above to begin the visualization
            </div>
          </div>
        )}

        {/* Array Visualization - Only show when array exists */}
        {array && steps.length > 0 && (
          <div className="mb-8">
            <div className="flex flex-wrap justify-center gap-2 mb-6">
              
              {currentStep.array.map((value, index) => (
                <div
                  key={index}
                  className={`
                    h-16 w-16 ${getBarColor(index)} 
                    flex items-center justify-center text-gray-900 font-bold text-lg
                    rounded-xl border-2 transition-all duration-300 transform
                    ${(currentStep.comparing && currentStep.comparing.includes(index)) || (currentStep.swapped && currentStep.swapped.includes(index)) ? 'scale-110' : 'scale-100'}
                    shadow-lg
                  `}
                >
                  {value}
                </div>
              ))}
            </div>

            {/* Step Information */}
            <div className="text-center mb-6">
              <div className="text-blue-200 text-sm mb-2">
                Step {currentStepIndex + 1} of {steps.length}
              </div>
              {currentStep.comparing && (
                <div className="text-yellow-300 text-lg mt-2">
                  Comparing: {currentStep.array[currentStep.comparing[0]]} vs {currentStep.array[currentStep.comparing[1]]}
                  <div className="text-yellow-200 text-base mt-1">
                    {currentStep.array[currentStep.comparing[0]] > currentStep.array[currentStep.comparing[1]] 
                      ? `${currentStep.array[currentStep.comparing[0]]} > ${currentStep.array[currentStep.comparing[1]]}, swap needed!`
                      : `${currentStep.array[currentStep.comparing[0]]} ≤ ${currentStep.array[currentStep.comparing[1]]}, no swap needed`
                    }
                  </div>
                </div>
              )}
              {currentStep.swapped && (
                <div className="text-red-300 text-lg mt-2">
                  Swapped: {currentStep.array[currentStep.swapped[1]]} and {currentStep.array[currentStep.swapped[0]]}
                  <div className="text-red-200 text-base mt-1">
                    {currentStep.array[currentStep.swapped[1]]} was greater than {currentStep.array[currentStep.swapped[0]]}, so they were swapped
                  </div>
                </div>
              )}
              {currentStep.sortedIndices && currentStep.sortedIndices.length === currentStep.array.length && (
                <div className="text-green-300 text-lg mt-2 font-semibold">
                  Array is sorted!
                </div>
              )}
            </div>

            {/* Legend */}
            <div className="flex flex-wrap justify-center gap-6 text-sm mb-8">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gradient-to-t from-blue-400 to-cyan-300 rounded border border-blue-300"></div>
                <span className="text-blue-200">Unsorted</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gradient-to-t from-yellow-400 to-yellow-300 rounded border border-yellow-300"></div>
                <span className="text-yellow-200">Comparing</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gradient-to-t from-red-400 to-red-300 rounded border border-red-300"></div>
                <span className="text-red-200">Swapped</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gradient-to-t from-green-400 to-green-300 rounded border border-green-300"></div>
                <span className="text-green-200">Sorted</span>
              </div>
            </div>
            <div className='p-4 items-center justify-center flex text-white text-xl font-semibold'>Click the play button to begin sorting</div>
            {/* Controls - Only show when array exists */}
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold rounded-xl hover:from-green-600 hover:to-emerald-600 transition-all duration-200 transform hover:scale-105"
              >
                {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                {isPlaying ? 'Pause' : 'Play'}
              </button>
              
              <button
                onClick={() => setCurrentStepIndex((idx) => Math.max(idx - 1, 0))}
                disabled={currentStepIndex === 0}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-indigo-600 transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:transform-none disabled:cursor-not-allowed"
              >
                <ChevronLeft size={20} />
                Previous
              </button>
              
              <button
                onClick={() => setCurrentStepIndex((idx) => Math.min(idx + 1, steps.length - 1))}
                disabled={currentStepIndex === steps.length - 1}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-indigo-600 transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:transform-none disabled:cursor-not-allowed"
              >
                Next
                <ChevronRight size={20} />
              </button>
              
              <button
                onClick={() => {
                  setCurrentStepIndex(0);
                  setIsPlaying(false);
                }}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-gray-500 to-slate-500 text-white font-semibold rounded-xl hover:from-gray-600 hover:to-slate-600 transition-all duration-200 transform hover:scale-105"
              >
                <RotateCcw size={20} />
                Reset
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}