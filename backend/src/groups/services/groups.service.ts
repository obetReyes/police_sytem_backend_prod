import { prisma } from "../../utils";
import {Prisma} from "@prisma/client";


export const createGroupService = async(data:Prisma.GroupCreateInput) => {
    return prisma.group.create({
        data
    });
};

export const updateGroupService = async(params:{
    where:Prisma.GroupWhereUniqueInput,
    data:Prisma.GroupUpdateInput
}) => {

    const {where,data} = params;
    return prisma.group.update({
        data,
        where
    });
};

export const getGroupService = async(GroupWhereInput:Prisma.GroupWhereUniqueInput) => {
    return prisma.group.findUnique({
        where:GroupWhereInput,
        
    });
};


export const getGroupsService = async() => {
    return prisma.group.findMany();
};

export const deleteGroupService = async(GroupWhereUniqueInput:Prisma.GroupWhereUniqueInput) => {
    return prisma.group.delete({
        where:GroupWhereUniqueInput
    });
};