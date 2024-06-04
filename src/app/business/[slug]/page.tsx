'use client'
import { getBusinessInfo } from '@/app/api/categories/categories'
import HeaderContainer from '@/components/HeaderContainer'
import React, { useEffect, useState } from 'react'

interface Props {
  params: { slug: string }
}
const Business = ({ params }: Props) => {
  const [businessInfo, setBusinessInfo] = useState<any>({})

  const fetchBusinessProfile = async (slug: string) => {
    const business = await getBusinessInfo(slug)
    setBusinessInfo(business)
    console.log(businessInfo)
  }
  useEffect(() => {
    const slug = params.slug
    const fetchData = async () => {
      try {
        await fetchBusinessProfile(slug)
      } catch (error) {
        console.error('Error fetching categories:', error)
      }
    }
    void fetchData()
  }, [])

  return (
    <HeaderContainer>
      <div className="flex flex-row gap-4 items-center mt-12">
        {businessInfo?.city}
      </div>
    </HeaderContainer>
  )
}

export default Business
