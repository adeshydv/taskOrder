var assert = require("assert");
var TaskExecution = require("./index.js");


describe("Task suite execution order test", function () {

  describe("Test multiple cases", function () {

    it("Should check 1", function () {
      let tasks = [];
      let dependencies = [];
      var taskList = TaskExecution();
      try {
        taskList = taskList.getTaskExecutionOrder(tasks, dependencies);
        assert.deepEqual([], taskList);
      } catch (err) {
        console.log("error : " + err);
      }
    });

    it("Should check 2", function () {
      let tasks = ["a", "b"];
      let dependencies = [];
      var taskList = TaskExecution();
      try {
        taskList = taskList.getTaskExecutionOrder(tasks, dependencies);
        assert.deepEqual(['a', 'b'], taskList);
      } catch (err) {
        console.log("error : " + err);
      }
    });

    it("Should check 3", function () {
      let tasks = ["a", "b"];
      let dependencies = ["a=>b"];
      var taskList = TaskExecution();
      try {
        taskList = taskList.getTaskExecutionOrder(tasks, dependencies);
        assert.deepEqual(['b', 'a'], taskList);
      } catch (err) {
        console.log("error : " + err);
      }
    });

    it("Should check 4", function () {
      let tasks = ["a", "b", "c", "d"];
      let dependencies = ["a=>b", "c=>d"];
      var taskList = TaskExecution();
      try {
        taskList = taskList.getTaskExecutionOrder(tasks, dependencies);
        assert.deepEqual(['b', 'a', 'd', 'c'], taskList);
      } catch (err) {
        console.log("error : " + err);
      }
    });

    it("Should check 5", function () {
      let tasks = ["a", "b", "c"];
      let dependencies = ["a=>b", "b=>c"];
      var taskList = TaskExecution();
      try {
        taskList = taskList.getTaskExecutionOrder(tasks, dependencies);
        assert.deepEqual(['c', 'b', 'a'], taskList);
      } catch (err) {
        console.log("error : " + err);
      }
    });

    it("Should check for cyclic 6", function () {
      let tasks = ["a", "b", "c", "d"];
      let dependencies = ["a=>b", "b=>c", "c=>a"];
      var taskList = TaskExecution();
      try {

        taskList = taskList.getTaskExecutionOrder(tasks, dependencies);
        assert.deepEqual("cyclic", taskList);
      } catch (err) {
        console.log("error : " + err);
      }
    });
    it("Should check for user input 1", function () {
      let tasks = ["a", "b", "c", "d", "e", "f"];
      let dependencies = ["a=>b", "c=>d", "a=>c", "b=>d"];
      var taskList = TaskExecution();
      try {
        taskList = taskList.getTaskExecutionOrder(tasks, dependencies);
        assert.deepEqual("cyclic", taskList);
      } catch (err) {
        console.log(err);
      }

    });

  });
});

