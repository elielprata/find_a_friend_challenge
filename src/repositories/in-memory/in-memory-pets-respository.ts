import { Prisma, Pet } from '@prisma/client'
import { PetsRepository } from '../pets-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryPetsRepository implements PetsRepository {
  public pets: Pet[] = []

  async findById(id: string): Promise<Pet | null> {
    const pet = this.pets.find((pet) => pet.id === id)

    if (!pet) {
      return null
    }

    return pet
  }

  async findManyByCity(city: string): Promise<Pet[] | null> {
    const pets = this.pets.filter(
      (pet) => pet.city === city && pet.is_adopted === false,
    )

    if (!pets) {
      return null
    }

    return pets
  }

  async create(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
    const pet = {
      id: data.id ?? randomUUID(),
      name: data.name,
      description: data.description,
      org_id: data.org_id,
      energy: data.energy,
      space: data.space,
      size: data.size,
      requirements: data.requirements,
      age: data.age,
      city: data.city,
      is_adopted: data.is_adopted,
    }

    this.pets.push(pet)

    return pet
  }
}
