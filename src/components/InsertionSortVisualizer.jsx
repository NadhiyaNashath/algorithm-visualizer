import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, SkipBack, ChevronLeft, ChevronRight, RotateCcw } from 'lucide-react';

// Insertion sort steps generator
function getInsertionSortSteps(array) {
  const steps = [];
  const arr = array.slice();
  const n = arr.length;
  // Initial state - first element is considered sorted
  steps.push({
    array: arr.slice(),
    comparing: null,
    swapped: null,
    sortedIndices: [0],
    currentKey: null,
    insertingAt: null
  });
  for (let i = 1; i < n; i++) {
    const key = arr[i];
    let j = i - 1;
    // Show the key we're currently inserting
    steps.push({
      array: arr.slice(),
      comparing: null,
      swapped: null,
      sortedIndices: Array.from({length: i}, (_, k) => k),
      currentKey: i,
      insertingAt: null
    });
    // Find the correct position for the key
    while (j >= 0) {
      // Mark comparison between key and current element
      steps.push({
        array: arr.slice(),
        comparing: [j, i],
        swapped: null,
        sortedIndices: Array.from({length: i}, (_, k) => k),
        currentKey: i,
        insertingAt: null
      });
      if (arr[j] > key) {
        // Shift element to the right
        arr[j + 1] = arr[j];
        
        steps.push({
          array: arr.slice(),
          comparing: null,
          swapped: [j, j + 1],
          sortedIndices: Array.from({length: i}, (_, k) => k),
          currentKey: i,
          insertingAt: null
        });
        j--;
      } else {
        break;
      }
    }
    // Insert the key at its correct position
    arr[j + 1] = key;
    
    steps.push({
      array: arr.slice(),
      comparing: null,
      swapped: null,
      sortedIndices: Array.from({length: i + 1}, (_, k) => k),
      currentKey: null,
      insertingAt: j + 1
    });
  }
  // Final sorted state
  steps.push({
    array: arr.slice(),
    comparing: null,
    swapped: null,
    sortedIndices: Array.from({length: n}, (_, k) => k),
    currentKey: null,
    insertingAt: null
  });
  return steps;
}

export default function InsertionSortVisualizer() {
  const [inputValue, setInputValue] = useState('');
  const [array, setArray] = useState(null);
  const [steps, setSteps] = useState([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const intervalRef = useRef(null);

  // Generate steps whenever array changes
  useEffect(() => {
    if (array && array.length > 0) {
      setSteps(getInsertionSortSteps(array));
      setCurrentStepIndex(0);
      setIsPlaying(false);
    } else {
      setSteps([]);
      setCurrentStepIndex(0);
      setIsPlaying(false);
    }
  }, [array]);

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentStepIndex((idx) => {
          if (idx < steps.length - 1) return idx + 1;
          else {
            setIsPlaying(false);
            return idx;
          }
        });
      }, 800);
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
    
    const { comparing, swapped, sortedIndices, currentKey, insertingAt } = steps[currentStepIndex];
    
    if (insertingAt !== null && insertingAt === index) {
      return 'bg-gradient-to-t from-orange-400 to-orange-300 border-orange-300';
    } else if (currentKey !== null && currentKey === index) {
      return 'bg-gradient-to-t from-purple-400 to-purple-300 border-purple-300';
    } else if (sortedIndices && sortedIndices.includes(index)) {
      return 'bg-gradient-to-t from-green-400 to-green-300 border-green-300';
    } else if (swapped && swapped.includes(index)) {
      return 'bg-gradient-to-t from-red-400 to-red-300 border-red-300';
    } else if (comparing && comparing.includes(index)) {
      return 'bg-gradient-to-t from-yellow-400 to-yellow-300 border-yellow-300';
    } else {
      return 'bg-gradient-to-t from-blue-400 to-cyan-300 border-blue-300';
    }
  };

  const getStepDescription = () => {
    if (!steps.length || currentStepIndex >= steps.length) return '';
    
    const { comparing, swapped, sortedIndices, currentKey, insertingAt } = steps[currentStepIndex];
    const currentArray = steps[currentStepIndex].array;
    
    if (currentKey !== null) {
      return `Selecting element ${currentArray[currentKey]} at position ${currentKey} as the key to insert`;
    } else if (comparing) {
      return `Comparing key with element at position ${comparing[0]}`;
    } else if (swapped) {
      return `Shifting element from position ${swapped[0]} to position ${swapped[1]}`;
    } else if (insertingAt !== null) {
      return `Inserting key at position ${insertingAt}`;
    } else if (sortedIndices && sortedIndices.length === currentArray.length) {
      return "Array is sorted!";
    } else {
      return "Ready to start sorting";
    }
  };

  const currentStep = steps[currentStepIndex];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 p-8 flex items-center justify-center">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-cyan-200">
            Insertion Sort Visualizer
          </h1>
          <p className="text-blue-200 text-lg opacity-90">
            Watch how insertion sort builds a sorted array one element at a time
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
                    ${(currentStep.comparing && currentStep.comparing.includes(index)) || 
                      (currentStep.swapped && currentStep.swapped.includes(index)) || 
                      (currentStep.currentKey === index) || 
                      (currentStep.insertingAt === index) ? 'scale-110' : 'scale-100'}
                    shadow-lg
                  `}
                >
                  {value}
                </div>
              ))}
            </div>

            {/* Step Information */}
            <div className="text-center mb-6">
              <div className="text-blue-200 text-sm mt-2 font-medium">
                {getStepDescription()}
              </div>
              <div className="text-blue-300 text-xs mt-1 opacity-75">
                Step {currentStepIndex + 1} of {steps.length}
              </div>
            </div>

            {/* Legend */}
            <div className="flex flex-wrap justify-center gap-6 text-sm mb-8">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gradient-to-t from-blue-400 to-cyan-300 rounded border border-blue-300"></div>
                <span className="text-blue-200">Unsorted</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gradient-to-t from-purple-400 to-purple-300 rounded border border-purple-300"></div>
                <span className="text-purple-200">Current Key</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gradient-to-t from-yellow-400 to-yellow-300 rounded border border-yellow-300"></div>
                <span className="text-yellow-200">Comparing</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gradient-to-t from-red-400 to-red-300 rounded border border-red-300"></div>
                <span className="text-red-200">Shifting</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gradient-to-t from-orange-400 to-orange-300 rounded border border-orange-300"></div>
                <span className="text-orange-200">Inserting</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-gradient-to-t from-green-400 to-green-300 rounded border border-green-300"></div>
                <span className="text-green-200">Sorted</span>
              </div>
            </div>

            {/* Controls - Only show when array exists */}
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold rounded-xl hover:from-green-600 hover:to-emerald-600 transition-all duration-200 transform hover:scale-105"
              >
                {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                {isPlaying ? 'Pause' : 'Start Sort'}
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
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold rounded-xl hover:from-green-600 hover:to-emerald-600 transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:transform-none disabled:cursor-not-allowed"
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