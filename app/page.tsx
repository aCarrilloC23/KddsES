import { supabase } from '@/lib/supabase';
import { Gauge, Plus, Calendar, MapPin } from 'lucide-react';
import BottomNav from '@/components/BottomNav';
import Header from '@/components/Header'; // <-- Importamos el nuevo Header
import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white pb-24">
      {/* Header Superior */}
      <Header /> {/* Usamos el nuevo Header */}

      {/* Sección Mi Garaje (Preview) */}
      <section className="px-6 mt-4">
        <div className="flex justify-between items-end mb-4">
          <h3 className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Mi Garaje</h3>

          {/* CAMBIO 1: Convertimos '+ AÑADIR COCHE' en un Link real */}
          <Link href="/garaje/nuevo" className="text-orange-500 text-xs font-black flex items-center gap-1 hover:scale-110 transition-transform cursor-pointer">
            <Plus size={14} /> AÑADIR COCHE
          </Link>
        </div>

        {/* Card de Coche Vacío (Estado Inicial) */}
        <div className="bg-zinc-900/30 border-2 border-dashed border-zinc-800/50 rounded-[2rem] p-10 text-center">
          <p className="text-zinc-500 text-sm mb-4 italic">Aún no tienes ninguna máquina registrada</p>

          {/* CAMBIO 2: Convertimos el botón 'Configurar Coche' en un Link real */}
          <Link
            href="/garaje/nuevo"
            className="bg-white text-black text-xs font-black px-8 py-3 rounded-xl uppercase tracking-tighter hover:bg-orange-600 hover:text-white transition-all inline-block"
          >
            Configurar Coche
          </Link>
        </div>
      </section>

      {/* Sección KDDs Cercanas */}
      <section className="px-6 mt-10">
        <h3 className="text-sm font-bold uppercase tracking-tighter text-zinc-400 mb-4 text-right">Próximas Rutas</h3>

        <div className="space-y-4">
          {/* Ejemplo de KDD Card */}
          <div className="relative group overflow-hidden rounded-[2rem] bg-zinc-900 border border-zinc-800">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <span className="bg-orange-600/10 text-orange-500 text-[10px] font-black px-3 py-1 rounded-full border border-orange-500/20">
                  MULTIMARCA
                </span>
                <span className="text-zinc-500 text-[10px] font-bold flex items-center gap-1">
                  <Calendar size={12} /> 12 ABRIL
                </span>
              </div>
              <h4 className="text-xl font-bold italic">Ruta Puertos de Madrid</h4>
              <p className="text-zinc-500 text-xs mt-1 flex items-center gap-1">
                <MapPin size={12} /> Puerto de la Cruz Verde
              </p>
            </div>
          </div>
        </div>
      </section>

      <BottomNav />
    </main>
  );
}