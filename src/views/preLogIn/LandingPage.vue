<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useLanguageStore } from '../../stores/languageStore'
import { computed, watch } from 'vue'

const { t } = useI18n()
const languageStore = useLanguageStore()

// Language switcher inline
const currentLanguage = computed(() => languageStore.language)

const toggleLanguage = () => {
  const newLang = currentLanguage.value === 'en' ? 'it' : 'en'
  languageStore.setLanguage(newLang)

  // Piccolo feedback visivo
  const selector = document.querySelector('.language-selector') as HTMLElement
  if (selector) {
    selector.style.transform = 'scale(1.05)'
    setTimeout(() => {
      selector.style.transform = 'scale(1)'
    }, 150)
  }
}

// Aggiorna il titolo della pagina quando cambia la lingua
watch(
  currentLanguage,
  (newLang) => {
    const titles = {
      en: 'ComuniCAA - AAC Communication Platform',
      it: 'ComuniCAA - Piattaforma CAA Gratuita',
    } as const
    document.title = titles[newLang as keyof typeof titles] || titles.it
  },
  { immediate: true },
)

// Caratteristiche principali della piattaforma CAA



</script>

<template>
  <!-- Landing Page moderna per CAA Communication -->
  <div class="caa-landing">
    <!-- Hero Section -->
    <section class="hero-section">
      <!-- Navigation Bar -->
      <nav class="navigation-bar">
        <div class="nav-container">
          <div class="nav-brand">
            <img src="@/assets/icons/icon.png" alt="CAA Communication" class="nav-logo" />
            <span class="nav-title">ComuniCAA</span>
          </div>

          <div class="nav-center">
            <div class="nav-language-switch">
              <!-- Language Switcher Custom -->
              <div
                class="language-selector"
                :data-current-lang="currentLanguage === 'en' ? 'English' : 'Italiano'"
              >
                <!-- Bandiera USA -->
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 640 480"
                  class="flag-icon"
                  :class="{
                    'flag-active': currentLanguage === 'en',
                    'flag-inactive': currentLanguage !== 'en',
                  }"
                >
                  <rect width="640" height="480" fill="#b22234" />
                  <path
                    fill="#fff"
                    d="M0 37.5h640v37.5H0zM0 112.5h640v37.5H0zM0 187.5h640v37.5H0zM0 262.5h640v37.5H0zM0 337.5h640v37.5H0zM0 412.5h640v37.5H0z"
                  />
                  <path fill="#3c3b6e" d="M0 0h280v210H0z" />
                </svg>

                <!-- Toggle Switch -->
                <button
                  @click="toggleLanguage"
                  class="language-toggle"
                  :aria-label="currentLanguage === 'en' ? 'Switch to Italian' : 'Switch to English'"
                >
                  <span
                    class="toggle-slider"
                    :class="{
                      'toggle-right': currentLanguage === 'it',
                      'toggle-left': currentLanguage === 'en',
                    }"
                  ></span>
                </button>

                <!-- Bandiera Italia -->
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 640 480"
                  class="flag-icon"
                  :class="{
                    'flag-active': currentLanguage === 'it',
                    'flag-inactive': currentLanguage !== 'it',
                  }"
                >
                  <g fill-rule="evenodd" stroke-width="1pt">
                    <path fill="#fff" d="M0 0h640v480H0z" />
                    <path fill="#009246" d="M0 0h213.33v480H0z" />
                    <path fill="#ce2b37" d="M426.67 0H640v480H426.67z" />
                  </g>
                </svg>
              </div>
            </div>
          </div>

          <div class="nav-actions">
            <router-link to="/login" class="nav-btn nav-btn-login">
              {{ t('navbar.login') }}
            </router-link>
            <router-link to="/register" class="nav-btn nav-btn-register">
              {{ t('navbar.register') }}
            </router-link>
          </div>
        </div>
      </nav>

      <!-- Hero Content -->
      <div class="hero-content">
        <div class="hero-text">
          <h1 class="hero-title" v-html="t('landingPage.heroTitle').replace('Aumentativa', '<span class=\'highlight\'>Aumentativa</span>')"></h1>
          <p class="hero-subtitle" v-html="t('landingPage.heroSubtitle').replace('GRATUITA', '<strong>GRATUITA</strong>')"></p>

          <div class="free-badge">{{ t('landingPage.freeBadge') }}</div>

          <div class="hero-actions">
            <router-link to="/register" class="cta-primary">{{ t('landingPage.accessFreely') }}</router-link>
            <router-link to="/nolog" class="cta-secondary">{{ t('landingPage.exploreNoRegister') }}</router-link>
          </div>

          <div class="hero-stats">
            <div class="stat">
              <span class="stat-number">1000+</span>
              <span class="stat-label">{{ t('landingPage.stats.symbols') }}</span>
            </div>
            <div class="stat">
              <span class="stat-number">15+</span>
              <span class="stat-label">{{ t('landingPage.stats.categories') }}</span>
            </div>
            <div class="stat">
              <span class="stat-number">{{ t('landingPage.stats.price') }}</span>
              <span class="stat-label">{{ t('landingPage.stats.alwaysFree') }}</span>
            </div>
          </div>
        </div>

        <div class="hero-visual">
          <div class="hero-image-container">
            <div class="floating-card card-1">
              <img src="@/assets/icons/parliamoIcon.png" alt="Comunicare" />
              <span>Parlare</span>
            </div>
            <div class="floating-card card-2">
              <img src="@/assets/icons/dizionarioIcon.png" alt="Dizionario" />
              <span>Dizionario</span>
            </div>
            <div class="floating-card card-3">
              <img src="@/assets/icons/giochiIcon.png" alt="Giochi" />
              <span>Giochi</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- What is CAA Section -->
    <section class="what-is-caa">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">{{ t('landingPage.whatIsCAA.title') }}</h2>
          <p class="section-subtitle">{{ t('landingPage.whatIsCAA.subtitle') }}</p>
        </div>

        <div class="caa-explanation">
          <div class="caa-text">
            <div class="caa-point">
              <div class="point-icon">🎯</div>
              <div class="point-content">
                <h3>{{ t('landingPage.whatIsCAA.forWho.title') }}</h3>
                <p>{{ t('landingPage.whatIsCAA.forWho.description') }}</p>
              </div>
            </div>

            <div class="caa-point">
              <div class="point-icon">🛠️</div>
              <div class="point-content">
                <h3>{{ t('landingPage.whatIsCAA.howItWorks.title') }}</h3>
                <p>{{ t('landingPage.whatIsCAA.howItWorks.description') }}</p>
              </div>
            </div>

            <div class="caa-point">
              <div class="point-icon">💡</div>
              <div class="point-content">
                <h3>{{ t('landingPage.whatIsCAA.whyImportant.title') }}</h3>
                <p>{{ t('landingPage.whatIsCAA.whyImportant.description') }}</p>
              </div>
            </div>
          </div>

          <div class="caa-video">
            <iframe
              src="https://www.youtube.com/embed/rv0txLzS2IA"
              title="Introduzione alla CAA"
              frameborder="0"
              allowfullscreen
              class="video-embed"
            ></iframe>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="features-section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">{{ t('landingPage.features.title') }}</h2>
          <p class="section-subtitle">{{ t('landingPage.features.subtitle') }}</p>
        </div>

        <div class="features-grid">
          <div class="feature-card">
            <div class="feature-icon">🗣️</div>
            <h3 class="feature-title">{{ t('landingPage.features.facilitatedCommunication.title') }}</h3>
            <p class="feature-description">{{ t('landingPage.features.facilitatedCommunication.description') }}</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">📚</div>
            <h3 class="feature-title">{{ t('landingPage.features.visualDictionary.title') }}</h3>
            <p class="feature-description">{{ t('landingPage.features.visualDictionary.description') }}</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">🎮</div>
            <h3 class="feature-title">{{ t('landingPage.features.playfulLearning.title') }}</h3>
            <p class="feature-description">{{ t('landingPage.features.playfulLearning.description') }}</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">📈</div>
            <h3 class="feature-title">{{ t('landingPage.features.progressTracking.title') }}</h3>
            <p class="feature-description">{{ t('landingPage.features.progressTracking.description') }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Benefits Section -->
    <section class="benefits-section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">{{ t('landingPage.benefits.title') }}</h2>
          <p class="section-subtitle">{{ t('landingPage.benefits.subtitle') }}</p>
        </div>

        <div class="benefits-grid">
          <div class="benefit-card">
            <div class="benefit-icon">♿</div>
            <h3 class="benefit-title">{{ t('landingPage.benefits.disabilities.title') }}</h3>
            <p class="benefit-description">{{ t('landingPage.benefits.disabilities.description') }}</p>
          </div>
          <div class="benefit-card">
            <div class="benefit-icon">👨‍🏫</div>
            <h3 class="benefit-title">{{ t('landingPage.benefits.educators.title') }}</h3>
            <p class="benefit-description">{{ t('landingPage.benefits.educators.description') }}</p>
          </div>
          <div class="benefit-card">
            <div class="benefit-icon">👨‍👩‍👧‍👦</div>
            <h3 class="benefit-title">{{ t('landingPage.benefits.families.title') }}</h3>
            <p class="benefit-description">{{ t('landingPage.benefits.families.description') }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- About Project Section -->
    <section class="about-project">
      <div class="container">
        <div class="about-content">
          <div class="about-text">
            <h2 class="about-title">{{ t('landingPage.about.title') }}</h2>
            <p class="about-description" v-html="t('landingPage.about.description').replace('IIS Volta Lodi', '<strong>IIS Volta Lodi</strong>')">
            </p>
            <div class="about-features">
              <div class="about-feature">
                <span class="about-icon">🎓</span>
                <span>{{ t('landingPage.about.features.schoolProject') }}</span>
              </div>
              <div class="about-feature">
                <span class="about-icon">💝</span>
                <span>{{ t('landingPage.about.features.completelyFree') }}</span>
              </div>
              <div class="about-feature">
                <span class="about-icon">🌍</span>
                <span>{{ t('landingPage.about.features.openSource') }}</span>
              </div>
              <div class="about-feature">
                <span class="about-icon">🚫</span>
                <span>{{ t('landingPage.about.features.noAds') }}</span>
              </div>
            </div>
          </div>
          <div class="about-visual">
            <div class="school-badge">
              <h3>{{ t('landingPage.about.school.name') }}</h3>
              <p>{{ t('landingPage.about.school.motto') }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta-section">
      <div class="container">
        <div class="cta-content">
          <h2 class="cta-title">{{ t('landingPage.cta.title') }}</h2>
          <p class="cta-description">{{ t('landingPage.cta.description') }}</p>
          <div class="cta-actions">
            <router-link to="/register" class="cta-btn-primary">{{ t('landingPage.cta.primary') }}</router-link>
            <router-link to="/nolog" class="cta-btn-secondary">{{ t('landingPage.cta.secondary') }}</router-link>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
      <div class="container">
        <div class="footer-content">
          <div class="footer-brand">
            <img src="@/assets/icons/icon.png" alt="CAA Communication" class="footer-logo" />
            <span class="footer-title">ComuniCAA</span>
          </div>
          <div class="footer-links">
            <router-link to="/credits" class="footer-link">{{ t('landingPage.footer.links.aboutUs') }}</router-link>
            <router-link to="/login" class="footer-link">{{ t('landingPage.footer.links.login') }}</router-link>
            <router-link to="/register" class="footer-link">{{ t('landingPage.footer.links.register') }}</router-link>
          </div>
        </div>
        <div class="footer-bottom">
          <p>{{ t('landingPage.footer.copyright') }}</p>
        </div>
      </div>
    </footer>

    <!-- Help Navigator -->
  </div>
</template>

<style scoped>
/* === MODERN CAA LANDING PAGE STYLES === */

/* Base Styles */
.caa-landing {
  font-family:
    -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  line-height: 1.6;
  color: #333;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

/* === HERO SECTION === */
.hero-section {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  position: relative;
  overflow: hidden;
  min-height: 100vh;
}

.hero-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image:
    radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
    radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%);
  opacity: 0.8;
}

/* Navigation */
.navigation-bar {
  position: relative;
  z-index: 10;
  padding: 1rem 0;
  backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, 0.1);
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-center {
  flex: 1;
  display: flex;
  justify-content: center;
}

.nav-language-switch {
  /* Language switcher integrato nella navbar */
  position: relative;
}

.language-selector {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 25px;
  padding: 0.5rem 1rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
  position: relative;
}

.language-selector:hover {
  background: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.4);
}

.language-selector::after {
  content: attr(data-current-lang);
  position: absolute;
  bottom: -1.5rem;
  left: 50%;
  transform: translateX(-50%);
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.8);
  font-weight: 600;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.language-selector:hover::after {
  opacity: 1;
}

.flag-icon {
  width: 1.5rem;
  height: 1rem;
  border-radius: 4px;
  transition: all 0.3s ease;
  filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1));
}

