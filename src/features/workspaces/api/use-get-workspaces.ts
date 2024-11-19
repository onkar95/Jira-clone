import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/rpc";

export const useGetWorkspaces = () => {
    const query = useQuery({
        queryKey: ['workspace'],
        queryFn: async () => {
            const response = await client.api.workspaces.$get();

            if (!response.ok) {
                throw new Error("failed to fetch workspaces");
            }

            const { data } = await response.json();

            return data;
        },
    });

   
    return query
}





// import { client } from "@/lib/rpc";
// import { useQuery } from "@tanstack/react-query";

// export const fetchWorkspaces = async () => {
//     const response = await client.api.workspaces.$get();
//     if (!response.ok) {
//         throw new Error("Failed to fetch workspaces");
//     }
//     const { data } = await response.json();
//     return data;
// };

//  const useCurrent = () => {
//     const query = useQuery({
//         queryKey: ["current"],
//         queryFn: fetchWorkspaces
//     })


//     return query
// }

// export default useCurrent