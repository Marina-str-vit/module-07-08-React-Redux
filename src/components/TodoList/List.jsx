import { useDispatch, useSelector } from 'react-redux';
import Item from './Item';
import s from './TodoList.module.css';
import { useState } from 'react';
import Modal from '../Modal/Modal';
import TodoForm from '../TodoForm';
import { editTodo } from '../../redux/todoOptions';

export const List = () => {
  const todos = useSelector(state => state.todos.items);
  const filter = useSelector(state => state.filter.filter);
  const filteredData = todos.filter(item => item.todo.toLowerCase().includes(filter.toLowerCase()));
  const [isOpen, setIsOpen] = useState(false);
  const [item, setItem] = useState();
  const dispatch = useDispatch();
  return (
    <ul className={s.list}>
      {filteredData.map(item => (
        <Item
          {...item}
          key={item.id}
          edit={() => {
            setItem(item);
            setIsOpen(true);
          }}
        />
      ))}
      {isOpen && (
        <Modal>
          <TodoForm
            initialValues={item}
            handleSubmit={values => {
              dispatch(editTodo({ ...item, ...values }));
              setIsOpen(false);
            }}
          />
        </Modal>
      )}
    </ul>
  );
};