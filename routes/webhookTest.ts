/*
 * Copyright (c) 2014-2026 Bjoern Kimminich & the OWASP Juice Shop contributors.
 * SPDX-License-Identifier: MIT
 */

import { type Request, type Response, type NextFunction } from 'express'

export function testWebhook () {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const response = await fetch(req.body.url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ event: 'test' })
      })
      const body = await response.text()

      res.json({ status: response.status, body })
    } catch (error) {
      next(error)
    }
  }
}
