// toggle icon navbar
let menuicon = document.getElementById('menu-icon')
let navbar = document.querySelector('.navbar');

menuicon.onclick = () => {
    menuicon.classList.toggle('fa-x')
    navbar.classList.toggle('active')
}

// scroll sections
let sections = document.querySelectorAll('section')
let navLinks = document.querySelectorAll('header nav a')

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 100;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            // active navbar links
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
            // active sections for animation on scroll
            sec.classList.add('show-animate');
        }
        // if want to use animation that repeats on scroll use this
        else {
            sec.classList.remove('show-animate');
        }
    });
    // sticky header
    let header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 100)

    // remove toggle icon and navbar when click navbar links (scroll)
    menuicon.classList.remove('fa-x')
    navbar.classList.remove('active')

    // animation footer on scroll
    // let footer = document.querySelector('footer');

    // footer.classList.toggle('show-animate', this.innerHeight + this.scrollY >= document.scrollingElement.scrollHeight);
}
// -------------------->Read More

let readMore = document.querySelector('.read-more');
let aboutContent = document.querySelector('.about-me');
readMore.onclick = () => {
    aboutContent.classList.toggle('show');
    aboutContent.classList.toggle('active');
}

//* -------------------->Form Validation Front


document.querySelector("form").addEventListener("submit", function (event) {
    // event.preventDefault();
    const fullName = document.getElementById('fullname').value;
    const phoneNumber = document.getElementById('number').value;
    const email = document.getElementById('email').value;
    const emailSubject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;

    // Regular expressions
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    var nameRegex = /^[a-zA-Z\s]*$/;
    var mobileRegex =  /^\+?\d{1,3}\d{9}$/;
;

    // Validate fields
    if (!emailRegex.test(email)) {
        alert("Please enter a valid email address.");
        return;
    }

    if (!nameRegex.test(fullName)) {
        alert("Please enter a valid full name (only alphabets and spaces).");
        return;
    }

    if (!mobileRegex.test(phoneNumber)) {
        alert("Please enter a valid 10-digit mobile number.");
        return;
    }

    // If all fields are valid, you can proceed with form submission or further processing
    alert("Form submitted successfully!");
});

