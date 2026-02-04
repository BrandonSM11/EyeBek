# EyeBek
Biometric security system based on Facial Recognition that integrates hardware (Raspberry Pi 3) and modern software for access control using a servomotor.

## The project
This system uses artificial intelligence in the browser to identify faces. Once the identity is validated, a signal is sent via the MQTT protocol to a Raspberry Pi 3, which activates a servo motor to allow physical access.

## Characteristics
-Facial Recognition: Implemented with face-api.js for real-time detection and validation.

-Hardware Integration: Servo motor control via Raspberry Pi 3 and communication via MQTT messages.

-Secure Authentication: User management with NextAuth.js and password protection with Bcryptjs.

-Control Panel: Modern interface built with React 19, Next.js 16, and Tailwind CSS 4.

---

## Tech Stack    

| Tool | Use |
|----------|----------|
| AI/Biometrics    | AI/Biometrics  |
| IoT/Hardware    | Raspberry Pi 3, MQTT, SG90 Servo Motor  |
| Database    | MongoDB & Mongoose   |
| Auth    | NextAuth.js V5   |
| Multimedia    | Cloudinary   |
| Style    | Tailwind, Lucide Icons   |


---

## Project Configuration

1. Hardware Requirements

-Raspberry Pi 3 (with Node.js and an MQTT broker installed, e.g., Mosquitto).

-Compatible camera (USB or PiCam).

-Micro servo motor (connected to GPIO pins).

2. Clone the repository

```bash
git clone https://github.com/BrandonSM11/EyeBek.git
cd eyebek
```

2. Install the dependencies

```bash
npm install
```


3. Environment Variables: Create a .env.local file in the root directory and add the following credentials (adjust according to your providers):
```bash
# Database & Auth
MONGODB_URI=tu_uri_mongodb
NEXTAUTH_SECRET=tu_secreto

# MQTT Broker (Raspberry Pi connection)
MQTT_BROKER_URL=mqtt://tu-ip-broker
MQTT_TOPIC=access/door/control

# PayPal
PAYPAL_CLIENT_ID=tu_client_id
PAYPAL_CLIENT_SECRET=tu_client_secret

# Email
EMAIL_USER=tu_correo@gmail.com
EMAIL_PASS=tu_password_aplicacion
```

4. Run the development environment
```bash
npm run dev
```
    Abre http://localhost:3000 en tu navegador.
