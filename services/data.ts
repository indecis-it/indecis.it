import { Property } from 'csstype'
import Color = Property.Color

export enum Endorsement {
  GREEN = 'green',
  GREY = 'grey',
  RED = 'red',
  YELLOW = 'yellow',
}

export interface ArticleData {
  id: number
  post_id: number
  url: string
  post_title: string
  post_subtitle: string
  type: string
  source: string
  subject: string
  list: string
  subject_id: number | ''
  list_id: number | ''
}

export interface CategoryData {
  id: number
  description?: string
  name?: string
  description_en: string
  description_it: string
  name_en: string
  name_it: string
  source: 'EUROSTAT' | 'indecis.it'
  slug: string
}

export interface EndorsementData {
  id: number
  color_code: Color
  description: string
  icon: Endorsement
}

export interface ItemData {
  id: number
  category_id: number
  category: string
  description: string
  endorsement: string
  subject: string
  subject_slug: string
  list: string
  list_id?: number | string
  source_slug: string
  source_title: string
}

export interface ListData {
  id: number
  list: string
  slug: string
  symbol_name: string
  symbol_url: string
}

export interface SourceData {
  id: number
  list: string
  slug: string
  title: string
  type:
    | 'accordo elettorale'
    | 'campagna elettorale'
    | 'conferenza stampa'
    | 'programma'
    | 'tweet'
  url: string
}

export interface SubjectData {
  id: number
  description: string
  slug: string
  source?: string
  subject: string
  title?: string
  url: string
}

const REMOTE_BASE_URL =
  'https://raw.githubusercontent.com/indecis-it/data/main/data'

/**
 * Helper to fetch JSON data.
 * In development, it attempts to read from a local 'data' repository
 * assumed to be a sibling of this project.
 */
const fetchJSON = async <T>(fileName: string): Promise<T> => {
  // If in development and on server-side, try loading local files
  // if (process.env.NODE_ENV === 'development' && typeof window === 'undefined') {
  //   try {
  //     const fs = require('fs')
  //     const path = require('path')
  //     // Default assumes the 'data' repo is cloned at the same level as 'indecis.it'
  //     const localPath = path.join(process.cwd(), '..', 'data', 'data', fileName)

  //     if (fs.existsSync(localPath)) {
  //       const content = fs.readFileSync(localPath, 'utf-8')
  //       return JSON.parse(content)
  //     }
  //   } catch (e) {
  //     console.warn(`Local file ${fileName} not found, falling back to remote.`)
  //   }
  // }

  const response = await fetch(`${REMOTE_BASE_URL}/${fileName}`)
  return response.json()
}

const getArticlesData = (): Promise<ArticleData[]> =>
  fetchJSON<ArticleData[]>('press.json')

const getCategoriesData = (): Promise<CategoryData[]> =>
  fetchJSON<CategoryData[]>('categories.json')

const getEndorsementsData = (): Promise<EndorsementData[]> =>
  fetchJSON<EndorsementData[]>('endorsements.json')

const getItemsData = (): Promise<ItemData[]> =>
  fetchJSON<ItemData[]>('items.json')

const getListsData = (): Promise<ListData[]> =>
  fetchJSON<ListData[]>('lists.json')

const getSourcesData = (): Promise<SourceData[]> =>
  fetchJSON<SourceData[]>('sources.json')

const getSubjectsData = (): Promise<SubjectData[]> =>
  fetchJSON<SubjectData[]>('glossary.json')

export const dataService = {
  getArticlesData,
  getCategoriesData,
  getEndorsementsData,
  getListsData,
  getItemsData,
  getSourcesData,
  getSubjectsData,
}
