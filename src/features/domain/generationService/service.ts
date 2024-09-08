import { GenerationRequest, RewriteRequest } from './models/generationModel'
import { GenerateRepository } from './repositories/interface'

export default class GenerateService {
  private repository: GenerateRepository

  constructor ({ repository }: {
    repository: GenerateRepository,
  }) {
    this.repository = repository
  }

  public loadDoc (id: string, source: File) {
    return this.repository.loadDoc(id, source)
  }

  public generate (source: GenerationRequest) {
    return this.repository.generate(source)
  }

  public rewrite (source: RewriteRequest) {
    return this.repository.rewrite(source)
  }

  public export (source: string[]) {
    return this.repository.export(source)
  }
}
