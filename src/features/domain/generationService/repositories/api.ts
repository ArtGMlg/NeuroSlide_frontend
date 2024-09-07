import AjaxService from '@/features/core/ajax/service'
import { GenerateRepository } from './interface'
import { GenerationRequest, GenerationResponse, RewriteRequest } from '../models/generationModel'

export default class GenerateApiRepository implements GenerateRepository {
  private ajaxService: AjaxService

  private baseUrl = ''

  constructor ({ ajaxService }: {
    ajaxService: AjaxService
  }) {
    this.ajaxService = ajaxService
  }

  public loadDoc: (id: string, source: File) => Promise<void> = (id: string, source: File) => {
    const formData = new FormData()
    formData.append('file', source)

    return this.ajaxService.post({
      url: `/upload_doc?chat_id=${id}`,
      data: formData,
      config: {
        headers: {
          'content-type': 'multipart/form-data',
        },
      },
    })
  }

  // eslint-disable-next-line max-len
  public generate: (source: GenerationRequest) => Promise<GenerationResponse[]> = (source: GenerationRequest) => this.ajaxService.post({
    url: '/get_base_presentation',
    data: {
      chat_id: source.chatId,
      message: source.message,
    },
  })
    .then((res) => res)

  // eslint-disable-next-line max-len
  public rewrite: (source: RewriteRequest) => Promise<string> = (source: RewriteRequest) => this.ajaxService.post({
    url: '/rewrite_text',
    data: {
      chat_id: source.chatId,
      message: source.message,
      old_text: source.oldMessage,
    },
  })
    .then((res) => res)
}
