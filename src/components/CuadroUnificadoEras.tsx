import React, { useState, useEffect, useRef } from 'react';
import { useGameStore } from '../store/EstadoJuego';
import { MoneyEra, EraWisdom, QuizQuestion, EraInvestmentAsset } from '../types';
import { narratorEngine, NARRATION_STORIES } from '../utils/narrator';
import { soundFx } from '../utils/audio';
import { GAME_IMAGES } from '../data/gameAssets';
import { CIFRAFLOW_LOGO } from '../data/archetypes';
import { 
  Sparkles, 
  HelpCircle, 
  CheckCircle2, 
  XCircle, 
  Volume2, 
  VolumeX, 
  Pause, 
  Play, 
  TrendingUp, 
  Award, 
  ArrowRight, 
  ArrowLeft, 
  Lock, 
  Coins, 
  ShieldCheck, 
  Zap, 
  X,
  Repeat,
  Info,
  Layers,
  ChevronRight
} from 'lucide-react';

interface CuadroUnificadoErasProps {
  isOpen: boolean;
  onClose: () => void;
  initialEra?: MoneyEra;
}

export const CuadroUnificadoEras: React.FC<CuadroUnificadoErasProps> = ({
  isOpen,
  onClose,
  initialEra = 'era_trueque'
}) => {
  const {
    eras,
    quizQuestions,
    eraInvestments,
    currentEra,
    setCorrelativeEra,
    completedEras,
    completeEraAndAdvance,
    investmentLedger,
    levelPoints,
    cumulativePoints,
    cash,
    monthlyPassiveIncome,
    answerQuizQuestion,
    investPointsInEraAsset,
    unlockEraWisdom,
    studentName,
    studentCedula
  } = useGameStore();

  const [selectedEraId, setSelectedEraId] = useState<MoneyEra>(initialEra);
  const [narratorState, setNarratorState] = useState(narratorEngine.getState());
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);
  const [showRiddleExplanation, setShowRiddleExplanation] = useState(false);
  const [activeTab, setActiveTab] = useState<'historia_asertijo' | 'inversiones'>('historia_asertijo');
  const [isAdvancingEra, setIsAdvancingEra] = useState(false);
  const [nextEraInfo, setNextEraInfo] = useState<{ id: MoneyEra; title: string } | null>(null);
  const advanceCallbackRef = useRef<(() => void) | null>(null);

  // Clear pending advance on unmount
  useEffect(() => {
    return () => {
      advanceCallbackRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (initialEra) {
      setSelectedEraId(initialEra);
    }
  }, [initialEra, isOpen]);

  useEffect(() => {
    const unsubscribe = narratorEngine.subscribe(() => {
      setNarratorState(narratorEngine.getState());
    });
    return () => unsubscribe();
  }, []);

  if (!isOpen) return null;

  // Active Era Data
  const currentEraData: EraWisdom = eras.find(e => e.era === selectedEraId) || eras[0];

  // Specific Quiz / Riddle for this era
  const currentQuiz: QuizQuestion = quizQuestions.find(q => q.era === selectedEraId) || quizQuestions[0];

  // Specific Investments for this era
  const currentEraInvestments: EraInvestmentAsset[] = eraInvestments.filter(a => a.era === selectedEraId);

  // Available Points for transactions
  const availablePoints = Math.max(investmentLedger.totalInvestmentPoints, levelPoints);

  // Status of the era
  const isEraCompleted = completedEras.includes(selectedEraId) || (currentQuiz && currentQuiz.answered && currentQuiz.wasCorrect);

  // Handle switching eras
  const handleSelectEra = (eraId: MoneyEra) => {
    soundFx.playClick();
    setSelectedEraId(eraId);
    setCorrelativeEra(eraId);
    setSelectedOptionIndex(null);
    setShowRiddleExplanation(false);

    // Stop current narration and start this era's specific narration
    const trackKey = eraId === 'era_trueque' ? 'icon_era_trueque'
      : eraId === 'era_sal_cauri' ? 'icon_era_sal_cauri'
      : eraId === 'era_forja_lidia' ? 'icon_era_forja_lidia'
      : 'icon_era_red_digital';

    narratorEngine.playIconNarration(trackKey, {
      title: currentEraData.title,
      eraName: currentEraData.title,
      icon: currentEraData.icon,
      text: `${currentEraData.title}. ${currentEraData.subtitle}. ${currentEraData.quoteFromBook}`
    });
  };

  // Handle clicking on character icons (Kai / Lia)
  const handleCharacterClick = (character: 'kai' | 'lia') => {
    soundFx.playClick();
    if (character === 'kai') {
      narratorEngine.playIconNarration('icon_personaje_kai');
    } else {
      narratorEngine.playIconNarration('icon_personaje_lia');
    }
  };

  // Handle clicking on Acertijo Icon
  const handleAcertijoIconClick = () => {
    soundFx.playClick();
    const trackKey = selectedEraId === 'era_trueque' ? 'icon_acertijo_trueque'
      : selectedEraId === 'era_sal_cauri' ? 'icon_acertijo_sal'
      : selectedEraId === 'era_forja_lidia' ? 'icon_acertijo_lidia'
      : 'icon_acertijo_digital';

    narratorEngine.playIconNarration(trackKey, {
      title: `Acertijo: ${currentEraData.title}`,
      eraName: 'Misión Pedagógica',
      icon: '🧩',
      text: `${currentEraData.riddleChallenge}. Pregunta: ${currentQuiz.question}`
    });
  };

  // Handle answering the era riddle with 3 options
  const handleAnswerOption = (optionIndex: number) => {
    soundFx.playClick();
    setSelectedOptionIndex(optionIndex);
    setShowRiddleExplanation(true);

    const chosenOption = currentQuiz.options?.[optionIndex] || (optionIndex === 0 ? currentQuiz.affirmativeOption : currentQuiz.negativeOption);
    if (!chosenOption) return;

    answerQuizQuestion(currentQuiz.id, optionIndex);

    // Stop previous audio and narrate outcome immediately
    if (chosenOption.isCorrect) {
      soundFx.playPowerUp();
      unlockEraWisdom(currentEraData.id);

      const eraOrder: MoneyEra[] = ['era_trueque', 'era_sal_cauri', 'era_forja_lidia', 'era_bit_digital'];
      const currentIdx = eraOrder.indexOf(selectedEraId);
      const hasNextEra = currentIdx >= 0 && currentIdx < eraOrder.length - 1;
      const nextEra = hasNextEra ? eraOrder[currentIdx + 1] : null;
      const nextEraData = nextEra ? eras.find(e => e.era === nextEra) : null;
      const nextQuiz = nextEra ? quizQuestions.find(q => q.era === nextEra) : null;

      if (nextEra && nextEraData) {
        setNextEraInfo({ id: nextEra, title: nextEraData.title });
        setIsAdvancingEra(true);
      } else {
        setNextEraInfo(null);
        setIsAdvancingEra(false);
      }

      // Step 2 & 3: Definition of era advance + narration of new era story & riddle
      const executeAdvance = () => {
        setIsAdvancingEra(false);
        setNextEraInfo(null);
        advanceCallbackRef.current = null;

        completeEraAndAdvance(selectedEraId);

        if (nextEra && nextEraData && nextQuiz) {
          // Cambiar de era en el estado del componente y del juego
          setSelectedEraId(nextEra);
          setCorrelativeEra(nextEra);
          setSelectedOptionIndex(null);
          setShowRiddleExplanation(false);
          soundFx.playVictory();

          // Leer la historia y acertijo de la nueva era
          const nextStoryAndRiddleText = `¡Has pasado a la siguiente era! Bienvenido a la ${nextEraData.title}. ${nextEraData.subtitle}. Historia de la era: ${nextEraData.quoteFromBook}. Concepto pedagógico clave: ${nextEraData.coreConcept}. Misión y acertijo de esta era: ${nextEraData.riddleChallenge}. Pregunta central: ${nextQuiz.question}.`;

          narratorEngine.playIconNarration(`intro_${nextEra}`, {
            title: `Historia y Acertijo: ${nextEraData.title}`,
            eraName: nextEraData.title,
            icon: nextEraData.icon,
            text: nextStoryAndRiddleText
          });
        } else {
          // Si es la última era
          soundFx.playVictory();
          narratorEngine.playIconNarration('fin_todas_eras', {
            title: '¡Misión Cumplida en Todas las Eras!',
            eraName: 'Viajero del Valor',
            icon: '🏆',
            text: `¡Felicidades, viajero del tiempo! Has superado con honores las cuatro grandes eras del dinero: desde el trueque ancestral hasta el ciberespacio y la red descentralizada. ¡Reclama tu Certificado de Competencias!`
          });
        }
      };

      advanceCallbackRef.current = executeAdvance;

      // Step 1: Read correct answer and declare "¡Has pasado a la siguiente era!"
      const correctAnnouncement = hasNextEra
        ? `¡Respuesta correcta! ${chosenOption.text}. ${chosenOption.explanation}. ¡Has pasado a la siguiente era!`
        : `¡Respuesta correcta! ${chosenOption.text}. ${chosenOption.explanation}. ¡Has completado todas las eras del dinero con honores!`;

      narratorEngine.playIconNarration('respuesta_correcta', {
        title: '¡Respuesta Acertada!',
        eraName: currentEraData.title,
        icon: '🎉',
        text: correctAnnouncement
      }, () => {
        // When speech finishes: "y alli cambie de era y lea la historia y asertijo de la era"
        executeAdvance();
      });
    } else {
      setIsAdvancingEra(false);
      setNextEraInfo(null);
      advanceCallbackRef.current = null;
      soundFx.playError();
      narratorEngine.playIconNarration('respuesta_incorrecta', {
        title: 'Respuesta Errada',
        eraName: currentEraData.title,
        icon: '⚠️',
        text: `Respuesta errada. Has perdido ${currentQuiz.pointsPenalty} puntos. ${chosenOption.explanation}`
      });
    }
  };

  // Handle investing points in an asset
  const handleInvestInAsset = (asset: EraInvestmentAsset) => {
    soundFx.playClick();
    investPointsInEraAsset(asset.id);
  };

  // Handle clicking investment asset icon for custom narration
  const handleAssetIconClick = (asset: EraInvestmentAsset) => {
    soundFx.playClick();
    narratorEngine.playIconNarration(`inv_${asset.id}`, {
      title: asset.title,
      eraName: 'Activo de Inversión',
      icon: asset.icon,
      text: `${asset.title}. Costo: ${asset.costPoints} puntos. Beneficio: Genera ${asset.passivePointsYield} puntos pasivos y liquidez de ${asset.cashBonus} dólares. ${asset.description}`
    });
  };

  // Get 3D image key for current era
  const getEraImage = () => {
    switch (selectedEraId) {
      case 'era_trueque': return GAME_IMAGES.eras.trueque;
      case 'era_sal_cauri': return GAME_IMAGES.eras.salCauri;
      case 'era_forja_lidia': return GAME_IMAGES.eras.forjaLidia;
      case 'era_bit_digital': return GAME_IMAGES.eras.bitBlockchain;
      default: return GAME_IMAGES.eras.trueque;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/85 backdrop-blur-md animate-fadeIn">
      {/* MASTER CONTAINER BOX ("TODO EN UN MISMO CUADRO") */}
      <div 
        id="cuadro-maestro-eras"
        className="relative w-full max-w-6xl max-h-[95vh] flex flex-col bg-slate-900/95 border-2 border-cyan-500/50 rounded-2xl shadow-[0_0_50px_rgba(0,242,254,0.25)] overflow-hidden text-slate-100"
      >
        {/* HEADER BAR WITH CLOSE AND OVERALL CONTROLS */}
        <div className="flex items-center justify-between px-3 sm:px-6 py-3 border-b border-slate-800 bg-slate-950/80 shrink-0 gap-2">
          <div className="flex items-center gap-2.5 sm:gap-3">
            {/* CIFRAFLOW LOGO AS RETURN TO PREVIOUS SCREEN */}
            <button
              id="btn-cuadro-cifraflow-back"
              onClick={() => {
                soundFx.playClick();
                narratorEngine.stop();
                onClose();
              }}
              className="group flex items-center gap-2 p-1 rounded-xl bg-slate-900 border border-slate-800 hover:border-cyan-400 text-slate-300 hover:text-white transition-all cursor-pointer hover:scale-105 shrink-0"
              title="Haz clic en el logotipo de CifraFlow para volver a la pantalla anterior"
            >
              <div className="w-8 h-8 rounded-lg overflow-hidden border border-cyan-400/60 group-hover:border-cyan-300 bg-slate-950 p-0.5 shadow-[0_0_10px_rgba(0,242,254,0.3)] shrink-0">
                <img 
                  src={CIFRAFLOW_LOGO} 
                  alt="CifraFlow Logo - Volver" 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover" 
                />
              </div>
              <div className="text-left hidden sm:block pr-1">
                <div className="flex items-center gap-1">
                  <span className="text-[11px] font-black text-white group-hover:text-cyan-300">
                    CIFRAFLOW
                  </span>
                  <span className="text-[8px] font-mono px-1 py-0.2 rounded bg-cyan-950 border border-cyan-500/40 text-cyan-300 font-semibold">
                    Volver
                  </span>
                </div>
              </div>
            </button>

            <div className="w-10 h-10 rounded-xl bg-cyan-950 border border-cyan-400 flex items-center justify-center text-xl shadow-[0_0_15px_rgba(0,242,254,0.4)] shrink-0">
              {currentEraData.icon}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                  Cuadro Maestro de las Eras
                </span>
                <span className="text-[10px] text-slate-400 font-mono hidden md:inline">
                  El Viaje del Valor: De la Sal al Bit • Por ircar rojas
                </span>
              </div>
              <h2 className="text-xs sm:text-sm md:text-base font-black text-white tracking-tight">
                {currentEraData.title}
              </h2>
            </div>
          </div>

          {/* AUDIO NARRATOR STATUS & CLOSE BUTTON */}
          <div className="flex items-center gap-2">
            {/* Play/Pause Narration Button */}
            <button
              id="btn-cuadro-toggle-narration"
              onClick={() => {
                soundFx.playClick();
                if (narratorState.isSpeaking) {
                  if (narratorState.isPaused) narratorEngine.resume();
                  else narratorEngine.pause();
                } else {
                  handleSelectEra(selectedEraId);
                }
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold flex items-center gap-2 border transition-all ${
                narratorState.isSpeaking
                  ? 'bg-cyan-500 text-slate-950 border-cyan-300 shadow-[0_0_15px_rgba(6,182,212,0.5)] animate-pulse'
                  : 'bg-slate-800 hover:bg-slate-700 text-cyan-300 border-slate-700'
              }`}
              title="Narrar en Voz Humana la Era Actual"
            >
              <Volume2 className="w-4 h-4" />
              <span className="hidden sm:inline">
                {narratorState.isSpeaking 
                  ? (narratorState.isPaused ? 'Narración en Pausa' : 'Narrando Era...') 
                  : 'Voz del Narrador'}
              </span>
            </button>

            {/* Close Button */}
            <button
              id="btn-cerrar-cuadro-eras"
              onClick={() => {
                soundFx.playClick();
                narratorEngine.stop();
                onClose();
              }}
              className="p-1.5 rounded-xl bg-slate-800 hover:bg-red-900/50 text-slate-400 hover:text-red-300 border border-slate-700 hover:border-red-500/50 transition-colors"
              title="Cerrar Cuadro de las Eras"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* CORRELATIVE 4 ERAS NAVIGATION BAR (EACH ICON HAS ITS OWN NARRATION) */}
        <div className="px-3 sm:px-6 py-2.5 bg-slate-950/90 border-b border-slate-800/80 flex items-center gap-2 overflow-x-auto scrollbar-none shrink-0">
          <span className="text-[11px] font-black text-slate-400 uppercase tracking-wider shrink-0 mr-1 hidden lg:inline">
            Línea Histórica:
          </span>

          {eras.map((era, index) => {
            const isSelected = era.era === selectedEraId;
            const isFinished = completedEras.includes(era.era);

            return (
              <button
                key={era.id}
                id={`btn-era-tab-${era.era}`}
                onClick={() => handleSelectEra(era.era)}
                className={`group relative flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold transition-all shrink-0 border cursor-pointer ${
                  isSelected
                    ? 'bg-gradient-to-r from-cyan-950 to-slate-900 text-cyan-300 border-cyan-400 shadow-[0_0_15px_rgba(0,242,254,0.35)] scale-102'
                    : isFinished
                    ? 'bg-slate-900/80 text-emerald-300 border-emerald-500/40 hover:border-emerald-400'
                    : 'bg-slate-900/50 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-200'
                }`}
                title={`Haz clic para cambiar a la ${era.title} y suspender/iniciar su narración`}
              >
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-sm ${
                  isSelected ? 'bg-cyan-500/20 text-cyan-300' : 'bg-slate-800/80'
                }`}>
                  {era.icon}
                </div>
                <div className="text-left leading-tight">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[11px] font-black">Era {index + 1}</span>
                    {isFinished && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />}
                  </div>
                  <span className="text-[10px] text-slate-400 group-hover:text-slate-200 hidden sm:inline truncate max-w-[120px]">
                    {era.subtitle.split(':')[0]}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* HUD LIVE METRICS STRIP: POINTS, CASH & CHARACTERS */}
        <div className="px-4 sm:px-6 py-2 bg-slate-950/60 border-b border-slate-800/80 flex items-center justify-between flex-wrap gap-2 text-xs shrink-0">
          <div className="flex items-center gap-4 flex-wrap">
            {/* Clickable Points Pill with Icon Narration */}
            <button
              id="btn-cuadro-puntos-info"
              onClick={() => {
                soundFx.playClick();
                narratorEngine.playIconNarration('icon_marcador_puntos');
              }}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-950/40 border border-amber-500/40 text-amber-300 hover:border-amber-400 transition-all cursor-pointer"
              title="Puntos de Inversión Disponibles para Transacciones (Haz clic para narración)"
            >
              <Award className="w-4 h-4 text-amber-400" />
              <span className="font-bold">Puntos de Inversión:</span>
              <span className={`font-mono font-black ${availablePoints < 0 ? 'text-red-400' : 'text-amber-200'}`}>
                {availablePoints} Pts
              </span>
            </button>

            {/* Liquidity Cash */}
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-950/30 border border-emerald-500/30 text-emerald-300 font-medium">
              <Coins className="w-4 h-4 text-emerald-400" />
              <span>Capital:</span>
              <span className="font-mono font-bold text-white">${cash.toFixed(0)}</span>
            </div>

            {/* Passive Income */}
            <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-cyan-950/30 border border-cyan-500/30 text-cyan-300 font-medium hidden sm:flex">
              <TrendingUp className="w-4 h-4 text-cyan-400" />
              <span>Flujo Pasivo:</span>
              <span className="font-mono font-bold text-white">+${monthlyPassiveIncome}/tick</span>
            </div>
          </div>

          {/* Interactive Mentors Voice Shortcuts */}
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-slate-400 font-mono hidden md:inline">Mentores:</span>
            <button
              id="btn-mentor-kai"
              onClick={() => handleCharacterClick('kai')}
              className="px-2 py-1 rounded-lg bg-cyan-950/60 border border-cyan-500/40 hover:border-cyan-300 text-[11px] font-bold text-cyan-300 flex items-center gap-1 transition-all"
              title="Voz de Kai: Clic para escuchar su consejo"
            >
              <span>🧑‍🚀</span>
              <span>Kai</span>
            </button>
            <button
              id="btn-mentora-lia"
              onClick={() => handleCharacterClick('lia')}
              className="px-2 py-1 rounded-lg bg-fuchsia-950/60 border border-fuchsia-500/40 hover:border-fuchsia-300 text-[11px] font-bold text-fuchsia-300 flex items-center gap-1 transition-all"
              title="Voz de Lia: Clic para escuchar su consejo"
            >
              <span>👩‍💻</span>
              <span>Lia</span>
            </button>
          </div>
        </div>

        {/* SUB-NAVIGATION TABS (HISTORIA & ASERTIJO vs INVERSIONES CON PUNTOS) */}
        <div className="flex items-center gap-2 px-4 sm:px-6 pt-3 shrink-0">
          <button
            onClick={() => {
              soundFx.playClick();
              setActiveTab('historia_asertijo');
            }}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'historia_asertijo'
                ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/30'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <HelpCircle className="w-4 h-4" />
            <span>Historia y Acertijo de la Era</span>
          </button>

          <button
            onClick={() => {
              soundFx.playClick();
              setActiveTab('inversiones');
              narratorEngine.playIconNarration(`icon_inversion_${selectedEraId.replace('era_', '')}`);
            }}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all cursor-pointer ${
              activeTab === 'inversiones'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/30'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            <span>Transacciones & Inversión con Puntos</span>
            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-slate-950 text-amber-300">
              {currentEraInvestments.length} Activos
            </span>
          </button>
        </div>

        {/* MAIN BODY CONTENT AREA (SCROLLABLE) */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {activeTab === 'historia_asertijo' ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* LEFT COLUMN: HISTORIA DEL LIBRO & ART 3D */}
              <div className="lg:col-span-5 space-y-4">
                {/* 3D Visual Art Illustration of the Era (Click to read scene) */}
                <div 
                  onClick={() => handleSelectEra(selectedEraId)}
                  className="relative rounded-2xl overflow-hidden border border-cyan-500/40 hover:border-cyan-400 aspect-video lg:aspect-4/3 bg-slate-950 flex items-center justify-center group shadow-xl cursor-pointer transition-all"
                  title="Haz clic para escuchar la narración de esta escena"
                >
                  <img
                    src={getEraImage()}
                    alt={currentEraData.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                    <div>
                      <div className="text-[10px] font-mono font-black uppercase text-cyan-300 tracking-wider">
                        {currentEraData.characters}
                      </div>
                      <div className="text-xs sm:text-sm font-bold text-white">
                        {currentEraData.subtitle}
                      </div>
                    </div>
                    <button
                      onClick={() => handleSelectEra(selectedEraId)}
                      className="p-2 rounded-xl bg-cyan-500/90 hover:bg-cyan-400 text-slate-950 shadow-lg cursor-pointer"
                      title="Escuchar narración de esta escena"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Excerpt from the original book by ircar rojas (Click to read) */}
                <div 
                  onClick={() => {
                    soundFx.playClick();
                    narratorEngine.readCuentoSection(
                      `chronicle_${selectedEraId}`,
                      `Crónica del libro El Viaje del Valor: ${currentEraData.quoteFromBook}. Concepto clave: ${currentEraData.coreConcept}`,
                      `Crónica: ${currentEraData.title}`,
                      currentEraData.title
                    );
                  }}
                  className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 hover:border-cyan-400 space-y-2 cursor-pointer transition-all group"
                  title="Haz clic para escuchar este fragmento del libro en voz viva"
                >
                  <div className="flex items-center justify-between text-cyan-400 text-xs font-bold">
                    <span className="flex items-center gap-2">
                      <span>📖</span>
                      <span>Crónica del Libro "El Viaje del Valor":</span>
                    </span>
                    <Volume2 className="w-3.5 h-3.5 text-slate-400 group-hover:text-cyan-300 transition-colors" />
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 italic leading-relaxed">
                    "{currentEraData.quoteFromBook}"
                  </p>
                  <div className="pt-2 border-t border-slate-800/80 text-[11px] text-amber-300/90 font-medium">
                    💡 <strong>Concepto Clave:</strong> {currentEraData.coreConcept}
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN: "UNE CADA ERA A SU ASERTIJO" - CLEAR RIDDLE & ANSWERS */}
              <div className="lg:col-span-7 space-y-4">
                <div className="p-4 sm:p-6 rounded-2xl bg-slate-950/90 border-2 border-amber-500/40 shadow-xl space-y-4">
                  {/* Riddle Header with Audio Button */}
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <div className="flex items-center gap-2.5">
                      <button
                        onClick={handleAcertijoIconClick}
                        className="w-9 h-9 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400 text-amber-300 flex items-center justify-center text-lg cursor-pointer transition-all"
                        title="Haz clic para escuchar el acertijo narrado"
                      >
                        🧩
                      </button>
                      <div>
                        <div className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-wider">
                          Misión & Acertijo Obligatorio
                        </div>
                        <h3 className="text-sm sm:text-base font-black text-white">
                          {currentEraData.riddleChallenge}
                        </h3>
                      </div>
                    </div>
                  </div>

                  {/* Clear Question */}
                  <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 space-y-1.5">
                    <div className="text-[11px] font-bold text-cyan-300 flex items-center gap-1.5">
                      <HelpCircle className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Pregunta Central de Evaluación:</span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-200 font-semibold leading-relaxed">
                      {currentQuiz.question}
                    </p>
                  </div>

                  {/* Scoring Rules Display */}
                  <div className="flex items-center justify-between text-[11px] px-3 py-2 rounded-xl bg-slate-900/60 border border-slate-800">
                    <span className="text-emerald-400 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Acierto: +{currentQuiz.pointsReward} Pts / +${currentQuiz.cashReward}
                    </span>
                    <span className="text-red-400 font-bold flex items-center gap-1">
                      <XCircle className="w-3.5 h-3.5" /> Error: -{currentQuiz.pointsPenalty} Pts / -${currentQuiz.cashPenalty}
                    </span>
                  </div>

                  {/* Clear Choices Buttons (3 Opciones: A, B, C con Posición Alternada) */}
                  <div className="space-y-2.5 pt-1">
                    {(currentQuiz.options || []).map((opt, idx) => {
                      const isSelected = selectedOptionIndex === idx;
                      const hasAnswered = showRiddleExplanation && isSelected;

                      return (
                        <button
                          key={opt.id || `opt_${idx}`}
                          id={`btn-opcion-${opt.letter.toLowerCase()}-${currentQuiz.id}`}
                          onClick={() => handleAnswerOption(idx)}
                          className={`w-full p-3.5 rounded-xl border text-left transition-all flex items-center justify-between gap-3 group cursor-pointer ${
                            hasAnswered
                              ? opt.isCorrect
                                ? 'bg-emerald-950/80 border-emerald-400 text-emerald-200 shadow-[0_0_20px_rgba(16,185,129,0.3)] scale-101'
                                : 'bg-red-950/80 border-red-400 text-red-200'
                              : 'bg-slate-900/80 hover:bg-slate-850 border-slate-700 hover:border-cyan-400 text-slate-200'
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <div className={`w-7 h-7 rounded-lg flex items-center justify-center font-mono font-black text-xs shrink-0 mt-0.5 border ${
                              hasAnswered
                                ? opt.isCorrect
                                  ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300'
                                  : 'bg-red-500/20 border-red-400 text-red-300'
                                : 'bg-cyan-950 border-cyan-500/50 text-cyan-300 group-hover:border-cyan-400'
                            }`}>
                              {opt.letter}
                            </div>
                            <span className="text-xs sm:text-sm font-semibold leading-snug">
                              {opt.text}
                            </span>
                          </div>
                          <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-cyan-300 shrink-0" />
                        </button>
                      );
                    })}
                  </div>

                  {/* Immediate Clear Pedagogical Feedback */}
                  {showRiddleExplanation && selectedOptionIndex !== null && currentQuiz.options?.[selectedOptionIndex] && (
                    <div className="space-y-3 animate-fadeIn">
                      <div className={`p-4 rounded-xl border ${
                        currentQuiz.options[selectedOptionIndex].isCorrect
                          ? 'bg-emerald-950/60 border-emerald-500/50 text-emerald-200'
                          : 'bg-red-950/60 border-red-500/50 text-red-200'
                      }`}>
                        <div className="flex items-center gap-2 font-bold text-xs sm:text-sm mb-1">
                          {currentQuiz.options[selectedOptionIndex].isCorrect ? (
                            <>
                              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                              <span>¡Acierto Magistral! (+{currentQuiz.pointsReward} Pts / +${currentQuiz.cashReward})</span>
                            </>
                          ) : (
                            <>
                              <XCircle className="w-4 h-4 text-red-400" />
                              <span>Respuesta Errada: (-{currentQuiz.pointsPenalty} Pts / -${currentQuiz.cashPenalty})</span>
                            </>
                          )}
                        </div>
                        <p className="text-xs leading-relaxed text-slate-300">
                          {currentQuiz.options[selectedOptionIndex].explanation}
                        </p>
                      </div>

                      {/* Transition banner when advancing to next era */}
                      {isAdvancingEra && nextEraInfo && (
                        <div className="p-3.5 rounded-xl bg-gradient-to-r from-emerald-950/90 via-slate-900 to-cyan-950/90 border border-emerald-400/60 flex items-center justify-between gap-3 shadow-lg shadow-emerald-500/10 animate-pulse">
                          <div className="flex items-center gap-2.5">
                            <span className="text-xl">🚀</span>
                            <div>
                              <div className="text-xs font-black text-emerald-300 flex items-center gap-1.5">
                                <span>¡Has pasado a la siguiente era!</span>
                                <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                                  {nextEraInfo.title}
                                </span>
                              </div>
                              <p className="text-[11px] text-slate-300">
                                Escuchando la respuesta correcta. A continuación se leerá la historia y el acertijo de la nueva era.
                              </p>
                            </div>
                          </div>
                          <button
                            onClick={() => {
                              soundFx.playClick();
                              if (advanceCallbackRef.current) {
                                advanceCallbackRef.current();
                              }
                            }}
                            className="px-3 py-1.5 rounded-lg bg-emerald-400 hover:bg-emerald-300 text-slate-950 text-xs font-black flex items-center gap-1 shrink-0 shadow-md cursor-pointer transition-all hover:scale-105"
                          >
                            <span>Cambiar Ahora</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Advance to Next Era Button */}
                  <div className="pt-2 flex items-center justify-between border-t border-slate-800">
                    <span className="text-xs text-slate-400">
                      {isEraCompleted ? '✅ Era superada con éxito' : '⏳ Supera el acertijo para desbloquear'}
                    </span>
                    {selectedEraId !== 'era_bit_digital' ? (
                      <button
                        onClick={() => {
                          const eraList: MoneyEra[] = ['era_trueque', 'era_sal_cauri', 'era_forja_lidia', 'era_bit_digital'];
                          const nextIdx = eraList.indexOf(selectedEraId) + 1;
                          if (nextIdx < eraList.length) {
                            const nextEra = eraList[nextIdx];
                            soundFx.playClick();
                            setSelectedEraId(nextEra);
                            setCorrelativeEra(nextEra);
                            setSelectedOptionIndex(null);
                            setShowRiddleExplanation(false);

                            const nextEraData = eras.find(e => e.era === nextEra);
                            const nextQuiz = quizQuestions.find(q => q.era === nextEra);
                            if (nextEraData && nextQuiz) {
                              const nextStoryAndRiddleText = `Historia de la ${nextEraData.title}: ${nextEraData.quoteFromBook}. Concepto clave: ${nextEraData.coreConcept}. Acertijo de la era: ${nextEraData.riddleChallenge}. Pregunta del acertijo: ${nextQuiz.question}.`;
                              narratorEngine.playIconNarration(`intro_${nextEra}`, {
                                title: `Historia y Acertijo: ${nextEraData.title}`,
                                eraName: nextEraData.title,
                                icon: nextEraData.icon,
                                text: nextStoryAndRiddleText
                              });
                            }
                          }
                        }}
                        className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-black flex items-center gap-1.5 shadow-md shadow-cyan-500/30 cursor-pointer"
                      >
                        <span>Siguiente Era</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    ) : (
                      <div className="text-xs font-black text-fuchsia-400">
                        ⚡ ¡Has llegado a la Frontera Digital!
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* TAB 2: "QUE SE PUEDAN INVERTIR PARA REALIZAR TRANSACCIONES CON PUNTOS" */
            <div className="space-y-4 animate-fadeIn">
              <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-500/30 flex items-center justify-between flex-wrap gap-3">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">💰</span>
                    <h3 className="text-sm sm:text-base font-black text-amber-300">
                      Centro de Transacciones & Activos Históricos de la {currentEraData.title}
                    </h3>
                  </div>
                  <p className="text-xs text-slate-300">
                    Invierte los puntos que has ganado para adquirir activos de esta época y multiplicar tus rendimientos pasivos.
                  </p>
                </div>

                <div className="px-3.5 py-1.5 rounded-xl bg-slate-950 border border-amber-400/50 text-right">
                  <div className="text-[10px] text-slate-400 font-mono">Puntos Disponibles:</div>
                  <div className="text-sm sm:text-base font-mono font-black text-amber-300">
                    {availablePoints} Pts
                  </div>
                </div>
              </div>

              {/* Grid of Historical Era Investment Assets */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {currentEraInvestments.map((asset) => {
                  const canAfford = availablePoints >= asset.costPoints;

                  return (
                    <div
                      key={asset.id}
                      className="p-4 rounded-2xl bg-slate-950 border border-slate-800 hover:border-amber-500/50 transition-all flex flex-col justify-between space-y-4 shadow-lg group"
                    >
                      <div className="space-y-3">
                        {/* Header with Clickable Asset Icon */}
                        <div className="flex items-start justify-between">
                          <button
                            onClick={() => handleAssetIconClick(asset)}
                            className="w-12 h-12 rounded-2xl bg-slate-900 border border-amber-500/40 hover:border-amber-300 flex items-center justify-center text-2xl group-hover:scale-105 transition-all cursor-pointer shadow-md"
                            title="Haz clic para escuchar la función económica de este activo"
                          >
                            {asset.icon}
                          </button>
                          <div className="text-right">
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
                              Posees: {asset.purchasedCount}x
                            </span>
                          </div>
                        </div>

                        <div>
                          <h4 className="text-sm font-black text-white group-hover:text-amber-300 transition-colors">
                            {asset.title}
                          </h4>
                          <p className="text-xs text-slate-400 mt-1 line-clamp-3 leading-relaxed">
                            {asset.description}
                          </p>
                        </div>

                        {/* Yield & Benefit Tags */}
                        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-900 text-[11px]">
                          <div className="p-1.5 rounded-lg bg-emerald-950/40 border border-emerald-500/20 text-emerald-300 font-medium text-center">
                            +${asset.cashBonus} Liquidez
                          </div>
                          <div className="p-1.5 rounded-lg bg-cyan-950/40 border border-cyan-500/20 text-cyan-300 font-medium text-center">
                            +{asset.passivePointsYield} Pts Pasivos
                          </div>
                        </div>
                      </div>

                      {/* Transaction Action Button */}
                      <button
                        id={`btn-invertir-${asset.id}`}
                        onClick={() => handleInvestInAsset(asset)}
                        disabled={!canAfford}
                        className={`w-full py-2.5 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md ${
                          canAfford
                            ? 'bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 shadow-amber-500/20 cursor-pointer active:scale-98'
                            : 'bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed'
                        }`}
                      >
                        <Coins className="w-3.5 h-3.5" />
                        <span>Invertir {asset.costPoints} Puntos</span>
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
