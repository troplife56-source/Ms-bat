// =========================================
// MS Bat – interactions du site
// =========================================

// Menu burger (mobile)
const burger = document.getElementById('burger');
const nav = document.getElementById('nav');

if (burger && nav) {
  burger.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    burger.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', open);
  });

  // Ferme le menu après un clic sur un lien
  nav.querySelectorAll('a').forEach(link =>
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      burger.classList.remove('open');
      burger.setAttribute('aria-expanded', false);
    })
  );
}

// Ombre sous l'en-tête au défilement
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  if (header) header.classList.toggle('scrolled', window.scrollY > 10);
});

// Apparition des blocs au défilement
const items = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  items.forEach(el => observer.observe(el));
} else {
  items.forEach(el => el.classList.add('visible'));
}

// Année automatique dans le pied de page
const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

// Vérification du formulaire avant envoi
const form = document.getElementById('form');
const formError = document.getElementById('formError');

if (form) {
  form.addEventListener('submit', e => {
    let valid = true;
    form.querySelectorAll('[required]').forEach(field => {
      const empty = !field.value.trim();
      field.classList.toggle('invalid', empty);
      if (empty) valid = false;
    });

    const tel = form.querySelector('[name="telephone"]');
    const telOk = /^(\+33|0)[1-9](\s?\d{2}){4}$/.test(tel.value.replace(/[.\-]/g, ' ').trim());
    if (tel.value && !telOk) {
      tel.classList.add('invalid');
      valid = false;
    }

    const email = form.querySelector('[name="email"]');
    if (email.value && !email.checkValidity()) {
      email.classList.add('invalid');
      valid = false;
    }

    if (!valid) {
      e.preventDefault();
      formError.textContent = 'Merci de remplir correctement les champs en rouge.';
    } else {
      formError.textContent = '';
    }
  });

  form.querySelectorAll('input, select, textarea').forEach(field =>
    field.addEventListener('input', () => field.classList.remove('invalid'))
  );
}
