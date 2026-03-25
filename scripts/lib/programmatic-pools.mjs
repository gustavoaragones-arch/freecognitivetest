/**
 * Localized UI strings + paragraph pools for programmatic SEO pages.
 * Each language uses its own pool (no English leakage in ES/FR bodies).
 */

export const UI = {
  en: {
    skipLink: "Skip to main content",
    navAria: "Primary",
    home: "Home",
    hub: "SEO guides index",
    exercisesHub: "Brain exercises",
    exercisesCatalog: "100 exercises (full list)",
    langSwitch: "Language",
    sectionTool: "Try a related screening tool",
    sectionContent: "What to know",
    sectionExercise: "Practice with exercises",
    exerciseIntro: "These activities are educational practice—not medical treatment.",
    sectionFaq: "Common questions",
    sectionRelated: "Related guides",
    disclaimer:
      "Educational information only. It does not replace evaluation by a qualified clinician. If you have urgent concerns, seek professional care.",
    toolNote: "Results are for learning and self-monitoring only—not a diagnosis.",
    relMemoryTest: "Free memory screening tools",
    relDementia: "Dementia screening resources (educational)",
    publisherName: "FreeCognitiveTest.org",
    priorityNavAria: "High-traffic entry points",
    priorityMem: "Free memory test",
    priorityDem: "Dementia test online",
    priorityEx: "Brain exercises",
    priorityIdx: "All pages",
  },
  es: {
    skipLink: "Saltar al contenido principal",
    navAria: "Principal",
    home: "Inicio",
    hub: "Índice de guías SEO",
    exercisesHub: "Ejercicios cerebrales",
    exercisesCatalog: "100 ejercicios (lista completa)",
    langSwitch: "Idioma",
    sectionTool: "Prueba de tamizaje relacionada",
    sectionContent: "Qué conviene saber",
    sectionExercise: "Practicar con ejercicios",
    exerciseIntro: "Actividades educativas de práctica: no sustituyen tratamiento médico.",
    sectionFaq: "Preguntas frecuentes",
    sectionRelated: "Guías relacionadas",
    disclaimer:
      "Información educativa únicamente. No reemplaza la valoración de un profesional sanitario. Ante urgencias, acuda a su servicio de salud.",
    toolNote: "Los resultados son solo para aprendizaje y autocontrol, no un diagnóstico.",
    relMemoryTest: "Herramientas gratuitas de memoria",
    relDementia: "Recursos educativos sobre demencia",
    publisherName: "FreeCognitiveTest.org",
    priorityNavAria: "Puntos de entrada frecuentes",
    priorityMem: "Prueba de memoria gratuita",
    priorityDem: "Prueba de demencia en línea",
    priorityEx: "Ejercicios cerebrales",
    priorityIdx: "Todas las páginas",
  },
  fr: {
    skipLink: "Aller au contenu principal",
    navAria: "Principal",
    home: "Accueil",
    hub: "Index des guides SEO",
    exercisesHub: "Exercices cérébraux",
    exercisesCatalog: "100 exercices (liste complète)",
    langSwitch: "Langue",
    sectionTool: "Outil de dépistage associé",
    sectionContent: "Ce qu’il faut savoir",
    sectionExercise: "S’entraîner avec des exercices",
    exerciseIntro: "Activités éducatives d’entraînement — pas un traitement médical.",
    sectionFaq: "Questions fréquentes",
    sectionRelated: "Guides connexes",
    disclaimer:
      "Contenu éducatif seulement. Ne remplace pas un avis médical. En cas d’urgence, consultez un professionnel de santé.",
    toolNote: "Résultats à visée pédagogique et d’auto-suivi — pas un diagnostic.",
    relMemoryTest: "Outils gratuits de mémoire",
    relDementia: "Ressources éducatives sur la démence",
    publisherName: "FreeCognitiveTest.org",
    priorityNavAria: "Pages les plus consultées",
    priorityMem: "Test de mémoire gratuit",
    priorityDem: "Test démence en ligne",
    priorityEx: "Exercices cérébraux",
    priorityIdx: "Toutes les pages",
  },
};

