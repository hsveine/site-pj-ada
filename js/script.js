
document.addEventListener('DOMContentLoaded', () => {
  const menuBtn = document.querySelector('.menu-btn');
  const nav = document.querySelector('.nav-links');
  if(menuBtn && nav){
    menuBtn.addEventListener('click',()=>nav.classList.toggle('open'));
    nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));
  }

  document.querySelectorAll('.reveal').forEach(el=>{
    const obs=new IntersectionObserver(entries=>{
      entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');obs.unobserve(e.target)}})
    },{threshold:.08});
    obs.observe(el);
  });

  document.querySelectorAll('.faq-q').forEach(btn=>{
    btn.addEventListener('click',()=>{
      const item=btn.closest('.faq-item');
      item.classList.toggle('open');
      const icon=btn.querySelector('.faq-icon');
      if(icon) icon.textContent=item.classList.contains('open')?'−':'+';
    });
  });

  document.querySelectorAll('.tab-btn').forEach(btn=>{
    btn.addEventListener('click',()=>{
      const group=btn.closest('.tabs-wrap') || document;
      group.querySelectorAll('.tab-btn').forEach(b=>b.classList.remove('active'));
      group.querySelectorAll('.tab-panel').forEach(p=>p.classList.remove('active'));
      btn.classList.add('active');
      const target=document.getElementById(btn.dataset.target);
      if(target) target.classList.add('active');
    });
  });

  document.querySelectorAll('.filter-btn').forEach(btn=>{
    btn.addEventListener('click',()=>{
      btn.parentElement.querySelectorAll('.filter-btn').forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      const filter=btn.dataset.filter;
      document.querySelectorAll('[data-category]').forEach(card=>{
        card.style.display=(filter==='todos'||card.dataset.category===filter)?'':'none';
      });
    });
  });

  const modal=document.querySelector('.modal');
  const modalTitle=document.querySelector('[data-modal-title]');
  const modalText=document.querySelector('[data-modal-text]');
  document.querySelectorAll('[data-modal]').forEach(el=>{
    el.addEventListener('click',()=>{
      if(!modal)return;
      modalTitle.textContent=el.dataset.title || 'ADA';
      modalText.textContent=el.dataset.modal || '';
      modal.classList.add('show');
    });
  });
  document.querySelectorAll('.close').forEach(b=>b.addEventListener('click',()=>modal?.classList.remove('show')));
  modal?.addEventListener('click',e=>{if(e.target===modal)modal.classList.remove('show')});

  const form=document.querySelector('#contactForm');
  if(form){
    form.addEventListener('submit',e=>{
      e.preventDefault();
      const nome=form.querySelector('[name="nome"]')?.value.trim();
      const email=form.querySelector('[name="email"]')?.value.trim();
      if(!nome || !email){showToast('Preencha nome e e-mail para continuar.');return}
      form.reset();
      showToast('Mensagem preparada com sucesso! Em uma versão publicada, ela poderá ser enviada ao projeto.');
    });
  }

  document.querySelectorAll('.counter').forEach(el=>{
    const target=Number(el.dataset.target||0), duration=900;
    let start=null;
    const run=(time)=>{
      if(!start)start=time;
      const p=Math.min((time-start)/duration,1);
      el.textContent=Math.floor(p*target);
      if(p<1)requestAnimationFrame(run);
    };
    const obs=new IntersectionObserver(entries=>{
      if(entries[0].isIntersecting){requestAnimationFrame(run);obs.disconnect()}
    });
    obs.observe(el);
  });

  function showToast(msg){
    let t=document.querySelector('.toast');
    if(!t){t=document.createElement('div');t.className='toast';document.body.appendChild(t)}
    t.textContent=msg;t.classList.add('show');
    setTimeout(()=>t.classList.remove('show'),3200);
  }
});
