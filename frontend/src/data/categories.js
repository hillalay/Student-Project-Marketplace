const categoryOptions = [
  { id: 1, name: "Web Development" },
  { id: 2, name: "Mobile Development" },
  { id: 3, name: "Artificial Intelligence" },
  { id: 4, name: "Data Science" },
  { id: 5, name: "Cyber Security" },
  { id: 6, name: "Game Development" },
];

function getCategoryIdByName(categoryName) {
  const category = categoryOptions.find(
    (item) => item.name === categoryName
  );

  return category ? category.id : "";
}

export { categoryOptions, getCategoryIdByName };
