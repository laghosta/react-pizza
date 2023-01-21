import React from 'react';
import ContentLoader from 'react-content-loader';
import styles from './PizzaItem.module.scss'

const Skeleton = () => (
    <ContentLoader
        className={styles.pizza}
        speed={2}
        width={330}
        height={455}
        viewBox="0 0 330 455"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb">
        <circle cx="165" cy="150" r="140" />
        <rect x="0" y="300" rx="10" ry="10" width="330" height="18" />
        <rect x="0" y="335" rx="10" ry="10" width="330" height="60" />
        <rect x="0" y="405" rx="10" ry="10" width="130" height="40" />
        <rect x="175" y="405" rx="24" ry="24" width="155" height="45" />
    </ContentLoader>
);
export default Skeleton