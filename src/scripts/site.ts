export {};
const doc = document;
doc.documentElement.classList.add("js-enabled");
const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

type WordLocation = { node: Text; start: number; end: number };

function preventTextWidows() {
  const selector =
    ".site main :is(h1, h2, h3, h4, h5, h6, p, figcaption, blockquote, summary, li)";

  doc.querySelectorAll<HTMLElement>(selector).forEach((element) => {
    if (
      element.matches("li") &&
      element.querySelector("p,h1,h2,h3,h4,h5,h6,ul,ol")
    )
      return;

    const textNodes: Text[] = [];
    const words: WordLocation[] = [];
    const walker = doc.createTreeWalker(element, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        const parent = node.parentElement;
        if (!parent || parent.closest("script,style,pre,code,[hidden]"))
          return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      },
    });

    let current: Node | null;
    while ((current = walker.nextNode())) {
      const textNode = current as Text;
      textNodes.push(textNode);
      for (const match of textNode.data.matchAll(
        /[\p{L}\p{N}][\p{L}\p{N}’'&.-]*/gu,
      )) {
        words.push({
          node: textNode,
          start: match.index,
          end: match.index + match[0].length,
        });
      }
    }

    if (words.length < 4) return;
    const previous = words.at(-2)!;
    const last = words.at(-1)!;
    const between = doc.createRange();
    between.setStart(previous.node, previous.end);
    between.setEnd(last.node, last.start);
    if (between.cloneContents().querySelector?.("br")) return;

    const previousWord = previous.node.data.slice(previous.start, previous.end);
    if (previousWord.includes("-")) {
      previous.node.data =
        previous.node.data.slice(0, previous.start) +
        previousWord.replaceAll("-", "\u2011") +
        previous.node.data.slice(previous.end);
    }

    if (previous.node === last.node) {
      const separator = previous.node.data.slice(previous.end, last.start);
      if (!/\s/.test(separator)) return;
      previous.node.data =
        previous.node.data.slice(0, previous.end) +
        "\u00a0" +
        previous.node.data.slice(last.start);
      return;
    }

    const firstIndex = textNodes.indexOf(previous.node);
    const lastIndex = textNodes.indexOf(last.node);
    let separatorLocked = false;
    for (let index = lastIndex; index >= firstIndex; index--) {
      const node = textNodes[index];
      const start = node === previous.node ? previous.end : 0;
      const end = node === last.node ? last.start : node.data.length;
      const separator = node.data.slice(start, end);
      if (!/\s/.test(separator)) continue;
      node.data =
        node.data.slice(0, start) +
        (separatorLocked ? "" : "\u00a0") +
        node.data.slice(end);
      separatorLocked = true;
    }
  });
}

preventTextWidows();

function prepareAiImageDisclosures() {
  doc
    .querySelectorAll<HTMLElement>("figure > figcaption")
    .forEach((caption) => {
      if (!/\bAI[- ]generated\b/i.test(caption.textContent ?? "")) return;

      const figure = caption.parentElement as HTMLElement;
      const linkedFigure = figure.closest<HTMLAnchorElement>("a[href]");
      const trigger = linkedFigure ?? figure;

      figure.classList.add("ai-image-disclosure");
      caption.classList.add("ai-disclosure");
      trigger.classList.add("ai-disclosure-trigger");

      if (!linkedFigure && !figure.hasAttribute("tabindex")) {
        figure.tabIndex = 0;
      }
    });
}

prepareAiImageDisclosures();

