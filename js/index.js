
//----------------------------------------
//          Variable declarations
//----------------------------------------
const passingScore = 80;
const passingMessage = "Congratulations!<br>You've passed the assessment. Click the Certificate button to view your certificate.";
const failingMessage = "Sorry, you failed.<br>Click the Retake Assessment button to retake the assessment.";
const notStartedIco = "fa-regular fa-circle";                     
const startedIco = "fa-solid fa-circle-half-stroke";
const completedIco = "fa-solid fa-circle";
const lockedIco = "fa-solid fa-lock";
const incorrectFeedback = "This is not the correct answer. Please try again.";
const incorrectFeedback2 = "This is not the correct answer.";
const continueFeedback = "<br><br>Click the Next Slide button to proceed.";
const continueFeedback2 = "<br><br>Click the Continue button to proceed.";
const alertCorrectClass = "alert-success";
const alertIncorrectClass = "alert-danger";

let scorm;
let isLmsConnected = false;
let debugMode = true;
let username = "";
let autoPlayVideo = false;
let videoPlayer;
let current;
let totalSlides = 0;
let score = 0; 
let finalScore = 0;
let testIndex = 0;
let activeMenuId = 0;
let userProgress;
let menuLocked = false;

let firstName = "";
let lastName = "";
let fullName = "";

//Stores the menu data, including the slide id, title, and media associated with the slide
const menuData = [
    
    //Overview
    {
        id : "OVER",
        title : "Overview",
        locked : false,
        type : "",
        data : [
            {
                id : "OVER_000",
                subtitle : "Purpose of the Course",
                type : "video",
                media : "Purpose_of_the_Course.mp4"
            },

            {
                id : "OVER_001",
                subtitle : "Menu Components",
                type : "video",
                media : "Menu_Components.mp4"
            },

            {
                id : "OVER_002",
                subtitle : "Accessing Unanet",
                type : "video",
                media : "Accessing_Unanet.mp4"
            },

        ]
    },

    //Contracts Menu
    {
        id : "CONT_MENU",
        title : "Contracts Menu",
        locked : true,
        type : "",
        data : [

            {
                id : "",
                subtitle : "Overview",
                type : "",
                media : ""
            },

            {
                id : "",
                subtitle : "Contracts - Dashboard Page",
                type : "",
                media : ""
            },

            {
                id : "",
                subtitle : "Contracts - Notes Page",
                type : "",
                media : ""
            },

            {
                id : "",
                subtitle : "Contracts - Projects Page",
                type : "",
                media : ""
            },


            {
                id : "",
                subtitle : "Knowledge Check 1",
                type : "",
                media : ""
            },

            {
                id : "",
                subtitle : "Summary",
                type : "",
                media : ""
            },

        ]
    },


    //Time - Menu
    {     
        id : "TIME_MENU",
        title : "Time Menu",
        locked : false,
        type : "",
        data : [

            //Videos
            {
                id : "TIME_MENU_000",
                subtitle: "Overview",
                type : "video",
                media : "Time_Menu_Overview.mp4"
            },

            {
                id : "TIME_MENU_002",
                subtitle: "Time - Dashboard Page",
                type : "video",
                media : "Time_Dashboard_Page.mp4"
            },
            {
                id : "TIME_MENU_003",
                subtitle: "Time - List Page",
                type : "video",
                media : "Time_List_Page.mp4"
            },
            {
                id : "TIME_MENU_004",
                subtitle: "Time - Current Page",
                type : "video",
                media : "Time_Current_Page.mp4"
            },
            {
                id : "TIME_MENU_005",
                subtitle: "Time - My Projects Page",
                type : "video",
                media : "Time_My_Projects_Page.mp4"
            },

            //Knowledge Checks
            {
                id : "TIME_MENU_006",
                subtitle: "Knowledge Check 1",
                type : "quiz",
                media : "lsn_0_question_0"
            },
            {
                id : "TIME_MENU_007",
                subtitle: "Knowledge Check 2",
                type : "quiz",
                media : "lsn_0_question_1"
            },
            {
                id : "TIME_MENU_008",
                subtitle: "Knowledge Check 3",
                type : "quiz",
                media : "lsn_0_question_2"
            },

            {
                id : "TIME_MENU_009",
                subtitle: "Knowledge Check 3",
                type : "quiz",
                media : "lsn_0_question_3"
            },

            {
                id : "TIME_MENU_010",
                subtitle: "Knowledge Check 4",
                type : "quiz",
                media : "lsn_0_question_4"
            },

            {
                id : "TIME_MENU_011",
                subtitle: "Knowledge Check 5",
                type : "quiz",
                media : "lsn_0_question_5"
            },

            {
                id : "TIME_MENU_012",
                subtitle: "Knowledge Check 6",
                type : "quiz",
                media : "lsn_0_question_6"
            },

            {
                id : "TIME_MENU_013",
                subtitle: "Knowledge Check 7",
                type : "quiz",
                media : "lsn_0_question_7"
            },



            //Summary
            {
                id : "TIME_MENU_018",
                subtitle: "Summary",
                type : "video",
                media : "Time_Menu_Summary.mp4"
            },
        ]        
    },

       //Expense Menu
       {
        id : "EXP_MENU",
        title : "Expense Menu",
        locked : true,
        type : "",
        data : [

            
            {
                id : "",
                subtitle : "Overview",
                type : "",
                media : ""
            },

            {
                id : "",
                subtitle : "Expense - Dashboard Page",
                type : "",
                media : ""
            },

            {
                id : "",
                subtitle : "Expense - List Page",
                type : "",
                media : ""
            },

            {
                id : "",
                subtitle : "Expense - My Projects Page",
                type : "",
                media : ""
            },

            {
                id : "",
                subtitle : "Knowledge Check 1",
                type : "",
                media : ""
            },

            {
                id : "",
                subtitle : "Summary",
                type : "",
                media : ""
            },

        ]
    },

    //Reports Menu
    {
        id : "REP_MENU",
        title : "Reports Menu",
        locked : true,
        type : "",
        data : [

            {
                id : "",
                subtitle : "Overview",
                type : "",
                media : ""
            },

            {
                id : "",
                subtitle : "Reports - Dashboard Page",
                type : "",
                media : ""
            },

            {
                id : "",
                subtitle : "Reports - Saved Page",
                type : "",
                media : ""
            },

            {
                id : "",
                subtitle : "Reports - Analytics Page",
                type : "",
                media : ""
            },

            {
                id : "",
                subtitle : "Knowledge Check 1",
                type : "",
                media : ""
            },

            {
                id : "",
                subtitle : "Summary",
                type : "",
                media : ""
            },

        ]
    },    

    //My Account Menu
    {     
        id : "ACC_MENU",
        title : "My Account Menu",
        type : "",
        data : [

            //Videos
            {
                id : "ACC_MENU_000",
                subtitle: "Overview",
                type : "video",
                media : "My_Account_Menu_Overview.mp4"
            },

            {
                id : "ACC_MENU_002",
                subtitle: "Log Out Sub-Menu Option",
                type : "video",
                media : "Log_Out_Sub-Menu_Option.mp4"
            },
            {
                id : "ACC_MENU_003",
                subtitle: "Preferences Page",
                type : "video",
                media : "Preferences_Page.mp4"
            },

            //Knowledge Checks
            {
                id : "ACC_MENU_004",
                subtitle: "Knowledge Check 1",
                type : "quiz",
                media : "lsn_1_question_0"
            },
            {
                id : "ACC_MENU_005",
                subtitle: "Knowledge Check 2",
                type : "quiz",
                media : "lsn_1_question_1"
            },
            {
                id : "ACC_MENU_006",
                subtitle: "Knowledge Check 3",
                type : "quiz",
                media : "lsn_1_question_2"
            },
            {
                id : "ACC_MENU_007",
                subtitle: "Knowledge Check 4",
                type : "quiz",
                media : "lsn_1_question_3"
            },      
            {
                id : "ACC_MENU_008",
                subtitle: "Knowledge Check 5",
                type : "quiz",
                media : "lsn_1_question_4"
            },          
            {
                id : "ACC_MENU_009",
                subtitle: "Knowledge Check 6",
                type : "quiz",
                media : "lsn_1_question_5"
            },  
            
            //Summary
            {
                id : "ACC_MENU_011",
                subtitle: "Summary",
                type : "video",
                media : "My_Account_Menu_Summary.mp4"
            },
        ]        
    },

    //Summary
    {
        id : "FINAL_ASSESSMENT",
        title: "Final Assessment",
        type : "",
        data : [
            {
                id : "FINAL_ASSESSMENT_000",                
                subtitle: "Final Assessment",        
                type : "test_simulation",
                media : "unanet_master.html"
            } 
        ]
    }
];    

