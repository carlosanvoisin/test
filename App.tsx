/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Users, Zap, Layout, MapPin, Menu, X, Rocket, ArrowRight, TrendingUp, Store } from 'lucide-react';
import FluidBackground from './components/FluidBackground';
import GradientText from './components/GlitchText';
import CustomCursor from './components/CustomCursor';
import ProjectCard from './components/ArtistCard';
import AIChat from './components/AIChat';
import { Artist } from './types';

// Mapped data from PDF for "Services/Solutions" section
// Reusing 'Artist' interface for compatibility with existing components
const SOLUTIONS: Artist[] = [
  { 
    id: '1', 
    name: 'Pop Up Store', 
    genre: 'Retail Strategy', 
    day: 'FLEXIBILITY', 
    image: 'https://images.unsplash.com/photo-1556228720-1957be91a13e?q=80&w=1000&auto=format&fit=crop', // High-end retail/cosmetics
    description: 'Accesso immediato a tutto il traffico. Minori vincoli contrattuali e investimenti iniziali ridotti rispetto al negozio tradizionale.'
  },
  { 
    id: '2', 
    name: 'Full Service', 
    genre: 'Gestione Completa', 
    day: 'NO STRESS', 
    image: 'https://images.unsplash.com/photo-1574096079513-d8259312b785?q=80&w=1000&auto=format&fit=crop', // Premium beverage/event vibe
    description: 'Pensiamo a tutto noi: dall’affitto degli spazi (partnership con Cushman & Wakefield) all’assunzione e formazione dello staff.'
  },
  { 
    id: '3', 
    name: 'Roadshows', 
    genre: 'Omnichannel', 
    day: 'ENGAGEMENT', 
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=1000&auto=format&fit=crop', // High energy event crowd
    description: 'Campagne omnicanale e creazione di contenuti multimediali professionali. Portiamo il brand dove sono le persone.'
  },
  { 
    id: '4', 
    name: 'Lead Generation', 
    genre: 'Performance', 
    day: 'DATA DRIVEN', 
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1000&auto=format&fit=crop', // Professional interaction/tech
    description: 'Sviluppo di potenziali clienti qualificati per prodotti ad alto valore. Analisi e reportistica in tempo reale.'
  },
  { 
    id: '5', 
    name: 'Fashion Shows', 
    genre: 'Live Events', 
    day: 'IMPACT', 
    image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=1000&auto=format&fit=crop', // High fashion runway
    description: 'Eventi lancio a grande impatto ed esposizioni che generano entusiasmo e passaparola direttamente in galleria.'
  },
  { 
    id: '6', 
    name: 'Staffing', 
    genre: 'Sales Force', 
    day: 'HUMAN', 
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1000&auto=format&fit=crop', // Professional team
    description: 'Professionisti di vendita accuratamente selezionati che comprendono i valori del tuo brand.'
  },
];

