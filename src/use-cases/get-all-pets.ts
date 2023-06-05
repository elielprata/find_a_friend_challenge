import { PetsRepository } from '@/repositories/pets-repository'
import { ResourceNotFound } from './errors/resource-not-found'
import { CityNotInformed } from './errors/city-not-informed'

interface GetAllPetsUseCaseRequest {
  city: string
  age?: string
  energy?: number
  size?: number
}

export class GetAllPetsUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({ city, age, energy, size }: GetAllPetsUseCaseRequest) {
    if (city.trim().length === 0) {
      throw new CityNotInformed()
    }

    const allPets = await this.petsRepository.findManyByCity(city)

    if (!allPets) {
      throw new ResourceNotFound()
    }

    let pets

    pets = allPets

    if (age) {
      pets = allPets.filter((pet) => pet.age === age)
    }

    if (energy) {
      pets = allPets.filter((pet) => pet.energy >= energy)
    }

    if (size) {
      pets = allPets.filter((pet) => pet.size >= size)
    }

    return { pets }
  }
}
