import { IRecipe } from '../contentfulTypes';

interface RecipeMock {
    fields: IRecipe;
}

const AssetMock = {
    fields: {
        title: 'title-image-test',
        description: 'description-image-test',
        file: {
            url: 'test-url',
            details: {
                size: 30,
                image: {
                    width: 150,
                    height: 150,
                },
            },
        },
    },
};

export const recipeMock: RecipeMock = {
    fields: {
        featuredImage: AssetMock,
        title: 'title-recipe-test',
        cookingTime: 10,
        ingredients: ['test-ingredents'],
        description: 'description-recipe-test',
        textMinsToCook: '20mins-test',
        methodTitle: 'methods-test',
        ingredientsTitle: 'ingredients-test',
        goBack: 'goBack-test',
        seeMoreText: 'seeMore-test',
        slug: 'slug-test',
        thumbnail: AssetMock,
    },
};

export const recipeItemsMocks = [
    {
        metadata: { tags: [] },
        sys: {
            id: 'my_sys_recipe_id',
        },
        fields: recipeMock.fields,
    },
];

export const homepageItemsMock = [
    {
        metadata: { tags: [] },
        sys: {
            id: 'my_sys_homepage_id',
        },
        fields: {
            title: 'DSU Application designs',
            description:
                'DSU application designs implementing Contentful, Next.js and Typescript',
            recipes: recipeItemsMocks,
        },
    },
];
