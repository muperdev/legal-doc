import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

interface ClientSelectProps {
  clients: Array<{
    id: string
    name: string
    email: string
    companyName?: string
  }>
  selectedClient: string
  setSelectedClient: (id: string) => void
  error?: string | null
  onNext: () => void
  onBack: () => void
  roleContext: string
}

export function ClientSelect({
  clients,
  selectedClient,
  setSelectedClient,
  error,
  onNext,
  onBack,
  roleContext,
}: ClientSelectProps) {
  return (
    <Card className="text-white bg-black border-neutral-800/50">
      <CardHeader>
        <CardTitle>{roleContext}</CardTitle>
        <CardDescription>Select who you will be working with on this agreement.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {clients.map((client) => (
            <div
              key={client.id}
              className={`p-4 border  cursor-pointer transition-colors ${
                selectedClient === client.id
                  ? 'border-white bg-white/5'
                  : 'border-neutral-800/50 hover:border-white'
              }`}
              onClick={() => {
                setSelectedClient(client.id)}}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-white">{client.name}</h3>
                  {client.companyName && (
                    <p className="text-sm text-gray-500">{client.companyName}</p>
                  )}
                  <p className="text-sm text-gray-500">{client.email}</p>
                </div>
                <RadioGroup value={selectedClient}>
                  <RadioGroupItem className="text-white border-white" value={client.id} />
                </RadioGroup>
              </div>
            </div>
          ))}
        </div>

        {error && <p className="text-sm text-red-500 mt-4">{error}</p>}

        <div className="flex justify-between mt-6">
          <Button className="bg-black border-neutral-800/50" variant="outline" onClick={onBack}>
            Back
          </Button>
          <Button className="bg-white text-black" onClick={onNext} disabled={!selectedClient}>
            Continue
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
