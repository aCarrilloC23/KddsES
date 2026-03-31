import { supabase } from '@/lib/supabase';
import { Car, Plus } from 'lucide-react';
import Link from 'next/link';
import BottomNav from '@/components/BottomNav';
import Header from '@/components/Header';

export default async function GarajePage() {
  // 1. Obtenemos todos los coches de la base de datos
  const { data: cars } = await supabase
    .from('cars')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <main className="min-h-screen bg-black text-white pb-32">
      <Header />

      <div className="px-6 py-6">
        {/* TÍTULO SECCIÓN */}
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-black italic uppercase tracking-tighter leading-none">
              MI <span className="text-orange-600">GARAJE</span>
            </h1>
            <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mt-1">
              {cars?.length || 0} MÁQUINAS REGISTRADAS
            </p>
          </div>
          {/* <Link
            href="/garaje/nuevo"
            className="w-12 h-12 bg-orange-600 rounded-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-lg shadow-orange-600/20"
          >
            <Plus size={24} strokeWidth={4} />
          </Link> */}
        </div>

        {cars && cars.length > 0 ? (
          /* GRID DE CARDS (2 COLUMNAS - FORMATO COMPACTO) */
          <div className="grid grid-cols-2 gap-4">
            {cars.map((car) => (
              <Link
                key={car.id}
                href={`/garaje/${car.id}`}
                /* CAMBIO CLAVE: aspect-[16/10] para que sea más panorámica 
                   y no genere scroll con una sola fila.
                */
                className="group relative aspect-[16/10] rounded-[1.5rem] overflow-hidden border border-zinc-800 bg-zinc-950 transition-all active:scale-95 shadow-xl"
              >
                {/* 1. Imagen del Coche: Más pegada a los bordes para aprovechar el ancho */}
                <div className="absolute inset-0 p-1.5 pb-1">
                  <div className="w-full h-full overflow-hidden rounded-[1.2rem] border border-zinc-800/50">
                    <img
                      src={car.image_url}
                      className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
                      alt={car.model}
                    />
                  </div>
                </div>

                {/* 2. Overlay: Textos pegados al borde inferior con degradado corto */}
                <div className="absolute inset-x-0 bottom-0 px-4 pb-3 pt-8 bg-gradient-to-t from-black via-black/90 to-transparent flex flex-col justify-end">

                  <p className="text-[8px] font-black uppercase tracking-widest text-orange-500 leading-none mb-0.5">
                    {car.brand}
                  </p>

                  <h2 className="text-xl font-black italic uppercase tracking-tighter text-white leading-[0.85] mb-1 truncate">
                    {car.model}
                  </h2>

                  <div className="flex items-baseline gap-1">
                    <span className="text-xl font-black italic text-white leading-none">
                      {car.specs?.cv || '---'}
                    </span>
                    <span className="text-[8px] font-bold text-zinc-500 uppercase tracking-tighter leading-none">
                      CV
                    </span>
                  </div>
                </div>
              </Link>
            ))}

            {/* 3. BOTÓN RÁPIDO "AÑADIR" (MISMAS PROPORCIONES QUE LAS CARDS) */}
            <Link
              href="/garaje/nuevo"
              /* CAMBIO CLAVE: aspect-[16/10] y rounded-[1.5rem] EXACTOS a los coches 
                 para consistencia visual.
              */
              className="relative aspect-[16/10] rounded-[1.5rem] border-2 border-dashed border-zinc-900 flex flex-col items-center justify-center text-zinc-700 hover:text-orange-500 hover:border-orange-500/50 transition-all active:scale-95 group shadow-inner"
            >
              {/* Icono + grande y centrado */}
              <Plus size={40} strokeWidth={2} className="group-hover:scale-110 transition-transform duration-300" />

              {/* Texto pegado abajo con el mismo estilo minimalista */}
              <span className="absolute bottom-4 text-[10px] font-black uppercase tracking-tighter opacity-70 group-hover:opacity-100 transition-opacity duration-300">
                Añadir Máquina
              </span>
            </Link>
          </div>
        ) : (
          /* ESTADO VACÍO (Si no hay coches) */
          <div className="mt-12 text-center py-24 bg-zinc-900/20 border-2 border-dashed border-zinc-800 rounded-[3rem]">
            <div className="w-20 h-20 bg-zinc-900 rounded-full flex items-center justify-center mx-auto mb-6">
              <Car size={40} className="text-zinc-700" />
            </div>
            <p className="text-zinc-500 italic mb-8 px-10 text-sm">Tu garaje está esperando a su primera máquina...</p>
            <Link
              href="/garaje/nuevo"
              className="bg-white text-black font-black px-10 py-4 rounded-2xl uppercase italic tracking-tighter hover:bg-orange-600 hover:text-white transition-all inline-block shadow-xl"
            >
              Configurar Coche
            </Link>
          </div>
        )}
      </div>

      <BottomNav />
    </main>
  );
}