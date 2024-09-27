from database import get_connection



def get_users():
    connection = get_connection()
    cursor = connection.cursor()
    cursor.execute("SELECT * FROM podai.user")
    users = cursor.fetchall()
    cursor.close()
    connection.close()
    print(users)
    return users