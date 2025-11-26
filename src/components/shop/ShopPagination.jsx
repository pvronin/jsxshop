// components/shop/ShopPagination.jsx
export default function ShopPagination({ currentPage, totalPages, onPageChange }) {
    if (totalPages <= 1) return null;

    const btnClass = "w-10 h-10 rounded-lg bg-white border border-gray-300 hover:bg-gray-100 transition duration-150 font-bold";
    const activeClass = "w-10 h-10 rounded-lg bg-blue-600 text-white shadow-lg font-bold transition duration-150";

    return (
        <div className="flex justify-center items-center gap-2 mt-12 mb-8">
            <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1} className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition duration-150">
                قبلی
            </button>

            {currentPage > 3 && (
                <>
                    <button onClick={() => onPageChange(1)} className={btnClass}>1</button>
                    {currentPage > 4 && <span className="px-2 text-gray-500">...</span>}
                </>
            )}

            {currentPage > 2 && <button onClick={() => onPageChange(currentPage - 2)} className={btnClass}>{currentPage - 2}</button>}
            {currentPage > 1 && <button onClick={() => onPageChange(currentPage - 1)} className={btnClass}>{currentPage - 1}</button>}

            <button className={activeClass}>{currentPage}</button>

            {currentPage < totalPages && <button onClick={() => onPageChange(currentPage + 1)} className={btnClass}>{currentPage + 1}</button>}
            {currentPage < totalPages - 1 && <button onClick={() => onPageChange(currentPage + 2)} className={btnClass}>{currentPage + 2}</button>}

            {currentPage < totalPages - 2 && (
                <>
                    {currentPage < totalPages - 3 && <span className="px-2 text-gray-500">...</span>}
                    <button onClick={() => onPageChange(totalPages)} className={btnClass}>{totalPages}</button>
                </>
            )}

            <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages} className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition duration-150">
                بعدی
            </button>
        </div>
    );
}