//Stores the quiz questions, answers, and feedback text
const quizQuestions = 
[

    //Time Menu Knowledge Checks
    {
        id : "lsn_0_question_0",
        question : "What does the <i>Time - Dashboard</i> page primarily display?",
        answers : 
        [
            "A view of your current timesheet and active expense reports",
            "An aggregated list of project codes",
            "A view of all completed timesheets",
            "The option to enter and submit hours worked"
        ],
        randomize: true,
        correctIndex : 0,
        correctFeedback : "The <i>Time - Dashboard</i> page displays your current timesheet and any active expense reports.",
        incorrectFeedback : incorrectFeedback
    },

    {
        id : "lsn_0_question_1",
        question : "When creating a new timesheet, what action can you take if you need to change the pay period?",
        answers : 
        [
            "Click the Edit button on the <i>Time - Current</i> page",
            "Use the <i>Calendar</i> icon on the <i>Time - Create</i> page",
            "Navigate to the <i>Time - List</i> page and select a new pay period",
            "Contact your timesheet admin"
        ],
        randomize: true,
        correctIndex : 1,
        correctFeedback : "To adjust the pay period on your timesheet, you should use the <i>Calendar</i> icon on the <i>Time - Create Timesheet</i> page.",
        incorrectFeedback : incorrectFeedback
    },

    {
        id : "lsn_0_question_2",
        question : "What status will you see if you are currently editing a timesheet?",
        answers : 
        [
            "SUBMITTED",
            "APPROVING",
            "INUSE",
            "EXTRACTED"
        ],
        randomize: true,
        correctIndex : 2,
        correctFeedback : "When you are currently editing a timesheet, the status shown will be INUSE.",
        incorrectFeedback : incorrectFeedback
    },

    {
        id : "lsn_0_question_3",
        question : "Which page within the <i>Time</i> menu allows you to enter hours worked for the active pay period?",
        answers : 
        [
            "<i>Time - Dashboard</i>",
            "<i>Time - List</i>",
            "<i>Time - Current</i>",
            "<i>Time - My Projects</i>"
        ],
        randomize: true,
        correctIndex : 2,
        correctFeedback : "The <i>Time - Current</i> page allows you to enter hours worked for the current pay period.",
        incorrectFeedback : incorrectFeedback
    },

    {
        id : "lsn_0_question_4",
        question : "Where can you view an aggregated list of completed timesheets?",
        answers : 
        [
            "<i>Time - Dashboard</i>",
            "<i>Time - List</i>",
            "<i>Time - Current</i>",
            "<i>Time - My Projects</i>"
        ],
        randomize: true,
        correctIndex : 1,
        correctFeedback : "The <i>Time - List</i> page provides a view of an aggregated list of all completed timesheets.",
        incorrectFeedback : incorrectFeedback
    },

    {
        id : "lsn_0_question_5",
        question : "What does the EXTRACTED status indicate in the Completed Timesheets dropdown on the <i>Time - List</i> page?",
        answers : 
        [
            "The timesheet has been edited by an admin",
            "The timesheet is currently being approved",
            "The timesheet has been approved and extracted for processing",
            "The timesheet is available for data entry"
        ],
        randomize: true,
        correctIndex : 2,
        correctFeedback : "The EXTRACTED status indicates that the timesheet has been approved and extracted for processing.",
        incorrectFeedback : incorrectFeedback
    },

    {
        id : "lsn_0_question_6",
        question : "How can you view a list of all active timesheets that have not been submitted?",
        answers : 
        [
            "Use the Active Timesheets dropdown on the <i>Time - List</i> page",
            "Use the Completed Timesheets dropdown on the <i>Time - List</i> page",
            "Navigate to the <i>Time - My Projects</i> page",
            "Select the Create Timesheet link on the <i>Time - Current</i> page"
        ],
        randomize: true,
        correctIndex : 0,
        correctFeedback : "You can view a list of all active timesheets that have not been submitted by using the Active Timesheets dropdown on the <i>Time - List</i> page.",
        incorrectFeedback : incorrectFeedback
    },

    {
        id : "lsn_0_question_7",
        question : "Which page will you find a list of project codes associated with your employee ID?",
        answers : 
        [
            "<i>Time - Dashboard</i>",
            "<i>Time - List</i>",
            "<i>Time - Current</i>",
            "<i>Time - My Projects</i>"
        ],
        randomize: true,
        correctIndex : 3,
        correctFeedback : "The <i>Time - My Projects</i> page provides a list of project codes associated with your employee ID.",
        incorrectFeedback : incorrectFeedback
    },


    //My Account Menu Knowledge Checks
    {
        id : "lsn_1_question_0",
        question : "Which sub-menu option allows you to log out of the Unanet web application?",
        answers : 
        [
            "<i>Log Out</i>",
            "<i>Preferences</i>",
            "<i>Help</i>",
            "<i>About</i>"
        ],
        randomize: true,
        correctIndex : 0,
        correctFeedback : "The <i>Log Out</i> sub-menu option in the <i>My Account</i> menu allows you to log out of the Unanet web application.",
        incorrectFeedback : incorrectFeedback
    },


    {
        id : "lsn_1_question_1",
        question : "How can you update your current password if you receive a temporary one from the IT department?",
        answers : 
        [
            "Update by accessing the <i>Help</i> sub-menu",
            "Use the <i>Log Out</i> option",
            "Update by accessing the <i>Preferences</i> sub-menu",
            "Update by accessing the <i>About</i> sub-menu"
        ],
        randomize: true,
        correctIndex : 2,
        correctFeedback : "You should update your current password by accessing the <i>Preferences</i> sub-menu and then going to the <i>Passwords</i> tab if you received a temporary one from the IT department.",
        incorrectFeedback : incorrectFeedback
    },

    {
        id : "lsn_1_question_2",
        question : "What should you do if your password expires?",
        answers : 
        [
            "Access the <i>Help</i> sub-menu for assistance",
            "Submit a Help Desk request to the IT department",
            "Log out and log back in",
            "Use the <i>About</i> sub-menu to find information"
        ],
        randomize: true,
        correctIndex : 1,
        correctFeedback : "If your password expires, you should submit a Help Desk request to the IT department for assistance.",
        incorrectFeedback : incorrectFeedback
    },
 
    {
        id : "lsn_1_question_3",
        question : "How often does your password expire in Unanet?",
        answers : 
        [
            "Every 30 days",
            "Every 60 days",
            "Every 90 days",
            "Every 120 days"
        ],
        randomize: false,
        correctIndex : 1,
        correctFeedback : "Your organization has set the password expiration in Unanet to expire every 60 days.",
        incorrectFeedback : incorrectFeedback
    },

    {
        id : "lsn_1_question_4",
        question : "How many days before expiration will you receive a warning message about your password?",
        answers : 
        [
            "5 days",
            "10 days",
            "15 days",
            "30 days"
        ],
        randomize: false,
        correctIndex : 1,
        correctFeedback : "You will receive a warning message in Unanet 10 days before your password expires.",
        incorrectFeedback : incorrectFeedback
    },
 
    {
        id : "lsn_1_question_5",
        question : "What is the correct sequence for updating your password in the <i>Passwords</i> tab?",
        answers : 
        [
            "Type the current password, then the new password, and click Save",
            "Type the new password twice, and then click Save",
            "Type the current password, type the new password (twice), and click Save",
            "Click Save, and then type the new password"
        ],
        randomize: true,
        correctIndex : 2,
        correctFeedback : "In the <i>Passwords</i> tab, you should type the current password, type the new password twice to confirm it, and then click Save to update your password.",
        incorrectFeedback : incorrectFeedback
    },

];

