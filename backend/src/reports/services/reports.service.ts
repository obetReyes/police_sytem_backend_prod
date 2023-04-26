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
  where?:Prisma.ReportWhereInput
    take:number
    skip:number
})  => {
    const {take,skip, where} = params;
    return prisma.report.findMany({
        take,
        where,
        skip,
        
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
