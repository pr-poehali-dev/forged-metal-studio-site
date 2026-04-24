import { useState } from "react";
import Icon from "@/components/ui/icon";
import { RevealSection } from "@/components/RevealSection";

const GALLERY_ITEMS = [
  {
    id: 1,
    title: "Парадные ворота",
    category: "ограды",
    image: "https://cdn.poehali.dev/projects/8bc3dbd0-c567-42de-bbf5-ef9a1a7f5d75/files/50fbca6f-0d50-41e7-a08c-2516ef6d55d1.jpg",
    desc: "Кованые ворота с растительным орнаментом",
  },
  {
    id: 2,
    title: "Журнальный стол",
    category: "мебель",
    image: "https://cdn.poehali.dev/projects/8bc3dbd0-c567-42de-bbf5-ef9a1a7f5d75/files/2c483b45-d5a5-451d-8bf8-488abfd39027.jpg",
    desc: "Кованое основание из металла ручной работы",
  },
  {
    id: 3,
    title: "Подсвечник",
    category: "декор",
    image: "https://cdn.poehali.dev/projects/8bc3dbd0-c567-42de-bbf5-ef9a1a7f5d75/files/3f9016c1-3492-4e22-b4c7-a6e8ac8b37bc.jpg",
    desc: "Декоративный подсвечник с витыми элементами",
  },
  {
    id: 4,
    title: "Оградка для сада",
    category: "ограды",
    image: "https://cdn.poehali.dev/projects/8bc3dbd0-c567-42de-bbf5-ef9a1a7f5d75/files/50fbca6f-0d50-41e7-a08c-2516ef6d55d1.jpg",
    desc: "Секционная кованая ограда для клумб",
  },
  {
    id: 5,
    title: "Каминная полка",
    category: "мебель",
    image: "https://cdn.poehali.dev/projects/8bc3dbd0-c567-42de-bbf5-ef9a1a7f5d75/files/2c483b45-d5a5-451d-8bf8-488abfd39027.jpg",
    desc: "Каминный портал из кованого металла",
  },
  {
    id: 6,
    title: "Настенное панно",
    category: "декор",
    image: "https://cdn.poehali.dev/projects/8bc3dbd0-c567-42de-bbf5-ef9a1a7f5d75/files/3f9016c1-3492-4e22-b4c7-a6e8ac8b37bc.jpg",
    desc: "Кованое настенное украшение — цветы и листья",
  },
];

const CATEGORIES = ["все", "ограды", "мебель", "декор"];

type GalleryItem = typeof GALLERY_ITEMS[0];

export default function PortfolioSection() {
  const [activeFilter, setActiveFilter] = useState("все");
  const [lightbox, setLightbox] = useState<null | GalleryItem>(null);

  const filtered = activeFilter === "все"
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter(i => i.category === activeFilter);

  return (
    <section id="portfolio" className="py-24">
      <div className="container mx-auto px-6">
        <RevealSection>
          <div className="mb-12">
            <p className="font-golos text-xs tracking-[0.3em] uppercase text-gold mb-3">Наши работы</p>
            <h2 className="font-cormorant text-5xl md:text-6xl font-light">Портфолио</h2>
          </div>
        </RevealSection>

        <RevealSection>
          <div className="flex flex-wrap gap-3 mb-10">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`font-golos text-xs tracking-widest uppercase px-5 py-2 border transition-all ${
                  activeFilter === cat
                    ? "bg-gold text-background border-gold"
                    : "border-border text-muted-foreground hover:border-gold hover:text-gold"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </RevealSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="group relative overflow-hidden cursor-pointer"
              onClick={() => setLightbox(item)}
            >
              <div className="aspect-[4/3] overflow-hidden bg-card">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
                <div>
                  <p className="font-golos text-xs tracking-widest uppercase text-gold mb-1">{item.category}</p>
                  <p className="font-cormorant text-xl font-light">{item.title}</p>
                </div>
                <div className="ml-auto">
                  <Icon name="ZoomIn" size={20} className="text-gold" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <div
            className="relative max-w-3xl w-full animate-scale-in"
            onClick={e => e.stopPropagation()}
          >
            <button
              className="absolute -top-10 right-0 text-muted-foreground hover:text-foreground transition-colors"
              onClick={() => setLightbox(null)}
            >
              <Icon name="X" size={24} />
            </button>
            <img src={lightbox.image} alt={lightbox.title} className="w-full object-cover" />
            <div className="bg-card p-5 border-t border-border">
              <p className="font-golos text-xs tracking-widest uppercase text-gold mb-1">{lightbox.category}</p>
              <h3 className="font-cormorant text-2xl font-light">{lightbox.title}</h3>
              <p className="font-golos text-sm text-muted-foreground mt-1">{lightbox.desc}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
