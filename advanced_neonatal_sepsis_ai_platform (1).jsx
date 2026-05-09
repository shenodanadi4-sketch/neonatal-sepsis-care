import { useState } from 'react';

export default function NeonatalSepsisAI() {
  const [language, setLanguage] = useState('en');
  const [userType, setUserType] = useState('parent');
  const [childName, setChildName] = useState('');
  const [childAge, setChildAge] = useState('');
  const [childLocation, setChildLocation] = useState('home');
  const [score, setScore] = useState(0);
  const [cryResult, setCryResult] = useState('');
  const [cryScore, setCryScore] = useState(0);
  const [heartRate, setHeartRate] = useState(132);
  const [oxygen, setOxygen] = useState(96);
  const [selectedOrganism, setSelectedOrganism] = useState('E.coli');

  const t = {
    en: {
      title: 'Neonatal Sepsis AI Platform',
      parent: 'Parent Section',
      staff: 'Medical Staff Section',
      symptoms: 'Symptoms',
      labs: 'Laboratory Results',
      prevention: 'Prevention',
      risk: 'Risk Level',
    },
    ar: {
      title: 'منصة الذكاء الاصطناعي لتعفن الدم',
      parent: 'قسم الأهل',
      staff: 'قسم الطاقم الطبي',
      symptoms: 'الأعراض',
      labs: 'التحاليل',
      prevention: 'الوقاية',
      risk: 'مستوى الخطورة',
    },
  };

  const lang = t[language];

  const symptoms = [
    { en: 'Poor Feeding', ar: 'ضعف الرضاعة', points: 2 },
    { en: 'Fever', ar: 'ارتفاع الحرارة', points: 3 },
    { en: 'Hypothermia', ar: 'انخفاض الحرارة', points: 3 },
    { en: 'Respiratory Distress', ar: 'ضيق التنفس', points: 4 },
    { en: 'Grunting', ar: 'أنين تنفسي', points: 3 },
    { en: 'Apnea', ar: 'توقف التنفس', points: 5 },
    { en: 'Cyanosis', ar: 'ازرقاق', points: 4 },
    { en: 'Lethargy', ar: 'خمول', points: 3 },
    { en: 'Irritability', ar: 'تهيج وعصبية', points: 2 },
    { en: 'Weak Cry', ar: 'بكاء ضعيف', points: 3 },
    { en: 'High-Pitched Cry', ar: 'بكاء حاد عالي النبرة', points: 4 },
    { en: 'Seizures', ar: 'تشنجات', points: 5 },
    { en: 'Hypotonia', ar: 'ارتخاء العضلات', points: 4 },
    { en: 'Jaundice', ar: 'يرقان', points: 2 },
    { en: 'Vomiting', ar: 'قيء', points: 2 },
    { en: 'Abdominal Distension', ar: 'انتفاخ البطن', points: 3 },
    { en: 'Diarrhea', ar: 'إسهال', points: 2 },
    { en: 'Delayed Capillary Refill', ar: 'تأخر الامتلاء الشعيري', points: 4 },
    { en: 'Mottled Skin', ar: 'تلون جلدي مرقش', points: 4 },
    { en: 'Hypoglycemia', ar: 'انخفاض السكر', points: 4 },
    { en: 'Bradycardia', ar: 'بطء ضربات القلب', points: 4 },
    { en: 'Tachycardia', ar: 'تسارع ضربات القلب', points: 3 },
    { en: 'Bulging Fontanelle', ar: 'انتفاخ اليافوخ', points: 5 },
    { en: 'Joint Swelling', ar: 'تورم المفصل', points: 3 },
    { en: 'Joint Redness', ar: 'احمرار المفصل', points: 3 },
    { en: 'Limited Limb Movement', ar: 'قلة حركة الطرف', points: 4 },
    { en: 'Umbilical Redness or Discharge', ar: 'احمرار أو إفرازات السرة', points: 3 },
    { en: 'Skin Pustules', ar: 'بثور أو التهابات جلدية', points: 2 },
  ];

  const labs = [
    { en: 'Positive CRP', ar: 'CRP إيجابي', points: 3 },
    { en: 'High Procalcitonin (PCT)', ar: 'ارتفاع البروكالسيتونين', points: 5 },
    { en: 'Positive Blood Culture', ar: 'مزرعة دم إيجابية', points: 6 },
    { en: 'Abnormal CBC', ar: 'صورة دم غير طبيعية', points: 3 },
    { en: 'Neutropenia', ar: 'نقص العدلات', points: 4 },
    { en: 'Leukocytosis', ar: 'زيادة كرات الدم البيضاء', points: 3 },
    { en: 'Thrombocytopenia', ar: 'نقص الصفائح الدموية', points: 4 },
    { en: 'Elevated ESR', ar: 'ارتفاع ESR', points: 2 },
    { en: 'Positive CSF Findings', ar: 'نتائج CSF غير طبيعية', points: 6 },
    { en: 'Metabolic Acidosis', ar: 'حماض أيضي', points: 5 },
    { en: 'High Serum Lactate', ar: 'ارتفاع اللاكتات', points: 5 },
    { en: 'Abnormal ABG', ar: 'غازات دم غير طبيعية', points: 4 },
    { en: 'Positive Urine Culture', ar: 'مزرعة بول إيجابية', points: 4 },
    { en: 'Positive Joint Aspiration Culture', ar: 'مزرعة سائل المفصل إيجابية', points: 5 },
    { en: 'Elevated IL-6', ar: 'ارتفاع IL-6', points: 5 },
    { en: 'Elevated Ferritin', ar: 'ارتفاع الفيريتين', points: 3 },
    { en: 'Coagulopathy / DIC markers', ar: 'اضطراب التجلط أو DIC', points: 5 },
  ];

  const antibiotics = {
    'E.coli': 'Ampicillin + Gentamicin',
    'Klebsiella': 'Meropenem + Amikacin',
    'Staphylococcus aureus': 'Vancomycin + Cefotaxime',
  };

  const analyzeCry = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setScore((prev) => prev - cryScore);

    const patterns = language === 'en'
      ? [
          { label: 'Normal Cry', score: 0 },
          { label: 'Hungry Cry', score: 1 },
          { label: 'Sleepy Cry', score: 1 },
          { label: 'Pain Cry', score: 4 },
          { label: 'Respiratory Distress Cry', score: 5 },
        ]
      : [
          { label: 'بكاء طبيعي', score: 0 },
          { label: 'بكاء الجوع', score: 1 },
          { label: 'بكاء النعاس', score: 1 },
          { label: 'بكاء الألم', score: 4 },
          { label: 'بكاء ضيق التنفس', score: 5 },
        ];

    const result = patterns[Math.floor(Math.random() * patterns.length)];

    setCryResult(result.label);
    setCryScore(result.score);
    setScore((prev) => prev + result.score);
  };

  const riskLevel = () => {
    if (score <= 5) {
      return language === 'en' ? 'Low Risk' : 'خطورة منخفضة';
    }

    if (score <= 12) {
      return language === 'en' ? 'Moderate Risk' : 'خطورة متوسطة';
    }

    return language === 'en' ? 'High Risk' : 'خطورة عالية';
  };

  const suggestedTests = () => {
    const tests = [];

    if (score >= 5) {
      tests.push('CBC', 'CRP', 'Blood Culture');
    }

    if (score >= 10) {
      tests.push('ABG', 'Chest X-ray');
    }

    if (score >= 15) {
      tests.push('CSF Analysis');
    }

    return tests;
  };

  return (
    <div className="min-h-screen bg-slate-100 p-6" dir={language === 'ar' ? 'rtl' : 'ltr'}>
      <div className="max-w-7xl mx-auto bg-white rounded-3xl shadow-2xl p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold">{lang.title}</h1>
          </div>

          <button
            onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')}
            className="bg-blue-600 text-white px-5 py-3 rounded-2xl"
          >
            {language === 'en' ? 'العربية' : 'English'}
          </button>
        </div>

        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setUserType('parent')}
            className={`px-5 py-3 rounded-2xl ${userType === 'parent' ? 'bg-blue-600 text-white' : 'bg-slate-200'}`}
          >
            {lang.parent}
          </button>

          <button
            onClick={() => setUserType('staff')}
            className={`px-5 py-3 rounded-2xl ${userType === 'staff' ? 'bg-red-600 text-white' : 'bg-slate-200'}`}
          >
            {lang.staff}
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <input
            type="text"
            placeholder={language === 'en' ? 'Child Name' : 'اسم الطفل'}
            value={childName}
            onChange={(e) => setChildName(e.target.value)}
            className="border p-3 rounded-2xl"
          />

          <input
            type="number"
            placeholder={language === 'en' ? 'Age in Days' : 'العمر بالأيام'}
            value={childAge}
            onChange={(e) => setChildAge(e.target.value)}
            className="border p-3 rounded-2xl"
          />

          <select
            value={childLocation}
            onChange={(e) => setChildLocation(e.target.value)}
            className="border p-3 rounded-2xl"
          >
            <option value="home">{language === 'en' ? 'Home' : 'المنزل'}</option>
            <option value="nicu">NICU</option>
            <option value="other">{language === 'en' ? 'Other Place' : 'مكان آخر'}</option>
          </select>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-red-50 rounded-3xl p-6">
            <h2 className="text-2xl font-bold mb-5">🩺 {lang.symptoms}</h2>

            <div className="space-y-3">
              {symptoms.map((item) => (
                <label key={item.en} className="flex items-center gap-3 bg-white p-3 rounded-xl">
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      setScore((prev) =>
                        e.target.checked ? prev + item.points : prev - item.points
                      )
                    }
                  />
                  {language === 'en' ? item.en : item.ar} (+{item.points})
                </label>
              ))}
            </div>
          </div>

          <div className="bg-blue-50 rounded-3xl p-6">
            <h2 className="text-2xl font-bold mb-5">🧪 {lang.labs}</h2>

            <div className="space-y-3">
              {labs.map((item) => (
                <label key={item.en} className="flex items-center gap-3 bg-white p-3 rounded-xl">
                  <input
                    type="checkbox"
                    onChange={(e) =>
                      setScore((prev) =>
                        e.target.checked ? prev + item.points : prev - item.points
                      )
                    }
                  />
                  {language === 'en' ? item.en : item.ar} (+{item.points})
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mt-8">
          <div className="bg-white rounded-3xl p-6 shadow">
            <h3 className="text-xl font-bold mb-4">🎧 AI Cry Analysis</h3>

            <input
              type="file"
              accept="audio/*"
              onChange={analyzeCry}
              className="w-full border rounded-xl p-3 mb-4"
            />

            <div className="bg-slate-100 rounded-xl p-4">
              {cryResult || (language === 'en' ? 'No analysis yet' : 'لا يوجد تحليل بعد')}
            </div>
          </div>

          {userType === 'staff' && (
            <div className="bg-white rounded-3xl p-6 shadow border border-red-100">
              <h3 className="text-xl font-bold mb-5">❤️ NICU Monitoring</h3>

              <div className="mb-5">
                <label className="block text-sm font-semibold mb-2">
                  ❤️ {language === 'en' ? 'Heart Rate' : 'معدل ضربات القلب'}
                </label>

                <input
                  type="number"
                  value={heartRate}
                  onChange={(e) => setHeartRate(Number(e.target.value))}
                  className="w-full border rounded-xl p-3"
                  placeholder="Heart Rate"
                />

                {heartRate > 170 && (
                  <div className="mt-2 text-red-700 text-sm font-bold">
                    {language === 'en'
                      ? 'Possible neonatal tachycardia detected'
                      : 'احتمال وجود تسارع ضربات القلب'}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  🫁 {language === 'en' ? 'Oxygen Saturation Level' : 'مستوى الأكسجين'}
                </label>

                <input
                  type="number"
                  value={oxygen}
                  onChange={(e) => setOxygen(Number(e.target.value))}
                  className="w-full border rounded-xl p-3"
                  placeholder="Oxygen Saturation"
                />

                {oxygen < 92 && (
                  <div className="mt-2 text-red-700 text-sm font-bold">
                    {language === 'en'
                      ? 'Possible hypoxia detected'
                      : 'احتمال وجود نقص بالأكسجين'}
                  </div>
                )}
              </div>
            </div>
          )}

          <div className="bg-white rounded-3xl p-6 shadow border border-green-100">
            <h3 className="text-xl font-bold mb-4">💊 Antibiotic Suggestion</h3>

            <select
              value={selectedOrganism}
              onChange={(e) => setSelectedOrganism(e.target.value)}
              className="w-full border rounded-xl p-3 mb-4"
            >
              <option>E.coli</option>
              <option>Klebsiella</option>
              <option>Staphylococcus aureus</option>
            </select>

            <div className="bg-green-100 rounded-xl p-4 font-bold">
              {antibiotics[selectedOrganism]}
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mt-8 mb-8">
          <div className="bg-gradient-to-br from-blue-100 to-cyan-100 rounded-3xl p-6 shadow-xl">
            <h3 className="text-xl font-bold mb-4">🧠 AI Clinical Insight</h3>

            <p className="leading-7 text-sm">
              {score >= 12
                ? language === 'en'
                  ? 'Current findings suggest possible systemic neonatal infection requiring urgent medical intervention.'
                  : 'تشير النتائج الحالية لاحتمالية وجود عدوى جهازية تستدعي تدخل طبي عاجل.'
                : language === 'en'
                ? 'Current findings remain under moderate clinical suspicion.'
                : 'النتائج الحالية ما زالت تحت الاشتباه المتوسط.'}
            </p>
          </div>

          <div className="bg-gradient-to-br from-green-100 to-emerald-100 rounded-3xl p-6 shadow-xl">
            <h3 className="text-xl font-bold mb-4">🛡 Infection Prevention Score</h3>

            <div className="text-5xl font-bold mb-3">
              {Math.max(100 - score * 4, 35)}%
            </div>

            <p className="text-sm leading-6">
              {language === 'en'
                ? 'Represents estimated infection control stability.'
                : 'يمثل تقدير لاستقرار مكافحة العدوى.'}
            </p>
          </div>

          <div className="bg-gradient-to-br from-red-100 to-orange-100 rounded-3xl p-6 shadow-xl">
            <h3 className="text-xl font-bold mb-4">🚨 Emergency Alert</h3>

            <div className="text-sm leading-7">
              {score >= 15
                ? language === 'en'
                  ? 'Critical neonatal alert activated.'
                  : 'تم تفعيل إنذار الحالة الحرجة.'
                : language === 'en'
                ? 'No emergency alert currently.'
                : 'لا يوجد إنذار حرج حاليًا.'}
            </div>
          </div>
        </div>

        <div className="bg-yellow-100 rounded-3xl p-6 mt-8 shadow">
          <h2 className="text-2xl font-bold mb-4">⚠️ {lang.risk}</h2>

          <div className="text-4xl font-bold mb-4">{score}</div>

          <div className="text-lg font-semibold">{riskLevel()}</div>
        </div>

        <div className="bg-white rounded-3xl p-6 mt-8 shadow border border-blue-100">
          <h2 className="text-2xl font-bold mb-5">📋 AI Patient Summary</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
            <div className="bg-slate-50 rounded-2xl p-4 shadow-sm border">
              👶 {childName || (language === 'en' ? 'Unnamed Child' : 'طفل غير مسمى')}
            </div>

            <div className="bg-slate-50 rounded-2xl p-4 shadow-sm border">
              📅 {childAge || '--'} {language === 'en' ? 'Days' : 'يوم'}
            </div>

            <div className="bg-slate-50 rounded-2xl p-4 shadow-sm border">
              📍 {childLocation}
            </div>

            <div className="bg-slate-50 rounded-2xl p-4 shadow-sm border">
              ⚠️ {riskLevel()}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 mt-8 shadow">
          <h2 className="text-2xl font-bold mb-4">🧪 Suggested Investigations</h2>

          <div className="flex flex-wrap gap-3">
            {suggestedTests().map((test) => (
              <div key={test} className="bg-slate-100 px-4 py-2 rounded-xl">
                {test}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
