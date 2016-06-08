import moment from 'moment'

export const binByTime1 = (inputData, field = 'created_at', unit = 'month') => {
  // const groups = _.groupBy(data, 'status')

  //
  // normalize
  //

  let data = inputData

  // _.map(inputData,(d) => {
  //   return moment(d[field]).startOf('year')
  // })
  //
  const startTime = _.min(_.map(data, field))
  const endTime = _.max(_.map(data, field))
  const duration = (endTime - startTime)

  const numOfBins = 5
  const durationPerBin = duration / numOfBins

  console.log(moment.duration(endTime-startTime).days(), 'days')

  const processedData = _(data)
    .map(f=>f)
    .filter(f=>f[field])
    .map((d) => {
      return {
        ...d,
        binId: Math.ceil((d[field] - startTime) / durationPerBin)
      }
    })
    .value()

  const groups = _.groupBy(processedData, 'binId')
  const bins = _.map(groups, (g, key) => {
    return {
      name: key,
      pv: g.length
    }
  })
  return bins
}

export const binByTime = (inputData, field = 'created_at', unit = 'month') => {
  // const groups = _.groupBy(data, 'status')

  //
  // normalize
  //

  let data = inputData

  data = _.map(inputData,(d) => {
    return moment(d[field]).startOf(unit)
  })

  // console.log('data', data)
  // return []

  const startTime = _.min(_.map(data))
  const endTime = _.max(_.map(data))
  const duration = (endTime - startTime)
  //
  // const numOfBins = 5
  // const durationPerBin = duration / numOfBins
  // console.log(endTime.diff(startTime, unit), unit)
  let unitCounts = endTime.diff(startTime, unit)
  let i = 0
  let o = startTime
  let aa = []
  for (i = 0; i < unitCounts; ++i){
    o = moment(o).add(1, unit)
    data.push(o)
  }

  //

  // const processedData = _(data)
  //   .map(f=>f)
  //   .filter(f=>f[field])
  //   .map((d) => {
  //     return {
  //       ...d,
  //       binId: Math.ceil((d[field] - startTime) / durationPerBin)
  //     }
  //   })
  //   .value()

  const groups = _.groupBy(data)
  console.log('groups', groups)

  const bins = _(groups)
    .map((g, key) => {
      // console.log('key', key)
      return {
        name: moment(key).format('YY-MM'),
        pv: g.length - 1
      }
    })
    .sortBy('name')
    .value()

  return bins
}
