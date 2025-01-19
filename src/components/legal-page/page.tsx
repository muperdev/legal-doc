import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface LegalPageProps {
  title: string
  children: React.ReactNode
}

export function LegalPage({ title, children }: LegalPageProps) {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6 blackHanSans bg-black min-h-screen">
      <Card className="bg-black border border-neutral-800">
        <CardHeader>
          <CardTitle className="text-white">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 text-gray-300">{children}</div>
        </CardContent>
      </Card>
    </div>
  )
}
