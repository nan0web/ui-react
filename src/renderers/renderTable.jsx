export default function renderTable({ element, context }) {
	const { table: content, ...props } = element
	const { data = {}, t } = context

	if (content.body === '{{ratesTable}}' && Array.isArray(data.ratesTable)) {
		return (
			<table key={props.key} className={props.class}>
				<thead>
					<tr>
						{content.head.map((cell, i) => (
							<th key={i}>{cell}</th>
						))}
					</tr>
				</thead>
				<tbody>
					{data.ratesTable.map((row, i) => (
						<tr key={i}>
							{row.map((cell, j) => (
								<td key={j}>{cell}</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		)
	}

	return <table {...props}>{content}</table>
}
