'use client';
import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { Gauge, Mail, Lock, User, ChevronRight, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          display_name: username || email.split('@')[0],
        }
      }
    });

    if (error) {
      alert(error.message);
    } else {
      alert("¡Cuenta creada! Ya puedes entrar.");
      router.push('/login');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4 relative overflow-hidden text-white font-sans">
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-orange-600/10 blur-[120px] rounded-full" />
      
      <div className="w-full max-w-md z-10">
        <Link href="/login" className="inline-flex items-center gap-2 text-zinc-500 hover:text-white mb-6 transition-colors text-sm font-bold uppercase tracking-widest">
          <ArrowLeft size={16} /> Volver al login
        </Link>

        <div className="bg-zinc-900/50 backdrop-blur-xl border border-zinc-800 p-8 rounded-[2.5rem] shadow-2xl">
          <div className="mb-8 text-center">
             <h1 className="text-3xl font-black italic uppercase tracking-tighter">Únete a la <span className="text-orange-600">KDD</span></h1>
             <p className="text-zinc-500 text-sm mt-2">Crea tu perfil de piloto profesional</p>
          </div>

          <form onSubmit={handleRegister} className="space-y-5">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 ml-1">Nombre de Usuario</label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-orange-500 transition-colors" size={18} />
                <input required type="text" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full bg-black/40 border border-zinc-800 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-orange-600/50 transition-all" placeholder="Ej: RayoMcQueen" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 ml-1">Email</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-orange-500 transition-colors" size={18} />
                <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-black/40 border border-zinc-800 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-orange-600/50 transition-all" placeholder="gasolina@nitro.com" />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 ml-1">Contraseña</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-orange-500 transition-colors" size={18} />
                <input required type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full bg-black/40 border border-zinc-800 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-orange-600/50 transition-all" placeholder="••••••••" />
              </div>
            </div>

            <button type="submit" disabled={loading} className="w-full bg-orange-600 hover:bg-orange-500 text-white font-black py-4 rounded-2xl transition-all flex items-center justify-center gap-2 group shadow-xl shadow-orange-900/20">
              {loading ? 'REGISTRANDO...' : 'ARRANCAR MI CUENTA'}
              <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}