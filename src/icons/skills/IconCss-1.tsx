import type { IconProps } from '@/types/icons';

const IconCss1 = (props: IconProps) => {
  const { className } = props;

  return (
    <svg
      className={className}
      width="448"
      height="512"
      viewBox="0 0 448 512"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M0 0L40.8 460.8L224 512L407.136 460.832L448 0H0Z" fill="#2196F3" />
      <path
        d="M360.768 150.688L355.616 208.576L340.064 382.112L224 414.208L223.904 414.24L107.904 382.112L99.8078 291.36H156.64L160.864 338.432L223.936 355.456L223.968 355.424L287.136 338.4L295.744 259.968L97.0878 260.512L91.4558 206.88L300.512 204.416L304.736 147.008L85.8558 147.616L82.1758 94.208H365.824L360.768 150.688Z"
        fill="#FAFAFA"
      />
    </svg>
  );
};

export default IconCss1;
