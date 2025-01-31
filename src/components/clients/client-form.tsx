'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Client, User } from '@/payload-types'

const clientSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phoneNumber: z.string().min(1, 'Phone number is required'),
  address: z.string().min(1, 'Address is required'),
  companyName: z.string().min(1, 'Company name is required'),
  companyAddress: z.string().min(1, 'Company address is required'),
})

type ClientFormValues = z.infer<typeof clientSchema>

interface ClientFormProps {
  user: User
  handleCreateClient: (client: Client) => void
}

export function ClientForm({ user }: ClientFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<ClientFormValues>({
    resolver: zodResolver(clientSchema),
    defaultValues: {
      name: '',
      email: '',
      phoneNumber: '',
      address: '',
      companyName: '',
      companyAddress: '',
    },
    mode: 'onChange',
  })

  const { isValid } = form.formState

  async function onSubmit(data: ClientFormValues) {
    setIsLoading(true)

    try {
      const response = await fetch('/api/clients', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          user: user,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to create client')
      }

      toast.success('Client has been created successfully.')
      router.push('/dashboard/clients')
      router.refresh()
    } catch (error) {
      toast.error('Something went wrong. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex-1 overflow-auto bg-black">
      <header className="bg-zinc-900 border-b border-zinc-800">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center">
            <Link href="/dashboard/clients" className="mr-4">
              <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-zinc-100">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <h1 className="text-3xl font-bold text-zinc-100">Add New Client</h1>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto py-6 sm:px-6 lg:px-8">
        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader>
            <CardTitle className="text-zinc-100">Client Details</CardTitle>
            <CardDescription className="text-zinc-400">
              Enter the client&apos;s information to add them to your client list.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-zinc-100">Full Name</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              className="bg-zinc-800 border-zinc-700 text-zinc-100"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-zinc-100">Email</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type="email"
                              className="bg-zinc-800 border-zinc-700 text-zinc-100"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="phoneNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-zinc-100">Phone Number</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              className="bg-zinc-800 border-zinc-700 text-zinc-100"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-zinc-100">Address</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              className="bg-zinc-800 border-zinc-700 text-zinc-100"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="companyName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-zinc-100">Company Name</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              className="bg-zinc-800 border-zinc-700 text-zinc-100"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="companyAddress"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-zinc-100">Company Address</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              className="bg-zinc-800 border-zinc-700 text-zinc-100"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-yellow-500 hover:bg-yellow-600 text-black disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={isLoading || !isValid}
                >
                  {isLoading ? 'Creating...' : 'Create Client'}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
