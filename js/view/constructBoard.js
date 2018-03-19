app.view.constructBoard = {
    setUp: function () {
        //Board.createTestData();
        Board.loadAll();

        let taskContainer = document.getElementById("task-container");
        taskContainer.innerHTML="";
        Object.keys(Board.instances).forEach((key, index) => {
            let taskCard = document.createElement('div');
            taskCard.setAttribute('class', 'task-card');
            taskCard.setAttribute('id', `taskCard${key}`);
            //ondrop="drop(event)" ondragover="allowDrop(event)"
            taskCard.setAttribute('ondrop', `app.view.constructBoard.drop(event,${key})`);
            taskCard.setAttribute('ondragover', 'app.view.constructBoard.allowDrop(event)');

            taskCard.setAttribute('class', 'task-card');
            taskCard.innerHTML = `<div class="task-header">
                                    <span class="task-header--text">
                                        ${Board.instances[key].name}
                                    </span>                
                                    <div class="plus-button itemModelbtn" name="${key}" id="itemModelbtn">+</div>
                                </div>`;
            taskContainer.appendChild(taskCard);
            Board.instances[key].tasks.forEach(item => {
                app.view.constructBoard.addTaskElement(taskCard,key,item);
            });
        })
    },
    drag: function (event, item, fromBoard) {
        event.dataTransfer.setData("item", JSON.stringify({ item, fromBoard }));
    },
    drop: function (event, toBoard) {
        event.preventDefault();
        let data = JSON.parse(event.dataTransfer.getData("item"));
        let taskCard = document.getElementById(`taskCard${toBoard}`);

        document.getElementById(`taskElement_${data.fromBoard}_${data.item._id}`).remove();
        app.view.constructBoard.addTaskElement(taskCard,toBoard,data.item);

        Board.removeTask(data.fromBoard,data.item._id);
        Board.insertTask(toBoard,data.item);

        Board.saveAll();
        app.view.modelInitialisation.setUp();
    },
    allowDrop: function (event) {
        event.preventDefault();
    },
    addTaskElement : (taskCard,key,item) => {
        let taskItem = document.createElement('div');
        taskItem.setAttribute('class', 'task-element');
        taskItem.setAttribute('id', `taskElement_${key}_${item._id}`);
        taskItem.setAttribute('draggable', "true");
        taskItem.setAttribute('ondragstart', `app.view.constructBoard.drag(event,${JSON.stringify(item)},${key})`);
        taskItem.innerHTML =
            `<div class="task-element--heading">
                        <span id="itm${item._id}"> ${item.heading}</span><input id="itm${item._id}b" class="replace" type="text" value="${item.heading}">
                       
                        <div class="tast-actions">
                            <img src="./images/edit.svg" key="${key}" itemId="${item._id}" class="editIcon" alt="edit" height="20" width="20">
                            <img src="./images/delete.svg" key="${key}" itemId="${item._id}" class="deleteIcon" alt="edit" height="20" width="20">
                        </div>
                    </div>
                    <div class="task-element--body">
                        <span id="itmb${item._id}">  ${item.description} </span><input id="itmb${item._id}b" class="replace" type="text" value=" ${item.description}">
                        <div class="tast-actions task-body-edit">
                            <img src="./images/edit.svg" key="${key}" itemId="${item._id}" class="editIconBody" alt="edit" height="20" width="20">
                        </div>
                    </div>`;
        taskCard.appendChild(taskItem);
    }
}