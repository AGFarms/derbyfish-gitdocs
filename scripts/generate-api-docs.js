const fs = require('fs')
const path = require('path')

function findRouteFiles(dir) {
  const results = []
  if (!fs.existsSync(dir)) return results
  const items = fs.readdirSync(dir, { withFileTypes: true })
  for (const item of items) {
    const fullPath = path.join(dir, item.name)
    if (item.isDirectory()) {
      results.push(...findRouteFiles(fullPath))
    } else if (item.name === 'route.ts' || item.name === 'route.js') {
      results.push(fullPath)
    }
  }
  return results
}

function extractMethods(content) {
  const methods = []
  const methodPattern = /export\s+(?:async\s+)?function\s+(GET|POST|PUT|PATCH|DELETE)\b/g
  let match
  while ((match = methodPattern.exec(content)) !== null) {
    methods.push(match[1])
  }
  return methods
}

function routePathFromFile(filePath, baseDir) {
  const relative = path.relative(baseDir, filePath)
  const parts = relative.split(path.sep)
  parts.pop()
  const route = '/' + parts.join('/')
  return route.replace(/\[([^\]]+)\]/g, ':$1')
}

function generateDocs(repoDir) {
  const apiDir = path.join(repoDir, 'src', 'app', 'api')
  if (!fs.existsSync(apiDir)) {
    console.log(`No API directory found at ${apiDir}`)
    return ''
  }

  const routeFiles = findRouteFiles(apiDir)
  const endpoints = []

  for (const file of routeFiles) {
    const content = fs.readFileSync(file, 'utf8')
    const methods = extractMethods(content)
    const routePath = routePathFromFile(file, path.join(repoDir, 'src', 'app'))

    for (const method of methods) {
      endpoints.push({ method, path: routePath })
    }
  }

  endpoints.sort(function (a, b) {
    return a.path.localeCompare(b.path) || a.method.localeCompare(b.method)
  })

  let md = '# API Endpoints (Auto-Generated)\n\n'
  md += `Generated on ${new Date().toISOString().split('T')[0]}\n\n`
  md += '| Method | Path |\n|--------|------|\n'

  for (const ep of endpoints) {
    md += `| ${ep.method} | \`${ep.path}\` |\n`
  }

  return md
}

function main() {
  const webRepo = process.argv[2] || '../derbyfish-web'
  const outputFile = process.argv[3] || path.join(__dirname, '..', 'api', 'endpoints.md')

  console.log(`Scanning ${webRepo} for API routes...`)
  const docs = generateDocs(webRepo)

  if (docs) {
    fs.mkdirSync(path.dirname(outputFile), { recursive: true })
    fs.writeFileSync(outputFile, docs)
    console.log(`Wrote ${outputFile}`)
  } else {
    console.log('No endpoints found.')
  }
}

main()