//Stores the test questions, answers, and feedback text
const testQuestions = [
        {
            id : "test_question_0",
            question : "",
            answers : 
            [
                "",
                "",
                "",
                ""
            ],
            correctIndex : 0,
            correctFeedback : "",
            incorrectFeedback : incorrectFeedback2
        },    
];

//Stores the resource information
//Stores the resource information
const resourcesData = [
    {
        title : "Course Transcript",
        media : "resources/Unanet_Training_Transcript.pdf"
    },
    {
        title : "Final Assessment Release Notes",
        media : "resources/Release_Notes.pdf"
    },
    {
        title : "Unanet Help Manual",
        media : "https://help.unanet.com/current/"
    }
];

//Stores the glossary information
const glossaryData = [
    {
        term : "Active Timesheet",
        definition : "The current timesheet that an employee is working on for the present workweek."
    },

    {
        term : "APPROVING",
        definition : "Timesheet status that indicates a timesheet is in the process of being reviewed for approval."
    },

    {
        term : "Completed Timesheet",
        definition : "A timesheet that has been finalized and submitted for approval."
    },

    {
        term : "CORRECTED",
        definition : "Timesheet status that indicates that Payroll has made a correction to the timesheet and requires that you make edits to the timesheet."
    },

    {
        term : "Edit",
        definition : "The action of modifying or making changes to a timesheet."
    },

    {
        term : "EXTRACTED",
        definition : "Timesheet status that indicates that the timesheet has been processed by Payroll and no further actions are required."
    },

    {
        term : "Full-Time Employee",
        definition : "An employee who works typically 40 hours per week."
    },

    {
        term : "INUSE",
        definition : "A timesheet status that indicates the timesheet is currently being used or edited."
    },

    {
        term : "IT Department",
        definition : "The team responsible for managing and maintaining the organization's technology infrastructure."
    },

    {
        term : "Manager",
        definition : "A person responsible for overseeing and approving timesheets to ensure that employees meet project and time requirements."
    },

    {
        term : "Magnifying Glass Icon",
        definition : "An icon used to preview a timesheet in the Unanet Web App."
    },

    {
        term : "My Account Page",
        definition : "The page where users can update their personal information."
    },

    {
        term : "New Timesheet Icon",
        definition : "An icon used to create a new timesheet."
    },

    {
        term : "Overtime (OT)",
        definition : "Hours worked beyond the standard work hours, typically eligible for additional pay."
    },

    {
        term : "Part-Time Employee",
        definition : "An employee who works typically less than 35 hours per week."
    },

    {
        term : "Payroll Department",
        definition : "The department or function within an organization that is responsible for processing employee pay."
    },

    {
        term : "Password Tab",
        definition : "A tab located in the My Account Page that allows employees to change their password."
    },

    {
        term : "Pencil Icon",
        definition : "An icon used to edit an existing timesheet."
    },
   
    {
        term : "Read-Only (Preview)",
        definition : "Timesheet status that indicates that a timesheet can only be viewed."
    },

    {
        term : "Regular Time (RT)",
        definition : "Standard work hours that are typically covered by regular pay."
    },

    {
        term : "REJECTED",
        definition : "A timesheet status that indicates that the timesheet was rejected and may require revisions or resubmission."
    },

    {
        term : "Submit",
        definition : "The action of submitting a timesheet for approval."
    },

    {
        term : "SUBMITTED",
        definition : "Timesheet status that indicates that a timesheet has been sent for approval."
    },

    {
        term : "Time - Create Timesheet Page",
        definition : "The page where users can create a new timesheet for a specified time period."
    },

    {
        term : "Time - Dashboard Page",
        definition : "A central interface within the Unanet Web App where users can access various functions, including viewing and managing timesheets."
    },

    {
        term : "Time - List  Page",
        definition : "The page where users can view a list of all their timesheets, including the ability to filter and search."
    },

    {
        term : "Time - My Projects Page",
        definition : "The page within the Unanet Web App where users can view and manage their assigned projects and related work codes."
    },
    
    {
        term : "Unanet Web App",
        definition : "The online application used for time tracking, project management, and other administrative tasks within an organization."
    },
   
];

//Stores the lesson objectives
const lsnObjectives = [
    {
        id: "obj_001",
        data :  [
                    "Identify the various sub-menu options within the <i>Time</i> menu",
                    "Demonstrate the process of manually creating a new timesheet",
                    "Access and view active and completed timesheets",
                    "Demonstrate how to enter and manage hours worked for different projects",
                    "Select and apply the appropriate project codes in a timesheet",
                ]
    },

    {
        id: "obj_002",
        data :  [
                    "Identify and navigate the various menu options within the <i>My Account</i> menu",
                    "Demonstrate how to update your password",
                    "Demonstrate how to log out of the web application"
                ]
       
    },

];

//Stores the reflection questions
const reflectionQuestions = [
    
];

//----------------------------------------
//             Document init
//----------------------------------------
//Check for messages from an iframe
$(window).on("message", function(event) {

    const data = event.originalEvent.data;

    if(data === "simulationReady"){
        const usernameData = ["setUserNameData", { firstName :  firstName, lastName: lastName }]
        const initData = ["init", ""];
        var iframe = $("#simulationContainer").get(0);

        iframe.contentWindow.postMessage(usernameData, "*"); 
        iframe.contentWindow.postMessage(initData, "*"); 
        return;
    }

    if (typeof data === "string") {
        //Retake the assessment
        if(data === "retakeAssessment"){
            const last = $(".menuBtn").last().attr("id");
            $(`#${last}`).click();
        }
    }
    else if(typeof data === "boolean"){

       setTimeout(() => {
        $("#simulationPreloader").hide();
       }, 1200); 
       
    }
    //If we receive a number, assume that it is the final assesment score and handle accordingly
    else if (typeof data === "number") {

        //Unlock menus    
        unlockMenuNavigation();	
        $("#previousSlideBtn").prop("disabled", false);
        enableNavbarTopBtns();		

        const currentScore = data;
        const scoreTxt = `Previous Score: ${finalScore}% | Current Score: ${currentScore}% | Passing Score: ${passingScore}%`;
    
        console.log('received from iframe: ' + currentScore)
        console.log(scoreTxt)
        
        if(currentScore >= passingScore){
            $(".viewCertificate").removeClass("disabled");
            setSlideComplete();
        }else{
            $(".viewCertificate").addClass("disabled");
        }
    
        if(finalScore >= passingScore){
            $(".viewCertificate").removeClass("disabled");
        }
        
        if(currentScore > finalScore){
            finalScore = currentScore;
        }
    
    

        saveScoreData();
    }else{
        throw Error("Cannot determine how to respond to the iFrame message.");
    }
});

