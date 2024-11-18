import React from 'react';
import { Star, MapPin } from 'lucide-react';

interface SearchResult {
  name: string;
  description: string;
  rating: number;
  distance: string;
  address: string;
}

interface SearchResultsProps {
  results: SearchResult[];
  isLoading: boolean;
}

const SearchResults: React.FC<SearchResultsProps> = ({ results, isLoading }) => {
  if (isLoading) {
    return (
      <div className="mt-8 flex justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!results.length) {
    return null;
  }

  return (
    <div className="mt-8 max-w-2xl mx-auto">
      {results.map((result, index) => (
        <div
          key={index}
          className="bg-white rounded-lg shadow-md p-6 mb-4 transition-transform hover:scale-[1.02]"
        >
          <div className="flex justify-between items-start">
            <h3 className="text-xl font-semibold text-gray-800">{result.name}</h3>
            <div className="flex items-center">
              <Star className="h-5 w-5 text-yellow-400 fill-current" />
              <span className="ml-1 text-gray-600">{result.rating}</span>
            </div>
          </div>
          <p className="text-gray-600 mt-2">{result.description}</p>
          <div className="flex items-center mt-4 text-gray-500">
            <MapPin className="h-4 w-4 mr-1" />
            <span className="mr-4">{result.distance}</span>
            <span>{result.address}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SearchResults;