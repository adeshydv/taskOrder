
module.exports = function TaskExecution(serialized) {
  var taskList = {
    addTask: addTask,
    tasks: tasks,
    dependsOn: dependsOn,
    addDependency: addDependency,
    search: search,
    getTaskExecutionOrder: getTaskExecutionOrder
  };
  var cyclicGraph;
  var edges = {};

  //funtion to add tasks
  function addTask(task) {
    edges[task] = dependsOn(task);
    return taskList;
  }

  function dependsOn(task) {
    return edges[task] || [];
  }

  //funtion to add depencies of taks
  function addDependency(taskName, dependencyName) {
    addTask(taskName);
    addTask(dependencyName);
    dependsOn(taskName).push(dependencyName);
    return taskList;
  }

   // funtion to provide task list
   function tasks() {
    var taskSet = {};
    Object.keys(edges).forEach(function (taskName) {
      taskSet[taskName] = true;
      edges[taskName].forEach(function (dependencyName) {
        taskSet[dependencyName] = true;
      });
    });
    return Object.keys(taskSet);
  }

  //funtion to search execution order of the tasks
  function search() {

    let sourceNodes = tasks();
    var visited = {};
    var nodeList = [];

    function taskListTraverse(task) {
      if (!visited[task]) {
        visited[task] = true;
        dependsOn(task).forEach(taskListTraverse);
        nodeList.push(task);
      }
    }
    sourceNodes.forEach(taskListTraverse);
    return nodeList;
  }

  //main funtion which is being called from external file.
  function getTaskExecutionOrder(tasks = [], dependencies = []) {
    tasks.forEach((taskelement) => {
      if (taskelement.toUpperCase() == taskelement) {
        throw new Error("Task cannot be in uppercase");
      }
      taskList.addTask(taskelement);
    });
    for (let i = 0; i < dependencies.length; i++) {
      let taskList = dependencies[i].split("=>");
      if (taskList[0].toUpperCase() == taskList[0] || taskList[1].toUpperCase() == taskList[1]) {
        throw new Error("Task cannot be in uppercase");
      }
      addDependency(taskList[0], taskList[1]);
    }
    if (isCyclicDependency()) {
      throw new Error("Cyclic dependency");
    } else {
      return search();
    }
  }

  // funtion to cyclic dependency
  function isCyclicDependency() {
    let visited = {};
    cyclicGraph = false;
    taskList.tasks().forEach((element) => {
      visited = {};
      if (!cyclicGraph) {
        checkCycle(element);
      }
    });

    function checkCycle(task) {

      if (visited[task] == true) {
        throw new Error("Cyclic dependency");
      }
      else {
        visited[task] = true;
        taskList.dependsOn(task).forEach((adjNode) => {
          checkCycle(adjNode);
        });
      }
    }
  }
  return taskList;
}
