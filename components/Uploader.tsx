
import React from 'react';
import { Upload } from 'lucide-react';

interface UploaderProps {
  onUpload: (base64: string) => void;
  selectedImage: string | null;
}

const Uploader: React.FC<UploaderProps> = ({ onUpload, selectedImage }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onUpload(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="relative group aspect-[3/4] bg-neutral-900/50 border border-neutral-800/50 overflow-hidden flex items-center justify-center">
      {selectedImage ? (
        <img 
          src={selectedImage} 
          alt="Original Source" 
          className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition duration-700 ease-in-out"
        />
      ) : (
        <label className="cursor-pointer flex flex-col items-center gap-6 text-neutral-600 hover:text-neutral-200 transition-all duration-300">
          <div className="p-6 rounded-full border border-neutral-800 group-hover:border-neutral-400 transition-colors">
            <Upload size={32} strokeWidth={1} />
          </div>
          <div className="text-center">
            <p className="text-xs tracking-widest-plus uppercase font-light">Upload Raw Negative</p>
            <p className="text-[10px] text-neutral-700 mt-2">JPEG / PNG / RAW</p>
          </div>
          <input type="file" className="hidden" accept="image/*" onChange={handleChange} />
        </label>
      )}
      
      {selectedImage && (
        <label className="absolute bottom-4 right-4 cursor-pointer bg-black/40 backdrop-blur-md border border-white/10 px-4 py-2 text-[10px] tracking-widest uppercase hover:bg-white hover:text-black transition-all">
          Replace
          <input type="file" className="hidden" accept="image/*" onChange={handleChange} />
        </label>
      )}
    </div>
  );
};

export default Uploader;
