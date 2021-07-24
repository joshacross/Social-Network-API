const $addToppingBtn = document.querySelector('#add-topping');
const $postForm = document.querySelector('#post-form');
const $customReactions = document.querySelector('#customReactions');

const handleAddTopping = event => {
  event.preventDefault();

  const thoughtValue = document.querySelector('#newThought').value;

  if (!thoughtValue) {
    return false;
  }

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.name = 'thought';
  checkbox.value = thoughtValue;
  checkbox.id = thoughtValue
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
  $customReactions.appendChild(divWrapper);

  thoughtValue.value = '';
};

const handlePostSubmit = event => {
  event.preventDefault();

  const postName = $postForm.querySelector('#post-name').value;
  const createdBy = $postForm.querySelector('#created-by').value;
  const friends = $postForm.querySelector('#post-size').value;
  const thoughts = [...$postForm.querySelectorAll('[name=topping]:checked')].map(topping => {
    return topping.value;
  });

  if (!postName || !createdBy || !thoughts.length) {
    return;
  }

  const formData = { postName, createdBy, size, thoughts };
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
