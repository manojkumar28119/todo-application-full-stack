import { MdDeleteOutline } from "react-icons/md"; // Importing the delete icon from react-icons
 import "./index.css"; // Importing CSS styles for the component
 

// TodoItem component, which receives a todo item as a prop
const TodoItem = (props) => {
  const { item,onChangeStatus,onClickDeleteBtn } = props; // Destructuring the item from props
  let { todo, is_completed, id } = item; // Destructuring text, isChecked, and id from item
  
  console.log(item)

  if(is_completed === "false")
  {
    is_completed = false
  }else if(is_completed === "true"){
    is_completed = true
  }
 
  // Event handler for changing the checkbox state
  const onChangeCheckBox = () => {
    onChangeStatus(id,is_completed)
   };

  // Event handler for deleting the todo item
  const onClickDelete = () => {
    onClickDeleteBtn(id)
   };

  return (
    <li className="todo-item-container">
      {/* Checkbox for marking the todo as completed */}
      <input
        type="checkbox"
        id={`checkbox${id}`}
        className="checkbox-input"
        onChange={onChangeCheckBox}
        checked={is_completed} // Control the checkbox state based on isChecked
      />
      <div className="label-container">
        {/* Label showing the text of the todo item */}
        <label
          htmlFor={`checkbox${id}`}
          className={`checkbox-label ${is_completed && 'checked'}`} // Add 'checked' class if the item is checked
        >
          {todo}
        </label>
        {/* Container for the delete icon */}
        <div className="delete-icon-container" onClick={onClickDelete}>
          <MdDeleteOutline /> {/* Delete icon */}
        </div>
      </div>
    </li>
  );
};

export default TodoItem;