.flag-active {
  opacity: 1;
  transform: scale(1.1);
}

.flag-inactive {
  opacity: 0.5;
  transform: scale(0.9);
}

.language-toggle {
  position: relative;
  width: 3rem;
  height: 1.5rem;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 15px;
  border: 1px solid rgba(255, 255, 255, 0.4);
  cursor: pointer;
  transition: all 0.3s ease;
  outline: none;
}

.language-toggle:hover {
  background: rgba(255, 255, 255, 0.4);
}

.language-toggle:focus {
  outline: 2px solid #feca57;
  outline-offset: 2px;
}

.toggle-slider {
  position: absolute;
  top: 2px;
  width: 1.25rem;
  height: 1.25rem;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 50%;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid rgba(255, 255, 255, 0.6);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.toggle-left {
  left: 2px;
}

.toggle-right {
  left: calc(100% - 1.25rem - 2px);
}

/* Rimuovo gli stili del vecchio language switcher */
/* .nav-language-switch :deep(.flex) { ... } */

.nav-brand {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.nav-logo {
  width: 3rem;
  height: 3rem;
  object-fit: contain;
}

.nav-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: white;
}

.nav-actions {
  display: flex;
  gap: 1rem;
}

.nav-btn {
  padding: 0.5rem 1.5rem;
  border-radius: 25px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
}

.nav-btn-login {
  color: white;
  border: 2px solid rgba(255, 255, 255, 0.3);
}

.nav-btn-login:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.6);
}

