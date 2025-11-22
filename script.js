/* ===================== script.js ===================== */


// Navigation toggle (hamburger)
(function(){
const btn = document.querySelector('.nav-toggle');
const nav = document.querySelector('.site-nav');
if(!btn || !nav) return;


btn.addEventListener('click', function(){
const expanded = this.getAttribute('aria-expanded') === 'true';
this.setAttribute('aria-expanded', String(!expanded));
nav.classList.toggle('show');
});


// Close nav when clicking outside on mobile
document.addEventListener('click', function(e){
if(!nav.classList.contains('show')) return;
const isClickInside = nav.contains(e.target) || btn.contains(e.target);
if(!isClickInside){
nav.classList.remove('show');
btn.setAttribute('aria-expanded','false');
}
});


// Close nav on link click (helpful on mobile)
nav.querySelectorAll('a').forEach(a=>a.addEventListener('click', ()=>{
if(nav.classList.contains('show')){
nav.classList.remove('show');
btn.setAttribute('aria-expanded','false');
}
const form = document.getElementById('registrationForm');

if (form) {
  form.addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.querySelector('input[name="name"]').value.trim();
    const email = document.querySelector('input[name="email"]').value.trim().toLowerCase();
    const role = document.querySelector('select[name="role"]').value;

    // Fill Google Form hidden fields
    document.getElementById('entry-name').value = name;
    document.getElementById('entry-email').value = email;
    document.getElementById('entry-role').value = role;

    alert('Ευχαριστούμε πολύ! Θα ανακατευθυνθείτε στη φόρμα επιβεβαίωσης email.');

    setTimeout(() => form.submit(), 150);
  });
}
}));
})();