/*******************************
 * Road.js Static Proxy
 * Version: 1.01 vHARDENED
 * Made with ❤️ by Road.js
 *******************************/

(function () {
  const SAFE_WISP = [
    "wss://anura.pro/",
    "wss://gointospace.app/wisp/",
    "wss://wisp.mercurywork.shop/",
  ];

  const SAFE_BARE = [
    "https://aluu.xyz/bare/",
    "https://bare.mercurywork.shop/",
    location.origin + "/bare/",
  ];

  function normalize(url, fallback) {
    try {
      if (!url) throw 0;
      if (!/^wss?:\/\//.test(url) && !/^https?:\/\//.test(url)) {
        throw 0;
      }
      return url.endsWith("/") ? url : url + "/";
    } catch {
      return fallback;
    }
  }

  function pickWorking(list, type) {
    for (const url of list) {
      try {
        if (type === "wisp" && url.startsWith("wss")) return url;
        if (type === "bare" && url.startsWith("http")) return url;
      } catch {}
    }
    return list[0];
  }

  const storedWisp = normalize(
    localStorage.getItem("proxServer"),
    pickWorking(SAFE_WISP, "wisp")
  );

  const storedBare = normalize(
    localStorage.getItem("bareServer"),
    pickWorking(SAFE_BARE, "bare")
  );

  window._CONFIG = {
    wispurl: storedWisp,
    bareurl: storedBare,
  };

  // Persist known-good values
  try {
    localStorage.setItem("proxServer", window._CONFIG.wispurl);
    localStorage.setItem("bareServer", window._CONFIG.bareurl);
  } catch {}

  // Debug (non-fatal)
  console.info(
    "[Road.js] Proxy config loaded",
    window._CONFIG
  );
})();
