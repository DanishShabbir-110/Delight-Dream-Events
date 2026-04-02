// import React, { useRef, useState, useEffect } from 'react';
// import { Instagram, Facebook, MessageCircle, Phone, Menu, X } from 'lucide-react';
// import { motion } from 'framer-motion';

// // ==========================================
// // TYPES & INTERFACES
// // ==========================================
// interface EventItem {
//   id: string;
//   type: 'image' | 'video';
//   src: string;
//   price: string;
// }

// interface EventCategory {
//   id: string;
//   title: string;
//   description: string;
//   items: EventItem[];
// }

// interface TeamMember {
//   id: number;
//   name: string;
//   role: string;
//   phone: string;
//   image: string;
// }

// // ==========================================
// // LOCAL ASSETS IMPORTS
// // ==========================================
// import finalLogoUrl from './assets/Delight Dream Event Logo 1.jpeg';
// import masoorImg from './assets/masoor.png';
// import muneebImg from './assets/muneeb.png';
// import noumanImg from './assets/nouman.png';

// const TikTokIcon = ({ size = 24, className = "" }) => (
//   <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
//     <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
//   </svg>
// );

// const categoryConfig: Record<string, { title?: string, description?: string, defaultPrice?: string }> = {
//   'Mehndi': { title: 'Mehndi Decor', description: 'Vibrant colors and stunning floral arrangements for your perfect Mehndi night.', defaultPrice: 'Price on Request' },
//   'Barat': { title: 'Barat Decor', description: 'Grand entrances and luxurious red & gold themes for an unforgettable Barat.', defaultPrice: 'Price on Request' },
//   'Walima': { title: 'Walima Decor', description: 'Elegant, sophisticated, and serene setups with pastel tones.', defaultPrice: 'Price on Request' },
//   'Birthday': { title: 'Birthday Decor', description: 'Fun, creative, and personalized themes for kids and adults alike.', defaultPrice: 'Price on Request' },
//   'Corporate': { title: 'Corporate Events', description: 'Professional setups for conferences, product launches, and company dinners.', defaultPrice: 'Custom Pricing' },
//   'Mehfil-e-Naat': { title: 'Mehfil-e-Naat', description: 'Peaceful, elegant, and spiritually uplifting decor.', defaultPrice: 'Price on Request' },
//   'Welcome Baby': { title: 'Welcome Baby', description: 'Adorable and heartwarming setups to welcome the newest member.', defaultPrice: 'Price on Request' },
// };

// // ==========================================
// // DYNAMIC FOLDER READING LOGIC
// // ==========================================
// const rawFiles = import.meta.glob('/src/assets/events/**/*.{jpg,jpeg,png,mp4,webm}', { 
//   eager: true, 
//   import: 'default' 
// });

// const eventsMap = new Map<string, EventCategory>();

// Object.entries(rawFiles).forEach(([path, fileUrl]) => {
//   const parts = path.split('/');
//   const eventName = parts[parts.length - 2]; 
//   const fileName = parts[parts.length - 1];
//   const url = fileUrl as string;
//   const isVideo = /\.(mp4|webm|ogg)$/i.test(fileName);

//   if (!eventsMap.has(eventName)) {
//     const config = categoryConfig[eventName] || {};
//     eventsMap.set(eventName, {
//       id: eventName.toLowerCase().replace(/\s+/g, '-'),
//       title: config.title || eventName,
//       description: config.description || `Beautiful setups for your ${eventName}.`,
//       items: []
//     });
//   }

//   const config = categoryConfig[eventName] || {};
//   eventsMap.get(eventName)?.items.push({
//     id: fileName,
//     type: isVideo ? 'video' : 'image',
//     src: url,
//     price: config.defaultPrice || 'Price on request'
//   });
// });

// let dynamicEventCategories: EventCategory[] = Array.from(eventsMap.values());

// if (dynamicEventCategories.length === 0) {
//   dynamicEventCategories = [
//     {
//       id: 'mehndi', title: 'Mehndi Decor', description: 'Vibrant colors for your perfect Mehndi night.',
//       items: [{ id: 'm1', type: 'image', src: 'https://images.unsplash.com/photo-1587271407850-8d438ca9fdf4', price: 'Rs. 50,000' }]
//     }
//   ];
// }

// const navLinks = [
//   ...dynamicEventCategories.map(cat => ({ name: cat.title.split(' ')[0], href: `#${cat.id}` })),
//   { name: 'Team', href: '#team' },
//   { name: 'Contact', href: '#contact' },
// ];

