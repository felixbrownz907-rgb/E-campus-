/* =====================================================
   E-CAMPUS APPLICATION
   PHASE 1/3
   ===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    console.log("E-Campus application loaded.");


    /* =================================================
       MOBILE MENU
       ================================================= */

    const menuButton =
        document.querySelector("#menuBtn") ||
        document.querySelector(".menu-btn") ||
        document.querySelector("[data-menu]");

    const sidebar =
        document.querySelector("#sidebar") ||
        document.querySelector(".sidebar") ||
        document.querySelector("aside");

    if (menuButton && sidebar) {

        menuButton.addEventListener("click", () => {
            sidebar.classList.toggle("active");
        });

    }


    /* =================================================
       CLOSE MOBILE MENU
       ================================================= */

    if (sidebar) {

        const sidebarLinks =
            sidebar.querySelectorAll("a, button");

        sidebarLinks.forEach((link) => {

            link.addEventListener("click", () => {
                sidebar.classList.remove("active");
            });

        });

    }


    /* =================================================
       NAVIGATION
       ================================================= */

    const navigationLinks =
        document.querySelectorAll(
            "[data-page], .nav-link, .sidebar a"
        );

    navigationLinks.forEach((link) => {

        link.addEventListener("click", (event) => {

            const target =
                link.getAttribute("data-page");

            if (target) {

                event.preventDefault();

                showPage(target);

            }

        });

    });


    /* =================================================
       PAGE SWITCHING
       ================================================= */

    function showPage(pageName) {

        const pages =
            document.querySelectorAll(
                ".page, [data-section]"
            );

        pages.forEach((page) => {
            page.style.display = "none";
        });


        const targetPage =
            document.getElementById(pageName) ||
            document.querySelector(
                `[data-section="${pageName}"]`
            );


        if (targetPage) {
            targetPage.style.display = "block";
        }


        navigationLinks.forEach((link) => {

            link.classList.remove("active");

            if (
                link.getAttribute("data-page")
                === pageName
            ) {

                link.classList.add("active");

            }

        });

    }


    /* =================================================
       DROPDOWN MENUS
       ================================================= */

    const dropdownButtons =
        document.querySelectorAll(
            "[data-dropdown]"
        );

    dropdownButtons.forEach((button) => {

        button.addEventListener("click", (event) => {

            event.stopPropagation();

            const dropdownName =
                button.getAttribute(
                    "data-dropdown"
                );


            const dropdown =
                document.querySelector(
                    `[data-dropdown-menu="${dropdownName}"]`
                );


            if (dropdown) {

                dropdown.classList.toggle(
                    "active"
                );

            }

        });

    });


    /* =================================================
       CLOSE DROPDOWNS
       ================================================= */

    document.addEventListener("click", () => {

        document
            .querySelectorAll(
                "[data-dropdown-menu].active"
            )
            .forEach((dropdown) => {

                dropdown.classList.remove(
                    "active"
                );

            });

    });


    /* =================================================
       SEARCH
       ================================================= */

    const searchInput =
        document.querySelector("#searchInput") ||
        document.querySelector(".search-input") ||
        document.querySelector("[data-search]");


    const searchableItems =
        document.querySelectorAll(
            "[data-search-item]"
        );


    if (searchInput) {

        searchInput.addEventListener(
            "input",
            () => {

                const searchTerm =
                    searchInput.value
                        .toLowerCase()
                        .trim();


                searchableItems.forEach((item) => {

                    const text =
                        item.textContent
                            .toLowerCase();


                    if (
                        text.includes(searchTerm)
                    ) {

                        item.style.display = "";

                    } else {

                        item.style.display = "none";

                    }

                });

            }
        );

    }


    /* =================================================
       PASSWORD VISIBILITY
       ================================================= */

    const passwordToggle =
        document.querySelector(
            "#togglePassword"
        );


    const passwordInput =
        document.querySelector(
            "#password"
        );


    if (
        passwordToggle &&
        passwordInput
    ) {

        passwordToggle.addEventListener(
            "click",
            () => {

                if (
                    passwordInput.type
                    === "password"
                ) {

                    passwordInput.type =
                        "text";

                    passwordToggle.textContent =
                        "Hide";

                } else {

                    passwordInput.type =
                        "password";

                    passwordToggle.textContent =
                        "Show";

                }

            }
        );

    }


    /* =================================================
       FORM VALIDATION
       ================================================= */

    const forms =
        document.querySelectorAll("form");


    forms.forEach((form) => {

        form.addEventListener(
            "submit",
            (event) => {

                const requiredFields =
                    form.querySelectorAll(
                        "[required]"
                    );


                let valid = true;


                requiredFields.forEach(
                    (field) => {

                        if (
                            !field.value.trim()
                        ) {

                            valid = false;

                            field.classList.add(
                                "error"
                            );

                        } else {

                            field.classList.remove(
                                "error"
                            );

                        }

                    }
                );


                if (!valid) {

                    event.preventDefault();

                    showNotification(
                        "Please complete all required fields.",
                        "error"
                    );

                }

            }
        );

    });


    /* =================================================
       ACTION BUTTONS
       ================================================= */

    const actionButtons =
        document.querySelectorAll(
            "[data-action]"
        );


    actionButtons.forEach((button) => {

        button.addEventListener(
            "click",
            () => {

                const action =
                    button.getAttribute(
                        "data-action"
                    );

                handleAction(action);

            }
        );

    });


    /* =================================================
       ACTION HANDLER
       ================================================= */

    function handleAction(action) {

        switch (action) {

            case "logout":
                logout();
                break;

            case "profile":
                showPage("profile");
                break;

            case "dashboard":
                showPage("dashboard");
                break;

            case "courses":
                showPage("courses");
                break;

            case "assignments":
                showPage("assignments");
                break;

            case "results":
                showPage("results");
                break;

            case "notifications":

                showNotification(
                    "You have no new notifications.",
                    "info"
                );

                break;

            default:

                console.log(
                    "Action:",
                    action
                );

        }

    }
        /* =================================================
       LOGOUT
       ================================================= */

    function logout() {

        const confirmed =
            confirm(
                "Are you sure you want to logout?"
            );

        if (!confirmed) {
            return;
        }


        localStorage.removeItem(
            "ecampus_user"
        );

        sessionStorage.removeItem(
            "ecampus_user"
        );


        showNotification(
            "You have been logged out.",
            "success"
        );


        setTimeout(() => {

            window.location.href =
                "index.html";

        }, 1000);

    }


    /* =================================================
       SAVE USER SESSION
       ================================================= */

    window.saveEcampusUser =
        function (user) {

            localStorage.setItem(
                "ecampus_user",
                JSON.stringify(user)
            );

        };


    /* =================================================
       GET CURRENT USER
       ================================================= */

    window.getEcampusUser =
        function () {

            const user =
                localStorage.getItem(
                    "ecampus_user"
                );


            if (!user) {
                return null;
            }


            try {

                return JSON.parse(user);

            } catch (error) {

                console.error(
                    "Unable to read user session.",
                    error
                );

                return null;

            }

        };


    /* =================================================
       NOTIFICATION SYSTEM
       ================================================= */

    function showNotification(
        message,
        type = "info"
    ) {

        let notification =
            document.querySelector(
                "#notification"
            );


        if (!notification) {

            notification =
                document.createElement(
                    "div"
                );


            notification.id =
                "notification";


            document.body.appendChild(
                notification
            );

        }


        notification.textContent =
            message;


        notification.className =
            `notification ${type}`;


        notification.classList.add(
            "show"
        );


        setTimeout(() => {

            notification.classList.remove(
                "show"
            );

        }, 3000);

    }


    /* =================================================
       CLOCK
       ================================================= */

    const clock =
        document.querySelector(
            "#currentTime"
        );


    function updateClock() {

        if (!clock) {
            return;
        }


        const now =
            new Date();


        clock.textContent =
            now.toLocaleTimeString(
                [],
                {
                    hour: "2-digit",
                    minute: "2-digit"
                }
            );

    }


    updateClock();


    setInterval(
        updateClock,
        1000
    );


    /* =================================================
       CURRENT DATE
       ================================================= */

    const dateElement =
        document.querySelector(
            "#currentDate"
        );


    if (dateElement) {

        const today =
            new Date();


        dateElement.textContent =
            today.toLocaleDateString(
                [],
                {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric"
                }
            );

    }


    /* =================================================
       DASHBOARD COUNTERS
       ================================================= */

    const counters =
        document.querySelectorAll(
            "[data-counter]"
        );


    counters.forEach(
        (counter) => {

            const target =
                Number(
                    counter.getAttribute(
                        "data-counter"
                    )
                );


            let current = 0;


            const increment =
                Math.max(
                    1,
                    Math.ceil(
                        target / 50
                    )
                );


            const timer =
                setInterval(() => {

                    current +=
                        increment;


                    if (
                        current >=
                        target
                    ) {

                        current =
                            target;


                        clearInterval(
                            timer
                        );

                    }


                    counter.textContent =
                        current;

                }, 30);

        }
    );


    /* =================================================
       PROFILE MENU
       ================================================= */

    const profileButton =
        document.querySelector(
            "#profileButton"
        ) ||
        document.querySelector(
            ".profile-button"
        );


    const profileMenu =
        document.querySelector(
            "#profileMenu"
        ) ||
        document.querySelector(
            ".profile-menu"
        );


    if (
        profileButton &&
        profileMenu
    ) {

        profileButton.addEventListener(
            "click",
            (event) => {

                event.stopPropagation();


                profileMenu.classList.toggle(
                    "active"
                );

            }
        );


        document.addEventListener(
            "click",
            () => {

                profileMenu.classList.remove(
                    "active"
                );

            }
        );

    }


    /* =================================================
       IMAGE ERROR HANDLING
       ================================================= */

    const images =
        document.querySelectorAll(
            "img"
        );


    images.forEach(
        (image) => {

            image.addEventListener(
                "error",
                () => {

                    console.warn(
                        "Image failed to load:",
                        image.src
                    );

                }
            );

        }
    );
        /* =================================================
       PREVENT DOUBLE FORM SUBMISSION
       ================================================= */

    forms.forEach((form) => {

        form.addEventListener(
            "submit",
            () => {

                const submitButton =
                    form.querySelector(
                        'button[type="submit"]'
                    );


                if (submitButton) {

                    submitButton.disabled =
                        true;


                    setTimeout(() => {

                        submitButton.disabled =
                            false;

                    }, 5000);

                }

            }
        );

    });


    /* =================================================
       GLOBAL E-CAMPUS FUNCTIONS
       ================================================= */

    window.ecampus = {

        showPage: showPage,

        notify: showNotification,

        logout: logout,

        getUser:
            window.getEcampusUser,

        saveUser:
            window.saveEcampusUser

    };


    /* =================================================
       APPLICATION STATUS
       ================================================= */

    console.log(
        "E-Campus frontend is ready."
    );


    console.log(
        "Authentication and Supabase integration will be connected in the next stage."
    );
   /* =====================================================
   STUDENT DASHBOARD
   ===================================================== */

