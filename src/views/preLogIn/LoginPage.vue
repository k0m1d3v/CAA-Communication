<script setup lang="ts"></script>

<template>
  <main class="flex items-center justify-center min-h-screen" style="background-color: #fcffa1">
    <div class="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
      <h1 class="text-3xl font-bold text-center mb-6" style="color: #7da7d9">
        Login to CAA Communication
      </h1>
      <form class="space-y-6">
        <!-- Email Input -->
        <div>
          <label for="email" class="block text-sm font-medium" style="color: #7da7d9"
            >Email Address</label
          >
          <input
            type="email"
            id="email"
            class="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#77DD77]"
            placeholder="Enter your email"
          />
        </div>

        <!-- Password Input -->
        <div>
          <label for="password" class="block text-sm font-medium" style="color: #7da7d9"
            >Password</label
          >
          <input
            type="password"
            id="password"
            class="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF9AA2]"
            placeholder="Enter your password"
          />
        </div>

        <!-- Submit Button -->
        <div>
          <button
            type="submit"
            class="w-full py-2 px-4 bg-[#7DA7D9] text-white font-bold rounded-lg hover:bg-[#77DD77] transition duration-300"
          >
            Login
          </button>
        </div>
      </form>

      <!-- Additional Links -->
      <p class="text-center text-sm mt-4" style="color: #7da7d9">
        Don't have an account?
        <a href="/register" class="font-bold" style="color: #ff9aa2">Sign up</a>
      </p>
    </div>
  </main>
</template>
