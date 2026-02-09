import { type SchemaTypeDefinition } from 'sanity'
import { servicesType } from './services'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [servicesType],
}
