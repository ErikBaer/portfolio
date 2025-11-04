import { describe, it, expect } from 'vitest'
import {
  getCaseStudyBySlug,
  getAllCaseStudies,
  getFeaturedProjects,
} from '../case-studies'

describe('case-studies module', () => {
  describe('getAllCaseStudies', () => {
    it('should return an array of case studies', () => {
      const studies = getAllCaseStudies()
      expect(Array.isArray(studies)).toBe(true)
      expect(studies.length).toBeGreaterThan(0)
    })
  })

  describe('getCaseStudyBySlug', () => {
    it('should return a case study for a valid slug', () => {
      const studies = getAllCaseStudies()
      const firstStudy = studies[0]
      
      const result = getCaseStudyBySlug(firstStudy.slug)
      
      expect(result).toBeDefined()
      expect(result?.slug).toBe(firstStudy.slug)
    })

    it('should return undefined for an invalid slug', () => {
      const result = getCaseStudyBySlug('non-existent-slug')
      expect(result).toBeUndefined()
    })
  })

  describe('getFeaturedProjects', () => {
    it('should return an array of featured projects', () => {
      const featured = getFeaturedProjects()
      expect(Array.isArray(featured)).toBe(true)
      expect(featured.length).toBeGreaterThan(0)
    })
  })

  describe('data integrity', () => {
    it('should have unique slugs', () => {
      const studies = getAllCaseStudies()
      const slugs = studies.map((s) => s.slug)
      const uniqueSlugs = new Set(slugs)
      
      expect(slugs.length).toBe(uniqueSlugs.size)
    })
  })
})
