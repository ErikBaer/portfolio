import { describe, it, expect } from 'vitest'
import {
  getCaseStudyBySlug,
  getAllCaseStudies,
  getFeaturedProjects,
  type CaseStudy,
} from '../case-studies'

describe('case-studies module', () => {
  describe('getAllCaseStudies', () => {
    it('should return an array of case studies', () => {
      const studies = getAllCaseStudies()
      expect(Array.isArray(studies)).toBe(true)
      expect(studies.length).toBeGreaterThan(0)
    })

    it('should return case studies with all required fields', () => {
      const studies = getAllCaseStudies()
      
      studies.forEach((study) => {
        expect(study).toHaveProperty('slug')
        expect(study).toHaveProperty('title')
        expect(study).toHaveProperty('cap')
        expect(study).toHaveProperty('challenge')
        expect(study).toHaveProperty('approach')
        expect(study).toHaveProperty('outcome')
        expect(study).toHaveProperty('technicalHighlights')
        expect(study).toHaveProperty('tags')
        
        expect(typeof study.slug).toBe('string')
        expect(typeof study.title).toBe('string')
        expect(study.slug.length).toBeGreaterThan(0)
        expect(study.title.length).toBeGreaterThan(0)
      })
    })
  })

  describe('getCaseStudyBySlug', () => {
    it('should return a case study for a valid slug', () => {
      const studies = getAllCaseStudies()
      const firstStudy = studies[0]
      
      const result = getCaseStudyBySlug(firstStudy.slug)
      
      expect(result).toBeDefined()
      expect(result?.slug).toBe(firstStudy.slug)
      expect(result?.title).toBe(firstStudy.title)
    })

    it('should return undefined for an invalid slug', () => {
      const result = getCaseStudyBySlug('non-existent-slug')
      
      expect(result).toBeUndefined()
    })

    it('should return undefined for empty slug', () => {
      const result = getCaseStudyBySlug('')
      
      expect(result).toBeUndefined()
    })

    it('should handle all existing case study slugs', () => {
      const studies = getAllCaseStudies()
      const slugs = studies.map((s) => s.slug)
      
      slugs.forEach((slug) => {
        const result = getCaseStudyBySlug(slug)
        expect(result).toBeDefined()
        expect(result?.slug).toBe(slug)
      })
    })
  })

  describe('getFeaturedProjects', () => {
    it('should return an array of featured projects', () => {
      const featured = getFeaturedProjects()
      expect(Array.isArray(featured)).toBe(true)
    })

    it('should return only featured case studies', () => {
      const allStudies = getAllCaseStudies()
      const featuredStudies = allStudies.filter((s) => s.featured)
      const featured = getFeaturedProjects()
      
      expect(featured.length).toBe(featuredStudies.length)
    })

    it('should return projects with correct structure', () => {
      const featured = getFeaturedProjects()
      
      featured.forEach((project) => {
        expect(project).toHaveProperty('title')
        expect(project).toHaveProperty('description')
        expect(project).toHaveProperty('content')
        expect(project).toHaveProperty('technologies')
        expect(project).toHaveProperty('slug')
        
        expect(typeof project.title).toBe('string')
        expect(typeof project.description).toBe('string')
        expect(typeof project.content).toBe('string')
        expect(Array.isArray(project.technologies)).toBe(true)
        expect(typeof project.slug).toBe('string')
      })
    })

    it('should use tags as technologies', () => {
      const featured = getFeaturedProjects()
      const allStudies = getAllCaseStudies()
      
      featured.forEach((project) => {
        const study = allStudies.find((s) => s.slug === project.slug)
        expect(study).toBeDefined()
        expect(project.technologies).toEqual(study?.tags)
      })
    })

    it('should have at least one featured project', () => {
      const featured = getFeaturedProjects()
      expect(featured.length).toBeGreaterThan(0)
    })
  })

  describe('case study data integrity', () => {
    it('should have unique slugs', () => {
      const studies = getAllCaseStudies()
      const slugs = studies.map((s) => s.slug)
      const uniqueSlugs = new Set(slugs)
      
      expect(slugs.length).toBe(uniqueSlugs.size)
    })

    it('should have non-empty strings for critical fields', () => {
      const studies = getAllCaseStudies()
      
      studies.forEach((study) => {
        expect(study.slug.length).toBeGreaterThan(0)
        expect(study.title.length).toBeGreaterThan(0)
        expect(study.cap.length).toBeGreaterThan(0)
        expect(study.challenge.length).toBeGreaterThan(0)
        expect(study.approach.length).toBeGreaterThan(0)
        expect(study.outcome.length).toBeGreaterThan(0)
        expect(study.technicalHighlights.length).toBeGreaterThan(0)
        expect(study.tags.length).toBeGreaterThan(0)
      })
    })

    it('should have all tags as non-empty strings', () => {
      const studies = getAllCaseStudies()
      
      studies.forEach((study) => {
        study.tags.forEach((tag) => {
          expect(typeof tag).toBe('string')
          expect(tag.length).toBeGreaterThan(0)
        })
      })
    })
  })
})
