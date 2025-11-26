const Terms = () => {
  const termsSections = [
    {
      title: "قبول شرایط",
      content: `با استفاده از این وبسایت، شما این شرایط و ضوابط را می‌پذیرید. اگر با هر بخشی از این شرایط مخالف هستید، لطفاً از استفاده از وبسایت خودداری کنید.`
    },
    {
      title: "حساب کاربری",
      content: `شما مسئول حفظ محرمانه بودن اطلاعات حساب کاربری و رمز عبور خود هستید و موافقت می‌کنید که مسئولیت تمام فعالیت‌هایی که تحت حساب کاربری شما رخ می‌دهد را بپذیرید.`
    },
    {
      title: "خرید و پرداخت",
      content: `قیمت‌های تمام محصولات به ریال بوده و شامل مالیات بر ارزش افزوده می‌باشد. ما حق تغییر قیمت‌ها را بدون اطلاع قبلی محفوظ می‌داریم.`
    },
    {
      title: "بازگشت کالا",
      content: `مشتریان می‌توانند در صورت عدم رضایت از محصول، ظرف ۷ روز کاری از تاریخ دریافت کالا، نسبت به بازگرداندن آن اقدام نمایند.`
    },
    {
      title: "حریم خصوصی",
      content: `ما اطلاعات شخصی شما را مطابق با سیاست حریم خصوصی خود که بخشی از این شرایط است، مدیریت می‌کنیم.`
    },
    {
      title: "محدودیت مسئولیت",
      content: `ما در قبال هرگونه خسارت مستقیم، غیرمستقیم، اتفاقی یا خاص ناشی از استفاده یا عدم امکان استفاده از وبسایت مسئولیتی نداریم.`
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-black text-gray-800 mb-4">قوانین و مقررات</h1>
            <p className="text-xl text-gray-600">
              لطفاً قبل از استفاده از وبسایت، شرایط و ضوابط زیر را به دقت مطالعه کنید
            </p>
            <div className="w-24 h-1 bg-blue-600 mx-auto mt-6 rounded-full"></div>
          </div>

          {/* Last Updated */}
          <div className="bg-blue-50 rounded-2xl p-6 mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-black text-blue-600 text-lg">آخرین بروزرسانی</h3>
                <p className="text-gray-600">۱ دی ۱۴۰۲</p>
              </div>
              <div className="text-3xl">📝</div>
            </div>
          </div>

          {/* Terms Content */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            {termsSections.map((section, index) => (
              <div key={index} className={`p-8 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                <div className="flex items-start gap-4">
                  <div className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-gray-800 mb-4">{section.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{section.content}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Acceptance Section */}
          <div className="bg-green-50 rounded-2xl p-8 mt-8 text-center">
            <div className="text-4xl mb-4">✅</div>
            <h3 className="text-2xl font-black text-green-800 mb-4">تایید شرایط</h3>
            <p className="text-green-700">
              با استفاده از این وبسایت، شما تمامی شرایط و ضوابط فوق را می‌پذیرید.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;