if (!reduced) {
  doc.documentElement.classList.add("js-motion");
  const observer = new IntersectionObserver(
    (entries) =>
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const element = entry.target as HTMLElement;
          const sequenceDelay = element.dataset.motionDelay
            ? Number(element.dataset.motionDelay)
            : element.dataset.id
              ? (Number(element.dataset.id) - 1) * 400
              : 0;
          const extraDelay = element.classList.contains("delay-250")
            ? 250
            : element.classList.contains("delay-500")
              ? 500
              : 0;
          element.style.transitionDelay = `${sequenceDelay + extraDelay}ms`;
          element.classList.add("is-visible");
          observer.unobserve(element);
        }
      }),
    { threshold: 0.08 },
  );
  doc.querySelectorAll(".animated,.entry-content > *").forEach((element) => {
    if (!element.classList.contains("animated"))
      element.classList.add("reveal-item");
    observer.observe(element);
  });

  const servicePage = doc.querySelector<HTMLElement>(".services-page");
  if (servicePage) {
    servicePage.classList.add("services-motion");

    const registerReveal = (
      selector: string,
      options: { delayStep?: number; image?: boolean } = {},
    ) => {
      servicePage
        .querySelectorAll<HTMLElement>(selector)
        .forEach((element, index) => {
          element.classList.add("services-reveal");
          if (options.image) element.classList.add("services-reveal--image");
          if (options.delayStep)
            element.dataset.motionDelay = String(
              Math.min(index * options.delayStep, 240),
            );
          observer.observe(element);
        });
    };

    registerReveal(
      ".services-intro .services-eyebrow, .services-intro__grid > h1, .services-intro__copy > *, .legacy-hero__copy > *",
      { delayStep: 70 },
    );
    registerReveal(".legacy-hero__image", { image: true });
    registerReveal(".services-jump", { delayStep: 60 });
    registerReveal(
      ".services-offering, .legacy-focus__intro, .legacy-focus__list, .services-section-heading, .legacy-approach__heading, .services-process, .legacy-steps, .services-questions > :first-child, .services-faq, .services-closing__grid",
    );
    registerReveal(
      ".service-case-study__heading, .service-case-study .case-study-card",
      { delayStep: 90 },
    );
    registerReveal(".services-offering__photo", { image: true });
  }
}
const navigationElement = doc.querySelector("#site-navigation");
const toggle = navigationElement?.querySelector("button");
toggle?.addEventListener("click", () => {
  const open = navigationElement!.classList.toggle("is-open");
  toggle.setAttribute("aria-expanded", String(open));
});
doc.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && navigationElement?.classList.contains("is-open")) {
    navigationElement.classList.remove("is-open");
    toggle?.setAttribute("aria-expanded", "false");
    toggle?.focus();
  }
});
const modal = doc.querySelector<HTMLElement>("#verity-project-modal")!;
const dialog = modal.querySelector<HTMLElement>("[role=dialog]")!;
let lastFocus: HTMLElement | null = null;
function closeModal() {
  modal.hidden = true;
  doc.body.classList.remove("verity-project-modal-open");
  lastFocus?.focus();
}
doc.addEventListener("click", (event) => {
  const target = event.target as HTMLElement;
  const link = target.closest("a");
  if (
    link &&
    (link.classList.contains("js-verity-project-modal") ||
      link.textContent
        ?.trim()
        .replace(/\s+/g, " ")
        .replace(/→/g, "")
        .trim()
        .toLowerCase() === "start your project")
  ) {
    event.preventDefault();
    lastFocus = link;
    modal.hidden = false;
    doc.body.classList.add("verity-project-modal-open");
    dialog.focus();
  } else if (target.closest("[data-verity-modal-close]")) closeModal();
});
doc.addEventListener("keydown", (event) => {
  if (modal.hidden) return;
  if (event.key === "Escape") closeModal();
  if (event.key === "Tab") {
    const items = Array.from(
      dialog.querySelectorAll<HTMLElement>(
        'a,button,input:not([type=hidden]),select,textarea,[tabindex="0"]',
      ),
    ).filter((e) => e.getClientRects().length && e.tabIndex >= 0);
    const first = items[0],
      last = items.at(-1);
    if (
      event.shiftKey &&
      (doc.activeElement === first || doc.activeElement === dialog)
    ) {
      event.preventDefault();
      last?.focus();
    } else if (!event.shiftKey && doc.activeElement === last) {
      event.preventDefault();
      first?.focus();
    }
  }
});
doc
  .querySelectorAll<HTMLElement>("[data-gallery-controls]")
  .forEach((controls) => {
    const gallery = controls.nextElementSibling;
    if (!gallery) return;
    controls.addEventListener("click", (event) => {
      const button = (event.target as HTMLElement).closest<HTMLButtonElement>(
        "button",
      );
      if (!button) return;
      let primary =
        controls.querySelector<HTMLElement>("[data-primary-filter].is-active")
          ?.dataset.primaryFilter || "all";
      let secondary = "all";
      if (button.hasAttribute("data-primary-filter")) {
        primary = button.dataset.primaryFilter!;
        controls
          .querySelectorAll<HTMLElement>("[data-primary-filter]")
          .forEach((b) => {
            b.classList.toggle("is-active", b === button);
            b.setAttribute("aria-pressed", String(b === button));
          });
        controls
          .querySelectorAll<HTMLElement>("[data-subfilters]")
          .forEach((group) => {
            group.hidden = group.dataset.subfilters !== primary;
            group.querySelectorAll("button").forEach((b, i) => {
              b.classList.toggle("is-active", i === 0);
              b.setAttribute("aria-pressed", String(i === 0));
            });
          });
      } else {
        secondary = button.dataset.secondaryFilter || "all";
        button
          .closest("[data-subfilters]")
          ?.querySelectorAll("button")
          .forEach((b) => {
            b.classList.toggle("is-active", b === button);
            b.setAttribute("aria-pressed", String(b === button));
          });
      }
      let count = 0;
      gallery
        .querySelectorAll<HTMLElement>(".vbg-gallery-item")
        .forEach((item) => {
          const categories = (item.dataset.category || "").split(/\s+/);
          item.hidden = !(
            (primary === "all" || categories.includes(primary)) &&
            (secondary === "all" || categories.includes(secondary))
          );
          if (!item.hidden) count++;
        });
      let empty = gallery.querySelector<HTMLElement>(".vbg-gallery-empty");
      if (!empty) {
        empty = doc.createElement("p");
        empty.className = "vbg-gallery-empty";
        empty.textContent = "More images in this category are coming soon.";
        gallery.append(empty);
      }
      empty.hidden = count > 0;
    });
  });
