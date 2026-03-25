
const components = [
    {
        name: "App",
        type: "Layout",
        description: "The root component that wraps the entire YouTube page.",
        children: ["Navbar", "Sidebar", "MainContent"]
    },
    {
        name: "Navbar",
        type: "Navigation",
        description: "Top bar with the logo, search box, and user icons. Always stays at the top.",
        children: ["Logo", "SearchBar", "UserMenu"]
    },
    {
        name: "Logo",
        type: "UI Element",
        description: "YouTube logo on the top-left. Clicking it takes you to the home page.",
        children: []
    },
    {
        name: "SearchBar",
        type: "Input",
        description: "Text input with a search button. Users type keywords to find videos.",
        children: []
    },
    {
        name: "UserMenu",
        type: "UI Element",
        description: "Icons for upload, notifications, and the profile picture on the top-right.",
        children: []
    },
    {
        name: "Sidebar",
        type: "Navigation",
        description: "Left panel with links like Home, Shorts, Subscriptions, Library, etc.",
        children: ["SidebarItem"]
    },
    {
        name: "SidebarItem",
        type: "UI Element",
        description: "A single clickable link in the sidebar with an icon and label.",
        children: []
    },
    {
        name: "MainContent",
        type: "Layout",
        description: "The main area that shows video content. Changes based on the page.",
        children: ["CategoryBar", "VideoGrid"]
    },
    {
        name: "CategoryBar",
        type: "Navigation",
        description: "Horizontal row of filter chips like 'All', 'Music', 'Gaming', etc.",
        children: ["CategoryChip"]
    },
    {
        name: "CategoryChip",
        type: "UI Element",
        description: "A single filter button in the category bar. Clicking it filters videos.",
        children: []
    },
    {
        name: "VideoGrid",
        type: "Layout",
        description: "Grid layout showing all the video thumbnails on the homepage.",
        children: ["VideoCard"]
    },
    {
        name: "VideoCard",
        type: "Content",
        description: "One video tile showing the thumbnail, title, channel name, views, and upload time.",
        children: ["Thumbnail", "VideoInfo"]
    },
    {
        name: "Thumbnail",
        type: "UI Element",
        description: "The video preview image with the duration overlay on the bottom-right.",
        children: []
    },
    {
        name: "VideoInfo",
        type: "Content",
        description: "Text section below the thumbnail with the channel avatar, video title, channel name, and view count.",
        children: []
    }
];

function buildTree() {
    const treeBox = document.getElementById("tree");
    let html = "";

    const lines = [
        { text: "App", depth: 0 },
        { text: "├── Navbar", depth: 1 },
        { text: "│   ├── Logo", depth: 2 },
        { text: "│   ├── SearchBar", depth: 2 },
        { text: "│   └── UserMenu", depth: 2 },
        { text: "├── Sidebar", depth: 1 },
        { text: "│   └── SidebarItem (repeated)", depth: 2 },
        { text: "└── MainContent", depth: 1 },
        { text: "    ├── CategoryBar", depth: 2 },
        { text: "    │   └── CategoryChip (repeated)", depth: 3 },
        { text: "    └── VideoGrid", depth: 2 },
        { text: "        └── VideoCard (repeated)", depth: 3 },
        { text: "            ├── Thumbnail", depth: 4 },
        { text: "            └── VideoInfo", depth: 4 }
    ];

    for (let i = 0; i < lines.length; i++) {
        let line = lines[i].text;
        let name = line.replace(/[├└│─\s\(\)repeated]/g, "").trim();

        for (let j = 0; j < components.length; j++) {
            if (line.indexOf(components[j].name) !== -1) {
                line = line.replace(components[j].name, '<span class="label">' + components[j].name + '</span>');
                break;
            }
        }
        html += line + "\n";
    }

    treeBox.innerHTML = html;
}

function displayComponents() {
    const container = document.getElementById("components");
    let html = "";

    for (let i = 0; i < components.length; i++) {
        let comp = components[i];

        html += '<div class="comp-card">';
        html += '<h3>' + comp.name + '</h3>';
        html += '<span class="tag">' + comp.type + '</span>';
        html += '<p>' + comp.description + '</p>';

        if (comp.children.length > 0) {
            html += '<div class="children">Children: ';
            for (let j = 0; j < comp.children.length; j++) {
                if (j > 0) html += ", ";
                html += '<span>' + comp.children[j] + '</span>';
            }
            html += '</div>';
        }

        html += '</div>';
    }

    container.innerHTML = html;
}

function displaySummary() {
    const container = document.getElementById("summary");

    let typeCounts = {};
    for (let i = 0; i < components.length; i++) {
        let type = components[i].type;
        if (typeCounts[type]) {
            typeCounts[type]++;
        } else {
            typeCounts[type] = 1;
        }
    }

    let parentCount = 0;
    let leafCount = 0;
    for (let i = 0; i < components.length; i++) {
        if (components[i].children.length > 0) {
            parentCount++;
        } else {
            leafCount++;
        }
    }

    let html = "<table>";
    html += "<tr><th>Metric</th><th>Value</th></tr>";
    html += "<tr><td>Website Analyzed</td><td>YouTube (Homepage)</td></tr>";
    html += "<tr><td>Total Components</td><td>" + components.length + "</td></tr>";
    html += "<tr><td>Parent Components</td><td>" + parentCount + "</td></tr>";
    html += "<tr><td>Leaf Components (no children)</td><td>" + leafCount + "</td></tr>";

    let types = Object.keys(typeCounts);
    for (let i = 0; i < types.length; i++) {
        html += "<tr><td>" + types[i] + " Components</td><td>" + typeCounts[types[i]] + "</td></tr>";
    }

    html += "</table>";
    container.innerHTML = html;
}

buildTree();
displayComponents();
displaySummary();
