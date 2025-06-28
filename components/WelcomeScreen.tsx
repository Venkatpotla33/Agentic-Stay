import React from 'react';
import { SparklesIcon } from './icons';

interface WelcomeScreenProps {
  hasSearched: boolean;
  onSuggestionClick: (query: string) => void;
}

const suggestions = [
  "A heritage haveli in a Rajasthan village",
  "A serene backwater villa in Kerala",
  "A tea plantation bungalow in Darjeeling",
  "A cozy cottage in the Himalayas near Manali"
];

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ hasSearched, onSuggestionClick }) => {
  if (hasSearched) {
    return (
      <div className="text-center p-12 bg-white/5 rounded-lg shadow-md border border-white/10">
        <h2 className="text-2xl font-bold text-white mb-2">No Stays Found</h2>
        <p className="text-gray-300 mb-6">We couldn't find any stays matching your search. Try being more general or rephrasing your request.</p>
        <button
          onClick={() => onSuggestionClick("Show me any available properties")}
          className="bg-indigo-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Show me some examples
        </button>
      </div>
    );
  }

  return (
    <div className="text-center p-8">
       <div className="flex justify-center items-center gap-2 mb-4">
        <SparklesIcon className="w-6 h-6 text-indigo-400"/>
        <h2 className="text-2xl font-semibold text-white">Start by telling me what you're looking for!</h2>
      </div>
      <p className="text-indigo-200 mb-6 max-w-2xl mx-auto">You can be as specific or as general as you like. Here are a few ideas to get you started:</p>
      <div className="flex flex-wrap justify-center gap-3">
        {suggestions.map((suggestion) => (
          <button
            key={suggestion}
            onClick={() => onSuggestionClick(suggestion)}
            className="bg-indigo-900/70 text-indigo-200 px-4 py-2 rounded-full hover:bg-indigo-900 hover:text-white transition-colors duration-200 text-sm font-medium border border-indigo-800"
          >
            {suggestion}
          </button>
        ))}
      </div>
    </div>
  );
};
