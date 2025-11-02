import { describe, it, expect } from 'vitest'
import {
  PERSONAL_INFO,
  CONTACT_INFO,
  EXECUTIVE_SUMMARY,
  TECHNICAL_SKILLS,
  LEADERSHIP_SKILLS,
  TECHNICAL_INTERESTS,
  FEATURED_PROJECTS,
  METADATA,
  NAVIGATION,
} from '../constants'

describe('constants module', () => {
  describe('PERSONAL_INFO', () => {
    it('should have all required fields', () => {
      expect(PERSONAL_INFO).toHaveProperty('name')
      expect(PERSONAL_INFO).toHaveProperty('title')
      expect(PERSONAL_INFO).toHaveProperty('shortDescription')
      expect(PERSONAL_INFO).toHaveProperty('availability')
      
      expect(typeof PERSONAL_INFO.name).toBe('string')
      expect(PERSONAL_INFO.name.length).toBeGreaterThan(0)
      expect(typeof PERSONAL_INFO.title).toBe('string')
      expect(PERSONAL_INFO.title.length).toBeGreaterThan(0)
    })
  })

  describe('CONTACT_INFO', () => {
    it('should have valid URLs', () => {
      expect(CONTACT_INFO).toHaveProperty('linkedin')
      expect(CONTACT_INFO).toHaveProperty('github')
      
      expect(CONTACT_INFO.linkedin).toMatch(/^https?:\/\//)
      expect(CONTACT_INFO.github).toMatch(/^https?:\/\//)
    })
  })

  describe('METADATA', () => {
    it('should have all required SEO fields', () => {
      expect(METADATA).toHaveProperty('title')
      expect(METADATA).toHaveProperty('description')
      expect(METADATA).toHaveProperty('generator')
      
      expect(typeof METADATA.title).toBe('string')
      expect(METADATA.title.length).toBeGreaterThan(0)
      expect(typeof METADATA.description).toBe('string')
      expect(METADATA.description.length).toBeGreaterThan(0)
    })
  })

  describe('NAVIGATION', () => {
    it('should have navigation items with valid hrefs', () => {
      expect(NAVIGATION).toHaveProperty('items')
      expect(Array.isArray(NAVIGATION.items)).toBe(true)
      expect(NAVIGATION.items.length).toBeGreaterThan(0)
      
      NAVIGATION.items.forEach((item) => {
        expect(item).toHaveProperty('label')
        expect(item).toHaveProperty('href')
        expect(typeof item.label).toBe('string')
        expect(typeof item.href).toBe('string')
        expect(item.href.startsWith('#')).toBe(true)
      })
    })
  })

  describe('EXECUTIVE_SUMMARY', () => {
    it('should have expertise areas and main text', () => {
      expect(EXECUTIVE_SUMMARY).toHaveProperty('expertiseAreas')
      expect(EXECUTIVE_SUMMARY).toHaveProperty('mainText')
      
      expect(Array.isArray(EXECUTIVE_SUMMARY.expertiseAreas)).toBe(true)
      expect(EXECUTIVE_SUMMARY.expertiseAreas.length).toBeGreaterThan(0)
      
      EXECUTIVE_SUMMARY.expertiseAreas.forEach((area) => {
        expect(area).toHaveProperty('title')
        expect(area).toHaveProperty('description')
        expect(area).toHaveProperty('icon')
        expect(typeof area.title).toBe('string')
        expect(area.title.length).toBeGreaterThan(0)
      })
      
      expect(typeof EXECUTIVE_SUMMARY.mainText).toBe('string')
      expect(EXECUTIVE_SUMMARY.mainText.length).toBeGreaterThan(0)
    })
  })

  describe('TECHNICAL_SKILLS', () => {
    it('should have skill categories with technologies', () => {
      expect(Array.isArray(TECHNICAL_SKILLS)).toBe(true)
      expect(TECHNICAL_SKILLS.length).toBeGreaterThan(0)
      
      TECHNICAL_SKILLS.forEach((skill) => {
        expect(skill).toHaveProperty('title')
        expect(skill).toHaveProperty('technologies')
        expect(typeof skill.title).toBe('string')
        expect(Array.isArray(skill.technologies)).toBe(true)
        expect(skill.technologies.length).toBeGreaterThan(0)
        
        skill.technologies.forEach((tech) => {
          expect(typeof tech).toBe('string')
          expect(tech.length).toBeGreaterThan(0)
        })
      })
    })
  })

  describe('LEADERSHIP_SKILLS', () => {
    it('should have an array of leadership skills', () => {
      expect(Array.isArray(LEADERSHIP_SKILLS)).toBe(true)
      expect(LEADERSHIP_SKILLS.length).toBeGreaterThan(0)
      
      LEADERSHIP_SKILLS.forEach((skill) => {
        expect(typeof skill).toBe('string')
        expect(skill.length).toBeGreaterThan(0)
      })
    })
  })

  describe('TECHNICAL_INTERESTS', () => {
    it('should have technical interests with details', () => {
      expect(Array.isArray(TECHNICAL_INTERESTS)).toBe(true)
      expect(TECHNICAL_INTERESTS.length).toBeGreaterThan(0)
      
      TECHNICAL_INTERESTS.forEach((interest) => {
        expect(interest).toHaveProperty('title')
        expect(interest).toHaveProperty('description')
        expect(interest).toHaveProperty('content')
        expect(interest).toHaveProperty('technologies')
        
        expect(typeof interest.title).toBe('string')
        expect(interest.title.length).toBeGreaterThan(0)
        expect(Array.isArray(interest.technologies)).toBe(true)
        expect(interest.technologies.length).toBeGreaterThan(0)
      })
    })
  })

  describe('FEATURED_PROJECTS', () => {
    it('should have featured projects with required fields', () => {
      expect(Array.isArray(FEATURED_PROJECTS)).toBe(true)
      expect(FEATURED_PROJECTS.length).toBeGreaterThan(0)
      
      FEATURED_PROJECTS.forEach((project) => {
        expect(project).toHaveProperty('title')
        expect(project).toHaveProperty('description')
        expect(project).toHaveProperty('content')
        expect(project).toHaveProperty('technologies')
        expect(project).toHaveProperty('slug')
        
        expect(typeof project.title).toBe('string')
        expect(project.title.length).toBeGreaterThan(0)
        expect(Array.isArray(project.technologies)).toBe(true)
      })
    })
  })
})