/** @type {Record<string, Record<'en'|'es'|'fr', string[]>>} */
export const BODY_POOLS = {
  exercises_intent: {
    en: [
      "Many people search for {topic} because they want practical ways to stay mentally active without complicated equipment. Short, regular sessions tend to be easier to sustain than occasional long marathons. Pairing movement, social contact, and mentally engaging tasks usually supports overall brain health better than any single “miracle” game.",
      "When exploring {topic}, it helps to match activities to your current energy and attention. If an exercise feels frustrating, simplify the rules or shorten the session. Progress comes from consistency and variety—not from pushing through pain or exhaustion.",
      "Attention, memory, and speed interact in daily life. Activities that gently challenge more than one of these skills can feel more relevant than drills that isolate a single skill. Use free tools on this site to sample structured tasks, then carry similar habits into everyday routines like planning meals or learning a new route.",
      "Sleep, cardiovascular fitness, and mood strongly influence how “sharp” you feel. {topic} fits best inside a broader routine: adequate rest, manageable stress, and time with people you trust. If forgetfulness disrupts work, safety, or relationships, discuss changes with a clinician rather than relying on self-tests alone.",
      "Older adults sometimes worry that struggling with names or keys means inevitable decline. Normal aging includes slower retrieval; concerning change is often about new patterns, getting lost in familiar places, or difficulty following steps. Educational exercises can build confidence, but they do not replace medical evaluation when red flags appear.",
      "Screening tools on this site are for learning how cognitive tasks work—not for labeling disease at home. Bring questions to a doctor or neuropsychologist who can interpret results in context. {topic} is best viewed as one ingredient in a lifestyle plan, alongside nutrition, hearing care, and medications review where appropriate.",
    ],
    es: [
      "Muchas personas buscan {topic} porque quieren mantener la mente activa con recursos sencillos. Suele funcionar mejor entrenar poco pero con frecuencia que hacer sesiones largas de vez en cuando. Combinar movimiento, vínculos sociales y retos cognitivos modestos suele apoyar el bienestar cerebral más que un único juego “milagroso”.",
      "Al abordar {topic}, conviene ajustar la dificultad al cansancio y la atención del día. Si algo genera frustración, acorte la sesión o simplifique las reglas. Lo importante es la constancia y variar estímulos, no forzar hasta agotarse.",
      "Memoria, atención y velocidad se combinan en la vida cotidiana. Actividades que retan varias funciones a la vez pueden parecer más útiles que ejercicios muy aislados. Use las herramientas gratuitas del sitio para practicar tareas estructuradas y lleve hábitos parecidos a rutinas como planificar compras o aprender un camino nuevo.",
      "El descanso, el ejercicio cardiovascular y el estado de ánimo influyen en la sensación de claridad mental. {topic} encaja dentro de un estilo de vida amplio: sueño suficiente, estrés manejable y tiempo con personas de confianza. Si el olvido afecta seguridad, trabajo o relaciones, consulte a un profesional en lugar de basarse solo en autopruebas.",
      "Es frecuente preocuparse por olvidar nombres o dónde dejó las llaves. El envejecimiento suele traer recuperación más lenta; lo preocupante suele ser un cambio nuevo: perderse en sitios conocidos o no seguir pasos. Los ejercicios educativos pueden dar confianza, pero no sustituyen valoración clínica ante señales de alarma.",
      "Las herramientas de tamizaje aquí sirven para aprender cómo funcionan las tareas cognitivas, no para diagnosticar en casa. Lleve dudas a su médico o neuropsicólogo. {topic} es un componente más de un plan de vida, junto con alimentación, audición y revisión de medicamentos cuando corresponda.",
    ],
    fr: [
      "Beaucoup de personnes cherchent {topic} pour rester actives mentalement sans matériel compliqué. Des séances courtes et régulières sont souvent plus réalistes que de rares marathons. Associer mouvement, lien social et défis cognitifs modestes soutient généralement mieux la santé cérébrale qu’un seul jeu « miracle ».",
      "Pour {topic}, adaptez la difficulté à votre énergie du jour. Si une tâche frustre, raccourcissez-la ou simplifiez les règles. La régularité et la diversité comptent plus que l’effort maximal jusqu’à l’épuisement.",
      "Attention, mémoire et vitesse interagissent au quotidien. Des activités qui sollicitent plusieurs de ces fonctions peuvent sembler plus pertinentes que des exercices trop étanches. Utilisez les outils gratuits du site, puis transposez l’esprit de ces tâches à la vie réelle : organisation, trajets nouveaux, apprentissages légers.",
      "Sommeil, condition cardiovasculaire et humeur influencent la sensation d’être « lucide ». {topic} se place dans un mode de vie global : repos suffisant, stress maîtrisé, temps avec des proches. Si des oublis nuisent à la sécurité ou aux relations, parlez-en à un professionnel plutôt qu’aux seuls auto-tests.",
      "Avec l’âge, retrouver un mot peut prendre plus de temps ; un changement inquiétant, c’est souvent une nouveauté : se perdre chez soi, ne plus suivre une recette familière. Les exercices éducatifs renforcent la confiance mais ne remplacent pas un examen médical si des signaux d’alerte apparaissent.",
      "Les outils de dépistage ici servent à comprendre le déroulé des tâches cognitives, pas à poser un diagnostic seul. Rapportez vos questions à un médecin ou neuropsychologue. {topic} complète hygiène de vie, alimentation, audition et bilan des médicaments le cas échéant.",
    ],
  },
  tests_audience: {
    en: [
      "People looking for {topic} often want a clear starting point before talking to a doctor. Online tasks can show how you perform on structured items such as word lists or symbols—but scores vary with sleep, stress, and practice. Treat results as a conversation starter, not a verdict.",
      "Age, education, and language background all influence performance on cognitive screens. {topic} pages should emphasize fair expectations: difficulty concentrating after poor rest is common. Repeated practice on the exact same task can inflate scores without reflecting broader brain health.",
      "If {topic} is for a family member, observe whether changes affect independence—finances, medications, driving, cooking—not only anecdotes about forgetfulness. Pair screening information with safety planning and professional follow-up when needed.",
      "Children and adults differ in attention span and strategy; {topic} resources should match developmental level. For minors, involve parents and teachers; for adults, consider vision, hearing, and mood as part of the picture.",
      "Combine {topic} with lifestyle context: vascular risk factors, sleep apnea symptoms, and medication side effects can mimic cognitive problems. Educational sites can highlight these overlaps while avoiding alarmism.",
      "Use the linked tools to sample tasks in a low-stakes environment. Document questions to bring to a clinician. {topic} is one input among history, exam, and sometimes formal neuropsychological testing.",
    ],
    es: [
      "Quien busca {topic} suele querer un punto de partida antes de hablar con el médico. Las tareas en línea muestran el desempeño en ítems estructurados, pero el resultado cambia con sueño, estrés y práctica. Trátelos como tema de conversación, no como veredicto.",
      "La edad, la escolaridad y el idioma influyen en las pantallas cognitivas. {topic} debe fijar expectativas realistas: tras mal descanso es normal concentrarse peor. Repetir la misma tarea puede subir la puntuación sin reflejar salud cerebral global.",
      "Si {topic} orienta a un familiar, observe si los cambios afectan autonomía: dinero, medicación, conducción, cocina. Combine la información de tamizaje con seguridad y seguimiento profesional cuando toque.",
      "Niños y adultos difieren en atención y estrategia; los recursos de {topic} deben ajustarse al nivel. En menores, involucre a familias y docentes; en adultos, tenga en cuenta visión, audición y estado de ánimo.",
      "Integre {topic} con el contexto: factores vasculares, apnea del sueño o efectos secundarios pueden parecer deterioro cognitivo. Un sitio educativo puede señalar estos cruces sin alarmismo.",
      "Use las herramientas enlazadas para probar tareas sin presión. Anote dudas para su clínico. {topic} es solo una pieza junto a historia, exploración y, a veces, neuropsicología formal.",
    ],
    fr: [
      "Pour {topic}, beaucoup cherchent une base objective avant d’en parler au médecin. Des épreuves en ligne montrent comment vous répondez à des consignes standardisées, mais le score dépend du sommeil, du stress et de l’entraînement. Voyez cela comme une ouverture de dialogue, pas comme une sentence.",
      "Âge, scolarité et langue modulent les résultats. {topic} doit rappeler qu’après une nuit courte, la concentration chute pour presque tout le monde. Réussir toujours la même tâche peut refléter l’habitude plus qu’une vision globale des fonctions.",
      "Si {topic} concerne un proche, observez l’autonomie réelle : budget, médicaments, conduite, repas. Associez dépistage, sécurité et rendez-vous médical lorsque c’est indiqué.",
      "Enfants et adultes n’ont ni les mêmes stratégies ni la même endurance attentionnelle; adaptez {topic} au niveau développemental. Pour les mineurs, impliquez famille et enseignants; pour les adultes, pensez audition, vision et humeur.",
      "Reliez {topic} au contexte santé : facteurs vasculaires, apnée du sommeil, effets de médicaments peuvent imiter des troubles cognitifs. Un site éducatif peut le mentionner sans dramatiser.",
      "Testez les outils liés dans un cadre détendu, notez vos questions pour le professionnel. {topic} complète l’histoire clinique, l’examen et parfois une évaluation neuropsychologique.",
    ],
  },
  symptoms: {
    en: [
      "Searching {topic} can create anxiety. Focus on observable patterns: new difficulty with familiar tasks, repeating questions, confusion about time or place, or personality shifts. A single busy-week slip is less informative than persistent change.",
      "Stress, grief, poor sleep, and depression can mimic memory problems. {topic} discussions should mention treatable contributors before jumping to worst-case labels. Clinicians often review medications and mood as part of the workup.",
      "When {topic} leads you to self-tests, use them to learn task formats—not to self-diagnose dementia. Share printouts or notes with a professional who knows your history.",
      "Caregivers reading about {topic} benefit from respite and concrete safety steps: medication organizers, driving conversations, and home lighting. Emotional support groups reduce isolation.",
      "Language matters: “memory loss” spans benign tip-of-the-tongue moments and serious impairment. {topic} content should distinguish normal aging cues from red flags without minimizing real concerns.",
      "If {topic} resonates because of rapid change, vision loss, sudden confusion, or stroke symptoms, seek urgent care. Educational pages cannot triage emergencies.",
    ],
    es: [
      "Buscar {topic} puede generar ansiedad. Centre la mirada en patrones observables: dificultad nueva con tareas habituales, preguntas repetidas, confusión con tiempo o lugar, cambios de carácter. Un despiste puntual tras una semana cargada dice menos que un cambio persistente.",
      "Estrés, duelo, mal sueño y depresión pueden parecer problemas de memoria. Al tratar {topic}, mencione causas tratables antes de etiquetas graves. Los clínicos suelen revisar medicación y ánimo.",
      "Si {topic} lo lleva a autopruebas, úselas para conocer formatos de tareas, no para autodiagnosticar demencia. Lleve notas o capturas a un profesional que conozca su historia.",
      "Quien cuida a alguien y lee sobre {topic} necesita descanso y medidas de seguridad concretas: pastilleros, conversación sobre conducción, iluminación en casa. Los grupos de apoyo reducen aislamiento.",
      "La expresión “pérdida de memoria” abarca desde el tip-of-the-tongue benigno hasta deterioro serio. El contenido sobre {topic} debe separar señales propias del envejecimiento de alertas sin restar importancia a inquietudes reales.",
      "Si {topic} encaja con cambios rápidos, confusión súbita, pérdida visual o signos de ictus, busque urgencias. Las páginas educativas no sustituyen el triaje.",
    ],
    fr: [
      "Chercher {topic} peut inquiéter. Concentrez-vous sur des faits répétés : nouvelles difficultés dans des gestes familiers, questions répétées, désorientation dans le temps ou l’espace, changement d’humeur. Un oubli isolé en période de surcharge compte moins qu’une tendance durable.",
      "Stress, deuil, sommeil insuffisant et dépression imitent souvent des troubles de mémoire. Pour {topic}, rappelez les causes réversibles avant les étiquettes les plus graves. Les professionnels évaluent aussi médicaments et moral.",
      "Si {topic} vous pousse aux auto-tests, utilisez-les pour comprendre les consignes, pas pour poser seul un diagnostic de démence. Apportez notes ou impressions à un soignant qui connaît votre dossier.",
      "Les aidants qui lisent sur {topic} ont besoin de pauses et d’actions concrètes : piluliers, dialogue sur la conduite, luminosité des pièces. Les groupes d’entraide réduisent l’isolement.",
      "« Perte de mémoire » recouvre des situations très différentes. Le contenu sur {topic} doit distinguer vieillissement habituel et signaux d’alerte sans banaliser une vraie détérioration.",
      "Si {topic} coïncide avec une dégradation brutale, confusion soudaine, perte visuelle ou signes d’AVC, appelez les urgences. Ces pages ne font pas de triage médical.",
    ],
  },
  guides: {
    en: [
      "{topic} is most actionable when broken into habits: sleep schedule, movement you enjoy, social plans, and mentally engaging hobbies. Small upgrades stack over months more reliably than extreme short bursts.",
      "For {topic}, evidence often supports aerobic activity, blood pressure management, and hearing correction when loss is present. Cognitive training adds modest benefit when varied and challenging—not when it is the only change.",
      "Nutrition headlines oversimplify; {topic} readers benefit from simple patterns: adequate protein, fiber, hydration, and limiting alcohol spikes. Discuss supplements with a clinician—especially if you take anticoagulants.",
      "Technology can help {topic}: calendars, reminders, voice notes, and labeled storage spots reduce working-memory load. Combine digital aids with offline routines so you are not fully dependent on one device.",
      "Motivation wanes; {topic} succeeds when tied to meaningful goals—grandchildren, volunteering, music, language. Track effort, not perfection.",
      "Revisit {topic} after health changes: new medications, infections, or surgery can temporarily cloud thinking. Context keeps interpretation honest.",
    ],
    es: [
      "{topic} funciona mejor dividido en hábitos: horario de sueño, movimiento que disfrute, planes sociales y aficiones que estimulen la mente. Pequeños cambios sostenidos suman más que rachas extremas cortas.",
      "Para {topic}, suele respaldarse el ejercicio aeróbico, controlar la presión arterial y corregir la audición si falta. El entrenamiento cognitivo aporta algo cuando es variado y exigente, no cuando es lo único que se hace.",
      "Los titulares sobre dieta simplifican demasiado; en {topic} ayudan patrones sencillos: proteína suficiente, fibra, hidratación y moderar alcohol. Los suplementos conviene comentarlos con el médico, sobre todo si toma anticoagulantes.",
      "La tecnología apoya {topic}: calendarios, recordatorios, notas de voz y lugares etiquetados alivian la memoria de trabajo. Combine ayudas digitales con rutinas offline.",
      "La motivación fluctúa; {topic} se mantiene si se liga a metas significativas: familia, voluntariado, música, idiomas. Mida constancia, no perfección.",
      "Revisite {topic} tras cambios de salud: medicación nueva, infecciones o cirugía pueden nublar el pensamiento de forma temporal. El contexto evita interpretaciones erróneas.",
    ],
    fr: [
      "{topic} devient réaliste quand on le découpe : sommeil régulier, mouvement choisi avec plaisir, liens sociaux, loisirs qui sollicitent la pensée. De petits progrès durables valent mieux que des efforts extrêmes éphémères.",
      "Pour {topic}, l’activité aérobie, la tension artérielle et une audition corrigée ont souvent le plus de preuves. L’entraînement cognitif aide modestement s’il est varié et exigeant, pas s’il est isolé.",
      "Les gros titres nutritionnels simplifient trop; pour {topic}, privilégiez protéines, fibres, eau et alcool modéré. Parlez des compléments avec un soignant, surtout sous anticoagulants.",
      "Le numérique soutient {topic} : agendas, rappels, mémos vocaux, rangements nommés. Gardez aussi des routines sans écran pour ne pas tout dépendre d’un appareil.",
      "La motivation varie; ancrez {topic} à des projets qui comptent : famille, bénévolat, musique, langues. Mesurez la régularité plutôt que la perfection.",
      "Réévaluez {topic} après un choc de santé : médicaments nouveaux, infection ou chirurgie peuvent brouiller les idées temporairement. Le contexte évite les conclusions hâtives.",
    ],
  },
};

