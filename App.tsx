import React, { useState, useCallback } from 'react';
import LoginScreen from './components/LoginScreen';
import Dashboard from './components/Dashboard';
import IceBreakerGenerator from './components/IceBreakerGenerator';
import ChatAnalyzer from './components/ChatAnalyzer';
import { View } from './types';
import Ballpit from './components/Ballpit';

const App: React.FC = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [currentView, setCurrentView] = useState<View>(View.DASHBOARD);
    const [stats, setStats] = useState({ analyzed: 0, generated: 0 });

    const handleLogin = useCallback(() => {
        setIsLoggedIn(true);
    }, []);

    const navigate = useCallback((view: View) => {
        setCurrentView(view);
    }, []);

    const incrementGenerated = useCallback(() => {
        setStats(s => ({ ...s, generated: s.generated + 1 }));
    }, []);

    const incrementAnalyzed = useCallback(() => {
        setStats(s => ({ ...s, analyzed: s.analyzed + 1 }));
    }, []);

    const renderView = () => {
        switch (currentView) {
            case View.DASHBOARD:
                return <Dashboard navigate={navigate} stats={stats} />;
            case View.ICE_BREAKER:
                return <IceBreakerGenerator navigate={navigate} onGenerate={incrementGenerated} />;
            case View.CHAT_ANALYZER:
                return <ChatAnalyzer navigate={navigate} onAnalyze={incrementAnalyzed} />;
            default:
                return <Dashboard navigate={navigate} stats={stats} />;
        }
    };

    return (
        <>
            <div className="fixed top-0 left-0 w-full h-full -z-10 bg-[#05020D]">
                 <Ballpit
                    count={150}
                    gravity={0.5}
                    friction={0.99}
                    wallBounce={0.9}
                    colors={[0x8A2BE2, 0x4169E1, 0x6A5ACD]}
                    followCursor={true}
                    maxSize={1.2}
                    minSize={0.6}
                />
            </div>
            <div className="min-h-screen w-full flex flex-col items-center py-8 relative">
                <main className="max-w-md w-full p-4 h-full">
                    {isLoggedIn ? renderView() : <LoginScreen onLogin={handleLogin} />}
                </main>
            </div>
        </>
    );
};

export default App;