import './index.css';
import useCVI from '../../hooks/useCVI'
import { Link } from 'react-router-dom';

const ListMenu = () => {
  let listItem;
  const menu = useCVI({ 'atribute': 'menu' });
  if (!Array.isArray(menu)) {
    listItem =
      menu?.row.map(data =>
        <li key={data.id} className="li-list">
          <Link to={data.name} className="nav-list">{data.name}</Link>
        </li>
      )
  }


  return (
    <div>
      <ul className='ul-list'>{listItem}</ul>
    </div>
  )
}

export default ListMenu;