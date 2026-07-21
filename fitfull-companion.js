(function () {
  const body = document.body;
  if (!body) return;

  const fitfullPackage = window.FitfullWebPackage || null;
  const displayName = fitfullPackage?.displayName || "Fitfull";
  const applyFitfullPose =
    window.applyFitfullPose ||
    ((node, pose) => {
      if (!node || !pose) return;
      node.dataset.fitfullPose = pose;
    });

  const page = body.dataset.page || "home";
  const HOME = page === "home";
  const openKey = "mindfulfit-fitfull-open";
  const teaserKey = "mindfulfit-fitfull-teaser-dismissed";

  const resolveTarget = (homeTarget, fallback) => {
    if (HOME) return homeTarget;
    return fallback || `index.html${homeTarget}`;
  };

  const goTo = (target) => {
    if (!target) return;
    if (target.startsWith("#") && HOME) {
      const node = document.querySelector(target);
      if (node) node.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    window.location.href = target;
  };

  const supportMessage = HOME
    ? "I can point you toward steadier routines, clearer structure, or a calmer first step."
    : "I can point you toward the best next page if you want structure, steadier routines, or a gentler starting point.";

  const teaserMessage = "Need a gentle guide?";

  const states = {
    intro: {
      pose: "welcome",
      speakingPose: "speak",
      message: "Hey, I'm Fitfull. Would you like a gentle guide?",
      options: [
        { label: "What is MindfulFit?", next: "what-is" },
        { label: "Show me the system", next: "system" },
        { label: "I need support", next: "support" },
        { label: "Get in touch", next: "contact" },
      ],
    },
    "what-is": {
      pose: "explain",
      speakingPose: "speak",
      message:
        "MindfulFit is a movement, wellbeing, and behaviour-change system designed to help life feel steadier and more livable.",
      options: [
        { label: "Show me the solution", action: () => goTo(resolveTarget("#solution")) },
        { label: "Read insights first", action: () => goTo("insights.html") },
        { label: "Back", next: "intro" },
      ],
    },
    system: {
      pose: "instruct",
      speakingPose: "speak",
      message: "I can take you to RSEET or the simple path that explains how it works.",
      options: [
        { label: "Go to RSEET", action: () => goTo(resolveTarget("#system")) },
        { label: "How it works", action: () => goTo(resolveTarget("#how-it-works")) },
        { label: "Back", next: "intro" },
      ],
    },
    support: {
      pose: "guide",
      speakingPose: "encourage",
      message: supportMessage,
      options: [
        { label: "More consistency", action: () => goTo(resolveTarget("#offer")) },
        { label: "Calmer starting point", action: () => goTo(resolveTarget("#benefits", "mindful-steps.html")) },
        { label: "Explore content", action: () => goTo("insights.html") },
      ],
    },
    contact: {
      pose: "encourage",
      speakingPose: "wave",
      message: "I can guide you to the calmest place to start the conversation.",
      options: [
        { label: "Take me there", action: () => goTo(resolveTarget("#contact")) },
        { label: "Reset invitation", action: () => goTo(resolveTarget("#offer")) },
        { label: "Back", next: "intro" },
      ],
    },
  };

  const wrapper = document.createElement("div");
  wrapper.className = "fitfull-companion";
  wrapper.setAttribute("aria-live", "polite");
  wrapper.innerHTML = `
    <div class="fitfull-companion__bubble" data-mode="teaser">
      <button class="fitfull-companion__bubble-close" type="button" aria-label="Minimise ${displayName}">×</button>
      <div class="fitfull-companion__bubble-body">
        <p class="fitfull-companion__message"></p>
        <div class="fitfull-companion__options"></div>
      </div>
    </div>
    <button class="fitfull-companion__pet" type="button" aria-expanded="false" aria-label="Open ${displayName}">
      <span class="fitfull-sprite fitfull-companion__pet-sprite" data-fitfull-pose="welcome" aria-hidden="true"></span>
    </button>
  `;
  body.appendChild(wrapper);

  const bubble = wrapper.querySelector(".fitfull-companion__bubble");
  const closeBtn = wrapper.querySelector(".fitfull-companion__bubble-close");
  const petButton = wrapper.querySelector(".fitfull-companion__pet");
  const petSpriteNode = wrapper.querySelector(".fitfull-companion__pet-sprite");
  const messageNode = wrapper.querySelector(".fitfull-companion__message");
  const optionsNode = wrapper.querySelector(".fitfull-companion__options");

  let current = "intro";
  let activePose = "welcome";
  let blinkTimer = null;
  let attentionTimer = null;
  let open = false;
  let teaserVisible = sessionStorage.getItem(teaserKey) !== "dismissed";

  const setSpritePose = (node, pose, extraClass = "") => {
    if (!node) return;
    node.className = `fitfull-sprite ${extraClass}`.trim();
    applyFitfullPose(node, pose);
  };

  const clearTimers = () => {
    window.clearTimeout(blinkTimer);
    window.clearTimeout(attentionTimer);
  };

  const renderBubble = (message, options = [], mode = "open") => {
    bubble.dataset.mode = mode;
    messageNode.textContent = message;
    optionsNode.innerHTML = "";
    optionsNode.hidden = options.length === 0;

    options.forEach((option) => {
      const button = document.createElement("button");
      button.className = "fitfull-companion__chip";
      button.type = "button";
      button.textContent = option.label;
      button.addEventListener("click", () => {
        if (option.next) {
          renderState(option.next);
          pulseSpeaking();
          return;
        }
        if (option.action) {
          option.action();
          minimiseToTeaser();
        }
      });
      optionsNode.appendChild(button);
    });
  };

  const renderState = (key) => {
    const state = states[key];
    if (!state) return;
    current = key;
    activePose = state.pose || "welcome";
    setSpritePose(petSpriteNode, activePose, "fitfull-companion__pet-sprite");
    renderBubble(state.message, state.options, "open");
  };

  const showTeaser = () => {
    setSpritePose(petSpriteNode, activePose || "welcome", "fitfull-companion__pet-sprite");
    renderBubble(teaserMessage, [], "teaser");
    bubble.hidden = !teaserVisible;
    closeBtn.hidden = !teaserVisible;
    wrapper.classList.toggle("has-teaser", teaserVisible);
  };

  const pulseSpeaking = () => {
    wrapper.classList.remove("is-speaking");
    const state = states[current] || states.intro;
    const restingPose = state.pose || "welcome";
    const speakingPose = state.speakingPose || "speak";
    setSpritePose(petSpriteNode, speakingPose, "fitfull-companion__pet-sprite");
    window.requestAnimationFrame(() => {
      wrapper.classList.add("is-speaking");
      window.setTimeout(() => {
        wrapper.classList.remove("is-speaking");
        setSpritePose(petSpriteNode, restingPose, "fitfull-companion__pet-sprite");
      }, 1200);
    });
  };

  const setOpen = (nextOpen) => {
    open = nextOpen;
    wrapper.classList.toggle("is-open", open);
    wrapper.classList.remove("is-attention");
    petButton.setAttribute("aria-expanded", String(open));
    sessionStorage.setItem(openKey, open ? "open" : "closed");
    if (open) {
      teaserVisible = true;
      closeBtn.hidden = false;
      bubble.hidden = false;
      renderState(current);
      pulseSpeaking();
    } else {
      showTeaser();
    }
    scheduleBlink();
    scheduleAttention();
  };

  const minimiseToTeaser = () => {
    open = false;
    wrapper.classList.remove("is-open", "is-attention");
    petButton.setAttribute("aria-expanded", "false");
    sessionStorage.setItem(openKey, "closed");
    teaserVisible = true;
    sessionStorage.removeItem(teaserKey);
    showTeaser();
    scheduleBlink();
    scheduleAttention();
  };

  const dismissTeaser = () => {
    open = false;
    teaserVisible = false;
    bubble.hidden = true;
    closeBtn.hidden = true;
    wrapper.classList.remove("is-open", "has-teaser", "is-attention");
    petButton.setAttribute("aria-expanded", "false");
    sessionStorage.setItem(openKey, "closed");
    sessionStorage.setItem(teaserKey, "dismissed");
    scheduleBlink();
    scheduleAttention();
  };

  const scheduleBlink = () => {
    window.clearTimeout(blinkTimer);
    const delay = 3800 + Math.round(Math.random() * 2600);
    blinkTimer = window.setTimeout(() => {
      const pose = open ? states[current]?.pose || "welcome" : activePose || "welcome";
      setSpritePose(petSpriteNode, "blink", "fitfull-companion__pet-sprite");
      window.setTimeout(() => {
        setSpritePose(petSpriteNode, pose, "fitfull-companion__pet-sprite");
        scheduleBlink();
      }, 180);
    }, delay);
  };

  const scheduleAttention = () => {
    window.clearTimeout(attentionTimer);
    if (open || !teaserVisible) return;
    attentionTimer = window.setTimeout(() => {
      wrapper.classList.add("is-attention");
      setSpritePose(petSpriteNode, "wave", "fitfull-companion__pet-sprite");
      window.setTimeout(() => {
        wrapper.classList.remove("is-attention");
        setSpritePose(petSpriteNode, activePose || "welcome", "fitfull-companion__pet-sprite");
      }, 1800);
      scheduleAttention();
    }, 12000);
  };

  petButton.addEventListener("click", () => {
    if (open) {
      minimiseToTeaser();
      return;
    }
    teaserVisible = true;
    sessionStorage.removeItem(teaserKey);
    setOpen(true);
  });

  bubble.addEventListener("click", (event) => {
    if (!(event.target instanceof HTMLElement)) return;
    if (event.target.closest(".fitfull-companion__chip")) return;
    if (!open) {
      setOpen(true);
    }
  });

  closeBtn.addEventListener("click", (event) => {
    event.stopPropagation();
    if (open) {
      minimiseToTeaser();
      return;
    }
    dismissTeaser();
  });

  activePose = "welcome";
  setSpritePose(petSpriteNode, activePose, "fitfull-companion__pet-sprite");
  if (sessionStorage.getItem(openKey) === "open") {
    setOpen(true);
  } else {
    showTeaser();
  }
  scheduleBlink();
  scheduleAttention();
})();
