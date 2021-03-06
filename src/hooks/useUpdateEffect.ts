import { useEffect } from 'react';

import useIsFirstRender from './useIsFirstRender';

const useUpdateEffect = (effect: React.EffectCallback, deps?: React.DependencyList): void => {
	const isFirst = useIsFirstRender();

	useEffect(() => {
		if (!isFirst) {
			return effect();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, deps);
};

export default useUpdateEffect;
