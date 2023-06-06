import { app } from '@/app'
import { createAndAuthenticateOrg } from '@/utils/test/create-and-authenticate-org'
import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Get Pet Info (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to all pet info', async () => {
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

    const petsResponse = await request(app.server)
      .get('/pets')
      .query({ city: 'New York' })
      .send()

    const response = await request(app.server)
      .get(`/pets/${petsResponse.body.pets[0].id}`)
      .query({ city: 'New York' })
      .send()

    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({
      pet: expect.objectContaining({ id: petsResponse.body.pets[0].id }),
    })
  })
})
