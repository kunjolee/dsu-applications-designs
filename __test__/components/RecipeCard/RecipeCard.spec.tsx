import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { RecipeCard } from '../../../components';
import { recipeMock } from '../../../__mocks__';

describe('Test on <RecipeCard />', () => {
    beforeEach(() => {
        render(<RecipeCard recipe={recipeMock} />);
    });

    it('should have a recipe card container div', () => {
        const recipeContainer = screen.getByTestId('recipeCard-container');

        expect(recipeContainer).toBeInTheDocument();
    });

    it('should have src and alt properties', () => {
        const { alt, src } =
            screen.getByTestId<HTMLImageElement>('recipe-image-id');

        expect(src).toBeTruthy();
        expect(alt).toBeTruthy();
    });

    it('should contain title and paragraph', () => {
        // expect(screen.getByRole('title-test')).toEqual(recipe.fields.title);

        expect(
            screen.getByText(
                `${recipeMock.fields.textMinsToCook}${recipeMock.fields.cookingTime}`
            )
        ).toBeTruthy();

        expect(screen.getByText(recipeMock.fields.title)).toBeTruthy();
    });
});
