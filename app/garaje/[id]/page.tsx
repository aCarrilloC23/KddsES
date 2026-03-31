'use client';
import { useEffect, useState, useRef } from 'react';
import { supabase } from '@/lib/supabase';
import { useParams, useRouter } from 'next/navigation';
import { ChevronLeft, Edit3, Save, Plus, X, Gauge, Cog, Camera } from 'lucide-react';
import Link from 'next/link';

export default function DetalleCochePage() {
    const { id } = useParams();
    const router = useRouter();
    const fileInputRef = useRef<HTMLInputElement>(null);
    
    const [car, setCar] = useState<any>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);

    // Estados para la edición
    const [editBrand, setEditBrand] = useState('');
    const [editModel, setEditModel] = useState('');
    const [editCv, setEditCv] = useState('');
    const [editMods, setEditMods] = useState('');

    useEffect(() => {
        fetchCar();
    }, [id]);

    async function fetchCar() {
        const { data, error } = await supabase
            .from('cars')
            .select('*')
            .eq('id', id)
            .single();

        if (data) {
            setCar(data);
            setEditBrand(data.brand);
            setEditModel(data.model);
            setEditCv(data.specs?.cv || '');
            setEditMods(data.specs?.modificaciones || '');
        }
        setLoading(false);
    }

    const handleUpdate = async () => {
        setLoading(true);
        const { error } = await supabase
            .from('cars')
            .update({
                brand: editBrand,
                model: editModel,
                specs: { ...car.specs, cv: parseInt(editCv), modificaciones: editMods }
            })
            .eq('id', id);

        if (!error) {
            setIsEditing(false);
            fetchCar();
        }
        setLoading(false);
    };

    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        try {
            setUploading(true);
            const file = event.target.files?.[0];
            if (!file) return;

            // 1. Subir al Bucket 'car-pics'
            const fileExt = file.name.split('.').pop();
            const fileName = `${id}-${Math.random()}.${fileExt}`;
            const { error: uploadError } = await supabase.storage
                .from('car-photos')
                .upload(fileName, file);

            if (uploadError) throw uploadError;

            // 2. Obtener URL pública
            const { data: { publicUrl } } = supabase.storage
                .from('car-photos')
                .getPublicUrl(fileName);

            // 3. Actualizar array 'photos' en la tabla 'cars'
            const updatedPhotos = car.photos ? [...car.photos, publicUrl] : [publicUrl];
            
            const { error: dbError } = await supabase
                .from('cars')
                .update({ photos: updatedPhotos })
                .eq('id', id);

            if (dbError) throw dbError;

            setCar({ ...car, photos: updatedPhotos });

        } catch (error) {
            console.error('Error:', error);
            alert('Error al subir la imagen');
        } finally {
            setUploading(false);
            if (fileInputRef.current) fileInputRef.current.value = '';
        }
    };

    if (loading) return <div className="min-h-screen bg-black flex items-center justify-center text-orange-500 font-black italic">CARGANDO MÁQUINA...</div>;
    if (!car) return <div className="text-white">Coche no encontrado</div>;

    return (
        <main className="min-h-screen bg-black text-white pb-20">
            {/* 1. CABECERA / IMAGEN PRINCIPAL */}
            <div className="relative h-[65vh] w-full overflow-hidden bg-zinc-950">
                <img
                    src={car.image_url}
                    className="w-full h-full object-cover object-[50%_45%] contrast-[1.05] brightness-[0.95]"
                    alt={car.model}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40 z-10" />

                <Link href="/garaje" className="absolute top-8 left-8 p-3 bg-black/50 backdrop-blur-md rounded-full border border-white/10 z-20 hover:bg-orange-600 transition-colors">
                    <ChevronLeft size={24} />
                </Link>

                <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="absolute top-8 right-8 p-3 bg-orange-600 rounded-full shadow-lg shadow-orange-600/40 z-20 active:scale-95 transition-transform"
                >
                    {isEditing ? <X size={24} /> : <Edit3 size={24} />}
                </button>
            </div>

            <div className="px-6 -mt-12 relative z-10">
                {/* 2. INFO PRINCIPAL */}
                {!isEditing ? (
                    <div className="mb-8">
                        <p className="text-orange-500 font-black uppercase tracking-[0.3em] text-xs mb-1">{car.brand}</p>
                        <h1 className="text-5xl font-black italic uppercase tracking-tighter leading-none mb-4">{car.model}</h1>

                        <div className="flex gap-4">
                            <div className="bg-zinc-900/80 border border-zinc-800 p-4 rounded-3xl flex-1 flex items-center gap-3">
                                <Gauge className="text-orange-500" />
                                <div>
                                    <p className="text-[10px] text-zinc-500 font-bold uppercase">Potencia</p>
                                    <p className="text-xl font-black italic">{car.specs?.cv || '---'} <span className="text-xs">CV</span></p>
                                </div>
                            </div>
                            <div className="bg-zinc-900/80 border border-zinc-800 p-4 rounded-3xl flex-1 flex items-center gap-3">
                                <Cog className="text-orange-500" />
                                <div>
                                    <p className="text-[10px] text-zinc-500 font-bold uppercase">Estado</p>
                                    <p className="text-xl font-black italic uppercase text-green-500">Activo</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-4 bg-zinc-900 p-6 rounded-[2.5rem] border border-orange-600/30 mb-8">
                        <input value={editBrand} onChange={e => setEditBrand(e.target.value)} className="bg-black w-full p-3 rounded-xl border border-zinc-800" placeholder="Marca" />
                        <input value={editModel} onChange={e => setEditModel(e.target.value)} className="bg-black w-full p-3 rounded-xl border border-zinc-800" placeholder="Modelo" />
                        <input value={editCv} onChange={e => setEditCv(e.target.value)} className="bg-black w-full p-3 rounded-xl border border-zinc-800" placeholder="CV" type="number" />
                        <button onClick={handleUpdate} className="w-full bg-orange-600 p-4 rounded-2xl font-black italic flex items-center justify-center gap-2">
                            <Save size={20} /> GUARDAR CAMBIOS
                        </button>
                    </div>
                )}

                {/* 3. MODIFICACIONES */}
                <section className="mb-10">
                    <h3 className="text-xs font-black uppercase tracking-widest text-zinc-500 mb-4 ml-1">Modificaciones Realizadas</h3>
                    {!isEditing ? (
                        <div className="bg-zinc-900/40 border border-zinc-800/50 p-6 rounded-[2rem]">
                            <p className="text-zinc-300 leading-relaxed italic">
                                {car.specs?.modificaciones || "Esta máquina aún está de serie..."}
                            </p>
                        </div>
                    ) : (
                        <textarea
                            value={editMods}
                            onChange={e => setEditMods(e.target.value)}
                            className="bg-zinc-900 w-full p-6 rounded-[2rem] border border-zinc-800 min-h-[150px]"
                        />
                    )}
                </section>

                {/* 4. GALERÍA EXTRA */}
                <section>
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xs font-black uppercase tracking-widest text-zinc-500 ml-1">Galería de Fotos</h3>
                        
                        <input 
                            type="file" 
                            ref={fileInputRef} 
                            onChange={handleFileUpload} 
                            className="hidden" 
                            accept="image/*"
                        />

                        <button 
                            onClick={() => fileInputRef.current?.click()}
                            disabled={uploading}
                            className="text-orange-500 flex items-center gap-1 text-[10px] font-bold uppercase disabled:opacity-50"
                        >
                            {uploading ? 'SUBIENDO...' : <><Plus size={14} /> Añadir</>}
                        </button>
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                        {/* Render de fotos del array */}
                        {car.photos?.map((url: string, index: number) => (
                            <div key={index} className="aspect-square bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 group relative">
                                <img src={url} className="w-full h-full object-cover transition-transform group-hover:scale-110" alt={`Toma ${index}`} />
                            </div>
                        ))}

                        {/* Botón de subida manual */}
                        <div 
                            onClick={() => fileInputRef.current?.click()}
                            className="aspect-square bg-zinc-900 rounded-2xl flex flex-col items-center justify-center border border-dashed border-zinc-800 cursor-pointer hover:border-orange-500/50 transition-colors group"
                        >
                            {uploading ? (
                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-orange-500" />
                            ) : (
                                <Camera size={20} className="text-zinc-700 group-hover:text-orange-500 transition-colors" />
                            )}
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
}