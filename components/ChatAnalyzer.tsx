import React, { useState } from 'react';
import { analyzeChatAndSuggestReply } from '../services/geminiService';
import { fileToBase64 } from '../utils/fileUtils';
import { View } from '../types';
import Spinner from './Spinner';

interface ChatAnalyzerProps {
    navigate: (view: View) => void;
    onAnalyze: () => void;
}

const ChatAnalyzer: React.FC<ChatAnalyzerProps> = ({ navigate, onAnalyze }) => {
    const [image, setImage] = useState<{ preview: string; base64: string; mimeType: string } | null>(null);
    const [spiciness, setSpiciness] = useState(50); // 0 to 100
    const [reply, setReply] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            try {
                const base64 = await fileToBase64(file);
                setImage({
                    preview: URL.createObjectURL(file),
                    base64: base64,
                    mimeType: file.type,
                });
                setError('');
                setReply('');
            } catch (err) {
                setError('No se pudo cargar la imagen.');
            }
        }
    };
    
    const handleGenerate = async () => {
        if (!image) {
            setError('Por favor, sube una captura de pantalla.');
            return;
        }
        setIsLoading(true);
        setReply('');
        setError('');
        const result = await analyzeChatAndSuggestReply(image.base64, image.mimeType, spiciness);
        setReply(result);
        setIsLoading(false);
        onAnalyze();
    };

    return (
        <div className="h-full py-8 px-4 relative flex flex-col">
            <button onClick={() => navigate(View.DASHBOARD)} className="absolute top-0 left-0 text-5xl font-light text-gray-400 hover:text-white transition-colors">&larr;</button>
            <div className="flex flex-col items-center space-y-6 mt-12 flex-grow">
                <h1 className="text-4xl font-bold text-center text-white">Analiza tu chat</h1>
                
                <div className="w-full p-2 glass-card">
                    <div className="bg-black/50 rounded-2xl">
                        {image ? (
                            <img src={image.preview} alt="Chat preview" className="w-full h-auto rounded-xl object-contain max-h-80" />
                        ) : (
                            <label htmlFor="file-upload" className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-600 rounded-xl cursor-pointer hover:bg-white/10 transition">
                                <svg className="w-10 h-10 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-4-4V6a4 4 0 014-4h10a4 4 0 014 4v6a4 4 0 01-4 4H7z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 9v6m3-3H7"></path></svg>
                                <p className="mt-2 text-sm text-gray-400">Sube una captura</p>
                            </label>
                        )}
                    </div>
                     <input id="file-upload" type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
                </div>

                <div className="w-full max-w-sm space-y-4">
                    <div className="relative pt-1">
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={spiciness}
                            onChange={(e) => setSpiciness(parseInt(e.target.value))}
                        />
                        <div className="flex justify-between text-xs text-gray-400 font-bold mt-2">
                            <span>+nerd</span>
                            <span>+picante</span>
                        </div>
                    </div>

                    <button
                        onClick={handleGenerate}
                        disabled={isLoading || !image}
                        className="w-full text-white font-bold py-4 px-6 rounded-2xl gradient-button"
                    >
                        {isLoading ? 'Analizando...' : 'Generar Respuesta'}
                    </button>
                    {error && <p className="text-red-400 text-sm text-center">{error}</p>}
                </div>

                <div className="w-full max-w-sm mt-4 flex-grow flex flex-col justify-end">
                    {isLoading && <Spinner />}
                    {reply && !isLoading && (
                         <div className="gradient-button text-white p-4 rounded-3xl rounded-br-lg shadow-lg relative animate-fade-in">
                            <p className="text-lg">{reply}</p>
                            {/* SVG for the tail, using a stop color from the gradient */}
                             <svg className="absolute bottom-0 right-0 translate-y-[99%]" width="20" height="20" viewBox="0 0 20 20">
                                <defs>
                                    <linearGradient id="bubbleTail" x1="0%" y1="0%" x2="100%" y2="0%">
                                        <stop offset="0%" stopColor="#8A2BE2" />
                                        <stop offset="100%" stopColor="#4169E1" />
                                    </linearGradient>
                                </defs>
                                <path d="M0 0 L20 0 L20 20 Z" fill="url(#bubbleTail)" />
                            </svg>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ChatAnalyzer;