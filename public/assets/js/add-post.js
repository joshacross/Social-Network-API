const $addToppingBtn = document.querySelector('#add-topping');
const $postForm = document.querySelector('#post-form');
const $customToppingsList = document.querySelector('#custom-toppings-list');

const handleAddTopping = event => {
  event.preventDefault();

  const toppingValue = document.querySelector('#new-topping').value;

  if (!toppingValue) {
    return false;
  }

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.name = 'topping';
  checkbox.value = toppingValue;
  checkbox.id = toppingValue
    .toLowerCase()
    .split(' ')
    .join('-');

  const label = document.createElement('label');
  label.textContent = toppingValue;
  label.htmlFor = toppingValue
    .toLowerCase()
    .split(' ')
    .join('-');

  const divWrapper = document.createElement('div');

  divWrapper.appendChild(checkbox);
  divWrapper.appendChild(label);
  $customToppingsList.appendChild(divWrapper);

  toppingValue.value = '';
};

const handlePostSubmit = event => {
  event.preventDefault();

  const postName = $postForm.querySelector('#post-name').value;
  const createdBy = $postForm.querySelector('#created-by').value;
  const size = $postForm.querySelector('#post-size').value;
  const toppings = [...$postForm.querySelectorAll('[name=topping]:checked')].map(topping => {
    return topping.value;
  });

  if (!postName || !createdBy || !toppings.length) {
    return;
  }

  const formData = { postName, createdBy, size, toppings };
  fetch('/api/posts', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(formData)
  })
    .then(response => response.json())
    .then(postResponse => {
      alert('Post created successfully!');
      console.log(postResponse);
    })
    .catch(err => {
      console.log(err);
      saveRecord(formData);
    });
};

$postForm.addEventListener('submit', handlePostSubmit);
$addToppingBtn.addEventListener('click', handleAddTopping);
