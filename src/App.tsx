import React, { useRef, useState, useEffect } from 'react';
import { Instagram, Facebook, MessageCircle, Phone, Menu, X } from 'lucide-react';
import { motion } from 'framer-motion'; // 'motion/react' ki jagah 'framer-motion' standard hai

// ==========================================
// TYPES & INTERFACES
// ==========================================
interface EventItem {
  id: string;
  type: 'image' | 'video';
  src: string;
  price: string;
}

interface EventCategory {
  id: string;
  title: string;
  description: string;
  items: EventItem[];
}

// ==========================================
// LOCAL ASSETS IMPORTS
// ==========================================
import finalLogoUrl from './assets/Delight Dream Event Logo 1.jpeg';
import masoorImg from './assets/masoor.png';
import muneebImg from './assets/muneeb.png';
import noumanImg from './assets/nouman.png';

const TikTokIcon = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

const categoryConfig: Record<string, { title?: string, description?: string, defaultPrice?: string }> = {
  'Mehndi': { title: 'Mehndi Decor', description: 'Vibrant colors and stunning floral arrangements for your perfect Mehndi night.', defaultPrice: 'Price on Request' },
  'Barat': { title: 'Barat Decor', description: 'Grand entrances and luxurious red & gold themes for an unforgettable Barat.', defaultPrice: 'Price on Request' },
  'Walima': { title: 'Walima Decor', description: 'Elegant, sophisticated, and serene setups with pastel tones.', defaultPrice: 'Price on Request' },
  'Birthday': { title: 'Birthday Decor', description: 'Fun, creative, and personalized themes for kids and adults alike.', defaultPrice: 'Price on Request' },
  'Corporate': { title: 'Corporate Events', description: 'Professional setups for conferences, product launches, and company dinners.', defaultPrice: 'Custom Pricing' },
  'Mehfil-e-Naat': { title: 'Mehfil-e-Naat', description: 'Peaceful, elegant, and spiritually uplifting decor.', defaultPrice: 'Price on Request' },
  'Welcome Baby': { title: 'Welcome Baby', description: 'Adorable and heartwarming setups to welcome the newest member.', defaultPrice: 'Price on Request' },
};

// ==========================================
// DYNAMIC FOLDER READING LOGIC
// ==========================================
const rawFiles = import.meta.glob('/src/assets/events/**/*.{jpg,jpeg,png,mp4,webm}', { 
  eager: true, 
  import: 'default' 
});

const eventsMap = new Map<string, EventCategory>();

Object.entries(rawFiles).forEach(([path, fileUrl]) => {
  const parts = path.split('/');
  const eventName = parts[parts.length - 2]; 
  const fileName = parts[parts.length - 1];
  const url = fileUrl as string;
  const isVideo = /\.(mp4|webm|ogg)$/i.test(fileName);

  if (!eventsMap.has(eventName)) {
    const config = categoryConfig[eventName] || {};
    eventsMap.set(eventName, {
      id: eventName.toLowerCase().replace(/\s+/g, '-'),
      title: config.title || eventName,
      description: config.description || `Beautiful setups for your ${eventName}.`,
      items: []
    });
  }

  const config = categoryConfig[eventName] || {};
  eventsMap.get(eventName)?.items.push({
    id: fileName,
    type: isVideo ? 'video' : 'image',
    src: url,
    price: config.defaultPrice || 'Price on request'
  });
});

let dynamicEventCategories: EventCategory[] = Array.from(eventsMap.values());

// Fallback data agar assets na milein
if (dynamicEventCategories.length === 0) {
  dynamicEventCategories = [
    {
      id: 'mehndi', title: 'Mehndi Decor', description: 'Vibrant colors for your perfect Mehndi night.',
      items: [{ id: 'm1', type: 'image', src: 'https://images.unsplash.com/photo-1587271407850-8d438ca9fdf4', price: 'Rs. 50,000' }]
    }
  ];
}

const navLinks = [
  ...dynamicEventCategories.map(cat => ({ name: cat.title.split(' ')[0], href: `#${cat.id}` })),
  { name: 'Team', href: '#team' },
  { name: 'Contact', href: '#contact' },
];

