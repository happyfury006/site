// Animations de la galaxie associative. Sans ce script, la page reste complète :
// l'introduction s'affiche comme du texte et les astres sont fixes mais cliquables.
(() => {
  // « Réduire les animations » : on laisse la page immobile
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  document.documentElement.classList.add("js");

  // ---------- Orbites ----------
  // La position de chaque astre est recalculée à chaque image (variable --a, utilisée
  // par le CSS avec cos() et sin()). Une animation CSS de rotation ne suffit pas :
  // Safari calcule alors la zone cliquable à la position de départ, et un clic sur
  // une lune en mouvement ne l'atteint pas.
  const corps = [...document.querySelectorAll("[data-periode]")].map((el) => ({
    el,
    periode: Number(el.dataset.periode),
    depart: Number(el.dataset.depart),
  }));
  const origine = performance.now();
  const tourner = (maintenant) => {
    const secondes = (maintenant - origine) / 1000;
    for (const c of corps) c.el.style.setProperty("--a", `${c.depart + (360 * secondes) / c.periode}deg`);
    requestAnimationFrame(tourner);
  };
  requestAnimationFrame(tourner);

  // ---------- Introduction pilotée par le défilement ----------
  // p va de 0 (haut de l'intro) à 1 (fin de l'intro) ; chaque élément évolue sur sa
  // propre tranche de p, comme une suite d'images qu'on fait défiler.
  const intro = document.querySelector(".intro");
  const etape = (p, debut, fin) => Math.min(1, Math.max(0, (p - debut) / (fin - debut)));

  const mettreAJour = () => {
    const r = intro.getBoundingClientRect();
    const course = r.height - window.innerHeight;
    const p = course > 0 ? Math.min(1, Math.max(0, -r.top / course)) : 1;
    const logo = etape(p, 0.14, 0.38);
    const texte = etape(p, 0.36, 0.92);
    const valeurs = {
      "--indice-o": 1 - etape(p, 0, 0.03),
      "--debut-o": 1 - etape(p, 0.08, 0.14),
      "--logo-o": etape(p, 0.12, 0.15) * (1 - etape(p, 0.34, 0.38)),
      "--logo-s": 2.6 - 2.55 * logo,
      "--texte-o": etape(p, 0.36, 0.38) * (1 - etape(p, 0.9, 0.95)),
      "--texte-y": texte,
      "--hyper": etape(p, 0.86, 1),
    };
    for (const [nom, valeur] of Object.entries(valeurs)) intro.style.setProperty(nom, valeur.toFixed(4));
  };

  let enAttente = false;
  const demander = () => {
    if (enAttente) return;
    enAttente = true;
    requestAnimationFrame(() => { enAttente = false; mettreAJour(); });
  };
  window.addEventListener("scroll", demander, { passive: true });
  window.addEventListener("resize", demander);
  mettreAJour();
})();
