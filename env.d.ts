/// <reference types="vite/client" />
/// <reference types="vue/ref-macros" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    // Add any global properties here
  }
}

// Ensure Vue types are properly resolved
declare module 'vue' {
  export * from '@vue/runtime-dom'
}
