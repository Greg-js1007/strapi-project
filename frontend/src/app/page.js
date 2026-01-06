
import { Suspense } from "react";
import { getHomePage } from "@/lib/strapi";
import { HeroSection } from "@/components/hero-section";

export async function generateMetadata() {
  const strapiData = await getHomePage();
  return {
    title: strapiData?.title,
    description: strapiData?.description,
  };
}

// 1. Crea este componente que es el que hace el fetch
async function HomeContent() {
  const strapiData = await getHomePage();
  const [heroSection] = strapiData?.sections || [];

  return <HeroSection data={heroSection} />;
}

// 2. Tu página principal solo sirve de contenedor y pone el Suspense
export default function Home() {
  return (
    <main className="container mx-auto py-6">
      <Suspense fallback={<p>Cargando secciones...</p>}>
        <HomeContent />
      </Suspense>
    </main>
  );
}
