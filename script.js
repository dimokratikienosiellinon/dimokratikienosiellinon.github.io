(function(){
  const formLoadTime = Date.now();
  const btn = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.site-nav');
  if(!btn || !nav) return;

  // Toggle nav
  btn.addEventListener('click', function(){
    const expanded = this.getAttribute('aria-expanded') === 'true';
    this.setAttribute('aria-expanded', String(!expanded));
    nav.classList.toggle('show');
  });

  // Close nav when clicking outside
  document.addEventListener('click', function(e){
    if(!nav.classList.contains('show')) return;
    const isClickInside = nav.contains(e.target) || btn.contains(e.target);
    if(!isClickInside){
      nav.classList.remove('show');
      btn.setAttribute('aria-expanded','false');
    }
  });

  // Close nav on link click
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    nav.classList.remove('show');
    btn.setAttribute('aria-expanded','false');
  }));

  // Form listener
  const form = document.getElementById('registrationForm');
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      // 🛡️ Honeypot check
      const honeypot = document.getElementById('website').value;
      if (honeypot) {
        console.warn('Bot detected');
        return;
      }

      // 🛡️ Χρονικός έλεγχος (3 δευτερόλεπτα)
      if (Date.now() - formLoadTime < 3000) {
        alert('Παρακαλώ συμπληρώστε τη φόρμα κανονικά.');
        return;
      }

      const name = document.querySelector('input[name="name"]').value.trim();
      const email = document.querySelector('input[name="email"]').value.trim().toLowerCase();
      const role = document.querySelector('select[name="role"]').value;

      const key = `email_attempt_${email}`;
      const lockKey = `email_lock_${email}`;
      const now = Date.now();

      // Έλεγχος αν είναι κλειδωμένο για 5 λεπτά
      const lockedUntil = localStorage.getItem(lockKey);
      if (lockedUntil && now < lockedUntil) {
        alert('Το email υπάρχει ήδη. Παρακαλώ προσπαθήστε ξανά μετά από 5 λεπτά.');
        return;
      }

      // Μετρητής προσπαθειών
      let attempts = parseInt(localStorage.getItem(key)) || 0;
      attempts++;
      localStorage.setItem(key, attempts);

      // Αν φτάσει 3 φορές
      if (attempts >= 3) {
        localStorage.setItem(lockKey, now + 5 * 60 * 1000); // 5 λεπτά
        localStorage.removeItem(key); // reset counter
        alert('Το email υπάρχει ήδη. Παρακαλώ προσπαθήστε ξανά μετά από 5 λεπτά.');
        return;
      }

      // Συμπλήρωση hidden πεδίων
      document.getElementById('entry-name').value = name;
      document.getElementById('entry-email').value = email;
      document.getElementById('entry-role').value = role;

      alert('Ευχαριστούμε πολύ! Θα ανακατευθυνθείτε στη φόρμα επιβεβαίωσης email.');
      setTimeout(() => form.submit(), 150);
    });
}
})();
