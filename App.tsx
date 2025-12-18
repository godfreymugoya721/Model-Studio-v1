
import React, { useState } from 'react';
import { Camera, Sparkles, Loader2, ChevronRight } from 'lucide-react';
import Header from './components/Header';
import Uploader from './components/Uploader';
import CritiqueSection from './components/CritiqueSection';
import Gallery from './components/Gallery';
import { analyzeImage, generateVariation } from './services/geminiService';
import { AppState, AnalysisResult, Variation } from './types';

const App: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [variations, setVariations] = useState<Variation[]>([]);
  const [state, setState] = useState<AppState>('idle');
  const [progressText, setProgressText] = useState("");

  const handleUpload = (base64: string) => {
    setSelectedImage(base64);
    setAnalysis(null);
    setVariations([]);
    setState('idle');
  };

  const startSession = async () => {
    if (!selectedImage) return;

    try {
      setState('analyzing');
      setProgressText("Critiquing composition and features...");
      const analysisResult = await analyzeImage(selectedImage);
      setAnalysis(analysisResult);

      setState('developing');
      setProgressText("Rendering high-fashion variations...");
      
      const newVariations: Variation[] = [];
      // Generate one by one for visual feedback or together. Let's do a loop.
      for (const style of analysisResult.prompts) {
        setProgressText(`Developing ${style}...`);
        const resultUrl = await generateVariation(selectedImage, style);
        if (resultUrl) {
          newVariations.push({ url: resultUrl, style });
          setVariations([...newVariations]); // Incremental update
        }
      }

      setState('completed');
    } catch (error) {
      console.error(error);
      alert("An error occurred during the session. Please try again.");
      setState('idle');
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-neutral-100 selection:bg-neutral-100 selection:text-black">
      <Header />

      <main className="max-w-7xl mx-auto px-6 py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          
          {/* Left: Upload and Action */}
          <div className="space-y-10 sticky top-12 self-start">
            <div className="space-y-4">
              <h2 className="text-xs tracking-widest-plus uppercase text-neutral-500 font-medium">Source Material</h2>
              <Uploader onUpload={handleUpload} selectedImage={selectedImage} />
            </div>

            {selectedImage && state === 'idle' && (
              <button 
                onClick={startSession}
                className="group w-full py-6 bg-white text-black text-xs uppercase tracking-widest-plus font-bold hover:bg-neutral-200 transition-all flex items-center justify-center gap-3"
              >
                Begin Studio Session
                <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            )}

            {(state === 'analyzing' || state === 'developing') && (
              <div className="flex flex-col items-center gap-6 py-8 border border-neutral-800/50 bg-neutral-900/20 backdrop-blur-sm">
                <Loader2 className="animate-spin text-neutral-500" size={32} strokeWidth={1} />
                <div className="text-center space-y-2">
                  <p className="text-[10px] tracking-widest-plus uppercase text-neutral-400 font-light">{state} phase</p>
                  <p className="text-xs text-neutral-600 font-serif italic">{progressText}</p>
                </div>
              </div>
            )}
            
            {state === 'completed' && (
              <div className="p-6 border border-green-900/30 bg-green-950/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Sparkles size={16} className="text-green-500" />
                  <span className="text-[10px] tracking-widest uppercase text-green-700">Portfolio Ready</span>
                </div>
                <button 
                  onClick={() => handleUpload("")}
                  className="text-[9px] uppercase tracking-widest text-neutral-500 hover:text-white transition-colors underline underline-offset-4"
                >
                  New Shoot
                </button>
              </div>
            )}
          </div>

          {/* Right: Results and Analysis */}
          <div className="space-y-16">
            {!selectedImage && (
              <div className="h-full flex flex-col justify-center items-center text-center space-y-8 py-20 lg:py-40 border border-dashed border-neutral-900">
                <div className="p-8 rounded-full border border-neutral-900 text-neutral-800">
                   <Camera size={48} strokeWidth={0.5} />
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-serif-high italic text-neutral-600">No session active.</h3>
                  <p className="text-xs text-neutral-700 tracking-widest uppercase">Upload a raw photograph to begin processing.</p>
                </div>
              </div>
            )}

            {analysis && (
              <CritiqueSection analysis={analysis} />
            )}

            {variations.length > 0 && (
              <Gallery variations={variations} />
            )}
          </div>
        </div>
      </main>

      <footer className="max-w-7xl mx-auto p-8 border-t border-neutral-900 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-[10px] text-neutral-700 tracking-widest uppercase">© 2025 THE STUDIO AI — BUILT FOR VOGUE-READY ASSETS</p>
        <div className="flex gap-8">
           <a href="#" className="text-[10px] text-neutral-800 hover:text-neutral-500 transition-colors uppercase tracking-widest">Pricing</a>
           <a href="#" className="text-[10px] text-neutral-800 hover:text-neutral-500 transition-colors uppercase tracking-widest">Privacy</a>
           <a href="#" className="text-[10px] text-neutral-800 hover:text-neutral-500 transition-colors uppercase tracking-widest">Legal</a>
        </div>
      </footer>
    </div>
  );
};

export default App;
