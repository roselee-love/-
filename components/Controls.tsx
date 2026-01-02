import React from 'react';
import { DesignState, LacquerColor, Motif, Decoration } from '../types';
import { Palette, Flower, Sparkles, Box, PenTool } from 'lucide-react';

interface ControlsProps {
  design: DesignState;
  onChange: (newDesign: DesignState) => void;
  onGenerate: () => void;
  isGenerating: boolean;
}

const Controls: React.FC<ControlsProps> = ({ design, onChange, onGenerate, isGenerating }) => {
  
  const handleChange = (key: keyof DesignState, value: string) => {
    onChange({ ...design, [key]: value });
  };

  return (
    <div className="bg-neutral-900/50 backdrop-blur-md border border-neutral-800 p-6 rounded-xl flex flex-col gap-6 h-full overflow-y-auto">
      <div className="space-y-2">
        <h2 className="text-lacquer-gold font-serif text-2xl mb-1 flex items-center gap-2">
           <PenTool size={20} />
           Crafting Bench
        </h2>
        <p className="text-neutral-400 text-sm">Configure the elements of your masterpiece.</p>
      </div>

      <div className="space-y-4">
        {/* Base Color */}
        <div className="space-y-2">
          <label className="text-neutral-300 text-sm font-medium flex items-center gap-2">
            <Palette size={16} className="text-lacquer-goldDim" />
            Base Lacquer (底色)
          </label>
          <div className="grid grid-cols-2 gap-2">
            {Object.values(LacquerColor).map((color) => (
              <button
                key={color}
                onClick={() => handleChange('baseColor', color)}
                className={`p-2 text-xs rounded-md border transition-all duration-300 ${
                  design.baseColor === color
                    ? 'bg-lacquer-gold/20 border-lacquer-gold text-lacquer-gold'
                    : 'bg-neutral-800 border-neutral-700 text-neutral-400 hover:border-neutral-500'
                }`}
              >
                {color}
              </button>
            ))}
          </div>
        </div>

        {/* Motif */}
        <div className="space-y-2">
          <label className="text-neutral-300 text-sm font-medium flex items-center gap-2">
            <Flower size={16} className="text-lacquer-goldDim" />
            Main Motif (纹样)
          </label>
          <select
            value={design.motif}
            onChange={(e) => handleChange('motif', e.target.value)}
            className="w-full bg-neutral-800 border border-neutral-700 text-neutral-200 rounded-md p-2 text-sm focus:border-lacquer-gold focus:outline-none"
          >
            {Object.values(Motif).map((m) => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
        </div>

        {/* Decoration */}
        <div className="space-y-2">
          <label className="text-neutral-300 text-sm font-medium flex items-center gap-2">
            <Sparkles size={16} className="text-lacquer-goldDim" />
            Embellishments (装饰)
          </label>
          <div className="grid grid-cols-2 gap-2">
            {Object.values(Decoration).map((deco) => (
              <button
                key={deco}
                onClick={() => handleChange('decoration', deco)}
                className={`p-2 text-xs rounded-md border transition-all duration-300 ${
                  design.decoration === deco
                    ? 'bg-lacquer-gold/20 border-lacquer-gold text-lacquer-gold'
                    : 'bg-neutral-800 border-neutral-700 text-neutral-400 hover:border-neutral-500'
                }`}
              >
                {deco}
              </button>
            ))}
          </div>
        </div>

        {/* Shape */}
        <div className="space-y-2">
          <label className="text-neutral-300 text-sm font-medium flex items-center gap-2">
            <Box size={16} className="text-lacquer-goldDim" />
            Vessel Shape (器型)
          </label>
          <select
            value={design.shape}
            onChange={(e) => handleChange('shape', e.target.value)}
            className="w-full bg-neutral-800 border border-neutral-700 text-neutral-200 rounded-md p-2 text-sm focus:border-lacquer-gold focus:outline-none"
          >
            <option value="Tea Canister (茶叶罐)">Tea Canister (茶叶罐)</option>
            <option value="Natsume Tea Caddy (枣)">Natsume Tea Caddy (枣)</option>
            <option value="Incense Box (香合)">Incense Box (香合)</option>
            <option value="Tray (漆盘)">Tray (漆盘)</option>
            <option value="Vase (花瓶)">Vase (花瓶)</option>
          </select>
        </div>

        {/* Specific Description */}
        <div className="space-y-2">
          <label className="text-neutral-300 text-sm font-medium">Detailed Description (细节描述)</label>
          <textarea
            value={design.additionalPrompt}
            onChange={(e) => handleChange('additionalPrompt', e.target.value)}
            className="w-full h-32 bg-neutral-800 border border-neutral-700 text-neutral-200 rounded-md p-3 text-sm focus:border-lacquer-gold focus:outline-none resize-none"
            placeholder="Describe specific details like 'scroll grass patterns', 'faint mother of pearl dots'..."
          />
        </div>

        <button
          onClick={onGenerate}
          disabled={isGenerating}
          className={`w-full py-4 mt-4 rounded-md font-serif font-bold text-lg tracking-wider transition-all duration-300 flex items-center justify-center gap-3 ${
            isGenerating
              ? 'bg-neutral-700 text-neutral-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-lacquer-goldDim to-lacquer-gold text-black hover:shadow-[0_0_20px_rgba(212,175,55,0.4)]'
          }`}
        >
          {isGenerating ? (
            <>
              <Sparkles className="animate-spin" />
              CRAFTING...
            </>
          ) : (
            <>
              <Sparkles />
              REVEAL MASTERPIECE
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default Controls;