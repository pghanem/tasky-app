import React, { Component } from 'react';
import axios from 'axios';

export default class EditTask extends Component {

    // constructor for edit task component
    constructor(props) {
        super(props);

        this.onChangeTaskDescription = this.onChangeTaskDescription.bind(this);
        this.onChangeTaskResponsible = this.onChangeTaskResponsible.bind(this);
        this.onChangeTaskPriority = this.onChangeTaskPriority.bind(this);
        this.onChangeTaskCompleted = this.onChangeTaskCompleted.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            task_description: '',
            task_responsible: '',
            task_priority: '',
            task_completed: false
        }
    }

    // pulls the current data for the task to be edited
    componentDidMount() {
        axios.get('http://localhost:3000/tasks/'+this.props.match.params.id)
            .then(response => {
                this.setState({
                    task_description: response.data.task_description,
                    task_responsible: response.data.task_responsible,
                    task_priority: response.data.task_priority,
                    task_completed: response.data.task_completed
                })   
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    onChangeTaskDescription(e) {
        this.setState({
            task_description: e.target.value
        });
    }

    onChangeTaskResponsible(e) {
        this.setState({
            task_responsible: e.target.value
        });
    }

    onChangeTaskPriority(e) {
        this.setState({
            task_priority: e.target.value
        });
    }

    onChangeTaskCompleted(e) {
        this.setState({
            task_completed: !this.state.task_completed
        });
    }

    // binds new values during when form is submitted, axios then posts it to the DB
    onSubmit(e) {
        e.preventDefault();
        const obj = {
            task_description: this.state.task_description,
            task_responsible: this.state.task_responsible,
            task_priority: this.state.task_priority,
            task_completed: this.state.task_completed
        };
        console.log(obj);
        axios.post('http://localhost:3000/tasks/update/'+this.props.match.params.id, obj)
            .then(res => console.log(res.data));
        
        this.props.history.push('/');
    }

    // page
    render() {
        return (
            <div>
                <h3 align="center">Update Task</h3>
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
                    <div className="form-check">
                        <input  className="form-check-input"
                                id="completedCheckbox"
                                type="checkbox"
                                name="completedCheckbox"
                                onChange={this.onChangeTaskCompleted}
                                checked={this.state.task_completed}
                                value={this.state.task_completed}
                                />
                        <label className="form-check-label" htmlFor="completedCheckbox">
                            Completed
                        </label>                        
                    </div>

                    <br />

                    <div className="form-group">
                        <input type="submit" value="Update Task" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}