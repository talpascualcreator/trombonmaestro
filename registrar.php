<?php
require("conexion.php"); // Incluir el archivo con la configuración de la base de datos

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $nombre = isset($_POST['nombre']) ? trim($_POST['nombre']) : '';
    $colegio = isset($_POST['colegio']) ? trim($_POST['colegio']) : '';
    $edad = isset($_POST['edad']) ? intval($_POST['edad']) : 0;
    $sexo = isset($_POST['sexo']) ? trim($_POST['sexo']) : '';
    $contrasena = isset($_POST['contrasena']) ? trim($_POST['contrasena']) : '';

    if (
        strlen($nombre) >= 1 &&
        strlen($colegio) >= 1 &&
        $edad >= 1 &&
        strlen($sexo) >= 1 &&
        strlen($contrasena) >= 1
    ) {
        // Hash de la contraseña 
        $contrasena_hash = password_hash($contrasena, PASSWORD_BCRYPT);

        // Insertar los datos en la base de datos
        $consulta = "INSERT INTO Usuarios (nombre, colegio, edad, sexo, contrasena_hash)
                    VALUES (?, ?, ?, ?, ?)";

        $stmt = $conn->prepare($consulta);
        $stmt->bind_param("sssss", $nombre, $colegio, $edad, $sexo, $contrasena_hash);

        if ($stmt->execute()) {
            echo "<script>alert('Los datos se han insertado correctamente en la base de datos.');</script>";
        } else {
            echo "<script>alert('Error al insertar los datos en la base de datos: " . $stmt->error . "');</script>";
        }

        $stmt->close();
    } else {
        echo "<script>alert('Por favor, complete todos los campos correctamente.');</script>";
    }

    // Redireccionar al usuario a registrar.php
    header("location:registrar.php");
    exit(); // no ejecutar ningún código adicional después de la redirección
}

// Cerrar la conexión a la base de datos
$conn->close();




