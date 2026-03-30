'use client';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { Gauge, LogOut } from 'lucide-react';

export default function Header() {
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
    router.refresh();
  };

  return (
    <header className="p-6 flex justify-between items-center">
      <div>
        <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest">Bienvenido,</p>
        <h2 className="text-2xl font-black italic uppercase text-white">PILOTO</h2>
      </div>
      
      <div className="flex items-center gap-4">
        {/* Botón de Logout sutil */}
        <button 
          onClick={handleLogout}
          className="p-2 text-zinc-600 hover:text-red-500 transition-colors"
        >
          <LogOut size={20} />
        </button>

        {/* Logo/Icono */}
        <div className="w-12 h-12 bg-orange-600 rounded-2xl flex items-center justify-center shadow-lg shadow-orange-600/20 rotate-3 transition-transform hover:rotate-0">
          <Gauge size={24} className="text-white" />
        </div>
      </div>
    </header>
  );
}