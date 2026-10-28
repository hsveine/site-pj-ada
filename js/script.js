
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

  const form = document.querySelector('#contactForm');

if (form){
    form.addEventListener('submit', async (e) =>{
        e.preventDefault();
        const nome = form.querySelector('[name="nome"]')?.value.trim();
        const email = form.querySelector('[name="email"]')?.value.trim();
        const assunto = form.querySelector('[name="assunto"]')?.value.trim();
        const vinculo = form.querySelector('#vinculo')?.value;
        const mensagem = form.querySelector('[name="mensagem"]')?.value.trim();

if (!nome || !email || !assunto || !mensagem){
    showToast('Preencha nome, e-mail, assunto e mensagem.');
    return;
}

if (!vinculo){
    showToast('Selecione uma opção no campo "Você é".');
    return;
}
      const botao = form.querySelector('#submit-button');
      const status = form.querySelector('#form-status');
      if (botao){
            botao.disabled = true;
            botao.textContent = 'Enviando...';
      }
        if (status){
            status.textContent = '';
        }
        try{
            const dados = new FormData(form);
            dados.append(
                '_subject',
                `Projeto ADA - ${assunto}`
            );
            dados.append('_replyto', email);
            const resposta = await fetch('https://formsubmit.co/ajax/hellensveine@gmail.com',
              {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json'
                    },
                    body: dados
                }
            );
            const resultado = await resposta.json();
            if (!resposta.ok || resultado.success !== 'true'){
                throw new Error(
                    resultado.message || 'Falha no envio.'
                );
            }
            form.reset();
            if (status) {
                status.textContent ='Mensagem enviada com sucesso! Obrigada pelo contato.';
                status.className = 'success';
            }
            showToast('Mensagem enviada com sucesso!');
        } catch (erro){
            console.error('Erro ao enviar formulário:', erro);
            if (status) {
                status.textContent ='Não foi possível enviar a mensagem. Tente novamente.';
                status.className = 'error';
            }
            showToast('Erro no envio. Tente novamente mais tarde.');
        } finally{
            if (botao){
                botao.disabled = false;
                botao.textContent = 'Enviar mensagem →';
            }
        }
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
