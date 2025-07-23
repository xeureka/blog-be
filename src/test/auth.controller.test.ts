/**
 * 
 * controllers ( by simply testing auth controller )
 * 
 * middlewares ( by testing auth.ts)
 * 
 * routes (by testing auth route)
 * 
 * db models ( by testing the user route)
 * 
 * utils ( by testing the db.connect.ts) 
 */

/** Testing a controller (Jest functions to know)
 * describe : groups a set of related tasks
 * 
 * it / test defines a single test case
 * 
 * expect : used to make assertiinos (I expect this equal to that)
 * 
 * jest.mock() : fakes a module or function so you can conrol its behavior in test
 * 
 * jest.fn() createad a mock function that you can control and inspect
 * 
 * beforeEach / afterEach : setup/cleanup logic that reuns before/after each test
 * 
 */

/** Supertest: tool for simulating http requests against your express app
 * 
 * request(app) : send a simulated http request to your express app
 * 
 * .get,post,put simulated different types of http methods
 * 
 * .expect(...) asserts expected status code or response bodies
 * 
 * .then(res => ...) lets you inspect that response after the request
 * 
 */

// so know we want to test the token refresher

import request from 'supertest'
import express from 'express'
import cookieParser from 'cookie-parser'

// Import the controller
import { tokenRefresher } from 'controller/auth.controller'

jest.mock('../services/genToken', () => ({
    verifyRefreshToken: jest.fn(),
    genrateToken: jest.fn()
}))

import { verifyRefreshToken,generateToken } from 'services/genToken'

const app = express()
app.use(cookieParser())
app.get('/refresh', tokenRefresher)


describe('tokenRefresher controller', () => {
  it('should return new access token and ok: true for valid refresh token', async () => {
    (verifyRefreshToken as jest.Mock).mockReturnValue({ email: 'a@b.com', username: 'john' })
    (generateToken as jest.Mock).mockReturnValue('newAccessToken123')

    const res = await request(app)
      .get('/refresh')
      .set('Cookie', ['refreshToken=fake-valid-token'])

    expect(res.status).toBe(200)
    expect(res.body).toEqual({ ok: true })
    expect(res.headers['set-cookie'][0]).toMatch(/accessToken=newAccessToken123/)
  })

  it('should return 403 for invalid refresh token', async () => {
    (verifyRefreshToken as jest.Mock).mockImplementation(() => {
      throw new Error('Invalid token')
    })

    const res = await request(app)
      .get('/refresh')
      .set('Cookie', ['refreshToken=invalid-token'])

    expect(res.status).toBe(403)
  })
})