import type { GetStaticProps, NextPage } from 'next';
import { Entry } from 'contentful';

import { RecipeCard } from '../components';
import { client } from '../config';
import { IHomepage, IRecipe } from '../contentfulTypes';

import { AppLayout } from '../components/Layouts';

import styles from '../styles/Home.module.css';

interface Props {
    recipe: Entry<IRecipe>[];
    homepageData: Entry<IHomepage>;
    layoutBlocks: any;
}

const Title = ({ title }: { title: string }) => {
    return <h1>{title}</h1>;
};

const RecipeTest = ({ recipe }: any) => {
    return (
        <div className={styles.recipe__list}>
            {recipe.map((recipe) => (
                <RecipeCard key={recipe.sys.id} recipe={recipe} />
            ))}
        </div>
    );
};

const Home: NextPage<Props> = ({ recipe, homepageData, layoutBlocks }) => {
    const blocks = {
        Recipes: <RecipeTest key='recipes' recipe={recipe} />,
        Title: <Title key='title' title={homepageData.fields.title} />,
    };

    // blockLayout in homepage. recipes in blockLayout as reference
    return (
        <AppLayout
            title={homepageData.fields.title}
            description={homepageData.fields.description}
        >
            {layoutBlocks.blockLayouts.map((layout) => blocks[layout])}
        </AppLayout>
    );
};

export const getStaticProps: GetStaticProps = async (ctx) => {
    const [
        { items: recipeItems },
        { items: homepageItems },
        { items: layoutBlockItems },
    ] = await Promise.all([
        client.getEntries<IRecipe>({ content_type: 'recipe' }),
        client.getEntries<IHomepage>({ content_type: 'homepage' }),
        client.getEntries({ content_type: 'layoutBlocks' }),
    ]);

    return {
        props: {
            recipe: recipeItems,
            homepageData: homepageItems[0],
            layoutBlocks: layoutBlockItems[0].fields,
        },
        revalidate: 10,
    };
};

export default Home;

// const resa = await fetch(
//     `https://cdn.contentful.com/spaces/tyfq63c2cv6i/environments/master/content_types/recipe?access_token=8vVV70QWvNUOVo4u5E1raH7JodHrLoFx6tnAUx3VhQ8`

// /spaces/{space_id}/environments/{environment_id}/entries?access_token={access_token}&include={value}&content_type={content_type}&fields.{linking_field}.sys.id={target_entry_id}
