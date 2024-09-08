import { GenerationRequest, GenerationResponse, RewriteRequest } from '../models/generationModel'

export interface GenerateRepository {
  loadDoc: (id: string, source: File) => Promise<void>
  generate: (source: GenerationRequest) => Promise<GenerationResponse[]>
  rewrite: (source: RewriteRequest) => Promise<string>
  export: (source: string[]) => Promise<string>
}
