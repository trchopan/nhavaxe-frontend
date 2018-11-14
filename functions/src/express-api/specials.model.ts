import { IArticleMicro } from "./article.model";

export interface ISpecials {
  specials: {
    title: string
    articles: IArticleMicro[]
  },
  videos: any[]
}