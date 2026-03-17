const Filters = ({
  categories,
  subcategories,
  tags,
  selectedCategory,
  selectedSubcategory,
  selectedTag,
  onCategoryChange,
  onSubcategoryChange,
  onTagChange,
}) => {
  return (
    <section className="filter-grid" aria-label="Blog filters">
      <label>
        Category
        <select value={selectedCategory} onChange={(event) => onCategoryChange(event.target.value)}>
          <option value="">All categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </label>

      <label>
        Subcategory
        <select value={selectedSubcategory} onChange={(event) => onSubcategoryChange(event.target.value)}>
          <option value="">All subcategories</option>
          {subcategories.map((subcategory) => (
            <option key={subcategory} value={subcategory}>
              {subcategory}
            </option>
          ))}
        </select>
      </label>

      <label>
        Tag
        <select value={selectedTag} onChange={(event) => onTagChange(event.target.value)}>
          <option value="">All tags</option>
          {tags.map((tag) => (
            <option key={tag} value={tag}>
              #{tag}
            </option>
          ))}
        </select>
      </label>
    </section>
  )
}

export default Filters
