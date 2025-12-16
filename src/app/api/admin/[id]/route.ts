import { NextRequest, NextResponse } from 'next/server';
import { hash } from 'bcryptjs';
import { Schema, model } from 'mongoose';
import { dbConnection } from '@/lib/dbConnection';

// Obtener modelo Admin
async function getAdminModel() {
    await dbConnection();

    const AdminSchema = new Schema({
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
            default: 'administrator',
        },
    }, { versionKey: false, timestamps: true });

    let Admin;
    try {
        Admin = model('administrators');
    } catch {
        Admin = model('administrators', AdminSchema);
    }
    return Admin;
}

// GET /api/admin/[id]
export async function GET(
    req: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const params = await context.params;
        const Admin = await getAdminModel();

        const admin = await Admin.findById(params.id);

        if (!admin) {
            return NextResponse.json(
                { error: "Administrador no encontrado" },
                { status: 404 }
            );
        }

        return NextResponse.json({
            id: admin._id,
            name: admin.name,
            document: admin.document,
            phone: admin.phone,
            email: admin.email,
            photo: admin.photo,
            status: admin.status,
            role: admin.role,
        });
    } catch (error) {
        console.error('Error obteniendo administrador:', error);
        return NextResponse.json(
            { error: "Error interno del servidor" },
            { status: 500 }
        );
    }
}

// PUT /api/admin/[id]
export async function PUT(
    req: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const params = await context.params;
        const body = await req.json();
        const { name, document, phone, email, password, photo, status } = body;

        const Admin = await getAdminModel();

        // Verificar si el admin existe
        const existingAdmin = await Admin.findById(params.id);
        if (!existingAdmin) {
            return NextResponse.json(
                { error: "Administrador no encontrado" },
                { status: 404 }
            );
        }

        // Preparar datos para actualización
        const updateData: Record<string, unknown> = {};

        if (name !== undefined) updateData.name = name;
        if (document !== undefined) updateData.document = document;
        if (phone !== undefined) updateData.phone = phone;
        if (email !== undefined) updateData.email = email;
        if (photo !== undefined) updateData.photo = photo;
        if (status !== undefined) updateData.status = status;

        // Si se proporciona contraseña, hashearla
        if (password) {
            updateData.password = await hash(password, 10);
        }

        // Verificar si el email ya existe en otro admin
        if (email && email !== existingAdmin.email) {
            const emailExists = await Admin.findOne({
                email,
                _id: { $ne: params.id }
            });
            if (emailExists) {
                return NextResponse.json(
                    { error: "El email ya está registrado" },
                    { status: 409 }
                );
            }
        }

        // Verificar si el documento ya existe en otro admin
        if (document && document !== existingAdmin.document) {
            const documentExists = await Admin.findOne({
                document,
                _id: { $ne: params.id }
            });
            if (documentExists) {
                return NextResponse.json(
                    { error: "El documento ya está registrado" },
                    { status: 409 }
                );
            }
        }

        // Actualizar admin
        const updatedAdmin = await Admin.findByIdAndUpdate(
            params.id,
            updateData,
            { new: true, runValidators: true }
        );

        return NextResponse.json({
            message: "Administrador actualizado exitosamente",
            admin: {
                id: updatedAdmin._id,
                name: updatedAdmin.name,
                document: updatedAdmin.document,
                phone: updatedAdmin.phone,
                email: updatedAdmin.email,
                photo: updatedAdmin.photo,
                status: updatedAdmin.status,
                role: updatedAdmin.role,
            },
        });
    } catch (error) {
        console.error('Error actualizando administrador:', error);
        return NextResponse.json(
            { error: "Error interno del servidor" },
            { status: 500 }
        );
    }
}

// DELETE /api/admin/[id]
export async function DELETE(
    req: NextRequest,
    context: { params: Promise<{ id: string }> }
) {
    try {
        const params = await context.params;
        const Admin = await getAdminModel();

        const admin = await Admin.findById(params.id);
        if (!admin) {
            return NextResponse.json(
                { error: "Administrador no encontrado" },
                { status: 404 }
            );
        }

        await Admin.findByIdAndDelete(params.id);

        return NextResponse.json({
            message: "Administrador eliminado exitosamente",
        });
    } catch (error) {
        console.error('Error eliminando administrador:', error);
        return NextResponse.json(
            { error: "Error interno del servidor" },
            { status: 500 }
        );
    }
}
