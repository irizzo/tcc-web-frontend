'use client'; // Error components must be Client Components

import { GeneralError } from '@/components/Messages';
import { useEffect } from 'react';

export default function Error({ error, reset }) {
	useEffect(() => {
		// Log the error to an error reporting service
		console.error(error);
	}, [ error ]);

	return (
		<div>
			<GeneralError errorContent={JSON.stringify(error)} />
			<button
				onClick={
					// Attempt to recover by trying to re-render the segment
					() => reset()
				}
			>
				Try again
			</button>
		</div>
	);
}