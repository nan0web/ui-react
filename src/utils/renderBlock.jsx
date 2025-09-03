export function renderBlock(block, key, context) {
	const { components, renderers } = context

	// Один ключ — тип компонента
	const [type, value] = Object.entries(block)[0]

	// Якщо тип — це компонент, використовуй рендерери або components
	const Component = renderers[type] || components[type] || type

	// Якщо value — масив, обробляй кожен елемент
	let children = []

	if (Array.isArray(value)) {
		children = value.map((item, index) =>
			typeof item === 'object' && item !== null
				? renderBlock(item, `${key}-${index}`, context) // вкладений блок
				: item // ✅ просто текст
		)
	} else if (typeof value === 'string' || typeof value === 'number') {
		children = value
	} else {
		children = null
	}

	// Пропси: поля, що починаються з $
	const props = {}
	for (const [k, v] of Object.entries(block)) {
		if (k.startsWith('$')) {
			props[k.slice(1)] = v
		}
	}

	// Повертаємо React-елемент
	return React.createElement(Component, { key, ...props }, children)
}
