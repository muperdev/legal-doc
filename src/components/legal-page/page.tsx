import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface LegalPageProps {
  title: string;
  children: React.ReactNode;
}

export function LegalPage({ title, children }: LegalPageProps) {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6 font-sans">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[calc(100vh-250px)]">
            <div className="space-y-4">
              {children}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  )
}

