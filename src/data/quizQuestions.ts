import { QuizQuestion } from '../types';

export const INITIAL_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'quiz_1_trueque_friccion',
    era: 'era_trueque',
    title: 'Dilema de la Cabra y el Trigo (Era 1)',
    question: 'Kai tiene una cabra lechera y quiere trigo, pero el mercader solo busca herramientas de cobre. ¿Por qué la "doble coincidencia de necesidades" fue el obstáculo crucial que obligó a inventar el dinero?',
    options: [
      {
        id: 'q1_opt_a',
        letter: 'A',
        text: 'Porque el trueque directo exige que ambos deseen exactamente lo que el otro ofrece; al no coincidir, el comercio se paraliza.',
        isCorrect: true,
        explanation: '¡Respuesta Correcta! (Opción A). La doble coincidencia de necesidades es la gran fricción del trueque: sin un bien comúnmente aceptado, las horas se pierden buscando a quien acepte tu producto.'
      },
      {
        id: 'q1_opt_b',
        letter: 'B',
        text: 'Porque una cabra es un bien infinitamente divisible y fácil de guardar en sacos como grano sin ningún costo.',
        isCorrect: false,
        explanation: 'Incorrecto (Opción B). Una cabra viva no se puede fraccionar ni almacenar sin costos de alimento y cuidado. Esa indivisibilidad agravaba la fricción del trueque.'
      },
      {
        id: 'q1_opt_c',
        letter: 'C',
        text: 'Porque en la antigüedad a nadie le interesaba comerciar ni obtener alimentos de otras aldeas.',
        isCorrect: false,
        explanation: 'Incorrecto (Opción C). Las comunidades siempre buscaron comerciar activamente; la limitación residía en la falta de un instrumento de cambio universal.'
      }
    ],
    // Backwards compatibility fallbacks
    affirmativeOption: {
      text: 'Opción A: La falta de coincidencia paralizaba el intercambio.',
      isCorrect: true,
      explanation: '¡Exacto! El trueque directo exige doble coincidencia.'
    },
    negativeOption: {
      text: 'Opción B: El trueque era fluido y sin fricciones.',
      isCorrect: false,
      explanation: 'Falso. La fricción del trueque paralizaba las transacciones.'
    },
    pointsReward: 100,
    pointsPenalty: 50,
    cashReward: 80,
    cashPenalty: 30
  },
  {
    id: 'quiz_2_sal_salario',
    era: 'era_sal_cauri',
    title: 'El Primer Salario: Sal Marina & Conchas (Era 2)',
    question: 'En las rutas del mar y las legiones antiguas, la sal marina y las conchas de cauri desplazaron a los animales como medio de pago. ¿Cuál fue la gran ventaja económica que aportaron?',
    options: [
      {
        id: 'q2_opt_a',
        letter: 'A',
        text: 'Eran objetos puramente decorativos sin ninguna utilidad práctica en la vida cotidiana de las personas.',
        isCorrect: false,
        explanation: 'Incorrecto (Opción A). La sal tenía un valor biológico indispensable para conservar alimentos, y el cauri era apreciado y reconocido a lo largo de miles de kilómetros.'
      },
      {
        id: 'q2_opt_b',
        letter: 'B',
        text: 'Aportaron divisibilidad exacta en raciones pequeñas, alta durabilidad en el tiempo y fácil transporte en la mano.',
        isCorrect: true,
        explanation: '¡Respuesta Correcta! (Opción B). A diferencia de una cabra indivisible, la sal se puede pesar en granos exactos y no se pudre, permitiendo pagos fraccionados y dando origen a la palabra "salario".'
      },
      {
        id: 'q2_opt_c',
        letter: 'C',
        text: 'Eran tan pesados y difíciles de transportar que requerían caravanas enteras para comprar una sola hogaza de pan.',
        isCorrect: false,
        explanation: 'Incorrecto (Opción C). Todo lo contrario: el dinero mercancía triunfó precisamente por concentrar alto valor en poco peso y volumen.'
      }
    ],
    affirmativeOption: {
      text: 'Opción B: Divisibilidad, durabilidad y portabilidad.',
      isCorrect: true,
      explanation: '¡Correcto! La sal y el cauri resolvieron la divisibilidad.'
    },
    negativeOption: {
      text: 'Opción A: Solo servían de adorno sin valor.',
      isCorrect: false,
      explanation: 'Incorrecto. Tenían valor intrínseco y alta demanda.'
    },
    pointsReward: 100,
    pointsPenalty: 50,
    cashReward: 90,
    cashPenalty: 35
  },
  {
    id: 'quiz_3_forja_lidia_sello',
    era: 'era_forja_lidia',
    title: 'La Forja Real y el Sello del León (Era 3)',
    question: 'En el siglo VII a.C., los reyes de Lidia comenzaron a estampar con martillo la cabeza de un león sobre trozos estandarizados de electro (oro y plata). ¿Qué problema crítico resolvió este sello real?',
    options: [
      {
        id: 'q3_opt_a',
        letter: 'A',
        text: 'Servía como un simple grabado decorativo sin relación alguna con el valor económico del metal.',
        isCorrect: false,
        explanation: 'Incorrecto (Opción A). El sello no era estético; era una garantía legal y soberana obligatoria respaldada por el Estado de Lidia.'
      },
      {
        id: 'q3_opt_b',
        letter: 'B',
        text: 'Obligaba a los comerciantes a fundir la moneda en cada mercado para verificar su peso con balanzas.',
        isCorrect: false,
        explanation: 'Incorrecto (Opción B). El invento de la moneda evitó precisamente tener que fundir o pesar metal en cada compra cotidiana.'
      },
      {
        id: 'q3_opt_c',
        letter: 'C',
        text: 'Estandarizó la confianza: el sello certificaba peso uniforme y pureza de ley, erradicando balanzas y fraudes.',
        isCorrect: true,
        explanation: '¡Respuesta Correcta! (Opción C). Al ver la fiera del león estampada, los comerciantes confiaban de inmediato en el gramaje y la aleación exacta, multiplicando la velocidad del comercio internacional.'
      }
    ],
    affirmativeOption: {
      text: 'Opción C: Certificaba peso y ley oficial del metal.',
      isCorrect: true,
      explanation: '¡Brillante! El sello real estandarizó la confianza.'
    },
    negativeOption: {
      text: 'Opción A: Era solo un dibujo sin valor legal.',
      isCorrect: false,
      explanation: 'Falso. El sello oficial garantizaba autenticidad.'
    },
    pointsReward: 110,
    pointsPenalty: 55,
    cashReward: 100,
    cashPenalty: 40
  },
  {
    id: 'quiz_4_blockchain_informacion',
    era: 'era_bit_digital',
    title: 'La Red Digital y el Dinero como Información (Era 4)',
    question: 'En la era contemporánea de la fibra óptica y las cadenas de bloques (Blockchain), ¿dónde reside verdaderamente la naturaleza del dinero?',
    options: [
      {
        id: 'q4_opt_a',
        letter: 'A',
        text: 'Únicamente en el papel moneda impreso y en los lingotes metálicos almacenados físicamente bajo tierra.',
        isCorrect: false,
        explanation: 'Incorrecto (Opción A). Más del 95% de la masa monetaria global hoy no tiene formato físico; existe como balances digitales e información electrónica.'
      },
      {
        id: 'q4_opt_b',
        letter: 'B',
        text: 'En la información contable inmutable, la escasez matemática verificable y el consenso compartido de la red.',
        isCorrect: true,
        explanation: '¡Respuesta Correcta! (Opción B). Desde las redes bancarias interbancarias hasta Bitcoin, el dinero moderno es un registro contable descentralizado protegido por criptografía y reglas de consenso matemático.'
      },
      {
        id: 'q4_opt_c',
        letter: 'C',
        text: 'En la promesa verbal de desconocidos sin ningún registro criptográfico ni auditoría posible.',
        isCorrect: false,
        explanation: 'Incorrecto (Opción C). La confianza digital descansa en protocolos matemáticos rigurosos y libros mayores inmutables, no en promesas no verificables.'
      }
    ],
    affirmativeOption: {
      text: 'Opción B: Información contable y consenso criptográfico.',
      isCorrect: true,
      explanation: '¡Excelente! El dinero moderno es información verificable.'
    },
    negativeOption: {
      text: 'Opción A: Solo lo físico tiene validez.',
      isCorrect: false,
      explanation: 'Error. La inmensa mayoría del dinero opera digitalmente.'
    },
    pointsReward: 120,
    pointsPenalty: 60,
    cashReward: 120,
    cashPenalty: 45
  },
  {
    id: 'quiz_5_ciberseguridad_2fa',
    era: 'era_bit_digital',
    title: 'Ciberdefensa Financiera & Token 2FA',
    question: 'Un mensaje desconocido por WhatsApp te promete duplicar tus ahorros en 24 horas si le envías tu código OTP de Pago Móvil o tu contraseña bancaria. ¿Cuál es la decisión correcta?',
    options: [
      {
        id: 'q5_opt_a',
        letter: 'A',
        text: 'Enviar la clave de inmediato porque las oportunidades de enriquecimiento fácil no esperan.',
        isCorrect: false,
        explanation: '¡Peligro! (Opción A). Caer en esquemas de enriquecimiento rápido entregando credenciales bancarias es la vía directa al vaciado de tus cuentas.'
      },
      {
        id: 'q5_opt_b',
        letter: 'B',
        text: 'Enviar solo el token temporal OTP creyendo que por expirar en minutos no representa ningún riesgo.',
        isCorrect: false,
        explanation: '¡Grave error! (Opción B). El token OTP es la llave de paso final para autorizar transferencias fraudulentas en tiempo real.'
      },
      {
        id: 'q5_opt_c',
        letter: 'C',
        text: '¡Rechazar y bloquear! Las claves, contraseñas y códigos OTP son estrictamente confidenciales y jamás se comparten.',
        isCorrect: true,
        explanation: '¡Respuesta Correcta! (Opción C). Las instituciones financieras legítimas nunca piden tokens ni contraseñas. Proteger tus credenciales con 2FA es tu escudo principal.'
      }
    ],
    affirmativeOption: {
      text: 'Opción C: Jamás compartir claves ni códigos OTP.',
      isCorrect: true,
      explanation: '¡Decisión acertada! Protege tu patrimonio.'
    },
    negativeOption: {
      text: 'Opción A: Enviar la clave por dinero rápido.',
      isCorrect: false,
      explanation: 'Peligro. Es un fraude cibernético clásico.'
    },
    pointsReward: 150,
    pointsPenalty: 80,
    cashReward: 150,
    cashPenalty: 60
  },
  {
    id: 'quiz_6_bolsa_caracas_bvc',
    era: 'era_forja_lidia',
    title: 'Inversión Productiva vs. Guardar Bajo el Colchón',
    question: '¿Por qué los expertos recomiendan invertir en activos productivos (como acciones de la Bolsa de Valores de Caracas) en vez de dejar el efectivo inmóvil en un cajón?',
    options: [
      {
        id: 'q6_opt_a',
        letter: 'A',
        text: 'Porque las empresas productivas generan dividendos pasivos, poseen bienes reales y protegen el poder adquisitivo frente a la inflación.',
        isCorrect: true,
        explanation: '¡Respuesta Correcta! (Opción A). El efectivo estancado se devalúa constantemente por la inflación. Las empresas generan utilidades operativas y distribuyen dividendos que preservan y multiplican el valor real.'
      },
      {
        id: 'q6_opt_b',
        letter: 'B',
        text: 'Porque el dinero guardado en un cajón se multiplica mágicamente sin necesidad de producción alguna.',
        isCorrect: false,
        explanation: 'Incorrecto (Opción B). El dinero guardado no produce nada por sí solo y pierde capacidad de compra cada mes.'
      },
      {
        id: 'q6_opt_c',
        letter: 'C',
        text: 'Porque las empresas productivas están obligadas por ley a perder todo el capital de sus accionistas.',
        isCorrect: false,
        explanation: 'Incorrecto (Opción C). Las empresas se crean para generar valor económico sostenible y retornos a sus inversores.'
      }
    ],
    affirmativeOption: {
      text: 'Opción A: Activos productivos protegen contra la inflación.',
      isCorrect: true,
      explanation: '¡Correcto! Los dividendos e infraestructura superan la inflación.'
    },
    negativeOption: {
      text: 'Opción B: Es mejor dejar el dinero quieto en un cajón.',
      isCorrect: false,
      explanation: 'Falso. La inflación devora el dinero inactivo.'
    },
    pointsReward: 120,
    pointsPenalty: 50,
    cashReward: 110,
    cashPenalty: 40
  },
  {
    id: 'quiz_7_construccion_valor',
    era: 'era_trueque',
    title: 'Construcción con Valor Agregado (Taller Mateo)',
    question: 'En el taller de artesanía, un trozo de madera en bruto cuesta 10 créditos, pero una mesa tallada se vende en 50 créditos. ¿Qué fenómeno económico explica esta diferencia?',
    options: [
      {
        id: 'q7_opt_a',
        letter: 'A',
        text: 'Es pura especulación y la mesa terminada tiene exactamente la misma utilidad que el tronco sin procesar.',
        isCorrect: false,
        explanation: 'Incorrecto (Opción A). Un tronco sin transformar no sirve para sentarse a comer ni trabajar; la utilidad de la mesa es cualitativamente superior.'
      },
      {
        id: 'q7_opt_b',
        letter: 'B',
        text: 'La adición de trabajo calificado, herramientas y diseño genera valor agregado (plusvalía económica productiva).',
        isCorrect: true,
        explanation: '¡Respuesta Correcta! (Opción B). El proceso productivo transforma materias primas en bienes con mayor utilidad y deseabilidad, creando margen de ganancia genuino para reinvertir.'
      },
      {
        id: 'q7_opt_c',
        letter: 'C',
        text: 'La transformación destruye el valor del tronco y hace que la madera pierda toda su utilidad práctica.',
        isCorrect: false,
        explanation: 'Incorrecto (Opción C). La manufactura multiplica el valor, no lo destruye.'
      }
    ],
    affirmativeOption: {
      text: 'Opción B: El trabajo y diseño generan valor agregado.',
      isCorrect: true,
      explanation: '¡Exacto! La manufactura crea plusvalía productiva.'
    },
    negativeOption: {
      text: 'Opción A: La madera en bruto vale igual que la mesa.',
      isCorrect: false,
      explanation: 'Error. La mesa tiene mayor utilidad y valor.'
    },
    pointsReward: 100,
    pointsPenalty: 45,
    cashReward: 100,
    cashPenalty: 35
  },
  {
    id: 'quiz_8_interes_compuesto',
    era: 'era_bit_digital',
    title: 'La Fuerza del Interés Compuesto',
    question: '¿Por qué Albert Einstein llamó al interés compuesto la "fuerza más poderosa del universo financiero"?',
    options: [
      {
        id: 'q8_opt_a',
        letter: 'A',
        text: 'Porque consiste en gastar todas las ganancias el primer día para evitar que se acumulen en el fondo.',
        isCorrect: false,
        explanation: 'Incorrecto (Opción A). Gastar las utilidades detiene por completo el ciclo del interés compuesto.'
      },
      {
        id: 'q8_opt_b',
        letter: 'B',
        text: 'Porque las ganancias acumuladas nunca generan nuevos intereses adicionales a lo largo del tiempo.',
        isCorrect: false,
        explanation: 'Incorrecto (Opción B). Eso describiría el interés simple, no el compuesto.'
      },
      {
        id: 'q8_opt_c',
        letter: 'C',
        text: 'Porque al reinvertir los rendimientos, los intereses comienzan a generar sus propios intereses en una curva de crecimiento exponencial.',
        isCorrect: true,
        explanation: '¡Respuesta Correcta! (Opción C). La magia del interés compuesto reside en que el capital base crece con cada reinversión, produciendo un efecto bola de nieve que multiplica el patrimonio con el tiempo.'
      }
    ],
    affirmativeOption: {
      text: 'Opción C: Los rendimientos reinvertidos generan nuevos intereses.',
      isCorrect: true,
      explanation: '¡Maravilloso! El interés compuesto multiplica el patrimonio.'
    },
    negativeOption: {
      text: 'Opción A: Es mejor gastar todo de inmediato.',
      isCorrect: false,
      explanation: 'Incorrecto. Detiene el crecimiento del capital.'
    },
    pointsReward: 130,
    pointsPenalty: 60,
    cashReward: 130,
    cashPenalty: 45
  }
];
