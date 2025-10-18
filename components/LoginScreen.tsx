import React from 'react';
import Logo from './Logo';

interface LoginScreenProps {
    onLogin: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
    return (
        <div className="min-h-full flex flex-col justify-center items-center p-4 animate-fade-in">
            <div className="w-full max-w-sm text-center">
                <div className="flex justify-center items-center mb-6">
                    <Logo className="w-24 h-24" />
                </div>
                <h1 className="text-5xl font-black text-white tracking-tighter gradient-text">
                    1Flechazo
                </h1>
                <p className="text-gray-400 mt-2 mb-8 text-lg">Tu copiloto para el amor.</p>
                
                <form onSubmit={(e) => { e.preventDefault(); onLogin(); }} className="space-y-6">
                    <div>
                        <input 
                            type="email" 
                            placeholder="Email" 
                            className="w-full px-4 py-3 bg-black/30 border-2 border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#05020D] focus:ring-[#8A2BE2] focus:border-[#8A2BE2] text-white transition"
                            defaultValue="test@user.com"
                        />
                    </div>
                    <div>
                        <input 
                            type="password" 
                            placeholder="Contraseña" 
                            className="w-full px-4 py-3 bg-black/30 border-2 border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#05020D] focus:ring-[#8A2BE2] focus:border-[#8A2BE2] text-white transition"
                            defaultValue="password"
                        />
                    </div>
                    <button 
                        type="submit"
                        className="w-full text-white font-bold py-3 px-4 rounded-xl gradient-button"
                    >
                        Iniciar Sesión
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginScreen;