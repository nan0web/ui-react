import Button from './atoms/Button.jsx'
import Input from './atoms/Input.jsx'
import Typography from './atoms/Typography.jsx'
import Avatar from './atoms/Avatar.jsx'
import Badge from './atoms/Badge.jsx'
import Checkbox from './atoms/Checkbox.jsx'
import Radio from './atoms/Radio.jsx'
import Select from './atoms/Select.jsx'
import TextArea from './atoms/TextArea.jsx'
import Card from './molecules/Card.jsx'
import Modal from './organisms/Modal.jsx'

/** @type {Iterable<readonly [string, any]>} */
// @ts-ignore @todo fix if you able to
const components = new Map([
	['Button', Button],
	['Input', Input],
	['Typography', Typography],
	['Avatar', Avatar],
	['Badge', Badge],
	['Checkbox', Checkbox],
	['Radio', Radio],
	['Select', Select],
	['TextArea', TextArea],
	['Card', Card],
	['Modal', Modal],
])

export default components