.nav-btn-register {
  background: white;
  color: #667eea;
  border: 2px solid white;
}

.nav-btn-register:hover {
  background: rgba(255, 255, 255, 0.9);
  transform: translateY(-2px);
}

/* Hero Content */
.hero-content {
  position: relative;
  z-index: 5;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 4rem 1rem;
  min-height: calc(100vh - 120px);
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: 1.5rem;
}

.highlight {
  background: linear-gradient(45deg, #ff6b6b, #feca57);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-subtitle {
  font-size: 1.25rem;
  line-height: 1.6;
  margin-bottom: 1.5rem;
  opacity: 0.9;
}

.free-badge {
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 25px;
  padding: 0.75rem 1.5rem;
  font-size: 0.9rem;
  font-weight: 600;
  color: #feca57;
  margin-bottom: 2rem;
  display: inline-block;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.hero-actions {
  display: flex;
  gap: 1rem;
  margin-bottom: 3rem;
}

.cta-primary,
.cta-secondary {
  padding: 1rem 2rem;
  border-radius: 30px;
  text-decoration: none;
  font-weight: 600;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.cta-primary {
  background: linear-gradient(45deg, #ff6b6b, #feca57);
  color: white;
}

.cta-primary:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 25px rgba(255, 107, 107, 0.4);
}

.cta-secondary {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: 2px solid rgba(255, 255, 255, 0.3);
}

.cta-secondary:hover {
  background: rgba(255, 255, 255, 0.3);
  border-color: rgba(255, 255, 255, 0.6);
}

.hero-stats {
  display: flex;
  gap: 2rem;
}

.stat {
  text-align: center;
}

.stat-number {
  display: block;
  font-size: 2rem;
  font-weight: 700;
  color: #feca57;
}

.stat-label {
  font-size: 0.9rem;
  opacity: 0.8;
}

/* Hero Visual */
.hero-visual {
  position: relative;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero-image-container {
  position: relative;
  width: 100%;
  height: 400px;
}

.floating-card {
  position: absolute;
  background: white;
  border-radius: 20px;
  padding: 1.5rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  color: #333;
  font-weight: 600;
  animation: float 6s ease-in-out infinite;
}

.floating-card img {
  width: 3rem;
  height: 3rem;
  object-fit: contain;
}

.card-1 {
  top: 10%;
  left: 20%;
  animation-delay: 0s;
}

.card-2 {
  top: 50%;
  right: 10%;
  animation-delay: 2s;
}

.card-3 {
  bottom: 20%;
  left: 30%;
  animation-delay: 4s;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
}

/* === SECTIONS === */
.section-header {
  text-align: center;
  margin-bottom: 4rem;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #333;
}

.section-subtitle {
  font-size: 1.2rem;
  color: #666;
  max-width: 600px;
  margin: 0 auto;
}

/* What is CAA Section */
.what-is-caa {
  padding: 6rem 0;
  background: #f8faff;
}

.caa-explanation {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
}

.caa-point {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
}

.point-icon {
  font-size: 2rem;
  flex-shrink: 0;
}

.point-content h3 {
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #333;
}

.point-content p {
  color: #666;
  line-height: 1.6;
}

.caa-video {
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
}

.video-embed {
  width: 100%;
  height: 315px;
  border: none;
}

/* Features Section */
.features-section {
  padding: 6rem 0;
  background: white;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
}

.feature-card {
  background: #f8faff;
  padding: 2rem;
  border-radius: 20px;
  text-align: center;
  transition: all 0.3s ease;
  border: 1px solid #e1e8ff;
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 35px rgba(102, 126, 234, 0.1);
}

.feature-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.feature-title {
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #333;
}

.feature-description {
  color: #666;
  line-height: 1.6;
}

/* Benefits Section */
.benefits-section {
  padding: 6rem 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.benefits-section .section-title,
.benefits-section .section-subtitle {
  color: white;
}

.benefits-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.benefit-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 2rem;
  border-radius: 20px;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
}

.benefit-card:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-5px);
}

.benefit-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.benefit-title {
  font-size: 1.3rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.benefit-description {
  opacity: 0.9;
  line-height: 1.6;
}

/* About Project Section */
.about-project {
  padding: 6rem 0;
  background: white;
}

.about-content {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 4rem;
  align-items: center;
}

.about-title {
  font-size: 2.2rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: #333;
}

.about-description {
  font-size: 1.1rem;
  line-height: 1.7;
  color: #666;
  margin-bottom: 2rem;
}

.about-features {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.about-feature {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  background: #f8faff;
  border-radius: 12px;
  border: 1px solid #e1e8ff;
}

.about-icon {
  font-size: 1.5rem;
}

.about-feature span:last-child {
  font-weight: 600;
  color: #333;
}

.about-visual {
  display: flex;
  justify-content: center;
  align-items: center;
}

.school-badge {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 3rem 2rem;
  border-radius: 20px;
  text-align: center;
  box-shadow: 0 15px 35px rgba(102, 126, 234, 0.2);
  position: relative;
  overflow: hidden;
}

.school-badge::before {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
  animation: rotate 20s linear infinite;
}

.school-badge h3 {
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  position: relative;
  z-index: 2;
}

.school-badge p {
  font-size: 1rem;
  opacity: 0.9;
  position: relative;
  z-index: 2;
}

@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* CTA Section */
.cta-section {
  padding: 6rem 0;
  background: #f8faff;
}

.cta-content {
  text-align: center;
}

.cta-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #333;
}

.cta-description {
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 2rem;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.cta-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.cta-btn-primary,
.cta-btn-secondary {
  padding: 1rem 2rem;
  border-radius: 30px;
  text-decoration: none;
  font-weight: 600;
  font-size: 1.1rem;
  transition: all 0.3s ease;
}

.cta-btn-primary {
  background: linear-gradient(45deg, #667eea, #764ba2);
  color: white;
}

.cta-btn-primary:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 25px rgba(102, 126, 234, 0.4);
}

.cta-btn-secondary {
  background: white;
  color: #667eea;
  border: 2px solid #667eea;
}

.cta-btn-secondary:hover {
  background: #667eea;
  color: white;
}

/* Footer */
.footer {
  background: #2c3e50;
  color: white;
  padding: 3rem 0 1rem;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.footer-brand {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.footer-logo {
  width: 2.5rem;
  height: 2.5rem;
  object-fit: contain;
}

.footer-title {
  font-size: 1.3rem;
  font-weight: 700;
}

.footer-links {
  display: flex;
  gap: 2rem;
}

.footer-link {
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  transition: color 0.3s ease;
}

.footer-link:hover {
  color: white;
}

.footer-bottom {
  text-align: center;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.6);
}

/* === RESPONSIVE DESIGN === */
@media (max-width: 768px) {
  .hero-content {
    grid-template-columns: 1fr;
    text-align: center;
    padding: 2rem 1rem;
  }

  .hero-title {
    font-size: 2.5rem;
  }

  .hero-actions {
    flex-direction: column;
    align-items: center;
  }

  .hero-stats {
    justify-content: center;
  }

  .caa-explanation {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .about-content {
    grid-template-columns: 1fr;
    gap: 2rem;
    text-align: center;
  }

  .about-features {
    grid-template-columns: 1fr;
    max-width: 400px;
    margin: 0 auto;
  }

  .nav-container {
    flex-direction: column;
    gap: 1rem;
  }

  .nav-center {
    order: -1; /* Mette il language switcher sopra su mobile */
  }

  .language-selector {
    padding: 0.4rem 0.8rem;
    gap: 0.5rem;
  }

  .flag-icon {
    width: 1.25rem;
    height: 0.875rem;
  }

  .language-toggle {
    width: 2.5rem;
    height: 1.25rem;
  }

  .toggle-slider {
    width: 1rem;
    height: 1rem;
  }

  .toggle-right {
    left: calc(100% - 1rem - 2px);
  }

  .features-grid,
  .benefits-grid {
    grid-template-columns: 1fr;
  }

  .cta-actions {
    flex-direction: column;
    align-items: center;
  }

  .footer-content {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }

  .footer-links {
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: 2rem;
  }

  .section-title {
    font-size: 2rem;
  }

  .hero-stats {
    flex-direction: column;
    gap: 1rem;
  }

  .floating-card {
    padding: 1rem;
  }
}

/* Accessibility Improvements */
@media (prefers-reduced-motion: reduce) {
  .floating-card {
    animation: none;
  }

  .feature-card:hover,
  .benefit-card:hover,
  .cta-primary:hover,
  .cta-btn-primary:hover {
    transform: none;
  }
}

/* Focus states for accessibility */
.nav-btn:focus,
.cta-primary:focus,
.cta-secondary:focus,
.cta-btn-primary:focus,
.cta-btn-secondary:focus,
.footer-link:focus {
  outline: 3px solid #ffd700;
  outline-offset: 3px;
}
</style>
