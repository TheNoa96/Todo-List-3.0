import React, { useEffect, useState } from "react";

//create your first component
const Home = props => {
	const [tasks, setTasks] = useState([]);
	const url = "https://assets.breatheco.de/apis/fake/todos/user/thenoa96";

	const Enter = e => {
		if (e.key === "Enter" && e.target.value !== "") {
			tasks.push({ label: e.target.value, done: false });
			setTasks([...tasks]);
			tasks.length == 1 ? createUser() : updateTask();
			e.target.value = "";
		}
	};

	useEffect(() => {
		getTasks();
	}, []);
	const getTasks = () => {
		fetch(url, {
			method: "GET",
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(response => {
				return response.json();
			})
			.then(data => {
				if (Array.isArray(data)) {
					setTasks(data);
				}
			})
			.catch(error => {
				console.log(error);
			});
	};

	const createUser = () => {
		fetch(url, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(tasks)
		})
			.then(response => response.json())
			.then(data => {
				updateTask();
			})
			.catch(error => console.log(error));
	};

	const updateTask = () => {
		fetch(url, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(tasks)
		})
			.then(response => response.json())
			.then(data => {
				console.log(data);
			})
			.catch(error => console.log(error));
	};

	const deleteTasks = () => {
		fetch(url, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(response => response.json())
			.then(data => {})
			.catch(error => console.log(error));
	};

	return (
		<div className="titulo">
			<h1 style={{ color: "pink", fontSize: 100, margin: 0 }}>todos</h1>
			<div className="container d-flex justify-content-center text-align-center">
				<div>
					<input
						className="input1"
						placeholder=" ¿What needs to be done?"
						onKeyUp={e => Enter(e)}
					/>
					<ul>
						{tasks.length === 0 ? (
							<li className="tareas notask">
								No task, add a task
							</li>
						) : (
							tasks.map((t, index) => {
								return (
									<div key={index}>
										<li className="tareas">
											<p>{t.label}</p>
											<button
												className="boton"
												onClick={() => {
													tasks.splice(index, 1);
													setTasks([...tasks]);
													console.log(tasks.length);
													tasks.length === 0
														? deleteTasks()
														: updateTask();
												}}>
												<i className="fas fa-times"></i>
											</button>
										</li>
									</div>
								);
							})
						)}
						{tasks.length > 0 ? (
							<li className="contadordetareas">
								{tasks.length > 1
									? `${tasks.length} items left`
									: `${tasks.length} item left`}
							</li>
						) : (
							""
						)}
					</ul>
				</div>
			</div>
			<button
				className="btn btn-danger"
				onClick={() => {
					setTasks([]);
					deleteTasks();
				}}>
				Erase Tasks
			</button>
		</div>
	);
};

export default Home;
