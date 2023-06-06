import { Pet, Prisma } from '@prisma/client'
import { PetsRepository } from '../pets-repository'
import { prisma } from '@/lib/prisma'

export class PrismaPetsRepository implements PetsRepository {
  findById(id: string): Promise<Pet | null> {
    throw new Error('Method not implemented.')
  }

  findManyByCity(query: string): Promise<Pet[] | null> {
    throw new Error('Method not implemented.')
  }

  async create(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
    const pet = await prisma.pet.create({
      data,
    })

    return pet
  }
}
