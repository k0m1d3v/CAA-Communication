<script setup lang="ts"></script>

<template>
  <main
    class="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#fcffa1] to-[#ffebcd]"
  >
    <div class="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
      <h1 class="text-4xl font-extrabold text-center mb-6 text-[#7da7d9]">Create Your Account</h1>
      <form class="space-y-6">
        <!-- Name Input -->
        <div>
          <label for="name" class="block text-sm font-semibold text-[#7da7d9]"> Full Name </label>
          <input
            type="text"
            id="name"
            class="w-full mt-2 px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#77DD77] focus:border-transparent"
            placeholder="Enter your full name"
          />
        </div>

        <!-- Email Input -->
        <div>
          <label for="email" class="block text-sm font-semibold text-[#7da7d9]">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            class="w-full mt-2 px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#77DD77] focus:border-transparent"
            placeholder="Enter your email"
          />
        </div>

        <!-- Password Input -->
        <div>
          <label for="password" class="block text-sm font-semibold text-[#7da7d9]">
            Password
          </label>
          <input
            type="password"
            id="password"
            class="w-full mt-2 px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FF9AA2] focus:border-transparent"
            placeholder="Enter your password"
          />
        </div>

        <!-- Confirm Password Input -->
        <div>
          <label for="confirm-password" class="block text-sm font-semibold text-[#7da7d9]">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirm-password"
            class="w-full mt-2 px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FF9AA2] focus:border-transparent"
            placeholder="Confirm your password"
          />
        </div>

        <!-- Submit Button -->
        <div>
          <button
            type="submit"
            class="w-full py-3 px-4 bg-gradient-to-r from-[#7DA7D9] to-[#77DD77] text-white font-bold rounded-lg shadow-lg hover:opacity-90 transition duration-300"
          >
            Register
          </button>
        </div>
      </form>

      <!-- Additional Links -->
      <p class="text-center text-sm mt-6 text-[#7da7d9]">
        Already have an account?
        <a href="/login" class="font-bold text-[#ff9aa2] hover:underline"> Login </a>
      </p>
    </div>
  </main>
</template>
