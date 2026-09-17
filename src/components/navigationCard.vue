<template>
  <component
    :is="route ? 'RouterLink' : 'button'"
    :to="route ? route : undefined"
    class="nav-card cat-tile"
    :style="{
      '--tint': `var(--cat-${category})`,
      '--edge': `var(--cat-${category}-edge)`,
      minHeight: cardHeight,
    }"
    :data-category="category"
  >
    <div class="nav-card-icon pictogram-tile">
      <slot name="icon">
        <img :src="resolvedIcon" alt="" class="w-20 h-20" @error="handleImageError" />
      </slot>

      <div v-if="resolvedAdditionalIcons.length" class="flex gap-2">
        <img
          v-for="(icon, index) in resolvedAdditionalIcons"
          :key="index"
          :src="icon"
          alt=""
          class="w-20 h-20"
          @error="handleImageError"
        />
      </div>
    </div>

    <div class="nav-card-text text-h3">
      {{ text }}
    </div>

    <button
      v-if="addable"
      class="btn-secondary mt-2"
      type="button"
      @click.stop="handleAdd"
    >
      +
    </button>
  </component>
</template>

<script lang="ts">
import fallbackIcon from '../assets/icons/undefined.png'

const CATEGORIES = [
  'people',
  'verb',
  'descr',
  'noun',
  'social',
  'quest',
  'neg',
  'other',
] as const
type Category = (typeof CATEGORIES)[number]

export default {
  name: 'NavigationCard',
  props: {
    text: {
      type: String,
      required: false,
    },
    icon: {
      type: String,
      required: true,
    },
    route: {
      type: String,
      required: false,
    },
    /** Fitzgerald-key category driving the card's tint/edge colors. */
    color: {
      type: String,
      required: false,
      default: 'other',
    },
    cardWidth: {
      type: String,
      required: false,
    },
    cardHeight: {
      type: String,
      required: false,
      default: '15rem',
    },
    borderRadius: {
      type: String,
      required: false,
    },
    additionalIcons: {
      type: Array,
      required: false,
      default: () => [],
    },
    showDivider: {
      type: Boolean,
      required: false,
      default: true, // Divider is shown by default
    },
    addable: {
      type: Boolean,
      required: false,
      default: false, // Determines if the "plus" button is shown
    },
    id: {
      type: String,
      required: false,
    },
  },
  computed: {
    category(): Category {
      return (CATEGORIES as readonly string[]).includes(this.color)
        ? (this.color as Category)
        : 'other'
    },
    resolvedIcon() {
      // If the icon is a full URL, use it directly; otherwise, resolve local asset
      return this.icon.startsWith('http')
        ? this.icon
        : new URL(`../assets/icons/${this.icon}`, import.meta.url).href
    },
    resolvedAdditionalIcons() {
      // Ensure valid URLs are resolved for additional icons
      return this.additionalIcons.map((icon) => {
        try {
          const iconStr = icon as string
          return iconStr.startsWith('http')
            ? iconStr
            : new URL(`../assets/icons/${iconStr}`, import.meta.url).href
        } catch {
          console.error(`Invalid icon path: ${icon}`)
          return ''
        }
      })
    },
  },
  methods: {
    handleImageError(event: Event) {
      console.warn('Image failed to load:', (event.target as HTMLImageElement).src)
      ;(event.target as HTMLImageElement).src = fallbackIcon
    },
    handleAdd() {
      this.$emit('add', this.id) // Ora passa l'ID corretto
    },
  },
}
</script>

<style scoped>
.nav-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--space-4);
  padding: var(--space-4);
  text-decoration: none;
  width: 100%;
}

.nav-card-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-2);
}

.nav-card-text {
  color: var(--ink);
  font-weight: 700;
  text-align: center;
  line-height: 1.2;
}
</style>
