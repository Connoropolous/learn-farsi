import Papa from 'papaparse'

export default async function fetchAndParseCsv<DataType>(
  url: string
): Promise<DataType[]> {
  const response = await fetch(url)
  if (!response || !response.body) {
    throw new Error('no response from url: ' + url)
  }
  const reader = response.body.getReader()
  const result = await reader.read() // raw array
  const decoder = new TextDecoder('utf-8')
  const csv = decoder.decode(result.value) // the csv text
  const results = Papa.parse(csv, { delimiter: ', ', header: true }) // object with { data, errors, meta }
  return results.data // array of objects
}
