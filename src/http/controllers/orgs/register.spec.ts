import { app } from '@/app'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Register (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to register an org', async () => {
    const response = await request(app.server).post('/register').send({
      name: 'Org Test',
      email: 'org@test.com',
      password: '123456',
      postalCode: '12345-678',
      address: 'street test, number 1',
      whatsApp: '00999990000',
      latitude: 28.2144755,
      longitude: -82.0035679,
    })

    expect(response.status).toEqual(201)
  })
})
