'use client'

import { useState } from 'react'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('account')

  return (
    <div className="flex-1 overflow-auto bg-black">
      <header className="bg-black shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-white">Settings</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="bg-black shadow-sm ">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="teams">Teams</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
            </TabsList>
            <TabsContent value="account">
              <AccountSettings />
            </TabsContent>
            <TabsContent value="teams">
              <TeamsSettings />
            </TabsContent>
            <TabsContent value="notifications">
              <NotificationSettings />
            </TabsContent>
            <TabsContent value="security">
              <SecuritySettings />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}

function AccountSettings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Account Settings</CardTitle>
        <CardDescription>Manage your account details and preferences.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" defaultValue="Tom Cook" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" defaultValue="tom@example.com" />
        </div>
      </CardContent>
      <CardFooter>
        <Button>Save Changes</Button>
      </CardFooter>
    </Card>
  )
}

function TeamsSettings() {
  const teams = [
    { id: 1, name: 'Design Team', members: 8 },
    { id: 2, name: 'Engineering Team', members: 12 },
    { id: 3, name: 'Marketing Team', members: 6 },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Teams</CardTitle>
        <CardDescription>Manage your teams and team members.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {teams.map((team) => (
            <div key={team.id} className="flex items-center justify-between p-4 border ">
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarFallback>
                    {team.name
                      .split(' ')
                      .map((n) => n[0])
                      .join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{team.name}</p>
                  <p className="text-sm text-gray-500">{team.members} members</p>
                </div>
              </div>
              <Button variant="outline">Manage</Button>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter>
        <Button>
          <Plus className="mr-2 h-4 w-4" /> Create New Team
        </Button>
      </CardFooter>
    </Card>
  )
}

function NotificationSettings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Notification Settings</CardTitle>
        <CardDescription>Manage your notification preferences.</CardDescription>
      </CardHeader>
      <CardContent>{/* Add notification settings here */}</CardContent>
    </Card>
  )
}

function SecuritySettings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Security Settings</CardTitle>
        <CardDescription>Manage your account security and privacy.</CardDescription>
      </CardHeader>
      <CardContent>{/* Add security settings here */}</CardContent>
    </Card>
  )
}
