import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Construction } from 'lucide-react';
import { toast } from 'sonner';

interface SectionUnderConstructionProps {
  sectionName?: string;
}

export const SectionUnderConstruction: React.FC<SectionUnderConstructionProps> = ({ 
  sectionName = 'Esta sección' 
}) => {
  const navigate = useNavigate();

  useEffect(() => {
    // Mostrar toast al montar el componente
    toast.info(`${sectionName} está en construcción`, {
      description: 'Pronto disponible. Redirigiendo...',
      duration: 2000,
    });

    // Redirigir a home después de 2 segundos
    const timer = setTimeout(() => {
      navigate('/');
    }, 2000);

    return () => clearTimeout(timer);
  }, [sectionName, navigate]);

  return (
    <div className="min-h-screen bg-[#080a0c] flex flex-col items-center justify-center p-6 text-white">
      <div className="text-center max-w-md">
        <Construction size={64} className="mx-auto mb-6 text-[#00f2ff]" />
        <h1 className="text-4xl font-black mb-4 italic uppercase">
          En Construcción
        </h1>
        <p className="text-gray-400 mb-2">
          {sectionName} está siendo desarrollado.
        </p>
        <p className="text-gray-500 text-sm mb-6">
          Serás redirigido al inicio en breves momentos...
        </p>
        <button
          onClick={() => navigate('/')}
          className="px-6 py-2 bg-[#00f2ff] text-[#080a0c] font-bold rounded-lg hover:scale-105 transition-all text-sm uppercase tracking-wider"
        >
          Volver al Inicio
        </button>
      </div>
    </div>
  );
};
