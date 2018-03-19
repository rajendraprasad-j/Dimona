function Board(board) {
    this.name = board.name;
    this.tasks = board.tasks;
    this._id = board._id;
}

Board.instances = {};

Board.convertRow2Obj = function (boardRow) {
    let board = new Board(boardRow);
    return board;
};
// Load the board table from Local Storage
Board.loadAll = function () {
    let key = "", keys = [], boardString = "", board = {}, i = 0;
    try {
        if (localStorage.getItem("bridgeCreekBoard")) {
            boardString = localStorage.getItem("bridgeCreekBoard");
        }
    } catch (e) {
        alert("Error when reading from Local Storage\n" + e);
    }
    if (boardString) {
        board = JSON.parse(boardString);
        keys = Object.keys(board);
        for (i = 0; i < keys.length; i++) {
            key = keys[i];
            Board.instances[key] = Board.convertRow2Obj(board[key]);
        }
    }
};
//  Save all board objects to Local Storage
Board.saveAll = function () {
    let boardsString = "", error = false,
        nmrOfBoards = Object.keys(Board.instances).length;
    try {
        boardsString = JSON.stringify(Board.instances);
        localStorage.setItem("bridgeCreekBoard", boardsString);
    } catch (e) {
        alert("Error when writing to Local Storage\n" + e);
        error = true;
    }
    if (!error) console.log(nmrOfBoards + " boards saved.");
};
//  Create a new board row
Board.add = function (slots) {
    let board = new Board(slots);
    Board.instances[slots._id] = board;
    console.log("Board " + slots._id + " created!");
};

Board.updateTask = function (slotId, task) {
    let board = Board.instances[slotId];
    let item = board.tasks.find(element => {
        return element._id == task._id;
    });
    
    item.heading = task.heading;
    item.description = task.description;
    console.log("Board " + slotId + " modified!");
};

Board.removeTask = function (slotsId, taskId) {
    let board = Board.instances[slotsId];
    board.tasks.forEach((element, i) => {
        if (element._id === taskId) {
            board.tasks.splice(i, 1);
        }
    });
}
Board.insertTask = function (slotsId, task) {
    let board = Board.instances[slotsId];
    board.tasks.push(task);
}

//  Delete a board row from persistent storage
Board.destroy = function (_id) {
    if (Board.instances[_id]) {
        console.log("Board " + _id + " deleted");
        delete Board.instances[_id];
    } else {
        console.log("There is no board with Id " + _id + " in the database!");
    }
};












/*******************************************
*** Auxiliary methods for testing **********
********************************************/
//  Create and save test data
Board.createTestData = function () {
    Board.instances["1"] = new Board({
        _id: "1", tasks: [
            {
                heading: "task1",
                description: "CJCP001: Set up development environment in Eclipse IDE to work on Java project",
                _id: "1",
                createdDate: new Date()
            }
        ], name: "Backlog"
    });
    Board.instances["2"] = new Board({
        _id: "2", tasks: [
            {
                heading: "task1",
                description: "Finish the app",
                _id: "2",
                createdDate: new Date()
            }
        ], name: "Work In Progress"
    });
    Board.saveAll();
};
//  Clear data
Board.clearData = function () {
    if (confirm("Do you really want to delete all board data?")) {
        Board.instances = {};
        localStorage.setItem("boards", "{}");
    }
};