const team = [
  { id: 1, name: 'Masoor Ahmed', role: 'Lead Decorator', phone: '0321-5261825', image: masoorImg },
  { id: 2, name: 'Ghulam Muneeb', role: 'Event Manager', phone: '0320-5704734', image: muneebImg },
  { id: 3, name: 'Nouman Shabbir', role: 'Creative Director', phone: '0315-5601673', image: noumanImg },
];

// --- Components ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#0a0a0a]/90 backdrop-blur-md border-b border-neutral-800/50 py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <a href="#home" className="flex items-center gap-3">
          <img src={finalLogoUrl} alt="Logo" className="w-10 h-10 rounded-full object-cover ring-1 ring-amber-500/30 bg-black" />
          <span className="font-serif font-bold text-xl text-amber-400 tracking-wide hidden sm:block">Delight Dream Events</span>
        </a>
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="text-sm font-medium text-neutral-300 hover:text-amber-400 transition-colors">{link.name}</a>
          ))}
        </div>
        <button className="md:hidden text-neutral-300" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>
      {isOpen && (
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="md:hidden absolute top-full left-0 right-0 bg-[#0a0a0a]/95 py-4 px-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} onClick={() => setIsOpen(false)} className="text-lg text-neutral-300 py-2 border-b border-neutral-800/50">{link.name}</a>
          ))}
        </motion.div>
      )}
    </nav>
  );
};

const MediaCard = ({ item }: { item: EventItem }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="relative group overflow-hidden rounded-xl aspect-[4/3] bg-neutral-900 border border-neutral-800/50"
      onMouseEnter={() => item.type === 'video' && videoRef.current?.play()}
      onMouseLeave={() => { if (item.type === 'video' && videoRef.current) { videoRef.current.pause(); videoRef.current.currentTime = 0; }}}
    >
      {item.type === 'video' ? (
        <video ref={videoRef} src={item.src} className="w-full h-full object-cover" muted loop playsInline />
      ) : (
        <img src={item.src} alt="Event" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
      )}
      <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-center items-center">
        <p className="text-white text-2xl font-bold">{item.price}</p>
      </div>
    </motion.div>
  );
};

