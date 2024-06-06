import { Star, StarHalf } from 'lucide-react'

interface Props {
    value:number
}

const AverageReview = ({value}: Props) => {
  return (
    <div className='flex flex-row gap-2 items-center'> 
        {value>=1?<Star/>:value>=0.5?<StarHalf/>:"" }
        {value>=2?<Star/>:value>=1.5?<StarHalf/>:"" }
        {value>=3?<Star/>:value>=2.5?<StarHalf/>:"" }
        {value>=4?<Star/>:value>=3.5?<StarHalf/>:""}
        {value>=5?<Star/>:value>=4.5?<StarHalf/>:
        ""}

    </div>
  )
}

export default AverageReview