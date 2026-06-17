// components/shop/MobileSidebarWrapper.jsx
import { motion, AnimatePresence } from "framer-motion";

export default function MobileSidebarWrapper({
    isOpen,
    onClose,
    children
}) {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Overlay (پس‌زمینه مشکی) */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 bg-black/50 z-40"
                        onClick={onClose}
                    />

                    {/* خود سایدبار */}
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{
                            type: "spring",
                            damping: 25,
                            stiffness: 200
                        }}
                        className="fixed right-0 top-0 h-full p-2 w-78 bg-white shadow-2xl z-50 overflow-y-auto"
                    >
                        {children}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