// const team: TeamMember[] = [
//   { id: 1, name: 'Masoor Ahmed', role: 'Lead Decorator', phone: '0321-5261825', image: masoorImg },
//   { id: 2, name: 'Ghulam Muneeb', role: 'Event Manager', phone: '0320-5704734', image: muneebImg },
//   { id: 3, name: 'Nouman Shabbir', role: 'Creative Director', phone: '0315-5601673', image: noumanImg },
// ];

// // --- Sub-Components ---

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => setScrolled(window.scrollY > 50);
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   return (
//     <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#0a0a0a]/90 backdrop-blur-md border-b border-neutral-800/50 py-3' : 'bg-transparent py-5'}`}>
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
//         <a href="#home" className="flex items-center gap-3">
//           <img src={finalLogoUrl} alt="Logo" className="w-10 h-10 rounded-full object-cover ring-1 ring-amber-500/30 bg-black" />
//           <span className="font-serif font-bold text-xl text-amber-400 tracking-wide hidden sm:block">Delight Dream Events</span>
//         </a>
//         <div className="hidden md:flex items-center gap-6">
//           {navLinks.map((link) => (
//             <a key={link.name} href={link.href} className="text-sm font-medium text-neutral-300 hover:text-amber-400 transition-colors">{link.name}</a>
//           ))}
//         </div>
//         <button className="md:hidden text-neutral-300" onClick={() => setIsOpen(!isOpen)}>
//           {isOpen ? <X size={28} /> : <Menu size={28} />}
//         </button>
//       </div>
//       {isOpen && (
//         <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="md:hidden absolute top-full left-0 right-0 bg-[#0a0a0a]/95 py-4 px-4 flex flex-col gap-4 shadow-2xl">
//           {navLinks.map((link) => (
//             <a key={link.name} href={link.href} onClick={() => setIsOpen(false)} className="text-lg text-neutral-300 py-2 border-b border-neutral-800/50">{link.name}</a>
//           ))}
//         </motion.div>
//       )}
//     </nav>
//   );
// };

// const MediaCard = ({ item }: { item: EventItem }) => {
//   const videoRef = useRef<HTMLVideoElement>(null);
//   return (
//     <motion.div
//       initial={{ opacity: 0, scale: 0.95 }}
//       whileInView={{ opacity: 1, scale: 1 }}
//       viewport={{ once: true }}
//       className="relative group overflow-hidden rounded-xl aspect-[4/3] bg-neutral-900 border border-neutral-800/50"
//       onMouseEnter={() => item.type === 'video' && videoRef.current?.play()}
//       onMouseLeave={() => { if (item.type === 'video' && videoRef.current) { videoRef.current.pause(); videoRef.current.currentTime = 0; }}}
//     >
//       {item.type === 'video' ? (
//         <video ref={videoRef} src={item.src} className="w-full h-full object-cover" muted loop playsInline />
//       ) : (
//         <img src={item.src} alt="Event" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
//       )}
//       <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-center items-center p-4 text-center">
//         <p className="text-white text-2xl font-bold">{item.price}</p>
//       </div>
//     </motion.div>
//   );
// };

// const TeamCard = ({ member }: { member: TeamMember }) => {
//   const whatsappNumber = member.phone.replace(/[- ]/g, '');
//   const cleanNumber = whatsappNumber.startsWith('0') ? `92${whatsappNumber.slice(1)}` : whatsappNumber;

//   return (
//     <motion.div 
//       initial={{ opacity: 0, y: 30 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       viewport={{ once: true }}
//       className="relative group overflow-hidden rounded-full aspect-square w-64 mx-auto shadow-2xl border-4 border-neutral-800 hover:border-amber-500/50 transition-colors duration-500"
//     >
//       <img src={member.image} alt={member.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
//       <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center text-center p-6 rounded-full">
//         <h3 className="text-xl font-serif font-bold text-amber-400 mb-1">{member.name}</h3>
//         <p className="text-neutral-300 text-xs mb-4 uppercase tracking-widest">{member.role}</p>
//         <a 
//           href={`https://wa.me/${cleanNumber}`} 
//           target="_blank"
//           rel="noreferrer"
//           className="text-white text-sm font-medium hover:text-amber-400 transition-colors flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm border border-white/10"
//           onClick={(e) => e.stopPropagation()}
//         >
//           <MessageCircle size={14} className="text-[#25D366]" />
//           {member.phone}
//         </a>
//       </div>
//     </motion.div>
//   );
// };

// // ==========================================
// // MAIN APP COMPONENT
// // ==========================================
// export default function App() {
//   return (
//     <div className="min-h-screen bg-animated text-neutral-200 selection:bg-amber-500/30">
//       <Navbar />
      
//       {/* Hero Section: Split Layout with Proper Spacing */}
//       <header id="home" className="relative pt-32 pb-20 min-h-screen flex items-center justify-center px-4 overflow-hidden">
//         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 pointer-events-none"></div>
        
//         {/* lg:gap-32 and lg:pr-20 handle the spacing you requested */}
//         <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32 items-center z-10 px-6 lg:pr-20">
          
//           {/* Left Side: Name & Description */}
//           <motion.div 
//             initial={{ opacity: 0, x: -50 }} 
//             animate={{ opacity: 1, x: 0 }} 
//             transition={{ duration: 0.8 }}
//             className="text-center lg:text-left order-2 lg:order-1"
//           >
//             <h1 className="text-5xl md:text-7xl font-serif font-bold text-amber-400 mb-6 leading-tight">
//               Delight Dream 
//               <span className="block text-3xl md:text-5xl mt-2 tracking-widest text-amber-500/80 uppercase">Events</span>
//             </h1>
//             <p className="max-w-2xl text-lg md:text-xl text-neutral-400 mb-10 leading-relaxed font-light italic mx-auto lg:mx-0">
//               "Your celebrations deserve more than just a setup—they deserve a masterpiece. We specialize in creating breathtaking environments for weddings, birthdays, and corporate gatherings, combining creative innovation with flawless execution."
//             </p>
            
//             <div className="flex flex-wrap justify-center lg:justify-start gap-6">
//               <a href="https://wa.me/923155601673" target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 bg-[#25D366] px-8 py-3 rounded-full text-white font-bold hover:scale-105 transition-transform shadow-lg">
//                 <MessageCircle size={20} /> Let's Plan Your Event
//               </a>
//               <div className="flex gap-4">
//                 <a href="https://www.instagram.com/delightdreamevents" target="_blank" rel="noreferrer" className="p-3 rounded-full bg-neutral-900 text-amber-500 hover:bg-amber-500 hover:text-black transition-all border border-neutral-800 shadow-xl"><Instagram size={22} /></a>
//                 <a href="https://www.facebook.com/share/1CfSUe3xok/" target="_blank" rel="noreferrer" className="p-3 rounded-full bg-neutral-900 text-amber-500 hover:bg-amber-500 hover:text-black transition-all border border-neutral-800 shadow-xl"><Facebook size={22} /></a>
//                 <a href="https://www.tiktok.com/@delight.dream.events" target="_blank" rel="noreferrer" className="p-3 rounded-full bg-neutral-900 text-amber-500 hover:bg-amber-500 hover:text-black transition-all border border-neutral-800 shadow-xl"><TikTokIcon size={22} /></a>
//               </div>
//             </div>
//           </motion.div>

//           {/* Right Side: Large Logo with Right Spacing */}
//           <motion.div 
//             initial={{ opacity: 0, x: 50, scale: 0.8 }} 
//             animate={{ opacity: 1, x: 0, scale: 1 }} 
//             transition={{ duration: 0.8, delay: 0.2 }}
//             className="flex justify-center lg:justify-end order-1 lg:order-2"
//           >
//             <div className="relative">
//               <motion.div
//                 animate={{ y: [0, -15, 0] }}
//                 transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
//                 className="relative z-10"
//               >
//                 {/* Size increased to 400px (w-[400px]) for a 'Bada Sa' look */}
//                 <img 
//                   src={finalLogoUrl} 
//                   alt="Delight Dream Logo" 
//                   className="w-64 h-64 md:w-[400px] md:h-[400px] object-contain rounded-full shadow-[0_0_80px_rgba(245,158,11,0.2)] ring-2 ring-amber-500/20 bg-black" 
//                 />
//               </motion.div>
//               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-amber-500/10 blur-[100px] rounded-full"></div>
//             </div>
//           </motion.div>

//         </div>
//       </header>

//       {/* Dynamic Sections */}
//       {dynamicEventCategories.map((category) => (
//         <section key={category.id} id={category.id} className="py-20 px-4 max-w-7xl mx-auto border-t border-neutral-900/50">
//           <div className="text-center mb-16">
//             <h2 className="text-4xl font-serif font-bold text-white mb-4">{category.title}</h2>
//             <div className="w-16 h-1 bg-amber-500/50 mx-auto mb-6"></div>
//             <p className="text-neutral-400 max-w-2xl mx-auto">{category.description}</p>
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {category.items.map((item) => <MediaCard key={item.id} item={item} />)}
//           </div>
//         </section>
//       ))}

//       {/* Team Section */}
//       <section id="team" className="py-24 px-4 sm:px-6 lg:px-8 bg-neutral-950/90 backdrop-blur-md border-y border-neutral-900 relative overflow-hidden">
//         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent"></div>
//         <div className="max-w-7xl mx-auto relative z-10">
//           <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-20">
//             <h2 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6">Meet Our Team</h2>
//             <p className="text-neutral-400 max-w-2xl mx-auto text-lg italic">The creative minds behind your perfect events. Contact With Us.</p>
//           </motion.div>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
//             {team.map(member => (
//               <TeamCard key={member.id} member={member} />
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Contact Section */}
//       <section id="contact" className="py-24 text-center px-4 bg-black relative">
//         <div className="absolute inset-0 bg-amber-500/5 blur-[120px] rounded-full pointer-events-none"></div>
//         <h2 className="text-4xl md:text-6xl font-serif font-bold text-white mb-8">Let's Plan Your Event</h2>
//         <p className="text-xl text-neutral-400 mb-12 font-light max-w-2xl mx-auto">Ready to make your dream event a reality? Get in touch with us directly via WhatsApp for a consultation.</p>
//         <a href="https://wa.me/923155601673" target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 bg-[#25D366] px-10 py-5 rounded-full text-white text-xl font-bold hover:scale-105 transition-transform shadow-xl">
//           <MessageCircle size={28} /> Chat on WhatsApp
//         </a>
//       </section>

