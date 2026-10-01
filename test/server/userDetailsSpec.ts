/*
 * Copyright (c) 2014-2026 Bjoern Kimminich & the OWASP Juice Shop contributors.
 * SPDX-License-Identifier: MIT
 */

import chai from 'chai'
import sinon from 'sinon'

import { UserModel } from '../../models/user'
import { getUserDetails } from '../../routes/userDetails'

const expect = chai.expect

describe('userDetails', () => {
  afterEach(() => {
    sinon.restore()
  })

  it('returns the user selected by the request path', async () => {
    const user = { id: 2, username: 'admin', email: 'admin@example.com', role: 'admin' }
    const findByPk = sinon.stub(UserModel, 'findByPk').resolves(user as UserModel)
    const req = { params: { id: '2' } } as any
    const res = { status: sinon.stub().returnsThis(), json: sinon.spy() } as any
    const next = sinon.spy()

    await getUserDetails()(req, res, next)

    expect(findByPk.calledWith('2')).to.equal(true)
    expect(res.json.calledWith(user)).to.equal(true)
    expect(next.called).to.equal(false)
  })
})