doc.querySelectorAll<HTMLElement>(".work-gallery").forEach((gallery) => {
  const track = gallery.querySelector<HTMLElement>(".swiper-wrapper");
  gallery
    .querySelectorAll<HTMLElement>(".swiper-button-prev,.swiper-button-next")
    .forEach((button) => {
      button.setAttribute("role", "button");
      button.tabIndex = 0;
      button.setAttribute(
        "aria-label",
        button.classList.contains("swiper-button-next")
          ? "Next images"
          : "Previous images",
      );
      const advance = () => {
        if (!track) return;
        const slide = track.querySelector<HTMLElement>(".swiper-slide");
        const distance =
          (slide?.getBoundingClientRect().width || 0) +
          (Number.parseFloat(getComputedStyle(track).columnGap) || 0);
        track.scrollBy({
          left:
            distance *
            (button.classList.contains("swiper-button-next") ? 1 : -1),
          behavior: reduced ? "instant" : "smooth",
        });
      };
      button.addEventListener("click", advance);
      button.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          advance();
        }
      });
    });
});

const lightbox = doc.querySelector<HTMLDialogElement>(
  "[data-case-study-lightbox]",
);
const caseStudyFigures = Array.from(
  doc.querySelectorAll<HTMLElement>(".vbg-case-study figure"),
).filter((figure) => figure.querySelector(":scope > img"));

