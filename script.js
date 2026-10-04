const nav = document.querySelector('.nav');
const menuToggle = document.querySelector('.menu-toggle');
menuToggle?.addEventListener('click', () => nav.classList.toggle('open'));
document.querySelectorAll('.nav a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, {threshold:.12});
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

const words = document.querySelectorAll('.word-field span');
document.querySelector('.word-field')?.addEventListener('mousemove', e => {
  const rect = e.currentTarget.getBoundingClientRect();
  const x = (e.clientX - rect.left) / rect.width - .5;
  const y = (e.clientY - rect.top) / rect.height - .5;
  words.forEach((word, i) => {
    const factor = (i % 3 + 1) * 10;
    word.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
  });
});

const dot = document.querySelector('.cursor-dot');
const ring = document.querySelector('.cursor-ring');
if (dot && ring && window.matchMedia('(pointer:fine)').matches) {
  let mx=0,my=0,rx=0,ry=0;
  window.addEventListener('mousemove', e => { mx=e.clientX; my=e.clientY; dot.style.left=mx+'px'; dot.style.top=my+'px'; });
  function animateCursor(){rx += (mx-rx)*.15; ry += (my-ry)*.15; ring.style.left=rx+'px'; ring.style.top=ry+'px'; requestAnimationFrame(animateCursor)}
  animateCursor();
  document.querySelectorAll('a,button,.project,input,textarea').forEach(el => {
    el.addEventListener('mouseenter',()=>ring.classList.add('hover'));
    el.addEventListener('mouseleave',()=>ring.classList.remove('hover'));
  });
}

const projects = {
  '01': ['01 / BRANDING','Identidade que cruza','Uma linguagem visual construída a partir de diferentes pontos de vista. Aqui podes colocar a apresentação completa do projeto, objetivos, processo criativo e resultado final.'],
  '02': ['02 / CAMPANHA','Do conceito à rua','Uma campanha pensada para transformar uma ideia em presença. Acrescenta aqui os detalhes do conceito e das peças desenvolvidas.'],
  '03': ['03 / CONTEÚDO','Histórias em movimento','Conteúdo pensado para encontrar a sua própria voz. Esta área pode apresentar vídeos, fotografias, copy e resultados.'],
  '04': ['04 / REDES SOCIAIS','Comunicar sem ficar parado','Estratégia, imagem e conteúdo no mesmo lugar. Usa este espaço para explicar o projeto e o raciocínio por trás das decisões.']
};
const modal = document.querySelector('.modal');
document.querySelectorAll('.project').forEach(project => {
  project.addEventListener('click', () => {
    const data = projects[project.dataset.project];
    document.querySelector('.modal-number').textContent=data[0];
    document.querySelector('.modal-title').textContent=data[1];
    document.querySelector('.modal-description').textContent=data[2];
    modal.classList.add('open');
    modal.setAttribute('aria-hidden','false');
  });
});
function closeModal(){modal.classList.remove('open');modal.setAttribute('aria-hidden','true')}
document.querySelector('.modal-close')?.addEventListener('click',closeModal);
document.querySelector('.modal-backdrop')?.addEventListener('click',closeModal);
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeModal()});

document.querySelector('.contact-form')?.addEventListener('submit', async e => {
  e.preventDefault();
  const form = e.currentTarget;
  const msg = form.querySelector('.form-message');
  msg.textContent = 'A enviar...';
  try {
    const response = await fetch('https://formspree.io/f/moejablz', {
      method: 'POST',
      body: new FormData(form),
      headers: { Accept: 'application/json' }
    });
    if (response.ok) {
      msg.textContent = 'Mensagem enviada! Obrigada, respondemos em breve.';
      form.reset();
    } else {
      msg.textContent = 'Não foi possível enviar. Tenta novamente.';
    }
  } catch {
    msg.textContent = 'Erro de ligação. Tenta novamente.';
  }
});

document.querySelectorAll('.minute button').forEach(button => {
  button.addEventListener('click', () => {
    alert('Aqui podes ligar cada botão ao PDF ou página correspondente da ata.');
  });
});
