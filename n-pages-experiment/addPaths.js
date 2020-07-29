/* eslint-disable no-console */
const fs = require('fs')

const getJson = (relativePath) =>
  JSON.parse(fs.readFileSync(`${__dirname}/${relativePath}`))

const run = (nProducts) => {
  const products = getJson(`products.json`)
  const currentPaths = getJson(`../originalPaths.json`)

  const selectedProducts = products.filter((product, i) => i < nProducts)

  const result = [...currentPaths, ...selectedProducts]

  fs.writeFileSync(
    `${__dirname}/../staticPaths.json`,
    JSON.stringify(result, undefined, 2)
  )
}

const n = process.env.PRODUCTS

run(n)
