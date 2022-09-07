const dayjs = require('dayjs')
const axios = require('axios')
const cheerio = require('cheerio')
const utc = require('dayjs/plugin/utc')
const customParseFormat = require('dayjs/plugin/customParseFormat')

dayjs.extend(utc)
dayjs.extend(customParseFormat)

module.exports = {
  site: 'tv24.se',
  url: function ({ channel, date }) {
    return `https://tv24.se/x/channel/${channel.site_id}/0/${date.format('YYYY-MM-DD')}`
  },
  parser: function ({ content, date }) {
    let programs = []
    const items = parseItems(content)
    items.forEach(item => {
      const prev = programs[programs.length - 1]
      const $item = cheerio.load(item)
      let start = parseStart($item, date)
      if (prev) {
        if (start.isBefore(prev.start)) {
          start = start.add(1, 'd')
          date = date.add(1, 'd')
        }
        prev.stop = start
      }
      const stop = start.add(30, 'm')
      programs.push({
        title: parseTitle($item),
        description: parseDescription($item),
        start,
        stop
      })
    })

    return programs
  },
  async channels() {
    let html = await axios
      .get(`https://tv24.se/x/settings/addremove`)
      .then(r => r.data)
      .catch(console.log)
    let $ = cheerio.load(html)
    const nums = $('li')
      .toArray()
      .map(item => $(item).data('channel'))
    html = await axios
      .get(`https://tv24.se`, {
        headers: {
          Cookie: `selectedChannels=${nums.join(',')}`
        }
      })
      .then(r => r.data)
      .catch(console.log)
    $ = cheerio.load(html)
    const items = $('li.c').toArray()

    return items.map(item => {
      const name = $(item).find('h3').text().trim()
      const link = $(item).find('.channel').attr('href')
      const [_, site_id] = link.match(/\/kanal\/(.*)/) || [null, null]

      return {
        lang: 'sv',
        site_id,
        name
      }
    })
  }
}

function parseTitle($item) {
  return $item('h3').text()
}

function parseDescription($item) {
  return $item('p').text()
}

function parseStart($item, date) {
  const time = $item('.time')

  return dayjs.utc(`${date.format('YYYY-MM-DD')} ${time}`, 'YYYY-MM-DD HH:mm')
}

function parseItems(content) {
  const $ = cheerio.load(content)

  return $('.program').toArray()
}