export default function App() {
  return (
    <div className="min-h-screen bg-black text-neutral-200">
      <Navbar />
      <header id="home" className="relative pt-32 pb-32 flex flex-col items-center text-center min-h-screen justify-center px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="z-10">
          <img src={finalLogoUrl} alt="Logo" className="w-48 h-48 mx-auto mb-10 rounded-full shadow-2xl ring-1 ring-white/10" />
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-amber-400 mb-6">Delight Dream <span className="block text-3xl mt-2 tracking-widest text-amber-500/80 uppercase">Events</span></h1>
          <p className="max-w-2xl text-lg text-neutral-400 mb-10">𝐘𝐨𝐮𝐫 𝐜𝐞𝐥𝐞𝐛𝐫𝐚𝐭𝐢𝐨𝐧𝐬 𝐝𝐞𝐬𝐞𝐫𝐯𝐞 𝐦𝐨𝐫𝐞 𝐭𝐡𝐚𝐧 𝐣𝐮𝐬𝐭 𝐚 𝐬𝐞𝐭𝐮𝐩—𝐭𝐡𝐞𝐲 𝐝𝐞𝐬𝐞𝐫𝐯𝐞 𝐚 𝐦𝐚𝐬𝐭𝐞𝐫𝐩𝐢𝐞𝐜𝐞. 𝐖𝐞 𝐬𝐩𝐞𝐜𝐢𝐚𝐥𝐢𝐳𝐞 𝐢𝐧 𝐜𝐫𝐞𝐚𝐭𝐢𝐧𝐠 𝐛𝐫𝐞𝐚𝐭𝐡𝐭𝐚𝐤𝐢𝐧𝐠 𝐞𝐧𝐯𝐢𝐫𝐨𝐧𝐦𝐞𝐧𝐭𝐬 𝐟𝐨𝐫 𝐰𝐞𝐝𝐝𝐢𝐧𝐠𝐬, 𝐛𝐢𝐫𝐭𝐡𝐝𝐚𝐲𝐬, 𝐚𝐧𝐝 𝐜𝐨𝐫𝐩𝐨𝐫𝐚𝐭𝐞 𝐠𝐚𝐭𝐡𝐞𝐫𝐢𝐧𝐠𝐬, 𝐜𝐨𝐦𝐛𝐢𝐧𝐢𝐧𝐠 𝐜𝐫𝐞𝐚𝐭𝐢𝐯𝐞 𝐢𝐧𝐧𝐨𝐯𝐚𝐭𝐢𝐨𝐧 𝐰𝐢𝐭𝐡 𝐟𝐥𝐚𝐰𝐥𝐞𝐬𝐬 𝐞𝐱𝐞𝐜𝐮𝐭𝐢𝐨𝐧 𝐭𝐨 𝐦𝐚𝐤𝐞 𝐲𝐨𝐮𝐫 𝐬𝐩𝐞𝐜𝐢𝐚𝐥 𝐦𝐨𝐦𝐞𝐧𝐭𝐬 𝐭𝐫𝐮𝐥𝐲 𝐮𝐧𝐟𝐨𝐫𝐠𝐞𝐭𝐭𝐚𝐛𝐥𝐞.</p>
          <div className="flex justify-center gap-6">
            <a href="https://www.instagram.com/delightdreamevents?igsh=MXdzNnluMjAzbWhsNw==" className="p-4 rounded-full bg-neutral-900 text-amber-500 hover:bg-amber-500 hover:text-black transition-all"><Instagram size={24} /></a>
            <a href="https://www.facebook.com/share/1CfSUe3xok/" className="p-4 rounded-full bg-neutral-900 text-amber-500 hover:bg-amber-500 hover:text-black transition-all"><Facebook size={24} /></a>
            <a href="https://www.tiktok.com/@delight.dream.events?_r=1&_t=ZS-95CXCg0FamT" className="p-4 rounded-full bg-neutral-900 text-amber-500 hover:bg-amber-500 hover:text-black transition-all"><TikTokIcon size={24} /></a>
          </div>
        </motion.div>
      </header>

      {dynamicEventCategories.map((category) => (
        <section key={category.id} id={category.id} className="py-16 px-4 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-white mb-4">{category.title}</h2>
            <p className="text-neutral-400">{category.description}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {category.items.map((item) => <MediaCard key={item.id} item={item} />)}
          </div>
        </section>
      ))}

      <section id="team" className="py-16 bg-neutral-950 px-4">
        <h2 className="text-center text-4xl font-serif font-bold mb-20 text-white">Our Team</h2>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          {team.map(member => (
            <div key={member.id} className="text-center group">
              <img src={member.image} className="w-48 h-48 rounded-full mx-auto object-cover border-4 border-neutral-800 group-hover:border-amber-500 transition-all" />
              <h3 className="text-xl font-bold mt-4 text-amber-400">{member.name}</h3>
              <p className="text-neutral-500">{member.role}</p>
              <p className="text-sm text-neutral-400 mt-2">{member.phone}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="contact" className="py-16 text-center px-4">
         <h2 className="text-4xl md:text-6xl font-serif font-bold text-white mb-8 tracking-tight">Let's Plan Your Event</h2>
          <p className="text-xl text-neutral-400 mb-12 font-light">Ready to make your dream event a reality? Get in touch with us directly via WhatsApp for a consultation.</p>
        <a href="https://wa.me/923155601673" className="inline-flex items-center gap-3 bg-[#25D366] px-8 py-4 rounded-full text-white font-bold hover:scale-105 transition-transform">
          <MessageCircle size={24} /> Chat on WhatsApp
        </a>
      </section>
      {/* Footer */}
      <footer className="py-12 text-center border-t border-neutral-900 text-neutral-500 bg-[#050505]">
        <img
          src={finalLogoUrl}
          alt="Delight Dream Events Logo"
          className="w-16 h-16 object-contain mx-auto mb-6 rounded-full shadow-2xl ring-1 ring-white/10"
          referrerPolicy="no-referrer"
        />
        <p>&copy; {new Date().getFullYear()} Delight Dream Events. All rights reserved.</p>
      </footer>
    </div>
  );
}