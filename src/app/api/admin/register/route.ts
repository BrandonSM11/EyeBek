import { NextRequest, NextResponse } from 'next/server';
import { hash } from 'bcryptjs';
import { dbConnection } from '@/lib/dbConnection';
import { Schema, model } from 'mongoose';

/**
 * Obtiene el modelo Admin
 */
async function getAdminModel() {
  await dbConnection();
  const AdminSchema = new Schema({
    name: String,
    document: String,
    phone: String,
    photo: String,
    status: Boolean,
    email: String,
    password: String,
    role: String,
  }, { versionKey: false, timestamps: true });

  let Admin;
  try {
    Admin = model('administrators');
  } catch {
    Admin = model('administrators', AdminSchema);
  }
  return Admin;
}

/**
 * Obtiene el modelo Coder
 */
async function getCoderModel() {
  try {
    console.log('🔄 Conectando a MongoDB...');
    await dbConnection();
    console.log('✅ MongoDB conectado');

    const CoderSchema = new Schema({
      name: {
        type: String,
        required: true,
      },
      document: String,
      phone: String,
      photo: String,
      status: Boolean,
      email: {
        type: String,
        required: true,
        unique: true,
      },
      password: {
        type: String,
        required: true,
      },
      role: {
        type: String,
        default: 'coder',
      },
    }, { versionKey: false, timestamps: true });

    let Coder;
    try {
      Coder = model('coders');
    } catch {
      Coder = model('coders', CoderSchema);
    }
    return Coder;
  } catch (error) {
    console.error('❌ Error conectando a MongoDB:', error);
    throw error;
  }
}

/**
 * POST /api/admin/register
 * Registra un nuevo usuario administrador
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, document, phone, email, password, photo, type } = body;

    // Si es un coder, usar endpoint de coders
    if (type === 'coder') {
      return await registerCoder(name, document, phone, email, password, photo);
    }

    // Validar datos para admin
    if (!name || !document || !phone || !email || !password || !photo) {
      return NextResponse.json(
        { message: 'Faltan campos requeridos' },
        { status: 400 }
      );
    }

    // Hash de la contraseña
    const hashedPassword = await hash(password, 10);

    // Obtener modelo Admin
    const Admin = await getAdminModel();

    // Verificar si el email ya existe
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return NextResponse.json(
        { message: 'El email ya está registrado' },
        { status: 409 }
      );
    }

    // Verificar si el documento ya existe
    const existingDocument = await Admin.findOne({ document });
    if (existingDocument) {
      return NextResponse.json(
        { message: 'El documento ya está registrado' },
        { status: 409 }
      );
    }

    // Crear nuevo administrador
    const newAdmin = await Admin.create({
      name,
      document,
      phone,
      email,
      password: hashedPassword,
      photo,
      status: true,
      role: 'administrator',
    });

    return NextResponse.json(
      {
        message: 'Usuario registrado exitosamente',
        admin: {
          id: newAdmin._id,
          name: newAdmin.name,
          email: newAdmin.email,
          document: newAdmin.document,
          phone: newAdmin.phone,
          photo: newAdmin.photo,
          role: newAdmin.role,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error en registro:', error);
    return NextResponse.json(
      { message: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}

/**
 * Registra un nuevo coder
 */
async function registerCoder(
  name: string,
  document: string,
  phone: string,
  email: string,
  password: string,
  photo: string
) {
  try {
    // Obtener el modelo Coder (asegura la conexión)
    const Coder = await getCoderModel();

    // Validar datos
    if (!name || !document || !phone || !email || !password || !photo) {
      return NextResponse.json(
        { message: 'Faltan campos requeridos' },
        { status: 400 }
      );
    }

    // Hash de la contraseña
    const hashedPassword = await hash(password, 10);

    // Verificar si el email ya existe
    const existingCoder = await Coder.findOne({ email });
    if (existingCoder) {
      return NextResponse.json(
        { message: 'El email ya está registrado' },
        { status: 409 }
      );
    }

    // Verificar si el documento ya existe
    const existingDocument = await Coder.findOne({ document });
    if (existingDocument) {
      return NextResponse.json(
        { message: 'El documento ya está registrado' },
        { status: 409 }
      );
    }

    // Crear nuevo coder
    const newCoder = await Coder.create({
      name,
      document,
      phone,
      email,
      password: hashedPassword,
      photo,
      status: true,
      role: 'coder',
    });

    console.log('✅ Coder registrado exitosamente:', newCoder._id);

    return NextResponse.json(
      {
        message: 'Coder registrado exitosamente',
        coder: {
          id: newCoder._id,
          name: newCoder.name,
          email: newCoder.email,
          document: newCoder.document,
          phone: newCoder.phone,
          photo: newCoder.photo,
          role: newCoder.role,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error en registro de coder:', error);
    const errorMessage = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { message: `Error al registrar coder: ${errorMessage}` },
      { status: 500 }
    );
  }
}

/**
 * GET /api/admin/register
 * Obtiene lista de administradores y coders
 */
export async function GET(request: NextRequest) {
  try {
    const [Admin, Coder] = await Promise.all([
      getAdminModel(),
      getCoderModel(),
    ]);

    const [admins, coders] = await Promise.all([
      Admin.find({}).select('-password'),
      Coder.find({}).select('-password'),
    ]);

    return NextResponse.json(
      {
        success: true,
        admins,
        coders,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error obteniendo usuarios:', error);
    return NextResponse.json(
      { message: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}
