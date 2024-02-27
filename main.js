window.addEventListener('load', () => {
	const form = document.querySelector("#new-task-form");
	const input = document.querySelector("#new-task-input");
	const costinput = document.querySelector("#new-task-cost");
	const categoryinput = document.querySelector("#new-task-category");
	const list_el = document.querySelector("#tasks");
	const apiUrl = 'https://crudcrud.com/api/394adcc78bc141fbbb98a07024fa03e2/tasks';

	// Function to fetch tasks from API and display
	async function fetchAndDisplayTasks() {
		try {
			const response = await fetch(apiUrl);
			if (!response.ok) {
				throw new Error('Failed to fetch tasks');
			}
			const tasks = await response.json();
			list_el.innerHTML = ''; // Clear existing tasks
			tasks.forEach(task => {
				const task_el = createTaskElement(task);
				list_el.appendChild(task_el);
			});
		} catch (error) {
			console.error('Error fetching tasks:', error);
		}
	}

	// Function to create task element
	function createTaskElement(task) {
		const task_el = document.createElement('div');
		task_el.classList.add('task');

		const task_content_el = document.createElement('div');
		task_content_el.classList.add('content');

		const task_input_el = document.createElement('input');
		task_input_el.classList.add('text');
		task_input_el.type = 'text';
		task_input_el.value = task.task;
		task_input_el.setAttribute('readonly', 'readonly');

		const task_costinput_el = document.createElement('input');
		task_costinput_el.classList.add('text');
		task_costinput_el.type = 'number';
		task_costinput_el.value = task.cost;
		task_costinput_el.setAttribute('readonly', 'readonly');

		const task_categoryinput_el = document.createElement('input');
		task_categoryinput_el.classList.add('text');
		task_categoryinput_el.type = 'text';
		task_categoryinput_el.value = task.category;
		task_categoryinput_el.setAttribute('readonly', 'readonly');

		task_content_el.appendChild(task_input_el);
		task_content_el.appendChild(task_costinput_el);
		task_content_el.appendChild(task_categoryinput_el);

		const task_actions_el = document.createElement('div');
		task_actions_el.classList.add('actions');

		const task_edit_el = document.createElement('button');
		task_edit_el.classList.add('edit');
		task_edit_el.innerText = 'Edit';

		const task_delete_el = document.createElement('button');
		task_delete_el.classList.add('delete');
		task_delete_el.innerText = 'Delete';

		task_actions_el.appendChild(task_edit_el);
		task_actions_el.appendChild(task_delete_el);

		task_el.appendChild(task_content_el);
		task_el.appendChild(task_actions_el);

		// Event listener for editing task
		task_edit_el.addEventListener('click', async () => {
			if (task_edit_el.innerText.toLowerCase() === 'edit') {
				task_edit_el.innerText = 'Save';
				task_input_el.removeAttribute('readonly');
				task_input_el.focus();
				task_costinput_el.removeAttribute('readonly');
				task_costinput_el.focus();
				task_categoryinput_el.removeAttribute('readonly');
				task_categoryinput_el.focus();
			} else {
				task_edit_el.innerText = 'Edit';
				task_input_el.setAttribute('readonly', 'readonly');
				task_costinput_el.setAttribute('readonly', 'readonly');
				task_categoryinput_el.setAttribute('readonly', 'readonly');
				// Update task on server
				try {
					const updatedTask = {
						task: task_input_el.value,
						cost: task_costinput_el.value,
						category: task_categoryinput_el.value
					};
					const response = await fetch(`${apiUrl}/${task._id}`, {
						method: 'PUT',
						headers: {
							'Content-Type': 'application/json'
						},
						body: JSON.stringify(updatedTask)
					});
					if (!response.ok) {
						throw new Error('Failed to update task');
					}
				} catch (error) {
					console.error('Error updating task:', error);
				}
			}
		});

		// Event listener for deleting task
		task_delete_el.addEventListener('click', async () => {
			// Delete task from server
			try {
				const response = await fetch(`${apiUrl}/${task._id}`, {
					method: 'DELETE'
				});
				if (!response.ok) {
					throw new Error('Failed to delete task');
				}
				list_el.removeChild(task_el);
			} catch (error) {
				console.error('Error deleting task:', error);
			}
		});

		return task_el;
	}

	// Event listener for form submission
	form.addEventListener('submit', async (e) => {
		e.preventDefault();
		const task = input.value;
		const cost = costinput.value;
		const category = categoryinput.value;
		// Create task on server
		try {
			const response = await fetch(apiUrl, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ task, cost, category })
			});
			if (!response.ok) {
				throw new Error('Failed to create task');
			}
			const newTask = await response.json();
			const task_el = createTaskElement(newTask);
			list_el.appendChild(task_el);
			input.value = '';
			costinput.value = '';
			categoryinput.value = '';
		} catch (error) {
			console.error('Error creating task:', error);
		}
	});

	// Fetch and display tasks on page load
	fetchAndDisplayTasks();
});