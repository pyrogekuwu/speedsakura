document.addEventListener("DOMContentLoaded", () => {

  const loopBar = document.getElementById("filterBar");
  if (loopBar) {
    loopBar.innerHTML += loopBar.innerHTML;

    loopBar.addEventListener("scroll", () => {
      const half = loopBar.scrollWidth / 2;
      if (loopBar.scrollLeft > half) {
        loopBar.scrollLeft -= half;
      }
    });
  }


  const pills = document.querySelectorAll(".filter-bar .cat-pill");
  const cards = document.querySelectorAll(".category-grid .category-card");
  const grid = document.querySelector(".category-grid");
  const noResultsMessage = document.querySelector(".no-results-message");


  if (!pills.length || !cards.length || !grid) return;

  // detect "mode" of this category page
//  - multiDimension: car-models (data-filter-type + data-filter-value on pills)
//  - styleTags: aesthetic / modding / guides (data-style on pills or cards)
//  - brandSimple: jdm-legends (no style, brand via text)
let mode = "none";


const hasFilterType = Array.from(pills).some(
  p => p.dataset.filterType || p.dataset.filterValue
);

const hasStyleAttr = Array.from(pills).some(
  p => p.dataset.style !== undefined
);

const hasStyleCards = Array.from(cards).some(
  c => c.dataset.style !== undefined
);

if (hasFilterType) {
  mode = "multiDimension";
} else if (hasStyleAttr || hasStyleCards) {
  mode = "styleTags";
} else {
  mode = "brandSimple";
}



  let activeFilters = {};

  function applyFilters() {
    let visibleCount = 0;

    cards.forEach(card => {
      let show = true;

      if (mode === "multiDimension") {

        const eraFilter = activeFilters.era || "all";
        const brandFilter = activeFilters.brand || "all";
        const cardEra = card.dataset.era;
        const cardBrand = card.dataset.brand;

        const matchesEra = eraFilter === "all" || cardEra === eraFilter;
        const matchesBrand = brandFilter === "all" || cardBrand === brandFilter;

        show = matchesEra && matchesBrand;

      } else if (mode === "styleTags") {
        
        const isAll = !!activeFilters.isAll;
        const styleFilter = activeFilters.style;
        const cardStyles = (card.dataset.style || "")
          .split(/\s+/)
          .filter(Boolean);

        if (isAll || !styleFilter) {
          show = true;
        } else {
          show = cardStyles.includes(styleFilter);
        }

      } else if (mode === "brandSimple") {
        nd
        const isAll = !!activeFilters.isAll;
        const brandFilter = activeFilters.brand;
        const cardBrand = (card.dataset.brand || "").toLowerCase();

        if (isAll || !brandFilter) {
          show = true;
        } else {
          show = cardBrand === brandFilter;
        }
      }

      if (show) {
        card.style.display = "";
        visibleCount++;
      } else {
        card.style.display = "none";
      }
    });

    
    if (noResultsMessage) {
      noResultsMessage.style.display = visibleCount === 0 ? "block" : "none";
    }

    // fake rows: kill them when grid is "empty"
    if (grid) {
      if (visibleCount === 0) {
        grid.classList.add("category-grid--empty");
      } else {
        grid.classList.remove("category-grid--empty");
      }
    }
  }

  
  pills.forEach(pill => {
    pill.addEventListener("click", (e) => {
      e.preventDefault();

      if (mode === "multiDimension") {
        
        const type = pill.dataset.filterType;
        const value = pill.dataset.filterValue;

        if (type) {
          activeFilters[type] = value;
        }

        // only one active per type
        pills.forEach(p => {
          if (p.dataset.filterType === type) {
            p.classList.remove("cat-pill--active");
          }
        });
        pill.classList.add("cat-pill--active");

      } else if (mode === "styleTags") {
        
        const isAll = pill.dataset.all === "true";
        const style = pill.dataset.style;

        activeFilters = { isAll, style };

        pills.forEach(p => p.classList.remove("cat-pill--active"));
        pill.classList.add("cat-pill--active");

      } else if (mode === "brandSimple") {
        
        const isAll = pill.dataset.all === "true";
        const brand = pill.textContent.trim().toLowerCase();

        activeFilters = { isAll, brand };

        pills.forEach(p => p.classList.remove("cat-pill--active"));
        pill.classList.add("cat-pill--active");
      }

      applyFilters();
    });
  });

  





  if (mode === "multiDimension") {
    
    ["era", "brand"].forEach(type => {
      const group = Array.from(pills).filter(p => p.dataset.filterType === type);
      if (!group.length) return;

      let defaultPill =
        group.find(p => p.dataset.filterValue === "all") || group[0];

      group.forEach(p => p.classList.remove("cat-pill--active"));
      defaultPill.classList.add("cat-pill--active");

      activeFilters[type] = defaultPill.dataset.filterValue;
    });
  } else if (mode === "styleTags") {
    const defaultPill =
      Array.from(pills).find(p => p.dataset.all === "true") || pills[0];

    if (defaultPill) {
      pills.forEach(p => p.classList.remove("cat-pill--active"));
      defaultPill.classList.add("cat-pill--active");

      activeFilters = {
        isAll: defaultPill.dataset.all === "true",
        style: defaultPill.dataset.style
      };
    }
  } else if (mode === "brandSimple") {
    const defaultPill =
      Array.from(pills).find(p => p.dataset.all === "true") || pills[0];

    if (defaultPill) {
      pills.forEach(p => p.classList.remove("cat-pill--active"));
      defaultPill.classList.add("cat-pill--active");

      activeFilters = {
        isAll: defaultPill.dataset.all === "true",
        brand: defaultPill.textContent.trim().toLowerCase()
      };
    }
  }

  applyFilters();
});
