/* eslint-disable no-console */
const fs = require('fs')

const lineReader = require('line-reader')

const loadFileLines = (filePath) => {
  return new Promise((resolve, reject) => {
    const lines = []

    lineReader.eachLine(
      filePath,
      (line) => {
        lines.push(line)

        return true
      },
      (err) => {
        err && reject(err)
        resolve(lines)
      }
    )
  })
}

const getRawResultsMap = async () => {
  const RESULTS_PATH = `${__dirname}/raw-results/`
  const files = fs.readdirSync(RESULTS_PATH)
  const promises = files.map((file) => loadFileLines(RESULTS_PATH + file))
  const allLines = await Promise.all(promises)
  const rawResultsMap = files.reduce((resultsMap, file, i) => {
    const filteredLines = allLines[i].filter((line) => {
      return line.includes('success') || line.includes('Done')
    })

    return { ...resultsMap, [file]: filteredLines }
  }, {})

  return rawResultsMap
}

const extractData = (rawLine) => {
  const joinRawName = (name) => name.trim().split(' ').join('_')
  const formatTime = (rawTime) => rawTime.split('s')[0].trim()

  if (rawLine.includes('success')) {
    const [_, nameAndTime] = rawLine.split('success')
    const splited = nameAndTime.trim().split(' - ')
    const [rawName, rawTime, extraInfo] = splited

    const result = { [joinRawName(rawName)]: formatTime(rawTime) }

    if (extraInfo && rawLine.includes('static HTML')) {
      const [pages] = extraInfo.trim().split('/')

      result.pages = pages
    }

    return result
  }

  if (rawLine.includes('Done in')) {
    const [_, __, rawTime] = rawLine.split(' ')

    return { total_time: formatTime(rawTime) }
  }

  return {}
}

const run = async () => {
  const rawResultsMap = await getRawResultsMap()
  const results = Object.keys(rawResultsMap).map((key) => {
    const rawResults = rawResultsMap[key]

    return rawResults.reduce(
      (extractedResults, line) => {
        return { ...extractedResults, ...extractData(line) }
      },
      { key }
    )
  })

  console.log(JSON.stringify(results, null, 2))
}

run()
