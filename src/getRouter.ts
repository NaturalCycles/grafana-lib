import { Router } from 'express'
import PromiseRouter from 'express-promise-router'

// Copy-pasted here to not depend on backend-lib
export function getRouter(): Router {
  return PromiseRouter()
}
