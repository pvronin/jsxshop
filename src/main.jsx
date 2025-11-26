import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store/store.js'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import "leaflet/dist/leaflet.css";
import { Toaster } from 'react-hot-toast'


const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false, // جلوگیری از فچ تکراری هنگام کلیک روی تب مرورگر
            staleTime: 1000 * 60 * 5, // داده‌ها تا 5 دقیقه تازه می‌مانند و دوباره درخواست نمی‌شوند
            retry: 1, // اگر ارور داد فقط 1 بار تلاش مجدد کن (پیش‌فرض 3 بار است)
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
                        containerStyle={{
                            top: '10vh',
                            zIndex: 9999
                        }}
                        toastOptions={{
                            duration: 4000,
                            style: {
                                borderRadius: '16px', // گوشه‌های گردتر برای افکت شیشه‌ای بهتر
                                background: 'rgba(255, 255, 255, 0.4)', // ⭐ پس‌زمینه سفید با شفافیت 20% ⭐
                                color: 'white', // متن سفید برای کنتراست با پس‌زمینه شفاف
                                padding: '16px 24px',
                                // ⭐ افزودن افکت تاری (Blur) ⭐
                                backdropFilter: 'blur(9px)', // تاری 10 پیکسلی
                                WebkitBackdropFilter: 'blur(10px)', // پشتیبانی از مرورگرهای Webkit (Safari)
                                border: '1px solid rgba(255, 255, 255, 0.3)', // ⭐ حاشیه شفاف ⭐
                                boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)', // Shadow قوی‌تر برای عمق
                                fontWeight: 'bold',
                                fontSize: '16px'
                            },
                            // برای Toast‌های موفقیت/خطا می‌توانید استایل‌های مخصوص به خود را داشته باشید
                            success: {
                                style: {
                                    background: 'rgba(50, 200, 100, 0.4)', // رنگ سبز شفاف برای موفقیت
                                    color: 'white',
                                },
                            },
                            error: {
                                style: {
                                    background: 'rgba(255, 50, 50, 0.4)', // رنگ قرمز شفاف برای خطا
                                    color: 'white',
                                },
                            },
                        }}
                    />
                </BrowserRouter>

            </QueryClientProvider>

        </Provider>
    </StrictMode>,
)
