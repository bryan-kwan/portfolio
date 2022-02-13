
const Projects = [ //title, description, image src, page number --strings

    ["title1", "description1", "s1.jpg", "1"],
    ["title2", "description2", "s1.jpg", "2"],
    ["title3", "description3", "s1.jpg", "3"],
    ["title4", "description4", "s1.jpg", "4"],
    ["title5", "description", "s1.jpg", "5"],
    ["title6", "description", "s1.jpg", "6"],
    ["title7", "description", "s1.jpg", "7"],
    ["title8", "description", "s1.jpg", "8"],

];

const list_element = document.getElementById('list');
const pagination_element = document.getElementById('pagination');

let current_page = 1;
let rows = list_element.classList.contains('projectpage') ? 5:2;
let columns = 3;

function DisplayList(items, wrapper, rows_per_page, columns_per_row, page) {
    wrapper.innerHTML = "";
    page--;

    let start = rows_per_page * page * columns_per_row;
    let end = start + rows_per_page * columns_per_row;
    let paginatedItems = items.slice(start, end);
    for (let i = 0; i< Math.ceil(paginatedItems.length/columns_per_row); i++) {
        let row_start = start + i*columns_per_row;
        let row_end = start + (i+1) * columns_per_row;
        let row_list = items.slice(row_start, row_end);
        let item_element = CreateProjectRow(row_list);
        item_element.classList.add('item');
        wrapper.appendChild(item_element);
    }
}

function SetupPagination (items, wrapper, rows_per_page) {
    wrapper.innerHTML = "";
    if (items.length==0) {return;}

    let page_count = Math.ceil(items.length/rows_per_page/3);

    let b_button = BackButton(items);
    wrapper.appendChild(b_button);

    
    for (let i = 1; i<page_count + 1; i++) {
        let button = PaginationButton(i, items);

        wrapper.appendChild(button);
    }

    let f_button = ForwardButton(items, page_count);
    wrapper.appendChild(f_button);

}

function PaginationButton(page, items) {
    let button = document.createElement('button');
    button.innerText = page;

    if(current_page==page) button.classList.add('active');

    button.addEventListener('click', function () {
        current_page = page;
        DisplayList(items, list_element, rows, columns, current_page);

        let current_btn = document.querySelector('.pagenumbers button.active');
        current_btn.classList.remove('active');
        
        button.classList.add('active');
    });

    return button;
    
}

function ForwardButton(items, page_count) {
    let button = document.createElement('button');
    button.innerText = ">>";
    
    button.addEventListener('click', function() {
        if(current_page < page_count) current_page++;
        DisplayList(items, list_element, rows, columns, current_page);
        
        let current_btn = document.querySelector('.pagenumbers button.active');
        current_btn.classList.remove('active');
        button.classList.add('active');
    });
    return button;
}

function BackButton(items) {
    let button = document.createElement('button');
    button.innerText = "<<";

    button.addEventListener('click', function() {
        if(current_page > 1) current_page--;
        DisplayList(items, list_element, rows, columns, current_page);
        
        let current_btn = document.querySelector('.pagenumbers button.active');
        current_btn.classList.remove('active');
        button.classList.add('active');
    });
    return button;
}


function CreateProject(title, description, image, index) {
    let project = document.createElement('div');
    project.classList.add('project', 'col-xs-12', 'col-sm-6', 'col-md-4', 'col-lg-4');
    project.innerHTML = `<a class="thumbnail"href=`+"project"+index+`>
                        <span class="img">
                            <img src="assets/images/`+image+`" alt="">
                            <span class="cover"><span class="more">See details &rarr;</span></span>
                        </span>
                        <span class="title">`+title+`</span>
                        </a>
                        <h4></h4>
                        <p>`+description+`</p>`
                        ;
    return project;
}

function CreateProjectRow(project_row_list) {
    let row_element = document.createElement('div');
    row_element.classList.add('thumbnails', 'recentworks', 'row');
    for (let i = 0; i<project_row_list.length; i++) {
        let project = project_row_list[i];
        let title = project[0];
        let description = project[1];
        let image = project[2];
        let index = project[3];
        let project_element = CreateProject(title, description, image, index);
        
        row_element.appendChild(project_element);
    }
    return row_element;
}

DisplayList(Projects, list_element, rows, columns, current_page);
SetupPagination(Projects, pagination_element, rows);