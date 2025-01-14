import { Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { SubscriptionPlan } from '@/types/dashboard'

export function SubscriptionCard({
  title,
  price,
  description,
  features,
  highlighted = false,
}: SubscriptionPlan) {
  return (
    <Card className={highlighted ? 'border-blue-500 border-2' : ''}>
      <CardHeader>
        <CardTitle className="text-2xl">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-4xl font-bold">{price}</p>
        {price !== 'Custom' && <p className="text-gray-500">/month</p>}
        <ul className="mt-4 space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center">
              <Check className="h-5 w-5 text-green-500 mr-2" />
              {feature}
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button className={`w-full ${highlighted ? 'bg-blue-500 hover:bg-blue-600' : ''}`}>
          {price === 'Custom' ? 'Contact Sales' : 'Subscribe'}
        </Button>
      </CardFooter>
    </Card>
  )
}
