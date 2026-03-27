let treeData = [];
let expandedNodes = {};
let searchQuery = '';

const loadBtn = document.getElementById('loadBtn');
const resetBtn = document.getElementById('resetBtn');
const searchInput = document.getElementById('searchInput');
const statusMessage = document.getElementById('statusMessage');
const loader = document.getElementById('loader');
const treeContainer = document.getElementById('treeContainer');

loadBtn.addEventListener('click', loadData);
resetBtn.addEventListener('click', resetTree);
searchInput.addEventListener('input', function() {
  searchQuery = this.value.toLowerCase().trim();
  renderTree();
});

function setStatus(text) {
  statusMessage.textContent = text;
}

function showLoader() {
  loader.classList.remove('hidden');
}

function hideLoader() {
  loader.classList.add('hidden');
}

function getFileIcon(fileName) {
  if (fileName.includes('.pdf')) return '📄';
  if (fileName.includes('.txt')) return '📝';
  if (fileName.includes('.json')) return '⚙️';
  if (fileName.includes('.html') || fileName.includes('.css')) return '🌐';
  if (fileName.includes('.img')) return '🖼️';
  return '📋';
}

function createMockFolderTree(users) {
  const tree = [];
  for (let i = 0; i < users.length && i < 5; i = i + 1) {
    const user = users[i];
    tree.push({
      id: 'user-' + user.id,
      name: user.name + ' (ID: ' + user.id + ')',
      type: 'folder',
      expanded: false,
      children: [
        {
          id: 'projects-' + user.id,
          name: 'Projects',
          type: 'folder',
          expanded: false,
          children: [
            { id: 'proj1-' + user.id, name: 'Project Plan.pdf', type: 'file' },
            { id: 'proj2-' + user.id, name: 'Design Draft.txt', type: 'file' },
            { id: 'proj3-' + user.id, name: 'config.json', type: 'file' }
          ]
        },
        {
          id: 'docs-' + user.id,
          name: 'Documents',
          type: 'folder',
          expanded: false,
          children: [
            { id: 'doc1-' + user.id, name: 'Meeting Notes.txt', type: 'file' },
            { id: 'doc2-' + user.id, name: 'Task List.pdf', type: 'file' }
          ]
        },
        {
          id: 'assets-' + user.id,
          name: 'Assets',
          type: 'folder',
          expanded: false,
          children: [
            { id: 'img1-' + user.id, name: 'logo.img', type: 'file' },
            { id: 'img2-' + user.id, name: 'banner.img', type: 'file' }
          ]
        },
        { id: 'readme-' + user.id, name: 'README.txt', type: 'file' }
      ]
    });
  }
  return tree;
}

function toggleNode(nodeId) {
  expandedNodes[nodeId] = !expandedNodes[nodeId];
  renderTree();
}

function renderTree() {
  treeContainer.innerHTML = '';
  if (treeData.length === 0) {
    treeContainer.innerHTML = '<p class="empty-state">No data loaded. Click "Load Folder Tree" to start.</p>';
    return;
  }
  for (let i = 0; i < treeData.length; i = i + 1) {
    const nodeHtml = renderNode(treeData[i], 0);
    treeContainer.innerHTML = treeContainer.innerHTML + nodeHtml;
  }
}

function renderNode(node, depth) {
  const matches = searchQuery === '' || node.name.toLowerCase().includes(searchQuery);
  const isExpanded = expandedNodes[node.id];
  const isFolder = node.type === 'folder';
  
  let html = '';
  html = html + '<div class="tree-node" style="margin-left: ' + (depth * 20) + 'px;">';
  
  if (isFolder) {
    html = html + '<div class="tree-item">';
    html = html + '<button class="toggle-btn" data-id="' + node.id + '">';
    html = html + (isExpanded ? '▼' : '▶') + ' 📁 ' + node.name;
    html = html + '</button>';
    html = html + '</div>';
    
    if (isExpanded && node.children) {
      for (let i = 0; i < node.children.length; i = i + 1) {
        html = html + renderNode(node.children[i], depth + 1);
      }
    }
  } else {
    const icon = getFileIcon(node.name);
    html = html + '<div class="tree-item file-item">';
    html = html + '<span class="file-name">' + icon + ' ' + node.name + '</span>';
    html = html + '</div>';
  }
  
  html = html + '</div>';
  return html;
}

function loadData() {
  showLoader();
  setStatus('Loading folder structure...');
  
  fetch('https://jsonplaceholder.typicode.com/users')
    .then(function (response) {
      return response.json();
    })
    .then(function (users) {
      treeData = createMockFolderTree(users);
      expandedNodes = {};
      hideLoader();
      setStatus('Folder tree loaded. Click folders to expand.');
      renderTree();
      attachToggleListeners();
    })
    .catch(function () {
      hideLoader();
      setStatus('Error loading data. Please try again.');
    });
}

function resetTree() {
  treeData = [];
  expandedNodes = {};
  searchQuery = '';
  searchInput.value = '';
  treeContainer.innerHTML = '';
  setStatus('Tree reset. Ready for new data.');
}

function attachToggleListeners() {
  const toggleBtns = document.querySelectorAll('.toggle-btn');
  for (let i = 0; i < toggleBtns.length; i = i + 1) {
    toggleBtns[i].addEventListener('click', function() {
      const nodeId = this.getAttribute('data-id');
      toggleNode(nodeId);
      attachToggleListeners();
    });
  }
}
