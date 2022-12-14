import { useEffect, useState } from 'react';
import { Animal, IBreedListAPIResponse } from '../APIResponsesTypes';

const localCache: {
	[index: string]: string[];
} = {};

type Status = 'unloaded' | 'loading' | 'loaded';

export default function useBreedList(animal: Animal): [string[], Status] {
	const [breedList, setBreedList] = useState([] as string[]);
	const [status, setStatus] = useState('unloaded' as Status);

	useEffect(() => {
		if (!animal) {
			setBreedList([]);
		} else if (localCache[animal]) {
			setBreedList(localCache[animal]);
		} else {
			// eslint-disable-next-line no-use-before-define
			requestBreedList();
		}

		async function requestBreedList() {
			setBreedList([]);
			setStatus('loading');
			const res = await fetch(`https://pets-v2.dev-apis.com/breeds?animal=${animal}`);
			const json = (await res.json()) as IBreedListAPIResponse;
			localCache[animal] = json.breeds || [];
			setBreedList(localCache[animal]);
			setStatus('loaded');
		}
	}, [animal]);
	return [breedList, status];
}
