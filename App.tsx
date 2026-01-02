import React, { useState, useEffect } from 'react';
import { generateLacquerwareImage } from './services/geminiService';
import Controls from './components/Controls';
import PreviewArea from './components/PreviewArea';
import Gallery from './components/Gallery';
import { DesignState, GeneratedImage, LacquerColor, Motif, Decoration } from './types';
import { Layout } from 'lucide-react';

const App: React.FC = () => {
  // Initial state based on the specific user prompt
  // "A lacquerware tea canister, base color is black lacquer, the top has gold orchid lines, 
  // scroll grass pattern around, faintly embellished with small granular mother-of-pearl."
  const [design, setDesign] = useState<DesignState>({
    baseColor: LacquerColor.Black,
    motif: Motif.Orchid,
    technique: 'Maki-e (Sprinkled Gold)',
    shape: 'Tea Canister (茶叶罐)',
    decoration: Decoration.MotherOfPearl,
    additionalPrompt: 'Top has gold-painted orchid lines. Around the canister, simplified scroll grass patterns, harmonizing with the top. Faintly dotted with small granular mother-of-pearl inlays.'
  });

  const [currentImage, setCurrentImage] = useState<GeneratedImage | null>(null);
  const [history, setHistory] = useState<GeneratedImage[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    setIsGenerating(true);
    setError(null);
    try {
      const imageUrl = await generateLacquerwareImage(design);
      const newImage: GeneratedImage = {
        id: Date.now().toString(),
        url: imageUrl,
        prompt: design.additionalPrompt,
        timestamp: Date.now()
      };
      setCurrentImage(newImage);
      setHistory(prev => [newImage, ...prev]);
    } catch (err: any) {
      setError(err.message || "Failed to craft the lacquerware. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-neutral-200 font-sans selection:bg-lacquer-gold selection:text-black">
      {/* Background Texture Overlay */}
      <div className="fixed inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }}></div>

      <header className="border-b border-neutral-900 bg-neutral-950/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-gradient-to-br from-lacquer-gold to-lacquer-goldDim flex items-center justify-center text-black font-serif font-bold text-xl">
              漆
            </div>
            <h1 className="text-xl font-serif text-neutral-100 tracking-wide">
              LACQUERWARE <span className="text-lacquer-goldDim">STUDIO</span>
            </h1>
          </div>
          <div className="text-xs text-neutral-500 font-mono hidden sm:block">
            Gemini 2.5 Powered Craftsmanship
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-4 md:p-6 lg:p-8 h-[calc(100vh-4rem)] flex flex-col lg:flex-row gap-6">
        
        {/* Left Column: Controls */}
        <div className="w-full lg:w-1/3 xl:w-1/4 flex-shrink-0 flex flex-col gap-4 min-h-[500px]">
          <Controls 
            design={design} 
            onChange={setDesign} 
            onGenerate={handleGenerate} 
            isGenerating={isGenerating} 
          />
        </div>

        {/* Middle: Preview */}
        <div className="w-full lg:w-2/3 xl:w-2/4 flex flex-col gap-4 flex-grow">
          {error && (
            <div className="bg-red-900/20 border border-red-800 text-red-300 px-4 py-3 rounded-md text-sm">
              Error: {error}
            </div>
          )}
          <PreviewArea currentImage={currentImage} isGenerating={isGenerating} />
        </div>

        {/* Right Column: Gallery (Desktop) */}
        <div className="hidden xl:block xl:w-1/4 h-full">
            <Gallery 
              history={history} 
              onSelect={setCurrentImage} 
              onClear={() => setHistory([])} 
            />
        </div>

        {/* Mobile/Tablet Gallery (Below) */}
        <div className="xl:hidden w-full h-48 lg:h-64">
           <Gallery 
              history={history} 
              onSelect={setCurrentImage} 
              onClear={() => setHistory([])} 
            />
        </div>
      </main>
    </div>
  );
};

export default App;