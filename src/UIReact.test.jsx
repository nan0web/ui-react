import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { NoConsole } from '@nan0web/log'
import DB from '@nan0web/db'
import UIReact from './UIReact.jsx'
import { useUI } from './context/UIContext.jsx'

function MyComponent() {
	return (
		<b>MyComponent</b>
	)
}

function MyCustomRenderer({ data }) {
	const { t, lang } = useUI()
	return (
		<div data-testid="custom-render" data-type="custom-block" lang={lang}>
			{t("Custom block")}: {JSON.stringify(data)}
			<br />
			<MyComponent />
		</div>
	)
}

describe("UIReact with Custom Renderer", () => {
	const db = new DB({
		predefined: [
			["uk/_/t.json", {
				"Custom block": "Блок"
			}],
			[
				"uk/index.json",
				{
					$content: [
						{ "custom-block": true, $data: { value: 42 } },
						{ "MyComponent": true },
					],
					$lang: "uk",
					$meta: { title: "Тестовий документ" },
				},
			],
		],
		console: new NoConsole({ prefix: "DB:" }),
	})

	it("renders custom block using registered renderer from context", async () => {
		await db.connect()

		const customConsole = new NoConsole({ prefix: "UIReact:" })
		const context = {
			console: customConsole,
			components: new Map([["MyComponent", MyComponent]]),
			renderers: new Map([["custom-block", MyCustomRenderer]]),
		}

		render(<UIReact db={db} context={context} uri="uk/index" />)

		await screen.findByText(/Блок/)

		const myComponents = screen.getAllByText("MyComponent")
		expect(myComponents).toHaveLength(2)

		expect(screen.getByText(/42/)).toBeInTheDocument()
		expect(screen.getByTestId("custom-render")).toHaveAttribute("data-type", "custom-block")

		expect(context.console.output("error")).toEqual([])
		expect(db.console.output("error")).toEqual([])

		const debug = db.console.output("debug")
		expect(JSON.stringify(debug)).toContain('["debug","Loading document",{"uri":"uk/index.json"}]')
	})
})
