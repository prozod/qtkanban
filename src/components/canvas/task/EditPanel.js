import { useDispatch, useSelector } from "react-redux";
import { editActive } from "../../../features/editSlice";
import { dragDisabled } from "../../../features/draggingSlice";
import { useRef, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { updateTaskDocument } from "../../../firebase";
import { IoCalendarOutline } from "react-icons/io5";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

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
	DateWrapper,
} from "./EditPanel.styles";

// quill.js
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.core.css";
import PriorityTag from "./PriorityTag";

const EditPanel = ({ task }) => {
	const dispatch = useDispatch();
	const editMenuRef = useRef();
	const [text, setText] = useState(task?.description || "");
	const { id: userId } = useSelector((state) => state?.user.value);
	const [newValues, setNewValues] = useState({
		name: task?.name,
		due_to: task?.due_to?.toDate(),
		priority: task?.priority,
	});

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
	const handleTextAreaChange = (e) => {
		const value = {
			...task?.description,
			text: e,
		};
		setText(value.text);
	};

	const handlePriorityChange = (e) => {
		setNewValues({ ...newValues, priority: e.target.value });
	};

	const handleNameChange = (e) => {
		console.log("name", e.target.textContent);
		setNewValues({ ...newValues, name: e.target.textContent });
	};

	const handleUpdate = () => {
		if (newValues.name === "" || newValues.name.length < 3) {
			toast.error("Name cannot be empty and must contain at least 3 characters.");
		} else {
			const updatedDoc = {
				...task,
				name: newValues.name,
				description: text,
				priority: newValues.priority || "",
				due_to: newValues.due_to || null,
			};
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
					<Title>
						<p
							onInput={handleNameChange}
							contentEditable="true"
							suppressContentEditableWarning={true}
						>
							{task.name}
						</p>
					</Title>
					<TaskInfo>
						<TaskItem>
							<span>Due date</span>
							<DateWrapper>
								<span className="icon">
									<IoCalendarOutline size={18} />
								</span>
								<DatePicker
									selected={newValues.due_to}
									onChange={(date) => setNewValues({ ...newValues, due_to: date })}
									showTimeSelect
									dateFormat="MMMM d, yyyy h:mm aa"
								/>
							</DateWrapper>
						</TaskItem>
						<TaskItem>
							<PriorityTag text={newValues.priority} onChange={handlePriorityChange} />
						</TaskItem>
						<TaskItem>
							<p>Description</p>
						</TaskItem>
					</TaskInfo>
					<EditingArea>
						<ReactQuill
							theme="snow"
							onChange={handleTextAreaChange}
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
