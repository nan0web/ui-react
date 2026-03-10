import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useUI } from '../../context/UIContext.jsx'

const enumPosition = [
	'Bank Employee',
	'Bank Client',
	'Business Partner',
	'Investor',
	'Other Interested Party',
]

/**
 * Core form submission with validation.
 */
const FeedbackForm = ({ onSubmit, initialValues = {}, className = 'feedback-form' }) => {
	const { t } = useUI()

	const [formValues, setFormValues] = useState({
		myFullName: initialValues.myFullName || '',
		myContacts: initialValues.myContacts || '',
		bankEmployee: initialValues.bankEmployee || '',
		date: initialValues.date || '',
		myText: initialValues.myText || '',
		myPosition: initialValues.myPosition || '',
		agreement: initialValues.agreement || false,
	})

	const [errors, setErrors] = useState({})

	const handleChange = (e) => {
		const { name, value, type, checked } = e.target
		setFormValues({
			...formValues,
			[name]: type === 'checkbox' ? checked : value,
		})
		setErrors({ ...errors, [name]: '' })
	}

	const validate = () => {
		const newErrors = {}
		if (!formValues.myFullName || formValues.myFullName.length < 3) {
			newErrors.myFullName = t('Please provide your full name to continue')
		}
		if (!formValues.myContacts || formValues.myContacts.length < 6) {
			newErrors.myContacts = t('Please provide your contact information')
		}
		if (!formValues.myPosition) {
			newErrors.myPosition = t('Please select one option')
		}
		if (!formValues.bankEmployee) {
			newErrors.bankEmployee = t('Please provide details about the bank employee')
		}
		if (!formValues.date) {
			newErrors.date = t('Please select the date of the incident')
		}
		if (!formValues.myText || formValues.myText.length < 10) {
			newErrors.myText = t('Please add additional information')
		}
		if (!formValues.agreement) {
			newErrors.agreement = t(
				'Please confirm that you consent to the processing of your personal data',
			)
		}
		return newErrors
	}

	const handleSubmit = (e) => {
		e.preventDefault()
		const validationErrors = validate()
		if (Object.keys(validationErrors).length > 0) {
			setErrors(validationErrors)
		} else {
			onSubmit(formValues)
		}
	}

	return (
		<form className={className} onSubmit={handleSubmit} noValidate>
			<div className="form-group" style={{ marginBottom: '1rem' }}>
				<label htmlFor="myFullName">{t('Your Full Name')}</label>
				<input
					id="myFullName"
					type="text"
					name="myFullName"
					value={formValues.myFullName}
					onChange={handleChange}
					style={{ display: 'block', width: '100%', padding: '0.5rem' }}
				/>
				{errors.myFullName && (
					<span className="error" style={{ color: 'red', fontSize: '0.875rem' }}>
						{errors.myFullName}
					</span>
				)}
			</div>

			<div className="form-group" style={{ marginBottom: '1rem' }}>
				<label htmlFor="myContacts">{t('Contact Information')}</label>
				<input
					id="myContacts"
					type="text"
					name="myContacts"
					value={formValues.myContacts}
					onChange={handleChange}
					style={{ display: 'block', width: '100%', padding: '0.5rem' }}
				/>
				<small style={{ display: 'block', color: '#666' }}>
					{t('Phone number or email address')}
				</small>
				{errors.myContacts && (
					<span className="error" style={{ color: 'red', fontSize: '0.875rem' }}>
						{errors.myContacts}
					</span>
				)}
			</div>

			<div className="form-group" style={{ marginBottom: '1rem' }}>
				<label>{t('Your Position *')}</label>
				{enumPosition.map((option) => (
					<div key={option} style={{ marginBottom: '0.5rem' }}>
						<label
							style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}
						>
							<input
								type="radio"
								name="myPosition"
								value={option}
								checked={formValues.myPosition === option}
								onChange={handleChange}
							/>
							{t(option)}
						</label>
					</div>
				))}
				{errors.myPosition && (
					<span className="error" style={{ color: 'red', fontSize: '0.875rem' }}>
						{errors.myPosition}
					</span>
				)}
			</div>

			<div className="form-group" style={{ marginBottom: '1rem' }}>
				<label htmlFor="bankEmployee">{t('Bank Employee Details')}</label>
				<input
					id="bankEmployee"
					type="text"
					name="bankEmployee"
					value={formValues.bankEmployee}
					onChange={handleChange}
					style={{ display: 'block', width: '100%', padding: '0.5rem' }}
				/>
				{errors.bankEmployee && (
					<span className="error" style={{ color: 'red', fontSize: '0.875rem' }}>
						{errors.bankEmployee}
					</span>
				)}
			</div>

			<div className="form-group" style={{ marginBottom: '1rem' }}>
				<label htmlFor="date">{t('Date of Incident')}</label>
				<input
					id="date"
					type="date"
					name="date"
					value={formValues.date}
					onChange={handleChange}
					style={{ display: 'block', width: '100%', padding: '0.5rem' }}
				/>
				{errors.date && (
					<span className="error" style={{ color: 'red', fontSize: '0.875rem' }}>
						{errors.date}
					</span>
				)}
			</div>

			<div className="form-group" style={{ marginBottom: '1rem' }}>
				<label htmlFor="myText">{t('Additional Information')}</label>
				<textarea
					id="myText"
					name="myText"
					rows={9}
					value={formValues.myText}
					onChange={handleChange}
					style={{ display: 'block', width: '100%', padding: '0.5rem' }}
				/>
				{errors.myText && (
					<span className="error" style={{ color: 'red', fontSize: '0.875rem' }}>
						{errors.myText}
					</span>
				)}
			</div>

			<div className="form-group" style={{ marginBottom: '1.5rem' }}>
				<label
					style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', cursor: 'pointer' }}
				>
					<input
						type="checkbox"
						name="agreement"
						checked={formValues.agreement}
						onChange={handleChange}
						style={{ marginTop: '0.25rem' }}
					/>
					<span>
						{t(
							'I consent to the storage, processing, and use of my personal data in accordance with the law',
						)}
					</span>
				</label>
				{errors.agreement && (
					<span className="error" style={{ color: 'red', fontSize: '0.875rem', display: 'block' }}>
						{errors.agreement}
					</span>
				)}
			</div>

			<footer style={{ textAlign: 'center', marginTop: '2rem' }}>
				<button
					type="submit"
					style={{
						padding: '0.75rem 1.5rem',
						background: '#007bff',
						color: 'white',
						border: 'none',
						cursor: 'pointer',
						borderRadius: '4px',
						fontSize: '1rem',
					}}
				>
					{t('Submit Data')}
				</button>
			</footer>
		</form>
	)
}

FeedbackForm.propTypes = {
	onSubmit: PropTypes.func.isRequired,
	initialValues: PropTypes.shape({
		myFullName: PropTypes.string,
		myContacts: PropTypes.string,
		bankEmployee: PropTypes.string,
		date: PropTypes.string,
		myText: PropTypes.string,
		myPosition: PropTypes.string,
		agreement: PropTypes.bool,
	}),
	className: PropTypes.string,
}

export default FeedbackForm
