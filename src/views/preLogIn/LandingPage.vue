<script setup lang="ts">
</script>




<template>
  <main class="flex flex-col min-h-screen font-sans" style="background-color: #fcffa1">
    <!-- Navbar -->
    <nav class="w-full bg-gradient-to-r from-[#7DA7D9] to-[#5A8DC4] text-white py-4 shadow-md">
      <div class="container mx-auto px-4 flex justify-between items-center">
        <!-- Login/Register Buttons -->
        <div class="flex gap-4">
          <Button asChild class="login">
            <router-link to="/login" class="flex items-center gap-2">
              Login
            </router-link>
          </Button>
          <Button asChild class="register">
            <router-link to="/register" class="flex items-center gap-2">
              Register
            </router-link>
          </Button>
        </div>
      </div>
    </nav>
    <!-- Header Section -->
    <header class="w-full bg-gradient-to-r from-[#7DA7D9] to-[#5A8DC4] text-white py-12 shadow-xl relative">
      <div class="container mx-auto px-4 flex flex-col items-center relative">
        

        <div class="text-center animate-fade-in mb-6">
          <h1 class="text-6xl font-extrabold mb-4 text-gradient">CAA Communication</h1>
          <p class="text-xl mt-4 font-light tracking-wide">Connecting people, empowering communication</p>
        </div>
        <div class="flex gap-4 justify-center">
          
          <Button asChild class="tasto">
            <router-link to="/dictionary" class="flex items-center gap-2">
              <img src="@/assets/icons/dizionarioIcon.png" alt="Dictionary Icon" class="w-7 h-7" />
              Dizionario
            </router-link>
          </Button>
        </div>
      </div>
    </header>

      <section className="container mx-auto px-6 py-16 text-center grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6 animate-slide-in-right">
          <h2 className="text-4xl font-bold mb-6 text-gradient-primary flex items-center justify-center gap-4">
            <Home className="w-12 h-12 text-[#77dd77]" />
            What is CAA Communication?
          </h2>
          <p className="text-lg leading-relaxed ">
            CAA Communication is a platform designed to enhance communication and collaboration. We
            provide seamless tools and resources that empower individuals and teams to connect, share,
            and grow together in a meaningful way.
          </p>
        </div>
      
        <div className="flex justify-center animate-slide-in-left rounded-xl">
          <iframe
            width="525"
            height="315"
            src="https://www.youtube.com/embed/rv0txLzS2IA"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="rounded-xl"
          />
        </div>
      </section>

    <!-- How It Works Section -->
    <section className="container mx-auto px-6 py-16 bg-gradient-to-br from-[#FF9AA2] to-[#FFC3A0] rounded-lg shadow-md text-white">
        <div className="text-center animate-fade-in">
          <h2 className="text-4xl font-bold mb-6 text-[#7DA7D9] flex items-center justify-center gap-4">
            <Globe className="w-12 h-12" />
            How the Website Works
          </h2>
          <p className="text-lg leading-relaxed max-w-2xl mx-auto">
            Our website is built to be user-friendly and efficient. Navigate through various features,
            communicate with others, and access resources tailored to your needs. Stay connected and
            productive with our intuitive interface.
          </p>
        </div>
      </section>
      
    <!-- Project Goals Section -->
    <section class="container mx-auto px-6 py-16 text-center">
      <div className="space-y-6 animate-slide-in-left">
          <h2 className="text-4xl font-bold mb-6 text-gradient-primary flex items-center justify-center gap-4">
            <Target className="w-12 h-12 text-[#ff9aa2]" />
            Our Project Goals
          </h2>
          <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
            At CAA Communication, we aim to revolutionize the way people interact and collaborate. Our
            mission is to create a platform that fosters meaningful connections, promotes effective
            communication, and drives innovation for a better future.
          </p>
        </div>
      </section>

    <!-- Footer Section -->
    <footer className="w-full bg-gradient-to-r from-[#7DA7D9] to-[#5A8DC4] text-white py-6 mt-auto">
      <div className="container mx-auto text-center">
          <p className="text-sm flex items-center justify-center gap-2">
            <Play className="w-4 h-4" />
            &copy; 2025 CAA Communication. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
</template>

<style scoped>
button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 800;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
}

button.tasto {
  background-color: #ffffff;
  color: #5a8dc4;
  border: 2px solid #5a8dc4;
}

button.tasto:hover {
  background-color: #f0f4fa;
}

button.tasto:focus {
  outline: 2px solid #5a8dc4;
  outline-offset: 2px;
}

button.login {
  background: none; /* Rimuove il colore di sfondo */
  border: none; /* Rimuove il bordo */
  color: inherit; 
  
}
button.login:hover {
  background-color: #0b5a9e;
  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
}
button.login:focus {
  outline: 2px solid #ffffff;
  outline-offset: 2px;
}

button.register {
  background: none; /* Rimuove il colore di sfondo */
  border: none; /* Rimuove il bordo */
  color: inherit; 
  
}

button.register:hover {
  background-color: #0b5a9e;
  box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
}

button.register:focus {
  outline: 2px solid #ffffff;
  outline-offset: 2px;
}

/* Posizionamento dei pulsanti */
.absolute {
  position: absolute;
}

.top-4 {
  top: 1rem;
}

.left-4 {
  left: 1rem;
}


/* Disabled button */
button:disabled {
  background-color: #cccccc;
  color: #666666;
  cursor: not-allowed;
  border: none;
}


</style>