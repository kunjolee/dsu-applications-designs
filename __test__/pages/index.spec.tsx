import { screen, render } from '@testing-library/react';
import Home, { getStaticProps } from '../../pages';

import { client } from '../../config/client';
import { recipeItemsMocks, homepageItemsMock } from '../../__mocks__';

jest.mock('../../config/client');

describe('Test on Home Page', () => {
    describe('Test Homepage UI', () => {
        beforeEach(() => {
            render(
                <Home
                    recipe={recipeItemsMocks}
                    homepageData={homepageItemsMock[0]}
                />
            );
        });
        it('should contain homepage container in the homepage', () => {
            const title = screen.getByTestId('homepage-title-test');

            expect(title).toHaveTextContent(homepageItemsMock[0].fields.title);
        });
        it('should have title in the home page', () => {
            const res = screen.getByTestId('homepage-container-test');

            expect(res).toBeInTheDocument();
        });
    });

    it('should return homepage props within getStaticProps method', async () => {
        (client.getEntries as jest.Mock)
            .mockImplementationOnce(() => ({
                items: recipeItemsMocks,
            }))
            .mockImplementationOnce(() => ({
                items: homepageItemsMock,
            }));

        const data = await getStaticProps({});

        expect(data).toEqual({
            props: {
                recipe: recipeItemsMocks,
                homepageData: homepageItemsMock[0],
            },
            revalidate: 10,
        });
    });
});
