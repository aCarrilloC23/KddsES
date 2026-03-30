'use client';
import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import { Camera, ChevronLeft, Save, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function NuevoCochePage() {
  const [marca, setMarca] = useState('');
  const [modelo, setModelo] = useState('');
  const [cv, setCv] = useState('');
  const [foto, setFoto] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!foto || !marca || !modelo) {
      alert("Marca, modelo y foto son obligatorios para registrar la máquina.");
      return;
    }
    
    setLoading(true);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("No se encontró el usuario. Por favor, reinicia sesión.");

      let fotoUrl = '';

      // 1. Subir la foto al bucket 'car-photos'
      const fileExt = foto.name.split('.').pop();
      // Creamos un nombre único: ID_USUARIO-RANDOM.EXTENSION
      const fileName = `${user.id}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
        .from('car-photos') // <-- USAMOS TU BUCKET
        .upload(fileName, foto, {
          cacheControl: '3600',
          upsert: false
        });

      if (uploadError) throw uploadError;
      
      // 2. Obtener la URL pública de la foto
      const { data: publicUrlData } = supabase.storage
        .from('car-photos') // <-- USAMOS TU BUCKET
        .getPublicUrl(fileName);
      
      fotoUrl = publicUrlData.publicUrl;

      // 3. Guardar los datos en la tabla 'cars'
      const { error: insertError } = await supabase
        .from('cars')
        .insert({
          user_id: user.id,
          brand: marca,
          model: modelo,
          specs: { cv: parseInt(cv) || 0 }, // Guardamos CV como número dentro del JSONB
          image_url: fotoUrl
        });

      if (insertError) throw insertError;

      // Todo ha ido bien, volvemos a la home
      router.push('/');
      router.refresh(); // Forzamos el refresco para que la home cargue los datos nuevos

    } catch (error: any) {
      console.error("Error al registrar coche:", error.message);
      alert(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white p-6 pb-24 font-sans relative overflow-hidden">
      {/* Efecto de luz de fondo sutil */}
      <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-orange-950/20 blur-[120px] rounded-full z-0" />

      <div className="relative z-10 max-w-lg mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-zinc-600 hover:text-white mb-10 uppercase text-[10px] font-black tracking-widest transition-colors">
          <ChevronLeft size={16} /> Volver al garaje
        </Link>

        <header className="mb-10">
          <h1 className="text-4xl font-black italic uppercase mb-2 tracking-tighter">Nueva <span className="text-orange-600">Máquina</span></h1>
          <p className="text-zinc-500 font-medium">Registra los detalles de tu coche para compartirlo con la comunidad.</p>
        </header>

        <form onSubmit={handleUpload} className="space-y-8">
          {/* Selector de Foto con Preview */}
          <div className="space-y-3">
            <label className="text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-400 ml-1">Foto del Coche</label>
            <div className="flex justify-center">
              <label className="w-full h-56 bg-zinc-900 border-2 border-dashed border-zinc-800 rounded-[2.5rem] flex flex-col items-center justify-center cursor-pointer hover:border-orange-600/50 hover:bg-zinc-900/50 transition-all overflow-hidden relative group">
                {foto ? (
                  <>
                    <img src={URL.createObjectURL(foto)} className="w-full h-full object-cover transition-transform group-hover:scale-105" alt="Preview del coche" />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                       <Camera className="text-white" size={24} />
                    </div>
                  </>
                ) : (
                  <>
                    <Camera className="text-zinc-700 mb-3 group-hover:text-orange-500 transition-colors" size={40} />
                    <span className="text-zinc-500 text-xs font-bold uppercase tracking-tight">Subir Imagen Real</span>
                    <span className="text-zinc-700 text-[10px] mt-1">(JPG, PNG max 5MB)</span>
                  </>
                )}
                <input required type="file" className="hidden" accept="image/*" onChange={(e) => setFoto(e.target.files?.[0] || null)} />
              </label>
            </div>
          </div>

          {/* Campos de Texto */}
          <div className="space-y-5 bg-zinc-900/30 p-6 rounded-[2rem] border border-zinc-800/50">
            <div>
              <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 ml-1">Marca</label>
              <input required type="text" placeholder="Ej: BMW, Porsche, Mazda..." value={marca} onChange={(e) => setMarca(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800/80 rounded-2xl py-4 px-5 text-white outline-none focus:border-orange-600/50 focus:ring-1 focus:ring-orange-600/20 transition-all placeholder:text-zinc-700" />
            </div>

            <div>
              <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 ml-1">Modelo</label>
              <input required type="text" placeholder="Ej: M3 E46, 911 GT3, MX-5 NA..." value={modelo} onChange={(e) => setModelo(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800/80 rounded-2xl py-4 px-5 text-white outline-none focus:border-orange-600/50 focus:ring-1 focus:ring-orange-600/20 transition-all placeholder:text-zinc-700" />
            </div>

            <div>
              <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 ml-1">Potencia (CV)</label>
              <input type="number" placeholder="Ej: 343" value={cv} onChange={(e) => setCv(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800/80 rounded-2xl py-4 px-5 text-white outline-none focus:border-orange-600/50 focus:ring-1 focus:ring-orange-600/20 transition-all placeholder:text-zinc-700" />
            </div>
          </div>

          {/* Botón de Guardar */}
          <button disabled={loading} type="submit" className="w-full bg-white text-black font-black py-4 rounded-2xl hover:bg-orange-600 hover:text-white transition-all flex items-center justify-center gap-3 uppercase italic tracking-tighter cursor-pointer shadow-xl shadow-white/5 disabled:opacity-50 disabled:cursor-not-allowed group">
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={20} />
                REGISTRANDO MÁQUINA...
              </>
            ) : (
              <>
                GUARDAR EN MI GARAJE
                <Save size={20} className="group-hover:translate-x-0.5 transition-transform" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}