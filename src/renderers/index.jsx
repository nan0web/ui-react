import renderTable from './renderTable.jsx'
import renderForm from './renderForm.jsx'
import renderAvatar from './renderAvatar.jsx'
import renderButton from './renderButton.jsx'
import renderInput from './renderInput.jsx'
import renderModal from './renderModal.jsx'
import renderTypography from './renderTypography.jsx'
import renderInteractive from './renderInteractive.jsx' // Новий рендерер для interactive apps
import renderCheckbox from './renderCheckbox.jsx'
import renderRadio from './renderRadio.jsx'
import renderCard from './renderCard.jsx'
import renderSelect from './renderSelect.jsx'
import renderTextArea from './renderTextArea.jsx'

// @ts-ignore
const renderersMap = new Map([
	['table', renderTable],
	['form', renderForm],
	['avatar', renderAvatar],
	['button', renderButton],
	['input', renderInput],
	['modal', renderModal],
	['typography', renderTypography],
	['interactive', renderInteractive], // Для app з type: 'interactive'
	['checkbox', renderCheckbox],
	['radio', renderRadio],
	['card', renderCard],
	['select', renderSelect],
	['textarea', renderTextArea],
])

export default renderersMap
