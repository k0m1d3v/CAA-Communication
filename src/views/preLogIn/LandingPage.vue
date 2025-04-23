<script setup lang="ts">
</script>

<template>
  <main class="flex flex-col min-h-screen font-sans" style="background-color: #fcffa1">

    <!-- Navbar -->
    <nav class="w-full bg-gradient-to-r from-[#7DA7D9] to-[#5A8DC4] text-white shadow-md">
      <div class="container mx-1 mb-0 px-4 flex justify-start items-center gap-6">

        <!-- Logo and credits -->
        <div class="flex gap-0 mb-0">
          <router-link to="/credits" class="flex items-center">
            <img src="@/assets/icons/icon.png" alt="Logo" class="w-[9.75rem] h-[9rem]" />
          </router-link>

          <!-- Bottoni Login/Register -->
          <div class="flex gap-2 items-center">
            <Button asChild class="login">
              <router-link to="/login" class="px-1 py-0 rounded-md">
                Login
              </router-link>
            </Button>
            <Button asChild class="register">
              <router-link to="/register" class="px-4 py-0 rounded-md">
                Register
              </router-link>
            </Button>
          </div>
        </div>
      </div>
    </nav>

    <!-- Header Section -->
    <header class="w-full bg-gradient-to-r from-[#7DA7D9] to-[#5A8DC4] text-white pt-0 pb-6 mt-0 shadow-xl relative">
      <div class="container mx-auto px-4 flex flex-col items-center relative">
        <div class="text-center animate-fade-in mb-6">
          <h1 class="text-6xl font-extrabold mt-0 mb-2 text-gradient">
            CAA Communication
          </h1>
          <p class="text-xl mt-4 font-light tracking-wide">
            Connecting people, empowering communication
          </p>
        </div>

        <div class="flex gap-4 justify-center">
          <Button asChild class="tasto">
            <router-link to="/nolog" class="flex items-center gap-2">
              <img src="@/assets/icons/dizionarioIcon.png" alt="Dictionary Icon" class="w-7 h-7" />
              Dizionario
            </router-link>
          </Button>
        </div>
      </div>
    </header>

    <!-- What is CAA Section -->
    <section class="container mx-auto px-6 py-16 text-center grid md:grid-cols-2 gap-12 items-center">
      <div class="space-y-6 animate-slide-in-right">
        <h2 class="text-4xl font-bold mb-6 text-gradient-primary flex items-center justify-center gap-4">
          <Home class="w-12 h-12 text-[#77dd77]" />
          What is CAA Communication?
        </h2>
        <p class="text-lg leading-relaxed">
          CAA Communication is a platform designed to enhance communication and collaboration. We
          provide seamless tools and resources that empower individuals and teams to connect, share,
          and grow together in a meaningful way.
        </p>
      </div>

      <div class="flex justify-center animate-slide-in-left rounded-xl">
        <iframe
          width="525"
          height="315"
          src="https://www.youtube.com/embed/rv0txLzS2IA"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          class="rounded-xl"
        />
      </div>
    </section>

    <!--(PINK) How It Works Section -->
    <section class="w-full px-8 py-16 bg-gradient-to-br from-[#FF9AA2] to-[#FFC3A0] rounded-lg shadow-md text-white">
      <div class="flex flex-col items-center justify-center text-center animate-fade-in">
        <h2 class="text-4xl font-bold mb-6 text-white flex items-center justify-center gap-4">
          <Globe class="w-12 h-12" />
          How the Website Works
        </h2>
        <p class="text-lg font-bold leading-relaxed max-w-2xl">
          Our website is built to be user-friendly and efficient. Navigate through various features,
          communicate with others, and access resources tailored to your needs. Stay connected and
          productive with our intuitive interface.
        </p>
      </div>
    </section>

    <!-- Project Goals Section -->
    <section class="w-full px-6 py-16 text-center">
      <div class="flex flex-col items-center justify-center space-y-6 animate-slide-in-left">
        <h2 class="text-4xl font-bold text-gradient-primary flex items-center justify-center gap-4">
          <Target class="w-12 h-12 text-[#FF9AA2]" />
          Our Project Goals
        </h2>
        <p class="text-lg leading-relaxed text-gray-700 dark:text-black-300 max-w-2xl">
          At CAA Communication, we aim to revolutionize the way people interact and collaborate. Our
          mission is to create a platform that fosters meaningful connections, promotes effective
          communication, and drives innovation for a better future.
        </p>
      </div>
    </section>

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
