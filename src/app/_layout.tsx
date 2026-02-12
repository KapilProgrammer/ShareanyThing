import { ClerkLoaded, ClerkProvider } from '@clerk/clerk-expo'
import { tokenCache } from '@clerk/clerk-expo/token-cache'
import { Slot, Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'



export default function RootLayout() {
    const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!
    
    if (!publishableKey) {
        throw new Error('Missing publishable key. Please add EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY to your environment variables.')
    }
    
    return (
        <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
            <ClerkLoaded>
                <Slot />
            </ClerkLoaded>
        </ClerkProvider>
    )
}