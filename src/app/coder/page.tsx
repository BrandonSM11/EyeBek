
import CoderModel from "@/database/models/coder";
import { dbConnection } from "@/lib/dbConnection";

export async function GET(req, context) {
  const params = await context.params;   // ✔ obligatorio

  await dbConnection();

  const user = await CoderModel.findById(params.id);

  if (!user) {
    return Response.json({ error: "Usuario no encontrado" }, { status: 404 });
  }

  return Response.json({
    photo: user.photo,
  });
}


export async function DELETE(req: Request) {
  try {
    await dbConnection();
    const url = new URL(req.url);
    const id = url.searchParams.get("id");
    
    if (!id) {
      return new Response(
        JSON.stringify({ ok: false, error: "Se requiere un id" }), 
        { status: 400 }
      );
    }

    const deleted = await CoderModel.findByIdAndDelete(id);
    
    if (!deleted) {
      return new Response(
        JSON.stringify({ ok: false, error: "Coder no encontrado" }), 
        { status: 404 }
      );
    }

    return new Response(
      JSON.stringify({ ok: true, message: "Coder eliminado", id: deleted._id }), 
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof Error) {
      return new Response(
        JSON.stringify({ ok: false, error: error.message }), 
        { status: 500 }
      );
    }
    return new Response(
      JSON.stringify({ ok: false, error: "Error al eliminar" }), 
      { status: 500 }
    );
  }
}