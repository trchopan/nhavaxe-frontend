export interface IBanner {
  id: string;
  contentLink: string;
  type: string;
  // link: string;
  area: string;
}

export function parseBanner(id: string, data: any): IBanner {
  return {
    id: id,
    contentLink: data.contentLink || "",
    type: data.type || "",
    // link: data.link || "",
    area: data.area || ""
  };
}
