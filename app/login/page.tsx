'use client';
import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { Gauge, Mail, Lock, ChevronRight } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      alert(error.message);
    } else {
      router.push('/');
      router.refresh();
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Luces de fondo */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-orange-600/10 blur-[120px] rounded-full" />
      
      <div className="w-full max-w-md z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-orange-600 rounded-2xl mb-4 rotate-3 shadow-lg shadow-orange-600/40">
            <Gauge size={32} className="text-white" />
          </div>
          <h1 className="text-4xl font-black italic tracking-tighter text-white uppercase">
            Auto<span className="text-orange-600">KDD</span>
          </h1>
          <p className="text-zinc-500 font-medium mt-2">Acceso exclusivo para pilotos</p>
        </div>

        <div className="bg-zinc-900/50 backdrop-blur-xl border border-zinc-800 p-8 rounded-[2.5rem] shadow-2xl">
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 ml-1">Email</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-orange-500 transition-colors" size={20} />
                <input 
                  required
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-black/40 border border-zinc-800 rounded-2xl py-4 pl-12 pr-4 text-white outline-none focus:border-orange-600/50 transition-all"
                  placeholder="tu@email.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 ml-1">Contraseña</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-orange-500 transition-colors" size={20} />
                <input 
                  required
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-black/40 border border-zinc-800 rounded-2xl py-4 pl-12 pr-4 text-white outline-none focus:border-orange-600/50 transition-all"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-white text-black font-black py-4 rounded-2xl hover:bg-orange-600 hover:text-white transition-all flex items-center justify-center gap-2 group cursor-pointer"
            >
              {loading ? 'CALENTANDO...' : 'ENTRAR AL GARAJE'}
              <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          {/* Divisor mejorado */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-zinc-800"></span>
            </div>
            <div className="relative flex justify-center text-[10px] uppercase tracking-widest">
              <span className="bg-[#121212] px-4 text-zinc-400 font-bold">¿No tienes cuenta?</span>
            </div>
          </div>

          {/* Botón de Registro Claramente Visible */}
          <Link 
            href="/register" 
            className="w-full bg-zinc-800 text-white font-bold py-4 rounded-2xl hover:bg-zinc-700 transition-all border border-zinc-700 flex items-center justify-center uppercase text-sm tracking-tight"
          >
            Crear nueva cuenta de piloto
          </Link>
        </div>
      </div>
    </div>
  );
}