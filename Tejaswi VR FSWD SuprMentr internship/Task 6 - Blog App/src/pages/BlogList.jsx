import { Link } from 'react-router-dom';
import { blogs } from '../data/blogs';

function BlogList() {
  return (
    <div className="box">
      <h2>Blogs List</h2>
      <ul>
        {blogs.map(function (item) {
          return (
            <li key={item.id}>
              <Link to={'/blog/' + item.id}>{item.title}</Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default BlogList;
