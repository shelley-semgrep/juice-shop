/*
 * Copyright (c) 2014-2026 Bjoern Kimminich & the OWASP Juice Shop contributors.
 * SPDX-License-Identifier: MIT
 */

import { type Request, type Response, type NextFunction } from 'express'

import { UserModel } from '../models/user'

export function getUserDetails () {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await UserModel.findByPk(req.params.id, {
        attributes: ['id', 'username', 'email', 'role']
      })

      if (!user) {
        res.status(404).json({ error: 'User not found' })
        return
      }

      res.json(user)
    } catch (error) {
      next(error)
    }
  }
}
