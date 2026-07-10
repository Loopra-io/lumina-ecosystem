import { Header } from "../components/Header";
import { Features } from "../components/Features";

export const Home = () => {
  return (
    <div className="min-h-screen bg-lumina-surface">
      <Header />
      <section id="features" className="scroll-mt-20">
        <Features />
      </section>
    </div>
  );
};
