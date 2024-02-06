import React, { useState, useEffect } from 'react';

type Props = {};

const Loader = (props: Props) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    },5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {loading ? (
        <div className="relative dark:bg-slate-900 bg-white min-h-screen flex justify-center items-center">
          <div className="absolute animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-purple-500"></div>
          <img
            src="https://www.svgrepo.com/show/509001/avatar-thinking-9.svg"
            className="rounded-full h-28 w-28"
            alt="Loader"
          />
        </div>
      ) : (
        <div>
          {/* Your main content goes here */}
          <p>This is your content after 4 seconds of loading...</p>
        </div>
      )}
    </div>
  );
};

export default Loader;
