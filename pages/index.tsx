import { GetStaticProps, NextPage } from 'next';

import { RecipeCard } from '../components';
import { client } from '../config';
import { IHomepage, IRecipe } from '../contentfulTypes';

import { AppLayout } from '../components/Layouts';

import styles from '../styles/Home.module.css';

interface Props {
    recipe: any;
    homepageData: any;
}

const Home: NextPage<Props> = ({ recipe, homepageData }) => {
    return (
        <AppLayout
            title={homepageData.fields.title}
            description={homepageData.fields.description}
        >
            <h1 data-testid='homepage-title-test'>
                {homepageData.fields.title}
            </h1>
            <div
                data-testid='homepage-container-test'
                className={styles.recipe__list}
            >
                {recipe.map((recipe) => (
                    <RecipeCard key={recipe.sys.id} recipe={recipe} />
                ))}
            </div>
        </AppLayout>
    );
};

export const getStaticProps: GetStaticProps = async () => {
    const [{ items: recipeItems }, { items: homepageItems }] =
        await Promise.all([
            client.getEntries<IRecipe>({ content_type: 'recipe' }),
            client.getEntries<IHomepage>({ content_type: 'homepage' }),
        ]);

    return {
        props: {
            recipe: recipeItems,
            homepageData: homepageItems[0],
        },
        revalidate: 10,
    };
};

export default Home;

// const resa = await fetch(
//     `https://cdn.contentful.com/spaces/tyfq63c2cv6i/environments/master/content_types/recipe?access_token=8vVV70QWvNUOVo4u5E1raH7JodHrLoFx6tnAUx3VhQ8`

// /spaces/{space_id}/environments/{environment_id}/entries?access_token={access_token}&include={value}&content_type={content_type}&fields.{linking_field}.sys.id={target_entry_id}
