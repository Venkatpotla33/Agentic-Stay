import React, { useState } from 'react';
import { SearchIcon } from './icons';

interface ChatInputProps {
  onSearch: (query: string) => void;
  isLoading: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSearch, isLoading }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoading) {
      onSearch(query);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex items-center gap-2 p-2 rounded-xl shadow-2xl bg-white/10 backdrop-blur-sm border border-white/20">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="e.g., A homestay in a quiet village in Himachal Pradesh..."
        className="w-full flex-grow px-4 py-2 bg-transparent text-white placeholder-indigo-200 border-none focus:ring-0 focus:outline-none"
        disabled={isLoading}
      />
      <button
        type="submit"
        disabled={isLoading || !query}
        className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-950 focus:ring-indigo-500 disabled:bg-indigo-900/50 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors duration-200 flex items-center gap-2"
      >
        {isLoading ? (
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
        ) : (
          <>
            <SearchIcon className="h-5 w-5" />
            <span>Search</span>
          </>
        )}
      </button>
    </form>
  );
};
