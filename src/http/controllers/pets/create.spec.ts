import { app } from '@/app'
import { createAndAuthenticateOrg } from '@/utils/test/create-and-authenticate-org'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Create Pet (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a new pet', async () => {
    const { token } = await createAndAuthenticateOrg(app)

    const response = await request(app.server)
      .post('/pets')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Pet name',
        description: 'test description',
        energy: 4,
        space: 'large',
        size: 1,
        requirements: JSON.stringify([
          'test requirements',
          'test requirements',
        ]),
        age: 'puppy',
        city: 'New York',
      })

    expect(response.statusCode).toBe(201)
  })
})
