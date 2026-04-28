'use client';

import React from 'react';
import { GlareCard } from '../ui/GlareCard';
import { GlowCard } from '../ui/GlowCard';

const borderStyles = {
  pink: 'ring-2 ring-red-900/80 sm:group-hover:ring-0',
  blue: 'ring-2  ring-[#5900ff]/80 sm:group-hover:ring-0',
  green: 'ring-2 ring-[#00ffed]/80 sm:group-hover:ring-0',
};

const Card = ({ image, title, text, borderColor }) => {
  return (
   <div className='group aspect-[3.2/5] 2xl:aspect-[3/5] min-w-full 2xl:min-w-[255px] mx-auto'> 
   <div className={`p-0 inset-0 ${borderStyles[borderColor]} block sm:hidden  rounded-3xl`}>
     <div className='relative py-2 text-center bg-black rounded-3xl'>
        <h3 className="text-sm  font-semibold text-white mb-2">{title}</h3>
  
        <div className="relative w-full mb-3">
          <img
            src={image}
            alt={title}
            className="w-full h-auto object-contain z-10 relative saturate-150 brightness-150"
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_1%,black_100%)] z-20 pointer-events-none " />
          <div className="absolute inset-0 z-20 pointer-events-none rounded-3xl bg-[linear-gradient(to_bottom,rgba(0,0,0,0.6)_0%,transparent_10%,transparent_80%,rgba(0,0,0,0.9)_100%)]" />
  
  
        </div>
  
        <p className="text-gray-300 text-[14px] px-2 font-light">{text}</p>
     </div>
    </div>
     <GlowCard
    // w-[800px] max-w-2xl
      className={`p-0 inset-0 ${borderStyles[borderColor]} group-hover:ring-0 hidden sm:block`}
    >
     <div className='relative py-2 text-center bg-black rounded-3xl overflow-hidden'>
        <h3 className="text-sm  font-semibold text-white mb-2">{title}</h3>
  
        <div className="relative w-full mb-3">
          <img
            src={image}
            alt={title}
            className="w-full h-auto object-contain z-10 relative saturate-150 brightness-150"
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_1%,black_100%)] z-20 pointer-events-none " />
          <div className="absolute inset-0 z-20 pointer-events-none rounded-3xl bg-[linear-gradient(to_bottom,rgba(0,0,0,0.6)_0%,transparent_10%,transparent_80%,rgba(0,0,0,0.9)_100%)]" />
  
  
        </div>
  
        <p className="text-gray-300 text-[14px] px-2 font-light">{text}</p>
     </div>
    </GlowCard>
    </div>
  );
};

export default Card;
