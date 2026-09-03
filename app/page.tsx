'use client'
import { ReCaptchaProvider } from 'next-recaptcha-v3'
import TestForm from './components/TestForm'

export default function Home() {
	return (
		<ReCaptchaProvider
			useEnterprise
			reCaptchaKey='6Ld0rXstAAAAAF7AC78t9fF61-_uKgCeMkcIRfyd'
		>
			<TestForm />
		</ReCaptchaProvider>
	)
}
