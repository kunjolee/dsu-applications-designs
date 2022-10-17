import Link from 'next/link';
import Image from 'next/image';

import { Entry } from 'contentful';
import { IRecipe } from '../../contentfulTypes';

import styles from './RecipeCard.module.css';

interface Props {
    recipe: Entry<IRecipe>;
}

const RecipeCard = ({ recipe }: Props) => {
    const { title, slug, cookingTime, thumbnail, textMinsToCook, seeMoreText } =
        recipe.fields;

    return (
        <div className={styles.recipe__card}>
            <div className={styles.recipe__featured}>
                <Image
                    src={`https:${thumbnail.fields.file.url}`}
                    width={thumbnail.fields.file.details.image?.width}
                    height={thumbnail.fields.file.details.image?.height}
                    alt={title}
                />
            </div>
            <div className={styles.recipe__content}>
                <div className={styles.recipe__info}>
                    <h2>{title}</h2>
                    <p>
                        {textMinsToCook}
                        {cookingTime}
                    </p>
                </div>
                <div className={styles.recipe__actions}>
                    <Link href={`/recipes/${slug}`} passHref>
                        <a>{seeMoreText}</a>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default RecipeCard;