//       {/* Footer */}
//       <footer className="py-12 text-center border-t border-neutral-900 text-neutral-500 bg-[#050505]">
//         <img src={finalLogoUrl} alt="Footer Logo" className="w-16 h-16 mx-auto mb-6 rounded-full shadow-2xl ring-1 ring-white/10" />
//         <p>&copy; {new Date().getFullYear()} Delight Dream Events. All rights reserved.</p>
//       </footer>
//     </div>
//   );
// } 


import React, { useRef, useState, useEffect } from 'react';
import { Instagram, Facebook, MessageCircle, Phone, Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';

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

interface TeamMember {
  id: number;
  name: string;
  role: string;
  phone: string;
  image: string;
}

// ==========================================
// LOCAL ASSETS IMPORTS
// ==========================================
import finalLogoUrl from './assets/Delight Dream Event Logo 1.jpeg';
import masoorImg from './assets/masoor.png';
import muneebImg from './assets/muneeb.png';
import noumanImg from './assets/nouman.png';
import danishImg from './assets/danish.jpeg';

const TikTokIcon = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
  </svg>
);

const categoryConfig: Record<string, { title?: string, description?: string, defaultPrice?: string }> = {
  'Mehndi': { title: 'Mehndi Decor', description: 'Vibrant colors and stunning floral arrangements.', defaultPrice: 'Price on Request' },
  'Barat': { title: 'Barat Decor', description: 'Grand entrances and luxurious red & gold themes.', defaultPrice: 'Price on Request' },
  'Walima': { title: 'Walima Decor', description: 'Elegant, sophisticated, and serene setups.', defaultPrice: 'Price on Request' },
  'Birthday': { title: 'Birthday Decor', description: 'Fun, creative, and personalized themes.', defaultPrice: 'Price on Request' },
  'Corporate': { title: 'Corporate Events', description: 'Professional setups for conferences.', defaultPrice: 'Custom Pricing' },
  'Mehfil-e-Naat': { title: 'Mehfil-e-Naat', description: 'Peaceful and spiritually uplifting decor.', defaultPrice: 'Price on Request' },
  'Welcome Baby': { title: 'Welcome Baby', description: 'Adorable setups to welcome the newest member.', defaultPrice: 'Price on Request' },
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

if (dynamicEventCategories.length === 0) {
  dynamicEventCategories = [
    {
      id: 'mehndi', title: 'Mehndi Decor', description: 'Vibrant colors for your perfect Mehndi night.',
      items: [{ id: 'm1', type: 'image', src: 'https://images.unsplash.com/photo-1587271407850-8d438ca9fdf4', price: 'Rs. 50,000' }]
    }
  ];
}

const team: TeamMember[] = [
  { id: 1, name: 'Masoor Ahmed', role: 'Lead Decorator', phone: '0321-5261825', image: masoorImg },
  { id: 2, name: 'Ghulam Muneeb', role: 'Event Manager', phone: '0320-5704734', image: muneebImg },
  { id: 3, name: 'Nouman Shabbir', role: 'Creative Director', phone: '0315-5601673', image: noumanImg },
  { id: 4, name: 'Danish Shabbir', role: 'Social Media Mng', phone: '0302-0058872', image: danishImg },
];

// --- Sub-Components ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Services', href: `#${dynamicEventCategories[0]?.id}` },
    { name: 'Team', href: '#team' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 
      ${scrolled 
        ? 'bg-black/90 backdrop-blur-2xl border-b border-amber-500/20 py-3 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.7)]' 
        : 'bg-black/40 backdrop-blur-md border-b border-white/5 py-5'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <a href="#home" className="flex items-center gap-3 group">
          <img src={finalLogoUrl} alt="Logo" className="w-10 h-10 rounded-full object-cover ring-2 ring-amber-500/30 group-hover:ring-amber-500 transition-all duration-300" />
          <span className="font-serif font-bold text-xl text-amber-400 hidden sm:block tracking-wide">Delight Dream</span>
        </a>
        
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="text-xs font-bold uppercase tracking-widest text-neutral-300 hover:text-amber-400 transition-all duration-300 relative group">
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-500 transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
        </div>
        
        <button className="md:hidden text-neutral-300 hover:text-amber-400 transition-colors" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {isOpen && (
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="md:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-3xl py-8 px-6 flex flex-col gap-6 border-b border-amber-500/20 shadow-2xl">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} onClick={() => setIsOpen(false)} className="text-sm font-bold uppercase tracking-widest text-neutral-300 hover:text-amber-400 text-center">{link.name}</a>
          ))}
        </motion.div>
      )}
    </nav>
  );
};

