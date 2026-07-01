import { useState, useEffect, memo } from 'react';
import { motion, useMotionValue, animate } from 'framer-motion';
import {
  FaEye,
  FaBullseye,
  FaHeart,
  FaHistory,
  FaStar,
  FaLinkedin,
  FaTwitter,
  FaGithub
} from 'react-icons/fa';
import bgImage from '../assets/interview.png';

const About = () => {
  const [activeTab, setActiveTab] = useState('vision');

  // ============================================================
  //  داده‌ها
  // ============================================================
  const stats = [
    { number: 50000, label: 'مشتری راضی', suffix: '+' },
    { number: 5000, label: 'محصول متنوع', suffix: '+' },
    { number: 98, label: 'رضایت مشتریان', suffix: '%' },
    { number: 15, label: 'سال تجربه', suffix: '' },
  ];

  const tabs = [
    {
      id: 'vision',
      label: 'چشم‌انداز',
      icon: FaEye,
      title: 'چشم‌انداز ما برای آینده',
      description:
        'ما در تلاشیم تا تبدیل به برترین پلتفرم فروش آنلاین در منطقه شویم، جایی که مشتریان بتوانند با اطمینان کامل و لذت هرچه بیشتر خرید کنند.',
      points: [
        'ارائه بهترین خدمات به مشتریان',
        'توسعه مستمر تکنولوژی‌های نوین',
        'گسترش سبد محصولات و خدمات',
        'حفظ رهبری در نوآوری و کیفیت',
      ],
    },
    {
      id: 'mission',
      label: 'ماموریت',
      icon: FaBullseye,
      title: 'ماموریت اصلی ما',
      description:
        'ماموریت ما ایجاد تجربه‌ای بی‌نظیر از خرید آنلاین است که در آن کیفیت، سرعت و امنیت در کنار هم قرار گیرند. ما به دنبال ایجاد ارتباط پایدار با مشتریان خود هستیم.',
      points: [
        'ارائه محصولات با کیفیت تضمینی',
        'پشتیبانی ۲۴ ساعته، ۷ روز هفته',
        'ارسال سریع و ایمن به سراسر کشور',
        'ضمانت بازگشت کالا تا ۷ روز',
      ],
    },
    {
      id: 'values',
      label: 'ارزش‌ها',
      icon: FaHeart,
      title: 'ارزش‌های بنیادین ما',
      description:
        'ما بر اساس اصول اخلاقی و انسانی فعالیت می‌کنیم و به مشتریان خود احترام می‌گذاریم. این ارزش‌ها هویت ما را تشکیل می‌دهند.',
      points: [
        'صداقت و شفافیت در تمام امور',
        'تعهد به کیفیت و برتری',
        'مشتری‌مداری و پاسخگویی',
        'نوآوری و پیشرفت مستمر',
      ],
    },
    {
      id: 'history',
      label: 'تاریخچه',
      icon: FaHistory,
      title: 'داستان موفقیت ما',
      description:
        'از سال ۱۳۸۸ فعالیت خود را با یک تیم کوچک آغاز کردیم. امروز با بیش از ۲۰۰ کارمند حرفه‌ای در خدمت شما هستیم و به یکی از معتبرترین فروشگاه‌های آنلاین تبدیل شده‌ایم.',
      points: [
        '۱۳۸۸: شروع فعالیت با ۵ نفر در یک دفتر کوچک',
        '۱۳۹۲: افتتاح فروشگاه اینترنتی و شروع فروش آنلاین',
        '۱۳۹۶: افزایش سرمایه و توسعه تیم به ۵۰ نفر',
        '۱۴۰۰: رسیدن به ۲۰۰ کارمند و ۵۰ هزار مشتری وفادار',
      ],
    },
  ];

  const team = [
    {
      name: 'علیرضا محمدی',
      role: 'مدیرعامل و بنیانگذار',
      image: 'https://ui-avatars.com/api/?name=علیرضا+محمدی&size=150&background=007bff&color=fff&bold=true',
    },
    {
      name: 'سارا احمدی',
      role: 'مدیر فنی',
      image: 'https://ui-avatars.com/api/?name=سارا+احمدی&size=150&background=28a745&color=fff&bold=true',
    },
    {
      name: 'محمد رضایی',
      role: 'مدیر بازاریابی',
      image: 'https://ui-avatars.com/api/?name=محمد+رضایی&size=150&background=dc3545&color=fff&bold=true',
    },
    {
      name: 'فاطمه کریمی',
      role: 'مدیر فروش',
      image: 'https://ui-avatars.com/api/?name=فاطمه+کریمی&size=150&background=6f42c1&color=fff&bold=true',
    },
  ];

  const testimonials = [
    {
      id: 1,
      name: 'رضا احمدی',
      role: 'مدیر شرکت آفتاب',
      comment:
        'بهترین تجربه خرید آنلاین رو با این فروشگاه داشتم. محصولات با کیفیت و ارسال سریع. پشتیبانی عالی و پاسخگویی فوق‌العاده.',
      rating: 5,
      image: 'https://ui-avatars.com/api/?name=رضا+احمدی&size=80&background=fbbf24&color=000&bold=true',
    },
    {
      id: 2,
      name: 'زهرا محمدی',
      role: 'طراح گرافیک',
      comment:
        'کیفیت محصولات عالی و پشتیبانی فوق‌العاده‌ای دارن. حتماً به دوستانم هم پیشنهاد می‌کنم. از تنوع محصولات هم خیلی راضی ام.',
      rating: 5,
      image: 'https://ui-avatars.com/api/?name=زهرا+محمدی&size=80&background=f59e0b&color=fff&bold=true',
    },
    {
      id: 3,
      name: 'علی کریمی',
      role: 'مدیر فروش',
      comment:
        'تنها فروشگاهی که من به خرید آنلاین اعتماد دارم. قیمت‌ها هم مناسب و رقابتی هستن. ارسال به موقع و بسته‌بندی حرفه‌ای.',
      rating: 4,
      image: 'https://ui-avatars.com/api/?name=علی+کریمی&size=80&background=10b981&color=fff&bold=true',
    },
  ];

  const activeTabContent = tabs.find((tab) => tab.id === activeTab);

  // ============================================================
  //  کامپوننت شمارنده با framer-motion
  // ============================================================
  const AnimatedNumber = ({ value, suffix = '' }) => {
    const [displayValue, setDisplayValue] = useState(0);
    const count = useMotionValue(0);

    useEffect(() => {
      const controls = animate(count, value, { duration: 2.5, ease: 'easeOut' });
      const unsubscribe = count.on('change', (latest) => {
        setDisplayValue(Math.round(latest));
      });
      return () => {
        controls.stop();
        unsubscribe();
      };
    }, [value, count]);

    return (
      <span>
        {displayValue.toLocaleString()}
        {suffix}
      </span>
    );
  };

  // ============================================================
  //  انیمیشن‌های مشترک
  // ============================================================
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* ============================================================
          HERO
          ============================================================ */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        transition={{ duration: 0.8 }}
        className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white py-28 overflow-hidden"
      >
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage: `url(${bgImage})`,
          }}
        />
        <div className="absolute inset-0 bg-black/10" />
        <div className="relative container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-black mb-6">درباره ما</h1>
          <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
            بیش از ۱۵ سال است که در زمینه فروش آنلاین فعالیت می‌کنیم و
            ماموریت ما ارائه بهترین تجربه خرید به مشتریان است
          </p>
        </div>
      </motion.section>

      {/* ============================================================
          STATS – شمارش اعداد با framer-motion
          ============================================================ */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={fadeUp}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-black text-blue-600 mb-2">
                  <AnimatedNumber value={stat.number} suffix={stat.suffix} />
                </div>
                <div className="text-gray-600 font-semibold text-sm md:text-base">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          TABS
          ============================================================ */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-3xl shadow-2xl p-6 md:p-10"
          >
            {/* دکمه‌های تب */}
            <div className="flex flex-wrap gap-3 mb-10" role="tablist">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-5 py-3 rounded-xl font-semibold transition-all duration-300 ${
                      activeTab === tab.id
                        ? 'bg-blue-600 text-white shadow-lg scale-105'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:scale-105'
                    }`}
                    aria-selected={activeTab === tab.id}
                    role="tab"
                  >
                    <Icon className="w-5 h-5" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* محتوای تب */}
            <div className="prose prose-lg max-w-none" role="tabpanel">
              <motion.div
                key={activeTab}
                initial="hidden"
                animate="visible"
                variants={fadeUp}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                {activeTabContent && (
                  <>
                    <h3 className="text-2xl md:text-3xl font-black text-gray-800">
                      {activeTabContent.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed text-base md:text-lg">
                      {activeTabContent.description}
                    </p>
                    <ul className="grid md:grid-cols-2 gap-4 text-gray-600">
                      {activeTabContent.points.map((point, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-3 bg-gray-50 p-4 rounded-xl hover:bg-blue-50 transition-colors"
                        >
                          <span className="text-blue-600 font-bold text-xl mt-0.5">✓</span>
                          <span className="leading-relaxed">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ============================================================
          TEAM
          ============================================================ */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-black text-gray-800 mb-4">تیم حرفه‌ای ما</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              با تیمی متشکل از متخصصان با تجربه و پرانرژی آشنا شوید
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={fadeUp}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="bg-gray-50 rounded-2xl p-6 text-center group hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
              >
                <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-blue-100 shadow-lg group-hover:scale-110 transition-transform duration-500">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-black text-gray-800 text-lg mb-1">{member.name}</h3>
                <p className="text-blue-600 font-semibold text-sm">{member.role}</p>
                <div className="flex justify-center gap-2 mt-4">
                  <button className="p-2 bg-blue-50 text-blue-600 rounded-full hover:bg-blue-600 hover:text-white transition-colors">
                    <FaLinkedin className="w-4 h-4" />
                  </button>
                  <button className="p-2 bg-blue-50 text-blue-600 rounded-full hover:bg-blue-600 hover:text-white transition-colors">
                    <FaTwitter className="w-4 h-4" />
                  </button>
                  <button className="p-2 bg-blue-50 text-blue-600 rounded-full hover:bg-blue-600 hover:text-white transition-colors">
                    <FaGithub className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          TESTIMONIALS
          ============================================================ */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-black text-gray-800 mb-4">نظرات مشتریان</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              آنچه مشتریان ما درباره ما می‌گویند
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((item, index) => (
              <motion.div
                key={item.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                variants={fadeUp}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-14 h-14 rounded-full object-cover border-2 border-blue-100"
                  />
                  <div>
                    <h4 className="font-bold text-gray-800">{item.name}</h4>
                    <p className="text-sm text-gray-500">{item.role}</p>
                  </div>
                </div>
                <div className="flex text-yellow-400 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      className={`w-5 h-5 ${i < item.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
                <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                  "{item.comment}"
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default memo(About);
