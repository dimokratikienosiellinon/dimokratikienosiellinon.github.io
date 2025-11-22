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
