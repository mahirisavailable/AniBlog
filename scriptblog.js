const animeBlogs = [
  {
    title: "Reze: Love, Lies and Explosions",
    description: "Exploring the mystery, tragedy, and deadly charm of the Bomb Devil.",
    page: "RezeBlog.html",
    tags: ["Chainsaw Man", "Devil", "Character Study"]
  },
  {
    title: "Doma: Brutality Disguised in Smile",
    description: "Exploring the chilling mind and overwhelming power of Upper Rank Two.",
    page: "DomaBlog.html",
    tags: ["Demon Slayer", "Demon", "Character Study"]
  },
  {
    title: "Toji Fushiguro: From Outcast to Legend",
    description: "The story of the man who defied the jujutsu world without cursed energy.",
    page: "TojiBlog.html",
    tags: ["Jujutsu Kaisen", "Physical Srength", "Character Study"]
  },
  {
    title: "Three Legends, One Bloodline: The Ackerman Trio",
    description: "Uncovering the legacy of Levi, Mikasa, and Kenny—the warriors of the Ackerman clan.",
    page: "AckermanBlog.html",
    tags: ["Attack on Titan", "Physical Srength", "Character Study"]
  }
];

const container = document.getElementById("container");
const searchInput = document.getElementById("searchInput");
const tagFilter = document.getElementById("tagFilter");
const blogCount = document.getElementById("blogCount");
const emptyState = document.getElementById("emptyState");

function populateTagFilter() {
  const uniqueTags = [...new Set(animeBlogs.flatMap((blog) => blog.tags))].sort();
  uniqueTags.forEach((tag) => {
    const option = document.createElement("option");
    option.value = tag.toLowerCase();
    option.textContent = tag;
    tagFilter.appendChild(option);
  });
}

function createCard(blog) {
  const card = document.createElement("article");
  card.className = "card";

  card.innerHTML = `
    <h2>${blog.title}</h2>
    <p>${blog.description}</p>
    <div class="tags">
      ${blog.tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}
    </div>
  `;

  if (blog.page) {
    card.addEventListener("click", () => {
      window.open(blog.page, "noopener");
    });
  }

  return card;
}

function render() {
  const query = searchInput.value.trim().toLowerCase();
  const tag = tagFilter.value;

  const filtered = animeBlogs.filter((blog) => {
    const inTitle = blog.title.toLowerCase().includes(query);
    const inTags = blog.tags.join(" ").toLowerCase().includes(query);
    const matchesTag = tag === "all" || blog.tags.some((item) => item.toLowerCase() === tag);
    return (inTitle || inTags) && matchesTag;
  });

  container.innerHTML = "";
  filtered.forEach((blog) => {
    container.appendChild(createCard(blog));
  });

  blogCount.textContent = String(animeBlogs.length);
  emptyState.hidden = filtered.length !== 0;
}

populateTagFilter();
render();

searchInput.addEventListener("input", render);
tagFilter.addEventListener("change", render);