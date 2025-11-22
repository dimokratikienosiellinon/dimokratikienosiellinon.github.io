const form = document.getElementById('registrationForm');

if (form) {
  form.addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.querySelector('input[name="name"]').value.trim();
    const email = document.querySelector('input[name="email"]').value.trim().toLowerCase();
    

    let submittedEmails = JSON.parse(localStorage.getItem('submittedEmails') || '[]');

    if (submittedEmails.includes(email)) {
      alert('Αυτό το email έχει ήδη χρησιμοποιηθεί για εγγραφή.');
      return;
    }

    document.getElementById('entry-name').value = name;
    document.getElementById('entry-email').value = email;
    

    submittedEmails.push(email);
    localStorage.setItem('submittedEmails', JSON.stringify(submittedEmails));

    alert('Ευχαριστούμε πολύ! Θα σας ανακατευθυνθείτε σε μια φόρμα για συμπλήρωση email.');
    setTimeout(() => form.submit(), 100);
  });
}
