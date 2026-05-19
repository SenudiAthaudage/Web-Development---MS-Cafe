function showMenu(menuId){

    // Hide all menus
    let menus = document.querySelectorAll(".menu");

    menus.forEach(function(menu){
        menu.style.display = "none";
    });

    // Show selected menu
    document.getElementById(menuId).style.display = "flex";
}


// querySelectorAll() → finds all menus
// forEach() → loops through each menu
// getElementById() → finds one specific menu
// style.display → hides or shows the menu