import { render as rtlRender, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { client } from '../../../config/client';

import RecipePage, {
    getStaticPaths,
    getStaticProps,
} from '../../../pages/recipes/[slug]';

import { store } from '../../../store/';
import { recipeSlice } from '../../../store/slices/recipeSlice';

import { recipeItemsMocks } from '../../../__mocks__';

jest.mock('../../../config/client');

const render = (component) =>
    rtlRender(<Provider store={store}>{component}</Provider>);

describe('Slug page', () => {
    describe('TSX elements', () => {
        it('should test my recipeSlice', () => {
            render(<RecipePage recipeProp={recipeItemsMocks} />);
            const action = { type: 'unknown' };
            expect(recipeSlice.reducer({ recipe: null }, action)).toEqual({
                recipe: null,
            });
        });

        it('should return Skeleton component when Recipes is null', () => {
            render(<RecipePage recipeProp={null} />);
            const skeleton = screen.getByTestId('skeleton-test');
            expect(skeleton).toBeInTheDocument();
        });

        it('should have div slug container in document', () => {
            render(<RecipePage recipeProp={recipeItemsMocks} />);

            const AppLayoutSlug = screen.getByTestId('slug-container-test');

            expect(AppLayoutSlug).toBeInTheDocument();
        });
    });

    describe('Static server methods', () => {
        it('should return paths and fallback true within getStaticPaths', async () => {
            (client.getEntries as jest.Mock).mockImplementationOnce(() => ({
                items: [
                    {
                        fields: {
                            slug: 'my-slug-test',
                        },
                    },
                ],
            }));

            const data = await getStaticPaths({});

            expect(data).toEqual({
                paths: [{ params: { slug: 'my-slug-test' } }],
                fallback: true,
            });
        });

        it('should redirect my page to "/" when items array is empty', async () => {
            (client.getEntries as jest.Mock).mockImplementationOnce(() => ({
                items: [],
            }));

            const data = await getStaticProps({
                params: { slug: 'my-slug-test' },
            });

            expect(data).toEqual({
                redirect: {
                    destination: '/',
                    permanent: false,
                },
            });
        });

        it('should return slug page props', async () => {
            (client.getEntries as jest.Mock).mockImplementationOnce(() => ({
                items: [
                    {
                        fields: {
                            title: 'my-title-test',
                        },
                    },
                ],
            }));

            const data = await getStaticProps({
                params: { slug: 'my-slug-test' },
            });

            expect(data).toEqual({
                props: {
                    recipeProp: [
                        {
                            fields: {
                                title: 'my-title-test',
                            },
                        },
                    ],
                },
                revalidate: 10,
            });
        });
        it('should return slug page props as null', async () => {
            (client.getEntries as jest.Mock).mockImplementationOnce(() => ({
                items: [null],
            }));

            const data = await getStaticProps({
                params: { slug: 'my-slug-test' },
            });

            expect(data).toEqual({
                props: {
                    recipeProp: null,
                },
                revalidate: 10,
            });
        });
    });
});
