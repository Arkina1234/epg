const { execSync } = require('child_process')
const fs = require('fs-extra')
const path = require('path')

beforeEach(() => {
  fs.emptyDirSync('tests/__data__/output')

  const stdout = execSync(
    'DB_DIR=tests/__data__/output/database LOGS_DIR=tests/__data__/output/logs CHANNELS_PATH=tests/__data__/input/sites/example.com_ca-*.channels.xml npm run queue:create -- --max-clusters=1 --days=2',
    { encoding: 'utf8' }
  )
})

it('can create queue', () => {
  let output = content('tests/__data__/output/database/queue.db')
  let expected = content('tests/__data__/expected/database/create-queue/queue.db')

  output = output.map(i => {
    i._id = null
    i.date = null
    return i
  })
  expected = expected.map(i => {
    i._id = null
    i.date = null
    return i
  })

  expect(output).toEqual(
    expect.arrayContaining([
      expect.objectContaining(expected[0]),
      expect.objectContaining(expected[1])
    ])
  )
})

function content(filepath) {
  const data = fs.readFileSync(path.resolve(filepath), {
    encoding: 'utf8'
  })

  return data
    .split('\n')
    .filter(l => l)
    .map(l => {
      return JSON.parse(l)
    })
}
