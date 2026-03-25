let usersData = [];
let postsData = [];
let isLoaded = false;

const loadBtn = document.getElementById('loadBtn');
const searchInput = document.getElementById('searchInput');
const statusMessage = document.getElementById('statusMessage');
const loader = document.getElementById('loader');
const foldersContainer = document.getElementById('foldersContainer');

loadBtn.addEventListener('click', loadData);
searchInput.addEventListener('input', renderFolders);

function setStatus(text) {
  statusMessage.textContent = text;
}

function showLoader() {
  loader.classList.remove('hidden');
}

function hideLoader() {
  loader.classList.add('hidden');
}

function buildReadableFileName(user, post, fileNumber) {
  const typePool = [
    'Project Plan',
    'Meeting Notes',
    'Task List',
    'Progress Report',
    'Design Draft',
    'Testing Sheet'
  ];

  const topicPool = [
    'Website',
    'Mobile App',
    'Database',
    'API',
    'UI',
    'Testing'
  ];

  const typeIndex = (fileNumber - 1) % typePool.length;
  const topicIndex = (user.id + fileNumber - 1) % topicPool.length;

  return 'File ' + fileNumber + ' - ' + typePool[typeIndex] + ' (' + topicPool[topicIndex] + ') [ID ' + post.id + ']';
}

function loadData() {
  showLoader();
  setStatus('Retrieving data...');
  foldersContainer.innerHTML = '';

  Promise.all([
    fetch('https://jsonplaceholder.typicode.com/users'),
    fetch('https://jsonplaceholder.typicode.com/posts')
  ])
    .then(function (responses) {
      return Promise.all([responses[0].json(), responses[1].json()]);
    })
    .then(function (data) {
      usersData = data[0];
      postsData = data[1];
      isLoaded = true;
      hideLoader();
      setStatus('Data loaded successfully.');
      renderFolders();
    })
    .catch(function () {
      hideLoader();
      setStatus('Error loading data. Please try again.');
    });
}

function renderFolders() {
  if (!isLoaded) {
    return;
  }

  const query = searchInput.value.toLowerCase().trim();
  foldersContainer.innerHTML = '';

  for (let i = 0; i < usersData.length; i = i + 1) {
    const user = usersData[i];
    const folderBox = document.createElement('div');
    folderBox.className = 'folder';

    const folderTitle = document.createElement('h3');
    folderTitle.className = 'folder-title';
    folderTitle.textContent = 'Folder: ' + user.name;
    folderBox.appendChild(folderTitle);

    const fileList = document.createElement('ul');
    fileList.className = 'file-list';

    let foundCount = 0;
    let fileNumber = 1;

    for (let j = 0; j < postsData.length; j = j + 1) {
      const post = postsData[j];

      if (post.userId !== user.id) {
        continue;
      }

      const readableTitle = buildReadableFileName(user, post, fileNumber);
      const fileTitle = readableTitle.toLowerCase();

      if (query !== '' && fileTitle.indexOf(query) === -1) {
        fileNumber = fileNumber + 1;
        continue;
      }

      const fileItem = document.createElement('li');
      fileItem.className = 'file-item';
      fileItem.textContent = readableTitle;
      fileList.appendChild(fileItem);
      foundCount = foundCount + 1;
      fileNumber = fileNumber + 1;
    }

    if (foundCount === 0) {
      const emptyText = document.createElement('p');
      emptyText.className = 'empty';
      emptyText.textContent = 'No files found for this folder.';
      folderBox.appendChild(emptyText);
    } else {
      folderBox.appendChild(fileList);
    }

    foldersContainer.appendChild(folderBox);
  }
}
