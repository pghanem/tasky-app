import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Task = props => (
    <tr>
        <td className={props.task.task_completed ? 'completed' : ''}>{props.task.task_description}</td>
        <td className={props.task.task_completed ? 'completed' : ''}>{props.task.task_responsible}</td>
        <td className={props.task.task_completed ? 'completed' : ''}>{props.task.task_priority}</td>
        <td>
            <Link to={"/edit/"+props.task._id}>Edit</Link>
        </td>
    </tr>
)

export default class TasksList extends Component {

    //constructor for tasks list
    constructor(props){
        super(props);
        this.state = {tasks: []};
    }

    componentDidMount() {
        //pull the data from tasks and populate the array with the response
        axios.get('http://localhost:3000/tasks')
            .then(response => {
                this.setState({tasks: response.data});
            })
            .catch(function (error) {
                console.log(error);
            })
    }
    
    // helper to iterate over this.tasks and display them
    taskList() {
        return this.state.tasks.map(function(currentTask, i) {
            return <Task task={currentTask} key = {i} />;
        });
    }

    // page
    render() {
        return (
            <div>
                <h3>Tasks List</h3>
                <table className="table table-striped" style={{marginTop: 20}}>
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Responsible</th>
                            <th>Priority</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        
                        { this.taskList() }
                    </tbody>
                </table>
            </div>
        )
    }
}