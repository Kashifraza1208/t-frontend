import React from 'react';

export default function FormFields({
	labelText,
	classes,
	inputType,
	placeholder,
	value,
	onChangeFun,
	name,
}) {
	return (
		<>
			<div className="flex text-xl md:text-2xl items-center justify-center w-[320px] sm:w-[400px]  lg:w-[340px] xl:w-[470px] py-5">
				<label className="flex flex-col items-start p-1 gap-[10px]  h-[78px]">
					<div>{labelText}</div>
					<input
						className={classes}
						type={inputType}
						value={value}
						placeholder={placeholder}
						onChange={(e) => onChangeFun(e.target.value, name)}
						name={name}
					/>
				</label>
			</div>
		</>
	);
}
