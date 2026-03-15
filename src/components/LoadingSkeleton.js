import React from 'react';

const LoadingSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="glass rounded-lg overflow-hidden animate-pulse">
          <div className="w-full h-64 bg-gradient-to-r from-slate-700 to-slate-800 shimmer"></div>
          <div className="p-4 space-y-3">
            <div className="h-4 bg-slate-700 rounded w-3/4 shimmer"></div>
            <div className="h-3 bg-slate-700 rounded w-1/2 shimmer"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LoadingSkeleton;
