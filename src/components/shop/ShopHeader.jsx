// components/shop/ShopHeader.jsx
import { RxHamburgerMenu } from "react-icons/rx";
import { IoClose } from "react-icons/io5";

export default function ShopHeader({
    totalProducts,
    shownCount,
    sortBy,
    updateSort,
    onMenuClick, // ← تغییر نام برای وضوح
    showSidebarMobile
}) {
    return (
        <div className="relative mb-8 overflow-hidden">
            {/* پس‌زمینه شیشه‌ای */}
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/10 via-blue-400/5 to-purple-400/10 backdrop-blur-xl rounded-2xl"></div>

            {/* محتوا */}
            <div className="relative bg-white/60 backdrop-blur-md border border-white/30 shadow-xl rounded-2xl p-5">
                <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">

                    {/* بخش چپ: آمار */}
                    <div className="flex items-center gap-4">
                        <div className="bg-gradient-to-br from-emerald-400 to-emerald-600 p-3 rounded-2xl shadow-lg shadow-emerald-200/50">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                            </svg>
                        </div>
                        <div>
                            <span className="text-sm text-gray-500">تعداد محصولات</span>
                            <div className="flex items-baseline gap-2">
                                <span className="text-2xl font-bold text-gray-800">{shownCount}</span>
                                <span className="text-gray-400">از</span>
                                <span className="text-xl font-bold text-emerald-600">{totalProducts}</span>
                            </div>
                        </div>
                    </div>

                    {/* بخش راست: مرتب‌سازی و فیلتر */}
                    <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
                        {/* برچسب مرتب‌سازی */}
                        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-white/50 rounded-full border border-gray-200/50">
                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
                            </svg>
                            <span className="text-xs text-gray-500">مرتب‌سازی:</span>
                        </div>

                        {/* سلکت باکس */}
                        <div className="relative flex-1 lg:flex-none min-w-[150px]">
                            <select
                                value={sortBy}
                                onChange={(e) => updateSort(e.target.value)}
                                className="w-full px-4 py-2.5 bg-white/70 backdrop-blur-sm border border-gray-200/70 rounded-xl text-sm font-medium text-gray-700 appearance-none cursor-pointer hover:bg-white/90 focus:bg-white focus:border-emerald-400 focus:ring-2 focus:ring-emerald-200 transition-all"
                            >
                                <option value="">پیش‌فرض</option>
                                <option value="price-asc">💰 ارزان‌ترین</option>
                                <option value="price-desc">💎 گران‌ترین</option>
                                <option value="rating-desc">⭐ محبوب‌ترین</option>
                                <option value="discount-desc">🔥 پرتخفیف‌ترین</option>
                            </select>
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>

                        {/* دکمه همبرگر (آیکون تغییر میکنه) */}
                        <button
                            onClick={onMenuClick}
                            className="lg:hidden p-2.5 bg-white/70 backdrop-blur-sm rounded-xl border border-gray-200/70 hover:bg-white transition-all"
                        >
                            {showSidebarMobile ? (
                                <IoClose size={22} className="text-gray-600" />
                            ) : (
                                <RxHamburgerMenu size={22} className="text-gray-600" />
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
