import AverageReview from './AverageReview'
import { Card } from './ui/cards'

interface Props {
  review: any
}

const ReviewsCard = ({ review }: Props) => {
  return (
    <Card className="w-full p-2 mb-4 gap-6 flex flex-col">
      <div className="flex flex-row gap-2 items-start justify-between">
        <div className="flex flex-col gap-1 items-start">
          <p className="text-sm font-bold">
            {review.user_first_name} {review.user_last_name}
          </p>
          <p className="text-xs text-secondary font-bold">
            {review.user_name}
          </p>
        </div>
        <AverageReview size={12} value={review.stars} />
      </div>
      <div>
        <p className="text-xs">{review.content}</p>
      </div>
    </Card>
  )
}

export default ReviewsCard
