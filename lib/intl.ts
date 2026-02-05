// Minimal intl shim to disable full i18n while keeping imports working
export const messages: Record<string, any> = {}
export const defaultLocale = 'es'

export function getLocaleFromPath(): string {
  return defaultLocale
}

export function t(key: string, locale?: string, vars?: Record<string, any>): string {
  const parts = String(key).split('.')
  let text = parts[parts.length - 1].replace(/[-_]/g, ' ')
  if (text.length > 0) text = text.charAt(0).toUpperCase() + text.slice(1)
  if (vars) {
    for (const k in vars) {
      text = text.replace(new RegExp(`\\{${k}\\}`, 'g'), String(vars[k]))
    }
  }
  return text
}

export default t
