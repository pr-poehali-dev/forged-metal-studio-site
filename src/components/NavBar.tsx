import Icon from "@/components/ui/icon";

const NAV_LINKS = [
  { label: "Портфолио", id: "portfolio" },
  { label: "Каталог", id: "catalog" },
  { label: "Услуги", id: "services" },
  { label: "Контакты", id: "contacts" },
];

interface NavBarProps {
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
  scrollTo: (id: string) => void;
}

export default function NavBar({ menuOpen, setMenuOpen, scrollTo }: NavBarProps) {
  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-background/90 backdrop-blur-sm border-b border-border">
        <button onClick={() => scrollTo("hero")} className="font-cormorant text-xl font-semibold tracking-[0.15em] text-gold uppercase">
          Кузница
        </button>
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(link => (
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

      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-background/98 flex flex-col items-center justify-center gap-8 pt-16">
          {NAV_LINKS.map(link => (
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
    </>
  );
}
