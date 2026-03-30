import { supabase } from '@/lib/supabase';
import { Car, Plus, ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import BottomNav from '@/components/BottomNav';
import Header from '@/components/Header';

export default async function GarajePage() {
  // Obtenemos los coches directamente desde el servidor
  const { data: cars, error } = await supabase
    .from('cars')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <main className="min-h-screen bg-black text-white pb-24">
      <Header />
      
      <div className="px-6 py-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-black italic uppercase tracking-tighter">Mi <span className="text-orange-600">Garaje</span></h1>
          <Link href="/garaje/nuevo" className="w-10 h-10 bg-orange-600 rounded-xl flex items-center justify-center hover:scale-110 transition-transform">
            <Plus size={20} />
          </Link>
        </div>

        {cars && cars.length > 0 ? (
          <div className="grid grid-cols-1 gap-6">
            {cars.map((car) => (
              <div key={car.id} className="group relative overflow-hidden rounded-[2.5rem] bg-zinc-900 border border-zinc-800 transition-all hover:border-orange-500/50">
                <div className="aspect-video w-full overflow-hidden">
                  <img 
                    src={car.image_url || '/placeholder-car.jpg'} 
                    alt={`${car.brand} ${car.model}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-orange-500 mb-1">{car.brand}</p>
                      <h2 className="text-xl font-black italic uppercase">{car.model}</h2>
                    </div>
                    {car.specs?.cv && (
                      <div className="text-right">
                        <span className="text-2xl font-black italic">{car.specs.cv}</span>
                        <span className="text-[10px] font-bold text-zinc-500 ml-1">CV</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-12 text-center py-20 bg-zinc-900/30 border-2 border-dashed border-zinc-800 rounded-[3rem]">
            <Car size={48} className="mx-auto text-zinc-700 mb-4" />
            <p className="text-zinc-500 italic mb-6">Tu garaje está vacío...</p>
            <Link href="/garaje/nuevo" className="bg-white text-black font-black px-8 py-4 rounded-2xl uppercase italic tracking-tighter hover:bg-orange-600 hover:text-white transition-all inline-block">
              Añadir mi primera joya
            </Link>
          </div>
        )}
      </div>

      <BottomNav />
    </main>
  );
}