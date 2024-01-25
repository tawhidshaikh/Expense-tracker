window.addEventListener('load', () => {
	const form = document.querySelector("#new-task-form");
	const input = document.querySelector("#new-task-input");
	const costinput = document.querySelector("#new-task-cost");
	const categoryinput = document.querySelector("#new-task-category");
	const list_el = document.querySelector("#tasks");

	form.addEventListener('submit', (e) => {
		e.preventDefault();

		const task = input.value;
		const cost = costinput.value;
		const category = categoryinput.value;

		const task_el = document.createElement('div');
		task_el.classList.add('task');
		task_el.classList.add('cost');
		task_el.classList.add('category');

		const task_content_el = document.createElement('div');
		task_content_el.classList.add('content');

		task_el.appendChild(task_content_el);

		const task_input_el = document.createElement('input');
		task_input_el.classList.add('text');
		task_input_el.type = 'text';
		task_input_el.value = task;
		task_input_el.setAttribute('readonly', 'readonly');
		const task_costinput_el = document.createElement('input');
		task_costinput_el.classList.add('text');
		task_costinput_el.type = 'number';
		task_costinput_el.value = cost;
		task_costinput_el.setAttribute('readonly', 'readonly');
		const task_categoryinput_el = document.createElement('input');
		task_categoryinput_el.classList.add('text');
		task_categoryinput_el.type = 'text';
		task_categoryinput_el.value = category;
		task_categoryinput_el.setAttribute('readonly', 'readonly');
		
		task_content_el.appendChild(task_costinput_el);
		task_content_el.appendChild(task_input_el);
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

		task_el.appendChild(task_actions_el);

		list_el.appendChild(task_el);

		input.value = '';
		costinput.value = '';
		categoryinput.value = '';

		task_edit_el.addEventListener('click', (e) => {
			if (task_edit_el.innerText.toLowerCase() == "edit") {
				task_edit_el.innerText = "Save";
				task_input_el.removeAttribute("readonly");
				task_input_el.focus();
				task_costinput_el.removeAttribute("readonly");
				task_costinput_el.focus();
				task_categoryinput_el.removeAttribute("readonly");
				task_categoryinput_el.focus();
			} else {
				task_edit_el.innerText = "Edit";
				task_input_el.setAttribute("readonly", "readonly");
				task_costinput_el.setAttribute("readonly", "readonly");
				task_categoryinput_el.setAttribute("readonly", "readonly");
			}
		});

		task_delete_el.addEventListener('click', (e) => {
			list_el.removeChild(task_el);
		});
	});
});