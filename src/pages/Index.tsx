import { useState, useEffect, useRef } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMAGE = "https://cdn.poehali.dev/projects/8bc3dbd0-c567-42de-bbf5-ef9a1a7f5d75/files/6fbe0c39-bf41-43d4-9b7c-18fe3abece3b.jpg";

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

const SERVICES = [
  {
    icon: "Hammer",
    title: "Изготовление под заказ",
    desc: "Создаём изделия по вашим эскизам или разрабатываем дизайн с нуля. Любые размеры и формы.",
  },
  {
    icon: "Pencil",
    title: "Дизайн проекта",
    desc: "Разрабатываем чертежи, 3D-визуализацию и согласовываем каждый элемент до начала работ.",
  },
  {
    icon: "Wrench",
    title: "Монтаж и установка",
    desc: "Профессиональный монтаж по всему Крыму. Работаем с частными домами и коммерческими объектами.",
  },
];

const CATALOG_SECTIONS = [
  {
    title: "Ограды и ворота",
    items: ["Въездные ворота", "Калитки", "Заборы и секции", "Перила и ограждения", "Садовые ограды"],
    image: "https://cdn.poehali.dev/projects/8bc3dbd0-c567-42de-bbf5-ef9a1a7f5d75/files/50fbca6f-0d50-41e7-a08c-2516ef6d55d1.jpg",
  },
  {
    title: "Мебель",
    items: ["Столы и журнальные столики", "Скамейки и лавки", "Стулья и кресла", "Каминные порталы", "Кровати"],
    image: "https://cdn.poehali.dev/projects/8bc3dbd0-c567-42de-bbf5-ef9a1a7f5d75/files/2c483b45-d5a5-451d-8bf8-488abfd39027.jpg",
  },
  {
    title: "Декоративные элементы",
    items: ["Подсвечники и светильники", "Настенные панно", "Флюгеры", "Вазоны и цветочники", "Элементы интерьера"],
    image: "https://cdn.poehali.dev/projects/8bc3dbd0-c567-42de-bbf5-ef9a1a7f5d75/files/3f9016c1-3492-4e22-b4c7-a6e8ac8b37bc.jpg",
  },
];

function useScrollReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

function RevealSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const { ref, visible } = useScrollReveal();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"} ${className}`}
    >
      {children}
    </div>
  );
}

