import { client } from "@/lib/rpc";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type ResponseType = InferResponseType<typeof client.api.auth.register["$post"]>
type RequestType = InferRequestType<typeof client.api.auth.register["$post"]>


export const useRegister = () => {
    const router=useRouter()
    const QueryClient = useQueryClient()
    const mutation = useMutation<
        ResponseType,
        Error,
        RequestType
    >({
        mutationFn: async ({ json }) => {
            const response = await client.api.auth.register["$post"]({ json });
            if(!response.ok){
                throw new Error("failed to Registere") 
            }
            return await response.json();
        },
         onSuccess: () => {
            toast.success("Registered succefully")
            router.refresh()
            // window.location.reload()
            QueryClient.invalidateQueries({ queryKey: ["current"] });
        },
        onError:()=>{
            toast.error("failed to Registere")
        }
    })

    return mutation
}