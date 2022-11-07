import { GetStaticPaths, GetStaticProps } from 'next';

import Image from 'next/image';
import { client } from '../../config';
import { IRecipe } from '../../contentfulTypes';

import { Skeleton } from '../../components';

import styles from '../../styles/Recipe.module.css';
import { AppLayout } from '../../components/Layouts';
import { useEffect } from 'react';
import { setRecipe } from '../../store/slices';
import { useAppDispatch, useAppSelector } from '../../store/hook';

const RecipePage = ({ recipeProp }: any) => {
    const { recipe } = useAppSelector((state) => state.recipe);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(setRecipe(recipeProp));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (!recipe) return <Skeleton />;

    const {
        featuredImage,
        title,
        cookingTime,
        ingredients,
        description,
        textMinsToCook,
        methodTitle,
        ingredientsTitle,
        goBack,
    } = recipe[0].fields;

    return (
        <AppLayout title={title} description={description} goBack={goBack}>
            <div data-testid='slug-container-test' className={styles.slug}>
                <div className={styles.slug__banner}>
                    <Image
                        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
                        src={`https:${featuredImage.fields.file.url}`}
                        alt={title}
                        width={featuredImage.fields.file.details.image?.width}
                        height={featuredImage.fields.file.details.image?.height}
                    />
                    <div className={styles.slug__content}>
                        <h1 className={styles.slug__title}>{title}</h1>
                        <p className={styles.slug__minutes}>
                            {textMinsToCook}
                            {cookingTime}
                        </p>
                    </div>
                </div>
                <div className={styles.slug__info}>
                    <h2 className={styles.slug__subtitle}>
                        {ingredientsTitle}
                    </h2>
                    {ingredients.map((ingredient, i) => (
                        <ol key={i}>
                            <li>{ingredient}</li>
                        </ol>
                    ))}
                </div>
                <div>
                    <h2 className={styles.slug__subtitle}>{methodTitle}</h2>
                    <p className={styles.slug__description}>{description}</p>
                </div>
            </div>
        </AppLayout>
    );
};

export const getStaticPaths: GetStaticPaths = async () => {
    const res = await client.getEntries<IRecipe>({ content_type: 'recipe' });

    const paths = res.items.map((item) => ({
        params: { slug: item.fields.slug },
    }));

    return {
        paths,
        fallback: true,
    };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const { slug } = params as { slug: string };
    const { items } = await client.getEntries<IRecipe>({
        content_type: 'recipe',
        'fields.slug': slug,
    });

    if (!items.length) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        };
    }

    return {
        props: {
            recipeProp: items[0] ? items : null,
        },
        revalidate: 10,
    };
};

export default RecipePage;
