import { useState } from 'react';
import MyMap from '../components/MyMap';

const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission
        console.log('Form submitted:', formData);
    };

    const contactInfo = [
        {
            icon: "📍",
            title: "آدرس",
            content: "تهران، خیابان ولیعصر، پلاک ۱۲۳۴",
            description: "ساعات کاری: شنبه تا چهارشنبه ۸:۰۰ تا ۱۷:۰۰"
        },
        {
            icon: "📞",
            title: "تلفن",
            content: "۰۲۱-۱۲۳۴۵۶۷۸",
            description: "پاسخگویی ۲۴ ساعته"
        },
        {
            icon: "✉️",
            title: "ایمیل",
            content: "info@example.com",
            description: "در کمتر از ۲۴ ساعت پاسخ می‌دهیم"
        },
        {
            icon: "🌐",
            title: "پشتیبانی آنلاین",
            content: "چت آنلاین",
            description: "۲۴/۷ در دسترس هستیم"
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white py-24 overflow-hidden">
                <div className="absolute inset-0 bg-black bg-opacity-10"></div>
                <div className="relative container mx-auto px-4 text-center">
                    <h1 className="text-5xl font-black mb-6">تماس با ما</h1>
                    <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
                        ما اینجا هستیم تا به سوالات شما پاسخ دهیم. از طریق راه‌های ارتباطی زیر با ما در تماس باشید
                    </p>
                </div>
            </section>

            {/* Contact Info & Form */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="grid lg:grid-cols-3 gap-12">
                        {/* Contact Information */}
                        <div className="lg:col-span-1">
                            <h2 className="text-3xl font-black text-gray-800 mb-8">راه‌های ارتباطی</h2>

                            <div className="space-y-6">
                                {contactInfo.map((item, index) => (
                                    <div key={index} className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                                        <div className="flex items-start gap-4">
                                            <div className="text-2xl">{item.icon}</div>
                                            <div>
                                                <h3 className="font-black text-gray-800 text-lg mb-2">{item.title}</h3>
                                                <p className="text-blue-600 font-semibold mb-1">{item.content}</p>
                                                <p className="text-gray-600 text-sm">{item.description}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                        </div>

                        {/* Contact Form */}
                        <div className="lg:col-span-2">
                            <div className="bg-white rounded-2xl shadow-xl p-8">
                                <h2 className="text-3xl font-black text-gray-800 mb-2">پیام به ما</h2>
                                <p className="text-gray-600 mb-8">
                                    فرم زیر را پر کنید تا در اسرع وقت با شما تماس بگیریم
                                </p>

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-gray-700 font-semibold mb-2">نام کامل</label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                                                placeholder="نام خود را وارد کنید"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-gray-700 font-semibold mb-2">ایمیل</label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                                                placeholder="email@example.com"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-gray-700 font-semibold mb-2">موضوع</label>
                                        <input
                                            type="text"
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                                            placeholder="موضوع پیام"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-gray-700 font-semibold mb-2">پیام</label>
                                        <textarea
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            rows="6"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 resize-none"
                                            placeholder="متن پیام خود را بنویسید..."
                                            required
                                        ></textarea>
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-4 px-8 rounded-xl font-black text-lg transition-all duration-300 transform hover:scale-[1.02] shadow-lg"
                                    >
                                        ارسال پیام
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Map Section */}
            <section className="py-16 bg-white">

                <MyMap>

                </MyMap>
            </section>
        </div>
    );
};
export default ContactUs;