const App: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedSolution, setSelectedSolution] = useState<Artist | null>(null);
  
  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="relative min-h-screen text-white selection:bg-[#489FDB] selection:text-white cursor-auto md:cursor-none overflow-x-hidden bg-[#050505]">
      <CustomCursor />
      <FluidBackground />
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 md:px-12 py-8 mix-blend-difference">
        <div className="flex flex-col">
           <div className="font-heading text-2xl md:text-3xl font-bold tracking-tighter text-white cursor-pointer z-50">NOLOOP</div>
           <div className="text-[10px] tracking-[0.4em] font-bold text-[#489FDB] uppercase">On Trade</div>
        </div>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex gap-12 text-xs font-bold tracking-[0.3em] uppercase">
          {['Soluzioni', 'Perché Mall', 'Success Stories', 'Contatti'].map((item) => (
            <button 
              key={item} 
              onClick={() => scrollToSection(item.toLowerCase().replace(' ', '-'))}
              className="hover:text-[#489FDB] transition-colors text-white cursor-pointer bg-transparent border-none"
              data-hover="true"
            >
              {item}
            </button>
          ))}
        </div>
        <button 
          onClick={() => scrollToSection('contatti')}
          className="hidden md:inline-block bg-[#489FDB] px-10 py-4 text-[10px] font-bold tracking-[0.4em] uppercase hover:bg-white hover:text-black transition-all duration-500 text-white cursor-pointer"
          data-hover="true"
        >
          Attiva Ora
        </button>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-white z-50 relative w-10 h-10 flex items-center justify-center"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
           {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 z-30 bg-[#050505] flex flex-col items-center justify-center gap-8 md:hidden"
          >
            {['Soluzioni', 'Perché Mall', 'Success Stories', 'Contatti'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase().replace(' ', '-'))}
                className="text-4xl font-heading font-bold text-white hover:text-[#489FDB] transition-colors uppercase bg-transparent border-none"
              >
                {item}
              </button>
            ))}
            <button 
              onClick={() => scrollToSection('contatti')}
              className="mt-8 bg-[#489FDB] px-10 py-4 text-sm font-bold tracking-widest uppercase text-white"
            >
              Contattaci
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HERO SECTION */}
      <header className="relative h-[100svh] min-h-[700px] flex flex-col items-center justify-center overflow-hidden px-4">
        <motion.div 
          style={{ y, opacity }}
          className="z-10 text-center flex flex-col items-center w-full max-w-7xl pb-24"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="mb-8"
          >
            <span className="inline-block px-4 py-1 border border-white/20 text-[10px] tracking-[0.5em] uppercase font-bold text-gray-400 mb-6">
              Retail Media Revolution
            </span>
          </motion.div>

          <div className="relative w-full flex justify-center items-center">
            {/* Main Title - Updated to Full Name, Solid Color, No Entrance Fade */}
            <h1 className="text-[12vw] md:text-[10vw] leading-[0.8] font-black tracking-tighter text-center uppercase">
              <span className="text-white block">NOLOOP</span>
              <span className="text-[#489FDB] block">ON TRADE</span>
            </h1>
          </div>
          
          <motion.div
             initial={{ scaleX: 0 }}
             animate={{ scaleX: 1 }}
             transition={{ duration: 1.5, delay: 0.5 }}
             className="w-48 h-1 bg-[#489FDB] mt-12 mb-12"
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="text-lg md:text-2xl font-light max-w-3xl mx-auto text-white/80 leading-tight uppercase tracking-widest px-4"
          >
            Promuovi il tuo prodotto <br className="hidden md:block"/> nei <span className="text-white font-bold">centri commerciali</span> di prima fascia.
          </motion.p>
        </motion.div>

        {/* MARQUEE */}
        <div className="absolute bottom-0 left-0 w-full py-6 md:py-10 bg-[#489FDB] text-white z-20 overflow-hidden">
          <motion.div 
            className="flex w-fit will-change-transform"
            initial={{ opacity: 0 }}
            animate={{ x: "-50%", opacity: 1 }}
            transition={{ 
                x: { duration: 80, repeat: Infinity, ease: "linear" },
                opacity: { duration: 2, ease: "easeOut" }
            }}
          >
            {[0, 1].map((key) => (
              <div key={key} className="flex whitespace-nowrap shrink-0">
                {[...Array(6)].map((_, i) => (
                  <span key={i} className="text-4xl md:text-6xl font-heading font-black px-12 flex items-center gap-6">
                    POP UP STORE <span className="text-white/30">●</span> 
                    HIGH TRAFFIC <span className="text-white/30">●</span> 
                    CONVERSION <span className="text-white/30">●</span> 
                  </span>
                ))}
              </div>
            ))}
          </motion.div>
        </div>
      </header>

      {/* SOLUTIONS SECTION (Was Portfolio) */}
      <section id="soluzioni" className="relative z-10 py-32 bg-white text-black">
        <div className="max-w-[1600px] mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-baseline mb-24">
             <h2 className="text-5xl md:text-[7vw] font-heading font-black uppercase leading-[0.8] mb-8 md:mb-0">
              Esperienze <br/> 
              <span className="text-[#489FDB]">Retail</span>
            </h2>
            <p className="max-w-md text-xl md:text-2xl font-light text-black/60 border-l-4 border-[#489FDB] pl-6">
              Portiamo i brand nelle gallerie creando esperienze coinvolgenti che trasformano visitatori in acquirenti.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 border-t border-black/10">
            {SOLUTIONS.map((item) => (
              <ProjectCard key={item.id} artist={item} onClick={() => setSelectedSolution(item)} />
            ))}
          </div>
        </div>
      </section>

      {/* WHY MALLS SECTION (Was Servizi) */}
      <section id="perché-mall" className="relative z-10 py-32 bg-[#050505] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-center">
            <div className="lg:col-span-6">
              <h2 className="text-5xl md:text-7xl font-heading font-black mb-12 leading-none text-white">
                Perché i <br/> <span className="text-[#489FDB]">Centri Commerciali?</span>
              </h2>
              
              <div className="grid grid-cols-1 gap-12">
                {[
                  { icon: Users, title: 'Traffico Garantito', desc: '12M footfall = 1M clienti unici per centro. Location esclusive con migliaia di visitatori quotidiani.' },
                  { icon: ShoppingBag, title: 'Pronti all\'acquisto', desc: 'Popolazione eterogenea di clienti qualificati con alta propensione all\'acquisto immediato.' },
                  { icon: Store, title: 'Flessibilità', desc: 'Spazi adattabili che superano le performance dei negozi tradizionali. Minori vincoli.' },
                ].map((feature, i) => (
                  <div key={i} className="group cursor-default">
                    <div className="flex items-center gap-6 mb-4">
                      <div className="p-5 bg-white/5 border border-white/10 group-hover:bg-[#489FDB] group-hover:border-[#489FDB] transition-all duration-500">
                        <feature.icon className="w-8 h-8 text-white" />
                      </div>
                      <h4 className="text-2xl font-bold font-heading uppercase tracking-tighter">{feature.title}</h4>
                    </div>
                    <p className="text-gray-400 text-lg font-light leading-relaxed max-w-sm pl-[92px]">
                      {feature.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-6 relative h-[700px] w-full flex flex-col gap-4">
              {/* Cost/Flexibility Visual */}
              <div className="bg-white/5 border border-white/10 p-8 h-full flex flex-col justify-between relative overflow-hidden group">
                 <div className="absolute top-0 right-0 p-4 opacity-20">
                    <Layout className="w-32 h-32 text-white" />
                 </div>
                 
                 <div>
                    <h3 className="text-3xl font-heading font-bold mb-8">Affitto Corner <span className="text-[#489FDB]">Flessibile</span></h3>
                    <div className="space-y-6">
                       {[
                         { time: '1 Settimana', label: 'Lancio Prodotti', w: '20%' },
                         { time: '1 Mese', label: 'Test Mercato', w: '40%' },
                         { time: '3 Mesi', label: 'Campagne Standard', w: '60%' },
                         { time: '6 Mesi', label: 'Penetrazione', w: '80%' },
                         { time: '12 Mesi', label: 'Best Price Strategy', w: '100%' },
                       ].map((item, idx) => (
                         <div key={idx} className="relative">
                            <div className="flex justify-between text-xs uppercase tracking-widest mb-2 font-bold">
                              <span>{item.time}</span>
                              <span className="text-gray-400">{item.label}</span>
                            </div>
                            <div className="h-2 bg-white/10 w-full overflow-hidden">
                               <motion.div 
                                 initial={{ width: 0 }}
                                 whileInView={{ width: item.w }}
                                 transition={{ duration: 1, delay: idx * 0.1 }}
                                 className="h-full bg-[#489FDB]"
                               />
                            </div>
                         </div>
                       ))}
                    </div>
                 </div>

                 <div className="mt-8 pt-8 border-t border-white/10">
                    <p className="text-sm text-gray-400 uppercase tracking-widest">Partnership strategica con</p>
                    <p className="text-2xl font-bold mt-2">Cushman & Wakefield</p>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SUCCESS STORY SECTION (Was Filosofia) */}
      <section id="success-stories" className="relative z-10 py-32 bg-white text-black">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-24">
             <h2 className="text-5xl md:text-[8vw] font-heading font-black uppercase tracking-tighter leading-none opacity-10">
               SUCCESS STORY
             </h2>
             <div className="mt-0 relative z-10">
               <h3 className="text-4xl md:text-6xl font-heading font-black mb-4">British American Tobacco</h3>
               <p className="text-[#489FDB] font-bold uppercase tracking-[0.4em] text-xl">
                 Retail Excellence
               </p>
             </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { 
                value: '200', 
                label: 'Centri Commerciali', 
                desc: 'Presenza a livello nazionale in location retail di fascia premium.',
                icon: MapPin 
              },
              { 
                value: '40', 
                label: 'Gestiti da NOLOOP', 
                desc: 'Location ad alte prestazioni che garantiscono un ROI eccezionale.',
                icon: Zap 
              },
              { 
                value: '13K', 
                label: 'Tabaccai vs Mall', 
                desc: 'I centri gestiti superano costantemente i canali di vendita tradizionali.',
                icon: TrendingUp 
              },
            ].map((stat, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -15 }}
                className="p-12 border-2 border-black/5 bg-gray-50 flex flex-col justify-between h-[450px] relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                  <stat.icon className="w-32 h-32" />
                </div>
                
                <div>
                  <h3 className="text-7xl font-heading font-black mb-4 text-[#489FDB]">{stat.value}</h3>
                  <h4 className="text-2xl font-bold uppercase tracking-tighter mb-6">{stat.label}</h4>
                  <p className="text-xl font-light text-gray-600 leading-relaxed">{stat.desc}</p>
                </div>
                <div className="h-1 w-full bg-black/10 relative overflow-hidden mt-8">
                  <motion.div 
                    className="absolute inset-y-0 left-0 bg-[#489FDB]"
                    initial={{ width: 0 }}
                    whileInView={{ width: '100%' }}
                    transition={{ duration: 1.5, delay: 0.5 + (i * 0.2) }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-20 text-center">
             <p className="text-2xl font-light italic text-gray-600 max-w-3xl mx-auto">
               "NOLOOP ON TRADE dimostra l'efficacia di un posizionamento strategico nei centri commerciali con pop-up store."
             </p>
          </div>
        </div>
      </section>

      {/* FOOTER & CONTACT */}
      <footer id="contatti" className="relative z-10 py-32 bg-[#050505] border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-20 mb-32">
            <div>
              <h2 className="text-5xl md:text-8xl font-heading font-black mb-8 leading-none">
                ACCESSO <br/> <span className="text-[#489FDB]">IMMEDIATO</span>
              </h2>
              <p className="text-2xl text-gray-400 font-light mb-12 max-w-md">
                Milioni di clienti target ti aspettano. Avvia il tuo pop-up store in tempi rapidissimi.
              </p>
              <div className="space-y-4">
                <a href="mailto:trade@noloop.eu" className="block text-3xl font-bold hover:text-[#489FDB] transition-colors border-b-2 border-white/10 py-4">trade@noloop.eu</a>
                <div className="flex gap-8 pt-8">
                   <div>
                     <p className="text-xs uppercase tracking-widest text-gray-500 mb-2">Sede Milano</p>
                     <p className="text-xl">Via della Moscova, 18</p>
                   </div>
                   <div>
                     <p className="text-xs uppercase tracking-widest text-gray-500 mb-2">Sede Roma</p>
                     <p className="text-xl">Viale Europa, 32</p>
                   </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white/5 p-12 border border-white/10">
              <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-gray-500">Brand / Azienda</label>
                  <input type="text" className="w-full bg-transparent border-b border-white/20 py-4 focus:border-[#489FDB] outline-none text-xl transition-colors" placeholder="Il tuo Brand" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-gray-500">Email Aziendale</label>
                  <input type="email" className="w-full bg-transparent border-b border-white/20 py-4 focus:border-[#489FDB] outline-none text-xl transition-colors" placeholder="email@azienda.it" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest font-bold text-gray-500">Obiettivo</label>
                  <select className="w-full bg-transparent border-b border-white/20 py-4 focus:border-[#489FDB] outline-none text-xl transition-colors text-white/50">
                     <option>Lancio Prodotto</option>
                     <option>Brand Awareness</option>
                     <option>Lead Generation</option>
                     <option>Vendita Diretta</option>
                  </select>
                </div>
                <button className="w-full bg-[#489FDB] py-6 text-sm font-bold uppercase tracking-[0.4em] hover:bg-white hover:text-black transition-all duration-500">Richiedi Contatto</button>
              </form>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 border-t border-white/10 pt-16">
            <div className="flex items-baseline gap-2">
              <span className="font-heading text-4xl font-black tracking-tighter">NOLOOP</span>
              <span className="text-[#489FDB] font-bold tracking-widest uppercase text-xs">On Trade</span>
            </div>
            <div className="flex gap-12 text-xs font-bold uppercase tracking-widest text-gray-500">
              <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
              <a href="#" className="hover:text-white transition-colors">Instagram</a>
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
            </div>
            <p className="text-[10px] text-gray-600 uppercase tracking-widest">© 2025 NOLOOP SOCIETÀ BENEFIT</p>
          </div>
        </div>
      </footer>

      {/* AIChat Integration */}
      <AIChat />

      {/* Project/Service Detail Modal */}
      <AnimatePresence>
        {selectedSolution && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedSolution(null)}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/95 cursor-auto"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-6xl bg-white text-black overflow-hidden flex flex-col md:flex-row shadow-2xl"
            >
              <button
                onClick={() => setSelectedSolution(null)}
                className="absolute top-8 right-8 z-20 p-2 text-black hover:text-[#489FDB] transition-colors"
                data-hover="true"
              >
                <X className="w-10 h-10" />
              </button>

              <div className="w-full md:w-1/2 h-[400px] md:h-auto relative overflow-hidden bg-gray-100">
                <img 
                  src={selectedSolution.image} 
                  alt={selectedSolution.name} 
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>

              <div className="w-full md:w-1/2 p-12 md:p-20 flex flex-col justify-center">
                <div className="inline-block px-3 py-1 bg-[#489FDB] text-white text-[10px] font-bold tracking-[0.3em] uppercase mb-8 w-fit">
                   {selectedSolution.day}
                </div>
                
                <h3 className="text-5xl md:text-7xl font-heading font-black uppercase leading-[0.8] mb-6">
                  {selectedSolution.name}
                </h3>
                
                <p className="text-2xl text-[#489FDB] font-bold tracking-widest uppercase mb-10">
                  {selectedSolution.genre}
                </p>
                
                <p className="text-xl text-gray-700 leading-relaxed font-light mb-12">
                  {selectedSolution.description}
                </p>

                <button className="flex items-center gap-4 text-sm font-bold uppercase tracking-widest border-b-2 border-black pb-2 w-fit hover:text-[#489FDB] hover:border-[#489FDB] transition-all">
                  Scopri Dettagli <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;