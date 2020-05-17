/*

DEBUG=nc* yarn tsn ./src/test/startServer.ts

http://localhost:8400/

 */
import { createDefaultApp, startServer } from '@naturalcycles/backend-lib'
import { pHang } from '@naturalcycles/js-lib'
import { runScript } from '@naturalcycles/nodejs-lib/dist/script'
import { createGrafanaJsonDatasourceHandler } from '../createGrafanaJsonDatasourceHandler'
import { githubDB } from './db'

runScript(async () => {
  const grafanaHandler = createGrafanaJsonDatasourceHandler({
    db: githubDB,
  })

  await startServer({
    port: 8400,
    expressApp: createDefaultApp({
      resources: [grafanaHandler],
    }),
  })

  await pHang()
})