//Methods called once the page is loaded
$(document).ready(function () {
    
    $('#sidebarCollapse').on('click', function () {
        
        if(menuLocked){return;}

        $('#sidebarContainer').toggleClass('active');

        if($(window).width() <= 770){
            if($('#sidebarContainer').hasClass("active") == false){
                $(".backdrop").addClass('show');
            }else{
                $(".backdrop").removeClass('show');
            }
        }
    });

    //Pause instructional video content
    $(".modal").on("show.bs.modal", function () {
        var videoElement = $("#videoContent").get(0);
        if (videoElement) {
            videoElement.pause();
        }
      });

      //Pause/reset help video
      $("#helpModal").on("hide.bs.modal", function () {
        var video = $("#helpVideo").get(0); 
        if (video) {
          video.pause();
          video.currentTime = 0; 
        }
      });

      $("#settingsModal").on("show.bs.modal", function () {
        $("#nameWarningMsg").hide();
        $("#nameSuccessMsg").hide();        
      });


    
    setTimeout(function(){
        checkScreenWidth();
        getTotalSlides();
        getUserData();
        generateMenu();
        enableCertificateBtn();
        showExitBtn();
        generateGlossary();
        generateResources();
        unloadEventListener();

        $(".courseOverlay").addClass("hidden");
    }, 1000);
});

//Check for screen resize
$(window).resize(function() {
    checkScreenWidth();
});

//Checks the current screen width
function checkScreenWidth() {   
    if ($(window).width() >= 770) {
        $(".backdrop").removeClass("show");
    }else{
        if($('#sidebarContainer').hasClass("active") == false){
            $(".backdrop").addClass("show");
        }
    }
}

//Keyboard shortcut functionality
$(document).keydown(function(e) {
    if (e.ctrlKey && e.altKey) {
        if (e.which === 190) {
            if(!$("#nextSlideBtn").prop("disabled")){
                $("#nextSlideBtn").click();
            }
        }
        else if (e.which === 188) {
            if(!$("#previousSlideBtn").prop("disabled")){
                $("#previousSlideBtn").click();
            }
        }
    }
});

$(".backdrop").on("click", function(){
    $("#sidebarCollapse").click();
});

function getTotalSlides(){
    let ctr = 0;
    menuData.forEach(function(element){
        const data = element.data;
        for(var j = 0; j < data.length; j++){
            ctr++;
        }        
    });

    totalSlides = ctr;
}

//Dynamically generate the sidebar menu
function generateMenu(){

    let str = "";
    let i=0;
    let ctr=0;

    $("#menuButtons").empty();

    menuData.forEach(function(element){

        const title = element.title;
        const subtitle = element.subtitle;
        const type = element.type;
        const data = element.data;
        const parentLocked = element.locked;
        
        let listItem, spanProgress, spanTxt, divMenuBtn, link;
        let progressIcon = "";  
        let subProgressIcon = "";

        //Lesson Titles        
        if(!element.hasOwnProperty("data")){

            
            listItem = $("<li>");

            divMenuBtn = $("<div>", {
                class : "menuBtn",
                id : "slide_" + ctr
            });

            divMenuBtn.attr("ref-id", element.id);
            ctr++;

            spanTxt = $("<span>", {
                class : "menuBtnTxt",
                html : "<a href='#' class='singleItem'>" + subtitle + "</a>",
                title : subtitle            
            });

            spanProgress = $("<span>", {
                class : "menuBtnProgress"
             }).append($('<i>', {
                class: progressIcon
            }));           
           
            listItem.append(divMenuBtn);
            divMenuBtn.append(spanProgress, spanTxt);
              
        }else{

            if(parentLocked){
                var lockIcoParent = $("<i>", {
                    class : lockedIco
                });
            }
            
            listItem = $("<li>", {
                class: "dropdown-bottom"
            });
            
            link = $("<a>", {
                class : "dropdown-toggle d-flex align-items-center", 
                href : "#menuItem_" + i,
                "data-bs-toggle": "collapse",
                "aria-expanded": parentLocked ? "false" : "true",
                title: parentLocked ? `${title} (Locked)` : `${title}`
            });
            
            if(parentLocked){
                link.append(lockIcoParent);    
                link.addClass("collapsed")            
            }
            
            link.append(title); 
            
            var ul = $("<ul>", {
                class : "list-unstyled collapse",
                id : "menuItem_" + i
            });

            if (!parentLocked) {
                ul.addClass("show"); 
            }

            var localList =  $("<li>");
            listItem.append(link, ul);
            ul.append(localList);
          

            for(var j = 0; j < data.length; j++){

                const subtitle2 = data[j].subtitle;
                const progress = userProgress[ctr];

                if(progress === 0){
                    progressIcon = notStartedIco;
                }else if(progress === 1){
                    progressIcon = startedIco;
                }else if(progress === 2){
                    progressIcon = completedIco;
                }


                divMenuBtn = $("<div>", {
                    class : "menuBtn",
                    id : "slide_" + ctr
                });

                if(parentLocked){ 
                    divMenuBtn.addClass("menuDisabled");
                }

                divMenuBtn.attr("ref-id", data[j].id);

                ctr++;

                spanTxt = $("<span>", {
                    class : "menuBtnTxt",
                    html : "<a href='#'>" + subtitle2 + "</a>",
                    title : subtitle2            
                });

                spanProgress = $("<span>", {
                    class : "menuBtnProgress"
                 }).append($('<i>', {
                    class: progressIcon
                }));

                localList.append(divMenuBtn);
                divMenuBtn.append(spanProgress, spanTxt);
            }
        }

        
        $("#menuButtons").append(listItem);
        current = $(".menuBtn").first();
        checkDisableBtns();
        i++;
    });
        
    setTimeout(function(){
        $("#slide_0").click();
    },50);
}

function enableCertificateBtn(){
    if(finalScore >= passingScore){
        $(".viewCertificate").removeClass("disabled");
    }
}

function showExitBtn(){
    if(isLmsConnected){
        $(".exitCourse").removeClass("hidden");
    }
}

//Update the css styling of the links upon click
$("body").on("click", "#sidebar ul li a", function(event) {
    event.preventDefault();

    const parentLink = $(this).closest("ul").prev("a");
    $('#sidebar ul li a').removeClass('active');

    if (parentLink.length) {
        parentLink.addClass("active");
        $(this).addClass("active");
    } else{
        $(this).addClass("active");
    }   
});


function getNextNonLockedMenu(current) {
    // Find the current dropdown's ID
    let currentMenuId = current.closest("ul").attr("id");
    
    if (!currentMenuId) {
        console.error("Current menu ID not found.");
        return;
    }

    // Ensure the ID is in the expected format
    let currentIndex = parseInt(currentMenuId.replace("menuItem_", ""), 10);
    if (isNaN(currentIndex)) {
        console.error("Failed to parse menu index from ID:", currentMenuId);
        return;
    }

    // Function to find the next non-locked menu
    function findNextNonLockedMenu(startIndex) {
        for (let i = startIndex; i < $(".dropdown-bottom").length; i++) {
            let menuId = `menuItem_${i}`;
            let menu = $(`#${menuId}`);
            
            if (menu.length && !menu.prev(".dropdown-toggle").find(".fa-lock").length) {
                let nextItem = menu.find(".menuBtn:not(.menuDisabled)").first();
                if (nextItem.length) {
                    return nextItem;
                }
            }
        }
        return null;
    }

    // Check the next menu
    let next = findNextNonLockedMenu(currentIndex + 1);
    if (next) {
        updateCurrent(next);
    } else {
        console.log("No available menu found.");
    }
}