async function loadStudentDashboard() {

    const studentName =
        document.getElementById("studentName");

    const welcomeName =
        document.getElementById("welcomeName");

    if (!studentName && !welcomeName) {
        return;
    }

    try {

        const {
            data: {
                user
            },
            error: authError
        } = await supabaseClient.auth.getUser();

        if (authError || !user) {

            console.log(
                "No authenticated student found."
            );

            return;
        }


        const {
            data: profile,
            error: profileError
        } =
            await supabaseClient
                .from("user_profiles")
                .select(
                    "first_name, middle_name, last_name, profile_photo_url, status"
                )
                .eq("id", user.id)
                .single();


        if (profileError) {

            console.error(
                "Unable to load student profile:",
                profileError
            );

            return;
        }


        const fullName = [
            profile.first_name,
            profile.middle_name,
            profile.last_name
        ]
        .filter(Boolean)
        .join(" ");


        if (studentName) {
            studentName.textContent =
                fullName || "Student";
        }


        if (welcomeName) {
            welcomeName.textContent =
                profile.first_name || "Student";
        }


        await loadStudentStatistics(user.id);

    } catch (error) {

        console.error(
            "Student dashboard error:",
            error
        );

    }
}


/* =====================================================
   STUDENT STATISTICS
   ===================================================== */

