import styles from './Skeleton.module.css';

const Skeleton = () => {
    return (
        <div data-testid='skeleton-test' className={styles.skeleton}>
            <div className={styles.skeleton__banner}></div>
            <div className={styles.skeleton__header}></div>
            <div className={styles.skeleton__content}></div>
            <div className={styles.skeleton__content}></div>
            <div className={styles.skeleton__content}></div>
        </div>
    );
};
export default Skeleton;
