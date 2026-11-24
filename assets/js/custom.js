(() => {
  let activeModal = null;
  let opener = null;
  function closeModal() {
    if (!activeModal) return;
    activeModal.classList.remove('is-open');
    activeModal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('ra-modal-open');
    activeModal = null;
    opener?.focus();
  }
  document.addEventListener('click', event => {
    const trigger = event.target.closest('.ra-trigger');
    if (trigger) {
      closeModal();
      const modal = document.getElementById(trigger.dataset.raTarget);
      if (!modal) return;
      opener = trigger;
      activeModal = modal;
      modal.classList.add('is-open');
      modal.setAttribute('aria-hidden', 'false');
      document.body.classList.add('ra-modal-open');
      modal.querySelector('[data-ra-close]')?.focus();
    }
    if (event.target.closest('[data-ra-close]')) closeModal();
    const toggle = event.target.closest('#toggleAllBtn');
    if (toggle) {
      const groups = [...document.querySelectorAll('details[data-publications]')];
      const shouldOpen = groups.some(group => !group.open);
      groups.forEach(group => { group.open = shouldOpen; });
      toggle.textContent = shouldOpen ? 'Click to Close All' : 'Click to Open All';
    }
    const cite = event.target.closest('[data-citation]');
    if (cite) {
      const block = document.getElementById(cite.dataset.citation);
      block.hidden = !block.hidden;
      cite.setAttribute('aria-expanded', String(!block.hidden));
    }
  });
  document.addEventListener('keydown', event => {
    if (!activeModal) return;
    if (event.key === 'Escape') closeModal();
    if (event.key === 'Tab') {
      const nodes = [...activeModal.querySelectorAll('button,a[href],[tabindex="0"]')];
      const first = nodes[0], last = nodes[nodes.length - 1];
      if (event.shiftKey && document.activeElement === first) {event.preventDefault();last.focus();}
      else if (!event.shiftKey && document.activeElement === last) {event.preventDefault();first.focus();}
    }
  });
  document.addEventListener('toggle', event => {
    if (!event.target.matches('details[data-publications]')) return;
    const groups = [...document.querySelectorAll('details[data-publications]')];
    const button = document.getElementById('toggleAllBtn');
    if (button) button.textContent = groups.every(group => group.open) ? 'Click to Close All' : 'Click to Open All';
  }, true);
  document.addEventListener('inpagenav:loaded', closeModal);
})();
