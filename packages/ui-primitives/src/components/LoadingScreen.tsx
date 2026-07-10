import { Loader } from './Loader';

export const LoadingScreen: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#080a0c] flex items-center justify-center">
      <div className="text-center">
        <Loader size="lg" />
        <p className="mt-4 text-gray-400">Cargando...</p>
      </div>
    </div>
  );
};
