import { useState } from "react";
import Icon from "@/components/ui/icon";
import { RevealSection } from "@/components/RevealSection";

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

const PROCESS_STEPS = [
  { n: "01", label: "Заявка и обсуждение" },
  { n: "02", label: "Эскиз и смета" },
  { n: "03", label: "Изготовление" },
  { n: "04", label: "Монтаж и сдача" },
];

export default function CatalogServicesContacts() {
  const [formData, setFormData] = useState({ name: "", phone: "", message: "" });
  const [formSent, setFormSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSent(true);
  };

  return (
    <>
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
                {PROCESS_STEPS.map(step => (
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
    </>
  );
}
