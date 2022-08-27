const dayjs = require('dayjs')
const utc = require('dayjs/plugin/utc')
const timezone = require('dayjs/plugin/timezone')
const customParseFormat = require('dayjs/plugin/customParseFormat')

dayjs.extend(utc)
dayjs.extend(customParseFormat)
dayjs.extend(timezone)

module.exports = {
  site: 'raiplay.it',
  url: function ({ date, channel }) {
    return `https://www.raiplay.it/palinsesto/app/${channel.site_id}/${date.format('DD-MM-YYYY')}.json`
  },
  parser: function ({ content, date }) {
    const programs = []
    const data = JSON.parse(content)
    if (!data.events) return programs

    data.events.forEach(item => {
      if (item.name && item.hour && item.duration_in_minutes) {
        const startDate = dayjs.tz(item.hour, 'HH:mm','Europe/Rome')
          .set('D', date.get('D'))
          .set('M', date.get('M'))
          .set('y', date.get('y'))
        const start = startDate.toJSON()
        const duration = parseInt(item.duration_in_minutes)
        const stopDate = startDate.add(duration,'m')
        const stop = stopDate.toJSON()

        programs.push({
          title: item.name || item.program.name,
          description: item.description,
          season: item.season || null,
          episode: item.episode || null,
          sub_title : item['episode_title'] || null,
          url : parseURL(item),
          start,
          stop,
          icon: parseIcon(item)
        })
      }
    })

    return programs
  }
}

function parseIcon(item) {
  let cover = null;
  if(item.image){
    cover = `https://www.raiplay.it${item.image}`
  }
  return cover
}

function parseURL(item) {
  let url = null
  if(item.weblink){
    url = `https://www.raiplay.it${item.weblink}`
  }
  if(item.event_weblink){
    url = `https://www.raiplay.it${item.event_weblink}`
  }
  return url
}