function getPreviousNonLockedMenu(current) {
    let currentMenuId = current.closest("ul").attr("id");
    
    if (!currentMenuId) {
        console.error("Current menu ID not found.");
        return;
    }

    let currentIndex = parseInt(currentMenuId.replace("menuItem_", ""), 10);
    if (isNaN(currentIndex)) {
        console.error("Failed to parse menu index from ID:", currentMenuId);
        return;
    }

    // Function to find the previous non-locked menu
    function findPreviousNonLockedMenu(startIndex) {
        for (let i = startIndex; i >= 0; i--) {
            let menuId = `menuItem_${i}`;
            let menu = $(`#${menuId}`);
            
            if (menu.length && !menu.prev(".dropdown-toggle").find(".fa-lock").length) {
                let prevItem = menu.find(".menuBtn:not(.menuDisabled)").last();
                if (prevItem.length) {
                    return prevItem;
                }
            }
        }
        return null;
    }

    // Check the previous menu
    let prev = findPreviousNonLockedMenu(currentIndex - 1);
    if (prev) {
        updateCurrent(prev);
    } else {
        console.log("No available menu found.");
    }
}

$("#nextSlideBtn").on("click", function() {
    let next = current.next(".menuBtn");
    $(this).blur();

    if (next.length === 0) {
        getNextNonLockedMenu(current);
    } else {
        updateCurrent(next);
    }
});

$("#previousSlideBtn").on("click", function() {
    let prev = current.prev(".menuBtn");
    $(this).blur();

    if (prev.length === 0) {
        getPreviousNonLockedMenu(current);
    } else {
        updateCurrent(prev);
    }
});

// Pause the YouTube video when any modal is shown
$(".modal").on("shown.bs.modal", function () {
    if (videoPlayer && videoPlayer.pauseVideo) {
        videoPlayer.pauseVideo();
    }
});

//Toggle sidebar
$("#toggleSidebar").click(function(){
    $("#sidebar").toggleClass("active");
    $("#content").toggleClass("active");
});

//Hide the remediation upon clicking a new input field
$(document).on("change" , ".form-check-input", function(){
    hideRemediation();
});

//Handles the submit button for a quiz item
$(document).on("click" , "#startAssessment", function(){

    score = 0;
    testIndex = 0;

    disableNavbarTopBtns();
    hideMediaDivs();
    lockMenuNavigation();
    disableNavBtns();


    generateQuestion(`test_question_${testIndex}`);    
    $("#quizQuestions").removeClass("hidden");
});

$(document).on("click" , ".quizSubmitBtn", function(){

    const menuObj = getMenuData();
    const media = menuObj.media;
    const obj = getQuestion(media, false);
    const selectedOption =  $(".form-check-input:checked");
    const isCorrectAnswer = (Number(selectedOption.attr("correct")) === 1);
    const correctFeedback = obj.correctFeedback;
    const incorrectFeedback = obj.incorrectFeedback;

    if (selectedOption.length === 0) {
        showRemediation("error", "You must make a selection.");
    }else{
        if(isCorrectAnswer){
            showRemediation("correct", correctFeedback + continueFeedback);
            setSlideComplete();
            $(this).prop("disabled", true);
        }else{
            showRemediation("error", incorrectFeedback);
        }
    }
});

//Handles the submit button for the test
$(document).on("click" , ".testSubmitBtn", function(){

    const obj = getQuestion(`test_question_${testIndex}`, true);
    const selectedOption =  $(".form-check-input:checked");
    const isCorrectAnswer = (Number(selectedOption.attr("correct")) === 1);
    const correctFeedback = obj.correctFeedback;
    const incorrectFeedback = obj.correctFeedback;

    if (selectedOption.length === 0) {
        showRemediation("error", "You must make a selection.");
    }else{
        
        if(isCorrectAnswer){        
            score++;
            showRemediation("correct", correctFeedback + continueFeedback2);                 
        }else{
            showRemediation("error", incorrectFeedback + continueFeedback2);
        }

        $(".continueBtn").prop("disabled", false);
        $(this).prop("disabled", true);        
    }
});

//Handles the continue button for the test
$(document).on("click", ".continueBtn", function(){    

    hideMediaDivs();

    if(testIndex < testQuestions.length-1){
        testIndex++;
        generateQuestion(`test_question_${testIndex}`);
        $("#quizQuestions").removeClass("hidden");
    }
    else{                
        showSummary();
    }
});

//Handles showing the certificate upon passing
$(".viewCertificate").click(function(){
    const username = firstName + " " + lastName;
    window.open(`certificate.html?username=${username};`, "Certificate of Completion", "width=500,height=500");
});

$(document).on("click" , ".retakeAssessment", function(){
    const last = $(".menuBtn").last().attr("id");
    $(`#${last}`).click();
});

$(document).on("click" , "#exitAssessment", function(){
    $('#exitAssessmentModal').modal("show");
});

$(document).on("click" , "#exitTestYes", function(){
    $('#exitAssessmentModal').modal("hide");
    $("#previousSlideBtn").prop("disabled", false);
    unlockMenuNavigation();    
    enableNavbarTopBtns();

    const last = $(".menuBtn").last().attr("id");
    $(`#${last}`).click();
});

$(document).on("click" , "#exitTestNo", function(){
    $('#exitAssessmentModal').modal("hide");
});

$(document).on("click" , "#exitCourseYes", function(){
    parent.window.close();    
});

$(document).on("click" , "#exitCourseNo", function(){
    $('#exitModal').modal("hide");
});

//Handles the logic for what content to display upon clicking a menu item
$(document).on("click" , ".menuBtn", function(){

    activeMenuId = Number($(this).attr("id").split("_")[1]);
    const icon = $(this).find(".menuBtnProgress > i");
    const menuObj = getMenuData();
    const type = menuObj.type;
    const media = menuObj.media;

    //Specify the button is active
    $(".menuBtn").removeClass("active");
    $(this).addClass("active");
    current = $(this);

    //Additional helper functions
    checkDisableBtns();
    updateSlideIndicator();
    updateSlideTitle();
    hideMediaDivs();
    clearVideoPlayer();
    $("#simulation").empty();
    setSlideInProgress();

    $("#mainContainer").addClass("container");
    $("#mainContainer").removeClass("container-lg");
    $("#mainContainer").removeClass("assessment");

    switch(type){
        case "video":
            $("#videosContainer").removeClass("hidden");
            loadVideo(media);
        break;
        case "youtube":
            $("#videosContainer").removeClass("hidden");
            loadYouTubeVideo(media);
        break;
        case "objective":
            $("#lessonObjectives").removeClass("hidden");
            generateLessonObjectives();
            setSlideComplete();
        break;
        case "reflection":
            $("#reflectionQuestions").removeClass("hidden");
            generateReflectionQuestions();
            setSlideComplete();
        break;
        case "quiz":
            $("#quizQuestions").removeClass("hidden"); 
            generateQuestion(media);
        break;   
        case "test":
            $("#testOverview").removeClass("hidden"); 
            generateTestOverview();
        break;
        case "test_simulation":
            $("#simulation").removeClass("hidden"); 
            generateIframe();
            $("#mainContainer").removeClass("container");
            $("#mainContainer").addClass("container-lg");
            $("#mainContainer").addClass("assessment");
            
        break;
        default:
            throw Error("Cannot determine the media type.");
    }
});



