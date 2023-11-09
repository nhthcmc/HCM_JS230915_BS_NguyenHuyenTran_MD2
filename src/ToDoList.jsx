import React, { useState, useEffect } from 'react';
import './todolist.scss'

const ToDoList = () => {
    const [task, setTask] = useState('');
    const [taskList, setTaskList] = useState(JSON.parse(localStorage.getItem('tasks')) || []);
    const [showDeleteModal, setShowModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editedTask, setEditedTask] = useState('');
    const [indexToDelete, setIndexToDelete] = useState(null);
    const [indexToEdit, setIndexToEdit] = useState(null);

    
    const handleAddTask = () => {
        if (task.trim() !== '') {
            const newTaskList = [...taskList, task];
            setTaskList(newTaskList);
            localStorage.setItem('tasks', JSON.stringify(newTaskList));
            setTask('');
        } else {
            alert('Tên công việc không được để trống!');
        }
    };

    const handleInputChange = (e) => {
        setTask(e.target.value);
    };

    const handleEditTask = (index) => {
        setShowEditModal(true);
        setIndexToEdit(index);
        setEditedTask(taskList[index]);
    };

    const handleEditInputChange = (e) => {
        setEditedTask(e.target.value);
    };
    const handleCheck = (index) => {
        const newList = [...taskList];
        newList[index].completed = !newList[index].completed;
        setTaskList(newList);
        localStorage.setItem('tasks', JSON.stringify(newList));
    };

    const handleRemoveTask = (index) => {
        setShowModal(true);
        setIndexToDelete(index);
    };
    const confirmDelete = () => {
        const newList = taskList.filter((_, index) => index !== indexToDelete);
        setTaskList(newList);
        localStorage.setItem('tasks', JSON.stringify(newList));
        setShowModal(false);
    };

    const confirmEdit = () => {
        const newList = [...taskList];
        newList[indexToEdit] = editedTask;
        setTaskList(newList);
        localStorage.setItem('tasks', JSON.stringify(newList));
        setShowEditModal(false);
    };

    const cancelDelete = () => {
        setShowModal(false);
    };

    const cancelEdit = () => {
        setShowEditModal(false);
    };

    useEffect(() => {
        const tasksFromLocalStorage = JSON.parse(localStorage.getItem('tasks'));
        if (tasksFromLocalStorage) {
            setTaskList(tasksFromLocalStorage);
        }
    }, []);

    return (
        <div className='container'>
            <div className='inputContainer'>
                <h2>Danh sách công việc</h2>
                <div className='inputBody'>
                    <input type="text" placeholder='Nhập tên công việc' value={task} onChange={handleInputChange} />
                    <button className='btn btn-confirm' onClick={handleAddTask}>Thêm</button>
                </div>
                {taskList.length === 0 ? (
                    <img src="	https://t4.ftcdn.net/jpg/05/86/21/03/360_F_586210337_WOGOw0l7raEB8F61Muc4hWbvVcyQdk9Z.jpg" alt="empty" />
                ) : (
                    <ul className='listContainer'>
                        {taskList.map((task, index) => (
                            <li key={index}>
                                <input
                                    type="checkbox"
                                    checked={task.completed}
                                    onChange={() => handleCheck(index)}
                                />
                                <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
                                    {task}
                                </span>
                                <button className='btn btn-edit' onClick={() => handleEditTask(index)}>Sửa</button>
                                <button className='btn btn-delete' onClick={() => handleRemoveTask(index)}>Xóa</button>
                            </li>
                        ))}
                    </ul>
                )}
                {showDeleteModal && (
                    <div className="modal modalDelete">
                        <div className="modal-content delDetail">
                            <h2>Xác nhận</h2>
                            <p>Bạn có xác nhận xóa công việc không?</p>
                            <button className='btn btn-cancel' onClick={cancelDelete}>Hủy</button>
                            <button className='btn btn-confirm' onClick={confirmDelete}>Đồng ý</button>
                        </div>
                    </div>
                )}

                {showEditModal && (
                    <div className="modal modalEdit">
                        <div className="modal-content editDetail">
                            <h2>Cập nhật công việc</h2>
                            <label>Tên công việc</label>
                            <input type="text" value={editedTask} onChange={handleEditInputChange} />
                            <button className='btn btn-cancel' onClick={cancelEdit}>Hủy</button>
                            <button className='btn btn-confirm' onClick={confirmEdit}>Đồng ý</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ToDoList;
