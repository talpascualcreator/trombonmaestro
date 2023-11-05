

<?php
session_start(); // Inicia la sesión

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $usuario = isset($_POST['usuario']) ? $_POST['usuario'] : '';
    $contrasena = isset($_POST['contrasena']) ? $_POST['contrasena'] : '';

    // Conexión a la base de datos
    $conexion = mysqli_connect("localhost", "root", "", "paginatrombonmaestro");

    // Verifica si la conexión fue exitosa
    if (!$conexion) {
        die("Error de conexión: " . mysqli_connect_error());
    }

    $usuario = mysqli_real_escape_string($conexion, $usuario);

    // Consulta SQL para obtener el usuario y la contraseña hash
    $consulta = "SELECT nombre, contrasena_hash FROM usuarios WHERE nombre = ?";
    $stmt = mysqli_prepare($conexion, $consulta);
    mysqli_stmt_bind_param($stmt, "s", $usuario);
    mysqli_stmt_execute($stmt);
    mysqli_stmt_bind_result($stmt, $nombre_db, $contrasena_hash);

    if (mysqli_stmt_fetch($stmt)) {
        if (password_verify($contrasena, $contrasena_hash)) {
            // Autenticación exitosa, crea una variable de sesión para el usuario
            $_SESSION['usuario'] = $nombre_db;
            mysqli_stmt_close($stmt);
            mysqli_close($conexion);
            header("Location: indexp1.html"); // Redirige a la página de inicio exitoso
            exit();
        }
    }

    // Autenticación fallida, muestra un mensaje de error
    mysqli_stmt_close($stmt);
    mysqli_close($conexion);
    header("Location: iniciosesion.html"); // Redirige a la página de inicio fallido
    exit();
}















