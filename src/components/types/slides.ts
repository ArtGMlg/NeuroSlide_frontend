import { ChartTypeRegistry, DefaultDataPoint } from 'chart.js'

export type SlidesTypes =
  | 'caption'
  | 'single_text'
  | 'table_of_contents'
  | 'text_pic'
  | 'text_plot'
  | 'title'

export type SlidesThemes =
  | 'antique'
  | 'blue'
  | 'red'

export type SlideImage = string

export interface SlideChart <T extends keyof ChartTypeRegistry> {
  type: T
  data: DefaultDataPoint<T>
}

export type SlideContent<T extends keyof ChartTypeRegistry | null> =
  T extends keyof ChartTypeRegistry
    ? SlideChart<T>
    : SlideImage

export interface Slide<T extends keyof ChartTypeRegistry | null> {
  type: SlidesTypes
  theme: SlidesThemes
  header: string
  text: string
  content?: SlideContent<T>
}

export interface SlideProp <T extends keyof ChartTypeRegistry | null>{
  slide: Slide<T>
}
