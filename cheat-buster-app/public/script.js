import { searchUser } from './api.js';

const form = document.getElementById('search-form');
const inputEmail = document.getElementById('search-input-email');
const inputName = document.getElementById('search-input-name');
const button = document.getElementById('search-button');
const results = document.getElementById('results-container');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  results.innerHTML = 'Searching...';
  button.disabled = true;
  button.textContent = 'Searching...';

  try {
    const user = await searchUser({
      email: inputEmail.value,
      name: inputName.value
    });

    results.innerHTML = `
      <div class="card">
        <img src="${user.picture}" alt="User" />
        <h3>BUSTED!</h3>
        <p>${user.firstName} ${user.lastName} (${user.age})</p>
        <p>${user.city}</p>
      </div>
    `;
  } catch (err) {
    if (err.response?.status === 404) {
      results.innerHTML = `<p class="safe">${err.response.data.message}</p>`;
    } else if (err.response?.status === 400) {
      results.innerHTML = `<p class="error">${err.response.data.error}</p>`;
    } else {
      results.innerHTML = `<p class="error">Server error.</p>`;
    }
  } finally {
    button.disabled = false;
    button.textContent = 'Search';
  }
});
