import { type SchemaTypeDefinition } from 'sanity'
import { authorType } from './author'
import { specialistType } from './specialist'
import { aboutUsType } from './about-us'
import { awarenessType } from './awareness'
import { postType } from './post'
import { newsType } from './news'
import { servicesType } from './services'
import { galleryType } from './gallery'
import { galleryCategoryType } from './galleryCategory'
import { careerType } from './career'
import { reviewType } from './review'
import { promowebsiteType } from './promowebsite'
import { mindGymType } from './mindGym'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    authorType,
    specialistType,
    aboutUsType,
    awarenessType,
    postType,
    newsType,
    servicesType,
    galleryType,
    galleryCategoryType,
    careerType,
    reviewType,
    promowebsiteType,
    mindGymType,
  ],
}
