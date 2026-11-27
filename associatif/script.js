// Animations de la galaxie associative. Sans ce script, la page reste complète :
// l'introduction s'affiche comme du texte et les astres sont fixes mais cliquables.
(() => {
  // « Réduire les animations » : on laisse la page immobile
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  document.documentElement.classList.add("js");

  const intro = document.querySelector(".intro");
  const $ = (sel) => intro.querySelector(sel);

  // ---------- Orbites ----------
  // Chaque astre est déplacé par un transform en pixels, recalculé à chaque image : le
  // navigateur n'a ni mise en page ni repeinte à refaire, seulement la composition.
  // Une animation CSS de rotation ne suffit pas : Safari calcule alors la zone cliquable
  // à la position de départ, et un clic sur une lune en mouvement ne l'atteint pas.
  const corps = [...document.querySelectorAll("[data-periode]")].map((el) => ({
    el,
    periode: Number(el.dataset.periode),
    depart: Number(el.dataset.depart),
    rayon: 0,
  }));
  // rayon = moitié de la largeur de l'orbite qui porte l'astre, mesurée une fois puis à chaque redimensionnement
  const mesurer = () => { for (const c of corps) c.rayon = c.el.parentElement.offsetWidth / 2; };
  new ResizeObserver(mesurer).observe(document.querySelector(".systeme-solaire"));
  mesurer();

  const origine = performance.now();
  let galaxieVisible = false;
  const tourner = (maintenant) => {
    // les orbites ne tournent que lorsque la galaxie est à l'écran : pendant le générique,
    // elles ne coûtent rien
    if (galaxieVisible && !document.hidden) {
      const secondes = (maintenant - origine) / 1000;
      for (const c of corps) {
        const a = ((c.depart + (360 * secondes) / c.periode) * Math.PI) / 180;
        c.el.style.transform =
          `translate(-50%, -50%) translate3d(${(c.rayon * Math.cos(a)).toFixed(2)}px, ${(c.rayon * Math.sin(a)).toFixed(2)}px, 0)`;
      }
    }
    requestAnimationFrame(tourner);
  };
  requestAnimationFrame(tourner);

  // ---------- Voyage piloté par le défilement ----------
  // p va de 0 (haut de l'intro) à 1 (fin de l'intro) ; chaque élément évolue sur sa
  // propre tranche de p, comme une suite d'images qu'on fait défiler. La galaxie est la
  // dernière couche de la même scène : elle arrive par transparence, la page ne descend pas.
  //
  // Fluidité : la molette avance par crans, ce qui donnait une animation saccadée. La
  // progression affichée (affiche) rejoint donc la progression réelle (cible) en douceur,
  // image par image. Et chaque valeur n'est posée que sur l'élément qui l'utilise, et
  // seulement si elle a changé, pour ne pas recalculer les styles de toute la scène.
  const etape = (p, debut, fin) => Math.min(1, Math.max(0, (p - debut) / (fin - debut)));
  const couches = {
    indice: $(".indice"),
    debut: $(".intro-debut"),
    logo: $(".intro-logo"),
    texte: $(".defilement-texte"),
    hyper: $(".hyperespace"),
    galaxie: $(".couche-galaxie"),
  };
  const dernieres = new Map();
  const poser = (el, nom, valeur) => {
    const v = valeur.toFixed(4);
    if (dernieres.get(nom) === v) return;
    dernieres.set(nom, v);
    el.style.setProperty(nom, v);
  };

  const dessiner = (p) => {
    poser(couches.indice, "--indice-o", 1 - etape(p, 0, 0.02));
    poser(couches.debut, "--debut-o", 1 - etape(p, 0.05, 0.1));
    poser(couches.logo, "--logo-o", etape(p, 0.09, 0.11) * (1 - etape(p, 0.24, 0.27)));
    poser(couches.logo, "--logo-s", 2.6 - 2.55 * etape(p, 0.1, 0.27));
    poser(couches.texte, "--texte-o", etape(p, 0.26, 0.28) * (1 - etape(p, 0.78, 0.82)));
    poser(couches.texte, "--texte-y", etape(p, 0.26, 0.8));
    // hyperespace : les traits s'allongent puis s'effacent pendant que la galaxie apparaît
    poser(couches.hyper, "--hyper", etape(p, 0.78, 0.9));
    poser(couches.hyper, "--hyper-o", etape(p, 0.78, 0.82) * (1 - etape(p, 0.88, 0.95)));
    const galaxie = etape(p, 0.86, 0.94);
    poser(couches.galaxie, "--galaxie-o", galaxie);
    poser(couches.galaxie, "--galaxie-s", 1.35 - 0.35 * etape(p, 0.86, 0.95));
    galaxieVisible = galaxie > 0;
    couches.galaxie.classList.toggle("cachee", !galaxieVisible);
    // les planètes et les lunes ne deviennent cliquables qu'une fois la galaxie arrivée
    intro.classList.toggle("arrivee", p >= 0.9);
  };

  const progression = () => {
    const r = intro.getBoundingClientRect();
    const course = r.height - window.innerHeight;
    return course > 0 ? Math.min(1, Math.max(0, -r.top / course)) : 1;
  };

  let cible = progression();
  let affiche = cible;
  let precedent = 0;
  let enCours = false;
  const DOUCEUR = 0.09;  // en secondes : plus c'est grand, plus l'animation « glisse »

  const animer = (maintenant) => {
    const dt = precedent ? Math.min(0.1, (maintenant - precedent) / 1000) : 1 / 60;
    precedent = maintenant;
    affiche += (cible - affiche) * (1 - Math.exp(-dt / DOUCEUR));
    if (Math.abs(cible - affiche) < 0.0002) affiche = cible;
    dessiner(affiche);
    if (affiche !== cible) requestAnimationFrame(animer);
    else { enCours = false; precedent = 0; }
  };
  const suivre = () => {
    cible = progression();
    if (!enCours) { enCours = true; requestAnimationFrame(animer); }
  };
  // saut direct (lien « Carte », chargement sur #galaxie) : pas de glissement à travers tout le générique
  const sauter = () => { cible = affiche = progression(); dessiner(affiche); };

  // Les liens « Carte » (#galaxie) mènent au moment où la galaxie est entièrement arrivée
  const allerALaGalaxie = () => {
    const course = intro.offsetHeight - window.innerHeight;
    window.scrollTo({ top: intro.offsetTop + 0.96 * course, behavior: "instant" });
    sauter();
  };
  window.addEventListener("hashchange", () => { if (location.hash === "#galaxie") allerALaGalaxie(); });
  document.querySelectorAll('a[href="#galaxie"]').forEach((a) =>
    a.addEventListener("click", () => setTimeout(allerALaGalaxie, 0)));
  if (location.hash === "#galaxie") window.addEventListener("load", allerALaGalaxie);

  window.addEventListener("scroll", suivre, { passive: true });
  window.addEventListener("resize", sauter);
  sauter();
})();
