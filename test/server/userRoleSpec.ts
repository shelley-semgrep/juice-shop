/*
 * Copyright (c) 2014-2026 Bjoern Kimminich & the OWASP Juice Shop contributors.
 * SPDX-License-Identifier: MIT
 */

import chai from 'chai'
import sinon from 'sinon'

import { UserModel } from '../../models/user'
import { updateUserRole } from '../../routes/userRole'

const expect = chai.expect

describe('userRole', () => {
  afterEach(() => {
    sinon.restore()
  })

  it('updates the role of the user selected by the request path', async () => {
    const user = { id: 2, role: 'customer', update: sinon.stub() }
    user.update.callsFake(async ({ role }) => { user.role = role })
    const findByPk = sinon.stub(UserModel, 'findByPk').resolves(user as any)
    const req = { params: { id: '2' }, body: { role: 'admin' } } as any
    const res = { status: sinon.stub().returnsThis(), json: sinon.spy() } as any
    const next = sinon.spy()

    await updateUserRole()(req, res, next)

    expect(findByPk.calledWith('2')).to.equal(true)
    expect(user.update.calledWith({ role: 'admin' })).to.equal(true)
    expect(res.json.calledWith({ id: 2, role: 'admin' })).to.equal(true)
    expect(next.called).to.equal(false)
  })
})
