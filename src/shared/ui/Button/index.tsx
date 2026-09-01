import type { ButtonProps } from './button';

import styles from './styles.module.scss';

const Button = ({
  children,
  onClick,
  className = '',
  disabled,
  type = 'button',
  variant = 'primary',
  size = 'medium',
  fullWidth = false,
  active = false,
}: ButtonProps) => {
  const classes = [
    styles.button,
    styles[variant],
    styles[size],
    fullWidth ? styles.fullWidth : '',
    active ? styles.active : '',
    className,
  ].join(' ');

  return (
    <button className={classes} onClick={onClick} disabled={disabled} type={type}>
      {children}
    </button>
  );
};

export default Button;
