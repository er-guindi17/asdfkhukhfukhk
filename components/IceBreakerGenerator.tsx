import React, { useState } from 'react';
import { generateIceBreaker } from '../services/geminiService';
import { View } from '../types';
import Spinner from './Spinner';

interface IceBreakerGeneratorProps {
    navigate: (view: View) => void;
    onGenerate: () => void;
}

const IceBreakerGenerator: React.FC<IceBreakerGeneratorProps> = ({ navigate, onGenerate }) => {
    const [iceBreaker, setIceBreaker] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleGenerate = async () => {
        setIsLoading(true);
        setIceBreaker('');
        const result = await generateIceBreaker();
        setIceBreaker(result);
        setIsLoading(false);
        onGenerate();
    };

    return (
        <div className="h-full flex flex-col justify-center items-center text-center p-4 relative">
            <button onClick={() => navigate(View.DASHBOARD)} className="absolute top-0 left-0 text-5xl font-light text-gray-400 hover:text-white transition-colors">&larr;</button>
            
            <div className="w-full max-w-md">
                <h2 className="text-3xl text-gray-300 mb-4 font-bold">Rompe el hielo con un botón. 🧊</h2>
                
                <div className="my-8 h-32 flex items-center justify-center p-6 glass-card">
                    {isLoading ? <Spinner /> : (
                        <p className="text-2xl font-semibold text-white">{iceBreaker || '...'}</p>
                    )}
                </div>

                <button
                    onClick={handleGenerate}
                    disabled={isLoading}
                    className="w-full text-white font-bold py-4 px-6 rounded-2xl gradient-button"
                >
                    {isLoading ? 'Generando...' : 'Generar Flechazo'}
                </button>
            </div>
        </div>
    );
};

export default IceBreakerGenerator;