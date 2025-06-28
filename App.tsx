import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { ChatInput } from './components/ChatInput';
import { ListingCard } from './components/ListingCard';
import { LoadingSpinner } from './components/LoadingSpinner';
import { HomeStay, GroundingSource } from './types';
import { findHomeStays } from './services/geminiService';
import { WelcomeScreen } from './components/WelcomeScreen';
import { ErrorDisplay } from './components/ErrorDisplay';
import { SourcesDisplay } from './components/SourcesDisplay';

const App: React.FC = () => {
  const [listings, setListings] = useState<HomeStay[]>([]);
  const [sources, setSources] = useState<GroundingSource[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState<boolean>(false);

  const handleSearch = useCallback(async (query: string) => {
    if (!query.trim()) return;

    setIsLoading(true);
    setError(null);
    setHasSearched(true);
    setListings([]);
    setSources([]);

    try {
      const { listings: results, sources: searchSources } = await findHomeStays(query);
      setListings(results);
      setSources(searchSources);
    } catch (e) {
      console.error(e);
      setError(e instanceof Error ? e.message : 'An unknown error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="min-h-screen bg-indigo-950 text-gray-300">
      <Header />
      <main className="container mx-auto px-4 pb-16">
        <div className="max-w-3xl mx-auto text-center pt-20 pb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">Find Your Next Home Stay</h1>
          <p className="text-lg text-indigo-200">
            Describe your perfect getaway, and our AI will find the best home stays for you based on real-time data.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <ChatInput onSearch={handleSearch} isLoading={isLoading} />
        </div>

        <div className="mt-12 max-w-5xl mx-auto">
          {isLoading && <LoadingSpinner />}
          {error && <ErrorDisplay message={error} />}
          {!isLoading && !error && (
            <>
              {listings.length > 0 ? (
                <>
                  <SourcesDisplay sources={sources} />
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {listings.map((listing) => (
                      <ListingCard key={listing.id} listing={listing} />
                    ))}
                  </div>
                </>
              ) : (
                  <WelcomeScreen hasSearched={hasSearched} onSuggestionClick={handleSearch} />
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
