import { cn } from '@/lib/utils'

interface StepProgressProps {
  step: number
  totalSteps: number
}

export function StepProgress({ step, totalSteps }: StepProgressProps) {
  const steps = Array.from({ length: 5 }, (_, i) => i + 1)

  return (
    <div className="w-full flex justify-center mb-8">
      <div className="w-[400px]">
        <div className="relative flex justify-between items-center gap-4">
          {steps.map((s) => (
            <div
              key={s}
              className={cn(
                'h-1.5 flex-1 rounded-full transition-colors duration-200',
                step >= s ? 'bg-black' : 'bg-black/20',
              )}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
