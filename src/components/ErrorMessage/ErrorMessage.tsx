import css from './ErrorMessage.module.css';

export const ErrorMessage = ()=>{
  return (
    <div className={css.wrapper}>
      <p className={css.text}>There was an error, please try again...</p>
    </div>
  );
};