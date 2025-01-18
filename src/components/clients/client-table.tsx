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
import { Client } from '@/payload-types'
import { useRouter } from 'next/navigation'

interface ClientTableProps {
  initialClients: Client[]
}

export function ClientTable({ initialClients }: ClientTableProps) {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')
  const [newClient, setNewClient] = useState({
    companyName: '',
    email: '',
    companyAddress: '',
    address: '',
    phoneNumber: '',
  })
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleAddClient = async () => {
    try {
      const response = await fetch('/api/clients', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newClient),
      })

      if (!response.ok) throw new Error('Failed to create client')

      setNewClient({
        companyName: '',
        email: '',
        companyAddress: '',
        address: '',
        phoneNumber: '',
      })
      setIsDialogOpen(false)
      router.refresh()
    } catch (error) {
      console.error('Error creating client:', error)
    }
  }

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <div className="relative">
          <Input
            type="text"
            placeholder="Search clients..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-64 bg-black/40 border-neutral-800 text-neutral-100 placeholder:text-neutral-400"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-neutral-400" />
        </div>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="bg-neutral-800 border-neutral-700 text-white hover:bg-neutral-700 hover:text-white"
            >
              <Plus className="mr-2 h-4 w-4" /> Add Client
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-neutral-900 border border-neutral-800 text-white">
            <DialogHeader>
              <DialogTitle className="text-lg font-semibold">Add New Client</DialogTitle>
              <DialogDescription className="text-neutral-400">
                Enter the details of the new client.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="companyName" className="text-right text-neutral-200">
                  Company Name
                </Label>
                <Input
                  id="companyName"
                  value={newClient.companyName}
                  onChange={(e) => setNewClient({ ...newClient, companyName: e.target.value })}
                  className="col-span-3 bg-neutral-800 border-neutral-700 text-white"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right text-neutral-200">
                  Email
                </Label>
                <Input
                  id="email"
                  value={newClient.email}
                  onChange={(e) => setNewClient({ ...newClient, email: e.target.value })}
                  className="col-span-3 bg-neutral-800 border-neutral-700 text-white"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="phoneNumber" className="text-right text-neutral-200">
                  Phone Number
                </Label>
                <Input
                  id="phoneNumber"
                  value={newClient.phoneNumber}
                  onChange={(e) => setNewClient({ ...newClient, phoneNumber: e.target.value })}
                  className="col-span-3 bg-neutral-800 border-neutral-700 text-white"
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                onClick={handleAddClient}
                className="bg-black text-black hover:bg-neutral-200"
              >
                Add Client
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="bg-black/40 rounded-lg border border-neutral-800 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="border-neutral-800 hover:bg-neutral-800/50">
              <TableHead className="text-neutral-200">Company Name</TableHead>
              <TableHead className="text-neutral-200">Email</TableHead>
              <TableHead className="text-neutral-200">Phone Number</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {initialClients.map((client) => (
              <TableRow key={client?.id} className="border-neutral-800 hover:bg-neutral-800/50">
                <TableCell className="font-medium text-white">
                  {client?.companyName || client?.name}
                </TableCell>
                <TableCell className="text-neutral-200">{client?.email}</TableCell>
                <TableCell className="text-neutral-200">{client?.phoneNumber}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  )
}
