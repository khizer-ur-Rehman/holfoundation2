(() => {
  const tabs = [...document.querySelectorAll('[data-career-tab]')];
  const panels = [...document.querySelectorAll('[data-career-panel]')];
  if (!tabs.length || !panels.length) return;

  const activate = (key, focusTab = false) => {
    tabs.forEach(tab => {
      const active = tab.dataset.careerTab === key;
      tab.setAttribute('aria-selected', String(active));
      tab.tabIndex = active ? 0 : -1;
      if (active && focusTab) tab.focus();
    });
    panels.forEach(panel => { panel.hidden = panel.dataset.careerPanel !== key; });
  };

  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => activate(tab.dataset.careerTab));
    tab.addEventListener('keydown', event => {
      let nextIndex = index;
      if (event.key === 'ArrowRight') nextIndex = (index + 1) % tabs.length;
      if (event.key === 'ArrowLeft') nextIndex = (index - 1 + tabs.length) % tabs.length;
      if (event.key === 'Home') nextIndex = 0;
      if (event.key === 'End') nextIndex = tabs.length - 1;
      if (nextIndex !== index) {
        event.preventDefault();
        activate(tabs[nextIndex].dataset.careerTab, true);
      }
    });
  });

  document.querySelectorAll('[data-career-open]').forEach(link => {
    link.addEventListener('click', () => activate(link.dataset.careerOpen));
  });

  document.querySelectorAll('[data-career-form]').forEach(form => {
    form.addEventListener('submit', event => {
      event.preventDefault();
      if (!form.reportValidity()) return;

      const fields = [...form.querySelectorAll('input, select, textarea')]
        .filter(field => field.name && field.value.trim())
        .map(field => {
          const label = form.querySelector('label[for="' + field.id + '"]');
          return (label ? label.textContent.replace('*', '').trim() : field.name) + ': ' + field.value.trim();
        });
      const nameField = form.querySelector('[autocomplete="name"]');
      const subject = encodeURIComponent('HOL Foundation - ' + form.dataset.careerType + ' from ' + (nameField ? nameField.value.trim() : 'applicant'));
      const body = encodeURIComponent(fields.join('\n'));
      const status = form.querySelector('[data-career-status]');
      if (status) status.textContent = 'Your email app will open. Send the prepared message to complete your interest.';
      window.location.href = 'mailto:info@holwelfare.org?subject=' + subject + '&body=' + body;
    });
  });
})();
