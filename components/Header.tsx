
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-neutral-900 px-8 py-6 flex justify-between items-center">
      <div className="flex flex-col">
        <h1 className="text-xl font-serif-high tracking-[0.3em] uppercase font-light">
          The Studio <span className="text-neutral-700">AI</span>
        </h1>
        <span className="text-[9px] text-neutral-600 tracking-[0.4em] uppercase font-medium mt-1">Advanced Fashion Photography</span>
      </div>
      
      <nav className="hidden md:flex gap-10">
        {['Archive', 'Portfolio', 'Process', 'Join'].map((item) => (
          <a 
            key={item} 
            href="#" 
            className="text-[10px] tracking-widest uppercase text-neutral-500 hover:text-neutral-100 transition-all duration-300 relative group"
          >
            {item}
            <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white transition-all duration-300 group-hover:w-full"></span>
          </a>
        ))}
      </nav>

      <div className="flex items-center gap-6">
         <div className="hidden lg:flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
            <span className="text-[9px] text-neutral-500 tracking-widest uppercase">Server Active</span>
         </div>
         <button className="px-5 py-2 border border-neutral-800 text-[10px] tracking-widest uppercase hover:bg-white hover:text-black transition-all">
           Sign In
         </button>
      </div>
    </header>
  );
};

export default Header;
