<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import HelpNavigator from '@/components/helpNavigator.vue'

const { t } = useI18n()
</script>

<template>
  <main class="flex flex-col min-h-screen font-sans" style="background-color: #fcffa1">
    <!-- Navbar -->
    <nav
      class="w-full bg-gradient-to-r from-[#7DA7D9] to-[#7DA7D9] text-white py-4 shadow-md relative"
    >
      <!-- Left content: logo + login/register -->
      <div class="flex items-center gap-4 px-4">
        <!-- Logo -->
        <router-link to="/" class="flex items-center">
          <img src="@/assets/icons/icon.png" alt="Logo" class="w-[10.75rem] h-[10rem]" />
        </router-link>

        <!-- Login and Register Buttons -->
        <div class="flex gap-2 items-center">
          <Button asChild class="loginCredits">
            <router-link to="/login" class="px-2 py-1 rounded-md">{{
              t('navbar.login')
            }}</router-link>
          </Button>
          <Button asChild class="registerCredits">
            <router-link to="/register" class="px-4 py-1 rounded-md">{{
              t('navbar.register')
            }}</router-link>
          </Button>
        </div>
      </div>

      <!-- Centered title in the navbar -->
      <div
        class="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center animate-bounce-in"
      >
        <h1 class="text-6xl font-extrabold text-center">
          <span class="rainbow-bounce">C</span>
          <span class="rainbow-bounce delay-100">r</span>
          <span class="rainbow-bounce delay-200">e</span>
          <span class="rainbow-bounce delay-300">d</span>
          <span class="rainbow-bounce delay-400">i</span>
          <span class="rainbow-bounce delay-500">t</span>
          <span class="rainbow-bounce delay-600">s</span>
          <span class="rainbow-bounce delay-700">&nbsp;</span>
          <span class="rainbow-bounce delay-800">p</span>
          <span class="rainbow-bounce delay-900">a</span>
          <span class="rainbow-bounce delay-[1000ms]">g</span>
          <span class="rainbow-bounce delay-[1100ms]">e</span>
        </h1>
        <p class="text-base font-light tracking-wide mt-2 text-white">
          {{ t('creditsPage.poweredBy') }}
        </p>
      </div>
    </nav>

    <!-- Dev Team Section Title -->
    <section class="text-center mt-20 mb-10 animate-fade-in">
      <h2 class="text-5xl font-extrabold text-black font-montserrat tracking-wide">
        {{ t('creditsPage.meetTheTeam') }}
      </h2>
      <p class="text-lg mt-4 text-gray-700 font-light">
        {{ t('creditsPage.teamDescription') }}
      </p>
    </section>

    <!-- Team Members Section -->
    <div class="flex flex-row items-center justify-center mt-10 gap-15">
      <!-- Card Mirko -->
      <div
        class="w-[300px] h-auto bg-[#ff66a3] border-3 border-black shadow-[12px_12px_0px_#000000] overflow-hidden transition-all duration-300 ease-in-out transform hover:translate-x-[-6px] hover:translate-y-[-6px] font-montserrat rounded-lg"
      >
        <div
          class="w-full h-[40px] bg-white p-[10px] text-black font-extrabold text-[16px] border-b-3 border-black"
        >
          {{ t('creditsPage.teamMembers.mirko.name') }}
        </div>
        <div class="p-[12px] text-[14px] font-semibold text-black">
          {{ t('creditsPage.teamMembers.mirko.description') }}
          <div class="mt-[15px] flex gap-4">
            <a
              href="https://github.com"
              target="_blank"
              class="p-[8px] bg-black text-white rounded-full hover:bg-[#333333]"
            >
              <i class="fab fa-github"></i>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              class="p-[8px] bg-blue-600 text-white rounded-full hover:bg-[#0077b5]"
            >
              <i class="fab fa-linkedin-in"></i>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              class="p-[8px] bg-pink-600 text-white rounded-full hover:bg-[#E4405F]"
            >
              <i class="fab fa-instagram"></i>
            </a>
          </div>
        </div>
      </div>

      <!-- Card Lorenzo -->
      <div
        class="w-[300px] h-auto bg-[#ff66a3] border-3 border-black shadow-[12px_12px_0px_#000000] overflow-hidden transition-all duration-300 ease-in-out transform hover:translate-x-[-6px] hover:translate-y-[-6px] font-montserrat rounded-lg"
      >
        <div
          class="w-full h-[40px] bg-white p-[10px] text-black font-extrabold text-[16px] border-b-3 border-black"
        >
          {{ t('creditsPage.teamMembers.lorenzo.name') }}
        </div>
        <div class="p-[12px] text-[14px] font-semibold text-black">
          {{ t('creditsPage.teamMembers.lorenzo.description') }}
          <div class="mt-[15px] flex gap-4">
            <a
              href="https://github.com"
              target="_blank"
              class="p-[8px] bg-black text-white rounded-full hover:bg-[#333333]"
            >
              <i class="fab fa-github"></i>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              class="p-[8px] bg-blue-600 text-white rounded-full hover:bg-[#0077b5]"
            >
              <i class="fab fa-linkedin-in"></i>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              class="p-[8px] bg-pink-600 text-white rounded-full hover:bg-[#E4405F]"
            >
              <i class="fab fa-instagram"></i>
            </a>
          </div>
        </div>
      </div>
      <!-- Card Lorenzo -->
      <div
        class="w-[300px] h-auto bg-[#ff66a3] border-3 border-black shadow-[12px_12px_0px_#000000] overflow-hidden transition-all duration-300 ease-in-out transform hover:translate-x-[-6px] hover:translate-y-[-6px] font-montserrat rounded-lg"
      >
        <div
          class="w-full h-[40px] bg-white p-[10px] text-black font-extrabold text-[16px] border-b-3 border-black"
        >
          {{ t('creditsPage.teamMembers.francesco.name') }}
        </div>
        <div class="p-[12px] text-[14px] font-semibold text-black">
          {{ t('creditsPage.teamMembers.francesco.description') }}
          <div class="mt-[15px] flex gap-4">
            <a
              href="https://github.com"
              target="_blank"
              class="p-[8px] bg-black text-white rounded-full hover:bg-[#333333]"
            >
              <i class="fab fa-github"></i>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              class="p-[8px] bg-blue-600 text-white rounded-full hover:bg-[#0077b5]"
            >
              <i class="fab fa-linkedin-in"></i>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              class="p-[8px] bg-pink-600 text-white rounded-full hover:bg-[#E4405F]"
            >
              <i class="fab fa-instagram"></i>
            </a>
          </div>
        </div>
      </div>
      <!-- Card Lorenzo -->
      <div
        class="w-[300px] h-auto bg-[#ff66a3] border-3 border-black shadow-[12px_12px_0px_#000000] overflow-hidden transition-all duration-300 ease-in-out transform hover:translate-x-[-6px] hover:translate-y-[-6px] font-montserrat rounded-lg"
      >
        <div
          class="w-full h-[40px] bg-white p-[10px] text-black font-extrabold text-[16px] border-b-3 border-black"
        >
          {{ t('creditsPage.teamMembers.arlan.name') }}
        </div>
        <div class="p-[12px] text-[14px] font-semibold text-black">
          {{ t('creditsPage.teamMembers.arlan.description') }}
          <div class="mt-[15px] flex gap-4">
            <a
              href="https://github.com"
              target="_blank"
              class="p-[8px] bg-black text-white rounded-full hover:bg-[#333333]"
            >
              <i class="fab fa-github"></i>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              class="p-[8px] bg-blue-600 text-white rounded-full hover:bg-[#0077b5]"
            >
              <i class="fab fa-linkedin-in"></i>
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              class="p-[8px] bg-pink-600 text-white rounded-full hover:bg-[#E4405F]"
            >
              <i class="fab fa-instagram"></i>
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- Footer Section -->
    <footer class="w-full bg-gradient-to-r from-[#7DA7D9] to-[#5A8DC4] text-white py-6 mt-auto">
      <div class="container mx-auto text-center">
        <p class="text-sm flex items-center justify-center gap-2">
          <Play class="w-4 h-4" />
          &copy; 2025 {{ t('footer.footerText') }}
        </p>
      </div>
    </footer>

    <!-- Help Navigator -->
     <HelpNavigator class="fixed bottom-4 right-4 z-50" />
  </main>
</template>
