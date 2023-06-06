import { app } from '@/app'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Authenticate (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to authenticate an org', async () => {
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

    const response = await request(app.server)
      .post('/sessions')
      .send({ email: 'org1@test.com', password: '123456' })
      .expect(200)

    expect(response).toEqual({ token: expect.any(String) })
  })
})
