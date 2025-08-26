export const canUseDom: boolean =
  !!(
    typeof window !== 'undefined' &&
    typeof document !== 'undefined' &&
    window.document &&
    window.document.createElement
  )