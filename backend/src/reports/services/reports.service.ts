import {prisma} from "../../utils";
import { Prisma, Report } from "@prisma/client";

export const createReportService = async(data:Prisma.ReportCreateInput) => {
    return prisma.report.create({
        data
    });
};

export const getReportService = async(reportWhereUniqueInput:Prisma.ReportWhereUniqueInput): Promise<Report | null> => {
    return  prisma.report.findUnique({
        where:reportWhereUniqueInput
    });
};

export const getReportsService = async(params:{
  where:Prisma.ReportWhereInput
    take:number
})  => {
    const {take, where} = params;
    return prisma.report.findMany({
        take,
        where,
        
    });
};


export const getManyReportsService = async(
    params:{
        skip:number,
        take:number,
        where:Prisma.ReportWhereInput
    }
) => {
    const {skip, take, where} = params;
    return prisma.report.findMany({
        skip,
        take,
        where,
       
    });
};
