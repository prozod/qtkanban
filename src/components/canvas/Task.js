import { TaskCard } from "./Task.styles";
import { FiMoreVertical } from "react-icons/fi";

export const Task = ({ key, title, details }) => {
  return (
    <TaskCard key={key}>
      <div className="task">
        <div className="taskContent">
          <p className="title">{title}</p>
          <p className="desc">{details}</p>
        </div>
        <div className="moreOptions">
          <FiMoreVertical size={19} />
        </div>
      </div>
    </TaskCard>
  );
};
