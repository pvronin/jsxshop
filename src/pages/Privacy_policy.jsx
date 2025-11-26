const PrivacyPolicy = () => {
  const privacySections = [
    {
      title: "اطلاعاتی که جمع‌آوری می‌کنیم",
      content: `ما اطلاعاتی از قبیل نام، آدرس ایمیل، آدرس پستی و اطلاعات پرداخت شما را هنگام ثبت‌نام و خرید جمع‌آوری می‌کنیم. همچنین اطلاعات مربوط به نحوه استفاده شما از وبسایت را نیز جمع‌آوری می‌نماییم.`
    },
    {
      title: "نحوه استفاده از اطلاعات",
      content: `از اطلاعات شما برای پردازش سفارشات، بهبود خدمات، ارسال اطلاعیه‌ها و ارائه پشتیبانی استفاده می‌کنیم. ما اطلاعات شما را به هیچ شخص ثالثی نمی‌فروشیم یا اجاره نمی‌دهیم.`
    },
    {
      title: "حفاظت از اطلاعات",
      content: `ما از اقدامات امنیتی فیزیکی، الکترونیکی و اداری برای محافظت از اطلاعات شما در برابر دسترسی، استفاده یا افشای غیرمجاز استفاده می‌کنیم.`
    },
    {
      title: "کوکی‌ها",
      content: `ما از کوکی‌ها و تکنولوژی‌های مشابه برای بهبود تجربه کاربری، تحلیل ترافیک وبسایت و شخصی‌سازی محتوا استفاده می‌کنیم.`
    },
    {
      title: "اشتراک‌گذاری اطلاعات",
      content: `ما اطلاعات شما را فقط در مواردی که قانوناً ملزم باشیم یا برای ارائه خدمات به شما ضروری باشد (مانند شرکت‌های حمل و نقل) با اشخاص ثالث به اشتراک می‌گذاریم.`
    },
    {
      title: "حقوق شما",
      content: `شما حق دارید به اطلاعات شخصی خود دسترسی داشته، آن را اصلاح یا حذف کنید. همچنین می‌توانید در هر زمان با ارسال ایمیل به info@example.com، رضایت خود را لغو نمایید.`
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-black text-gray-800 mb-4">سیاست حریم خصوصی</h1>
            <p className="text-xl text-gray-600">
              نحوه جمع‌آوری، استفاده و محافظت از اطلاعات شما را در این سند شرح داده‌ایم
            </p>
            <div className="w-24 h-1 bg-blue-600 mx-auto mt-6 rounded-full"></div>
          </div>

          {/* Important Notice */}
          <div className="bg-purple-50 rounded-2xl p-6 mb-8 border-r-4 border-purple-500">
            <div className="flex items-start gap-4">
              <div className="text-2xl text-purple-600">🔒</div>
              <div>
                <h3 className="font-black text-purple-600 text-lg mb-2">توجه مهم</h3>
                <p className="text-purple-700">
                  حفاظت از اطلاعات شخصی شما برای ما بسیار مهم است. این سند توضیح می‌دهد که چگونه از اطلاعات شما محافظت می‌کنیم.
                </p>
              </div>
            </div>
          </div>

          {/* Privacy Content */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            {privacySections.map((section, index) => (
              <div key={index} className={`p-8 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                    index % 3 === 0 ? 'bg-blue-100 text-blue-600' :
                    index % 3 === 1 ? 'bg-green-100 text-green-600' :
                    'bg-purple-100 text-purple-600'
                  }`}>
                    {index % 3 === 0 && '📊'}
                    {index % 3 === 1 && '🛡️'}
                    {index % 3 === 2 && '🔐'}
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-gray-800 mb-4">{section.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{section.content}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Contact for Privacy */}
          <div className="bg-blue-50 rounded-2xl p-8 mt-8 text-center">
            <h3 className="text-2xl font-black text-blue-800 mb-4">سوالی درباره حریم خصوصی دارید؟</h3>
            <p className="text-blue-700 mb-4">
              اگر سوالی درباره سیاست حریم خصوصی ما دارید، خوشحال می‌شویم که پاسخ دهیم.
            </p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold transition-colors duration-300">
              تماس با ما
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
