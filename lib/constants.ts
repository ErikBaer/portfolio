/**
 * Zentrale Constants-Datei
 * Lädt die richtige Locale-basierte Constants-Datei
 * 
 * Für Server-Side: Standardmäßig 'en' (kann später angepasst werden)
 * Für Client-Side: Wird über I18nProvider/useI18nSafe gesteuert
 */

import * as constantsDe from './constants.de'
import * as constantsEn from './constants.en'
import type { Locale } from './i18n-cookie'

export type ConstantsLocale = Locale

// Default: English (für SSR und Fallback - muss mit I18nProvider initial state übereinstimmen)
const DEFAULT_LOCALE: Locale = 'en'

/**
 * Gibt die Constants für eine bestimmte Locale zurück
 */
export function getConstants(locale: Locale = DEFAULT_LOCALE) {
  return locale === 'de' ? constantsDe : constantsEn
}

/**
 * Exportiert die Default-Locale Constants (für SSR und Fallback)
 * Diese werden verwendet, wenn kein Locale-Kontext verfügbar ist
 * WICHTIG: Muss mit I18nProvider initial state ('en') übereinstimmen, um Hydration-Mismatch zu vermeiden
 */
export const PERSONAL_INFO = constantsEn.PERSONAL_INFO
export const METADATA = constantsEn.METADATA
export const NAVIGATION = constantsEn.NAVIGATION
export const CONTACT_INFO = constantsEn.CONTACT_INFO
export const FEATURED_PROJECTS = constantsEn.FEATURED_PROJECTS
export const EXECUTIVE_SUMMARY = constantsEn.EXECUTIVE_SUMMARY
export const TECHNICAL_SKILLS = constantsEn.TECHNICAL_SKILLS
export const LEADERSHIP_SKILLS = constantsEn.LEADERSHIP_SKILLS
export const TECHNICAL_INTERESTS_DESCRIPTION = constantsEn.TECHNICAL_INTERESTS_DESCRIPTION
export const TECHNICAL_INTERESTS = constantsEn.TECHNICAL_INTERESTS
export const UI = constantsEn.UI

// Exportiere auch die Locale-spezifischen Exports für direkten Zugriff
export { constantsDe, constantsEn }
