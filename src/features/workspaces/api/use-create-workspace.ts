import { client } from "@/lib/rpc";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<typeof client.api.workspaces["$post"]>
type RequestType = InferRequestType<typeof client.api.workspaces["$post"]>

export const useCreateWorkspace = () => {
    const QueryClient = useQueryClient()

    const mutation = useMutation<
        ResponseType,
        Error,
        RequestType
    >({
        mutationFn: async ({ form }) => {
            const response = await client.api.workspaces["$post"]({ form });

            
            if(!response.ok){
                throw new Error("failed to create work space") 
            }
            return await response.json();
        },
        onSuccess: () => {
            toast.success("Workspace created")
            QueryClient.invalidateQueries({ queryKey: ["workspaces"] });
        },
        onError:()=>{
            toast.error("Failed to create workspace")
        }
    })

    return mutation
}