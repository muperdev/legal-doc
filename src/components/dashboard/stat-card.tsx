import { StatCardProps } from '@/types/dashboard'

export function StatCard({ title, value, icon }: StatCardProps) {
  return (
    <div className="bg-black border border-neutral-800 overflow-hidden  hover:border-primary/50 transition-all duration-200">
      <div className="p-6">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <div className="flex h-12 w-12 items-center justify-center  bg-primary/10">{icon}</div>
          </div>
          <div className="ml-5 w-0 flex-1">
            <dl>
              <dt className="truncate text-sm font-medium text-gray-300">{title}</dt>
              <dd>
                <div className="text-2xl font-bold text-white">{value}</div>
              </dd>
            </dl>
          </div>
        </div>
      </div>
    </div>
  )
}
