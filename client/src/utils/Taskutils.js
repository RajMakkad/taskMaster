export const priorityMapping = {
    "Low": 1,
    "Medium": 2,
    "High": 3
}

export const parseTasks =  {
    0 : (tasks) => tasks,
    1 : (tasks) => tasks.filter(task => !task.status),
    2 : (tasks) => tasks.filter(task => task.status),
    3 : (tasks) => [...tasks].sort((task1, task2) => priorityMapping[task2.priority] - priorityMapping[task1.priority]),
    4 : (tasks) => [...tasks].sort((task1, task2) => task1.time - task2.time)
}