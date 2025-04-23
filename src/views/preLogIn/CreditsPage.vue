<script setup lang="ts">

</script>

<template>
  <main class="flex flex-col min-h-screen font-sans" style="background-color: #fcffa1">
    <!-- Navbar -->
    <nav class="w-full bg-gradient-to-r from-[#7DA7D9] to-[#7DA7D9] text-white py-4 shadow-md relative">
  <!-- Contenuto a sinistra: logo + login/register -->
  <div class="flex items-center gap-4 px-4">
    <!-- Logo -->
    <router-link to="/" class="flex items-center">
      <img src="@/assets/icons/icon.png" alt="Logo" class="w-[10.75rem] h-[10rem]" />
    </router-link>

    <!-- Bottoni Login e Register -->
    <div class="flex gap-2 items-center">
      <Button asChild class="loginCredits">
        <router-link to="/login" class="px-2 py-1 rounded-md">Login</router-link>
      </Button>
      <Button asChild class="registerCredits">
        <router-link to="/register" class="px-4 py-1 rounded-md">Register</router-link>
      </Button>
    </div>
  </div>

  <!-- Titolo centrato nella navbar -->
<!-- Titolo centrato nella navbar -->
<div class="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center animate-bounce-in">
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
  Powered by IIS Volta Lodi
</p>
</div>


</nav>

<!-- Dev Team Section Title -->
<section class="text-center mt-20 mb-10 animate-fade-in">
  <h2 class="text-5xl font-extrabold text-black font-montserrat tracking-wide">
    Meet the Dev Team:
  </h2>
  <p class="text-lg mt-4 text-gray-700 font-light">
    The minds behind ComuniCAA
  </p>
