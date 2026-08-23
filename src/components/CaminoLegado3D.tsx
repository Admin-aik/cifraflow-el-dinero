import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useGameStore } from '../store/EstadoJuego';
import { soundFx } from '../utils/audio';
import { GAME_IMAGES } from '../data/gameAssets';
import { ARCHETYPES } from '../data/archetypes';
import { 
  Sparkles, 
  Eye, 
  Compass, 
  BookOpen, 
  HelpCircle, 
  ArrowRight, 
  CheckCircle2, 
  Building2, 
  Hammer, 
  Scale, 
  TrendingUp, 
  ShieldAlert,
  Flame,
  Zap,
  Repeat,
  UserCheck,
  LayoutGrid
} from 'lucide-react';

interface ComicBuilding {
  id: string;
  name: string;
  eraName: string;
  subtitle: string;
  category: 'trueque' | 'sal_cauri' | 'forja_lidia' | 'red_digital' | 'banco' | 'bolsa' | 'carpinteria' | 'vivero' | 'defensa';
  imageKey: string;
  x: number; // Isometric grid coordinates
  y: number;
  width: number; // in pixels (>= 220px for clear 3D rendering)
  height: number;
  color: string;
  accentColor: string;
  badge: string;
  icon: string;
  modalTarget: string;
  isPassiveAsset: boolean;
  isLiabilityThreat?: boolean;
}

const COMIC_BUILDINGS: ComicBuilding[] = [
  {
    id: 'bldg_trueque',
    name: 'Mercado de Trueque & Corral de la Cabra',
    eraName: 'Era 1: Trueque Ancestral',
    subtitle: 'Kai, la Cabra Inquieta & La Doble Coincidencia',
    category: 'trueque',
    imageKey: 'trueque',
    x: -340,
    y: 160,
    width: 240,
    height: 190,
    color: '#f59e0b',
    accentColor: '#fbbf24',
    badge: 'ERA 1 • TRUEQUE',
    icon: '🐐',
    modalTarget: 'mercado_trueque',
    isPassiveAsset: true
  },
  {
    id: 'bldg_sal_cauri',
    name: 'Costa de Cauri & Almacén de Sal',
    eraName: 'Era 2: Dinero Mercancía',
    subtitle: 'Lia, Conchas de Cauri & El Primer Salario',
    category: 'sal_cauri',
    imageKey: 'salCauri',
    x: 320,
    y: 180,
    width: 240,
    height: 190,
    color: '#06b6d4',
    accentColor: '#22d3ee',
    badge: 'ERA 2 • SAL & CAURI',
    icon: '🧂',
    modalTarget: 'almacen_sal',
    isPassiveAsset: true
  },
  {
    id: 'bldg_forja_lidia',
    name: 'La Forja Real de Lidia & Dario Mint',
    eraName: 'Era 3: Moneda Acuñada',
    subtitle: 'El Yunque de Dario & Sello del León de Electro',
    category: 'forja_lidia',
    imageKey: 'forjaLidia',
    x: -300,
    y: -190,
    width: 240,
    height: 190,
    color: '#eab308',
    accentColor: '#fde047',
    badge: 'ERA 3 • MONEDA',
    icon: '🦁',
    modalTarget: 'forja_lidia',
    isPassiveAsset: true
  },
  {
    id: 'bldg_red_digital',
    name: 'Torre Cuántica del Bit & Blockchain',
    eraName: 'Era 4: El Ciberespacio',
    subtitle: 'Kai & Lia en la Red Invisible de Datos',
    category: 'red_digital',
    imageKey: 'bitBlockchain',
    x: 320,
    y: -190,
    width: 240,
    height: 190,
    color: '#d946ef',
    accentColor: '#f0abfc',
    badge: 'ERA 4 • BLOCKCHAIN',
    icon: '⚡',
    modalTarget: 'red_digital',
    isPassiveAsset: true
  },
  {
    id: 'bldg_carpinteria',
    name: 'Taller de Carpintería de Mateo',
    eraName: 'Activos Físicos',
    subtitle: 'Engranajes, Madera & Fabricación Tangible',
    category: 'carpinteria',
    imageKey: 'carpinteria',
    x: -110,
    y: 300,
    width: 230,
    height: 185,
    color: '#f97316',
    accentColor: '#fdba74',
    badge: 'TALLER 3D',
    icon: '🪵',
    modalTarget: 'carpinteria',
    isPassiveAsset: true
  },
  {
    id: 'bldg_bancos',
    name: 'Bóveda Bancaria & Distrito de Liquidez',
    eraName: 'Custodia & Crédito',
    subtitle: 'BDV • Banco Plaza • Banco del Tesoro',
    category: 'banco',
    imageKey: 'bancoCentral',
    x: -20,
    y: -290,
    width: 230,
    height: 185,
    color: '#ef4444',
    accentColor: '#fca5a5',
    badge: 'BANCOS',
    icon: '🏛️',
    modalTarget: 'bancos',
    isPassiveAsset: true
  },
  {
    id: 'bldg_bolsa',
    name: 'Bolsa de Valores & Flotas BVC',
    eraName: 'Mercado de Capitales',
    subtitle: 'Acciones con Dividendos Pasivos BVC',
    category: 'bolsa',
    imageKey: 'bolsaCaracas',
    x: 140,
    y: 300,
    width: 230,
    height: 185,
    color: '#10b981',
    accentColor: '#6ee7b7',
    badge: 'BOLSA BVC',
    icon: '📈',
    modalTarget: 'bolsa',
    isPassiveAsset: true
  },
  {
    id: 'bldg_vivero',
    name: 'Vivero de Ideas & Hoja de Balance 3D',
    eraName: 'Academia Contable',
    subtitle: 'Activos = Pasivos + Patrimonio',
    category: 'vivero',
    imageKey: 'mentors',
    x: -430,
    y: 0,
    width: 230,
    height: 185,
    color: '#8b5cf6',
    accentColor: '#c4b5fd',
    badge: 'ACADEMIA',
    icon: '⚖️',
    modalTarget: 'vivero',
    isPassiveAsset: true
  },
  {
    id: 'bldg_defensa',
    name: 'Bastión de Defensa Anti-Fraude',
    eraName: 'Seguridad Financiera',
    subtitle: 'Caza-Fricción & Monstruos de Gasto Fijo',
    category: 'defensa',
    imageKey: 'inflation',
    x: 440,
    y: 0,
    width: 230,
    height: 185,
    color: '#f43f5e',
    accentColor: '#fda4af',
    badge: 'DEFENSA 3D',
    icon: '🛡️',
    modalTarget: 'defensa',
    isPassiveAsset: false,
    isLiabilityThreat: true
  }
];

