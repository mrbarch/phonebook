const inputName = document.getElementById('inputName');
const inputPhone = document.getElementById('inputPhone');
const add = document.getElementById('add');
const searchUsers = document.querySelector('.searchUsers');
const selectTag = document.querySelector('.select');
const options = document.querySelectorAll('option')
let users = [];

function addContact() {
	if (inputName.value == '' || inputPhone.value == '') {
		alert('Введи номер телефона или имя, сука!');

		return;
	}
	if (findDublicate()) {
		alert('такой номер уже существует! Проверьте ваши данные.');

		return;
	}
	pushContact();
}

function pushContact() {
	users.push({
		name: inputName.value,
		phone: inputPhone.value,
		tag: showTag(),
	});

	renderContacts();
}

console.log(users)

function renderContacts() {
	const content = document.querySelector('.container');

  content.innerHTML = '';
	const filteredUsers = filterUsers();
	document.querySelector('.count').innerHTML = filteredUsers.length;

	if (filteredUsers.length === 0) {
		content.innerHTML = 'Совпадений не найденно, попробуйте изменить поиск или изначально добавить контакт в телефонную книгу.';

		return;
	}

	for (const user of filteredUsers) {
		const personName = document.createElement('div');
		const personPhone = document.createElement('div');
		const personWrap = document.createElement('div');
		const deleteBtn = document.createElement('button');
		const personTag = document.createElement('div')

		personName.classList.add('personName');
		personPhone.classList.add('personPhone');
		personWrap.classList.add('personWrap');
		deleteBtn.classList.add('deleteBtn');
		personTag.classList.add('personTag')
		
		content.appendChild(personWrap);
		personWrap.appendChild(personName);
		personWrap.appendChild(personPhone);
		personWrap.appendChild(personTag)
		personWrap.appendChild(deleteBtn);

		deleteUser(deleteBtn, user);

		personName.innerHTML = user.name;
		personPhone.innerHTML = user.phone;
		personTag.innerHTML = user.tag; 
		deleteBtn.innerHTML = 'Удалить';

	}
}

add.addEventListener('click', function() {
	addContact();
	showTag()
});

searchUsers.addEventListener('input', function() {
	renderContacts()
});

function deleteUser(deleteBtn, user) {
	deleteBtn.addEventListener('click', () => {
		users = users.filter(foundUser => foundUser.phone !== user.phone);
		renderContacts();
	});
}

function filterUsers() {
	const term = searchUsers.value;

	return users.filter(user => user.phone.includes(term) || user.name.includes(term));
}

function findDublicate() {
	const phone = inputPhone.value;

	return users.find(user => user.phone.includes(phone));
}

function showTag() {
	let theSelect = demoForm.demoSelect;
	let tag = document.querySelectorAll('options');
	tag.innerHTML = (theSelect[theSelect.selectedIndex].text);
	let d = Array.from(tag);
	
	return d;
}

