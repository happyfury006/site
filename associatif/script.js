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

  // ---------- Voyage piloté par le défilement ----------
  // p va de 0 (haut de l'intro) à 1 (fin de l'intro) ; chaque élément évolue sur sa
  // propre tranche de p, comme une suite d'images qu'on fait défiler. La galaxie est la
  // dernière couche de la même scène : elle arrive par transparence, la page ne descend pas.
  const intro = document.querySelector(".intro");
  const etape = (p, debut, fin) => Math.min(1, Math.max(0, (p - debut) / (fin - debut)));

  const mettreAJour = () => {
    const r = intro.getBoundingClientRect();
    const course = r.height - window.innerHeight;
    const p = course > 0 ? Math.min(1, Math.max(0, -r.top / course)) : 1;
    const logo = etape(p, 0.1, 0.27);
    const texte = etape(p, 0.26, 0.8);
    const valeurs = {
      "--indice-o": 1 - etape(p, 0, 0.02),
      "--debut-o": 1 - etape(p, 0.05, 0.1),
      "--logo-o": etape(p, 0.09, 0.11) * (1 - etape(p, 0.24, 0.27)),
      "--logo-s": 2.6 - 2.55 * logo,
      "--texte-o": etape(p, 0.26, 0.28) * (1 - etape(p, 0.78, 0.82)),
      "--texte-y": texte,
      // hyperespace : les traits s'allongent puis s'effacent pendant que la galaxie apparaît
      "--hyper": etape(p, 0.78, 0.9),
      "--hyper-o": etape(p, 0.78, 0.82) * (1 - etape(p, 0.88, 0.95)),
      "--galaxie-o": etape(p, 0.86, 0.94),
      "--galaxie-s": 1.35 - 0.35 * etape(p, 0.86, 0.95),
    };
    for (const [nom, valeur] of Object.entries(valeurs)) intro.style.setProperty(nom, valeur.toFixed(4));
    // les planètes et les lunes ne deviennent cliquables qu'une fois la galaxie arrivée
    intro.classList.toggle("arrivee", p >= 0.9);
  };

  // Les liens « Carte » (#galaxie) mènent au moment où la galaxie est entièrement arrivée
  const allerALaGalaxie = () => {
    const course = intro.offsetHeight - window.innerHeight;
    window.scrollTo(0, intro.offsetTop + 0.96 * course);
  };
  window.addEventListener("hashchange", () => { if (location.hash === "#galaxie") allerALaGalaxie(); });
  document.querySelectorAll('a[href="#galaxie"]').forEach((a) =>
    a.addEventListener("click", () => setTimeout(allerALaGalaxie, 0)));
  if (location.hash === "#galaxie") window.addEventListener("load", allerALaGalaxie);

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
