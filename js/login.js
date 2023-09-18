const form = document.querySelector(".auth");
const formToggle = document.querySelector(".auth-toggle");
const warning = document.querySelector(".auth__footer__warning");
const success = document.querySelector(".auth-success");
const inputs = document.querySelectorAll(".auth__footer__input");
const preloader = document.querySelector(".preloader");

function addPreload() {
    formToggle.setAttribute("disabled", "disabled");
    preloader.classList.add('load');
}

function removePreload() {
    preloader.classList.remove('load');
    formToggle.removeAttribute("disabled", "disabled");
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const user = document.querySelector("#username").value;
    const pass = document.querySelector("#password").value;

    addPreload();

    fetch(`https://test-works.pr-uni.ru/api/login/index.php?login=${user}&password=${pass}`)
        .then((response) => response.json())
        .then((data) => {
            if (data.status == "error") {
                warning.textContent = data.errorMessage;
                warning.style.display = 'block';
                inputs.forEach(input => {
                    input.style.color = "#F65454";
                    input.style.borderColor = "#F65454";
                });
            } else if (data.status == "ok") {
                form.style.display = "none"
                success.textContent = `${data.user.name}, Вы успешно авторизованы!`;
                success.style.display = 'block';
                document.cookie = "token=" + data.token;
            }
        })
        .catch((err) => {
            console.log("The server responded with error: " + err);
        })
        .finally(() => {
            removePreload();
        });
});