const MediaCard = ({ item }: { item: EventItem }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  return (
    <div className="relative shrink-0 w-[280px] sm:w-[400px] group overflow-hidden rounded-3xl aspect-[4/3] bg-neutral-900 border border-neutral-800/50" 
      onMouseEnter={() => item.type === 'video' && videoRef.current?.play()} 
      onMouseLeave={() => { if (item.type === 'video' && videoRef.current) { videoRef.current.pause(); videoRef.current.currentTime = 0; } }}>
      {item.type === 'video' ? (
        <video ref={videoRef} src={item.src} className="w-full h-full object-cover" muted loop playsInline />
      ) : (
        <img src={item.src} alt="Event" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
      )}
      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-center items-center p-4">
        <p className="text-white text-xl font-bold">{item.price}</p>
      </div>
    </div>
  );
};

const TeamCard = ({ member }: { member: TeamMember }) => {
  const whatsappNumber = member.phone.replace(/[- ]/g, '');
  const cleanNumber = whatsappNumber.startsWith('0') ? `92${whatsappNumber.slice(1)}` : whatsappNumber;

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="relative group overflow-hidden rounded-full aspect-square w-48 sm:w-64 mx-auto shadow-2xl border-4 border-neutral-800">
      <img src={member.image} alt={member.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
      <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <h3 className="text-lg font-serif font-bold text-amber-400 mb-1 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">{member.name}</h3>
        <p className="text-neutral-400 text-[10px] uppercase tracking-widest mb-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 delay-75">{member.role}</p>
        <a href={`https://wa.me/${cleanNumber}`} target="_blank" rel="noreferrer" className="flex items-center gap-2 bg-[#25D366] px-4 py-1.5 rounded-full text-white text-xs font-bold shadow-lg hover:scale-105 transition-all transform translate-y-4 group-hover:translate-y-0 duration-300 delay-150" onClick={(e) => e.stopPropagation()}>
          <MessageCircle size={14} /> {member.phone}
        </a>
      </div>
    </motion.div>
  );
};

