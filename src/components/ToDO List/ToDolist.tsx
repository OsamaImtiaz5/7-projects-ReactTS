import { GrFormAdd } from "react-icons/gr";
import Button from "../Button";
import React from "react";
import { RiDeleteBack2Fill, RiDeleteBin5Fill } from "react-icons/ri";
import CustomSwitch from "../Switch";
import MainContainer from "../MainContainer";
import AppLayout from "../PersistentDrawer";

const ToDolist = () => {
  const [task, setTask] = React.useState("");
  const [taskList, setTaskList] = React.useState<
    { id: number; value: string; isCompleted: boolean }[]
  >([]);

  const addTask = () => {
    if (task === "") {
      alert("Task cannot be empty");
      return;
    }
    if (task) {
      const taskDetails = {
        id: taskList.length + 1,
        value: task,
        isCompleted: false,
      };
      setTaskList([...taskList, taskDetails]);
      setTask("");
      console.log(taskList);
    }
  };
  const deleteTask = (id: number) => {
    const updatedTaskList = taskList.filter((task) => task.id !== id);
    setTaskList(updatedTaskList);
  };
  const toggleTask = (id: number, checked: boolean) => {
    const updatedTaskList = taskList.map((task) =>
      task.id === id ? { ...task, isCompleted: checked } : task
    );
    setTaskList(updatedTaskList);
  };
  return (
    <AppLayout>
      <MainContainer heading="To Do List App">
        <div className="pt-8 text-white font-bold ">
          <div className="flex flex-col items-center ">
            <div className="bg-purple-500/100 w-[350px] shadow-2xl hover:shadow-blue-500 rounded">
              <h2 className="text-center">To Do Menu</h2>
              <div className="flex flex-row place-self-center justify-center m-3 w-[260px] h-10 border border-blue-400 bg-pink-400 mx-1.5 rounded">
                <input
                  type="text"
                  className="h-full w-full px-4 text-sm placeholder:text- placeholder:text-sx rounded-l focus:outline-none"
                  placeholder="Add a new task"
                  value={task}
                  onChange={(e) => setTask(e.target.value)}
                />
                <Button
                  onClick={addTask}
                  className="h-full w-full flex items-center justify-center rounded-r bg-blue-500 hover:bg-pink-700"
                >
                  <GrFormAdd />
                </Button>
              </div>
              <div className="flex flex-col items-center">
                <div className={`${taskList.length > 0 && "  pt-2 px-2  "}`}>
                  {taskList.map((t) => (
                    <div
                      key={t.id}
                      className={`flex flex-row justify-between items-center w-[260px] h-10 border text:md font-bold px-4 bg-gray-400 rounded-md mb-2 ${
                        t.isCompleted ? "bg-green-400" : "bg-violet-500"
                      }`}
                    >
                      <p
                        className={`${
                          t.isCompleted
                            ? "line-through decoration-red-500 decoration-2"
                            : ""
                        }`}
                      >
                        {t.value}
                      </p>
                      <div className="flex flex-row-reverse my-auto justify-items-center p-1 ">
                        <button onClick={() => deleteTask(t.id)}>
                          <RiDeleteBin5Fill size={20} />
                        </button>
                        <CustomSwitch
                          isChecked={t.isCompleted}
                          onChange={(checked) => {
                            toggleTask(t.id, checked);
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </MainContainer>
    </AppLayout>
  );
};

export default ToDolist;
