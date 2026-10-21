/*
 * Copyright (c) 2014-2026 Bjoern Kimminich & the OWASP Juice Shop contributors.
 * SPDX-License-Identifier: MIT
 */

import chai from 'chai'
import sinon from 'sinon'

import { testWebhook } from '../../routes/webhookTest'

const expect = chai.expect

describe('webhookTest', () => {
  afterEach(() => {
    sinon.restore()
  })

  it('posts to the user-provided webhook URL', async () => {
    const fetchStub = sinon.stub(global, 'fetch').resolves(new Response('internal-response', { status: 200 }))
    const req = { body: { url: 'http://127.0.0.1:3000/admin' } } as any
    const res = { json: sinon.spy() } as any
    const next = sinon.spy()

    await testWebhook()(req, res, next)

    expect(fetchStub.calledWith('http://127.0.0.1:3000/admin')).to.equal(true)
    expect(res.json.calledWith({ status: 200, body: 'internal-response' })).to.equal(true)
    expect(next.called).to.equal(false)
  })
})
