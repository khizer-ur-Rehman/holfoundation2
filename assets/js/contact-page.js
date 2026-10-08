const contactForm = document.querySelector('[data-contact-form]');
if (contactForm) {
  const formNote = contactForm.querySelector('[data-contact-form-note]');
  contactForm.addEventListener('submit', event => {
    event.preventDefault();
    if (!contactForm.reportValidity()) return;

    const values = new FormData(contactForm);
    const topic = String(values.get('topic') || 'General inquiry');
    const body = [
      'Name: ' + values.get('name'),
      'Email: ' + values.get('email'),
      'Phone: ' + (values.get('phone') || 'Not provided'),
      'Topic: ' + topic,
      '',
      'Message:',
      String(values.get('message') || '')
    ].join('\n');
    const subject = encodeURIComponent('HOL Foundation enquiry: ' + topic);
    window.location.href = 'mailto:info@holwelfare.org?subject=' + subject + '&body=' + encodeURIComponent(body);
    if (formNote) {
      formNote.classList.remove('is-error');
      formNote.textContent = 'Your email app will open with your message ready to send.';
    }
  });
}
