import React, { Component } from 'react';
import axios from 'axios';

export default class CreateTask extends Component {

    // constructor for create task component
    constructor(props) {
        super(props);

        this.onChangeTaskDescription = this.onChangeTaskDescription.bind(this);
        this.onChangeTaskResponsible = this.onChangeTaskResponsible.bind(this);
        this.onChangeTaskPriority = this.onChangeTaskPriority.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            task_description: '',
            task_responsible: '',
            task_priority: '',
            taskv_completed: false
        }
    }

    onChangeTaskDescription(e) {
        this.setState({task_description: e.target.value});
    }

    onChangeTaskResponsible(e) {
        this.setState({task_responsible: e.target.value});
    }

    onChangeTaskPriority(e) {
        this.setState({task_priority: e.target.value});
    }

    // on submit event handler, called when user submits the form
    onSubmit(e) {
        // prevents default HTML form submit behaviour
        e.preventDefault();


        // log what was submitted for debugging purposes
        console.log(`Form submitted:`);
        console.log(`Task Description: ${this.state.task_description}`);
        console.log(`Task Responsible: ${this.state.task_responsible}`);
        console.log(`Task Priority: ${this.state.task_priority}`);
        
        const newTask = {
            task_description: this.state.task_description,
            task_responsible: this.state.task_responsible,
            task_priority: this.state.task_priority,
            task_completed: this.state.task_completed
        }

        axios.post('http://localhost:3000/tasks/add', newTask)
                .then(res => console.log(res.data));

        //reset the form
        this.setState({
            task_description: '',
            task_responsible: '',
            task_priority: '',
            task_completed: false
        })
    }

    // page
    render() {
        return (
            <div style={{marginTop: 10}}>
                <h3>Create New Task</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group"> 
                        <label>Description: </label>
                        <input  type="text"
                                className="form-control"
                                value={this.state.task_description}
                                onChange={this.onChangeTaskDescription}
                                />
                    </div>
                    <div className="form-group">
                        <label>Responsible: </label>
                        <input 
                                type="text" 
                                className="form-control"
                                value={this.state.task_responsible}
                                onChange={this.onChangeTaskResponsible}
                                />
                    </div>
                    <div className="form-group">
                        <div className="form-check form-check-inline">
                            <input  className="form-check-input" 
                                    type="radio" 
                                    name="priorityOptions" 
                                    id="priorityLow" 
                                    value="Low"
                                    checked={this.state.task_priority==='Low'} 
                                    onChange={this.onChangeTaskPriority}
                                    />
                            <label className="form-check-label">Low</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input  className="form-check-input" 
                                    type="radio" 
                                    name="priorityOptions" 
                                    id="priorityMedium" 
                                    value="Medium" 
                                    checked={this.state.task_priority==='Medium'} 
                                    onChange={this.onChangeTaskPriority}
                                    />
                            <label className="form-check-label">Medium</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input  className="form-check-input" 
                                    type="radio" 
                                    name="priorityOptions" 
                                    id="priorityHigh" 
                                    value="High" 
                                    checked={this.state.task_priority==='High'} 
                                    onChange={this.onChangeTaskPriority}
                                    />
                            <label className="form-check-label">High</label>
                        </div>
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Create Task" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}