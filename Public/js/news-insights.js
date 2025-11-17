(function () {
  const modal = document.getElementById('galleryModal');
  const openBtn = document.getElementById('open-gallery-btn');
  const closeBtns = document.querySelectorAll('#close-gallery, #close-gallery-2');
  const imgEl = document.getElementById('gallery-image');
  const captionEl = document.getElementById('gallery-caption');
  const prevBtn = document.getElementById('prev-image');
  const nextBtn = document.getElementById('next-image');
  const images = [
    { src: 'https://placehold.co/1200x800/002868/FFFFFF?text=Gallery+Image+1', caption: 'Phase I: Initial Site Assessment' },
    { src: 'https://placehold.co/1200x800/BF0A30/FFFFFF?text=Gallery+Image+2', caption: 'Active Construction: Drainage Installation' },
    { src: 'https://placehold.co/1200x800/002868/FFFFFF?text=Gallery+Image+3', caption: 'Completion: New Pavement and Markings' }
  ];
  let idx = 0;
  function show(i) { idx = (i + images.length) % images.length; imgEl.src = images[idx].src; captionEl.textContent = images[idx].caption; modal.classList.remove('hidden'); document.body.style.overflow = 'hidden'; }
  function hide() { modal.classList.add('hidden'); document.body.style.overflow = ''; }
  openBtn && openBtn.addEventListener('click', () => show(0));
  closeBtns.forEach(b => b && b.addEventListener('click', hide));
  prevBtn && prevBtn.addEventListener('click', () => show(idx - 1));
  nextBtn && nextBtn.addEventListener('click', () => show(idx + 1));
  document.addEventListener('keydown', (e) => {
    if (!modal || modal.classList.contains('hidden')) return;
    if (e.key === 'Escape') hide();
    if (e.key === 'ArrowLeft') show(idx - 1);
    if (e.key === 'ArrowRight') show(idx + 1);
  });
  // lazy-load images in news section
  document.querySelectorAll('#news-insights img').forEach(img => img.loading || img.setAttribute('loading', 'lazy'));
})();