/** @type {Record<string, Record<'en'|'es'|'fr', { q: string; a: string }[]>>} */
export const FAQ_POOLS = {
  exercises_intent: {
    en: [
      { q: "How often should I practice?", a: "Many people do well with 3–5 short sessions per week rather than one long grind. Stop if you feel dizzy, pained, or overwhelmed." },
      { q: "Can exercises replace medical advice?", a: "No. They complement healthy routines and education. New or worsening symptoms deserve professional evaluation." },
      { q: "Where should I start on this site?", a: "Try the linked screening tool, then sample exercises from the category that matches your goal." },
    ],
    es: [
      { q: "¿Con qué frecuencia practicar?", a: "Suele funcionar 3–5 sesiones cortas por semana en lugar de una sola muy larga. Deténgase si hay mareo, dolor o agobio." },
      { q: "¿Los ejercicios sustituyen al médico?", a: "No. Complementan hábitos saludables y formación. Síntomas nuevos o peores requieren valoración profesional." },
      { q: "¿Por dónde empiezo en este sitio?", a: "Pruebe la herramienta enlazada y luego ejercicios de la categoría que coincida con su objetivo." },
    ],
    fr: [
      { q: "À quelle fréquence s’entraîner ?", a: "Souvent 3 à 5 courtes séances par semaine plutôt qu’un seul marathon. Arrêtez en cas de douleur, vertige ou stress excessif." },
      { q: "Ces exercices remplacent-ils un avis médical ?", a: "Non. Ils complètent l’éducation et le mode de vie. Tout symptôme nouveau ou aggravé mérite un professionnel." },
      { q: "Par où commencer sur ce site ?", a: "Testez l’outil lié, puis des exercices de la catégorie qui correspond à votre objectif." },
    ],
  },
  tests_audience: {
    en: [
      { q: "Are online tests accurate?", a: "They measure performance on specific tasks under specific conditions. Accuracy for diagnosis requires clinical context." },
      { q: "Should kids use the same tests as adults?", a: "Expectations differ by age. Use materials designed for the right developmental level and involve caregivers." },
      { q: "What should I do if scores worry me?", a: "Note patterns over time, list medications and sleep, and schedule an appointment with a qualified clinician." },
    ],
    es: [
      { q: "¿Son fiables las pruebas en línea?", a: "Midieron tareas concretas en condiciones concretas. Diagnosticar exige contexto clínico." },
      { q: "¿Niños y adultos usan lo mismo?", a: "Las expectativas cambian con la edad. Use material adecuado e involucre a responsables." },
      { q: "¿Qué hago si el resultado me preocupa?", a: "Anote patrones en el tiempo, medicación y sueño, y pida cita con un profesional." },
    ],
    fr: [
      { q: "Les tests en ligne sont-ils fiables ?", a: "Ils reflètent une performance sur des consignes précises. Le diagnostic nécessite un contexte clinique." },
      { q: "Les enfants passent-ils les mêmes épreuves que les adultes ?", a: "Les normes diffèrent. Choisissez du matériel adapté et impliquez les adultes référents." },
      { q: "Que faire si le résultat m’inquiète ?", a: "Notez l’évolution, le sommeil et les traitements, puis consultez un professionnel qualifié." },
    ],
  },
  symptoms: {
    en: [
      { q: "When is forgetfulness normal?", a: "Occasional word-finding pauses are common. New problems managing familiar routines deserve attention." },
      { q: "Can anxiety cause brain fog?", a: "Yes. Mood, stress, and sleep strongly affect attention and memory. Treating those factors often helps." },
      { q: "Should I wait before seeing a doctor?", a: "Do not delay if symptoms are sudden, severe, or paired with neurological signs. Otherwise, booking a routine visit is reasonable." },
    ],
    es: [
      { q: "¿Cuándo es normal olvidar?", a: "Pausas ocasionales al recordar una palabra son frecuentes. Dificultad nueva con rutinas habituales merece atención." },
      { q: "¿La ansiedad causa niebla mental?", a: "Sí. Estado de ánimo, estrés y sueño afectan memoria y atención; tratarlos suele ayudar." },
      { q: "¿Debo esperar para ir al médico?", a: "No demore si los síntomas son bruscos, graves o con signos neurológicos. Si no, una visita programada es razonable." },
    ],
    fr: [
      { q: "Quand l’oubli est-il normal ?", a: "Chercher un mot de temps en temps arrive souvent. Perdre des automatismes familiers est plus inquiétant." },
      { q: "L’anxiété peut-elle brouiller les idées ?", a: "Oui. Humeur, stress et sommeil influencent mémoire et attention; les améliorer aide souvent." },
      { q: "Dois-je attendre avant un rendez-vous ?", a: "Non si les symptômes sont brutaux ou neurologiques. Sinon, une consultation planifiée convient." },
    ],
  },
  guides: {
    en: [
      { q: "What is the fastest win for brain health?", a: "Prioritize consistent sleep and regular movement; both have broad evidence and help mood." },
      { q: "Do brain apps work?", a: "They can build skill on trained tasks. Combine them with real-world learning and social activity for balance." },
      { q: "How do I track progress?", a: "Track habits (sleep, steps, sessions) more than single test scores, which naturally fluctuate." },
    ],
    es: [
      { q: "¿Qué cambio ayuda más rápido?", a: "Sueño regular y movimiento frecuente suelen tener amplia evidencia y mejoran el ánimo." },
      { q: "¿Funcionan las apps cerebrales?", a: "Pueden mejorar la tarea entrenada. Combínelas con aprendizaje real y vida social." },
      { q: "¿Cómo mido avances?", a: "Mida hábitos (sueño, pasos, sesiones) más que una sola puntuación, que oscila." },
    ],
    fr: [
      { q: "Le levier le plus rapide ?", a: "Sommeil régulier et mouvement fréquent : forte littérature et effet sur l’humeur." },
      { q: "Les applis cérébrales servent ?", a: "Elles entraînent des tâches précises. Associez-les à des apprentissages réels et à la vie sociale." },
      { q: "Comment suivre mes progrès ?", a: "Suivez les habitudes (sommeil, pas, séances) plutôt qu’un score unique, naturellement variable." },
    ],
  },
};

