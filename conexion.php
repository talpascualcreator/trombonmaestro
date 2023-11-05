<?php
// Configuración de la conexión a la base de datos
$servername = "localhost"; // nombre de tu servidor MySQL
$username = "root"; // nombre de usuario de MySQL
$password = ""; // contraseña de MySQL
$database = "paginatrombonmaestro"; //  el nombre  base de datos

// Crear una conexión a la base de datos
$conn = new mysqli($servername, $username, $password, $database);

// Verificar la conexión
if ($conn->connect_error) {
    die("Error de conexión: " . $conn->connect_error);
} else {
    echo "Conexión exitosa"; //  mensaje de éxito 
}
header("refresh:.10;url=iniciosesion.html");
?>
