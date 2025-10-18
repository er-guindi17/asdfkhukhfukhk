import React from 'react';
import { View } from '../types';
import Logo from './Logo';

interface DashboardProps {
    navigate: (view: View) => void;
    stats: { analyzed: number; generated: number };
}

const StatCounter: React.FC<{ value: number, label: string }> = ({ value, label }) => (
    <div className="flex items-center space-x-4">
        <p className="text-7xl font-black text-white">{value}</p>
        <p className="text-xl text-gray-400 font-medium leading-tight max-w-[120px]">{label}</p>
    </div>
);

const ActionCard: React.FC<{ emoji: string, title: string, onClick: () => void }> = ({ emoji, title, onClick }) => (
    <button 
        onClick={onClick}
        className="w-full p-6 flex items-center space-x-6 text-white transition-all duration-300 ease-in-out transform hover:bg-white/10"
    >
        <span className="text-5xl">{emoji}</span>
        <span className="text-2xl font-bold tracking-wide">{title}</span>
    </button>
);


const Dashboard: React.FC<DashboardProps> = ({ navigate, stats }) => {
    return (
        <div className="space-y-8 py-8 animate-fade-in h-full flex flex-col justify-between">
            <div className="text-center space-y-4">
                <div className="flex justify-center">
                    <Logo className="w-20 h-20" />
                </div>
                <p className="text-lg text-gray-300 max-w-xs mx-auto italic">
                    "El 68% de las personas deja de contestar después de un 'hola'."
                </p>
            </div>

            <div className="space-y-6">
                <StatCounter value={stats.analyzed} label="chats analizados" />
                <StatCounter value={stats.generated} label="flechazos generados" />
            </div>

            <div className="glass-card overflow-hidden divide-y divide-white/20">
                 <ActionCard 
                    emoji="🌶️" 
                    title="Analizar Chat" 
                    onClick={() => navigate(View.CHAT_ANALYZER)}
                />
                 <ActionCard 
                    emoji="🧊" 
                    title="Romper Hielo" 
                    onClick={() => navigate(View.ICE_BREAKER)}
                />
                 <ActionCard 
                    emoji="⚙️" 
                    title="Más Opciones" 
                    onClick={() => {}}
                />
            </div>
        </div>
    );
};

export default Dashboard;