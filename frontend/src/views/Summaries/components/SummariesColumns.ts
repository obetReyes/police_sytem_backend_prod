import { Column, createColumnHelper } from "@tanstack/table-core";

interface SummariesColumnI{
    Date:string
    Hour: string;
    CallTime: string
    Incident:string
    Location:string
    id:number
}

const columnHelper = createColumnHelper<SummariesColumnI>()

export const SummariesColumns = [
    columnHelper.accessor('Date',{
      header: () => 'Fecha',
    }),
    columnHelper.accessor('Hour',{
      header: () => 'Hora',
    }),
    columnHelper.accessor('CallTime',{
      header: () => 'duracion',
    }),
    columnHelper.accessor('Incident',{
      header: () => 'Incidente',
    }),
    columnHelper.accessor('id',{
      header: () => '',
    }),

  ];