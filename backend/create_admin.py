# backend/create_admin.py
from flask_bcrypt import Bcrypt
from db import get_db_connection

bcrypt = Bcrypt()
# Hashes the password 'admin123'
hashed_pw = bcrypt.generate_password_hash('admin123').decode('utf-8')

conn = get_db_connection()
cur = conn.cursor()
cur.execute("UPDATE users SET password_hash = %s WHERE username = 'admin'", (hashed_pw,))
conn.commit()
cur.close()
conn.close()

print("Success! The 'admin' user's password is now set to 'admin123'")