// Assembles the domain list from data/index.js (light) and data/domains/<id>.js (heavy).
// Pages that only need metadata load index.js alone; domain pages also load their own file.

const atlasDomains = Atlas.data.domainIndex.map(entry => {
  const content = Atlas.data.domainContent?.[entry.id];
  return content ? { ...entry, ...content } : entry;
});

// Fails loudly instead of silently rendering an empty domain page.
function assertDomainData() {
  const required = ["id", "number", "name", "shortName", "purpose", "color", "status", "concepts"];
  const problems = [];
  atlasDomains.forEach(domain => {
    required.forEach(key => {
      if (domain[key] === undefined) problems.push(`${domain.id}: missing ${key}`);
    });
    if (domain.status === "ready") {
      ["objectives", "examples", "mappings", "failures", "quiz"].forEach(key => {
        if (domain[key] === undefined) problems.push(`${domain.id}: ready but missing ${key}`);
      });
    }
  });
  if (problems.length) {
    console.error("Atlas domain data problems:\n  " + problems.join("\n  "));
  }
  return problems;
}
