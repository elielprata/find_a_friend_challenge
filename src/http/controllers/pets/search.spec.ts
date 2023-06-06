import { app } from '@/app'
import { createAndAuthenticateOrg } from '@/utils/test/create-and-authenticate-org'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Search Pets (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to return all pets by city', async () => {
    const { token } = await createAndAuthenticateOrg(app)

    await request(app.server)
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

    await request(app.server)
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
        city: 'Old York',
      })

    const response = await request(app.server)
      .get('/pets')
      .query({ city: 'New York' })
      .send()

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({
      pets: [expect.objectContaining({ city: 'New York' })],
    })
  })
})
