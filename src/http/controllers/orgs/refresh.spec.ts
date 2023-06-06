import { app } from '@/app'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Refresh Token (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to refresh token an org', async () => {
    await request(app.server).post('/register').send({
      name: 'Org Test',
      email: 'org1@test.com',
      password: '123456',
      postalCode: '12345-678',
      address: 'street test, number 1',
      whatsApp: '00999990000',
      latitude: 28.2144755,
      longitude: -82.0035679,
    })

    const authResponse = await request(app.server)
      .post('/sessions')
      .send({ email: 'org1@test.com', password: '123456' })

    const cookies = authResponse.get('Set-Cookie')

    const response = await request(app.server)
      .patch('/token/refresh')
      .set('Cookie', cookies)
      .send()

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({ token: expect.any(String) })
    // expect(response.get('Set-Cookie')).toEqual([
    //   expect.stringContaining('refreshToken='),
    // ])
  })
})
