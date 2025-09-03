import { createRootRoute, Outlet } from '@tanstack/react-router'
import { CompareProvider } from '@/contexts/CompareContext'
import CompareDrawer from '@/components/CompareDrawer'
import CompareFloatingButton from '@/components/CompareFloatingButton'

const RootLayout = () => (
    <CompareProvider>
        <Outlet />
        <CompareFloatingButton />
        <CompareDrawer />
    </CompareProvider>
)

export const Route = createRootRoute({ component: RootLayout })