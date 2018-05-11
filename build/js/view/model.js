
app.view.modelInitialisation = {

    setUp: function () {
        let modal = document.getElementById('myModal');
        let itemModel = document.getElementById("addItemsModal")

        // Get the button that opens the modal
        let btn = document.getElementById("myBtn");

        let itemModelbtn = document.getElementsByClassName("itemModelbtn");
        let itemModelbtnClose = document.getElementById("addItemsModal-close");
        let editIcon = document.getElementsByClassName("editIcon");
        let deleteIcon = document.getElementsByClassName("deleteIcon");
        let editIconBody = document.getElementsByClassName("editIconBody");

        // Get the <span> element that closes the modal
        let insertList = document.getElementById("insert-list");
        let insertItem = document.getElementById("insert-item")

        let span = document.getElementById("model-close");

        let currentKey = "";


        // When the user clicks on the button, open the modal 
        btn.onclick = function () {
            modal.style.display = "block";
        }

        for (let i = 0; i < itemModelbtn.length; i++) {
            itemModelbtn[i].onclick = function (e) {
                currentKey = itemModelbtn[i].getAttribute("name")
                itemModel.style.display = "block"
            }
        }

        for (let i = 0; i < editIconBody.length; i++) {
            editIconBody[i].onclick = function (e) {

                let itemId = editIcon[i].getAttribute('itemId');
                let key = editIcon[i].getAttribute('key');

                let taskBody = document.getElementById('itmb' + itemId);
                let taskBodyText = document.getElementById('itmb' + itemId + "b");

                let heading = document.getElementById('itm' + itemId).innerHTML;

                taskBody.style.display = "none";
                taskBodyText.style.display = "inline";
                taskBodyText.focus();
                taskBodyText.addEventListener("blur", function () {
                    taskBody.style.display = "inline";

                    taskBodyText.style.display = "none";

                    Board.updateTask(key, { heading, description: taskBodyText.value, _id: itemId })
                    Board.saveAll();
                    app.view.constructBoard.setUp();
                    app.view.modelInitialisation.setUp();
                })


            }
        }

        for (let i = 0; i < editIcon.length; i++) {
            editIcon[i].onclick = function (e) {

                let itemId = editIcon[i].getAttribute('itemId');
                let key = editIcon[i].getAttribute('key');


                let header = document.getElementById('itm' + itemId);
                let headerText = document.getElementById('itm' + itemId + "b");

                let description = document.getElementById('itmb' + itemId).innerHTML;


                header.style.display = 'none'
                headerText.style.display = "inline";

                headerText.focus()

                headerText.addEventListener('blur', function () {
                    header.style.display = "inline";
                    headerText.style.display = "none";

                    Board.updateTask(key, { description, heading: headerText.value, _id: itemId })
                    Board.saveAll();
                    app.view.constructBoard.setUp();
                    app.view.modelInitialisation.setUp();
                })
            }
        }
        for (let i = 0; i < deleteIcon.length; i++) {
            deleteIcon[i].onclick = function (e) {
                let key = deleteIcon[i].getAttribute("key");
                let itemId = deleteIcon[i].getAttribute("itemId");
                Board.removeTask(key, Number(itemId));
                Board.saveAll();
                app.view.constructBoard.setUp();
                app.view.modelInitialisation.setUp();
            }
        }
        insertList.onclick = function () {
            let listName = document.getElementById("listName").value;
            let temp = {
                name: listName,
                tasks: [],
                _id: Math.random() * 10000000
            }
            document.getElementById("listName").value = "";
            Board.add(temp);
            Board.saveAll();
            modal.style.display = "none";
            app.view.constructBoard.setUp();
            app.view.modelInitialisation.setUp();
        }
        insertItem.onclick = function (e) {
            let itemName = document.getElementById("itemName").value;
            let itemDesc = document.getElementById("itemDesc").value;
            let temp = {
                heading: itemName,
                description: itemDesc,
                _id: Math.random() * 10000000,
                createdDate: new Date()
            }
            document.getElementById("itemName").value ="";
            document.getElementById("itemDesc").value="";
            Board.insertTask(currentKey, temp)
            Board.saveAll();
            itemModel.style.display = "none"
            app.view.constructBoard.setUp();
            app.view.modelInitialisation.setUp();
        }


        // When the user clicks on <span> (x), close the modal
        span.onclick = function () {
            modal.style.display = "none";
        }
        itemModelbtnClose.onclick = function () {
            itemModel.style.display = "none"
        }
        // When the user clicks anywhere outside of the modal, close it
        window.onclick = function (event) {
            if (event.target == modal) {
                modal.style.display = "none";

            }
            if (event.target == itemModel) {
                itemModel.style.display = "none"
            }
        }
    }
}
