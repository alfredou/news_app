import en from '../locales/en.json'
import es from '../locales/es.json'

export const messages: Record<string, any> = { en, es }
export const defaultLocale = 'es'

export function getLocaleFromPath(): string {
  if (typeof window === 'undefined') return defaultLocale
  const parts = window.location.pathname.split('/').filter(Boolean)
  if (parts.length === 0) return defaultLocale
  const first = parts[0]
  return Object.keys(messages).includes(first) ? first : defaultLocale
}

export function t(key: string, locale?: string, vars?: Record<string, string | number>){
  const loc = locale || getLocaleFromPath()
  const m = messages[loc] || messages[defaultLocale]
  const parts = key.split('.')
  let v: any = m
  for(const p of parts){
    v = v?.[p]
    if(v == null) return key
  }
  if(vars){
    Object.keys(vars).forEach(k=>{
      v = v.replace(`{${k}}`, String(vars[k]))
    })
  }
  return v
}
