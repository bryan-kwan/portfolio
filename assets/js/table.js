
const Projects = [ //title, description, image src, page number --strings
    ["ENEL300 Project", "This is the term project I worked on. My team built an analog circuit module for noise cancellation. It also plays music and is controllable using the AVR128DB28", "pcb_1.png", "7"],
    ["Python Chess Game", "Simple chess game with legal move logic. The thumbnail features the game Kholmov vs Bronstein from the 1964 USSR Championship. White to play: can you find the best move?", "kholmov_chess_1.png", "4"],
    ["Route Optimization Script", "This is a route optimization script that I developed for my engineering club, SUAV, in our Aeroconnect 2021 competition.", "RouteOptimizationThumbnail.png", "1"],
    ["ENCM369", "In this course I learned the AVR microarchitecture and how to read a data sheet", "ENCM369_1.jpg", "3"],
    ["ENEL343", "This course taught me about circuit analysis", "343.png", "5"],
    ["ENEL361", "This course was about circuits/materials analysis of diodes and transistors", "361.png", "6"],
    ["ENEL300 Course", "This course was about the agile design process and focused on Scrum", "scrum.jpg", "8"],
    ["ENEL300 Course Talks", "This course also had guest speakers with a variety of interesting topics", "300_2.jpg", "9"],
    ["ENEL300 Project Progression", "This shows how the 300 project progressed over the term", "pcb_1.png", "10"],
    ["This JavaScript Table", "I made this table in JavaScript so that the project display can work dynamically", "JavascriptTable.png", "2"],
];

const list_element = document.getElementById('list');
const pagination_element = document.getElementById('pagination');

let current_page = 1;
let rows = list_element.classList.contains('projectpage') ? 5:2;
let columns = 3;

function DisplayList(items, wrapper, rows_per_page, columns_per_row, page) { //displays a given amount of items
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

function SetupPagination (items, wrapper, rows_per_page) { //setup page buttons
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


function CreateProject(title, description, image, index) { //html format for a "project" element
    let project = document.createElement('div');
    project.classList.add('project', 'col-xs-12', 'col-sm-6', 'col-md-4', 'col-lg-4');
    project.innerHTML = `<a class="thumbnail"href=`+"project"+index+`.html>
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

function CreateProjectRow(project_row_list) { //row of project elements
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