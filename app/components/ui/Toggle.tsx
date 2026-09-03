export default function Toggle({
	title,
	id,
	name,
	onChange,
}: {
	title: string
	id: string
	name: string
	onChange: () => void
}) {
	return (
		<div className='flex items-center justify-between'>
			<span className='flex grow flex-col'>
				<label
					id='availability-label'
					className='text-sm/6 font-medium text-white'
				>
					{title}
				</label>
			</span>
			<div className='group relative inline-flex w-11 shrink-0 rounded-full bg-white/5 p-0.5 inset-ring inset-ring-white/10 outline-offset-2 outline-indigo-500 transition-colors duration-200 ease-in-out has-checked:bg-indigo-500 has-focus-visible:outline-2'>
				<span className='size-5 rounded-full bg-white shadow-xs ring-1 ring-gray-900/5 transition-transform duration-200 ease-in-out group-has-checked:translate-x-5' />
				<input
					id={id}
					name={name}
					type='checkbox'
					onChange={() => onChange()}
					className='absolute inset-0 size-full appearance-none focus:outline-hidden'
				/>
			</div>
		</div>
	)
}
