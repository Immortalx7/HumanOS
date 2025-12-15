document.addEventListener("DOMContentLoaded",()=>{
    const navitems=document.querySelectorAll(".sidebar li");
    const sections= document.querySelectorAll(".main-content section");
    function showSection(targetid) {
        sections.forEach(section=>{
            section.style.display="none";
        });

        const targetSection=document.getElementById(targetid);
        if(!targetSection){
            console.error("No secton found with id:",targetid);
            return;
        }
        targetSection.style.display="block";
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

    addHabitBtn.addEventListener("click", () => {
        const habitText = habitInput.value.trim();

         if (habitText === "") {
            alert("Please enter a habit");
            return;
    }

        // Create list item
        const li = document.createElement("li");
        li.textContent = habitText;

        // Add to list
        habitList.appendChild(li);

        // Clear input
        habitInput.value = "";
    });
});



