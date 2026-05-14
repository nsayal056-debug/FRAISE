const password = "111";

const userPassword = prompt("Ingrese la contraseña para acceder");

if (userPassword !== password) {

    alert("Contraseña incorrecta");

    window.location.href = "./index.html";
}