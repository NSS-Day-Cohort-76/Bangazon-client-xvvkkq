import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import '../global.css'

export default function Bangazon({ Component, pageProps }) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => page)
  const queryClient = new QueryClient()


  return getLayout(
    <QueryClientProvider client={queryClient}>    
      <Component {...pageProps} />
    </QueryClientProvider>
  )
}
