import React from 'react';
import { GeneratedImage } from '../types';
import { History, Trash2 } from 'lucide-react';

interface GalleryProps {
  history: GeneratedImage[];
  onSelect: (image: GeneratedImage) => void;
  onClear: () => void;
}

const Gallery: React.FC<GalleryProps> = ({ history, onSelect, onClear }) => {
  if (history.length === 0) return null;

  return (
    <div className="bg-neutral-900/50 border border-neutral-800 rounded-xl p-4 flex flex-col h-full overflow-hidden">
      <div className="flex items-center justify-between mb-4 px-2">
        <h3 className="text-lacquer-goldDim font-serif text-lg flex items-center gap-2">
          <History size={18} />
          Collection
        </h3>
        <button 
          onClick={onClear}
          className="text-neutral-500 hover:text-red-400 transition-colors text-xs flex items-center gap-1"
        >
          <Trash2 size={12} />
          Clear
        </button>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-2 gap-3 overflow-y-auto pr-2 custom-scrollbar">
        {history.map((img) => (
          <button
            key={img.id}
            onClick={() => onSelect(img)}
            className="group relative aspect-square rounded-lg overflow-hidden border border-neutral-800 hover:border-lacquer-gold transition-all"
          >
            <img 
              src={img.url} 
              alt="History item" 
              className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-2">
              <span className="text-xs text-neutral-300 font-serif truncate w-full text-left">
                {new Date(img.timestamp).toLocaleTimeString()}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Gallery;