import { useDispatch, useSelector } from "react-redux";
import { editActive } from "../../../features/editSlice";
import { dragDisabled } from "../../../features/draggingSlice";
import { useRef, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { updateTaskDocument } from "../../../firebase";
import { BsPencilSquare } from "react-icons/bs";

//styles
import Button, { ButtonGroup } from "../../button/Button";
import {
	EditTaskWrapper,
	EditingArea,
	Content,
	TaskInfo,
	Title,
	TaskItem,
	Body,
	Footer,
} from "./EditPanel.styles";

// quill.js
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.core.css";

const EditPanel = ({ task }) => {
	const dispatch = useDispatch();
	const editMenuRef = useRef();
	const [text, setText] = useState(task?.description || "");
	const [name, setName] = useState(task?.name);
	const { id: userId } = useSelector((state) => state?.user.value);

	// click outside
	function useOutside(ref) {
		useEffect(() => {
			function handleClickOutside(event) {
				if (ref.current && !ref.current.contains(event.target)) {
					dispatch(dragDisabled(false));
					dispatch(editActive(false));
				}
			}

			document.addEventListener("mousedown", handleClickOutside);
			return () => {
				document.removeEventListener("mousedown", handleClickOutside);
			};
		}, [ref]);
	}
	useOutside(editMenuRef);

	// Quill js  (input changes, updated doc, modules and formats)
	const handleChange = (e) => {
		const value = {
			...task?.description,
			text: e,
		};
		setText(value.text);
	};

	const onChange = (e) => {
		setName(e.target.innerHTML);
	};

	const handleUpdate = () => {
		console.log(name, name.length);
		if (name === "" || name.length < 3) {
			toast.error("Name cannot be empty and must contain at least 3 characters.");
		} else {
			const updatedDoc = {
				...task,
				name: name,
				description: text,
			};
			console.log(updatedDoc, userId, task.id);
			toast.success("Changes saved successfully!");
			updateTaskDocument(userId, task.id, updatedDoc);
		}
	};

	const modules = {
		toolbar: [
			[{ header: "1" }, { header: "2" }, { font: [] }],
			[{ size: [] }],
			["bold", "italic", "underline", "strike", "blockquote"],
			[{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
			["link", "video"], //removed image
			["clean"],
		],
		clipboard: {
			// toggle to add extra line breaks when pasting HTML:
			matchVisual: false,
		},
	};

	const formats = [
		"header",
		"font",
		"size",
		"bold",
		"italic",
		"underline",
		"strike",
		"blockquote",
		"list",
		"bullet",
		"indent",
		"link",
		// "image",
		"video",
	];

	return (
		<EditTaskWrapper ref={editMenuRef}>
			<Content>
				<Body>
					<Title>Task Info</Title>
					<TaskInfo>
						<TaskItem>
							<p>
								<span>Name:</span>{" "}
								<p onInput={onChange} contenteditable="true">
									{task.name}
								</p>
								<span className="icon">
									<BsPencilSquare />
								</span>
							</p>
						</TaskItem>
						<TaskItem>
							<p>
								<span>ID:</span> {task.id}
							</p>
						</TaskItem>
						<TaskItem>
							<p>
								<span>Due date:</span> 27 March 2022
							</p>
						</TaskItem>
					</TaskInfo>

					<Title>Notes</Title>
					<EditingArea>
						<ReactQuill
							theme="snow"
							onChange={handleChange}
							value={text}
							modules={modules}
							formats={formats}
							placeholder="Add more details for this task..."
						/>
					</EditingArea>
				</Body>
				<Footer>
					<ButtonGroup>
						<Button
							onClick={() => {
								handleUpdate();
								// dispatch(dragDisabled(false));
								// dispatch(editActive(false));
							}}
						>
							Save changes
						</Button>
						<Button
							onClick={() => {
								dispatch(dragDisabled(false));
								dispatch(editActive(false));
							}}
						>
							Close
						</Button>
					</ButtonGroup>
				</Footer>
			</Content>
		</EditTaskWrapper>
	);
};

export default EditPanel;
