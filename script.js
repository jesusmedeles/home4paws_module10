// Simple client-side “submission” so it works on GitHub Pages
const qs = (s, root=document) => root.querySelector(s);

function handleContactForm() {
  const form = qs('#contact-form');
  if (!form) return;
  const success = qs('#success');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());

    if(!/^\S+@\S+\.\S+$/.test(data.email)){ alert('Please enter a valid email.'); return; }
    if(!/^\+?[\d\-\s()]{7,}$/.test(data.mobile)){ alert('Please enter a valid mobile number.'); return; }

    const key = 'home4paws-appointments';
    const list = JSON.parse(localStorage.getItem(key) || '[]');
    list.push({...data, createdAt: new Date().toISOString()});
    localStorage.setItem(key, JSON.stringify(list));

    form.reset();
    success.hidden = false;
    success.focus();
  });
}

document.addEventListener('DOMContentLoaded', handleContactForm);
