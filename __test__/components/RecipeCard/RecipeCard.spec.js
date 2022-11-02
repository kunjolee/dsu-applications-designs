import { render, screen } from '@testing-library/react';
import { RecipeCard } from '../../../components';
import '@testing-library/jest-dom';

describe('Test on <RecipeCard />', () => {
    let recipe;
    beforeAll(() => {
        recipe = {
            fields: {
                title: 'title-test',
                slug: 'slug-test',
                cookingTime: '',
                thumbnail: {
                    // thumbnail.fields.file.details.image?.width
                    fields: {
                        file: {
                            details: {
                                image: {
                                    width: 100,
                                    height: 100,
                                },
                            },
                            url: 'test-url',
                        },
                    },
                },
                textMinsToCook: 'mins',
                seeMoreText: 'i wanna see more',
            },
        };
    });

    beforeEach(() => {
        render(<RecipeCard recipe={recipe} />);
    });

    it('should have a recipe card container div', () => {
        const recipeContainer = screen.getByTestId('recipeCard-container');

        expect(recipeContainer).toBeInTheDocument();
    });

    it('should have src and alt properties', () => {
        const { src, alt } = screen.getByRole('img');

        expect(src).toBeTruthy();
        expect(alt).toBeTruthy();
    });

    it('should contain title and paragraph', () => {
        // expect(screen.getByRole('title-test')).toEqual(recipe.fields.title);

        expect(
            screen.getByText(
                `${recipe.fields.textMinsToCook}${recipe.fields.cookingTime}`
            )
        ).toBeTruthy();

        expect(screen.getByText(recipe.fields.title)).toBeTruthy();
    });
});
