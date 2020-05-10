export enum Inflections {
  FIRST_PERSON_SINGULAR,
  FIRST_PERSON_PLURAL,
  SECOND_PERSON_SINGULAR,
  SECOND_PERSON_PLURAL,
  THIRD_PERSON_SINGULAR,
  THIRD_PERSON_PLURAL,
}

export const simplePresentPronouns: {
  [key: string]: string
} = {
  [Inflections.FIRST_PERSON_SINGULAR]: 'man',
  [Inflections.FIRST_PERSON_PLURAL]: 'ma',
  [Inflections.SECOND_PERSON_SINGULAR]: 'to',
  [Inflections.SECOND_PERSON_PLURAL]: 'shoma',
  [Inflections.THIRD_PERSON_SINGULAR]: 'u',
  [Inflections.THIRD_PERSON_PLURAL]: 'unha',
}

const simplePresentConjugations: {
  [key: string]: string
} = {
  [Inflections.FIRST_PERSON_SINGULAR]: 'am',
  [Inflections.FIRST_PERSON_PLURAL]: 'im',
  [Inflections.SECOND_PERSON_SINGULAR]: 'i',
  [Inflections.SECOND_PERSON_PLURAL]: 'id',
  [Inflections.THIRD_PERSON_SINGULAR]: 'ad',
  [Inflections.THIRD_PERSON_PLURAL]: 'and',
}

export function conjugateSimplePresent(
  simplePresentRoot: string,
  inflection: Inflections
): string {
  // just concatenate the simple present root with the correct conjugated ending for the specified inflection
  return `${simplePresentRoot}${simplePresentConjugations[inflection]}`
}
