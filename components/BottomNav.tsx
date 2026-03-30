import Link from 'next/link';
import { Home, Car, Map, User } from 'lucide-react';

export default function BottomNav() {
    return (
        <nav className="fixed bottom-0 left-0 right-0 bg-zinc-900/80 backdrop-blur-lg border-t border-zinc-800 px-6 py-3 z-50">
            <div className="flex justify-between items-center max-w-md mx-auto">
                <Link href="/" className="flex flex-col items-center gap-1 text-orange-500">
                    <Home size={24} />
                    <span className="text-[10px] font-bold uppercase">Inicio</span>
                </Link>
                <Link href="/kdds" className="flex flex-col items-center gap-1 text-zinc-500 hover:text-white transition-colors">
                    <Map size={24} />
                    <span className="text-[10px] font-bold uppercase">KDDs</span>
                </Link>
                <Link href="/garaje" className="flex flex-col items-center gap-1 text-zinc-500 hover:text-white transition-colors">
                    <Car size={24} />
                    <span className="text-[10px] font-bold uppercase tracking-tighter">Garaje</span>
                </Link>
                <Link href="/perfil" className="flex flex-col items-center gap-1 text-zinc-500 hover:text-white transition-colors">
                    <User size={24} />
                    <span className="text-[10px] font-bold uppercase">Perfil</span>
                </Link>
            </div>
        </nav>
    );
}