export const TOOL_URLS = {
  memory: {
    en: "/free-memory-test/",
    es: "/es/prueba-memoria-gratis/",
    fr: "/fr/test-memoire-gratuit/",
  },
  dementia: {
    en: "/dementia-test-online/",
    es: "/es/prueba-demencia/",
    fr: "/fr/test-demence/",
  },
  mini_cog: {
    en: "/mini-cog-test/",
    es: "/es/prueba-mini-cog/",
    fr: "/fr/test-mini-cog/",
  },
  cognitive: {
    en: "/tests/cognitive-health-self-assessment.html",
    es: "/es/prueba-demencia/",
    fr: "/fr/test-demence/",
  },
};

export const TOOL_LABELS = {
  en: {
    memory: "Open free memory tests",
    dementia: "Open dementia screening hub (educational)",
    mini_cog: "Try the Mini-Cog walkthrough",
    cognitive: "Try the cognitive self-assessment (educational)",
  },
  es: {
    memory: "Abrir pruebas de memoria gratuitas",
    dementia: "Abrir hub de tamizaje de demencia (educativo)",
    mini_cog: "Probar Mini-Cog guiado",
    cognitive: "Autoevaluación cognitiva (educativa)",
  },
  fr: {
    memory: "Ouvrir les tests de mémoire gratuits",
    dementia: "Ouvrir le dépistage démence (éducatif)",
    mini_cog: "Essayer le Mini-Cog guidé",
    cognitive: "Auto-évaluation cognitive (éducative)",
  },
};

