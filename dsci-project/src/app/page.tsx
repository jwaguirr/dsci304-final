import { Hero } from "~/components/hero";
import { ChartSections } from "~/components/chart-sections";

export default function HomePage() {
  return (
    <main className="bg-white">
      <Hero />
      <ChartSections />
    </main>
  );
}
