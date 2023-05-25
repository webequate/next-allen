// lib/utils.ts
export const decodeFBString = (s: string) => {
  return new TextDecoder().decode(
    new Uint8Array(s.split("").map((r) => r.charCodeAt(0)))
  );
};

export const parseAlienCaption = (caption: string) => {
  const decodedCaption = decodeFBString(caption);
  const captionArray = decodedCaption.split(" - ");
  const filteredArray = captionArray.filter((c) => c !== "#allensaliens");
  const title = filteredArray[0];
  const additional = filteredArray.slice(1);
  return { title, additional };
};
