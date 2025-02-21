import { Field, Form, Formik } from 'formik';

const TodoForm = ({ initialValues, handleSubmit, text = 'add' }) => {
  return (
    <div>
      <Formik enableReinitialize initialValues={initialValues} onSubmit={handleSubmit}>
        <Form>
          <Field name='todo' placeholder='placeholder' />
          <button type='submit'>{text}</button>
        </Form>
      </Formik>
    </div>
  );
};
export default TodoForm;