if (lightbox && caseStudyFigures.length) {
  const galleryDialog = lightbox;
  const viewerImage = galleryDialog.querySelector<HTMLImageElement>(
    "[data-lightbox-image]",
  )!;
  const caption = galleryDialog.querySelector<HTMLElement>(
    "[data-lightbox-caption]",
  )!;
  const previous = galleryDialog.querySelector<HTMLButtonElement>(
    "[data-lightbox-previous]",
  )!;
  const next = galleryDialog.querySelector<HTMLButtonElement>(
    "[data-lightbox-next]",
  )!;
  const close = galleryDialog.querySelector<HTMLButtonElement>(
    "[data-lightbox-close]",
  )!;
  const triggers: HTMLButtonElement[] = [];
  let current = 0;
  let lastLightboxFocus: HTMLButtonElement | null = null;
  let pointerStartX: number | null = null;

  function preload(index: number) {
    const source = caseStudyFigures[index]?.querySelector<HTMLImageElement>(
      ":scope > button > img",
    )?.currentSrc;
    if (source) new Image().src = source;
  }

  function show(index: number) {
    current = (index + caseStudyFigures.length) % caseStudyFigures.length;
    const source = caseStudyFigures[current].querySelector<HTMLImageElement>(
      ":scope > button > img",
    )!;
    viewerImage.src = source.currentSrc || source.src;
    viewerImage.alt = source.alt;
    caption.textContent = `Photo ${current + 1} of ${caseStudyFigures.length} — ${source.alt}`;
    preload((current + 1) % caseStudyFigures.length);
    preload((current - 1 + caseStudyFigures.length) % caseStudyFigures.length);
  }

  function open(index: number) {
    lastLightboxFocus = triggers[index];
    show(index);
    galleryDialog.showModal();
    doc.body.classList.add("case-study-lightbox-open");
    close.focus();
  }

  function closeLightbox() {
    const restoreFocus = lastLightboxFocus;
    galleryDialog.close();
    doc.body.classList.remove("case-study-lightbox-open");
    restoreFocus?.focus();
  }

  caseStudyFigures.forEach((figure, index) => {
    const image = figure.querySelector<HTMLImageElement>(":scope > img")!;
    const trigger = doc.createElement("button");
    trigger.type = "button";
    trigger.className = "case-study-photo-trigger";
    trigger.setAttribute(
      "aria-label",
      `Open photo ${index + 1} of ${caseStudyFigures.length}: ${image.alt}`,
    );
    image.before(trigger);
    trigger.append(image);
    figure.classList.add("case-study-photo");
    trigger.addEventListener("click", () => open(index));
    triggers.push(trigger);
  });

  previous.addEventListener("click", () => show(current - 1));
  next.addEventListener("click", () => show(current + 1));
  close.addEventListener("click", closeLightbox);
  galleryDialog.addEventListener("click", (event) => {
    if (event.target === galleryDialog) closeLightbox();
  });
  galleryDialog.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      show(current - 1);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      show(current + 1);
    } else if (event.key === "Home") {
      event.preventDefault();
      show(0);
    } else if (event.key === "End") {
      event.preventDefault();
      show(caseStudyFigures.length - 1);
    } else if (event.key === "Escape") {
      event.preventDefault();
      closeLightbox();
    }
  });
  viewerImage.addEventListener("pointerdown", (event) => {
    pointerStartX = event.clientX;
  });
  viewerImage.addEventListener("pointerup", (event) => {
    if (pointerStartX === null) return;
    const distance = event.clientX - pointerStartX;
    pointerStartX = null;
    if (Math.abs(distance) < 50) return;
    show(current + (distance < 0 ? 1 : -1));
  });
  viewerImage.addEventListener("pointercancel", () => {
    pointerStartX = null;
  });
}
doc.querySelectorAll<HTMLFormElement>("[data-inquiry-form]").forEach((form) => {
  const starter = Array.from(
    form.querySelectorAll<HTMLInputElement>(".starter input"),
  );
  const update = () =>
    form.classList.toggle(
      "is-expanded",
      starter.some((i) => i.value.trim()),
    );
  starter.forEach((i) => i.addEventListener("input", update));
  update();
  form
    .querySelector<HTMLInputElement>("[type=file]")
    ?.addEventListener("change", (event) => {
      const input = event.target as HTMLInputElement;
      form.querySelector("[data-file-list]")!.textContent = Array.from(
        input.files || [],
      )
        .map((f) => f.name)
        .join(", ");
    });
  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    const status = form.querySelector<HTMLElement>(".form-status")!;
    const button = form.querySelector<HTMLButtonElement>("[type=submit]")!;
    form
      .querySelectorAll("[aria-invalid]")
      .forEach((e) => e.removeAttribute("aria-invalid"));
    form.querySelectorAll(".field-error").forEach((e) => e.remove());
    button.disabled = true;
    status.textContent = "Sending your message…";
    try {
      const response = await fetch("/api/contact/", {
        method: "POST",
        body: new FormData(form),
      });
      const result = await response.json();
      status.textContent = result.message;
      if (result.errors) {
        for (const [name, message] of Object.entries(result.errors)) {
          const input = form.elements.namedItem(name);
          if (input instanceof HTMLElement) {
            input.setAttribute("aria-invalid", "true");
            const error = doc.createElement("p");
            error.className = "field-error";
            error.id = input.id + "-error";
            error.textContent = String(message);
            input.setAttribute("aria-describedby", error.id);
            input.after(error);
          }
        }
      }
      if (response.ok && result.ok) {
        form.reset();
        const template = form.parentElement?.querySelector<HTMLTemplateElement>(
          "[data-inquiry-confirmation]",
        );
        const confirmation =
          template?.content.firstElementChild?.cloneNode(true);
        if (confirmation instanceof HTMLElement) {
          form.replaceWith(confirmation);
          confirmation.focus();
          return;
        }
        update();
      }
      status.focus();
    } catch {
      status.textContent =
        "Your message could not be sent. Please try again later.";
      status.focus();
    } finally {
      button.disabled = false;
    }
  });
});
