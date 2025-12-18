
import React from 'react';
import { Variation } from '../types';
import { Download, ExternalLink } from 'lucide-react';

interface GalleryProps {
  variations: Variation[];
}

const Gallery: React.FC<GalleryProps> = ({ variations }) => {
  if (variations.length === 0) return null;

  return (
    <div className="space-y-10 animate-in fade-in duration-1000">
      <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
        <h3 className="text-sm uppercase tracking-widest text-neutral-500 font-light">Developed Portfolio</h3>
        <span className="text-[10px] text-neutral-700">{variations.length} SELECTS</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {variations.map((v, i) => (
          <div key={i} className="group relative aspect-[3/4] bg-neutral-900 overflow-hidden">
            <img 
              src={v.url} 
              alt={v.style} 
              className="w-full h-full object-cover transition duration-1000 group-hover:scale-105" 
            />
            
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-center gap-6 p-8">
              <p className="text-xs tracking-widest uppercase text-center font-light">{v.style}</p>
              <div className="flex gap-4">
                 <button 
                  onClick={() => {
                    const link = document.createElement('a');
                    link.href = v.url;
                    link.download = `studio-ai-${v.style.replace(/\s+/g, '-').toLowerCase()}.png`;
                    link.click();
                  }}
                  className="p-3 border border-white/20 rounded-full hover:bg-white hover:text-black transition-colors"
                >
                  <Download size={16} />
                </button>
                <a 
                  href={v.url} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="p-3 border border-white/20 rounded-full hover:bg-white hover:text-black transition-colors"
                >
                  <ExternalLink size={16} />
                </a>
              </div>
            </div>

            <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-md border border-white/10 px-3 py-1 text-[9px] tracking-widest uppercase">
              {v.style}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