</section>

    <!-- Header Section -->
    <div class="flex flex-row items-center justify-center mt-10 gap-15"> <!-- Aggiunta di gap maggiore per distanziare le carte -->

  <!-- Card Mirko -->
  <div class="w-[300px] h-auto bg-[#ff66a3] border-3 border-black shadow-[12px_12px_0px_#000000] overflow-hidden transition-all duration-300 ease-in-out transform hover:translate-x-[-6px] hover:translate-y-[-6px] font-montserrat rounded-lg">
    <!-- Header -->
    <div class="w-full h-[40px] bg-white p-[10px] text-black font-extrabold text-[16px] border-b-3 border-black">
      Mirko Virtuani
    </div>
    <!-- Content -->
    <div class="p-[12px] text-[14px] font-semibold text-black">
      Hi, I'm Mirko Virtuani, a student at IIS Volta Lodi. I am 17 years old and I am passionate about technology and programming.
      I am currently studying computer science and I am excited to learn more about web development and software engineering.
      <br />
      <div class="mt-[15px] flex gap-4">
        <a href="https://github.com" target="_blank" class="p-[8px] bg-black text-white rounded-full hover:bg-[#333333]">
          <i class="fab fa-github"></i> <!-- Icona GitHub -->
        </a>
        <a href="https://linkedin.com" target="_blank" class="p-[8px] bg-blue-600 text-white rounded-full hover:bg-[#0077b5]">
          <i class="fab fa-linkedin-in"></i> <!-- Icona LinkedIn -->
        </a>
        <a href="https://instagram.com" target="_blank" class="p-[8px] bg-pink-600 text-white rounded-full hover:bg-[#E4405F]">
          <i class="fab fa-instagram"></i> <!-- Icona Instagram -->
        </a>
      </div>
    </div>
  </div>

  <!-- Card Lorenzo -->
  <div class="w-[300px] h-auto bg-[#ff66a3] border-3 border-black shadow-[12px_12px_0px_#000000] overflow-hidden transition-all duration-300 ease-in-out transform hover:translate-x-[-6px] hover:translate-y-[-6px] font-montserrat rounded-lg">
    <!-- Header -->
    <div class="w-full h-[40px] bg-white p-[10px] text-black font-extrabold text-[16px] border-b-3 border-black">
      Lorenzo Battista
    </div>
    <!-- Content -->
    <div class="p-[12px] text-[14px] font-semibold text-black">
      Hi, I'm Lorenzo,  a student at IIS Volta Lodi. I am 17 years old and I am passionate about technology and programming. I am currently studying computer science and I am excited to learn more about web development and software engineering.
      <br />
      <div class="mt-[15px] flex gap-4">
        <a href="https://github.com" target="_blank" class="p-[8px] bg-black text-white rounded-full hover:bg-[#333333]">
          <i class="fab fa-github"></i> <!-- Icona GitHub -->
        </a>
        <a href="https://linkedin.com" target="_blank" class="p-[8px] bg-blue-600 text-white rounded-full hover:bg-[#0077b5]">
          <i class="fab fa-linkedin-in"></i> <!-- Icona LinkedIn -->
        </a>
        <a href="https://instagram.com" target="_blank" class="p-[8px] bg-pink-600 text-white rounded-full hover:bg-[#E4405F]">
          <i class="fab fa-instagram"></i> <!-- Icona Instagram -->
        </a>
      </div>
    </div>
  </div>

  <!-- Card Arlan -->
  <div class="w-[300px] h-auto bg-[#ff66a3] border-3 border-black shadow-[12px_12px_0px_#000000] overflow-hidden transition-all duration-300 ease-in-out transform hover:translate-x-[-6px] hover:translate-y-[-6px] font-montserrat rounded-lg">
    <!-- Header -->
    <div class="w-full h-[40px] bg-white p-[10px] text-black font-extrabold text-[16px] border-b-3 border-black">
      Arlan Apenov
    </div>
    <!-- Content -->
    <div class="p-[12px] text-[14px] font-semibold text-black">
      Hi, I'm Arlan, a student at IIS Volta Lodi. I am 17 years old and I am passionate about technology and programming. I am currently studying computer science and I am excited to learn more about web development and software engineering.
      <br />
      <div class="mt-[15px] flex gap-4">
        <a href="https://github.com" target="_blank" class="p-[8px] bg-black text-white rounded-full hover:bg-[#333333]">
          <i class="fab fa-github"></i> <!-- Icona GitHub -->
        </a>
        <a href="https://linkedin.com" target="_blank" class="p-[8px] bg-blue-600 text-white rounded-full hover:bg-[#0077b5]">
          <i class="fab fa-linkedin-in"></i> <!-- Icona LinkedIn -->
        </a>
        <a href="https://instagram.com" target="_blank" class="p-[8px] bg-pink-600 text-white rounded-full hover:bg-[#E4405F]">
          <i class="fab fa-instagram"></i> <!-- Icona Instagram -->
        </a>
      </div>
    </div>
  </div>

  <!-- Card Francesco -->
  <div class="w-[300px] h-auto bg-[#ff66a3] border-3 border-black shadow-[12px_12px_0px_#000000] overflow-hidden transition-all duration-300 ease-in-out transform hover:translate-x-[-6px] hover:translate-y-[-6px] font-montserrat rounded-lg">
    <!-- Header -->
    <div class="w-full h-[40px] bg-white p-[10px] text-black font-extrabold text-[16px] border-b-3 border-black">
      Francesco Fava
    </div>
    <!-- Content -->
    <div class="p-[12px] text-[14px] font-semibold text-black">
      Hi, I'm Francesco,  a student at IIS Volta Lodi. I am 17 years old and I am passionate about technology and programming. I am currently studying computer science and I am excited to learn more about web development and software engineering.
      <br />
      <div class="mt-[15px] flex gap-4">
        <a href="https://github.com" target="_blank" class="p-[8px] bg-black text-white rounded-full hover:bg-[#333333]">
          <i class="fab fa-github"></i> <!-- Icona GitHub -->
        </a>
        <a href="https://linkedin.com" target="_blank" class="p-[8px] bg-blue-600 text-white rounded-full hover:bg-[#0077b5]">
          <i class="fab fa-linkedin-in"></i> <!-- Icona LinkedIn -->
        </a>
        <a href="https://instagram.com" target="_blank" class="p-[8px] bg-pink-600 text-white rounded-full hover:bg-[#E4405F]">
          <i class="fab fa-instagram"></i> <!-- Icona Instagram -->
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
            &copy; 2025 ComuniCAA. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
</template>
