import { client } from "@/lib/rpc";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { InferRequestType, InferResponseType } from "hono";
import { useRouter } from "next/navigation";

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

            return await response.json();
        },
        onSuccess: () => {
            router.refresh()
            // window.location.reload()
            QueryClient.invalidateQueries({ queryKey: ["current"] });
        }
    })

    return mutation
}