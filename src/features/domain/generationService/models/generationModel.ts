export interface GenerationRequest {
  chatId: string
  message: string
}

export interface RewriteRequest {
  chatId: string
  message: string
  oldMessage: string
}

export interface GenerationResponse {
  title: string
  text: string
}
