import { DataService } from '../services/data'

export interface CoherenceMatrix {
  partyId: number
  partyName: string
  constraintScore: number // Overall coherence index (0 to 1)
  correlations: {
    subjectA: string
    subjectB: string
    correlation: number // Pearson or Tau-gamma value
  }[]
}

export const CoherenceRepository = (dataService: DataService) => {
  return {
    getCoherenceByParty: async (partyId: number): Promise<CoherenceMatrix> => {
      const data = await dataService.fetchData()
      // Logic to filter and return coherence matrix for a specific party
      // This will implement the Converse (1964) mapping
      return data.coherenceMatrices.find((m: any) => m.partyId === partyId)
    },
    getAllCoherenceScores: async (): Promise<CoherenceMatrix[]> => {
      const data = await dataService.fetchData()
      return data.coherenceMatrices || []
    },
  }
}
