import React from 'react';
import { GeneratedImage } from '../types';
import { Download, ZoomIn, Info } from 'lucide-react';

interface PreviewAreaProps {
  currentImage: GeneratedImage | null;
  isGenerating: boolean;
}

const PreviewArea: React.FC<PreviewAreaProps> = ({ currentImage, isGenerating }) => {
  const [showInfo, setShowInfo] = React.useState(false);

  const handleDownload = () => {
    if (currentImage) {
      const link = document.createElement('a');
      link.href = currentImage.url;
      link.download = `lacquerware-${currentImage.id}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="relative h-full min-h-[500px] w-full bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden flex items-center justify-center group">
      {/* Decorative Corner Borders */}
      <div className="absolute top-4 left-4 w-16 h-16 border-t-2 border-l-2 border-lacquer-gold/30 rounded-tl-lg"></div>
      <div className="absolute top-4 right-4 w-16 h-16 border-t-2 border-r-2 border-lacquer-gold/30 rounded-tr-lg"></div>
      <div className="absolute bottom-4 left-4 w-16 h-16 border-b-2 border-l-2 border-lacquer-gold/30 rounded-bl-lg"></div>
      <div className="absolute bottom-4 right-4 w-16 h-16 border-b-2 border-r-2 border-lacquer-gold/30 rounded-br-lg"></div>

      {isGenerating ? (
        <div className="flex flex-col items-center justify-center space-y-6 animate-pulse z-10">
          <div className="w-24 h-24 border-4 border-lacquer-gold/50 border-t-lacquer-gold rounded-full animate-spin"></div>
          <p className="text-lacquer-gold font-serif text-xl tracking-widest">APPLYING LACQUER...</p>
          <p className="text-neutral-500 text-sm">Please wait while the layers dry</p>
        </div>
      ) : currentImage ? (
        <div className="relative w-full h-full">
           <img 
            src={currentImage.url} 
            alt="Generated Lacquerware" 
            className="w-full h-full object-contain p-8 animate-in fade-in duration-1000"
          />
          
          {/* Overlay Actions */}
          <div className="absolute top-6 right-6 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button 
              onClick={() => setShowInfo(!showInfo)}
              className="p-3 bg-black/60 hover:bg-black/80 text-white rounded-full backdrop-blur-md transition-all"
              title="View Details"
            >
              <Info size={20} />
            </button>
            <button 
              onClick={handleDownload}
              className="p-3 bg-black/60 hover:bg-black/80 text-white rounded-full backdrop-blur-md transition-all"
              title="Download Image"
            >
              <Download size={20} />
            </button>
          </div>

          {/* Prompt Info Overlay */}
          {showInfo && (
            <div className="absolute bottom-6 left-6 right-6 bg-black/80 backdrop-blur-md p-4 rounded-lg border border-neutral-700 text-neutral-300 text-sm transition-all animate-in slide-in-from-bottom-2">
              <h4 className="text-lacquer-gold font-serif mb-1">Crafting Specification</h4>
              <p className="line-clamp-3">{currentImage.prompt}</p>
            </div>
          )}
        </div>
      ) : (
        <div className="text-center p-8 z-10 max-w-md">
          <div className="mb-6 mx-auto w-20 h-20 rounded-full bg-neutral-800 flex items-center justify-center">
            <ZoomIn className="text-neutral-600" size={32} />
          </div>
          <h3 className="text-2xl font-serif text-neutral-300 mb-2">Empty Pedestal</h3>
          <p className="text-neutral-500 leading-relaxed">
            The studio is ready. Adjust the parameters on the left and strike the "Reveal Masterpiece" button to begin your creation.
          </p>
        </div>
      )}
      
      {/* Background radial gradient for depth */}
      {!currentImage && !isGenerating && (
         <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-neutral-800/20 via-neutral-900 to-black z-0"></div>
      )}
    </div>
  );
};

export default PreviewArea;