// ==========================================
// MAIN APP COMPONENT
// ==========================================
export default function App() {
  return (
    <div className="min-h-screen bg-black text-neutral-200 selection:bg-amber-500/30 overflow-x-hidden">
      <Navbar />

      <a href="https://wa.me/923155601673" target="_blank" rel="noreferrer" className="fixed bottom-6 right-6 z-[60] bg-[#25D366] p-4 rounded-full shadow-2xl hover:scale-110 transition-transform">
        <MessageCircle size={32} className="text-white" />
      </a>

      <header id="home" className="relative pt-32 pb-20 min-h-screen flex items-center justify-center px-4 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 pointer-events-none"></div>
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-32 items-center z-10 px-6 lg:pl-20">
          <motion.div initial={{ opacity: 0, x: -50, scale: 0.8 }} animate={{ opacity: 1, x: 0, scale: 1 }} transition={{ duration: 0.8 }} className="flex justify-center lg:justify-start order-1">
            <div className="relative">
              <motion.img animate={{ y: [0, -15, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} src={finalLogoUrl} alt="Logo" className="w-64 h-64 md:w-[400px] md:h-[400px] object-contain rounded-full shadow-[0_0_80px_rgba(245,158,11,0.2)] ring-2 ring-amber-500/20 bg-black" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-amber-500/10 blur-[100px] rounded-full"></div>
            </div>
          </motion.div>
          
          <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="text-center lg:text-left order-2">
            <h1 className="text-5xl md:text-8xl font-serif font-bold text-amber-400 mb-6 leading-tight">Delight Dream <span className="block text-3xl md:text-5xl mt-2 tracking-widest text-amber-500/80 uppercase">Events</span></h1>
            <p className="max-w-xl text-lg text-neutral-400 mb-10 italic mx-auto lg:mx-0">"Turning your celebrations into masterpieces with creative innovation and flawless execution."</p>
            <div className="flex justify-center lg:justify-start gap-4">
              <a href="https://instagram.com/delightdreamevents" target="_blank" className="p-3 rounded-full bg-neutral-900 border border-neutral-800 text-amber-500 hover:bg-amber-500 hover:text-black transition-all shadow-xl"><Instagram size={22} /></a>
              <a href="https://facebook.com" target="_blank" className="p-3 rounded-full bg-neutral-900 border border-neutral-800 text-amber-500 hover:bg-amber-500 hover:text-black transition-all shadow-xl"><Facebook size={22} /></a>
              <a href="https://tiktok.com" target="_blank" className="p-3 rounded-full bg-neutral-900 border border-neutral-800 text-amber-500 hover:bg-amber-500 hover:text-black transition-all shadow-xl"><TikTokIcon size={22} /></a>
            </div>
          </motion.div>
        </div>
      </header>

      <div className="space-y-16 py-10">
        {dynamicEventCategories.map((category) => (
          <section key={category.id} id={category.id} className="scroll-mt-24">
            <div className="max-w-7xl mx-auto px-6 mb-8">
              <h2 className="text-3xl font-serif font-bold text-white mb-2">{category.title}</h2>
              <div className="w-16 h-1 bg-amber-500/50 mb-4"></div>
              <p className="text-neutral-400 text-sm">{category.description}</p>
            </div>
            <div className="flex gap-6 overflow-x-auto px-6 pb-6 no-scrollbar snap-x cursor-grab active:cursor-grabbing">
              {category.items.map((item) => (
                <div key={item.id} className="snap-center">
                  <MediaCard item={item} />
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      <section id="team" className="py-24 bg-neutral-950/50 border-y border-neutral-900 scroll-mt-24">
        <div className="max-w-7xl mx-auto text-center mb-20">
          <h2 className="text-4xl font-serif font-bold text-white mb-4">Meet Our Team</h2>
          <p className="text-neutral-500 italic">The experts behind the magic. Hover to see details.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 px-6">
          {team.map(member => (
            <TeamCard key={member.id} member={member} />
          ))}
        </div>
      </section>

      <section id="contact" className="py-24 text-center px-4 bg-black scroll-mt-24">
        <h2 className="text-4xl md:text-6xl font-serif font-bold text-white mb-8 tracking-tighter">Ready to Begin?</h2>
        <a href="https://wa.me/923155601673" target="_blank" className="inline-flex items-center gap-3 bg-[#25D366] px-10 py-5 rounded-full text-white text-xl font-bold hover:scale-105 transition-transform shadow-xl">
          <MessageCircle size={28} /> Chat on WhatsApp
        </a>
      </section>

      <footer className="py-16 text-center border-t border-neutral-900 bg-black">
        <img src={finalLogoUrl} alt="Footer Logo" className="w-16 h-16 mx-auto mb-6 rounded-full opacity-50 grayscale" />
        <p className="text-xs tracking-widest text-neutral-600 uppercase">&copy; {new Date().getFullYear()} Delight Dream Events. All rights reserved.</p>
      </footer>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        html { scroll-behavior: smooth; }
      `}</style>
    </div>
  );
}