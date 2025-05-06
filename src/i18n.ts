import { createI18n } from 'vue-i18n'


const messages = {

  // English translations (defa7ult)
  en: {
    navbar: {
      login: 'Login',
      register: 'Register',
    },
    landingPage: {
      appName: 'CAA Communication',
      appTagline: 'Connecting people, empowering communication',
      dictionary: 'Dictionary',
      whatIsCAA: 'What is CAA Communication?',
      whatIsCAADescription: 'CAA Communication is a platform designed to enhance communication and collaboration...',
      howItWorks: 'How the Website Works',
      howItWorksDescription: 'Our website is built to be user-friendly and efficient...',
      projectGoals: 'Our Project Goals',
      projectGoalsDescription: 'At CAA Communication, we aim to revolutionize the way people interact...',
    },
    creditsPage: {
      poweredBy: 'Powered by IIS Volta Lodi',
      meetTheTeam: 'Meet the Dev Team:',
      teamDescription: 'The minds behind ComuniCAA',
      teamMembers: {
        mirko: {
          name: 'Mirko Virtuani',
          description: 'Hi, I\'m Mirko Virtuani, a student at IIS Volta Lodi...',
        },
        lorenzo: {
          name: 'Lorenzo Battista',
          description: 'Hi, I\'m Lorenzo Battista, a student at IIS Volta Lodi...',
        },
      },
    },
    footer: {
      footerText: 'ComuniCAA. All rights reserved.',
    },
    loginPage: {
      title: 'Login',
      emailLabel: 'Email Address',
      emailPlaceholder: 'Enter your email',
      passwordLabel: 'Password',
      passwordPlaceholder: 'Enter your password',
      loggingIn: 'Logging in...',
      loginButton: 'Login',
      noAccount: "Don't have an account?",
      signUpLink: 'Sign up',
    },
    registrationPage: {
      title: 'Create Your Account',
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
      alreadyHaveAccount: 'Already have an account?',
      loginLink: 'Login',
    },
    homePage: {
      title: 'Welcome to ComuniCAA',
      cards: {
        speak: 'Speak',
        dictionary: 'Dictionary',
        games: 'Games',
      },
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
      dictionary: 'Dizionario',
      whatIsCAA: 'Che cos\'è la Comunicazione CAA?',
      whatIsCAADescription: 'La Comunicazione CAA è una piattaforma progettata per migliorare la comunicazione...',
      howItWorks: 'Come funziona il sito web',
      howItWorksDescription: 'Il nostro sito è progettato per essere intuitivo ed efficiente...',
      projectGoals: 'I nostri obiettivi',
      projectGoalsDescription: 'Alla Comunicazione CAA, miriamo a rivoluzionare il modo in cui le persone interagiscono...',
    },
    creditsPage: {
      poweredBy: 'Realizzato da IIS Volta Lodi',
      meetTheTeam: 'Incontra il Team di Sviluppo:',
      teamDescription: 'Le menti dietro ComuniCAA',
      teamMembers: {
        mirko: {
          name: 'Mirko Virtuani',
          description: 'Ciao, sono Mirko Virtuani, uno studente dell\'IIS Volta Lodi...',
        },
        lorenzo: {
          name: 'Lorenzo Battista',
          description: 'Ciao, sono Lorenzo Battista, uno studente dell\'IIS Volta Lodi...',
        },
      },
    },
    footer: {
      footerText: 'ComuniCAA. Tutti i diritti riservati.',
    },
    loginPage: {
      title: 'Accedi',
      emailLabel: 'Indirizzo Email',
      emailPlaceholder: 'Inserisci la tua email',
      passwordLabel: 'Password',
      passwordPlaceholder: 'Inserisci la tua password',
      loggingIn: 'Accesso in corso...',
      loginButton: 'Accedi',
      noAccount: 'Non hai un account?',
      signUpLink: 'Registrati',
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
  },
}

// Create the i18n instance
const i18n = createI18n({
  locale: 'en', // Default language
  fallbackLocale: 'en', // Fallback language
  messages,
})

export default i18n
