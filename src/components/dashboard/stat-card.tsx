import { StatCardProps } from '@/types/dashboard'

export function StatCard({ title, value, icon }: StatCardProps) {
  return (
    <div className="bg-black border border-neutral-800/50/[0.06] overflow-hidden rounded-lg">
      <div className="p-5">
        <div className="flex items-center">
          <div className="flex-shrink-0">{icon}</div>
          <div className="ml-5 w-0 flex-1">
            <dl>
              <dt className="text-sm font-medium text-neutral-400 truncate">{title}</dt>
              <dd>
                <div className="text-lg font-semibold text-white">{value}</div>
              </dd>
            </dl>
          </div>
        </div>
      </div>
    </div>
  )
}
