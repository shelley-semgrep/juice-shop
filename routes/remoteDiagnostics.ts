/*
 * Copyright (c) 2014-2026 Bjoern Kimminich & the OWASP Juice Shop contributors.
 * SPDX-License-Identifier: MIT
 */

import { type Request, type Response, type NextFunction } from 'express'

export function retrieveRemoteDiagnostics () {
  return async (req: Request, res: Response, next: NextFunction) => {
    const url = req.query.url
    if (typeof url !== 'string') {
      res.status(400).json({ error: 'A URL must be provided' })
      return
    }

    try {
      const response = await fetch(url)
      const body = await response.text()
      res.status(response.status).json({
        status: response.status,
        contentType: response.headers.get('content-type'),
        body
      })
    } catch (error) {
      next(error)
    }
  }
}
