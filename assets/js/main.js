const root = location.pathname.includes('/programs/') ? '../' : './';
const nav = [['Home','index.html'],['About Us','about.html'],['Our Work','our-work.html'],['Our Journey','our-journey.html'],['News & Stories','news.html'],['Careers','careers.html'],['Publications','publications.html'],['Contact','contact.html']];
const link = (label, href) => `<a href="${root}${href}">${label}</a>`;
const logo = `<img src="${root}assets/images/logo/hol-logo.png" alt="HOL Foundation" width="62" height="62">`;
const footerLogo = '<img src="' + root + 'assets/images/logo/hol-footer-logo.png" alt="HOL Foundation" width="178" height="202">';
const header = `<header class="site-header"><div class="container header-inner"><a class="brand" href="${root}index.html">${logo}</a><nav class="main-navigation" aria-label="Main navigation">${nav.map(([n,h])=>link(n,h)).join('')}</nav><a class="button gold" href="${root}donate.html">Donate Now <span aria-hidden="true">&#8599;</span></a><button class="menu-toggle" aria-label="Open navigation" aria-expanded="false" aria-controls="mobile-nav">&#9776;</button></div><nav id="mobile-nav" class="mobile-panel" aria-label="Mobile navigation">${nav.map(([n,h])=>link(n,h)).join('')}<a class="button gold" href="${root}donate.html">Donate Now</a></nav></header>`;
const footer = '<footer class="site-footer"><div class="container">' +
  '<div class="footer-grid">' +
    '<div class="footer-identity"><a class="footer-brand" href="' + root + 'index.html">' + footerLogo + '</a><p>Learning and opportunity in Lyari.</p><span class="footer-place"><i aria-hidden="true"></i> Lyari, Karachi</span></div>' +
    '<div class="footer-column footer-contact"><h3>Get in touch</h3><address>Lyari, Karachi, Pakistan</address><a class="footer-contact-link" href="tel:+923226300144"><i aria-hidden="true">&#9742;</i><span><small>Call our team</small><strong>+92 322 6300144</strong></span></a><a class="footer-contact-link" href="mailto:info@holwelfare.org"><i aria-hidden="true">&#9993;</i><span><small>Email us</small><strong>info@holwelfare.org</strong></span></a></div>' +
    '<nav class="footer-column footer-explore" aria-label="Explore HOL"><h3>Explore HOL</h3><div class="footer-links">' + link('Home','index.html') + link('About us','about.html') + link('Our work','our-work.html') + link('Donate','donate.html') + '</div></nav>' +
  '</div><div class="footer-bottom"><p class="copyright">&#169; <span data-year></span> HOL Foundation. All rights reserved.</p><span class="footer-bottom-note">Lyari <i></i> Since 2014</span><a href="' + root + 'contact.html" class="footer-home-link">Contact us <span aria-hidden="true">&#8599;</span></a></div>' +
