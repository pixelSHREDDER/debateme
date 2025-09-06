import { FallacyType } from './constants'

export interface DetectedFallacy {
  id: string
  from: number
  to: number
  text: string
  key: string
  type: FallacyType.Logical | FallacyType.Rorschach
}

export interface ILogicalPopupData extends LogicalFallacy {
  originalText: string,
  instanceKey: string,
  popupType: FallacyType.Logical,
}

export interface IRorschachPopupData extends RorschachTerm {
  originalText: string,
  instanceKey: string,
  popupType: FallacyType.Rorschach,
}

export interface LogicalFallacy {
  id: string
  name: string
  description: string
  example: string
  pattern: string
  rebuttal: string
  recommendation: string
  url: string
}

export interface RorschachTerm {
  id: string
  term: string
  meanings: string[]
  pattern: string
  rebuttal: string
  recommendation: string
  urls: string[]
}
