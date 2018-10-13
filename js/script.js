/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

// Add variables that store DOM elements you will need to reference and/or manipulate
const studentsList = document.querySelector(".student-list");
const students     = studentsList.children;
const studentsNum  = studentsList.children.length;


// Create a function to hide all of the items in the list excpet for the ten you want to show
// Tip: Keep in mind that with a list of 54 students, the last page will only display four
function showLimit(list, idx){
    const firstStudentIndex = (idx - 1) * 10;
    const lastStudentIndex  = firstStudentIndex + 9;

    for (let i = 0; i < studentsNum; i++){
        if (i >= firstStudentIndex && i <= lastStudentIndex){
            students[i].style.display = 'block';
        } else {
            students[i].style.display = 'none';
        }
    }
}
// showLimit(students, 2);



// Create and append the pagination links - Creating a function that can do this is a good approach




// Add functionality to the pagination buttons so that they show and hide the correct items
// Tip: If you created a function above to show/hide list items, it could be helpful here






