"use client"

import * as React from "react"
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

// const data = [
//   {
//     id: "m5gr84i9",
//     StdName: "Dheeraj Khatri",
//     cnic: "12405263201525",
//     Program: "Computer Science",
//     Score: 50,
//     MeritScore: 75.56,
//   },
//   {
//     id: "m5gr84i8",
//     StdName: "Natick Khatri",
//     cnic: "12405263211525",
//     Program: "Computer Science",
//     Score: 55,
//     MeritScore: 78.56,
//   },
//   {
//     id: "m4gr74i9",
//     StdName: "Danesh Khatri",
//     cnic: "12405263221525",
//     Program: "Mathematics",
//     Score: 45,
//     MeritScore: 71.56,
//   },
// ]

const columns = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "StdName",
    header: "Student Name",
    cell: ({ row }) => <div>{row.getValue("StdName")}</div>,
  },
  {
    accessorKey: "cnic",
    header: "CNIC",
    cell: ({ row }) => <div>{row.getValue("cnic")}</div>,
  },
  {
    accessorKey: "Program",
    header: "Program",
    cell: ({ row }) => <div>{row.getValue("Program")}</div>,
  },
  {
    accessorKey: "Score",
    header: "Score",
    cell: ({ row }) => <div>{row.getValue("Score")}</div>,
  },
  {
    accessorKey: "MeritScore",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Merit Score
        <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => <div>{row.getValue("MeritScore")}</div>,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const student = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(student.id)}
            >
              Copy Student ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View Student</DropdownMenuItem>
            <DropdownMenuItem>View Details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

export default function DataTableDemo() {
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    fetchAndProcessData();
  }, []);


  const fetchAndProcessData = async () => {
    try {
      // Fetch all data in parallel
      const [testResultRes, personalDataRes, programDataRes, academicDataRes,programRes] = await Promise.all([
        fetch("/api/admission/entryTestQ/testScore"),
        fetch("/api/admission/personaldata"),
        fetch("/api/admission/degreeProgramInformation"),
        fetch("/api/admission/academicData"),
        fetch("/api/program"),
      ]);

      if (!testResultRes.ok || !personalDataRes.ok || !programDataRes.ok || !academicDataRes.ok || !programRes.ok) {
        throw new Error("Failed to fetch one or more APIs");
      }

      // Parse JSON responses
      const testResultData = await testResultRes.json();
      const personalData = await personalDataRes.json();
      const programData = await programDataRes.json();
      const academicData = await academicDataRes.json();


      const programResData = await programRes.json(); // use a new variable to store the parsed data
      // console.log("Program: ", programResData.result);
      // Process data
      const updatedData = testResultData.result.map((entry) => {
        const testResult = testResultData.result.find((item) => item.cnic === entry.cnic);
        if (!testResult) return entry;

        const { score } = testResult;
        
        const personal = personalData.result.find((item) => item.cnic === entry.cnic);
        const StdName = personal
          ? `${personal.fname || ""} ${personal.mname || ""} ${personal.lname || ""}`.trim()
          : entry.StdName;

        const program = programData.result.find((item) => item.cnic === entry.cnic);
        const Program = program?.choice01 || entry.Program;

        const programReo = programResData.result.find((item)=> item.program === program.choice01);
        console.log("new: ",programReo.sort)

        const academic = academicData.result.find((item) => item.cnic === entry.cnic);
        const hscPercentage = academic?.hsc_alevel_percentage || 0;
        const sscPercentage = academic?.ssc_olevel_percentage || 0;
        const normalizedScore = Math.min(score * (100 / 60), 100); // Ensure it doesn't exceed 100
        const MeritScore = (normalizedScore * 0.5) + (hscPercentage * 0.3) + (sscPercentage * 0.1);

        return {
          ...entry,
          StdName,
          Score: score,
          Program,
          MeritScore: MeritScore.toFixed(2),
        };
      });

      // Update state
      setData(updatedData);
    } catch (error) {
      console.error("Error:", error.message);
      alert(error.message);
    }
  };

  const [sorting, setSorting] = React.useState([
    { id: "MeritScore", desc: true }, // Default sorting by MeritScore (descending)
  ])
  const [columnFilters, setColumnFilters] = React.useState([])
  const [columnVisibility, setColumnVisibility] = React.useState({})
  const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  return (
    <div className="mx-2">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter CNICs..."
          value={(table.getColumn("cnic")?.getFilterValue() ?? "")}
          onChange={(event) =>
            table.getColumn("cnic")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) =>
                    column.toggleVisibility(!!value)
                  }
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border bg-background/50">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
