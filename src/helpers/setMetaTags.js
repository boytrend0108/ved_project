import { KEYWORDS, DESCRIPTION } from "@/constants/keywords";

export const setMetaTags = () => {
  const head = document.querySelector("head");
  const title = head.querySelector("title");

  const keywordsMeta = `<meta name="keywords" content="${KEYWORDS}">`;
  const descriptionMeta = `<meta name="description" content="${DESCRIPTION}">`;

  title.insertAdjacentHTML("afterend", keywordsMeta);
  title.insertAdjacentHTML('afterend', descriptionMeta);
}