const EX_HUB = {
  memory: { en: "/brain-exercises/memory/", es: "/es/ejercicios-cerebrales/memoria/", fr: "/fr/exercices-cerebraux/memoire/" },
  attention: { en: "/brain-exercises/attention/", es: "/es/ejercicios-cerebrales/atencion/", fr: "/fr/exercices-cerebraux/attention/" },
  processing: { en: "/brain-exercises/processing-speed/", es: "/es/ejercicios-cerebrales/", fr: "/fr/exercices-cerebraux/" },
  executive: { en: "/brain-exercises/executive-function/", es: "/es/ejercicios-cerebrales/", fr: "/fr/exercices-cerebraux/" },
  visual: { en: "/brain-exercises/visual-spatial/", es: "/es/ejercicios-cerebrales/", fr: "/fr/exercices-cerebraux/" },
};

const EX_ITEMS = {
  memory: {
    en: ["/brain-exercises/memory/memory-word-recall.html", "/brain-exercises/memory/memory-card-match.html", "/brain-exercises/memory/memory-number-sequence.html"],
    es: ["/brain-exercises/memory/memory-word-recall.html", "/brain-exercises/memory/memory-card-match.html", "/brain-exercises/memory/memory-number-sequence.html"],
    fr: ["/brain-exercises/memory/memory-word-recall.html", "/brain-exercises/memory/memory-card-match.html", "/brain-exercises/memory/memory-number-sequence.html"],
  },
  attention: {
    en: ["/brain-exercises/attention/attention-visual-focus.html", "/brain-exercises/attention/attention-pattern-find.html", "/brain-exercises/attention/attention-number-scan.html"],
    es: ["/brain-exercises/attention/attention-visual-focus.html", "/brain-exercises/attention/attention-pattern-find.html", "/brain-exercises/attention/attention-number-scan.html"],
    fr: ["/brain-exercises/attention/attention-visual-focus.html", "/brain-exercises/attention/attention-pattern-find.html", "/brain-exercises/attention/attention-number-scan.html"],
  },
  processing: {
    en: ["/brain-exercises/processing-speed/speed-pattern-match.html", "/brain-exercises/processing-speed/speed-word-recognition.html", "/brain-exercises/processing-speed/speed-color-match.html"],
    es: ["/brain-exercises/processing-speed/speed-pattern-match.html", "/brain-exercises/processing-speed/speed-word-recognition.html", "/brain-exercises/processing-speed/speed-color-match.html"],
    fr: ["/brain-exercises/processing-speed/speed-pattern-match.html", "/brain-exercises/processing-speed/speed-word-recognition.html", "/brain-exercises/processing-speed/speed-color-match.html"],
  },
  executive: {
    en: ["/brain-exercises/executive-function/logic-number-pattern.html", "/brain-exercises/executive-function/logic-rule-switch.html", "/brain-exercises/executive-function/logic-categorization.html"],
    es: ["/brain-exercises/executive-function/logic-number-pattern.html", "/brain-exercises/executive-function/logic-rule-switch.html", "/brain-exercises/executive-function/logic-categorization.html"],
    fr: ["/brain-exercises/executive-function/logic-number-pattern.html", "/brain-exercises/executive-function/logic-rule-switch.html", "/brain-exercises/executive-function/logic-categorization.html"],
  },
  visual: {
    en: ["/brain-exercises/visual-spatial/visual-grid-memory.html", "/brain-exercises/visual-spatial/visual-shape-match.html", "/brain-exercises/visual-spatial/visual-path-follow.html"],
    es: ["/brain-exercises/visual-spatial/visual-grid-memory.html", "/brain-exercises/visual-spatial/visual-shape-match.html", "/brain-exercises/visual-spatial/visual-path-follow.html"],
    fr: ["/brain-exercises/visual-spatial/visual-grid-memory.html", "/brain-exercises/visual-spatial/visual-shape-match.html", "/brain-exercises/visual-spatial/visual-path-follow.html"],
  },
};

