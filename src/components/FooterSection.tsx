const FooterSection = () => (
  <footer className="bg-black py-8 sm:py-12 px-4 sm:px-6">
    <div className="max-w-[800px] mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-6 text-white text-xs sm:text-sm text-center sm:text-left">
      <div className="flex items-center gap-3">
        <img
          src="/aura-logo.png"
          alt="AURA"
          className="w-8 h-8 sm:w-10 sm:h-10 brightness-0 invert"
        />
        <span>© {new Date().getFullYear()} Aura Growth. Todos los derechos reservados.</span>
      </div>
      <a
        href="#"
        className="text-white hover:text-white/70 transition-colors underline underline-offset-4 decoration-primary/60"
      >
        Política de Privacidad
      </a>
    </div>
  </footer>
);

export default FooterSection;
