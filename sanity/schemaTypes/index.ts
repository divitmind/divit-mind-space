import { type SchemaTypeDefinition } from 'sanity'
import { authorType } from './author'
import { specialistType } from './specialist'
import { aboutUsType } from './about-us'
import { postType } from './post'
import { servicesType } from './services'
import { galleryType } from './gallery'
import { careerType } from './career'
import { reviewType } from './review'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    authorType,
    specialistType,
    aboutUsType,
    postType,
    servicesType,
    galleryType,
    careerType,
    reviewType,
  ],
}