const EX_HUB_LABEL = {
  en: { memory: "Memory exercise hub", attention: "Attention exercise hub", processing: "Processing speed hub", executive: "Executive function hub", visual: "Visual-spatial hub" },
  es: { memory: "Hub de memoria", attention: "Hub de atención", processing: "Hub de velocidad", executive: "Hub de función ejecutiva", visual: "Hub visoespacial" },
  fr: { memory: "Hub mémoire", attention: "Hub attention", processing: "Hub vitesse", executive: "Hub exécutif", visual: "Hub visuospatial" },
};

const EX_PAGE_LABEL = {
  en: { memory: ["Word recall exercise", "Card match exercise", "Number sequence exercise"], attention: ["Visual focus exercise", "Pattern find exercise", "Number scan exercise"], processing: ["Pattern match speed", "Word recognition speed", "Color match speed"], executive: ["Number pattern logic", "Rule switch logic", "Categorization logic"], visual: ["Grid memory", "Shape match", "Path follow"] },
  es: { memory: ["Ejercicio de palabras", "Ejercicio de cartas", "Ejercicio de números"], attention: ["Enfoque visual", "Buscar patrones", "Barrido numérico"], processing: ["Patrones rápidos", "Reconocimiento de palabras", "Colores rápidos"], executive: ["Patrones numéricos", "Cambio de reglas", "Categorías"], visual: ["Cuadrícula visual", "Formas", "Seguir camino"] },
  fr: { memory: ["Rappel de mots", "Cartes assorties", "Suite de nombres"], attention: ["Focus visuel", "Repérer motifs", "Repérage de chiffres"], processing: ["Motifs rapides", "Mots rapides", "Couleurs rapides"], executive: ["Motifs logiques", "Changement de règle", "Catégories"], visual: ["Grille visuelle", "Formes", "Suivre un trajet"] },
};

export function exerciseBlock(cat, lang) {
  const c = EX_ITEMS[cat] ? cat : "memory";
  const L = lang === "es" || lang === "fr" ? lang : "en";
  const urls = EX_ITEMS[c][L];
  const labels = EX_PAGE_LABEL[L][c];
  return {
    hub: EX_HUB[c][L],
    hubLabel: EX_HUB_LABEL[L][c],
    ex1: urls[0],
    ex1Label: labels[0],
    ex2: urls[1],
    ex2Label: labels[1],
    ex3: urls[2],
    ex3Label: labels[2],
  };
}
