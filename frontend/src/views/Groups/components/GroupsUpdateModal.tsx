import { useRecordMutation } from "../../../hooks";
import { UpdateGroupI, GroupResI, updateGroupSchema, ErrorsI } from "../../../helpers";
import {useForm} from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from "react";


interface Props{
    groupId:number
}
export const GroupsUpdateModal = ({groupId}:Props) => {
    const {mutate, error, isError, isLoading} = useRecordMutation<GroupResI, UpdateGroupI>("groups", "group", groupId);
  return (
    <div>GroupsUpdateModal</div>
  )
}