export const CaminoLegado3D: React.FC = () => {
  const { 
    openModal, 
    flowVisionActive, 
    stage, 
    currentEra,
    goatsCount, 
    wheatSacks, 
    saltSacksCount, 
    electrumCoinsCount, 
    digitalBitsCount,
    archetypeId 
  } = useGameStore();

  const currentArchetype = ARCHETYPES.find(a => a.id === archetypeId) || ARCHETYPES[0];

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [viewMode, setViewMode] = useState<'map' | 'gallery'>('map');
  const [hoveredBuilding, setHoveredBuilding] = useState<ComicBuilding | null>(null);
  const [cameraOffset, setCameraOffset] = useState({ x: 0, y: 0 });
  const [zoomLevel, setZoomLevel] = useState(1.0);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({ x: 0, y: 0, camX: 0, camY: 0 });

  // Preloaded 3D Image Assets Cache for High-Performance Canvas Rendering
  const loadedImagesRef = useRef<{ [key: string]: HTMLImageElement }>({});

  useEffect(() => {
    const assetsToLoad: { [key: string]: string } = {
      trueque: GAME_IMAGES.eras.trueque,
      salCauri: GAME_IMAGES.eras.salCauri,
      forjaLidia: GAME_IMAGES.eras.forjaLidia,
      bitBlockchain: GAME_IMAGES.eras.bitBlockchain,
      bancoCentral: GAME_IMAGES.buildings.bancoCentral,
      bolsaCaracas: GAME_IMAGES.buildings.bolsaCaracas,
      carpinteria: GAME_IMAGES.buildings.carpinteria,
      mentors: GAME_IMAGES.mentors,
      inflation: GAME_IMAGES.villains.inflation,
      phantomDebt: GAME_IMAGES.villains.phantomDebt,
      bookCover: GAME_IMAGES.bookCover,
      logo: GAME_IMAGES.logo
    };

    Object.entries(assetsToLoad).forEach(([key, src]) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        loadedImagesRef.current[key] = img;
      };
    });
  }, []);

  // Camera Quick Jump
  const jumpToEra = (category: string) => {
    soundFx.playClick();
    const target = COMIC_BUILDINGS.find(b => b.category === category || b.id.includes(category));
    if (target) {
      setCameraOffset({ x: -target.x, y: -target.y });
      setZoomLevel(1.1);
    } else {
      setCameraOffset({ x: 0, y: 0 });
      setZoomLevel(1.0);
    }
  };

  // Main 3D Comic Metrópolis Canvas Render Engine
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || viewMode !== 'map') return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let tickCount = 0;

    const render = () => {
      tickCount++;
      const width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
      const height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

      ctx.clearRect(0, 0, width, height);

      // SAVE TRANSFORMS
      ctx.save();
      ctx.translate(width / 2 + cameraOffset.x, height / 2 + cameraOffset.y);
      ctx.scale(zoomLevel, zoomLevel);

      // 1. DRAW CYBER-TEMPORAL TIMELINE ROAD & MATRIX
      drawTemporalMatrix(ctx, tickCount, flowVisionActive);

      // 2. DRAW CONNECTING TIMELINE HIGHWAYS (Trueque -> Sal -> Forja -> Bit)
      drawTimelineHighways(ctx, tickCount);

      // 3. DRAW 3D ILLUSTRATED BUILDING CARDS
      COMIC_BUILDINGS.forEach((bldg, index) => {
        const isHovered = hoveredBuilding?.id === bldg.id;
        drawComicBuilding(ctx, bldg, tickCount, isHovered, flowVisionActive, index);
      });

      // 4. DRAW TRAVELING 3D MENTORS (KAI & LIA)
      drawTravelingCharacters(ctx, tickCount);

      ctx.restore();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [cameraOffset, zoomLevel, hoveredBuilding, flowVisionActive, viewMode]);

  // DRAW CYBER-TEMPORAL ISOMETRIC MATRIX GRID
  const drawTemporalMatrix = (ctx: CanvasRenderingContext2D, tick: number, flowVision: boolean) => {
    const gridSize = 1400;
    const step = 70;

    ctx.save();
    ctx.strokeStyle = flowVision ? 'rgba(0, 243, 255, 0.18)' : 'rgba(30, 41, 59, 0.45)';
    ctx.lineWidth = 1;

    for (let x = -gridSize; x <= gridSize; x += step) {
      ctx.beginPath();
      ctx.moveTo(x, -gridSize);
      ctx.lineTo(x, gridSize);
      ctx.stroke();
    }

    for (let y = -gridSize; y <= gridSize; y += step) {
      ctx.beginPath();
      ctx.moveTo(-gridSize, y);
      ctx.lineTo(gridSize, y);
      ctx.stroke();
    }

    // Central Time-Nexus Node
    const pulse = Math.sin(tick * 0.05) * 8;
    ctx.beginPath();
    ctx.arc(0, 0, 80 + pulse, 0, Math.PI * 2);
    ctx.strokeStyle = flowVision ? 'rgba(0, 243, 255, 0.6)' : 'rgba(234, 179, 8, 0.5)';
    ctx.lineWidth = 3;
    ctx.stroke();

    ctx.fillStyle = flowVision ? 'rgba(0, 243, 255, 0.08)' : 'rgba(234, 179, 8, 0.08)';
    ctx.fill();

    // Nexus Text
    ctx.fillStyle = '#f8fafc';
    ctx.font = 'bold 12px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('NEXO TEMPORAL', 0, -6);
    ctx.fillStyle = '#38bdf8';
    ctx.font = '10px monospace';
    ctx.fillText('DE LA SAL AL BIT', 0, 12);
    ctx.textAlign = 'start'; // Reset

    ctx.restore();
  };

  // DRAW GLOWING TIMELINE HIGHWAYS CONNECTING ERAS
  const drawTimelineHighways = (ctx: CanvasRenderingContext2D, tick: number) => {
    const eraCoords = [
      { x: -340, y: 160 }, // Era 1: Trueque
      { x: 320, y: 180 },  // Era 2: Sal & Cauri
      { x: -300, y: -190 },// Era 3: Forja Lidia
      { x: 320, y: -190 }  // Era 4: Bit Digital
    ];

    ctx.save();
    // Flowing neon energy path
    ctx.beginPath();
    ctx.moveTo(eraCoords[0].x, eraCoords[0].y);
    ctx.bezierCurveTo(0, 240, 100, 220, eraCoords[1].x, eraCoords[1].y);
    ctx.bezierCurveTo(150, 0, -150, 0, eraCoords[2].x, eraCoords[2].y);
    ctx.bezierCurveTo(0, -260, 150, -240, eraCoords[3].x, eraCoords[3].y);

    ctx.strokeStyle = 'rgba(234,179,8,0.35)';
    ctx.lineWidth = 12;
    ctx.stroke();

    // Animated pulses
    ctx.strokeStyle = 'rgba(6,182,212,0.9)';
    ctx.lineWidth = 4;
    ctx.setLineDash([16, 22]);
    ctx.lineDashOffset = -tick * 1.8;
    ctx.stroke();
    ctx.setLineDash([]);
    ctx.restore();
  };

  // DRAW REAL 3D ILLUSTRATED BUILDING CARDS ON CANVAS
  const drawComicBuilding = (
    ctx: CanvasRenderingContext2D,
    bldg: ComicBuilding,
    tick: number,
    isHovered: boolean,
    flowVision: boolean,
    index: number
  ) => {
    const { x, y, width, height, color, accentColor, category, name, subtitle, badge, icon, imageKey, isPassiveAsset } = bldg;

    // Gentle floating bob
    const floatY = Math.sin(tick * 0.04 + index) * 4;

    ctx.save();
    ctx.translate(x, y + floatY);

    if (isHovered) {
      ctx.scale(1.08, 1.08);
    }

    const activeColor = flowVision ? (isPassiveAsset ? '#00f3ff' : '#ff007f') : color;
    const activeAccent = flowVision ? (isPassiveAsset ? '#22d3ee' : '#f43f5e') : accentColor;

    // 1. ISOMETRIC CYBER PEDESTAL / SHADOW
    ctx.fillStyle = 'rgba(0,0,0,0.65)';
    ctx.beginPath();
    ctx.ellipse(0, height / 2 + 10, width * 0.48, 24, 0, 0, Math.PI * 2);
    ctx.fill();

    // Pedestal neon ring
    ctx.strokeStyle = `${activeColor}60`;
    ctx.lineWidth = 2;
    ctx.stroke();

    // 2. 3D CARD CONTAINER & IMAGE RENDERING
    const cornerRadius = 18;
    const cardX = -width / 2;
    const cardY = -height / 2;

    // Background Card Box
    ctx.fillStyle = '#090d16';
    ctx.beginPath();
    ctx.roundRect(cardX, cardY, width, height, cornerRadius);
    ctx.fill();

    // DRAW PRELOADED 3D IMAGE
    const img = loadedImagesRef.current[imageKey];
    if (img && img.complete && img.naturalWidth !== 0) {
      ctx.save();
      ctx.beginPath();
      ctx.roundRect(cardX + 3, cardY + 3, width - 6, height - 6, cornerRadius - 2);
      ctx.clip();
      
      // Draw 3D Art Cover
      ctx.drawImage(img, cardX, cardY, width, height);

      // Gradient overlay for contrast and text clarity
      const grad = ctx.createLinearGradient(cardX, cardY, cardX, cardY + height);
      grad.addColorStop(0, 'rgba(4, 7, 18, 0.75)');
      grad.addColorStop(0.35, 'rgba(4, 7, 18, 0.15)');
      grad.addColorStop(0.65, 'rgba(4, 7, 18, 0.4)');
      grad.addColorStop(1, 'rgba(4, 7, 18, 0.95)');

      ctx.fillStyle = grad;
      ctx.fillRect(cardX, cardY, width, height);
      ctx.restore();
    } else {
      // Fallback Cyber Texture
      ctx.fillStyle = '#1e293b';
      ctx.fillRect(cardX + 4, cardY + 4, width - 8, height - 8);
    }

    // 3. GLOWING NEON BORDER
    ctx.strokeStyle = activeColor;
    ctx.lineWidth = isHovered ? 4 : 2.5;
    ctx.beginPath();
    ctx.roundRect(cardX, cardY, width, height, cornerRadius);
    ctx.stroke();

    if (isHovered) {
      ctx.strokeStyle = activeAccent;
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }

    // 4. TOP BADGE PILL (ERA / DISTRICT)
    ctx.fillStyle = 'rgba(15, 23, 42, 0.92)';
    ctx.beginPath();
    ctx.roundRect(cardX + 8, cardY + 8, 120, 24, 8);
    ctx.fill();
    ctx.strokeStyle = activeColor;
    ctx.lineWidth = 1.5;
    ctx.stroke();

    ctx.fillStyle = activeColor;
    ctx.font = 'bold 10px sans-serif';
    ctx.fillText(`${icon} ${badge}`, cardX + 14, cardY + 24);

    // TOP RIGHT STATUS TAG
    let resourceTag = 'EXPLORAR';
    if (category === 'trueque') resourceTag = `🌾 ${wheatSacks} | 🐐 ${goatsCount}`;
    if (category === 'sal_cauri') resourceTag = `🧂 ${saltSacksCount}`;
    if (category === 'forja_lidia') resourceTag = `🦁 ${electrumCoinsCount} Electro`;
    if (category === 'red_digital') resourceTag = `⚡ ${digitalBitsCount} Bits`;
    if (category === 'banco') resourceTag = '🏛️ Cuentas';
    if (category === 'bolsa') resourceTag = '📈 Dividendos';
    if (category === 'carpinteria') resourceTag = '🪵 Taller';

    ctx.fillStyle = 'rgba(2, 6, 23, 0.9)';
    ctx.beginPath();
    ctx.roundRect(cardX + width - 95, cardY + 8, 87, 24, 8);
    ctx.fill();
    ctx.strokeStyle = 'rgba(255,255,255,0.2)';
    ctx.lineWidth = 1;
    ctx.stroke();

    ctx.fillStyle = '#f8fafc';
    ctx.font = 'bold 9.5px monospace';
    ctx.fillText(resourceTag, cardX + width - 90, cardY + 24);

    // 5. BOTTOM TITLE & SUBTITLE OVERLAY
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 13px sans-serif';
    const cleanName = name.length > 26 ? name.substring(0, 24) + '...' : name;
    ctx.fillText(cleanName, cardX + 12, cardY + height - 28);

    ctx.fillStyle = '#cbd5e1';
    ctx.font = '10px sans-serif';
    const cleanSub = subtitle.length > 32 ? subtitle.substring(0, 30) + '...' : subtitle;
    ctx.fillText(cleanSub, cardX + 12, cardY + height - 12);

    // 6. HOVER CALL TO ACTION BANNER
    if (isHovered) {
      ctx.fillStyle = activeColor;
      ctx.beginPath();
      ctx.roundRect(cardX + 20, cardY + height / 2 - 14, width - 40, 28, 14);
      ctx.fill();

      ctx.fillStyle = '#020617';
      ctx.font = 'bold 11px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('¡Haz Clic para Entrar! ➔', 0, cardY + height / 2 + 4);
      ctx.textAlign = 'start'; // Reset
    }

    ctx.restore();
  };

  // DRAW TRAVELING 3D MENTORS (KAI & LIA)
  const drawTravelingCharacters = (ctx: CanvasRenderingContext2D, tick: number) => {
    const wanderX = Math.sin(tick * 0.025) * 80;
    const wanderY = Math.cos(tick * 0.025) * 50;

    ctx.save();
    ctx.translate(wanderX, wanderY);

    // Shadow
    ctx.fillStyle = 'rgba(0,0,0,0.5)';
    ctx.beginPath();
    ctx.ellipse(0, 26, 28, 12, 0, 0, Math.PI * 2);
    ctx.fill();

    // 3D Avatar Image
    const mentorImg = loadedImagesRef.current['mentors'];
    if (mentorImg && mentorImg.complete && mentorImg.naturalWidth !== 0) {
      ctx.save();
      ctx.beginPath();
      ctx.arc(0, 0, 24, 0, Math.PI * 2);
      ctx.clip();
      ctx.drawImage(mentorImg, -24, -24, 48, 48);
      ctx.restore();
    } else {
      ctx.font = '32px sans-serif';
      ctx.fillText('🧑‍🚀', -16, 8);
    }

    // Glowing Hologram Ring
    ctx.strokeStyle = '#00f3ff';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(0, 0, 26, 0, Math.PI * 2);
    ctx.stroke();

    // Floating Comic Dialogue Bubble
    ctx.fillStyle = 'rgba(15, 23, 42, 0.95)';
    ctx.strokeStyle = '#00f3ff';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.roundRect(-80, -48, 160, 24, 8);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#00f3ff';
    ctx.font = 'bold 9.5px sans-serif';
    ctx.fillText('Kai & Lia: De la Sal al Bit ✨', -72, -32);

    ctx.restore();
  };

  // CANVAS MOUSE & TOUCH EVENT HANDLERS
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDragging(true);
    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      camX: cameraOffset.x,
      camY: cameraOffset.y
    };
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    if (isDragging) {
      const dx = e.clientX - dragStartRef.current.x;
      const dy = e.clientY - dragStartRef.current.y;
      setCameraOffset({
        x: dragStartRef.current.camX + dx,
        y: dragStartRef.current.camY + dy
      });
      return;
    }

    // Check Hover on 3D Buildings
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const worldX = (mouseX - canvas.width / 2 - cameraOffset.x) / zoomLevel;
    const worldY = (mouseY - canvas.height / 2 - cameraOffset.y) / zoomLevel;

    const hovered = COMIC_BUILDINGS.find((bldg) => {
      const minX = bldg.x - bldg.width / 2;
      const maxX = bldg.x + bldg.width / 2;
      const minY = bldg.y - bldg.height / 2;
      const maxY = bldg.y + bldg.height / 2;
      return worldX >= minX && worldX <= maxX && worldY >= minY && worldY <= maxY;
    });

    setHoveredBuilding(hovered || null);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleClick = () => {
    if (hoveredBuilding) {
      soundFx.playClick();
      openModal(hoveredBuilding.modalTarget);
    }
  };

  const handleWheel = (e: React.WheelEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const zoomDelta = e.deltaY < 0 ? 0.1 : -0.1;
    setZoomLevel(prev => Math.min(1.6, Math.max(0.6, prev + zoomDelta)));
  };

  const getBuilding3DImage = (key: string) => {
    switch (key) {
      case 'trueque': return GAME_IMAGES.eras.trueque;
      case 'salCauri': return GAME_IMAGES.eras.salCauri;
      case 'forjaLidia': return GAME_IMAGES.eras.forjaLidia;
      case 'bitBlockchain': return GAME_IMAGES.eras.bitBlockchain;
      case 'bancoCentral': return GAME_IMAGES.buildings.bancoCentral;
      case 'bolsaCaracas': return GAME_IMAGES.buildings.bolsaCaracas;
      case 'carpinteria': return GAME_IMAGES.buildings.carpinteria;
      case 'mentors': return GAME_IMAGES.mentors;
      case 'inflation': return GAME_IMAGES.villains.inflation;
      default: return GAME_IMAGES.eras.trueque;
    }
  };

  return (
    <div className="relative w-full h-full min-h-[580px] bg-slate-950 overflow-hidden select-none">
      {/* VIEW MODE TOGGLE (MAP 3D vs 3D DIORAMA GALLERY) */}
      <div className="absolute top-4 right-4 z-30 flex items-center gap-1.5 p-1 rounded-xl bg-slate-900/90 backdrop-blur-md border border-cyan-500/40 shadow-xl">
        <button
          onClick={() => setViewMode('map')}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
            viewMode === 'map'
              ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/40'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Compass className="w-3.5 h-3.5" />
          Mapa Interactivo 3D
        </button>
        <button
          onClick={() => setViewMode('gallery')}
          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
            viewMode === 'gallery'
              ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/40'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <LayoutGrid className="w-3.5 h-3.5" />
          Galería Dioramas 3D
        </button>
      </div>

      {viewMode === 'map' ? (
        <>
          {/* 3D CANVAS METROPOLIS */}
          <canvas
            ref={canvasRef}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onClick={handleClick}
            onWheel={handleWheel}
            className="w-full h-full cursor-grab active:cursor-grabbing block"
          />

          {/* FLOW VISION EFFECT VIGNETTE */}
          {flowVisionActive && (
            <div className="absolute inset-0 pointer-events-none border-4 border-cyan-400/80 shadow-[inset_0_0_80px_rgba(0,243,255,0.4)] animate-pulse">
              <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-cyan-950/90 border border-cyan-400 text-cyan-300 px-4 py-1.5 rounded-full text-xs font-mono font-bold tracking-wider flex items-center gap-2">
                <Eye className="w-4 h-4 text-cyan-400 animate-spin" />
                MODO VISIÓN DE FLUJO ACTIVO: ACTIVOS (#00f3ff) & PASIVOS (#ff007f)
              </div>
            </div>
          )}

          {/* TOP NAVIGATION QUICK JUMPS (4 ERAS) */}
          <div className="absolute top-4 left-4 z-20 flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-slate-900/90 backdrop-blur-md border border-slate-800 shadow-xl max-w-[80vw]">
            <span className="text-xs font-bold text-slate-400 px-2 flex items-center gap-1">
              <Compass className="w-3.5 h-3.5 text-amber-400" /> Recorridos:
            </span>

            <button
              onClick={() => jumpToEra('overview')}
              className="px-2.5 py-1 text-xs font-bold rounded-lg bg-slate-800 text-slate-300 hover:text-white transition-all"
            >
              Vista Global
            </button>

            <button
              onClick={() => jumpToEra('trueque')}
              className="px-2.5 py-1 text-xs font-bold rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500 hover:text-slate-950 transition-all flex items-center gap-1"
            >
              🐐 Era 1: Trueque
            </button>

            <button
              onClick={() => jumpToEra('sal_cauri')}
              className="px-2.5 py-1 text-xs font-bold rounded-lg bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 hover:bg-cyan-500 hover:text-slate-950 transition-all flex items-center gap-1"
            >
              🧂 Era 2: Sal & Cauri
            </button>

            <button
              onClick={() => jumpToEra('forja_lidia')}
              className="px-2.5 py-1 text-xs font-bold rounded-lg bg-yellow-500/20 text-yellow-300 border border-yellow-500/40 hover:bg-yellow-500 hover:text-slate-950 transition-all flex items-center gap-1"
            >
              🦁 Era 3: Forja Lidia
            </button>

            <button
              onClick={() => jumpToEra('red_digital')}
              className="px-2.5 py-1 text-xs font-bold rounded-lg bg-fuchsia-500/20 text-fuchsia-300 border border-fuchsia-500/40 hover:bg-fuchsia-500 hover:text-white transition-all flex items-center gap-1"
            >
              ⚡ Era 4: Bit Digital
            </button>

            <button
              onClick={() => jumpToEra('banco')}
              className="hidden sm:flex px-2.5 py-1 text-xs font-bold rounded-lg bg-red-500/20 text-red-300 border border-red-500/40 hover:bg-red-500 hover:text-white transition-all items-center gap-1"
            >
              🏛️ Bancos
            </button>

            <button
              onClick={() => jumpToEra('bolsa')}
              className="hidden sm:flex px-2.5 py-1 text-xs font-bold rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500 hover:text-slate-950 transition-all items-center gap-1"
            >
              📈 Bolsa BVC
            </button>
          </div>
        </>
      ) : (
        /* 3D DIORAMA GALLERY VIEW */
        <div className="w-full h-full overflow-y-auto p-6 md:p-8 pt-20 pb-28 bg-slate-950">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
              <div>
                <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-500/30">
                  ARTE VISUAL 3D ESTILIZADO • CIFRAFLOW
                </span>
                <h2 className="text-2xl md:text-3xl font-black text-white mt-2">
                  Dioramas de las 4 Eras Históricas & Distrito Financiero
                </h2>
                <p className="text-sm text-slate-300">
                  Explora las escenas 3D oficiales de «El Viaje del Valor: De la Sal al Bit» de ircar rojas.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {COMIC_BUILDINGS.map((bldg) => {
                const bldgImg = getBuilding3DImage(bldg.imageKey);
                return (
                  <div
                    key={bldg.id}
                    className="group relative rounded-3xl overflow-hidden bg-slate-900 border-2 transition-all hover:-translate-y-1 hover:shadow-2xl flex flex-col"
                    style={{ borderColor: bldg.color, boxShadow: `0 0 30px ${bldg.color}25` }}
                  >
                    {/* 3D Image Artwork Preview */}
                    <div 
                      onClick={() => {
                        soundFx.playClick();
                        openModal(bldg.modalTarget);
                      }}
                      className="relative w-full h-52 bg-slate-950 overflow-hidden cursor-pointer group/art"
                    >
                      <img
                        src={bldgImg}
                        alt={bldg.name}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover/art:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-black/60" />
                      <div className="absolute inset-0 bg-cyan-500/10 opacity-0 group-hover/art:opacity-100 transition-opacity flex items-center justify-center">
                        <div className="px-3.5 py-1.5 rounded-full bg-slate-950/90 text-cyan-300 border border-cyan-400 text-xs font-bold shadow-lg flex items-center gap-1.5">
                          <span>▶</span> Explorar con Audio
                        </div>
                      </div>

                      {/* Top Badges */}
                      <div className="absolute top-3 left-3 flex items-center gap-1 px-3 py-1 rounded-full bg-slate-950/80 border border-white/20 text-xs font-bold text-white backdrop-blur-md">
                        <span>{bldg.icon}</span>
                        <span>{bldg.badge}</span>
                      </div>

                      <div className="absolute top-3 right-3 px-2.5 py-1 rounded-lg bg-slate-950/80 border border-cyan-500/40 text-[11px] font-mono text-cyan-300">
                        {bldg.eraName}
                      </div>
                    </div>

                    {/* Content & Action */}
                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                          {bldg.name}
                        </h3>
                        <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                          {bldg.subtitle}
                        </p>
                      </div>

                      <div className="mt-5 pt-3 border-t border-slate-800 flex items-center justify-between">
                        <span className="text-xs font-bold text-amber-400">
                          {bldg.isPassiveAsset ? '✨ Activo Productivo' : '🛡️ Módulo de Seguridad'}
                        </span>
                        <button
                          onClick={() => {
                            soundFx.playClick();
                            openModal(bldg.modalTarget);
                          }}
                          className="px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 text-slate-950 font-black hover:scale-105 shadow-md"
                          style={{ backgroundColor: bldg.color }}
                        >
                          Entrar ➔
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* FLOATING ACTION LAUNCHERS (BOTTOM RIGHT) */}
      <div className="absolute bottom-20 right-6 z-20 flex flex-col items-end gap-2.5">
        <button
          id="btn-open-acertijos"
          onClick={() => openModal('acertijos')}
          className="px-4 py-2.5 rounded-xl bg-yellow-500 text-slate-950 font-black shadow-lg hover:bg-yellow-400 transition-all flex items-center gap-2 hover:scale-105"
        >
          <Sparkles className="w-4 h-4" />
          Acertijos de Kai & Lia
        </button>

        <button
          id="btn-open-biblioteca"
          onClick={() => openModal('biblioteca')}
          className="px-4 py-2.5 rounded-xl bg-slate-900/90 text-cyan-300 border border-cyan-500/50 backdrop-blur-md font-bold shadow-lg hover:bg-slate-800 transition-all flex items-center gap-2 hover:scale-105"
        >
          <BookOpen className="w-4 h-4 text-cyan-400" />
          Libro "De la Sal al Bit" (PDF)
        </button>
      </div>

      {/* FLOATING 3D ARCHETYPE HUD (BOTTOM LEFT) */}
      <div className="absolute bottom-20 left-6 z-20">
        <button
          id="btn-open-arquetipos-hud"
          onClick={() => openModal('arquetipos')}
          className="group flex items-center gap-3 p-2 pr-4 rounded-2xl bg-slate-900/90 hover:bg-slate-800/95 border border-cyan-500/40 backdrop-blur-md shadow-[0_0_25px_rgba(0,242,254,0.2)] transition-all hover:scale-105"
          title="Cambiar Arquetipo de Jugador"
        >
          <div className="w-11 h-11 rounded-xl overflow-hidden border-2 border-cyan-400 shadow-md shrink-0 bg-slate-950">
            <img
              src={currentArchetype.image}
              alt={currentArchetype.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            />
          </div>
          <div className="text-left">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-black text-white">{currentArchetype.name}</span>
              <span className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-500/30 truncate max-w-[130px]">
                {currentArchetype.role}
              </span>
            </div>
            <span className="text-[10px] text-slate-400 group-hover:text-cyan-300 flex items-center gap-1 transition-colors">
              <UserCheck className="w-3 h-3 text-cyan-400" /> Cambiar Avatar 3D
            </span>
          </div>
        </button>
      </div>
    </div>
  );
};
