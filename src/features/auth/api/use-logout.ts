import { client } from "@/lib/rpc";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { InferRequestType, InferResponseType } from "hono";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type ResponseType = InferResponseType<typeof client.api.auth.login["$post"]>
type RequestType = InferRequestType<typeof client.api.auth.login["$post"]>

export const useLogout = () => {
    const router=useRouter()
    const QueryClient = useQueryClient()
    const mutation = useMutation<
        ResponseType,
        Error
    >({
        mutationFn: async () => {
            const response = await client.api.auth.logout ["$post"]();

            if(!response.ok){
                throw new Error("failed to logout") 
            }
            return await response.json();
        },
        onSuccess: () => {
            toast.success("Logged out succefully")
            router.refresh()
            // window.location.reload()
            QueryClient.invalidateQueries({ queryKey: ["current"] });
        },
        onError:()=>{
            toast.error("failed to logout")
        }
    })

    return mutation
}