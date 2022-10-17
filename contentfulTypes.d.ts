import { Asset } from 'contentful';
export const Homepage = 'homepage';
export interface IHomepage {
    // homepage
    /* The home page of my application */
    readonly description: string;
    readonly title: string;
}

export const Recipe = 'recipe';
export interface IRecipe {
    // Recipe
    /*  */
    readonly cookingTime: number;
    readonly description: string;
    readonly featuredImage: Asset;
    readonly goBack: string;
    readonly ingredients: ReadonlyArray<string>;
    readonly ingredientsTitle: string;
    readonly methodTitle: string;
    readonly seeMoreText: string;
    readonly slug: string;
    readonly textMinsToCook: string;
    readonly thumbnail: Asset;
    readonly title: string;
}
