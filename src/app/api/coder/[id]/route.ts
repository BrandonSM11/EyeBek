import { NextRequest, NextResponse } from 'next/server';
import { hash } from 'bcryptjs';
import CoderModel from "@/database/models/coder";
import { dbConnection } from "@/lib/dbConnection";

// GET /api/coder/[id]
export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const params = await context.params;

  await dbConnection();

  const coder = await CoderModel.findById(params.id);

  if (!coder) {
    return NextResponse.json({ error: "Coder no encontrado" }, { status: 404 });
  }

  return NextResponse.json({
    id: coder._id,
    name: coder.name,
    document: coder.document,
    phone: coder.phone,
    email: coder.email,
    photo: coder.photo,
    status: coder.status,
    role: coder.role,
  });
}

// PUT /api/coder/[id]
export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params;
    const body = await req.json();
    const { name, document, phone, email, password, photo, status } = body;

    await dbConnection();

    // Verificar si el coder existe
    const existingCoder = await CoderModel.findById(params.id);
    if (!existingCoder) {
      return NextResponse.json(
        { error: "Coder no encontrado" },
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

    // Verificar si el email ya existe en otro coder
    if (email && email !== existingCoder.email) {
      const emailExists = await CoderModel.findOne({
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

    // Verificar si el documento ya existe en otro coder
    if (document && document !== existingCoder.document) {
      const documentExists = await CoderModel.findOne({
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

    // Actualizar coder
    const updatedCoder = await CoderModel.findByIdAndUpdate(
      params.id,
      updateData,
      { new: true, runValidators: true }
    );

    return NextResponse.json({
      message: "Coder actualizado exitosamente",
      coder: {
        id: updatedCoder._id,
        name: updatedCoder.name,
        document: updatedCoder.document,
        phone: updatedCoder.phone,
        email: updatedCoder.email,
        photo: updatedCoder.photo,
        status: updatedCoder.status,
        role: updatedCoder.role,
      },
    });
  } catch (error) {
    console.error('Error actualizando coder:', error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}

// DELETE /api/coder/[id]
export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params;

    await dbConnection();

    const coder = await CoderModel.findById(params.id);
    if (!coder) {
      return NextResponse.json(
        { error: "Coder no encontrado" },
        { status: 404 }
      );
    }

    await CoderModel.findByIdAndDelete(params.id);

    return NextResponse.json({
      message: "Coder eliminado exitosamente",
    });
  } catch (error) {
    console.error('Error eliminando coder:', error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
