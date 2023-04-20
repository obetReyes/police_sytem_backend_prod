/*
import { useState, useMemo } from 'react';
import { useReactTable, getCoreRowModel, flexRender } from '@tanstack/react-table';
import { GroupsColumns } from './GroupsColumn';

export const GroupsTable = () => {
    const [data, setData] = useState([]);
    const columns = useMemo(() => GroupsColumns, []);
    const tableInstance = useReactTable({columns, data, getCoreRowModel: getCoreRowModel() });
  return (
    <div className='div className=" h-[48rem] w-full mx-auto rounded-lg shadow-xl"'>
       <div className="overflow-x-auto">
      <table className="table table-zebra w-full">
        <thead>
          {tableInstance.getHeaderGroups().map(headerGroup => (
            <tr key={headerGroup.id}>
{headerGroup.headers.map(header => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
          </thead>
      </table>
      </div>
    </div>
  )
}
*/