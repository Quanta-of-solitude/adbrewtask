import './App.css';
import { TodoHandler } from './components/todoHandler';

export function App() {
  const { fields,setFields,l1,setList,apiURL,fieldsHandler,submissionHandler } = TodoHandler()

  
  return (
    <div className="App">
      <img
        id="logo"
        src="https://adbrew.io/wp-content/assets/images/v2/logo.svg"
        alt="logo"
        height="100" width="100"
      />
      <div className="outerBox">
        <div className="todosList">
        <form className="addTask" onSubmit={submissionHandler}>
         
          <input
            type="text"
            id="task"
            name="task"
            placeholder="Add a new task!"
            autoComplete="off"
            onChange={fieldsHandler}
            value={fields.task}
          />
          <button type="submit">Add Task</button>
        </form>
        <br></br>
          <h1>List of TODOs</h1>
          {l1.length === 0 && <p>Empty list here</p>}
          <ul class="list-group">
            {l1.map((data, index) => (
              <li class="list-group-item" key={index}>
                <span>{data.task}</span>
                
              </li>
            ))}
          </ul>
          
        </div>
        
      </div>
    </div>
  );
}
export default App;
