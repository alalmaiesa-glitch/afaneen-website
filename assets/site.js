
(()=>{
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];const mobile=$('#mobile-menu'),backdrop=$('#mobile-backdrop');function toggleMobile(open){mobile.classList.toggle('open',open);backdrop.classList.toggle('open',open);document.body.style.overflow=open?'hidden':'';if(open)$('#mobile-close').focus()};$('#mobile-open').addEventListener('click',()=>toggleMobile(true));$('#mobile-close').addEventListener('click',()=>toggleMobile(false));backdrop.addEventListener('click',()=>toggleMobile(false));$$('#mobile-menu a').forEach(a=>a.addEventListener('click',()=>toggleMobile(false)));
$$('.nav-item>button.nav-link').forEach(b=>{b.addEventListener('click',()=>{let open=b.getAttribute('aria-expanded')==='true';$$('.nav-item>button.nav-link').forEach(x=>x.setAttribute('aria-expanded','false'));b.setAttribute('aria-expanded',String(!open))})});document.addEventListener('click',e=>{if(!e.target.closest('.nav-item'))$$('.nav-item>button.nav-link').forEach(x=>x.setAttribute('aria-expanded','false'))});
const entries=[['الرئيسية','index.html#top'],['نبذة عنا','index.html#about'],['أدلة الحوكمة','#pending-section'],['لوائح وسياسات الجمعية','#pending-section'],['التقارير السنوية','#pending-section'],['فرصي التطوعية','#pending-section'],['برامجي','#pending-section'],['حساب عضو الجمعية العمومية','#pending-section'],['الأخبار','index.html#news'],['المبادرات','#pending-section'],['مكتبة الصور','#pending-section'],['مكتبة الفيديو','#pending-section'],['البث المباشر','#pending-section'],['المسابقات','#pending-section'],['شركاء النجاح','#pending-section'],['اتصل بنا','contact.html'],['العنوان','contact.html#address'],['حسابات التواصل الاجتماعي','contact.html#social-media'],['الخصوصية','privacy.html'],['التوظيف','careers.html']];
const overlay=$('#search-overlay'),field=$('#search-query'),results=$('#search-results');function paint(q=''){const filtered=entries.filter(([t])=>t.includes(q.trim()));results.replaceChildren();if(!filtered.length){const p=document.createElement('p');p.textContent='لا توجد نتائج مطابقة في أقسام الموقع.';results.append(p);return}filtered.forEach(([t,href])=>{let a=document.createElement('a');a.textContent=t;a.href=href;a.addEventListener('click',()=>overlay.classList.remove('open'));results.append(a)})};$('#open-search').addEventListener('click',()=>{paint();overlay.classList.add('open');field.value='';field.focus()});$('#close-search').addEventListener('click',()=>overlay.classList.remove('open'));field.addEventListener('input',()=>paint(field.value));overlay.addEventListener('click',e=>{if(e.target===overlay)overlay.classList.remove('open')});document.addEventListener('keydown',e=>{if(e.key==='Escape'){overlay.classList.remove('open');toggleMobile(false);$$('.nav-item>button.nav-link').forEach(x=>x.setAttribute('aria-expanded','false'))}});
let handle;$$('.js-support').forEach(x=>x.addEventListener('click',e=>{e.preventDefault();const el=$('#support-toast');el.classList.add('open');clearTimeout(handle);handle=setTimeout(()=>el.classList.remove('open'),5000)}));
})();



(function(){
let pendingTimer;
document.addEventListener('click',function(event){
 const link=event.target.closest('a[href="#pending-section"]');
 if(!link)return;
 event.preventDefault();
 const toast=document.getElementById('pending-toast');
 toast.style.display='block';
 clearTimeout(pendingTimer);
 pendingTimer=setTimeout(()=>{toast.style.display='none'},4300);
});
})();