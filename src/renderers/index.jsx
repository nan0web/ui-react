import renderTable from './renderTable.jsx'
import renderForm from './renderForm.jsx'
import renderAvatar from './renderAvatar.jsx'
import renderButton from './renderButton.jsx'
import renderCard from './renderCard.jsx'
import renderInput from './renderInput.jsx'
import renderModal from './renderModal.jsx'
import renderTypography from './renderTypography.jsx'
import renderInteractive from './renderInteractive.jsx'  // Новий рендерер для interactive apps

/**
 * @type {Map<string, Function>}
 */
export default new Map([
	['table', renderTable],
	['form', renderForm],
	['avatar', renderAvatar],
	['button', renderButton],
	['card', renderCard],
	['input', renderInput],
	['modal', renderModal],
	['typography', renderTypography],
	['interactive', renderInteractive]  // Для app з type: 'interactive'
])