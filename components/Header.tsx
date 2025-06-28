import React from 'react';
import { HomeIcon } from './icons';

export const Header: React.FC = () => {
  return (
    <header className="py-6 px-4">
      <div className="container mx-auto flex items-center justify-center">
        <a href="/" className="flex items-center gap-3 text-white">
          <HomeIcon className="h-8 w-8 text-indigo-300" />
          <span className="text-2xl font-bold tracking-wider">HavenFinder AI</span>
        </a>
      </div>
    </header>
  );
};