import { ClerkLoaded, ClerkProvider } from '@clerk/clerk-expo'
import { tokenCache } from '@clerk/clerk-expo/token-cache'
import { Slot } from 'expo-router'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { useReactQueryDevTools } from "@dev-plugins/react-query"

const queryClient = new QueryClient()

export default function RootLayout() {
    const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!

    useReactQueryDevTools(queryClient);

    if (!publishableKey) {
        throw new Error('Missing publishable key. Please add EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY to your environment variables.')
    }

    return (
        <QueryClientProvider client={queryClient}>
            <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
                <ClerkLoaded>
                    <Slot />
                </ClerkLoaded>
            </ClerkProvider>
        </QueryClientProvider>
    )
}