$('#saveName').on('click', function() {

    var validNamePattern = /^[A-Za-z\s]+$/;
    var errorStr = "";
    var isInvalid = false;

    firstName = $('#firstName').val().trim();
    lastName = $('#lastName').val().trim();

    if (!firstName || !validNamePattern.test(firstName)) {
        firstName = "John";
        $("#firstName").val(firstName);
        errorStr += 'Invalid first name. Defaulted to "John". ';
        isInvalid = true;
    }

    if (!lastName || !validNamePattern.test(lastName)) {
        lastName = "Doe";
        $("#lastName").val(lastName);
        errorStr+= 'Invalid last name. Defaulted to "Doe".';
        isInvalid = true;
    }

    $("#nameWarningMsg").hide();
    $("#nameSuccessMsg").hide();  

    if(isInvalid){
        $("#nameWarningMsg").text(errorStr).show();
    }else{
        $("#nameSuccessMsg").show();
    }

    fullName = firstName + " " + lastName;

    // Hide the modal and store the names
    //$('#settingsModal').modal('hide');

    if (isLmsConnected) {
        // LMS specific code here
    } else {
        sessionStorage.setItem("firstName", firstName);
        sessionStorage.setItem("lastName", lastName);
    }
});

//----------------------------------------
//          Function Handlers
//----------------------------------------
function hideRemediation(){
    const feedback = $("#quiz-alert");
    feedback.addClass("hidden");
    feedback.removeClass(alertIncorrectClass);
    feedback.removeClass(alertCorrectClass);
    feedback.html("");
}

function showRemediation(type, str){

    const feedback = $("#quiz-alert");

    feedback.removeClass("hidden");
    feedback.removeClass(alertIncorrectClass);
    feedback.removeClass(alertCorrectClass);

    if(type === "error"){
        feedback.addClass(alertIncorrectClass);
        str = "<b>Incorrect</b><br>" + str;
    }else if(type ===  "correct"){
        feedback.addClass(alertCorrectClass);
        str = "<b>Correct</b><br>" + str;
    }else{
        throw Error("The remediation type is undefined");
    }

    feedback.html(str);
}

function generateTestOverview(){
    
    $("#testOverview").empty();

    const completedInstructions = `Congratulations! You've passed the assessment.`;
    const assessment = "Start Assessment";
    const instructions = `Click the ${assessment} button to begin. You can retake the test as many times as as needed. Only your highest score will be recorded.<br><br>Once you start, course navigation <span>will be disabled</span> until the assessment is complete or if you click the Exit Assessment button, which becomes available after starting the assessment.`;

    let p = $("<p>", {
        html : instructions
    });
    
    let scores = $("<span>", {
        text : `Highest Score: ${finalScore}%`
    });

    let startAssessment = $("<button>", {
        class : "btn btn-secondary submitBtn",
        text : assessment,
        id: "startAssessment"
    });
 
    $("#testOverview").append(p, "<hr>", scores, startAssessment);

    if(finalScore >= passingScore){
        $("#printCertificate").prop("disabled", false);
    }else{
        $("#printCertificate").prop("disabled", true);
    }    
}

function generateIframe(){

    score = 0;

    disableNavbarTopBtns();
    hideMediaDivs();              
    $("#simulation").removeClass("hidden");
    lockMenuNavigation();
    disableNavBtns(); 

    $("#simulation").empty();

    const menuObj = getMenuData();
    const src = "dist/" + menuObj.media;

    $(".card-body").prepend(`
        <div id="simulationPreloader">
            <i class="fas fa-spinner fa-spin"></i> Loading...
        </div>
    `);

    var iframe = $("<iframe>", {
        src: src,
        id: "simulationContainer",
        width: "100%",
        height: "100%",
        frameborder: "0px",
    });


    $("#simulation").append(iframe); //, btn


}

//Used to update the slide indicator number
function updateSlideIndicator(){

    let index = Number($(current).attr("id").split("_")[1]) + 1;
    let str = "Slide " + index + " of " + totalSlides; 
    $("#slideIndicator").html(str);
}

//Used to update the slide's title
function updateSlideTitle(){

    const parent = $(`#slide_${activeMenuId}`).closest("ul").siblings("a.dropdown-toggle");
    const menuObj = getMenuData();

    $("#slideTitle").html(parent.text());
    $("#slideSubtitle").html(menuObj.subtitle);
}

//Used to dynamically generate the glossary
function generateGlossary(){    

    let divContainer = $("<div>",{
        class: "table-container"
    });

    let table = $("<table>", {
        class : "table table-bordered"
    });

    let tHead =  $("<thead>");
    let tr =  $("<tr>");
    let th1 = $("<th>", {
        text : "Term"
    });
    let th2 = $("<th>", {
        text : "Definition"
    });

    th1.attr("scope", "col");
    th2.attr("scope", "col");

    table.append(tHead);
    tHead.append(tr);
    tr.append(th1, th2);
    divContainer.append(table);

    let tbody = $("<tbody>");
    glossaryData.forEach(function(element){
        const term = element.term;
        const definition = element.definition;

        let tr = $("<tr>");
        let td = $("<td>", {
            text : term
        });
        let td2 = $("<td>", {
            text : definition
        });

        tr.append(td, td2);
        tbody.append(tr);
    });

    table.append(tbody);

   $("#glossaryContent").append(divContainer);
}

//Used to dynamically generate the resources
function generateResources(){

    let internalResources = $("<div>");
    let externalResources = $("<div>");

    let p1 = $("<p>", {
        html : "<h6>Local Resources</h6>"
    });

    let hr = $("<hr>");

    let p2 = $("<p>", {
        html : "<h6>External Resources</h6>"
    });

    resourcesData.forEach(function(element){

        const title = element.title;
        const media = element.media;

        let pdfIco = $("<i>", {class: "fa-solid fa-file-pdf"});
        let linkIco = $("<i>", {class: "fa-solid fa-link"});
        let ul =  $("<ul>");
        let li =  $("<li>");
        let link =  $("<a>", {
            text : title + " ",
            title : title,
            target : "_blank",
            class : "link",
            href : media
        });

        ul.append(li);
        li.append(link);

        if(getExtension(media) === "pdf"){
            link.append(" (", pdfIco, ")");
            internalResources.append(ul)
        }else{
            link.append(" (", linkIco, ")" );
            externalResources.append(ul);
        }
    });

    if (internalResources.is(":empty")) {
        internalResources.append($("<p>").text("N/A"));
    }
    
    if (externalResources.is(":empty")) {
        externalResources.append($("<p>").text("N/A"));
    }

    $("#resourcesContent").append(p1, internalResources, hr, p2, externalResources);
}

//Used to get an extension of a media file to determine what type of media to display
function getExtension(str){
    if (str.lastIndexOf(".") !== -1) {
        return str.substring(str.lastIndexOf(".") + 1);
    } else {
        return "";
    }
}

//Used to dynamically generate the lesson objectives based on the active slide
function generateLessonObjectives(){
    $("#lessonObjectives").empty();

    const menuObj = getMenuData();
    const lessonObj = getLessonObjectives(menuObj.media);

    let p = $("<p>",{
        html : `Take a moment to review the learning objectives for this module. When you're done, click the Next Slide button to proceed.<br><hr>`
    });    

    let ol = $("<ol>");

    lessonObj.data.forEach(function(element){
        let li = $("<li>", {
            html : element,
            class : "objectives-li"
        });

        ol.append(li);
    });

    $("#lessonObjectives").append(p, ol);
}

