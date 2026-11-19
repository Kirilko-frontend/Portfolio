import type { IconProps } from '@/types/icons';

const IconArrow1 = (props: IconProps) => {
  const { className } = props;
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M4 11h12.17l-5.58-5.59L12 4l8 8-8 8-1.41-1.41L16.17 13H4v-2z" />
    </svg>
  );
};

export default IconArrow1;
