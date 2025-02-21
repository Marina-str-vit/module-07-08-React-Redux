import { useDispatch } from 'react-redux';
import s from './TodoList.module.css';
import { setFilter } from '../../redux/filterSlice';

export const SearchBar = () => {
  const dispatch = useDispatch();
  return (
    <div className={s.wrapperSearch}>
      <input onChange={e => dispatch(setFilter(e.target.value))} type='text' placeholder='Search...' />
    </div>
  );
};
