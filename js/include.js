document.addEventListener('DOMContentLoaded', async () => {
  const includes = document.querySelectorAll('[data-include]');
  for (const el of includes) {
    const name = el.dataset.include;
    try {
      const res = await fetch(`includes/${name}.html`);
      if (!res.ok) throw new Error(res.statusText);
      el.innerHTML = await res.text();
    } catch (err) {
      console.error('Include load failed:', name, err);
    }
  }
  // Notify other scripts that includes are injected
  document.dispatchEvent(new Event('includesLoaded'));
});