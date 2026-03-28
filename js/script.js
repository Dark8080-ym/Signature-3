(function(){
  const header = document.querySelector('.site-header');
  const navToggle = document.querySelector('.nav-toggle');
  const siteNav = document.querySelector('.site-nav');

  function setHeaderState(){
    if(header){
      header.classList.toggle('scrolled', window.scrollY > 20);
    }
  }
  setHeaderState();
  window.addEventListener('scroll', setHeaderState, {passive:true});

  if(navToggle && siteNav){
    navToggle.addEventListener('click', function(){
      const open = siteNav.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      navToggle.textContent = open ? '✕' : '☰';
    });

    siteNav.querySelectorAll('a').forEach((link)=>{
      link.addEventListener('click', ()=>{
        siteNav.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.textContent = '☰';
      });
    });

    document.addEventListener('click', (event)=>{
      const clickedInside = header && header.contains(event.target);
      if(!clickedInside){
        siteNav.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.textContent = '☰';
      }
    });
  }

  const reveals = document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window){
    const observer = new IntersectionObserver((entries)=>{
      entries.forEach((entry)=>{
        if(entry.isIntersecting){
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {threshold:0.14});
    reveals.forEach((el)=>observer.observe(el));
  } else {
    reveals.forEach((el)=>el.classList.add('visible'));
  }

  const form = document.querySelector('.contact-form');
  if(form){
    form.addEventListener('submit', function(event){
      event.preventDefault();
      if(!form.reportValidity()) return;
      const success = form.querySelector('.form-success');
      if(success){
        success.style.display = 'block';
        success.textContent = 'Message sent successfully. A coach will reach out within 24 business hours.';
        success.scrollIntoView({behavior:'smooth', block:'nearest'});
      }
      form.reset();
    });
  }

  const year = document.querySelector('.year');
  if(year){
    year.textContent = new Date().getFullYear();
  }
})();
