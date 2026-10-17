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
   ['لوائح وسياسات الجمعية','governance.html#policies','تضارب المصالح والإبلاغ عن المخالفات'],['القوائم المالية والتقارير السنوية','governance.html#reports','الشفافية المالية'],['خدمات الزوار','services.html','الخدمات الإلكترونية'],
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

})();

/* Afaneen content delivery: reads published entries from Pages CMS-managed JSON. */
(async () => {
  const get = s => document.querySelector(s);
  async function readJson(name) {
    try {
      const response = await fetch('/content/' + name + '.json', { cache: 'no-cache' });
      if (!response.ok) return null;
      return await response.json();
    } catch { return null; }
  }
  const str = v => typeof v === 'string' ? v.trim() : '';
  const show = v => Array.isArray(v) ? v.filter(x => x && x.published === true) : [];
  const assign = (selector, value) => { const el = get(selector); if (el && str(value)) el.textContent = value; };
  function mediaUrl(raw, dir, ext) {
    const input = str(raw).replace(/^\/+/, '');
    if (!input.startsWith('uploads/' + dir + '/')) return null;
    if (!ext.test(input) || input.includes('..') || input.includes('\\') || input.includes('?') || input.includes('#')) return null;
    try { const u = new URL('/' + input, location.origin); return u.origin === location.origin ? u.pathname : null; }
    catch { return null; }
  }
  function el(tag, cls, text) {
    const node = document.createElement(tag);
    if (cls) node.className = cls;
    if (text !== undefined) node.textContent = String(text);
    return node;
  }
  function article(entry, kind) {
    const card = el('article', 'cms-item cms-' + kind);
    if (kind !== 'document') {
      const img = mediaUrl(entry.image, 'images', /\.(png|jpe?g|webp)$/i);
      if (img) { const pic = el('img', 'cms-thumb'); pic.src=img; pic.alt=str(entry.title); pic.loading='lazy'; card.append(pic); }
    }
    const title = el('h3', null, str(entry.title)); card.append(title);
    if (str(entry.date)) card.append(el('time', 'cms-date', str(entry.date)));
    if (str(entry.summary)) card.append(el('p', 'cms-summary', str(entry.summary)));
    return card;
  }
  const [site, docs, news, programs, gallery] = await Promise.all([
    readJson('site'), readJson('governance'), readJson('news'), readJson('programs'), readJson('gallery')
  ]);
  if (site && typeof site === 'object' && !Array.isArray(site)) {
    assign('.hero-copy > p', site.home_description);
    const intro = get('#intro.about-intro');
    if (intro) {
      const ps = intro.querySelectorAll('p');
      if (ps[0] && str(site.about_paragraph_1)) ps[0].textContent = site.about_paragraph_1;
      if (ps[1] && str(site.about_paragraph_2)) ps[1].textContent = site.about_paragraph_2;
    }
    const prose = get('.council-prose');
    if (prose && str(site.council_body)) {
      const paragraphs = site.council_body.split(/\n\s*\n/).map(str).filter(Boolean);
      if (paragraphs.length) prose.replaceChildren(...paragraphs.map(t => el('p', null, t)));
    }
    assign('.council-signature span', site.council_signer_title);
    assign('.council-signature strong', site.council_signer_name);
    const mail = get('#address a[href^="mailto:"]');
    if (mail && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(str(site.contact_email))) {
      mail.href = 'mailto:' + site.contact_email.trim(); mail.textContent = site.contact_email.trim();
    }
    if (str(site.contact_phone) && get('#address')) {
      let block = get('#cms-phone');
      if (!block) { block = el('div', 'detail'); block.id='cms-phone'; get('#address').append(block); }
      block.replaceChildren(el('strong', null, 'الهاتف'), el('span', null, site.contact_phone));
    }
    const loc = get('#address .detail span');
    if (loc && str(site.contact_address)) loc.textContent = site.contact_address;
    const social = get('#social-media a[href^="https://x.com/"]');
    if (social && /^https:\/\/(?:www\.)?(?:x\.com|twitter\.com)\/[A-Za-z0-9_]{1,15}\/?$/.test(str(site.social_x))) social.href=site.social_x.trim();
  }
  for (const record of show(docs)) {
    const path = mediaUrl(record.document, 'governance', /\.pdf$/i);
    if (!path || !str(record.title)) continue;
    const section = get('#' + ({guides:'guides',policies:'policies',reports:'reports'}[record.category] || ''));
    if (!section) continue;
    let list = section.querySelector('.cms-documents');
    if (!list) { list = el('ul','cms-documents'); section.append(list); }
    const li = el('li', 'cms-document');
    const link = el('a', null, record.title + (str(record.year) ? ' — ' + record.year : ''));
    link.href = path; link.target = '_blank'; link.rel = 'noopener noreferrer'; link.type='application/pdf';
    li.append(link); list.append(li);
  }
  const publishedNews = show(news).filter(x => str(x.title) && str(x.summary)).sort((a,b) => str(b.date).localeCompare(str(a.date), 'en'));
  const newsArea = get('main #news');
  if (newsArea && newsArea.classList.contains('inner-panel') && publishedNews.length) {
    const list = el('div', 'cms-grid');
    publishedNews.forEach(x => list.append(article(x,'news')));
    newsArea.append(list);
  }
  const homeNews = get('section.news');
  if (homeNews) {
    if (!publishedNews.length) homeNews.hidden = true;
    else {
      const lead = publishedNews[0];
      const title = homeNews.querySelector('.featured-story h3');
      if (title) title.textContent = lead.title;
      const date = homeNews.querySelector('.featured-story .date');
      if (date) date.textContent = str(lead.date);
      const list = homeNews.querySelector('.news-list');
      if (list) {
        list.replaceChildren();
        publishedNews.slice(1, 4).forEach(x => {
          const a = el('a','news-row'); a.href='media.html#news';
          a.append(el('time',null,str(x.date)),el('h3',null,x.title),el('span',null,'↗'));
          list.append(a);
        });
      }
    }
  }
  const publishedPrograms = show(programs).filter(x => str(x.title) && str(x.summary));
  for (const [type, id] of [['program','#programs'],['initiative','#initiatives']]) {
    const section = get(id);
    if (!section || !section.classList.contains('inner-panel')) continue;
    const entries = publishedPrograms.filter(x => x.category === type);
    if (!entries.length) continue;
    const list = el('div','cms-grid');
    entries.forEach(x => list.append(article(x, type)));
    section.append(list);
  }
  const photos = get('#photos');
  if (photos && photos.classList.contains('inner-panel')) {
    const entries = show(gallery).filter(x => str(x.title) && mediaUrl(x.image,'images',/\.(png|jpe?g|webp)$/i));
    if (entries.length) {
      const area = el('div','cms-grid cms-gallery');
      entries.forEach(x => {
        const fig = el('figure','cms-photo'); const img = el('img');
        img.src = mediaUrl(x.image,'images',/\.(png|jpe?g|webp)$/i);
        img.alt = x.title; img.loading='lazy';
        fig.append(img,el('figcaption',null,x.title)); area.append(fig);
      });
      photos.append(area);
    }
  }
})();

