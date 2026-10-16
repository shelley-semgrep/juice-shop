/*
 * Copyright (c) 2014-2026 Bjoern Kimminich & the OWASP Juice Shop contributors.
 * SPDX-License-Identifier: MIT
 */

import chai from 'chai'
import sinon from 'sinon'

import { UserModel } from '../../models/user'
import { updateUserPassword } from '../../routes/userPassword'

const expect = chai.expect

describe('userPassword', () => {
  afterEach(() => {
    sinon.restore()
  })

  it('updates the password of the user selected by the request path', async () => {
    const update = sinon.stub().resolves()
    const findByPk = sinon.stub(UserModel, 'findByPk').resolves({ update } as any)
    const req = { params: { id: '1' }, body: { password: 'new-password' } } as any
    const res = { status: sinon.stub().returnsThis(), send: sinon.spy() } as any
    const next = sinon.spy()

    await updateUserPassword()(req, res, next)

    expect(findByPk.calledWith('1')).to.equal(true)
    expect(update.calledWith({ password: 'new-password' })).to.equal(true)
    expect(res.status.calledWith(204)).to.equal(true)
    expect(next.called).to.equal(false)
  })
})
