/* ==========================================================================
   Internet Layers Interactive Depth Explorer
   Surface Web -> Deep Web -> Dark Web -> Mariana Web
   ========================================================================== */

(function () {
  const depthMarkers = document.querySelectorAll('.depth-marker');
  const layerCards = document.querySelectorAll('.layer-display-card');

  if (!depthMarkers.length || !layerCards.length) return;

  function switchLayer(layerId) {
    depthMarkers.forEach(m => {
      if (m.getAttribute('data-layer') === layerId) {
        m.classList.add('active');
      } else {
        m.classList.remove('active');
      }
    });

    layerCards.forEach(c => {
      if (c.id === `layer-${layerId}`) {
        c.classList.add('active');
      } else {
        c.classList.remove('active');
      }
    });

    if (window.cyberAudio) {
      if (layerId === 'mariana') {
        window.cyberAudio.playGlitch();
      } else {
        window.cyberAudio.playBeep(400 + (layerId === 'surface' ? 500 : layerId === 'deep' ? 300 : 150), 0.08);
      }
    }
  }

  depthMarkers.forEach(marker => {
    marker.addEventListener('click', function () {
      const layerId = this.getAttribute('data-layer');
      if (layerId) switchLayer(layerId);
    });
  });
})();

