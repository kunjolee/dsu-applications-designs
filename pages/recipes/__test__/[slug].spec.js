import { client } from '../../../config/client';
import { getStaticPaths, getStaticProps } from '../[slug]';

jest.mock('../[slug]', () => ({
    getStaticPaths: jest.fn(),
    getStaticProps: jest.fn(),
}));

jest.mock('../../../config/client');

describe('Slug Test', () => {
    it('Should test my slug', async () => {
        client.getEntries.mockImplementationOnce(() => 'que retornasss');

        await getStaticPaths({});
        await getStaticProps({
            params: {
                slug: 'my-test-slug',
            },
        });
    });
});
