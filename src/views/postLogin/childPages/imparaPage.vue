<script setup lang="ts">
import BackHome from '@/components/backHome.vue'
import HelpNavigator from '@/components/helpNavigator.vue'
import PageTitle from '@/components/pageTitle.vue'

function newWord() {
  const gameDiv = document.querySelector('.game-container')
  if (gameDiv) {
    gameDiv.remove()
  }

  inizia()
}

function inizia() {
  console.log('Inizia il gioco!')

  const mainDiv = document.querySelector('.max-w-md')
  if (mainDiv) {
    mainDiv.style.display = 'none'
  }

  let score = 0

  const gameDiv = document.createElement('div')
  gameDiv.className = 'game-container'

  const imageEl = document.createElement('img')
  imageEl.alt = 'Random image'
  imageEl.style.maxWidth = '100%'
  imageEl.style.marginBottom = '20px'
  imageEl.style.border = '2px solid #007BFF'
  imageEl.style.borderRadius = '8px'
  imageEl.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)'

  const guessInput = document.createElement('input')
  guessInput.type = 'text'
  guessInput.placeholder = "Guess the word's meaning..."
  guessInput.style.marginRight = '10px'
  guessInput.style.padding = '10px'
  guessInput.style.border = '1px solid #ccc'
  guessInput.style.borderRadius = '4px'
  guessInput.style.width = 'calc(100% - 120px)'
  guessInput.style.boxSizing = 'border-box'

  const submitButton = document.createElement('button')
  submitButton.textContent = 'Submit Guess'
  submitButton.style.padding = '10px 20px'
  submitButton.style.backgroundColor = '#007BFF'
  submitButton.style.color = '#fff'
  submitButton.style.border = 'none'
  submitButton.style.borderRadius = '4px'
  submitButton.style.cursor = 'pointer'
  submitButton.style.transition = 'background-color 0.3s'
  submitButton.onmouseover = () => (submitButton.style.backgroundColor = '#0056b3')
  submitButton.onmouseout = () => (submitButton.style.backgroundColor = '#007BFF')

  const feedback = document.createElement('div')
  feedback.style.marginTop = '40px'
  feedback.style.fontSize = '16px'
  feedback.style.fontWeight = 'bold'
  feedback.style.color = '#333'

  gameDiv.style.display = 'flex'
  gameDiv.style.flexDirection = 'column'
  gameDiv.style.alignItems = 'center'
  gameDiv.style.padding = '20px'
  gameDiv.style.margin = '20px auto'
  gameDiv.style.maxWidth = '400px'
  gameDiv.style.backgroundColor = '#f9f9f9'
  gameDiv.style.border = '1px solid #ddd'
  gameDiv.style.borderRadius = '8px'
  gameDiv.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)'

  gameDiv.appendChild(imageEl)
  gameDiv.appendChild(guessInput)
  gameDiv.appendChild(submitButton)
  gameDiv.appendChild(feedback)
  document.body.appendChild(gameDiv)

  // Define the language for the API call
  const language = 'en' // Change to 'it' for Italian

  // Fetch a random word from the Arasaac API
  fetch(`https://api.arasaac.org/v1/pictograms/all/${language}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.length > 0) {
        const randomIndex = Math.floor(Math.random() * data.length)
        const selectedPictogram = data[randomIndex]

        // Set the image source using the _id of the selected pictogram
        imageEl.src = `https://static.arasaac.org/pictograms/${selectedPictogram._id}/${selectedPictogram._id}_500.png`

        // Use the first keyword as the correct answer
        const correctAnswer = selectedPictogram.keywords[0].keyword.toLowerCase()
        console.log(`Correct word: ${correctAnswer}`)

        submitButton.onclick = () => {
          const userGuess = guessInput.value.trim().toLowerCase()
          if (userGuess === correctAnswer) {
            feedback.textContent = 'Correct!'
            feedback.style.color = 'green'
            score++
            guessInput.value = ''
            guessInput.focus()
            // Fetch a new random word
            newWord()
          } else {
            feedback.textContent = 'Incorrect, try again.'
            feedback.style.color = 'red'
          }
        }
      } else {
        feedback.textContent = 'No data found. Please try again later.'
        feedback.style.color = 'orange'
      }
    })
    .catch((error) => {
      console.error('Error fetching API:', error)
      feedback.textContent = 'Error loading game. Please try again later.'
      feedback.style.color = 'red'
    })
}

defineExpose({ inizia })
</script>

<template>
  <BackHome />
  <div
    class="max-w-md mx-auto text-center mt-100 bg-white border-2 border-blue-500 rounded-lg shadow-lg p-6 relative"
  >
    <PageTitle title="Impara" />
    <p class="text-3xl font-medium text-blue-700 mb-4 position-absolute pt-10">
      Impara la Comunicazione CAA divertendoti
    </p>
    <button
      @click="inizia"
      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors duration-300"
    >
      Inizia Ora
    </button>
  </div>
  <HelpNavigator />
</template>
