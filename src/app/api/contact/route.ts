import { dbConnection } from "@/lib/dbConnection";
import ContactModel from "../../../database/models/contact";

export async function POST(req: Request) {
  await dbConnection();
  const { name, email, message } = await req.json();
  
  if (!name || !email || !message) {
    return new Response(JSON.stringify({ ok: false, error: "Todos los campos son obligatorios" }), { status: 400 });
  }

  const emailRegex = /\S+@\S+\.\S+/;
  if (!emailRegex.test(email)) {
    return new Response(JSON.stringify({ ok: false, error: "Email inválido" }), { status: 400 });
  }
  
  const newMessage = new ContactModel({ fullName: name, email, message });
  const saved = await newMessage.save();
  
  return new Response(JSON.stringify({ ok: true, message: "Mensaje guardado", id: saved._id }), { status: 201 });
}

export async function GET() {
  await dbConnection();
  const messages = await ContactModel.find().sort({ createdAt: -1 });
  return new Response(JSON.stringify(messages), { status: 200 });
}

export async function DELETE(req: Request) {
  await dbConnection();

  const url = new URL(req.url);
  const id = url.searchParams.get("id");

  if (!id) {
    return new Response(JSON.stringify({ ok: false, error: "Se requiere un id" }), { status: 400 });
  }

  const deleted = await ContactModel.findByIdAndDelete(id);

  if (!deleted) {
    return new Response(JSON.stringify({ ok: false, error: "Mensaje no encontrado" }), { status: 404 });
  }

  return new Response(JSON.stringify({ ok: true, message: "Mensaje eliminado", id: deleted._id }), { status: 200 });
}
