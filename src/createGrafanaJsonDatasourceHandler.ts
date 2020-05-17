import { CommonTimeSeriesDao } from '@naturalcycles/db-lib/dist/timeseries/commonTimeSeriesDao'
import { pMap } from '@naturalcycles/js-lib'
import { dayjs } from '@naturalcycles/time-lib'
import type { RequestHandler } from 'express'
import { getRouter } from './getRouter'
import {
  GrafanaJsonDatastoreHandlerCfg,
  GrafanaQueryBody,
  GrafanaTimeseriesResponse,
} from './grafana.model'

/**
 * Exposes CommonDB (using CommonTimeSeriesDao) as Grafana Json Datasource.
 * https://github.com/simPod/grafana-json-datasource
 */
export function createGrafanaJsonDatasourceHandler(
  cfg: GrafanaJsonDatastoreHandlerCfg,
): RequestHandler {
  const tsDao = new CommonTimeSeriesDao(cfg)

  const router = getRouter()

  router.get('/', async (req, res) => {
    res.json({ ok: 1 })
  })

  router.post('/search', async (req, res) => {
    // const { body } = req
    // console.log({ body })

    const series = await tsDao.getSeries()

    res.json(series)
  })

  router.post('/query', async (req, res) => {
    const body = req.body as GrafanaQueryBody
    // console.log({ body })
    // console.log(body.targets)

    const { targets, range } = body

    const resp: GrafanaTimeseriesResponse = await pMap(
      targets,
      async targetObj => {
        const points = await tsDao.query({
          series: targetObj.target,
          fromIncl: dayjs(range.from).unixMillis(),
          toExcl: dayjs(range.to).unixMillis(),
        })

        return {
          target: targetObj.target,
          datapoints: points.map(([ts, v]) => [v!, ts] as [number, number]),
        }
      },
      { concurrency: 1 },
    )

    // const now = dayjs()
    //
    // const resp: GrafanaTimeseriesResponse = body.targets.map(targetObj => {
    //   const { target } = targetObj
    //   return {
    //     target,
    //     datapoints: _range(1, 10).map(i => [
    //       _randomInt(10, 20),
    //       now.unixMillis() - i * 60_000,
    //     ]),
    //   }
    // })

    res.json(resp)
  })

  router.post('/annotations', async (req, res) => {
    // const { body } = req
    // console.log({ body })

    // todo
    res.json([])
  })

  return router
}
