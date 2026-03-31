import { supabase } from '@/lib/supabase';
import { Plus, MapPin, Calendar, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import BottomNav from '@/components/BottomNav';
import Header from '@/components/Header';

export default async function Home() {
  // 1. Traemos solo el ÚLTIMO coche registrado
  const { data: cars } = await supabase
    .from('cars')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(1);

  const lastCar = cars?.[0];

  return (
    <main className="min-h-screen bg-black text-white pb-24">
      <Header />

      {/* SECCIÓN MI GARAJE (DESTACADO) */}
      {/* <section className="px-6 mt-4"> */}
        <div className="flex justify-between items-end mb-4">
          <h3 className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Mi Máquina</h3>
          <Link href="/garaje" className="text-orange-500 text-[10px] font-black flex items-center gap-1 hover:underline">
            VER TODO EL GARAJE <Plus size={12} />
          </Link>
        </div>

        {/* {lastCar ? ( */}
          {/* /* Card del Coche Destacado */ }
          {/* // <Link href={`/garaje`} className="block group relative h-48 rounded-[2rem] overflow-hidden border border-zinc-800 shadow-2xl transition-transform active:scale-95"> */}
          {/* //   <img */}
          {/* //     src={lastCar.image_url} */}
          {/* //     className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" */}
          {/* //     alt="Mi coche" */}
          {/* //   /> */}
          {/* //   Degradado para que se lea el texto */}
          {/* //   <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" /> */}
{/*  */}
          {/* //   <div className="absolute bottom-6 left-6"> */}
          {/* //     <p className="text-[10px] font-bold uppercase tracking-widest text-orange-500 mb-1"> */}
          {/* //       {lastCar.brand} */}
          {/* //     </p> */}
          {/* //     <h2 className="text-2xl font-black italic uppercase tracking-tighter"> */}
          {/* //       {lastCar.model} */}
          {/* //     </h2> */}
          {/* //   </div> */}

          {/* //   <div className="absolute bottom-6 right-6 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl px-3 py-1"> */}
          {/* //     <span className="text-lg font-black italic">{lastCar.specs?.cv || '---'}</span> */}
          {/* //     <span className="text-[8px] font-bold ml-1">CV</span> */}
          {/* //   </div> */}
          {/* // </Link> */}
        {/* // ) : ( */}
          {/* /* Estado vacío si no hay coches */}
          {/* // <div className="bg-zinc-900/30 border-2 border-dashed border-zinc-800/50 rounded-[2rem] p-10 text-center"> */}
          {/* //   <p className="text-zinc-500 text-sm mb-4 italic">Aún no tienes ninguna máquina registrada</p> */}
          {/* //   <Link href="/garaje/nuevo" className="bg-white text-black text-xs font-black px-8 py-3 rounded-xl uppercase tracking-tighter hover:bg-orange-600 hover:text-white transition-all inline-block"> */}
          {/* //     Configurar Coche */}
          {/* //   </Link> */}
          {/* // </div> */}
        {/* // )} */}
      {/* </section> */}

      {/* SECCIÓN PRÓXIMAS RUTAS (Mantener el diseño que ya tenías) */}
      <section className="px-6 mt-8">
        <h3 className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 mb-4 text-right">Próximas Rutas</h3>

        {/* Card de ejemplo de Ruta */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-[2.5rem] p-6 relative overflow-hidden group">
          <div className="flex justify-between items-start mb-4">
            <span className="bg-orange-600/20 text-orange-500 text-[8px] font-black px-3 py-1 rounded-full uppercase italic">
              Multimarca
            </span>
            <div className="flex items-center gap-1 text-zinc-500">
              <Calendar size={12} />
              <span className="text-[10px] font-bold">12 ABRIL</span>
            </div>
          </div>

          <h4 className="text-xl font-black italic uppercase mb-1">Ruta Puertos de Madrid</h4>
          <div className="flex items-center gap-1 text-zinc-500">
            <MapPin size={12} />
            <span className="text-[10px] font-medium">Puerto de la Cruz Verde</span>
          </div>

          <ChevronRight className="absolute right-6 bottom-6 text-zinc-700 group-hover:text-orange-500 transition-colors" />
        </div>
      </section>

      <BottomNav />
    </main>
  );
}