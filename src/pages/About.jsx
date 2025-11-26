import { useState } from 'react';

const About = () => {
  const [activeTab, setActiveTab] = useState('vision');

  const Icon = ({ name, className = "w-6 h-6" }) => {
    const icons = {
      target: (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      eye: (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      ),
      users: (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
        </svg>
      ),
      trophy: (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      )
    };
    return icons[name] || null;
  };

  const stats = [
    { number: "50,000+", label: "مشتری راضی" },
    { number: "5,000+", label: "محصول متنوع" },
    { number: "98%", label: "رضایت مشتریان" },
    { number: "15", label: "سال تجربه" }
  ];

  const team = [
    { name: "علیرضا محمدی", role: "مدیرعامل", image: "https://via.placeholder.com/150/007bff/ffffff?text=AM" },
    { name: "سارا احمدی", role: "مدیر فنی", image: "https://via.placeholder.com/150/28a745/ffffff?text=SA" },
    { name: "محمد رضایی", role: "مدیر بازاریابی", image: "https://via.placeholder.com/150/dc3545/ffffff?text=MR" },
    { name: "فاطمه کریمی", role: "مدیر فروش", image: "https://via.placeholder.com/150/6f42c1/ffffff?text=FK" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white py-24 overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-10"></div>
        <div className="relative container mx-auto px-4 text-center">
          <h1 className="text-5xl font-black mb-6">درباره ما</h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
            بیش از ۱۵ سال است که در زمینه فروش آنلاین فعالیت می‌کنیم و ماموریت ما ارائه بهترین تجربه خرید به مشتریان است
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-black text-blue-600 mb-2">{stat.number}</div>
                <div className="text-gray-600 font-semibold">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex flex-wrap gap-4 mb-8">
              {['vision', 'mission', 'values', 'history'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    activeTab === tab
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {tab === 'vision' && 'چشم انداز'}
                  {tab === 'mission' && 'ماموریت'}
                  {tab === 'values' && 'ارزش‌ها'}
                  {tab === 'history' && 'تاریخچه'}
                </button>
              ))}
            </div>

            <div className="prose prose-lg max-w-none">
              {activeTab === 'vision' && (
                <div className="space-y-4">
                  <h3 className="text-2xl font-black text-gray-800">چشم انداز ما</h3>
                  <p className="text-gray-600 leading-relaxed">
                    ما در تلاشیم تا تبدیل به برترین پلتفرم فروش آنلاین در منطقه شویم، جایی که مشتریان بتوانند با اطمینان کامل و لذت هرچه بیشتر خرید کنند.
                  </p>
                  <ul className="text-gray-600 space-y-2">
                    <li>• ارائه بهترین خدمات به مشتریان</li>
                    <li>• توسعه مستمر تکنولوژی‌های نوین</li>
                    <li>• گسترش سبد محصولات و خدمات</li>
                    <li>• حفظ رهبری در نوآوری و کیفیت</li>
                  </ul>
                </div>
              )}

              {activeTab === 'mission' && (
                <div className="space-y-4">
                  <h3 className="text-2xl font-black text-gray-800">ماموریت ما</h3>
                  <p className="text-gray-600 leading-relaxed">
                    ماموریت ما ایجاد تجربه‌ای بی‌نظیر از خرید آنلاین است که در آن کیفیت، سرعت و امنیت در کنار هم قرار گیرند.
                  </p>
                </div>
              )}

              {activeTab === 'values' && (
                <div className="space-y-4">
                  <h3 className="text-2xl font-black text-gray-800">ارزش‌های بنیادین</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-blue-50 p-6 rounded-xl">
                      <h4 className="font-black text-blue-600 mb-2">صداقت و شفافیت</h4>
                      <p className="text-gray-600">همواره با مشتریان خود صادق هستیم و اطلاعات کاملی در اختیارشان قرار می‌دهیم.</p>
                    </div>
                    <div className="bg-green-50 p-6 rounded-xl">
                      <h4 className="font-black text-green-600 mb-2">تعهد به کیفیت</h4>
                      <p className="text-gray-600">کیفیت در تمامی مراحل، از محصول تا خدمات پس از فروش، اولویت اصلی ماست.</p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'history' && (
                <div className="space-y-4">
                  <h3 className="text-2xl font-black text-gray-800">تاریخچه ما</h3>
                  <p className="text-gray-600 leading-relaxed">
                    از سال ۱۳۸۸ فعالیت خود را با یک تیم کوچک آغاز کردیم و امروز با بیش از ۲۰۰ کارمند در خدمت شما هستیم.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-black text-gray-800 mb-4">تیم ما</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              با تیمی متشکل از متخصصان با تجربه و پرانرژی آشنا شوید
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-gray-50 rounded-2xl p-6 text-center group hover:shadow-xl transition-all duration-500">
                <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-white shadow-lg group-hover:scale-110 transition-transform duration-500">
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                </div>
                <h3 className="font-black text-gray-800 text-lg mb-2">{member.name}</h3>
                <p className="text-blue-600 font-semibold">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
export default About;
