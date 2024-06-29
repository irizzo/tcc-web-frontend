// import { GeneralError } from '@/components/Messages';
import { listAllTasksService } from '@/services/taskServices';

export async function getAllTasks(setTasks) {
	console.log('[getAllTasks] [utils]');

	try {
		const res = await listAllTasksService();

		console.log('[getAllTasks] res.message = ', res.message);

		if (!res.success) setTasks([]);

		setTasks(...res.result);

		// if(!res.success) return [];

		// return res.result;
	} catch (error) {
		throw error;
	}
}