//Used to dynamically generate the reflection questions based on the active slide
function generateReflectionQuestions(){
    $("#reflectionQuestions").empty();

    const menuObj = getMenuData();
    const reflectionQuestions =  getReflectionQuestion(menuObj.media);

    let p = $("<p>",{
        html : `Take a moment to answer these self reflection questions.
                These questions are not graded and are meant for your personal growth and understanding. 
                When you're done, click the Next Slide button to proceed.<hr>`
    });    

    let ol = $("<ol>");

    reflectionQuestions.data.forEach(function(element){
        let li = $("<li>", {
            text : element,
            class : "reflection-li"
        });

        ol.append(li);
    });

    $("#reflectionQuestions").append(p, ol);
}

//Helper function that returns the lesson objectives object
function getLessonObjectives(id){

    let obj = {};

    lsnObjectives.forEach(function(element){
        const currentId = element.id;
        if(currentId === id){
            obj =  element;
        }
    });

    return obj;
}

//Helper function that returns the reflection question object
function getReflectionQuestion(id){

    let obj = {};

    reflectionQuestions.forEach(function(element){
        const currentId = element.id;
        if(currentId === id){
            obj =  element;
        }
    });

    return obj;
}

//Used to generate a single quiz or test question based on the specified slide ID
//The last slide in the course is treated as the final assessment
function generateQuestion(id){

    $("#quizQuestions").empty();

    const isFinalAssessment = (id.indexOf("test")>=0);
    const obj = getQuestion(id, isFinalAssessment);
    const randomizeQuestion = obj.randomize;
    const randomizedQuestions = randomizeQuestion ?shuffleAnswers(obj) : obj;   
    const correctIndex = randomizedQuestions.correctIndex;
    
    let span;
    let testDiv;
    let continueBtn; 
    let i = 0;
    let quizQuestionDiv = $("<div>", {
        class : "quizQuestion active",
        id : id
    });

    let introP = $("<span>", {
        text : "Select the correct answer and then click the Submit button."
    });

    let p = $("<p>", {
        html : obj.question
    });
    
    if(isFinalAssessment){
        span = $("<span>",{
            html : `Question ${getTestIdIndex(id)} of ${testQuestions.length}`
        }).css("float", "right");        
    }

    quizQuestionDiv.append(introP,span, $("<hr>"),p);

    randomizedQuestions.answers.forEach(function(element){

        let formDiv = $("<div>",{
            class : "form-check"
        });

        let input = $("<input>", {
            class : "form-check-input",
            type : "radio",
            name : "question",
            id : "question_" + i,
            value : "option_" + i
        });

        if(i === correctIndex){
            input.attr("correct", 1);
        }else{
            input.attr("correct", 0);
        }

        let label = $("<label>", {
            class : "form-check-label",
            type : "radio",
            for : "question_" + i,
            html : element
        });

        formDiv.append(input,label);
        quizQuestionDiv.append(formDiv);
        i++;
    });

    let alert = $("<div>", {
        class : "alert hidden",
        id: "quiz-alert"
    });

    alert.attr("role", "alert");

    let submitBtn = $("<button>",{
        class : `btn btn-secondary ${isFinalAssessment ? "testSubmitBtn" : "quizSubmitBtn"}`,
        type : "button",
        text : "Submit"
    });

    testDiv = $("<div>", {
        class : "assessmentBtnContainer"
    });

    let quitBtn =  $("<button>",{
        class : `btn btn-secondary`,
        id : "exitAssessment",
        type : "button",
        text : "Exit Assessment"
    });    

    if(isFinalAssessment){
        continueBtn = $("<button>", {
            class : "btn btn-secondary continueBtn",
            text: "Continue"
        }).css("margin-right", "5px").prop("disabled", true);

        testDiv.append(continueBtn, submitBtn, quitBtn);
    }else{
        testDiv.append(submitBtn);
    }

    $("#quizQuestions").append(quizQuestionDiv, $("<br>"), testDiv, $("<br>"), alert );
}

//Get the index of the current test ID
function getTestIdIndex(id){
    let index = 0;
    let i = 0;

    testQuestions.forEach(function(element){
        if(element.id === id){
           index = i; 
        }
        i++;
    });

    return index + 1;
}

function getUserData(){

    try{
        scorm = pipwerks.SCORM;
    }catch(e){
        scorm = null;
    }

    //Running inside a LMS
    if(scorm.init()){

        const lmsUserProgress = scorm.get("cmi.suspend_data");        
        const completionStatus = scorm.get("cmi.completion_status");
        let lmsSessionScore = scorm.get("cmi.score.raw");
        
        if(completionStatus === "incomplete" && lmsSessionScore === ""){
            lmsSessionScore = 0;
            scorm.set("cmi.score.raw", 0);
            console.log('reset sessions score to 0');
        }

        username = scorm.get("cmi.learner_name");        
        isLmsConnected = true;                

        //Get course progress
        if (lmsUserProgress !== null && lmsUserProgress !== undefined) {
            if(lmsUserProgress.length <= 5){
                userProgress = new Array(totalSlides).fill(0);
            }else{
                let lmsTmpUserProgress = lmsUserProgress.split(",");
                userProgress = lmsTmpUserProgress.map(function(str) {
                    let num = Number(str);
                    return isNaN(num) ? 0 : num; 
                });
            }

        }else{
            $('#settingsModal').modal("show");
            userProgress = new Array(totalSlides).fill(0);
        }

        //console.log(userProgress)

        //Get test score
        if (lmsSessionScore !== null && lmsSessionScore !== undefined) {
            finalScore = isNaN(lmsSessionScore) ? 0 : lmsSessionScore;
        }else{
            finalScore = 0;
        }
    
        //To ensure that the course remains completed
        if(finalScore >= passingScore){
            scorm.set("cmi.success_status", "passed");
            scorm.set("cmi.completion_status", "completed");
        }

        scorm.save();
    }

    //Running outside a LMS
    else{
        const sessionFirstName = sessionStorage.getItem("firstName");
        const sessionLastName = sessionStorage.getItem("lastName");
        const sessionProgress = sessionStorage.getItem("progress");
        const sessionScore = sessionStorage.getItem("score");
        
        firstName = sessionFirstName;
        lastName = sessionLastName;

        if(sessionFirstName == null  || sessionFirstName == undefined){
            firstName = "John";
        }
        if(sessionLastName == null || sessionLastName == undefined){
            lastName = "Doe";
        }
       
        fullName = firstName + " " + lastName;

        $("#firstName").val(firstName);
        $("#lastName").val(lastName);

        //Get progress
        if (sessionProgress !== null && sessionProgress !== undefined) {
            let tmpUserProgress = sessionProgress.split(",");
            userProgress = tmpUserProgress.map(function(str) {
                let num = Number(str);
                return isNaN(num) ? 0 : num; 
              });   
        }else{
            $('#settingsModal').modal("show");
            userProgress = new Array(totalSlides).fill(0);
        }
        
        //Get test score
        if (sessionScore !== null && sessionScore !== undefined) {
            finalScore = isNaN(sessionScore) ? 0 : sessionScore;
        }else{
            finalScore = 0;         
        }

        
    }
}

//Handles saving progress data
function saveProgressData(value){

    userProgress[activeMenuId] = value;

    if(isLmsConnected){
        scorm.set("cmi.suspend_data", userProgress);
        scorm.save();
    }else{
        sessionStorage.setItem("progress", userProgress);
    }
}

//Handles saving score data
function saveScoreData(){    

    if(isLmsConnected){
        scorm.set("cmi.score.raw", finalScore);
        if(finalScore >= passingScore){
            scorm.set("cmi.success_status", "passed");
            scorm.set("cmi.completion_status", "completed");
        }
        scorm.save();
    }else{
        sessionStorage.setItem("score", finalScore);
    }
}

