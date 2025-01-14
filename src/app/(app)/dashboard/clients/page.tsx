'use client'

import { useState } from 'react'
import { Plus, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'

type Client = {
  id: number
  companyName: string
  address: string
  phoneNumber: string
}

const initialClients: Client[] = [
  {
    id: 1,
    companyName: 'TechCorp Inc.',
    address: '123 Tech St, San Francisco, CA 94105',
    phoneNumber: '(415) 555-1234',
  },
  {
    id: 2,
    companyName: 'Global Innovations LLC',
    address: '456 Innovation Ave, New York, NY 10001',
    phoneNumber: '(212) 555-5678',
  },
  {
    id: 3,
    companyName: 'EcoSolutions Co.',
    address: '789 Green Rd, Portland, OR 97201',
    phoneNumber: '(503) 555-9012',
  },
]

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>(initialClients)
  const [searchTerm, setSearchTerm] = useState('')
  const [newClient, setNewClient] = useState<Omit<Client, 'id'>>({
    companyName: '',
    address: '',
    phoneNumber: '',
  })
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const filteredClients = clients.filter(
    (client) =>
      client.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.phoneNumber.includes(searchTerm),
  )

  const handleAddClient = () => {
    setClients([...clients, { ...newClient, id: clients.length + 1 }])
    setNewClient({ companyName: '', address: '', phoneNumber: '' })
    setIsDialogOpen(false)
  }

  return (
    <div className="flex-1 overflow-auto bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Clients</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-6">
          <div className="relative">
            <Input
              type="text"
              placeholder="Search clients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-64"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" /> Add Client
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Client</DialogTitle>
                <DialogDescription>Enter the details of the new client.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="companyName" className="text-right">
                    Company Name
                  </Label>
                  <Input
                    id="companyName"
                    value={newClient.companyName}
                    onChange={(e) => setNewClient({ ...newClient, companyName: e.target.value })}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="address" className="text-right">
                    Address
                  </Label>
                  <Input
                    id="address"
                    value={newClient.address}
                    onChange={(e) => setNewClient({ ...newClient, address: e.target.value })}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="phoneNumber" className="text-right">
                    Phone Number
                  </Label>
                  <Input
                    id="phoneNumber"
                    value={newClient.phoneNumber}
                    onChange={(e) => setNewClient({ ...newClient, phoneNumber: e.target.value })}
                    className="col-span-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button onClick={handleAddClient}>Add Client</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="bg-white shadow-sm rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Company Name</TableHead>
                <TableHead>Address</TableHead>
                <TableHead>Phone Number</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredClients.map((client) => (
                <TableRow key={client.id}>
                  <TableCell className="font-medium">{client.companyName}</TableCell>
                  <TableCell>{client.address}</TableCell>
                  <TableCell>{client.phoneNumber}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </main>
    </div>
  )
}
