import request from '@/utils/http-request'
import axios from 'axios'

export const getCategories = async () => {
  const uri = '/categories'
  try {
    const result = await request.get(uri)
    console.log(result)
    return result.data.results
  } catch (error) {
    console.error('Error fetching categories:', error)
  }
}
export const getCategory = async (slug: string) => {
  const uri = '/categories'
  try {
    const { data } = await request.get(
      `${uri}?slug=${slug}`
    )
    const response = data.results[0].business
    console.log(response)
    const promises = response.map(
      async (url: string) => await axios.get(url)
    )
    const results = await Promise.all(promises)
    console.log(results)
    return results.map((result) => result.data)
  } catch (error) {
    console.error('Error fetching categories:', error)
  }
}

export const getBusinessInfo = async (slug: string) => {
  const uri = '/businesses'
  try {
    const { data } = await request.get(
      `${uri}?slug=${slug}`
    )
    console.log(data)
    return data.results[0]
  } catch (error) {
    console.error('Error fetching categories:', error)
  }
}
