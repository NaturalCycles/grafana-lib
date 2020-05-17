import type { CommonTimeSeriesDaoCfg } from '@naturalcycles/db-lib/dist/timeseries/timeSeries.model'

export interface GrafanaJsonDatastoreHandlerCfg extends CommonTimeSeriesDaoCfg {}

export interface GrafanaQueryBody {
  range: {
    from: string
    to: string
    // raw?: any
  }
  maxDataPoints: number
  targets: GrafanaQueryTarget[]
  adhocFilters?: GrafanaAdHocFilter[]
}

export interface GrafanaQueryTarget {
  target: string
  hide: boolean
  type: 'timeseries' | 'table'
  data?: any
}

export interface GrafanaAdHocFilter {
  key: string
  operator: string
  value: any
}

export type GrafanaTimeseriesResponse = GrafanaTimeseriesTargetResponse[]

export interface GrafanaTimeseriesTargetResponse {
  target: string
  datapoints: [number, number][]
}
