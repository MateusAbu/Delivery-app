import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: '1tmf56hl',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2023-05-03',
})

const builder = imageUrlBuilder(client)

export const urlFor = (source) => builder.image(source)

export const getFeaturedCategories = () => {
  return client.fetch(`*[_type == "featured"] {
        ...,
      restaurants[]->{
        ...,
        dishes[]->
      }
    }
  `)
}

export const getRestaurants = id => {
  return client.fetch(`*[_type == "featured" && _id == $id] {
        ...,
      restaurants[]->{
        ...,
        dishes[]->,
        type-> {
          name
        }
      },
    }[0]
  `, { id })
}

export const getCategories = () => {
  return client.fetch(`*[_type == "category"]`)
}
