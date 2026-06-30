import {
  QueryClient,
} from '@tanstack/react-query'

const queryClient = new QueryClient({
 defaultOptions: {
   queries: {
    // Setting staleTime is the recommended way to avoid excessive refetches,
     staleTime: 5 * 60 * 1000, // 5 minutes
     refetchOnMount:true,
     refetchOnWindowFocus: false,
     refetchOnReconnect: true,
     retry: 2,
   }
 }
})

export default queryClient

