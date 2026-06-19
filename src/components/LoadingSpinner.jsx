// components/LoadingSpinner.js
export default function LoadingSpinner() {
    return (
        <div className="min-h-screen flex items-center justify-center">
                {/* اسپینر انیمیشن دار */}
                <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500 mb-4"></div>
        </div>
    );
}
