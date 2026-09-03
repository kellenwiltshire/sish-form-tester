import Toggle from './ui/Toggle'
import { useState } from 'react'
import { useReCaptcha as useReCaptchaService } from 'next-recaptcha-v3'
import Input from './ui/Input'

const TestForm = () => {
	const [formID, setFormId] = useState('')
	const [baseUrl, setBaseUrl] = useState('')
	const [useReCaptcha, setUseReCaptcha] = useState(false)
	const [formResponse, setFormResponse] = useState('')

	const { executeRecaptcha } = useReCaptchaService()

	const handleSubmit = async () => {
		try {
			let token = null

			if (useReCaptcha) {
				token = await executeRecaptcha('form_submission')
			}

			const res = await fetch(`${baseUrl}/api/forms/${formID}`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					payload: {
						name: 'Test Name',
						email: 'Test@email.com',
						message: `This has been a test message. Use Recaptcha: ${useReCaptcha}`,
					},
					token,
				}),
			})

			console.log(res)

			setFormResponse(`Form Submission Response: ${res.status}`)
		} catch (err) {
			console.log(err)
		}
	}

	return (
		<div className='flex min-h-screen min-w-screen flex-col items-center justify-center'>
			<h1>SiSH Form Tester</h1>
			<p>Sending requests to:</p>
			<p>{`${baseUrl}/api/forms/${formID}`}</p>
			<p>{useReCaptcha ? 'With Recaptcha' : 'Without Recaptcha'}</p>
			<form action={handleSubmit} className='flex max-w-7xl flex-col gap-2'>
				<Input
					title='Base Url'
					id='baseUrl'
					name='baseUrl'
					type='text'
					onChange={(str: string) => setBaseUrl(str)}
				/>
				<Input
					title='Form ID'
					id='formID'
					name='formId'
					type='text'
					onChange={(str: string) => setFormId(str)}
				/>
				<Toggle
					name='recaptcha'
					title='Use Recaptcha?'
					id='recaptcha'
					onChange={() => setUseReCaptcha((p) => !p)}
				/>
				<button
					type='submit'
					className='rounded-sm bg-indigo-500 px-2 py-1 text-xs font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500'
				>
					Submit
				</button>
			</form>
			<p>{formResponse}</p>
		</div>
	)
}

export default TestForm
