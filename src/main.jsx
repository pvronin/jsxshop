// main.jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store/store.js'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import "leaflet/dist/leaflet.css";
import { Toaster } from 'sonner'

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            staleTime: 1000 * 60 * 5,
            retry: 1,
        },
    },
})

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Provider store={store}>
            <QueryClientProvider client={queryClient}>
                <BrowserRouter>
                    <App />
                    <Toaster
                        position="top-center"
                        richColors
                        theme='dark'
                        toastOptions={{

                            style: {
                                fontFamily: 'Vazir, sans-serif',
                                direction: 'rtl',
                            },
                        }}
                    />
                </BrowserRouter>
            </QueryClientProvider>
        </Provider>
    </StrictMode>,
)
