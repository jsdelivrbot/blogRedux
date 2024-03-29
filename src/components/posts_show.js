/**
 * Created by shitman on 24.01.2017.
 */
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchPost, deletePost } from '../actions/index';
import { Link } from 'react-router';

class PostsShow extends Component {
	componentWillMount() {
		this.props.fetchPost(this.props.params.id);
	}
	onDeleteClick() {
		this.props.deletePost(this.props.params.id).then(() => {
			this.context.router.push('/');
		})
	}
	render() {
		const { post } = this.props;
		if (!post) {
			return <div>Loadin...</div>
		}
		return (
			<div>
				<Link to="/">Back</Link>
				<button
					onClick={this.onDeleteClick.bind(this)}
					className="btn btn-danger pull-xs-right">
					Delete Post
				</button>
				<h3>{post.title}</h3>
				<h6>{post.categories}</h6>
				{post.content}
			</div>
		)
	}
}
PostsShow.contextTypes = {
	router: React.PropTypes.object.isRequired
}
function mapStateToProps(state) {
	return { post: state.posts.post };
}

export default connect(mapStateToProps, { fetchPost, deletePost })(PostsShow);