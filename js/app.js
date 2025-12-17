document.addEventListener("DOMContentLoaded",()=>{
    const navitems=document.querySelectorAll(".sidebar li");
    const sections= document.querySelectorAll(".main-content section");
    function showSection(targetid) {
        sections.forEach(section=>{
            section.style.display="none";
        });
        //to render page and pre save habits by itself

        const targetSection=document.getElementById(targetid);
        targetSection.style.display="block";
        if(targetid==="habits"){
            renderHabits();

            setTimeout(()=>{
                habitInput.focus();
            },0);
        }


        if(!targetSection){   //to hide section
            console.error("No secton found with id:",targetid);
            return;
        }
       // targetSection.style.display="block";
    }





    navitems.forEach(item=>{
        item.addEventListener("click",()=>{
            const targetid = item.getAttribute("data-target");
            showSection(targetid);
        });

    });


    
    const habitInput = document.getElementById("habitName");
    const addHabitBtn = document.getElementById("addHabitBtn");
    const habitList = document.getElementById("habitList");
    //load habuts from local storage
    let habits=JSON.parse(localStorage.getItem("habits"))||[];

    //completed 
    habits=habits.map(habit=>({
        ...habit,
        completed:habit.completed??false
    }));

    //render habits
    function renderHabits(){
        habitList.innerHTML="";  //clear list

        habits.forEach(habit=>{
            const li=document.createElement("li");
            //li.textContent=habit.text;
            //checkbox
            const checkbox=document.createElement("input");
            checkbox.type="checkbox";
            checkbox.checked=habits.completed;

            checkbox.addEventListener("change",()=>{
                toggleHabit(habit.id);
            });

            //text
            const span=document.createElement("span");
            span.textContent=habit.text;

            if (habit.completed){
                span.style.textDecoration="line-through";
                span.style.opacity="0.6";
            }

            //delete button

            const deleteBtn=document.createElement("button");
            deleteBtn.textContent="X"

            deleteBtn.addEventListener("click",()=>{
                deleteHabit(habit.id);
            });
            li.appendChild(checkbox);
            li.appendChild(span);
            li.appendChild(deleteBtn);



            habitList.appendChild(li);
        });
    };

    function deleteHabit(id){
        habits=habits.filter(habit=>habit.id !==id);
        localStorage.setItem("habits",JSON.stringify(habits));
        renderHabits();
    }

    function toggleHabit(id){
        habits=habits.map(habit=>
            habit.id===id
            ?{...habit,completed:!habit.completed}
            :habit
        );
        localStorage.setItem("habits",JSON.stringify(habits));
        renderHabits();
    }





    //add habit

    addHabitBtn.addEventListener("click", () => {
        const habitText=habitInput.value.trim();
         if (habitText === "")return;

        const newHabit={
            id:Date.now(),
            text:habitText,
            completed:false
        };
        habits.push(newHabit);
        localStorage.setItem("habits",JSON.stringify(habits));
         // Clear input
        habitInput.value ="";
        renderHabits();
    });
});



