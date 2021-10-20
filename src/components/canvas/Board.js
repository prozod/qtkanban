import { useState } from "react";
import Button from "../button/Button";
import { Form, Input } from "../modal/Form";
import { IoMdAdd } from "react-icons/io";
import { GoCheck } from "react-icons/go";
import { createNewTask } from "../../firebase";

import {
  BoardContainer,
  BoardArea,
  CardHeader,
  Cards,
  NewTask,
} from "./Board.styles";

export default function Board({ userId, children, boardId, color, title }) {
  const [taskName, setTaskName] = useState({ id: 0, value: "" });
  const [isClicked, setIsClicked] = useState(false);

  //Form handling for new tasks
  const handleClick = () => {
    setIsClicked(!isClicked);
  };

  const onInputChange = (e) => {
    const { id, value } = e.target;
    console.log(id, value);
    setTaskName({ id: id, value: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!taskName || taskName === "") return;
    createNewTask(userId, taskName.id, {
      name: taskName.value,
    });

    setTaskName({ id: 0, value: "" });
    setIsClicked(false);
  };

  return (
    <BoardContainer>
      <BoardArea>
        <CardHeader dotColor={color}>
          <p>{title}</p>
        </CardHeader>

        <Cards>{children}</Cards>

        <NewTask>
          {isClicked && (
            <Form onSubmit={handleSubmit}>
              <Input
                id={boardId}
                type="text"
                placeholder="Task name"
                value={taskName.value || ""}
                onChange={onInputChange}
              />
              <Button icon={<GoCheck />} />
            </Form>
          )}

          {!isClicked && (
            <Button icon={<IoMdAdd size={16} />} onClick={handleClick}>
              Create new issue
            </Button>
          )}
        </NewTask>
      </BoardArea>
    </BoardContainer>
  );
}

// onclickoutside, set isClicked to false so the create issue shows again
// collection(db, `users`, `${id}`, `tasks`),
