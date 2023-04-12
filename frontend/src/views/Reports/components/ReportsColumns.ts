import {Column, createColumnHelper} from "@tanstack/react-table"

interface ReportsColumnI {
    Date: string;
    Hour: string;
    Event: string;
    Author: string;
    id: number;
}

const columnHelper = createColumnHelper<ReportsColumnI>()
export const ReportColumns = [
    columnHelper.accessor('Date',{
      header: () => 'Fecha',
    }),
    columnHelper.accessor('Hour',{
      header: () => 'Hora',
    }),
    columnHelper.accessor('Event',{
      header: () => 'Suceso',
    }),
    columnHelper.accessor('Author',{
      header: () => 'agente',
    }),
    columnHelper.accessor('id',{
      header: () => '',
    }),

  ];