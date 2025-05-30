const form = document.getElementById('form');
const entriesTable = document.getElementById('entriesTable').querySelector('tbody');

const getAge = (dob) => {
  const today = new Date();
  const birthDate = new Date(dob);
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

const isValidAge = (dob) => {
  const age = getAge(dob);
  return age >= 18 && age <= 55;
};

const getData = () => {
  const data = localStorage.getItem('user-entries');
  return data ? JSON.parse(data) : [];
};

const showEntries = () => {
  const entries = getData();
  entriesTable.innerHTML = '';
  entries.forEach(entry => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${entry.name}</td>
      <td>${entry.email}</td>
      <td>${entry.password}</td>
      <td>${entry.dob}</td>
      <td>${entry.accepted ? 'true' : 'false'}</td>
    `;
    entriesTable.appendChild(row);
  });
};

form.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();
  const dob = document.getElementById('dob').value;
  const accepted = document.getElementById('acceptTerms').checked;

  if (!isValidAge(dob)) {
    alert('Date of Birth must be between age 18 and 55.');
    return;
  }

  const entry = { name, email, password, dob, accepted };
  const entries = getData();
  entries.push(entry);
  localStorage.setItem('user-entries', JSON.stringify(entries));
  showEntries();
  form.reset();
});

document.addEventListener('DOMContentLoaded', showEntries);
