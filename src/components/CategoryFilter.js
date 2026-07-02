import PropTypes from 'prop-types';
import './styles/CategoryFilter.css';

function CategoryFilter({ categories, selectedCategory, onSelectCategory }) {
  return (
    <div className='category-filter' id='category-filter'>
      <h3 className='category-filter__title'>Kategori</h3>
      <div className='category-filter__chips'>
        <button
          type='button'
          className={`category-filter__chip ${selectedCategory === '' ? 'category-filter__chip--active' : ''}`}
          onClick={() => onSelectCategory('')}
        >
          Semua
        </button>
        {categories.map((category) => (
          <button
            type='button'
            key={category}
            className={`category-filter__chip ${selectedCategory === category ? 'category-filter__chip--active' : ''}`}
            onClick={() => onSelectCategory(category)}
          >
            #{category}
          </button>
        ))}
      </div>
    </div>
  );
}

CategoryFilter.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedCategory: PropTypes.string.isRequired,
  onSelectCategory: PropTypes.func.isRequired,
};

export default CategoryFilter;
