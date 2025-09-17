import {z} from "zod"

export const messageSchema = z.object({
    content : z
    .string()
    .min(10,{message:'Context must be of atleast 10 characters'})
    .min(300,{message:'Context must not be more then 300 characters'})
})