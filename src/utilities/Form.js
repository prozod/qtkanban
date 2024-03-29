import styled from "styled-components";

const FormWrapper = styled.form`
	display: flex;
	flex-direction: ${(props) => (props.flexdir ? "row" : "column")};
	flex: 1;
`;

const InputWrapper = styled.div`
	display: flex;
	flex: 1;
	margin: 0;
	padding: 0;
`;
const FormInput = styled.input`
	font-family: "Fira Sans", sans-serif;
	border: 1px solid #e3e4e6;
	margin: 5px 0;
	padding: 7px 12px;
	position: relative;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: fit-content;
	border-radius: 20px;
	transition: all 0.2s ease;

	&:focus {
		outline: 2px solid #3d4cd1;
	}
`;

const FormLabel = styled.label`
	font-family: "Fira Sans", sans-serif;
	margin-top: 5px;
	text-transform: uppercase;
	font-size: 0.9rem;
`;

const FormTextArea = styled.textarea`
	font-family: "Fira Sans", sans-serif;
	margin-top: 5px;
	margin-bottom: 10px;
	border: 1px solid #e3e4e6;
	padding: 10px 10px;
	resize: none;
	border-radius: 20px;
`;

export const Input = ({ id, type, value, onChange, placeholder, ...rest }) => {
	return (
		<InputWrapper>
			<FormInput
				{...rest}
				id={id}
				type={type}
				value={value}
				onChange={onChange}
				placeholder={placeholder}
				autoFocus={true}
			></FormInput>
		</InputWrapper>
	);
};

export const Label = ({ id, text }) => {
	return <FormLabel htmlFor={id}>{text}</FormLabel>;
};

export const Textarea = ({ id, name, rows, cols }) => {
	return <FormTextArea id={id} name={name} rows={rows} cols={cols}></FormTextArea>;
};

export const Form = ({ children, onSubmit, flexdir }) => {
	return (
		<FormWrapper flexdir={flexdir} onSubmit={onSubmit}>
			{children}
		</FormWrapper>
	);
};
