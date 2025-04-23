<template>
  <div>
    <button @click="leggiPagina" :disabled="parlando">
      🔊 {{ parlando ? 'Sto leggendo...' : 'Leggi tutta la pagina' }}
    </button>

    <!-- Opzione per ripetere la lettura -->
    <button @click="riprendiLettura" :disabled="!parlando">
      🔁 Ripeti lettura
    </button>

    <div v-if="!parlando">
      <!-- Slider per personalizzare la velocità -->
      <div>
        <label for="rate">Velocità:</label>
        <input type="range" id="rate" v-model="rate" min="0.1" max="2" step="0.1">
        <span>{{ rate }}</span>
      </div>

      <!-- Slider per personalizzare il tono -->
      <div>
        <label for="pitch">Tono:</label>
        <input type="range" id="pitch" v-model="pitch" min="0" max="2" step="0.1">
        <span>{{ pitch }}</span>
      </div>

      <!-- Slider per personalizzare il volume -->
      <div>
        <label for="volume">Volume:</label>
        <input type="range" id="volume" v-model="volume" min="0" max="1" step="0.1">
        <span>{{ volume }}</span>
      </div>

      <!-- Selettore per la voce -->
      <div>
        <label for="voice">Seleziona voce:</label>
        <select id="voice" v-model="selectedVoice">
          <option v-for="(voice, index) in voices" :key="index" :value="voice.name">
            {{ voice.name }}
          </option>
        </select>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { auth } from '../firebaseConfig';  // Importa la configurazione di Firebase Authentication
import { db } from '../firebaseConfig';  // Importa la configurazione di Firestore
import { doc, getDoc, setDoc } from 'firebase/firestore';

export default {
  data() {
    return {
      parlando: false as boolean,  // Stato per sapere se sta leggendo
      sintesi: null as SpeechSynthesisUtterance | null,  // Memorizza l'oggetto della sintesi vocale
      rate: 1 as number,          // Velocità della voce (default)
      pitch: 1 as number,         // Tono della voce (default)
      volume: 1 as number,        // Volume della voce (default)
      voices: [] as SpeechSynthesisVoice[], // Elenco delle voci disponibili
      selectedVoice: null as string | null,  // Voce selezionata dall'utente
    };
  },
  created() {
    // Recupera le voci disponibili al caricamento del componente
    this.voices = speechSynthesis.getVoices();
    this.selectedVoice = this.voices.length > 0 ? this.voices[0].name : null;

    // Carica le preferenze utente da Firebase
    this.caricaPreferenzeUtente();

    if (speechSynthesis.onvoiceschanged !== undefined) {
      speechSynthesis.onvoiceschanged = () => {
        this.voices = speechSynthesis.getVoices();
        this.selectedVoice = this.voices.length > 0 ? this.voices[0].name : null;
      };
    }
  },
  methods: {
    async caricaPreferenzeUtente() {
      // Assicurati che l'utente sia autenticato
      const user = auth.currentUser;
      if (user) {
        const userRef = doc(db, 'users', user.uid);  // Usa l'uid dell'utente autenticato
        const docSnap = await getDoc(userRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          this.rate = data?.rate || 1;
          this.pitch = data?.pitch || 1;
          this.volume = data?.volume || 1;
          this.selectedVoice = data?.selectedVoice || this.voices[0].name;
        } else {
          console.log("Nessun documento trovato!");
        }
      } else {
        console.log("Utente non autenticato!");
      }
    },

    async salvaPreferenzeUtente() {
      const user = auth.currentUser;
      if (user) {
        const userRef = doc(db, 'users', user.uid);  // Usa l'uid dell'utente autenticato
        await setDoc(userRef, {
          rate: this.rate,
          pitch: this.pitch,
          volume: this.volume,
          selectedVoice: this.selectedVoice,
        });
      } else {
        console.log("Utente non autenticato!");
      }
    },

    leggiPagina() {
      if (this.parlando) {
        speechSynthesis.cancel(); // Ferma la lettura se già in corso
        this.parlando = false;
        return;
      }

      // Estrarre tutto il testo della pagina
      const tuttoIlTesto = document.body.innerText;

      // Creiamo un oggetto SpeechSynthesisUtterance per leggere il testo
      const utterance = new SpeechSynthesisUtterance(tuttoIlTesto);
      utterance.lang = 'it-IT';

      // Impostiamo la velocità, tono, volume e la voce selezionata
      utterance.rate = this.rate;   // Imposta la velocità
      utterance.pitch = this.pitch; // Imposta il tono
      utterance.volume = this.volume; // Imposta il volume
      utterance.voice = this.voices.find((voice) => voice.name === this.selectedVoice) || null; // Imposta la voce

      // Aggiungiamo eventi per sapere quando la lettura è terminata
      utterance.onstart = () => {
        this.parlando = true;
      };

      utterance.onend = () => {
        this.parlando = false;
      };

      // Avvia la lettura
      speechSynthesis.speak(utterance);
      this.sintesi = utterance; // Salva l'oggetto per interazioni future

      // Salva le preferenze dopo ogni lettura
      this.salvaPreferenzeUtente();
    },

    riprendiLettura() {
      if (this.sintesi && !this.parlando) {
        speechSynthesis.speak(this.sintesi);
        this.parlando = true;
      }
    }
  }
};
</script>

<style scoped>
/* Puoi aggiungere eventuali stili CSS personalizzati per il layout */
</style>
