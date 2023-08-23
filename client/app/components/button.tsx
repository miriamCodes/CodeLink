import styles from '../styles/button.module.css';

// Should I use interface or type here?
interface Properties {
  useCase: string;
  onClick?: () => void;
  form?: string;
  //className: string;
}

// Should this be formatted as a constant with <> instead?
// Do I need to include this React.JSX.Element syntax?
export default function Button({
  useCase,
  onClick, form /*className*/,
}: Properties) /*: React.JSX.Element*/ {
  return (
    <button className={styles.button} onClick={onClick} form={form}>
      {useCase}
    </button>
  );
}