export default function Index() {
  const [activeFilter, setActiveFilter] = useState("все");
  const [lightbox, setLightbox] = useState<null | typeof GALLERY_ITEMS[0]>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", phone: "", message: "" });
  const [formSent, setFormSent] = useState(false);

  const filtered = activeFilter === "все"
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter(i => i.category === activeFilter);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSent(true);
  };

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-background/90 backdrop-blur-sm border-b border-border">
        <button onClick={() => scrollTo("hero")} className="font-cormorant text-xl font-semibold tracking-[0.15em] text-gold uppercase">
          Кузница
        </button>
        <div className="hidden md:flex items-center gap-8">
          {[
            { label: "Портфолио", id: "portfolio" },
            { label: "Каталог", id: "catalog" },
            { label: "Услуги", id: "services" },
            { label: "Контакты", id: "contacts" },
          ].map(link => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className="font-golos text-sm tracking-widest uppercase text-muted-foreground hover:text-gold transition-colors"
            >
              {link.label}
            </button>
          ))}
        </div>
        <button className="hidden md:block" onClick={() => scrollTo("contacts")}>
          <span className="font-golos text-sm tracking-widest uppercase border border-gold text-gold px-4 py-2 hover:bg-gold hover:text-background transition-all">
            Заказать
          </span>
        </button>
        <button className="md:hidden text-foreground" onClick={() => setMenuOpen(!menuOpen)}>
          <Icon name={menuOpen ? "X" : "Menu"} size={22} />
        </button>
      </nav>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-background/98 flex flex-col items-center justify-center gap-8 pt-16">
          {[
            { label: "Портфолио", id: "portfolio" },
            { label: "Каталог", id: "catalog" },
            { label: "Услуги", id: "services" },
            { label: "Контакты", id: "contacts" },
          ].map(link => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className="font-cormorant text-3xl font-light tracking-widest uppercase text-foreground hover:text-gold transition-colors"
            >
              {link.label}
            </button>
          ))}
        </div>
      )}

      {/* HERO */}
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

      {/* STATS */}
      <section className="border-y border-border py-14 bg-card">
        <RevealSection>
          <div className="container mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { num: "15+", label: "лет опыта" },
              { num: "500+", label: "выполненных работ" },
              { num: "100%", label: "ручная ковка" },
              { num: "Крым", label: "и вся Россия" },
            ].map(stat => (
              <div key={stat.label}>
                <div className="font-cormorant text-4xl md:text-5xl text-gold font-light">{stat.num}</div>
                <div className="font-golos text-xs tracking-widest uppercase text-muted-foreground mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </RevealSection>
      </section>

      {/* PORTFOLIO */}
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
      </section>

      {/* LIGHTBOX */}
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

      {/* CATALOG */}
      <section id="catalog" className="py-24 bg-card border-y border-border">
        <div className="container mx-auto px-6">
          <RevealSection>
            <div className="mb-14">
              <p className="font-golos text-xs tracking-[0.3em] uppercase text-gold mb-3">Что мы делаем</p>
              <h2 className="font-cormorant text-5xl md:text-6xl font-light">Каталог</h2>
            </div>
          </RevealSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CATALOG_SECTIONS.map((section) => (
              <RevealSection key={section.title}>
                <div className="group relative overflow-hidden border border-border hover:border-gold/50 transition-colors">
                  <div className="aspect-[3/2] overflow-hidden">
                    <img
                      src={section.image}
                      alt={section.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-60 group-hover:opacity-80"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="font-cormorant text-2xl font-light mb-4 text-foreground">{section.title}</h3>
                    <ul className="space-y-2">
                      {section.items.map(item => (
                        <li key={item} className="flex items-center gap-2 font-golos text-sm text-muted-foreground">
                          <span className="w-1 h-1 rounded-full bg-gold flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>
                    <button
                      onClick={() => document.getElementById("contacts")?.scrollIntoView({ behavior: "smooth" })}
                      className="mt-6 font-golos text-xs tracking-widest uppercase text-gold border-b border-gold/40 hover:border-gold transition-colors pb-0.5"
                    >
                      Узнать цену
                    </button>
                  </div>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="py-24">
        <div className="container mx-auto px-6">
          <RevealSection>
            <div className="mb-14">
              <p className="font-golos text-xs tracking-[0.3em] uppercase text-gold mb-3">Как мы работаем</p>
              <h2 className="font-cormorant text-5xl md:text-6xl font-light">Услуги</h2>
            </div>
          </RevealSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {SERVICES.map((service) => (
              <RevealSection key={service.title}>
                <div className="border-t border-border pt-8">
                  <div className="w-10 h-10 rounded-full border border-gold/30 flex items-center justify-center mb-6">
                    <Icon name={service.icon as "Hammer"} size={18} className="text-gold" />
                  </div>
                  <h3 className="font-cormorant text-2xl font-light mb-3">{service.title}</h3>
                  <p className="font-golos text-sm text-muted-foreground leading-relaxed">{service.desc}</p>
                </div>
              </RevealSection>
            ))}
          </div>

          <RevealSection>
            <div className="mt-20 pt-12 border-t border-border">
              <p className="font-golos text-xs tracking-[0.3em] uppercase text-gold mb-8 text-center">Этапы работы</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { n: "01", label: "Заявка и обсуждение" },
                  { n: "02", label: "Эскиз и смета" },
                  { n: "03", label: "Изготовление" },
                  { n: "04", label: "Монтаж и сдача" },
                ].map(step => (
                  <div key={step.n} className="text-center">
                    <div className="font-cormorant text-5xl text-gold/30 font-light leading-none mb-2">{step.n}</div>
                    <div className="font-golos text-sm text-muted-foreground">{step.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="py-24 bg-card border-t border-border">
        <div className="container mx-auto px-6">
          <RevealSection>
            <div className="mb-14">
              <p className="font-golos text-xs tracking-[0.3em] uppercase text-gold mb-3">Мы в Крыму</p>
              <h2 className="font-cormorant text-5xl md:text-6xl font-light">Контакты</h2>
            </div>
          </RevealSection>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <RevealSection>
              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="w-8 flex-shrink-0 pt-1">
                    <Icon name="MapPin" size={18} className="text-gold" />
                  </div>
                  <div>
                    <p className="font-golos text-xs tracking-widest uppercase text-gold mb-1">Адрес</p>
                    <p className="font-cormorant text-xl font-light">Белогорск, Республика Крым</p>
                    <p className="font-golos text-sm text-muted-foreground mt-1">Мастерская открыта по договорённости</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 flex-shrink-0 pt-1">
                    <Icon name="Phone" size={18} className="text-gold" />
                  </div>
                  <div>
                    <p className="font-golos text-xs tracking-widest uppercase text-gold mb-1">Телефон</p>
                    <a href="tel:+79780000000" className="font-cormorant text-xl font-light hover:text-gold transition-colors">
                      +7 (978) 000-00-00
                    </a>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-8 flex-shrink-0 pt-1">
                    <Icon name="Clock" size={18} className="text-gold" />
                  </div>
                  <div>
                    <p className="font-golos text-xs tracking-widest uppercase text-gold mb-1">Режим работы</p>
                    <p className="font-cormorant text-xl font-light">Пн–Пт: 9:00 – 18:00</p>
                    <p className="font-golos text-sm text-muted-foreground mt-1">Суббота по договорённости</p>
                  </div>
                </div>
                <div className="border-t border-border pt-8">
                  <p className="font-cormorant text-3xl font-light italic text-muted-foreground leading-snug">
                    "Каждое изделие —<br />это диалог металла<br />и мастера"
                  </p>
                </div>
              </div>
            </RevealSection>

            <RevealSection>
              {formSent ? (
                <div className="flex flex-col items-center justify-center h-full py-16 text-center">
                  <Icon name="CheckCircle" size={48} className="text-gold mb-4" />
                  <h3 className="font-cormorant text-3xl font-light mb-2">Заявка отправлена</h3>
                  <p className="font-golos text-sm text-muted-foreground">Мы свяжемся с вами в течение дня</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="font-golos text-xs tracking-widest uppercase text-gold block mb-2">Ваше имя</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-transparent border border-border focus:border-gold outline-none px-4 py-3 font-golos text-sm text-foreground placeholder:text-muted-foreground transition-colors"
                      placeholder="Иван Петров"
                    />
                  </div>
                  <div>
                    <label className="font-golos text-xs tracking-widest uppercase text-gold block mb-2">Телефон</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-transparent border border-border focus:border-gold outline-none px-4 py-3 font-golos text-sm text-foreground placeholder:text-muted-foreground transition-colors"
                      placeholder="+7 (978) ..."
                    />
                  </div>
                  <div>
                    <label className="font-golos text-xs tracking-widest uppercase text-gold block mb-2">Что вас интересует?</label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={e => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-transparent border border-border focus:border-gold outline-none px-4 py-3 font-golos text-sm text-foreground placeholder:text-muted-foreground transition-colors resize-none"
                      placeholder="Опишите, что хотите заказать..."
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-gold text-background font-golos text-sm tracking-widest uppercase py-4 hover:bg-gold-light transition-all"
                  >
                    Отправить заявку
                  </button>
                  <p className="font-golos text-xs text-muted-foreground text-center">
                    Нажимая кнопку, вы соглашаетесь на обработку персональных данных
                  </p>
                </form>
              )}
            </RevealSection>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border py-8">
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <span className="font-cormorant text-lg tracking-[0.15em] uppercase text-gold">Кузница</span>
          <p className="font-golos text-xs text-muted-foreground">© 2024 Студия художественной ковки · Белогорск, Крым</p>
          <a href="tel:+79780000000" className="font-golos text-xs tracking-widest uppercase text-muted-foreground hover:text-gold transition-colors">
            +7 (978) 000-00-00
          </a>
        </div>
      </footer>
    </div>
  );
}