function getMenuData(){

    const activeSlide = $(`#slide_${activeMenuId}`);
    const referenceId = activeSlide.attr("ref-id");

    let obj = {};

    menuData.forEach(function(element){
        const currentId = element.id;

        if(element.hasOwnProperty("data")){
            element.data.forEach(function(element2){
                const currentId2 = element2.id;
                if(currentId2 === referenceId){
                    obj =  element2;
                }
            });
        }
        else{
            if(currentId === referenceId){
                obj =  element;
            }
        }
    });

    return obj;
}

function loadVideo(videoId){

    $("#videos").empty();

    const abridgedVideoId = videoId.split(".").slice(0, -1).join(".");

    const videoTag = $("<video>", {
        controls: true,
        id : "videoContent"
    });

    const sourceTag = $("<source>", {
        src: `videos/output/${abridgedVideoId}.mp4`,
        type: "video/mp4"
    });

    // Create the track tag for subtitles
    const trackTag = $("<track>", {
        src: `videos/output/${abridgedVideoId}.vtt`,
        kind: "subtitles",
        srclang: "en",
        label: "English",
        default: true
    });

    videoTag.append(sourceTag, trackTag);

    $("#videos").append(videoTag);

    videoTag.on('loadedmetadata', function() {
        this.currentTime = 0.5;
    });
}

//Handles loading a specified Youtube video based on a specified video ID
function loadYouTubeVideo(videoId){

    clearVideoPlayer();

    $(".loading-icon").show();
    videoPlayer = new YT.Player("videos", {
            height : "360",
            width : "640",
            videoId : videoId,
            playerVars: {
                "showinfo" : 0,
                "rel" : 0,
                "modestbranding" : 1,
                "disablekb" : 1 
            },
            events : {
                "onReady" : onPlayerReady,
                "onStateChange" : onPlayerStateChange
            }
   });
}

//Helper function that clears the video player div
function clearVideoPlayer(){
    if (videoPlayer) {
      videoPlayer.destroy();
      videoPlayer = null;
    }
    $("#videos").empty();
  }

function getQuestion(id, isFinalAssessment){
    let obj = {};

    if(isFinalAssessment){
        testQuestions.forEach(function(element){
            const currentId = element.id;
            if(currentId === id){
                obj = element;
            }
        });
    }
    else{
        quizQuestions.forEach(function(element){
            const currentId = element.id;
            if(currentId === id){
                obj = element;
            }
        });
    }

    return obj;
}

function shuffleAnswers(question) {

    let indexes = question.answers.map((_, index) => index);

    for (let i = indexes.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [indexes[i], indexes[j]] = [indexes[j], indexes[i]];
    }
    
    const shuffledAnswers = indexes.map(index => question.answers[index]);
    const newCorrectIndex = indexes.indexOf(question.correctIndex);
    
    return {
        answers: shuffledAnswers,
        correctIndex: newCorrectIndex
    };
}

function onPlayerReady(event) {
    
    if(autoPlayVideo){
        setTimeout(() => {
              event.target.playVideo();
        }, 500); 
    }
    $(".loading-icon").hide();
}

function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.ENDED) {
      setSlideComplete();
    }
}

//Hides the video, quiz, and test divs
function hideMediaDivs(){
  $("#videosContainer").addClass("hidden");
  $("#lessonObjectives").addClass("hidden");
  $("#reflectionQuestions").addClass("hidden");
  $("#testOverview").addClass("hidden");
  $("#quizQuestions").addClass("hidden");
  $("#simulation").addClass("hidden");
  $("#summary").addClass("hidden");
}

//Method that handles slide in progress
function setSlideInProgress(){

    const slide = $(`#slide_${activeMenuId}`);
    const icon = slide.find("span > i");

    if(icon.hasClass(notStartedIco)){
        icon.removeClass();
        icon.addClass(startedIco);
        saveProgressData(1);
    }
}

//Method handles slide completion
function setSlideComplete(){

    const slide = $(`#slide_${activeMenuId}`);
    const icon = slide.find("span > i");

    if(icon.hasClass(startedIco)){
        icon.removeClass();
        icon.addClass(completedIco);
        saveProgressData(2);
    }
}

//Locks the sidebar menu
function lockMenuNavigation(){

    if(!$("#sidebarContainer").hasClass("active")){
        $("#sidebarCollapse").click();
    }
    $("#sidebarCollapse").addClass("menuDisabled");
    menuLocked = true;
}

//Unlocks the sidebar menu
function unlockMenuNavigation(){

    $("#sidebarCollapse").removeClass("menuDisabled");
    menuLocked = false;

    if($("#sidebarContainer").hasClass("active")){
        $("#sidebarCollapse").click();
    }       
}


//Shows the summary for the test
function showSummary(){

    hideMediaDivs();
    $("#summary").empty();
    $("#summary").removeClass("hidden");
    unlockMenuNavigation();
    $("#previousSlideBtn").prop("disabled", false);
    enableNavbarTopBtns();

    const currentScore = Math.round((score / testQuestions.length) * 100);
    let str = "";
    let tryAgain;
    let scores = $("<span>", {
        text : `Previous Score: ${finalScore}% | Current Score: ${currentScore}% | Passing Score: ${passingScore}%`
    });
    
    if(currentScore >= passingScore){
        str = passingMessage;
        $(".viewCertificate").removeClass("disabled");
        setSlideComplete();
    }else{
        $(".viewCertificate").addClass("disabled");
        str = failingMessage;
        tryAgain = $("<button>", {
            text: "Retake Assessment",
            class : "submitBtn retakeAssessment btn btn-secondary"
        });
    }

    if(finalScore >= passingScore){
        $(".viewCertificate").removeClass("disabled");
    }

    let div = $("<div>", {
        html: str
    });
    
    if(currentScore > finalScore){
        finalScore = currentScore;
    }

    saveScoreData();

    $("#summary").append(div, $("<hr>"),scores, tryAgain);
}

//Helper that updates the currently clicked button
function updateCurrent(newCurrent) {
    if (newCurrent.length) {
        current = newCurrent;
        $(current).click();
    }
}

//Used to check if buttons are disabled or enabled
function checkDisableBtns(){

    const first = $(".menuBtn").first().attr("id");
    const last = $(".menuBtn").last().attr("id");
    const current1 = current.attr("id");

    if(current1 === first){
        $("#previousSlideBtn").prop("disabled", true);
    }else if(current1 === last){
        $("#nextSlideBtn").prop("disabled", true);
        
    }else{
        $("#previousSlideBtn").prop("disabled", false);
        $("#nextSlideBtn").prop("disabled", false);
    }
}

//Disables the navigaiton butons
function disableNavBtns(){
    $("#previousSlideBtn").prop("disabled", true);
    $("#nextSlideBtn").prop("disabled", true);
}

//Disables the top bar butons
function disableNavbarTopBtns(){
    $(".navbarBtn").addClass("disabled");
}

//Enables the navbar buttons
function enableNavbarTopBtns(){
    $(".navbarBtn").removeClass("disabled");

    if(finalScore >= passingScore){
        $(".viewCertificate").removeClass("disabled");
    }else{
        $(".viewCertificate").addClass("disabled");
    }
}

//For debugging purposes
function trace(msg){
    if(debugMode){
        console.log(msg);
    }
}

//Unload SCORM if applicable
function unloadEventListener(){
    if(isLmsConnected){
        window.addEventListener("unload", function() {
            exitCourseHandler();
        });
    }
}

function exitCourseHandler(){
    scorm.set("cmi.suspend_data", userProgress);
    scorm.set("cmi.score.raw", finalScore);
    scorm.save();

    console.log('saving data to lms!'); //TODO::            

    //scorm.quit();
}

function clearStorageData(){
    sessionStorage.clear();
}