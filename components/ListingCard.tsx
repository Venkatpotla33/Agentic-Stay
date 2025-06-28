import React, { useState, useEffect } from 'react';
import { HomeStay } from '../types';
import { StarIcon, LocationPinIcon, PriceTagIcon } from './icons';
import { generateHomeStayImage } from '../services/geminiService';

interface ListingCardProps {
  listing: HomeStay;
}

const ImagePlaceholder: React.FC = () => (
    <div className="h-56 w-full bg-indigo-900 animate-pulse flex items-center justify-center">
        <svg className="w-10 h-10 text-indigo-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
        </svg>
    </div>
);

export const ListingCard: React.FC<ListingCardProps> = ({ listing }) => {
  const [imageUrl, setImageUrl] = useState<string>('');
  const [isImageLoading, setIsImageLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;

    const fetchImage = async () => {
      if (!listing.imageKeywords) {
        if(isMounted) setIsImageLoading(false);
        return;
      }
      
      if(isMounted) setIsImageLoading(true);
      const generatedUrl = await generateHomeStayImage(listing.imageKeywords);
      
      if (isMounted) {
        setImageUrl(generatedUrl);
        setIsImageLoading(false);
      }
    };

    fetchImage();

    return () => {
      isMounted = false;
    };
  }, [listing.imageKeywords]);

  const fallbackImageUrl = `https://source.unsplash.com/800x600/?${encodeURIComponent(listing.imageKeywords)}`;
  const displayUrl = imageUrl || fallbackImageUrl;

  return (
    <div className="bg-indigo-900/70 border border-indigo-800 rounded-xl shadow-lg overflow-hidden transform hover:-translate-y-1 transition-all duration-300 flex flex-col backdrop-blur-sm">
      <div className="h-56 w-full">
        {isImageLoading ? (
            <ImagePlaceholder />
        ) : (
            <img className="h-full w-full object-cover" src={displayUrl} alt={listing.name} onError={(e) => (e.currentTarget.src = fallbackImageUrl)} />
        )}
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex-grow">
          <h3 className="text-xl font-bold text-white mb-2">{listing.name}</h3>
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(listing.location)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-indigo-200 mb-3 group hover:text-white transition-colors duration-200"
            title={`View ${listing.location} on Google Maps`}
          >
            <LocationPinIcon className="h-5 w-5 text-indigo-400" />
            <span className="group-hover:underline">{listing.location}</span>
          </a>
          <p className="text-indigo-200 text-sm mb-4">{listing.description}</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {listing.amenities.slice(0, 4).map((amenity) => (
              <span key={amenity} className="bg-indigo-800 text-indigo-200 text-xs font-medium px-2.5 py-1 rounded-full">
                {amenity}
              </span>
            ))}
          </div>
        </div>
        <div className="border-t border-indigo-800 pt-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
             <PriceTagIcon className="h-5 w-5 text-green-400" />
            <span className="text-xl font-bold text-white">₹{listing.pricePerNight.toLocaleString('en-IN')}</span>
            <span className="text-indigo-300">/ night</span>
          </div>
          <div className="flex items-center gap-1 text-amber-400">
            <StarIcon className="h-5 w-5" />
            <span className="font-bold text-white">{listing.rating.toFixed(1)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};