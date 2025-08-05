function addTask(){
    const input=document.getElementById("taskInput");
    const taskText=input.value.trim();

    if(taskText==="") return;

    const li=document.createElement("li");

    li.innerHTML=`
        <span>${taskText}</span>
        <button class="delete-btn" onclick="deleteTask(this)">Delete</button>`;

    document.getElementById("taskList").appendChild(li);
    input.value="";
}

function deleteTask(button){
    const li=button.parentElement;
    li.remove();
}