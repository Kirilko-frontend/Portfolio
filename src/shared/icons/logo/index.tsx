import type { IconProps } from '@/types/icons';

const Logo = (props: IconProps) => {
  const { className } = props;

  return (
    <svg
      width="463"
      height="512"
      viewBox="0 0 463 512"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path d="M460.107 0H292.295L124.043 189.774V0H0V512H124.043V356.942L182.241 295.727L304.585 512H462.202L268.975 204.76L460.107 0Z" />
    </svg>
  );
};

export default Logo;
