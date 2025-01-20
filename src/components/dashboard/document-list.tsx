'use client'

import * as React from 'react'
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { FileText, MoreHorizontal, ArrowUpDown } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Document } from '@/payload-types'
import { formatDate, formatFileType } from '@/lib/utils'
import { useRouter } from 'next/navigation'

interface DocumentListProps {
  documents: Document[]
}

export function DocumentList({ documents }: DocumentListProps) {
  const router = useRouter()
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})

  const columns: ColumnDef<Document>[] = [
    {
      accessorKey: 'filename',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="text-white hover:text-white/80 data-[state=selected]:bg-neutral-800 hover:bg-neutral-900"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Document Name
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <FileText className="h-4 w-4 text-neutral-400" />
          <span className="font-medium text-white">{row.getValue('filename')}</span>
        </div>
      ),
    },
    {
      accessorKey: 'mimeType',
      header: 'Type',
      cell: ({ row }) => {
        const mimeType = row.getValue('mimeType') as string
        return (
          <div className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-black/[0.06] text-white">
            {formatFileType(mimeType)}
          </div>
        )
      },
    },
    {
      accessorKey: 'updatedAt',
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            className="text-white hover:text-white/80 data-[state=selected]:bg-neutral-800 hover:bg-neutral-900"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            Last Modified
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
      cell: ({ row }) => {
        const date = row.getValue('updatedAt') as string
        return <div className="text-neutral-400">{formatDate(date)}</div>
      },
    },
    {
      id: 'actions',
      cell: ({ row }) => {
        const document = row.original

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-neutral-900 border-neutral-800">
              <DropdownMenuLabel className="text-neutral-400">Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => router.push(document?.url || '')}
                className="text-neutral-200 focus:text-neutral-200 focus:bg-neutral-800"
              >
                Download
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-neutral-800" />
              <DropdownMenuItem
                onClick={() =>
                  navigator.clipboard.writeText(
                    (process.env.NEXT_PUBLIC_SERVER_URL as string) + document?.url || '',
                  )
                }
                className="text-neutral-200 focus:text-neutral-200 focus:bg-neutral-800"
              >
                Copy Link
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]

  const table = useReactTable({
    data: documents,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
  })

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter documents..."
          value={(table.getColumn('filename')?.getFilterValue() as string) ?? ''}
          onChange={(event) => table.getColumn('filename')?.setFilterValue(event.target.value)}
          className="max-w-sm bg-neutral-900 border-neutral-800 text-white placeholder:text-neutral-400"
        />
      </div>
      <div className=" border border-neutral-800">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="border-neutral-800 hover:bg-neutral-900">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="text-neutral-400">
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} className="border-neutral-800 hover:bg-neutral-900">
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="bg-neutral-900 border-neutral-800 text-white hover:bg-neutral-800"
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="bg-neutral-900 border-neutral-800 text-white hover:bg-neutral-800"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
