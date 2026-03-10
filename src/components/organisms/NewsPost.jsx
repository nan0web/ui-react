import React from 'react'
import PropTypes from 'prop-types'
import { useUI } from '../../context/UIContext.jsx'

/**
 * Generic article/post template.
 */
const NewsPost = ({ post, className = 'news-post' }) => {
	const { t } = useUI()

	if (!post) return null

	return (
		<article className={className} data-nw-id={post.id} style={{ marginBottom: '2rem' }}>
			{post.image && (
				<figure style={{ margin: 0, marginBottom: '1rem' }}>
					{post.url ? (
						<a href={post.url}>
							<img
								src={post.image}
								alt={post.title || ''}
								style={{ maxWidth: '100%', height: 'auto', display: 'block' }}
							/>
						</a>
					) : (
						<img
							src={post.image}
							alt={post.title || ''}
							style={{ maxWidth: '100%', height: 'auto', display: 'block' }}
						/>
					)}
				</figure>
			)}

			<header style={{ marginBottom: '1rem' }}>
				<div
					className="meta"
					style={{
						display: 'flex',
						gap: '1rem',
						color: '#666',
						fontSize: '0.875rem',
						marginBottom: '0.5rem',
					}}
				>
					{post.date && <span className="nw-date">{new Date(post.date).toLocaleDateString()}</span>}
					{post.categories?.length > 0 && (
						<div className="categories" style={{ display: 'flex', gap: '0.5rem' }}>
							{post.categories.map((category, idx) => (
								<a
									key={idx}
									href={category.url || '#'}
									style={{ color: '#007bff', textDecoration: 'none' }}
								>
									{category.title || category.name || category}
								</a>
							))}
						</div>
					)}
				</div>
				<h2 style={{ marginTop: 0, marginBottom: '0.5rem' }}>
					{post.url ? (
						<a
							href={post.url}
							style={{ color: 'inherit', textDecoration: 'none' }}
							className="nw-title"
						>
							{post.title}
						</a>
					) : (
						<span className="nw-title">{post.title}</span>
					)}
				</h2>
			</header>

			{post.excerpt && (
				<div className="excerpt" style={{ marginBottom: '1rem', color: '#333' }}>
					<p>{post.excerpt}</p>
				</div>
			)}

			{post.content && (
				<div
					className="content"
					style={{ marginBottom: '1rem' }}
					dangerouslySetInnerHTML={{ __html: post.content }}
				/>
			)}

			{post.url && (
				<footer>
					<a
						href={post.url}
						style={{ color: '#007bff', textDecoration: 'none', fontWeight: 'bold' }}
					>
						<span>{t('Read More')} ›</span>
					</a>
				</footer>
			)}
		</article>
	)
}

NewsPost.propTypes = {
	post: PropTypes.shape({
		id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
		title: PropTypes.string.isRequired,
		date: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.instanceOf(Date)]),
		image: PropTypes.string,
		url: PropTypes.string,
		excerpt: PropTypes.string,
		content: PropTypes.string,
		categories: PropTypes.arrayOf(
			PropTypes.oneOfType([
				PropTypes.string,
				PropTypes.shape({
					title: PropTypes.string,
					name: PropTypes.string,
					url: PropTypes.string,
				}),
			]),
		),
	}).isRequired,
	className: PropTypes.string,
}

export default NewsPost
