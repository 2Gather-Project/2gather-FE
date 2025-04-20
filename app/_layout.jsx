import { Stack } from 'expo-router';
import { UserProvider } from './contexts/UserContext';

export default function RootLayout() {
    return (
        <UserProvider>
            <Stack>
                <Stack.Screen name='index' options={{ headerShown: false }} />
                <Stack.Screen name='login' options={{ headerShown: false }} />
                <Stack.Screen name='register' options={{ headerShown: false }} />
                <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
                <Stack.Screen name='create-profile' options={{ title: 'Create Profile' }} />
                <Stack.Screen name='HostedEvents' options={{ title: 'Your Events' }} />
                <Stack.Screen name='profile' options={{ title: 'Profile' }} />
                <Stack.Screen name='events/[id]' options={{ title: 'Event Details' }} />
                <Stack.Screen name="message/[id]" options={{ title: 'Messages' }} />
            </Stack>
        </UserProvider>
    );
}