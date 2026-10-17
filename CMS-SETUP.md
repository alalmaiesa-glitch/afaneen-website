# إدارة موقع أفانين
التحرير عبر https://app.pagescms.org باستخدام GitHub، مع تثبيت تطبيق Pages CMS على المستودع alalmaiesa-glitch/afaneen-website حصراً. لا ترسل رموز دخول أو كلمات مرور عبر البريد أو الدردشة.

- تعديل البيانات: content/site.json
- وثائق الحوكمة: content/governance.json، وملفات PDF في uploads/governance
- الأخبار: content/news.json
- البرامج والمبادرات: content/programs.json
- الصور: uploads/images

لا يُعرض للزوار أي سجل إلا إذا كان published يساوي true. ملفات PDF تُرفع إلى مستودع عام؛ لا ترفع أي ملف سري أو يتضمن بيانات شخصية غير مصرح بنشرها.
كل عملية حفظ تنشئ إصداراً في GitHub ويتولى Vercel نشر التحديث تلقائياً.
الخطوة المتبقية: صاحب الحساب يثبت تطبيق Pages CMS ويمنحه صلاحية المستودع المحدد، ثم يختبر رفع ملف PDF تجريبي مع إبقائه غير منشور.
