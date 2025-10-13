import { type NextFunction, type Request, type Response, Router } from "express"
import { Logger } from "../../utils/logger.js"
import { FbksXrpApiService } from "../ApiService.js"
import * as controllers from "../controllers/index.js"
import { requireBody, validateVaultAccount } from "../middleware.js"

const logger = new Logger("token-routes")

export const configureTokenRoutes = (api: FbksXrpApiService): Router => {
  const router: Router = Router()

  const tokenRoutes = [
    { path: "tokenTransfer", handler: controllers.tokenTransfer },
    { path: "accountSet", handler: controllers.accountSet },
    { path: "burnToken", handler: controllers.burnToken },
    { path: "clawback", handler: controllers.clawback },
    { path: "freezeToken", handler: controllers.freezeToken },
    { path: "trustSet", handler: controllers.trustSet },
    { path: "xrpTransfer", handler: controllers.xrpTransfer },
  ]

  for (const { path, handler } of tokenRoutes) {
    router.post(
      `/api/token/${path}/:vaultAccountId`,
      validateVaultAccount,
      requireBody,
      async (req: Request, res: Response, next: NextFunction) => {
        try {
          await handler(req, res, next, api)
        } catch (err) {
          logger.error(`Error in ${path} request:`, err)
          next(err)
        }
      },
    )
    router.post(`/api/token/${path}`, (req: Request, res: Response) => {
      logger.error(`Missing vault account ID for ${path} request`)
      res.status(400).json({
        error: "Missing vault account ID",
        message: "Vault account Id is missing from the request URL",
      })
    })
  }

  return router
}
