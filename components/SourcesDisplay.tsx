import React from 'react';
import { GroundingSource } from '../types';
import { LinkIcon } from './icons';

interface SourcesDisplayProps {
  sources: GroundingSource[];
}

export const SourcesDisplay: React.FC<SourcesDisplayProps> = ({ sources }) => {
  if (sources.length === 0) {
    return null;
  }

  return (
    <div className="mb-8 p-4 bg-indigo-900/70 rounded-lg max-w-5xl mx-auto border border-indigo-800">
      <div className="flex items-center gap-2 mb-3">
        <LinkIcon className="h-5 w-5 text-indigo-300" />
        <h4 className="font-semibold text-indigo-200">Information based on real-time data from:</h4>
      </div>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-2">
        {sources.map((source, index) => (
          <li key={index} className="truncate">
            <a
              href={source.uri}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-indigo-400 hover:text-indigo-300 hover:underline truncate"
              title={source.title}
            >
              {source.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};
