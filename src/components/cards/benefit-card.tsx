interface BenefitCardProps {
  icon: React.ReactNode
  title: string
  description: string
}

export function BenefitCard({ icon, title, description }: BenefitCardProps) {
  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 text-blue-600">
        {icon}
      </div>
      <h3 className="mt-4 text-lg font-medium text-white">{title}</h3>
      <p className="mt-2 text-sm text-gray-500 text-center">{description}</p>
    </div>
  )
}
