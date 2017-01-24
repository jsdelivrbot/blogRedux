/**
 * Created by shitman on 23.01.2017.
 */
import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { createPost } from '../actions/index';
import { Link } from 'react-router'

class PostsNew extends Component {


	onSubmit(props) {
		this.props.createPost(props)
			.then(() => {
				this.context.router.push('/');
			})
	}

	render() {
		const { fields : { title, categories, content}, handleSubmit } = this.props;
		return (
			<form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
				<h3>Create A New Post</h3>
				<div className={`form-group ${title.touched && title.invalid ? 'has-danger' : ''}`}>
					<label>Title</label>
					<input type="text" className="form-control" {...title}/>
					<div className="text-help">
						<span>{title.touched ? title.error : ''}</span>
					</div>
				</div>
				<div  className={`form-group ${categories.touched && categories.invalid ? 'has-danger' : ''}`}>
					<label>Categories</label>
					<input type="text" className="form-control" {...categories}/>
					<div className="text-help">
						<span>{categories.touched ? categories.error : ''}</span>
					</div>
				</div>
				<div  className={`form-group ${content.touched && content.invalid ? 'has-danger' : ''}`}>
					<label>Content</label>
					<input type="text" className="form-control" {...content}/>
					<div className="text-help">
						<span>{content.touched ? content.error : ''}</span>
					</div>
				</div>

				<button type="submit" className="btn btn-primary">Submit</button>
				<Link to="/" className="btn btn-danger">Cancel</Link>
			</form>
		)
	}
}

PostsNew.contextTypes = {
	router: React.PropTypes.object.isRequired
}
const validate = values => {
	const errors = {}

	if (!values.title) {
		errors.title = 'Enter a username'
	}
	if (!values.categories) {
		errors.categories = 'Enter a categories'
	}
	if (!values.content) {
		errors.content = 'Enter a content'
	}
	return errors;
}

export default reduxForm({
	form: 'PostNewForm',
	validate,
	fields: ['title', 'categories', 'content']
}, null, { createPost })(PostsNew)
