import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Layers, 
  Droplets, 
  Cpu, 
  Bot, 
  Thermometer, 
  Waves, 
  Bell, 
  Send, 
  Power,
  ShieldAlert,
  Flame,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Activity
} from 'lucide-react';

export default function SmartAgriGuardApp() {
  // 📍 الحالة الخاصة بالتنقل بين الصفحات (Active Page Tab)
  const [activeTab, setActiveTab] = useState('overview');

  // 📍 حالات المستشعرات والمحاكاة
  const [smokePpm, setSmokePpm] = useState(12);
  const [isSmokeDetected, setIsSmokeDetected] = useState(false);
  const [isRelayActive, setIsRelayActive] = useState(false);
  const [waterPump, setWaterPump] = useState(false);
  const [autoMode, setAutoMode] = useState(true);

  // 📍 محادثات المساعد الذكي
  const [messages, setMessages] = useState([
    { sender: 'ai', text: 'مرحباً بك! أنا المساعد الذكي لـ Smart-AgriGuard. جميع الحساسات والنظام في حالة استقرار.' }
  ]);
  const [inputMsg, setInputMsg] = useState('');

  const handleSendMessage = () => {
    if (!inputMsg.trim()) return;
    const newMsgs = [...messages, { sender: 'user', text: inputMsg }];
    setMessages(newMsgs);
    setInputMsg('');

    setTimeout(() => {
      setMessages([
        ...newMsgs,
        { sender: 'ai', text: 'تم استلام استفسارك! جاري معالجة بيانات الحساسات وتحليل حالة المزرعة...' }
      ]);
    }, 800);
  };

  const toggleSmokeSimulation = () => {
    if (!isSmokeDetected) {
      setSmokePpm(450);
      setIsSmokeDetected(true);
      if (autoMode) setIsRelayActive(true);
    } else {
      setSmokePpm(12);
      setIsSmokeDetected(false);
      setIsRelayActive(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#F4F7F6] text-slate-800 font-sans" dir="rtl">
      
      {/* 🟢 NAVIGATION SIDEBAR */}
      <aside className="w-64 bg-white border-l border-slate-200 p-6 flex flex-col justify-between hidden md:flex shadow-sm">
        <div>
          {/* Logo & Header */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-emerald-500 rounded-2xl flex items-center justify-center text-white font-bold text-xl shadow-md shadow-emerald-200">
              🌱
            </div>
            <div>
              <h1 className="font-extrabold text-slate-800 text-base leading-tight">مزرعة ذكية</h1>
              <span className="text-xs text-emerald-600 font-bold">Smart-AgriGuard</span>
            </div>
          </div>

          {/* Nav Items Buttons */}
          <nav className="space-y-2">
            <button 
              onClick={() => setActiveTab('overview')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-bold transition-all ${
                activeTab === 'overview' 
                  ? 'bg-emerald-500 text-white shadow-md shadow-emerald-100' 
                  : 'text-slate-500 hover:bg-slate-50'
              }`}
            >
              <LayoutDashboard className="w-5 h-5" />
              <span>نظرة عامة</span>
            </button>

            <button 
              onClick={() => setActiveTab('sectors')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-bold transition-all ${
                activeTab === 'sectors' 
                  ? 'bg-emerald-500 text-white shadow-md shadow-emerald-100' 
                  : 'text-slate-500 hover:bg-slate-50'
              }`}
            >
              <Layers className="w-5 h-5" />
              <span>قطاعات المزرعة</span>
            </button>

            <button 
              onClick={() => setActiveTab('irrigation')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-bold transition-all ${
                activeTab === 'irrigation' 
                  ? 'bg-emerald-500 text-white shadow-md shadow-emerald-100' 
                  : 'text-slate-500 hover:bg-slate-50'
              }`}
            >
              <Droplets className="w-5 h-5" />
              <span>التحكم بالري</span>
            </button>

            <button 
              onClick={() => setActiveTab('sensors')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-bold transition-all ${
                activeTab === 'sensors' 
                  ? 'bg-emerald-500 text-white shadow-md shadow-emerald-100' 
                  : 'text-slate-500 hover:bg-slate-50'
              }`}
            >
              <Cpu className="w-5 h-5" />
              <span>المستشعرات</span>
            </button>

            <button 
              onClick={() => setActiveTab('ai-advisor')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-bold transition-all ${
                activeTab === 'ai-advisor' 
                  ? 'bg-emerald-500 text-white shadow-md shadow-emerald-100' 
                  : 'text-slate-500 hover:bg-slate-50'
              }`}
            >
              <Bot className="w-5 h-5" />
              <span>المساعد الذكي</span>
            </button>
          </nav>
        </div>

        {/* System Status Banner */}
        <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-2xl text-center">
          <p className="text-xs text-emerald-800 font-bold mb-1">حالة النظام: مستقر</p>
          <span className="text-[10px] text-emerald-600">متصل بـ ESP32-S3 Server</span>
        </div>
      </aside>

      {/* MAIN DYNAMIC CONTENT */}
      <main className="flex-1 p-6 md:p-8 space-y-6 overflow-y-auto">
        
        {/* HEADER */}
        <header className="flex justify-between items-center pb-2">
          <div>
            <h2 className="text-2xl font-black text-slate-800">
              {activeTab === 'overview' && 'لوحة التحكم - نظرة عامة'}
              {activeTab === 'sectors' && 'إدارة قطاعات المزرعة'}
              {activeTab === 'irrigation' && 'نظام التحكم التلقائي واليدوي بالري'}
              {activeTab === 'sensors' && 'قراءات المستشعرات المباشرة'}
              {activeTab === 'ai-advisor' && 'المساعد الذكي (AI Farm Advisor)'}
            </h2>
            <p className="text-slate-400 text-xs mt-0.5">نظام المراقبة وإدارة السلامة بالذكاء الاصطناعي</p>
          </div>

          <div className="flex items-center gap-3">
            <button className="p-2.5 bg-white rounded-2xl border border-slate-200 text-slate-500 hover:text-slate-700 shadow-sm relative">
              <Bell className="w-5 h-5" />
              {isSmokeDetected && <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full animate-ping"></span>}
            </button>
            <div className="flex items-center gap-3 bg-white p-1.5 pr-3 rounded-2xl border border-slate-200 shadow-sm">
              <span className="text-xs font-bold text-slate-700">مشروع التخرج</span>
              <div className="w-8 h-8 rounded-xl bg-emerald-500 text-white font-bold flex items-center justify-center text-xs">
                AG
              </div>
            </div>
          </div>
        </header>

        {/* 🚨 EMERGENCY SMOKE ALERT BANNER */}
        {isSmokeDetected && (
          <div className="bg-red-600 text-white rounded-2xl p-4 shadow-lg flex items-center justify-between animate-pulse">
            <div className="flex items-center gap-3">
              <Flame className="w-7 h-7 text-yellow-300" />
              <div>
                <h3 className="font-extrabold text-sm">تنبيه طارئ: تم رصد دخان عالي ({smokePpm} PPM)!</h3>
                <p className="text-xs text-red-100">تم تفعيل بروتوكول الإطفاء والسلامة تلقائياً.</p>
              </div>
            </div>
            <button 
              onClick={() => setIsRelayActive(!isRelayActive)}
              className="px-4 py-2 bg-white text-red-700 font-bold rounded-xl text-xs hover:bg-red-50 transition"
            >
              {isRelayActive ? 'إيقاف الـ Relay' : 'تشغيل الـ Relay'}
            </button>
          </div>
        )}

        {/* 🔄 PAGE 1: OVERVIEW PAGE (نظرة عامة) */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Top Metric Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold text-slate-400 block mb-1">رطوبة التربة</span>
                  <span className="text-2xl font-black text-slate-800">42%</span>
                </div>
                <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl">
                  <Droplets className="w-6 h-6" />
                </div>
              </div>

              <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold text-slate-400 block mb-1">درجة الحرارة</span>
                  <span className="text-2xl font-black text-slate-800">28°C</span>
                </div>
                <div className="p-3 bg-teal-50 text-teal-600 rounded-2xl">
                  <Thermometer className="w-6 h-6" />
                </div>
              </div>

              <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold text-slate-400 block mb-1">خزان المياه</span>
                  <span className="text-2xl font-black text-slate-800">75%</span>
                </div>
                <div className="p-3 bg-cyan-50 text-cyan-600 rounded-2xl">
                  <Waves className="w-6 h-6" />
                </div>
              </div>
            </div>

            {/* Main Overview Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Relay & Fire Safety Module */}
              <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-4 border-b border-slate-100 pb-3">
                    <ShieldAlert className="text-emerald-600 w-5 h-5" />
                    <h3 className="font-bold text-slate-800">وحدة التحكم بالإطفاء والـ Relay</h3>
                  </div>

                  <div className={`p-4 rounded-2xl mb-4 border ${isSmokeDetected ? 'bg-red-50 border-red-200 text-red-900' : 'bg-emerald-50/50 border-emerald-100 text-emerald-900'}`}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-bold text-slate-500">حساس الدخان (MQ-2 Sensor)</span>
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${isSmokeDetected ? 'bg-red-600 text-white' : 'bg-emerald-600 text-white'}`}>
                        {isSmokeDetected ? 'DANGER' : 'NORMAL'}
                      </span>
                    </div>
                    <div className="text-2xl font-black mt-1">
                      {smokePpm} <span className="text-xs font-normal text-slate-500">PPM</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <button
                    onClick={() => setIsRelayActive(!isRelayActive)}
                    className={`w-full py-3.5 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition ${
                      isRelayActive ? 'bg-red-600 text-white hover:bg-red-700' : 'bg-emerald-600 text-white hover:bg-emerald-700'
                    }`}
                  >
                    <Power className="w-4 h-4" />
                    {isRelayActive ? 'إيقاف وحدة الإطفاء (Relay)' : 'تفعيل وحدة الإطفاء (Relay) يدوياً'}
                  </button>

                  <button 
                    onClick={toggleSmokeSimulation}
                    className="w-full py-2 bg-slate-100 text-slate-600 text-xs font-bold rounded-xl hover:bg-slate-200 transition flex items-center justify-center gap-1"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    {isSmokeDetected ? 'إلغاء تجربة الدخان' : 'محاكاة إطلاق دخان وتفعيل التنبيه'}
                  </button>
                </div>
              </div>

              {/* System Control Quick Action */}
              <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-4 border-b border-slate-100 pb-3">
                    <Activity className="text-teal-600 w-5 h-5" />
                    <h3 className="font-bold text-slate-800">حالة نظام الري والتشغيل</h3>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
                      <span className="text-xs font-bold text-slate-700">مضخة المياه الأساسية</span>
                      <button 
                        onClick={() => setWaterPump(!waterPump)}
                        className={`px-4 py-1.5 rounded-xl text-xs font-black transition ${waterPump ? 'bg-emerald-500 text-white' : 'bg-slate-300 text-slate-700'}`}
                      >
                        {waterPump ? 'مفعلة (ON)' : 'متوقفة (OFF)'}
                      </button>
                    </div>

                    <div className="flex justify-between items-center p-3.5 bg-slate-50 rounded-2xl border border-slate-100">
                      <span className="text-xs font-bold text-slate-700">النموذج التلقائي (Auto-Pilot)</span>
                      <button 
                        onClick={() => setAutoMode(!autoMode)}
                        className={`px-4 py-1.5 rounded-xl text-xs font-black transition ${autoMode ? 'bg-teal-600 text-white' : 'bg-slate-300 text-slate-700'}`}
                      >
                        {autoMode ? 'نشط (Active)' : 'معطل'}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 mt-4 text-xs text-emerald-800">
                  💡 عند تفعيل الوضع التلقائي، يتم اتخاذ قرارات التشغيل والإطفاء بناءً على قراءات الحساسات والـ AI.
                </div>
              </div>

            </div>
          </div>
        )}

        {/* 🔄 PAGE 2: SECTORS (قطاعات المزرعة) */}
        {activeTab === 'sectors' && (
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
            <h3 className="font-bold text-lg text-slate-800 border-b pb-3">حالة قطاعات الصوبة الذكية</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-5 bg-emerald-50 rounded-2xl border border-emerald-200">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-bold text-emerald-900">القطاع الرئيسية (Main Greenhouse)</h4>
                  <span className="text-xs bg-emerald-600 text-white px-2.5 py-0.5 rounded-full font-bold">نشط</span>
                </div>
                <p className="text-xs text-slate-600">درجة الحرارة: 28°C | الرطوبة: 42% | نسبة الدخان: طبيعي ({smokePpm} PPM)</p>
              </div>

              <div className="p-5 bg-slate-50 rounded-2xl border border-slate-200">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="font-bold text-slate-800">قطاع التشتيل والنمو</h4>
                  <span className="text-xs bg-slate-400 text-white px-2.5 py-0.5 rounded-full font-bold">جاهز</span>
                </div>
                <p className="text-xs text-slate-500">حالة التربة مستقرة ولا توجد مؤشرات طوارئ.</p>
              </div>
            </div>
          </div>
        )}

        {/* 🔄 PAGE 3: IRRIGATION (التحكم بالري) */}
        {activeTab === 'irrigation' && (
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-6">
            <h3 className="font-bold text-lg text-slate-800 border-b pb-3">إدارة المضخة وجدولة الري</h3>
            <div className="flex flex-col md:flex-row items-center justify-between p-6 bg-slate-50 rounded-2xl border border-slate-200 gap-4">
              <div>
                <h4 className="font-bold text-slate-800 text-base">مضخة الري الذكية</h4>
                <p className="text-xs text-slate-500 mt-1">يمكنك تشغيل المضخة يدوياً أو ترك التحكم لنظام الذكاء الاصطناعي.</p>
              </div>
              <button 
                onClick={() => setWaterPump(!waterPump)}
                className={`px-8 py-3 rounded-2xl font-bold text-sm shadow transition ${
                  waterPump ? 'bg-red-500 text-white hover:bg-red-600' : 'bg-emerald-600 text-white hover:bg-emerald-700'
                }`}
              >
                {waterPump ? 'إيقاف ضخ المياه' : 'تشغيل مضخة المياه الآن'}
              </button>
            </div>
          </div>
        )}

        {/* 🔄 PAGE 4: SENSORS (المستشعرات) */}
        {activeTab === 'sensors' && (
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
            <h3 className="font-bold text-lg text-slate-800 border-b pb-3">قراءات المستشعرات (Live Telemetry)</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                <span className="text-xs text-slate-400 block font-bold">Capacitive Soil Moisture</span>
                <span className="text-xl font-black text-slate-800 mt-1 block">42%</span>
              </div>
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                <span className="text-xs text-slate-400 block font-bold">DHT22 Temperature</span>
                <span className="text-xl font-black text-slate-800 mt-1 block">28°C</span>
              </div>
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                <span className="text-xs text-slate-400 block font-bold">MQ-2 Smoke Sensor</span>
                <span className="text-xl font-black text-slate-800 mt-1 block">{smokePpm} PPM</span>
              </div>
            </div>
          </div>
        )}

        {/* 🔄 PAGE 5: AI ADVISOR (المساعد الذكي) */}
        {activeTab === 'ai-advisor' && (
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col justify-between min-h-[420px]">
            <div>
              <div className="flex items-center gap-2 pb-4 border-b border-slate-100 mb-4">
                <Bot className="w-6 h-6 text-emerald-600" />
                <div>
                  <h3 className="font-bold text-slate-800">المساعد الذكي (AI Farm Advisor)</h3>
                  <span className="text-xs text-slate-400">نظام دعم القرار التفاعلي</span>
                </div>
              </div>

              <div className="space-y-3 max-h-[260px] overflow-y-auto p-2">
                {messages.map((msg, idx) => (
                  <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-start' : 'justify-end'}`}>
                    <div className={`p-3.5 rounded-2xl text-xs max-w-[85%] ${
                      msg.sender === 'user' ? 'bg-emerald-500 text-white' : 'bg-slate-800 text-slate-100'
                    }`}>
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2 pt-4 border-t border-slate-100">
              <input 
                type="text" 
                value={inputMsg}
                onChange={(e) => setInputMsg(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="اسأل المساعد الذكي عن حالة المزرعة..."
                className="flex-1 bg-slate-100 border border-slate-200 rounded-xl px-4 py-2.5 text-xs focus:outline-none"
              />
              <button onClick={handleSendMessage} className="p-2.5 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition">
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}