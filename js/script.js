/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

// Add variables that store DOM elements you will need to reference and/or manipulate
const studentsList = document.querySelector(".student-list");
const students     = studentsList.children;
const studentsNum  = studentsList.children.length;
const mainDiv      = document.querySelector('.page');
const filterDiv    = document.createElement('div');


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
showLimit(students, 1);



// Create and append the pagination links - Creating a function that can do this is a good approach
function paginationLinks(studentsNum){
    const linksNum  = Math.ceil(studentsNum / 10);

    for(let i = 0; i < linksNum; i++){
        const link = document.createElement('li');
        const aTag = document.createElement('a');
        aTag.href = '#';
        aTag.textContent = i;
        if(i === 0){
            aTag.classList.add('active');
        }
        link.appendChild(aTag);
        filterDiv.appendChild(link);
    }

    filterDiv.classList.add('pagination');
    mainDiv.appendChild(filterDiv);
}
paginationLinks(54);


// Add functionality to the pagination buttons so that they show and hide the correct items
// Tip: If you created a function above to show/hide list items, it could be helpful here
filterDiv.addEventListener('click', (e) => {
    e.preventDefault()
    const targetedLink = e.target;
    const listItems    = filterDiv.children;

    // remove "active" class from all list anchor tags
    for(let i = 0; i < listItems.length; i++){
        listItems[i].children[0].classList.remove('active');
    }

    targetedLink.classList.add('active');
})




