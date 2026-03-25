import { useParams } from 'react-router-dom';
import { blogs } from '../data/blogs';

function BlogDetails() {
  const params = useParams();
  const id = Number(params.id);

  let selected = null;

  for (let i = 0; i < blogs.length; i = i + 1) {
    if (blogs[i].id === id) {
      selected = blogs[i];
    }
  }

  if (!selected) {
    return (
      <div className="box">
        <h2>Blog Not Found</h2>
      </div>
    );
  }

  return (
    <div className="box">
      <h2>{selected.title}</h2>
      <p>{selected.content}</p>
    </div>
  );
}

export default BlogDetails;
