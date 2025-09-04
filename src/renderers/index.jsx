import renderTable from './renderTable.jsx'
import renderForm from './renderForm.jsx'

/**
 * @type {Map<string, React.Component<any, any, any>>}
 */
// @ts-ignore
export default new Map([
	['table', renderTable],
	['form', renderForm],
])
