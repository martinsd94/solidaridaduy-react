import levenshtein from "fast-levenshtein";

export const getKeywords = (s) => {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9_\s]/g, "")
    .split(/\s+/g);
};

export const filterBySearch = (data, search) => {
  let keywords = getKeywords(search);
  let i;
  return data.filter((elemt) => {
    for (i = 0; i < keywords.length; i++) {
      // TODO: There should be a way to ponder search results.
      // Maybe think of this as a classification problem? Later.
      if (
        levenshtein.get(keywords[i].toLowerCase(), elemt.name.toLowerCase()) < 3
      ) {
        return true;
      }
      if (elemt.name.toLowerCase().indexOf(keywords[i].toLowerCase()) > -1) {
        return true;
      }
      if (elemt.hood.toLowerCase().indexOf(keywords[i].toLowerCase()) > -1) {
        return true;
      }
      if (
        elemt.province.toLowerCase().indexOf(keywords[i].toLowerCase()) > -1
      ) {
        return true;
      }
    }
    return false;
  });
};