'</div></footer>';document.querySelector('[data-site-header]')?.insertAdjacentHTML('afterbegin', header);
document.querySelector('[data-site-footer]')?.insertAdjacentHTML('afterbegin', footer);
const toggle = document.querySelector('.menu-toggle');
toggle?.addEventListener('click', () => { const panel=document.querySelector('.mobile-panel'); const opened=panel.classList.toggle('open'); toggle.setAttribute('aria-expanded',String(opened)); toggle.setAttribute('aria-label',opened?'Close navigation':'Open navigation'); toggle.textContent=opened?String.fromCharCode(215):String.fromCharCode(9776); });
document.querySelectorAll('form[data-local-form]').forEach(form=>form.addEventListener('submit',event=>{event.preventDefault(); const note=form.querySelector('[data-form-message]'); if(note) note.textContent='Thank you for reaching out. Please email info@holwelfare.org to complete your request.';}));
const impactCounters=[...document.querySelectorAll('[data-counter]')];
const impactSection=document.querySelector('.difference-section');
if(impactCounters.length&&impactSection&&!matchMedia('(prefers-reduced-motion: reduce)').matches){
const animateImpact=()=>{const format=new Intl.NumberFormat('en-US');impactCounters.forEach(counter=>{const value=counter.querySelector('[data-counter-value]');const target=Number(counter.dataset.counter);if(!value||!Number.isFinite(target))return;const start=performance.now();const duration=1700;const tick=now=>{const progress=Math.min((now-start)/duration,1);const eased=1-Math.pow(1-progress,4);value.textContent=format.format(Math.round(target*eased));if(progress<1)requestAnimationFrame(tick);else value.textContent=format.format(target)};requestAnimationFrame(tick)})};
if('IntersectionObserver' in window){const counterObserver=new IntersectionObserver(entries=>{if(entries.some(entry=>entry.isIntersecting)){animateImpact();counterObserver.disconnect()}},{threshold:.35});counterObserver.observe(impactSection)}else animateImpact()
}document.querySelectorAll('[data-year]').forEach(el=>el.textContent=new Date().getFullYear());
document.querySelectorAll('.main-navigation a, .mobile-panel a').forEach(a=>{if(a.href===location.href)a.setAttribute('aria-current','page')});
if('IntersectionObserver' in window){const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target)}}),{threshold:.12});document.querySelectorAll('.section-header,.values-heading,.strive-path,.value-stop,.stat,.program-card,.story-panel,.impact-story-copy,.impact-photo-main,.impact-photo-secondary,.founder-photo,.founder-copy,.info-card,.timeline-item,.cta-donate-copy,.about-story-visual,.about-story-copy,.work-reframe-header,.work-reframe-image,.work-reframe-content,.work-program-list li,.home-story-card,.journey-list,.journey-film,.journey-list li,.about-hero-copy,.about-hero-photo,.about-story-heading,.about-story-copy,.about-purpose-heading,.about-purpose-card,.about-initiatives-heading,.about-initiative-card,.about-founder-topline,.about-founder-copy,.about-founder-photo,.journey-hero-copy,.journey-hero-visual,.journey-section-heading,.journey-milestone,.journey-promise-copy').forEach(el=>{el.classList.add('reveal');observer.observe(el)})}
const heroSlides=[...document.querySelectorAll('.hero-slide')];
if(heroSlides.length>1){let activeSlide=0;let autoplay=null;let paused=false;const dots=[...document.querySelectorAll('[data-slide-index]')];const pause=document.querySelector('[data-slide-toggle]');const showSlide=index=>{activeSlide=(index+heroSlides.length)%heroSlides.length;heroSlides.forEach((slide,i)=>{const active=i===activeSlide;slide.classList.toggle('is-active',active);slide.setAttribute('aria-hidden',String(!active));slide.inert=!active});dots.forEach((dot,i)=>{const active=i===activeSlide;dot.classList.toggle('is-active',active);dot.setAttribute('aria-current',String(active));dot.setAttribute('aria-label','Show slide '+(i+1))})};const startAutoplay=()=>{window.clearInterval(autoplay);if(!paused&&!document.hidden)autoplay=window.setInterval(()=>showSlide(activeSlide+1),5000)};document.querySelector('[data-slide-prev]')?.addEventListener('click',()=>{showSlide(activeSlide-1);startAutoplay()});document.querySelector('[data-slide-next]')?.addEventListener('click',()=>{showSlide(activeSlide+1);startAutoplay()});dots.forEach(dot=>dot.addEventListener('click',()=>{showSlide(Number(dot.dataset.slideIndex));startAutoplay()}));pause?.addEventListener('click',()=>{paused=!paused;pause.textContent=paused?'Play':'Pause';pause.setAttribute('aria-label',paused?'Resume automatic slides':'Pause automatic slides');if(paused)window.clearInterval(autoplay);else startAutoplay()});document.addEventListener('visibilitychange',()=>{if(document.hidden)window.clearInterval(autoplay);else startAutoplay()});showSlide(0);startAutoplay()}

