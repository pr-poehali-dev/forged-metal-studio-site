import { RevealSection } from "@/components/RevealSection";

const HERO_IMAGE = "https://cdn.poehali.dev/projects/8bc3dbd0-c567-42de-bbf5-ef9a1a7f5d75/files/6fbe0c39-bf41-43d4-9b7c-18fe3abece3b.jpg";

const STATS = [
  { num: "15+", label: "лет опыта" },
  { num: "500+", label: "выполненных работ" },
  { num: "100%", label: "ручная ковка" },
  { num: "Крым", label: "и вся Россия" },
];

interface HeroSectionProps {
  scrollTo: (id: string) => void;
}

export default function HeroSection({ scrollTo }: HeroSectionProps) {
  return (
    <>
      <section id="hero" className="relative min-h-screen flex items-end overflow-hidden grain-overlay">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${HERO_IMAGE})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/55 to-background/10" />
        <div className="relative z-10 container mx-auto px-6 pb-20 md:pb-32">
          <p className="font-golos text-xs tracking-[0.3em] uppercase text-gold mb-6 animate-fade-in">
            Студия художественной ковки · Белогорск, Крым
          </p>
          <h1 className="font-cormorant text-6xl md:text-8xl lg:text-[110px] font-light leading-none text-foreground mb-6 animate-fade-up">
            Металл<br />
            <span className="italic text-gold">в руках</span><br />
            мастера
          </h1>
          <p className="font-golos text-base md:text-lg text-muted-foreground max-w-lg mb-10 leading-relaxed animate-fade-up">
            Создаём кованые изделия, которые служат десятилетиями. Ограды, мебель, декоративные элементы — каждый предмет уникален.
          </p>
          <div className="flex flex-wrap gap-4 animate-fade-up">
            <button onClick={() => scrollTo("portfolio")} className="font-golos text-sm tracking-widest uppercase bg-gold text-background px-8 py-3 hover:bg-gold-light transition-all">
              Смотреть работы
            </button>
            <button onClick={() => scrollTo("contacts")} className="font-golos text-sm tracking-widest uppercase border border-border text-foreground px-8 py-3 hover:border-gold hover:text-gold transition-all">
              Связаться
            </button>
          </div>
        </div>
        <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-3">
          <div className="w-px h-20 bg-gold/40" />
          <span className="font-golos text-xs tracking-[0.4em] uppercase text-gold/60 rotate-90 whitespace-nowrap my-6">Ручная работа</span>
          <div className="w-px h-20 bg-gold/40" />
        </div>
      </section>

      <section className="border-y border-border py-14 bg-card">
        <RevealSection>
          <div className="container mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {STATS.map(stat => (
              <div key={stat.label}>
                <div className="font-cormorant text-4xl md:text-5xl text-gold font-light">{stat.num}</div>
                <div className="font-golos text-xs tracking-widest uppercase text-muted-foreground mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </RevealSection>
      </section>
    </>
  );
}
