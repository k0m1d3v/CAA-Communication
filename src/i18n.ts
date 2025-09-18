import { createI18n } from 'vue-i18n'

const messages = {
  // English translations (default)
  en: {
    common: {
      backToHome: 'Back to Home',
      goBack: 'Go Back',
      switchLanguage: 'Switch language',
      educationalProject: 'Educational Project by IIS Volta Lodi',
      freeToUse: 'Free to use forever',
    },
    navbar: {
      login: 'Login',
      register: 'Register',
    },
    landingPage: {
      appName: 'CAA Communication',
      appTagline: 'Connecting people, empowering communication',
      heroTitle: 'Augmentative Communication for Everyone',
      heroSubtitle: 'A FREE educational platform for AAC, developed by IIS Volta Lodi students to support people with communication difficulties through symbols and pictograms.',
      freeBadge: '🎓 School Project • 100% Free • No Ads',
      exploreNoRegister: '📖 Explore Without Registration',
      accessFreely: '🚀 Access For Free',
      stats: {
        symbols: '1000+ Free Symbols',
        categories: '15+ Categories',
        price: '0€',
        alwaysFree: 'Always Free'
      },
      whatIsCAA: {
        title: 'What is AAC?',
        subtitle: 'Augmentative and Alternative Communication is a methodology that supports people with communication difficulties',
        forWho: {
          title: 'For Who?',
          description: 'People with autism, intellectual disabilities, language disorders, aphasia, cerebral palsy, and other conditions that limit verbal communication.'
        },
        howItWorks: {
          title: 'How Does it Work?',
          description: 'Uses symbols, images, gestures, technological devices, and other tools to facilitate expression and understanding.'
        },
        whyImportant: {
          title: 'Why is it Important?',
          description: 'Increases autonomy, improves social relationships, and reduces frustration related to communication difficulties.'
        }
      },
      features: {
        title: 'Platform Features',
        subtitle: 'Free educational tools to improve communication',
        facilitatedCommunication: {
          title: 'Facilitated Communication',
          description: 'Symbols, pictograms, and tools to facilitate expression'
        },
        visualDictionary: {
          title: 'Visual Dictionary',
          description: 'Large collection of symbols organized by categories'
        },
        playfulLearning: {
          title: 'Playful Learning',
          description: 'Educational games to improve communication skills'
        },
        progressTracking: {
          title: 'Progress Tracking',
          description: 'Monitor improvements over time'
        }
      },
      benefits: {
        title: 'Who Can Benefit?',
        subtitle: 'An open and free project for the community',
        disabilities: {
          title: 'For people with disabilities',
          description: 'Free resources for those with verbal language difficulties'
        },
        educators: {
          title: 'For educators and therapists',
          description: 'Open educational tools for rehabilitation'
        },
        families: {
          title: 'For families',
          description: 'Free support to improve communication at home'
        }
      },
      about: {
        title: 'An Educational Project',
        description: 'ComuniCAA was born as a didactic project of IIS Volta Lodi students to support the community in learning Augmentative and Alternative Communication.',
        features: {
          schoolProject: 'School project',
          completelyFree: 'Completely free',
          openSource: 'Open source',
          noAds: 'No ads'
        },
        school: {
          name: 'IIS Volta Lodi',
          motto: 'Innovation for Accessibility'
        }
      },
      cta: {
        title: 'Start Exploring AAC',
        description: 'A school project dedicated to augmentative alternative communication. Created by students, for the community. Completely free, always.',
        primary: 'Access For Free',
        secondary: 'Explore Now'
      },
      footer: {
        links: {
          aboutUs: 'About Us',
          login: 'Login',
          register: 'Register'
        },
        copyright: '© 2025 ComuniCAA - Free educational project by IIS Volta Lodi'
      }
    },
    creditsPage: {
      poweredBy: 'Powered by IIS Volta Lodi',
      meetTheTeam: 'Meet the Dev Team:',
      teamDescription: 'The minds behind ComuniCAA',
      teamMembers: {
        mirko: {
          name: 'Mirko Virtuani',
          description: "Hi, I'm Mirko Virtuani, a student at IIS Volta Lodi...",
        },
        lorenzo: {
          name: 'Lorenzo Battista',
          description: "Hi, I'm Lorenzo Battista, a student at IIS Volta Lodi...",
        },
        francesco: {
          name: 'Francesco Fava',
          description: "Hi, I'm Francesco Fava, a student at IIS Volta Lodi...",
        },
        arlan: {
          name: 'Arlan Apenov',
          description: "Hi, I'm Arlan Apenov, a student at IIS Volta Lodi...",
        },
      },
    },
    footer: {
      footerText: 'ComuniCAA. All rights reserved.',
    },
    loginPage: {
      title: 'Welcome Back',
      subtitle: 'Sign in to continue using ComuniCAA',
      emailLabel: 'Email Address',
      emailPlaceholder: 'Enter your email',
      passwordLabel: 'Password',
      passwordPlaceholder: 'Enter your password',
      forgotPassword: 'Forgot your password?',
      loggingIn: 'Signing in...',
      loginButton: 'Sign In',
      noAccount: "Don't have an account?",
      signUpLink: 'Sign up for free',
      error: {
        invalidEmail: 'Invalid email address',
        wrongPassword: 'Incorrect password',
        userNotFound: 'No account found with this email',
        tooManyAttempts: 'Too many sign in attempts. Please try again later',
        default: 'An error occurred during sign in'
      }
    },
    registrationPage: {
      title: 'Create Your Account',
      subtitle: 'Join our community and start communicating better',
      nameLabel: 'Full Name',
      namePlaceholder: 'Enter your full name',
      emailLabel: 'Email Address',
      emailPlaceholder: 'Enter your email',
      passwordLabel: 'Password',
      passwordPlaceholder: 'Enter your password',
      confirmPasswordLabel: 'Confirm Password',
      confirmPasswordPlaceholder: 'Confirm your password',
      passwordMismatch: 'Passwords do not match',
      registerButton: 'Register',
      registering: 'Creating your account...',
      alreadyHaveAccount: 'Already have an account?',
      loginLink: 'Login',
      error: {
        emailInUse: 'Email already in use',
        invalidEmail: 'Invalid email address',
        weakPassword: 'Password is too weak',
        default: 'An error occurred during registration'
      }
    },
    homePage: {
      title: 'Welcome to ComuniCAA',
      cards: {
        speak: 'Speak',
        dictionary: 'Dictionary',
        games: 'Games',
      },
    },
    dictionaryPrePage: {
      title: 'Dictionary',
      card1: 'Fast Response',
      card2: 'Dictionary',
    },
    dictionaryPage: {
      searchPlaceholder: 'Search for a word...',
      SelectedPictogram: 'Selected Pictograms',
      clearButton: 'Clear All',
      noTitle: 'No title',
      noResults: 'No results found',
      title: 'Dictionary',
      subtitle: 'Search and discover pictograms',
      emptyStateTitle: 'Start your search',
      emptyStateDescription: 'Use the search bar above to find pictograms',
      saveButton: 'Save Phrase',
      item: 'item',
      items: 'items',
      enterPhraseNamePrompt: 'Enter a name for this phrase:',
      searchLanguage: 'Search Language',
      bothLanguages: 'Both Languages',
    },
    imparaPage: {
      subtitle: 'Learn AAC Communication through fun games',
      welcomeTitle: 'Welcome to the Learning Game!',
      welcomeDescription:
        'Guess the meaning of pictograms to improve your AAC communication skills. Each correct answer increases your score!',
      startButton: 'Start Learning',
      score: 'Score',
      loading: 'Loading new pictogram...',
      pictogramAlt: 'Pictogram to guess',
      guessPrompt: 'What does this pictogram represent?',
      inputPlaceholder: 'Enter your guess...',
      submitButton: 'Submit Guess',
      correct: 'Correct! Well done!',
      incorrect: 'Incorrect, try again.',
      skipButton: 'Skip',
      quitButton: 'Quit Game',
      noDataFound: 'No data found. Please try again.',
      loadError: 'Error loading pictogram. Please try again.',
    },
    nologPage: {
      subtitle: 'Explore AAC communication tools without registration',
      quickResponsesTitle: 'Quick Responses',
      quickResponsesDescription:
        'Access pre-built phrases and common responses for immediate communication needs.',
      dictionaryTitle: 'Visual Dictionary',
      dictionaryDescription:
        'Browse and search through our extensive collection of AAC pictograms and symbols.',
      featuresTitle: 'Available Features',
      feature1: 'Browse pictograms without account',
      feature2: 'Quick response phrases',
      feature3: 'Visual communication tools',
      feature4: 'Accessible interface',
    },
    notFoundPage: {
      title: '404 - Page Not Found',
      subtitle: 'Sorry, the page you are looking for does not exist.',
      backToHome: 'Back to Home',
      goBack: 'Go Back',
      helpfulLinksTitle: 'Helpful Links',
      loginLink: 'Login',
      creditsLink: 'About Us',
      footerMessage: 'ComuniCAA - Free educational project',
    },
    logoutTransitioner: {
      title: 'Logging out...',
      complete: 'Logout Complete',
      starting: 'Starting logout process...',
      clearing: 'Clearing session data...',
      saving: 'Saving your preferences...',
      finalizing: 'Finalizing logout...',
      redirecting: 'Redirecting to login...',
      success: 'Successfully logged out!',
      error: 'Error during logout',
      footer: 'Thank you for using ComuniCAA',
    },
    accessibility: {
      togglePanel: 'Toggle accessibility panel',
      panelTitle: 'Accessibility Settings',
      close: 'Close',
      fontSize: 'Font Size',
      highContrast: 'High Contrast Mode',
      reducedMotion: 'Reduce Motion',
      textToSpeech: 'Text to Speech',
      reset: 'Reset to Default',
    },
    helpNavigator: {
      toggleHelp: 'Toggle help menu',
      help: 'Help',
      assistanceCenter: 'Assistance Center',
      quickActions: 'Quick Actions',
      emergency: 'Emergency',
      tutorial: 'Tutorial',
      textToSpeech: 'Text to Speech',
      listening: 'Listening...',
      accessibility: 'Accessibility',
      fastResponses: 'Fast Responses',
      helpTopics: 'Help Topics',
      emergencyPhrases: 'Emergency Phrases',
      tutorialMessage: 'Tutorial will be available soon!',
      topics: {
        caa: 'What is AAC?',
        pictograms: 'Using Pictograms',
        navigation: 'Site Navigation',
        voice: 'Voice Features',
        accessibility: 'Accessibility Options',
      },
      topicContent: {
        caa: 'AAC (Augmentative and Alternative Communication) helps people who have difficulty with speech communication.',
        pictograms:
          'Pictograms are visual symbols that represent words, concepts, or actions to facilitate communication.',
        navigation:
          'Navigate the site using the menu, search functions, and accessibility features.',
        voice: 'Use text-to-speech features by clicking the voice button or selecting text.',
        accessibility:
          'Customize your experience with font size, contrast, and motion preferences.',
      },
      steps: {
        caa: {
          0: 'Learn about AAC communication principles',
          1: 'Practice with pictograms and symbols',
          2: 'Build your communication skills gradually',
        },
        pictograms: {
          0: 'Browse the pictogram dictionary',
          1: 'Select pictograms to build phrases',
          2: 'Save frequently used combinations',
          3: 'Use voice synthesis to speak phrases',
        },
        navigation: {
          0: 'Use the main menu to access different sections',
          1: 'Try keyboard shortcuts for quick navigation',
          2: 'Enable accessibility features as needed',
        },
        voice: {
          0: 'Click the voice button to activate text-to-speech',
          1: 'Select any text on the page to have it read aloud',
        },
        accessibility: {
          0: 'Open the accessibility panel',
          1: 'Adjust font size for better readability',
          2: 'Enable high contrast mode if needed',
          3: 'Turn on reduced motion to minimize animations',
        },
      },
      emergencyPhrasesList: {
        help: 'I need help',
        doctor: 'I need a doctor',
        water: 'I am thirsty, I would like water',
        bathroom: 'I need to go to the bathroom',
        pain: 'I am in pain',
        home: 'I want to go home',
      },
      noSavedPhrases: 'No saved phrases yet',
      createFirstPhrase: 'Create your first phrase',
      createNewPhrase: 'Create new phrase',
      pictograms: 'pictograms',
      usePhrase: 'Use this phrase in dictionary',
      speakPhrase: 'Speak this phrase',
      use: 'Use',
      speak: 'Speak',
    },
    quickResponsesPage: {
      title: 'Fast Responses',
      subtitle: 'Access your saved phrases quickly for faster communication',
      usePhrase: 'Use Phrase',
      speak: 'Speak',
      edit: 'Edit',
      delete: 'Delete',
      noSavedPhrasesTitle: 'No saved phrases yet',
      noSavedPhrases: 'Start creating phrases in the dictionary to access them quickly here',
      createFirstPhrase: 'Create your first phrase',
      educationalNote:
        'Fast responses help you communicate more quickly by saving frequently used phrases.',
      speechNotSupported: 'Speech synthesis is not supported in this browser',
      confirmDelete: 'Are you sure you want to delete the phrase "{name}"?',
      enterNewName: 'Enter new name for the phrase:',
    },
    toastNotifications: {
      success: 'Success!',
      error: 'Error!',
      warning: 'Warning!',
      info: 'Information',
      close: 'Close',
    },
  },

  // Italian translations
  it: {
    navbar: {
      login: 'Accedi',
      register: 'Registrati',
    },
    landingPage: {
      appName: 'Comunicazione CAA',
      appTagline: 'Collegare le persone, potenziare la comunicazione',
      heroTitle: 'Comunicazione Aumentativa per Tutti',
      heroSubtitle: 'Una piattaforma educativa GRATUITA per la CAA, sviluppata dagli studenti dell\'IIS Volta Lodi per supportare persone con difficoltà comunicative attraverso simboli e pittogrammi.',
      freeBadge: '🎓 Progetto Scolastico • 100% Gratuito • No Pubblicità',
      exploreNoRegister: '📖 Esplora Senza Registrarti',
      accessFreely: '🚀 Accedi Gratuitamente',
      stats: {
        symbols: '1000+ Simboli Gratuiti',
        categories: '15+ Categorie',
        price: '0€',
        alwaysFree: 'Sempre Gratis'
      },
      whatIsCAA: {
        title: 'Cos\'è la CAA?',
        subtitle: 'La Comunicazione Aumentativa Alternativa è una metodologia che supporta le persone con difficoltà comunicative',
        forWho: {
          title: 'Per Chi?',
          description: 'Persone con autismo, disabilità intellettive, disturbi del linguaggio, afasia, paralisi cerebrale e altre condizioni che limitano la comunicazione verbale.'
        },
        howItWorks: {
          title: 'Come Funziona?',
          description: 'Utilizza simboli, immagini, gesti, dispositivi tecnologici e altri strumenti per facilitare l\'espressione e la comprensione.'
        },
        whyImportant: {
          title: 'Perché è Importante?',
          description: 'Aumenta l\'autonomia, migliora le relazioni sociali e riduce la frustrazione legata alle difficoltà comunicative.'
        }
      },
      features: {
        title: 'Funzionalità della Piattaforma',
        subtitle: 'Strumenti educativi gratuiti per migliorare la comunicazione',
        facilitatedCommunication: {
          title: 'Comunicazione Facilitata',
          description: 'Simboli, pittogrammi e strumenti per facilitare l\'espressione'
        },
        visualDictionary: {
          title: 'Dizionario Visivo',
          description: 'Ampia raccolta di simboli organizzati per categorie'
        },
        playfulLearning: {
          title: 'Apprendimento Ludico',
          description: 'Giochi educativi per migliorare le competenze comunicative'
        },
        progressTracking: {
          title: 'Tracciamento Progressi',
          description: 'Monitora i miglioramenti nel tempo'
        }
      },
      benefits: {
        title: 'Chi Può Beneficiarne?',
        subtitle: 'Un progetto aperto e gratuito per la comunità',
        disabilities: {
          title: 'Per persone con disabilità',
          description: 'Risorse gratuite per chi ha difficoltà nel linguaggio verbale'
        },
        educators: {
          title: 'Per educatori e terapisti',
          description: 'Strumenti educativi aperti per la riabilitazione'
        },
        families: {
          title: 'Per famiglie',
          description: 'Supporto gratuito per migliorare la comunicazione in casa'
        }
      },
      about: {
        title: 'Un Progetto Educativo',
        description: 'ComuniCAA nasce come progetto didattico degli studenti dell\'IIS Volta Lodi per supportare la comunità nell\'apprendimento della Comunicazione Aumentativa Alternativa.',
        features: {
          schoolProject: 'Progetto scolastico',
          completelyFree: 'Completamente gratuito',
          openSource: 'Open source',
          noAds: 'Senza pubblicità'
        },
        school: {
          name: 'IIS Volta Lodi',
          motto: 'Innovazione per l\'Accessibilità'
        }
      },
      cta: {
        title: 'Inizia ad Esplorare la CAA',
        description: 'Un progetto scolastico dedicato alla comunicazione aumentativa alternativa. Creato dagli studenti, per la comunità. Completamente gratuito, sempre.',
        primary: 'Accedi Gratuitamente',
        secondary: 'Esplora Subito'
      },
      footer: {
        links: {
          aboutUs: 'Chi Siamo',
          login: 'Accedi',
          register: 'Registrati'
        },
        copyright: '© 2025 ComuniCAA - Progetto educativo gratuito dell\'IIS Volta Lodi'
      }
    },
    creditsPage: {
      poweredBy: 'Realizzato da IIS Volta Lodi',
      meetTheTeam: 'Incontra il Team di Sviluppo:',
      teamDescription: 'Le menti dietro ComuniCAA',
      teamMembers: {
        mirko: {
          name: 'Mirko Virtuani',
          description: "Ciao, sono Mirko Virtuani, uno studente dell'IIS Volta Lodi...",
        },
        lorenzo: {
          name: 'Lorenzo Battista',
          description: "Ciao, sono Lorenzo Battista, uno studente dell'IIS Volta Lodi...",
        },
        francesco: {
          name: 'Francesco Fava',
          description: "Ciao, sono Francesco Fava, uno studente dell'IIS Volta Lodi...",
        },
        arlan: {
          name: 'Arlan Apenov',
          description: "Ciao, sono Arlan Apenov, uno studente dell'IIS Volta Lodi...",
        },
      },
    },
    footer: {
      footerText: 'ComuniCAA. Tutti i diritti riservati.',
    },
    loginPage: {
      title: 'Bentornato',
      subtitle: 'Accedi per continuare a usare ComuniCAA',
      emailLabel: 'Indirizzo Email',
      emailPlaceholder: 'Inserisci la tua email',
      passwordLabel: 'Password',
      passwordPlaceholder: 'Inserisci la tua password',
      forgotPassword: 'Password dimenticata?',
      loggingIn: 'Accesso in corso...',
      loginButton: 'Accedi',
      noAccount: 'Non hai un account?',
      signUpLink: 'Registrati gratuitamente',
      error: {
        invalidEmail: 'Indirizzo email non valido',
        wrongPassword: 'Password errata',
        userNotFound: 'Nessun account trovato con questa email',
        tooManyAttempts: 'Troppi tentativi di accesso. Riprova più tardi',
        default: 'Si è verificato un errore durante l\'accesso'
      }
    },
    registrationPage: {
      title: 'Crea il tuo account',
      nameLabel: 'Nome completo',
      namePlaceholder: 'Inserisci il tuo nome completo',
      emailLabel: 'Indirizzo email',
      emailPlaceholder: 'Inserisci il tuo indirizzo email',
      passwordLabel: 'Password',
      passwordPlaceholder: 'Inserisci la tua password',
      confirmPasswordLabel: 'Conferma Password',
      confirmPasswordPlaceholder: 'Conferma la tua password',
      passwordMismatch: 'Le password non corrispondono',
      registerButton: 'Registrati',
      alreadyHaveAccount: 'Hai già un account?',
      loginLink: 'Accedi',
    },
    homePage: {
      title: 'Benvenuto su ComuniCAA',
      cards: {
        speak: 'Parliamo',
        dictionary: 'Dizionario',
        games: 'Giochi',
      },
    },
    dictionaryPrePage: {
      title: 'Dizionario',
      card1: 'Risposta Veloce',
      card2: 'Dizionario',
    },
    dictionaryPage: {
      searchPlaceholder: 'Cerca una parola...',
      SelectedPictogram: 'Pittogramma Selezionati',
      clearButton: 'Cancella Tutto',
      noTitle: 'Nessun titolo',
      noResults: 'Nessun risultato trovato',
      title: 'Dizionario',
      subtitle: 'Cerca e scopri i pittogrammi',
      emptyStateTitle: 'Inizia la tua ricerca',
      emptyStateDescription: 'Usa la barra di ricerca sopra per trovare i pittogrammi',
      saveButton: 'Salva Frase',
      item: 'elemento',
      items: 'elementi',
      enterPhraseNamePrompt: 'Inserisci un nome per questa frase:',
      searchLanguage: 'Lingua di Ricerca',
      bothLanguages: 'Entrambe le Lingue',
    },
    imparaPage: {
      subtitle: 'Impara la Comunicazione CAA divertendoti',
      welcomeTitle: 'Benvenuto nel Gioco di Apprendimento!',
      welcomeDescription:
        'Indovina il significato dei pittogrammi per migliorare le tue competenze di comunicazione CAA. Ogni risposta corretta aumenta il tuo punteggio!',
      startButton: 'Inizia ad Imparare',
      score: 'Punteggio',
      loading: 'Caricamento nuovo pittogramma...',
      pictogramAlt: 'Pittogramma da indovinare',
      guessPrompt: 'Cosa rappresenta questo pittogramma?',
      inputPlaceholder: 'Inserisci la tua risposta...',
      submitButton: 'Invia Risposta',
      correct: 'Corretto! Bravo!',
      incorrect: 'Sbagliato, riprova.',
      skipButton: 'Salta',
      quitButton: 'Esci dal Gioco',
      noDataFound: 'Nessun dato trovato. Riprova.',
      loadError: 'Errore nel caricamento del pittogramma. Riprova.',
    },
    nologPage: {
      subtitle: 'Esplora gli strumenti di comunicazione CAA senza registrazione',
      quickResponsesTitle: 'Risposte Rapide',
      quickResponsesDescription:
        'Accedi a frasi pre-costruite e risposte comuni per esigenze di comunicazione immediate.',
      dictionaryTitle: 'Dizionario Visivo',
      dictionaryDescription:
        'Sfoglia e cerca nella nostra vasta collezione di pittogrammi e simboli CAA.',
      featuresTitle: 'Funzionalità Disponibili',
      feature1: 'Sfoglia pittogrammi senza account',
      feature2: 'Frasi di risposta rapida',
      feature3: 'Strumenti di comunicazione visiva',
      feature4: 'Interfaccia accessibile',
    },
    notFoundPage: {
      title: '404 - Pagina Non Trovata',
      subtitle: 'Spiacente, la pagina che stai cercando non esiste.',
      backToHome: 'Torna alla Home',
      goBack: 'Torna Indietro',
      helpfulLinksTitle: 'Link Utili',
      loginLink: 'Accedi',
      creditsLink: 'Chi Siamo',
      footerMessage: 'ComuniCAA - Progetto educativo gratuito',
    },
    logoutTransitioner: {
      title: 'Disconnessione in corso...',
      complete: 'Disconnessione Completata',
      starting: 'Avvio processo di disconnessione...',
      clearing: 'Cancellazione dati sessione...',
      saving: 'Salvataggio preferenze...',
      finalizing: 'Finalizzazione disconnessione...',
      redirecting: 'Reindirizzamento al login...',
      success: 'Disconnessione avvenuta con successo!',
      error: 'Errore durante la disconnessione',
      footer: 'Grazie per aver usato ComuniCAA',
    },
    accessibility: {
      togglePanel: 'Apri/chiudi pannello accessibilità',
      panelTitle: 'Impostazioni Accessibilità',
      close: 'Chiudi',
      fontSize: 'Dimensione Font',
      highContrast: 'Modalità Alto Contrasto',
      reducedMotion: 'Riduci Animazioni',
      textToSpeech: 'Sintesi Vocale',
      reset: 'Ripristina Predefinite',
    },
    helpNavigator: {
      toggleHelp: 'Apri/chiudi menu aiuto',
      help: 'Aiuto',
      assistanceCenter: 'Centro Assistenza',
      quickActions: 'Azioni Rapide',
      emergency: 'Emergenza',
      tutorial: 'Tutorial',
      textToSpeech: 'Sintesi Vocale',
      listening: 'In ascolto...',
      accessibility: 'Accessibilità',
      fastResponses: 'Risposte Rapide',
      helpTopics: 'Argomenti di Aiuto',
      emergencyPhrases: 'Frasi di Emergenza',
      tutorialMessage: 'Il tutorial sarà disponibile presto!',
      topics: {
        caa: "Cos'è la CAA?",
        pictograms: 'Usare i Pittogrammi',
        navigation: 'Navigazione del Sito',
        voice: 'Funzioni Vocali',
        accessibility: 'Opzioni di Accessibilità',
      },
      topicContent: {
        caa: 'La CAA (Comunicazione Aumentativa e Alternativa) aiuta le persone che hanno difficoltà nella comunicazione verbale.',
        pictograms:
          'I pittogrammi sono simboli visivi che rappresentano parole, concetti o azioni per facilitare la comunicazione.',
        navigation:
          'Naviga nel sito usando il menu, le funzioni di ricerca e le caratteristiche di accessibilità.',
        voice:
          'Usa le funzioni di sintesi vocale cliccando il pulsante voce o selezionando il testo.',
        accessibility:
          'Personalizza la tua esperienza con le preferenze di dimensione font, contrasto e movimento.',
      },
      steps: {
        caa: {
          0: 'Impara i principi della comunicazione CAA',
          1: 'Esercitati con pittogrammi e simboli',
          2: 'Sviluppa gradualmente le tue competenze comunicative',
        },
        pictograms: {
          0: 'Sfoglia il dizionario dei pittogrammi',
          1: 'Seleziona pittogrammi per costruire frasi',
          2: 'Salva le combinazioni usate frequentemente',
          3: 'Usa la sintesi vocale per pronunciare le frasi',
        },
        navigation: {
          0: 'Usa il menu principale per accedere alle diverse sezioni',
          1: 'Prova le scorciatoie da tastiera per la navigazione rapida',
          2: 'Abilita le funzioni di accessibilità se necessario',
        },
        voice: {
          0: 'Clicca il pulsante voce per attivare la sintesi vocale',
          1: 'Seleziona qualsiasi testo nella pagina per farlo leggere ad alta voce',
        },
        accessibility: {
          0: 'Apri il pannello di accessibilità',
          1: 'Regola la dimensione del font per una migliore leggibilità',
          2: 'Abilita la modalità alto contrasto se necessario',
          3: 'Attiva la riduzione del movimento per minimizzare le animazioni',
        },
      },
      emergencyPhrasesList: {
        help: 'Ho bisogno di aiuto',
        doctor: 'Ho bisogno di un dottore',
        water: "Ho sete, vorrei dell'acqua",
        bathroom: 'Devo andare in bagno',
        pain: 'Ho dolore',
        home: 'Voglio andare a casa',
      },
      noSavedPhrases: 'Nessuna frase salvata ancora',
      createFirstPhrase: 'Crea la tua prima frase',
      createNewPhrase: 'Crea nuova frase',
      pictograms: 'pittogrammi',
      usePhrase: 'Usa questa frase nel dizionario',
      speakPhrase: 'Pronuncia questa frase',
      use: 'Usa',
      speak: 'Pronuncia',
    },
    quickResponsesPage: {
      title: 'Risposte Rapide',
      subtitle: 'Accedi rapidamente alle tue frasi salvate per una comunicazione più veloce',
      usePhrase: 'Usa Frase',
      speak: 'Pronuncia',
      edit: 'Modifica',
      delete: 'Elimina',
      noSavedPhrasesTitle: 'Nessuna frase salvata ancora',
      noSavedPhrases: 'Inizia a creare frasi nel dizionario per accedervi rapidamente qui',
      createFirstPhrase: 'Crea la tua prima frase',
      educationalNote:
        'Le risposte rapide ti aiutano a comunicare più velocemente salvando frasi usate frequentemente.',
      speechNotSupported: 'La sintesi vocale non è supportata in questo browser',
      confirmDelete: 'Sei sicuro di voler eliminare la frase "{name}"?',
      enterNewName: 'Inserisci il nuovo nome per la frase:',
    },
    toastNotifications: {
      success: 'Successo!',
      error: 'Errore!',
      warning: 'Attenzione!',
      info: 'Informazione',
      close: 'Chiudi',
    },
  },
}

// Create the i18n instance
const i18n = createI18n({
  locale: 'en', // Default language
  fallbackLocale: 'en', // Fallback language
  messages,
})

export default i18n
