import { render, screen } from '@testing-library/react';
import { client } from '../../../config/client';

import RecipePage, {
    getStaticPaths,
    getStaticProps,
} from '../../../pages/recipes/[slug]';
import { recipeMock } from '../../../__mocks__';

jest.mock('../../../config/client');

describe('Slug page', () => {
    describe('TSX elements', () => {
        beforeEach(() => {
            render(<RecipePage recipe={recipeMock} />);
        });

        it('should return Skeleton component when Recipes is null', () => {
            render(<RecipePage recipe={null} />);
            const skeleton = screen.getByTestId('skeleton-test');
            expect(skeleton).toBeInTheDocument();
        });

        it('should have div slug container in document', () => {
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
                    recipe: {
                        fields: {
                            title: 'my-title-test',
                        },
                    },
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
                    recipe: null,
                },
                revalidate: 10,
            });
        });
    });
});
