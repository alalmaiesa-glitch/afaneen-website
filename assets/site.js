(()=>{
  const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
  const mobile=$('#mobile-menu'), backdrop=$('#mobile-backdrop');
  function toggleMobile(open){if(!mobile||!backdrop)return; mobile.classList.toggle('open',open);backdrop.classList.toggle('open',open);document.body.style.overflow=open?'hidden':'';if(open)$('#mobile-close')?.focus();}
  $('#mobile-open')?.addEventListener('click',()=>toggleMobile(true));
  $('#mobile-close')?.addEventListener('click',()=>toggleMobile(false));
  backdrop?.addEventListener('click',()=>toggleMobile(false));
  $$('#mobile-menu a').forEach(a=>a.addEventListener('click',()=>toggleMobile(false)));
  $$('.nav-item>button.nav-link').forEach(b=>b.addEventListener('click',()=>{const open=b.getAttribute('aria-expanded')==='true';$$('.nav-item>button.nav-link').forEach(x=>x.setAttribute('aria-expanded','false'));b.setAttribute('aria-expanded',String(!open));}));
  document.addEventListener('click',e=>{if(!e.target.closest('.nav-item'))$$('.nav-item>button.nav-link').forEach(x=>x.setAttribute('aria-expanded','false'));});
  const entries=[
   ['الرئيسية','index.html','الصفحة الرئيسية أفانين'],['من نحن','about.html','نبذة عن الجمعية أفانين'],['نبذة عن الجمعية','about.html#intro','التعريف بالجمعية'],
   ['أفانين بقلم المجلس','about.html#chairwoman-message','الأدب والفن بلسان المجتمع'],
   ['الحوكمة والإفصاح','governance.html','الشفافية واللوائح'],['رقم التسجيل والرقم الوطني','governance.html#identity','البيانات النظامية'],
   ['مجلس الإدارة','governance.html#leadership','التنظيم التنفيذي والجمعية العمومية'],['أدلة الحوكمة','governance.html#guides','اللائحة الأساسية والترخيص'],
   ['لوائح وسياسات الجمعية','governance.html#policies','تضارب المصالح والإبلاغ عن المخالفات'],['القوائم المالية والتقارير السنوية','governance.html#reports','الشفافية المالية'],
   ['تراخيص جمع التبرعات','governance.html#donations','الإفصاح عن التبرعات'],['خدمات الزوار','services.html','الخدمات الإلكترونية'],
   ['فرصي التطوعية','volunteering.html','التطوع والمشاركة'],['برامجي','programs.html#my-programs','برامج الأعضاء'],
   ['البرامج الثقافية والأدبية','programs.html','برامج الجمعية'],['حساب عضو الجمعية العمومية','membership.html','العضوية والجمعية العمومية'],
   ['المركز الإعلامي','media.html','الأخبار والمبادرات والمكتبة'],['الأخبار','media.html#news','الأخبار الرسمية'],
   ['المبادرات','media.html#initiatives','الأنشطة الثقافية'],['مكتبة الصور','media.html#photos','صور الفعاليات'],
   ['مكتبة الفيديو','media.html#videos','الفيديوهات'],['البث المباشر','media.html#live','نقل الفعاليات'],
   ['المسابقات','media.html#contests','الأنشطة والمسابقات'],['شركاء النجاح','partners.html','الشراكات المعتمدة'],
   ['اتصل بنا','contact.html','التواصل والعنوان'],['العنوان','contact.html#address','العنوان الوطني'],
   ['حسابات التواصل الاجتماعي','contact.html#social-media','منصات التواصل الرسمية'],['سياسة الخصوصية','privacy.html','حماية البيانات'],
   ['التوظيف','careers.html','الوظائف الشاغرة']
  ];
  const overlay=$('#search-overlay'),field=$('#search-query'),results=$('#search-results');
  function paint(q=''){
    if(!results)return;const needle=q.trim().toLocaleLowerCase('ar');const found=entries.filter(([t,_,hint])=>(t+' '+hint).toLocaleLowerCase('ar').includes(needle));results.replaceChildren();
    if(!found.length){const p=document.createElement('p');p.textContent='لا توجد نتائج في دليل صفحات الموقع.';results.append(p);return;}
    found.forEach(([t,href,hint])=>{const a=document.createElement('a');a.textContent=t;a.href=href;a.title=hint;a.addEventListener('click',closeSearch);results.append(a);});
  }
  function closeSearch(){overlay?.classList.remove('open');$('#open-search')?.focus();}
  $('#open-search')?.addEventListener('click',()=>{paint();overlay.classList.add('open');field.value='';field.focus();});
  $('#close-search')?.addEventListener('click',closeSearch);
  field?.addEventListener('input',()=>paint(field.value));
  overlay?.addEventListener('click',e=>{if(e.target===overlay)closeSearch();});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'){if(overlay?.classList.contains('open'))closeSearch();toggleMobile(false);$$('.nav-item>button.nav-link').forEach(x=>x.setAttribute('aria-expanded','false'));}});
  let handle;$$('.js-support').forEach(x=>x.addEventListener('click',e=>{e.preventDefault();toggleMobile(false);const el=$('#support-toast');if(!el)return;el.classList.add('open');clearTimeout(handle);handle=setTimeout(()=>el.classList.remove('open'),5000);}));
})();