async function loadStudentStatistics(userId) {

    const courseCount =
        document.getElementById(
            "courseCount"
        );

    const assignmentCount =
        document.getElementById(
            "assignmentCount"
        );

    const assessmentCount =
        document.getElementById(
            "assessmentCount"
        );


    /*
     * We are intentionally starting with safe
     * database queries.
     *
     * Course/enrollment relationships will be
     * connected in the next stage.
     */


    if (courseCount) {
        courseCount.textContent = "0";
    }


    if (assignmentCount) {
        assignmentCount.textContent = "0";
    }


    if (assessmentCount) {
        assessmentCount.textContent = "0";
    }


    console.log(
        "Student dashboard initialized for:",
        userId
    );
}


/* =====================================================
   STUDENT DASHBOARD BUTTONS
   ===================================================== */

document.addEventListener(
    "click",
    (event) => {

        const button =
            event.target.closest(
                "[data-action]"
            );


        if (!button) {
            return;
        }


        const action =
            button.getAttribute(
                "data-action"
            );


        switch (action) {

            case "courses":

                window.location.href =
                    "student-courses.html";

                break;


            case "assignments":

                window.location.href =
                    "student-assignments.html";

                break;


            case "results":

                window.location.href =
                    "student-results.html";

                break;


            case "profile":

                window.location.href =
                    "student-profile.html";

                break;


            case "ai-tutor":

                window.location.href =
                    "ai-tutor.html";

                break;

        }

    }
);


/* =====================================================
   STUDENT LOGOUT
   ===================================================== */

const logoutButton =
    document.getElementById(
        "logoutButton"
    );


if (logoutButton) {

    logoutButton.addEventListener(
        "click",
        async () => {

            const {
                error
            } =
                await supabaseClient
                    .auth
                    .signOut();


            if (error) {

                console.error(
                    "Logout failed:",
                    error
                );

                return;
            }


            window.location.href =
                "../index.html";

        }
    );

}


/* =====================================================
   START STUDENT DASHBOARD
   ===================================================== */

loadStudentDashboard();

});
