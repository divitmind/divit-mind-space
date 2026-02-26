import { type SchemaTypeDefinition } from 'sanity'
import { authorType } from './author'
import { postType } from './post'
import { servicesType } from './services'
import { galleryType } from './gallery'
import { careerType } from './career'
import { reviewType } from './review'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [authorType, postType, servicesType, galleryType, careerType, reviewType],
}
