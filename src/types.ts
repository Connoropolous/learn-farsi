export function randomFromEnum<T>(anEnum: T): T[keyof T] {
  const enumValues = (Object.keys(anEnum)
    .map((n) => Number.parseInt(n))
    .filter((n) => !Number.isNaN(n)) as unknown) as T[keyof T][]
  const randomIndex = Math.floor(Math.random() * enumValues.length)
  const randomEnumValue = enumValues[randomIndex]
  return randomEnumValue
}

export enum WordType {
  NOUN,
  VERB,
}

export interface Verb {
  type: WordType.VERB
  Picture: string
  English: string
  Fanglish: string
  SimplePresentRoot: string
  Farsi: string
  Pronunciation: string
}

export interface Noun {
  type: WordType.NOUN
  Picture: string
  English: string
  Fanglish: string
  Farsi: string
  Pronunciation: string
}
