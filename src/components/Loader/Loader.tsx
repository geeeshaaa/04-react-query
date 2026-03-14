// src/components/Loader/Loader.tsx
import css from './Loader.module.css';

export const Loader = () => {
  return (
    <div className={css.wrapper}>
      <p className={css.text}>Loading movies, please wait...</p>
    </div>
  );
};