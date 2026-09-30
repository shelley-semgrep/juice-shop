/*
 * Copyright (c) 2014-2026 Bjoern Kimminich & the OWASP Juice Shop contributors.
 * SPDX-License-Identifier: MIT
 */

import chai from 'chai'
import sinon from 'sinon'

import { retrieveRemoteDiagnostics } from '../../routes/remoteDiagnostics'

const expect = chai.expect

describe('remoteDiagnostics', () => {
  afterEach(() => {
    sinon.restore()
  })

  it('fetches a user-controlled URL', async () => {
    const fetchStub = sinon.stub(global, 'fetch').resolves(new Response('internal-service-response', {
      status: 200,
      headers: { 'content-type': 'text/plain' }
    }))
    const req = { query: { url: 'http://127.0.0.1:3000/admin' } } as any
    const res = { status: sinon.stub().returnsThis(), json: sinon.spy() } as any
    const next = sinon.spy()

    await retrieveRemoteDiagnostics()(req, res, next)

    expect(fetchStub.calledWith('http://127.0.0.1:3000/admin')).to.equal(true)
    expect(res.json.calledWith({
      status: 200,
      contentType: 'text/plain',
      body: 'internal-service-response'
    })).to.equal(true)
    expect(next.called).to.equal(false)
  })
})
