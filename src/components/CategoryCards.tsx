'use client'
import React, { useEffect, useState } from 'react'
import CategoriesSkeletonLoader from './CategoriesSkeletonLoader'
import Typography from './ui/typography'
import { getCategories } from '@/app/api/categories/categories'
import Link from 'next/link'

const CategoryCards = () => {
  const [categories, setCategories] = useState<any[]>([])
  const [loading, setLoading] = useState(true) // Set loading to true initially

  const fetchCategories = async () => {
    try {
      const result: any[] = await getCategories()
      setCategories(result)
    } catch (error) {
      console.error('Error fetching categories:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchCategories()
      } catch (error) {
        console.error('Error fetching categories:', error)
      }
    }
    void fetchData()
  }, [])

  return (
    <>
      {loading ? (
        <CategoriesSkeletonLoader />
      ) : // eslint-disable-next-line @typescript-eslint/prefer-optional-chain
      categories && categories?.length ? (
        <div
          className="grid w-full grid-cols-2 max-md:grid-cols-2 lg:grid-cols-4
            auto-rows-auto gap-4"
        >
          {categories.map((category) => {
            if (category) {
              return (
                <Link
                  key={category.id}
                  href={`/categories/${encodeURIComponent(category?.name as string).toLowerCase()}`}
                >
                  <div
                    key={category.id}
                    className="flex flex-col z-40 p-4 rounded-md bg-background border-[1px]
                      gap-6 w-[200px] h-[200px] items-center justify-center"
                  >
                    <Typography variant={'h5'}>
                      {category.name}
                    </Typography>
                  </div>
                </Link>
              )
            } else {
              return null
            }
          })}
        </div>
      ) : (
        <p>No categories found</p> // Render a message if categories is empty
      )}
    </>
  )
}

export default CategoryCards
