import React, { useState, useEffect, useCallback } from "react";
import { v4 as uuid } from "uuid";

const Code = ({ code }) => (
	<pre>
	  <code>{JSON.stringify(code, null, 4)}</code>
	</pre>
  );

  const useLocalStorage = (key, initialValue) => {
	const [value, setValue] = useState(initialValue);
  
	useEffect(() => {
	  const storedValue = JSON.parse(window.localStorage.getItem(key));
	  console.log(storedValue)
	  if (storedValue !==null) {
		setValue(storedValue)
	  }
	  setValue(storedValue);
	}, [key]);
  
	const storeValue = useCallback(
	  newValue => {
		window.localStorage.setItem(key, JSON.stringify(newValue));
		setValue(newValue);
	  },
	  [key]
	);
	return [value, storeValue];
  };

const App = () => {
	const [value, setValue] = useLocalStorage(true, uuid);
	const [todos, setTodos] = useState([
		{
			name: "Buy Milk",
			isChecked: true,
			id: uuid(),
		},
	]);
	return (
		<div>
			<h1>{value}</h1>
			<form
				onSubmit={event_ => {
					event_.preventDefault();
					setTodos([...todos, { name: value, isChecked: false, id: uuid() }]);
					setValue("");
				}}
			>
				<input
					type="text"
					value={value}
					onChange={event_ => {
						setValue(event_.target.value);
					}}
				/>
				<button disabled={!value} type="submit">
					Add
				</button>
			</form>
			<ul>
				{todos.map((todo, index) => {
					return (
						<li key={todo.id}>
							<label>
								<input
									type="checkbox"
									checked={todo.isChecked}
									onChange={() => {
										const update = [...todos];
										update[index].isChecked = !update[index].isChecked;
										setTodos(update);
									}}
								/>
								<span
									style={{
										textDecoration: todo.isChecked ? "Line-through" : "none",
									}}
								>
									{todo.name}
								</span>
							</label>
							<button
								onClick={() => {
									const update = [...todos];
									update.splice(index, 1);
									setTodos(update);
								}}
							>
								Delete
							</button>
						</li>
					);
				})}
			</ul>
		</div>
	);
};

export default App;
