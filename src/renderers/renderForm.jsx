export default function renderForm({ element, context }) {
	const { form: fields, ...props } = element

	return (
		<form {...props}>
			{Array.isArray(fields) && fields.map((field, i) => (
				<div key={i} className="form-floating">
					{field.label && <label>{field.label}</label>}
					{field.input && (
						<input
							value={field.input.$value || context.app.data[field.input.$bind]}
							onChange={field.input.$bind && (
								(ev) => context.app.actions[`${field.input.$bind}Changed`](ev)
							)}
							{...field.input}
						/>
					)}
					{field.select && (
						<select
							value={context.app.data[field.select.$bind]}
							onChange={context.app.actions[`${field.select.$bind}Changed`]}
						>
							{Array.isArray(field.select.$options) && field.select.$options.map(c => (
								<option key={c.code} value={c.code}>
									{c.char} - {c.title}
								</option>
							))}
						</select>
					)}
				</div>
			))}
		</form>
	)
}
