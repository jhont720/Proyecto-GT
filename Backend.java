import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;

public class Backend {
    Connection conexion;

    public void conectar() {
        try {
            String url = "jdbc:mysql://localhost:3306/timesheet_db";
            String usuario = "root";
            String contraseña = "";
            conexion = DriverManager.getConnection(url, usuario, contraseña);
            System.out.println("Conexión exitosa a la base de datos");
        } catch (SQLException e) {
            System.out.println("Error al conectar: " + e.getMessage());
        }
    }

    public void guardarRegistro(String nombre, String fecha, String horaInicio, String horaFin, String proyecto, String tarea, String tipoHoras) {
        try {
            String sql = "INSERT INTO REGISTROS (nombre, fecha, hora_inicio, hora_fin, proyecto, tarea, tipo_horas) VALUES (?, ?, ?, ?, ?, ?, ?)";
            PreparedStatement pstmt = conexion.prepareStatement(sql);
            pstmt.setString(1, nombre);
            pstmt.setString(2, fecha);
            pstmt.setString(3, horaInicio);
            pstmt.setString(4, horaFin);
            pstmt.setString(5, proyecto);
            pstmt.setString(6, tarea);
            pstmt.setString(7, tipoHoras);
            
            pstmt.executeUpdate();
            System.out.println("Registro guardado en la base de datos");
            pstmt.close();
        } catch (SQLException e) {
            System.out.println("Error al guardar: " + e.getMessage());
        }
    }

    public static void main(String[] args) {
        Backend miBackend = new Backend();
        miBackend.conectar();
    }
}