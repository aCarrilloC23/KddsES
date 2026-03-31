'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Car, Map, User } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function BottomNav() {
    const pathname = usePathname();
    const [activeTab, setActiveTab] = useState('/');

    // Este useEffect es el "escudo". 
    // Solo actualiza la pestaña activa cuando el Router está 100% inicializado.
    useEffect(() => {
        if (pathname) {
            setActiveTab(pathname);
        }
    }, [pathname]);

    const navItems = [
        { href: '/', icon: Home, label: 'Inicio' },
        { href: '/kdds', icon: Map, label: 'KDDs' },
        { href: '/garaje', icon: Car, label: 'Garaje' },
        { href: '/perfil', icon: User, label: 'Perfil' },
    ];

    return (
        <nav className="fixed bottom-0 left-0 right-0 bg-zinc-900/80 backdrop-blur-lg border-t border-zinc-800 px-6 py-3 z-50">
            <div className="flex justify-between items-center max-w-md mx-auto">
                {navItems.map((item) => {
                    const isActive = activeTab === item.href;

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={`flex flex-col items-center gap-1 transition-all duration-300 ${isActive
                                ? 'text-orange-500 scale-110'
                                : 'text-zinc-500 hover:text-white'
                                }`}
                        >
                            <item.icon size={24} strokeWidth={isActive ? 2.5 : 2} />
                            <span className="text-[10px] font-bold uppercase">
                                {item.label}
                            </span>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}