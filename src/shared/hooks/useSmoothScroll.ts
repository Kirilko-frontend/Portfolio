import { useEffect } from 'react';

import { startLenis } from '@shared/lib/lenis';

const useSmoothScroll = () => {
  useEffect(() => startLenis(), []);
};

export default useSmoothScroll;