/* Interactive STRIVE values */
const striveValueCopy = {
  strength: {letter:'S',number:'01',name:'Strength',headline:'Build on local strengths.',description:'We grow local strengths into opportunity.'},
  tenacity: {letter:'T',number:'02',name:'Tenacity',headline:'Keep moving forward.',description:'We keep showing up and moving forward.'},
  respect: {letter:'R',number:'03',name:'Respect',headline:'Listen with respect.',description:'We listen, include and learn together.'},
  integrity: {letter:'I',number:'04',name:'Integrity',headline:'Act with integrity.',description:'We act honestly and honor commitments.'},
  vision: {letter:'V',number:'05',name:'Vision',headline:'See what is possible.',description:'We make space for brighter possibilities.'},
  empathy: {letter:'E',number:'06',name:'Empathy',headline:'Lead with empathy.',description:'We listen closely and respond with care.'}
};
const striveButtons = [...document.querySelectorAll('.value-select[data-strive-value]')];
const strivePath = document.querySelector('.strive-path');
const striveDetail = document.querySelector('#strive-detail');
if (striveButtons.length && striveDetail) {
  const detailLetter = striveDetail.querySelector('[data-strive-detail-letter]');
  const detailEyebrow = striveDetail.querySelector('[data-strive-detail-eyebrow]');
  const detailTitle = striveDetail.querySelector('[data-strive-detail-title]');
  const detailDescription = striveDetail.querySelector('[data-strive-detail-description]');
  const setStriveTrack = selectedButton => {
    strivePath?.style.setProperty(
      '--strive-grid-columns',
      striveButtons.map(option => option === selectedButton ? '2.1fr' : '1fr').join(' ')
    );
  };
  const selectStriveValue = button => {
    const value = striveValueCopy[button.dataset.striveValue];
    if (!value || button.getAttribute('aria-pressed') === 'true') return;
    const cardDescription = button.querySelector('[data-strive-card-description]');
    if (cardDescription) cardDescription.textContent = value.description;
    striveButtons.forEach(option => {
      const selected = option === button;
      option.setAttribute('aria-pressed', String(selected));
      option.closest('.value-stop')?.classList.toggle('is-selected', selected);
    });
    setStriveTrack(button);

    detailLetter.textContent = value.letter;
    detailEyebrow.textContent = value.name.toUpperCase();
    detailTitle.textContent = value.headline;
    detailDescription.textContent = value.description;
    if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
      striveDetail.querySelector('.value-detail-copy')?.animate(
        [{opacity:.45,transform:'translateY(7px)'},{opacity:1,transform:'translateY(0)'}],
        {duration:320,easing:'cubic-bezier(.2,.7,.2,1)'}
      );
    }
  };
  striveButtons.forEach(button => {
    button.addEventListener('click', () => selectStriveValue(button));
    button.addEventListener('pointerenter', event => {
      if (event.pointerType !== 'touch') selectStriveValue(button);
    });
    button.addEventListener('focus', () => selectStriveValue(button));
  });
  const initiallySelected = striveButtons.find(button => button.getAttribute('aria-pressed') === 'true') || striveButtons[0];
  if (initiallySelected) setStriveTrack(initiallySelected);
}
const scrollTopButton = document.createElement('button');
scrollTopButton.className = 'scroll-to-top';
scrollTopButton.type = 'button';
scrollTopButton.setAttribute('aria-label', 'Scroll to top');
scrollTopButton.title = 'Back to top';
scrollTopButton.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M12 19V5M6 11l6-6 6 6" /></svg>';
document.body.append(scrollTopButton);
const updateScrollTopButton = () => scrollTopButton.classList.toggle('is-visible', window.scrollY > 360);
window.addEventListener('scroll', updateScrollTopButton, { passive: true });
updateScrollTopButton();
scrollTopButton.addEventListener('click', () => {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' });
});