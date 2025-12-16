import { dbConnection } from "@/lib/dbConnection";
import CoderModel from "@/database/models/coder";

export default function CoderPage() {
  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Coders</h1>
        <p className="text-gray-600 mt-2">Gestión de coders</p>
      </div>
    </div>
  );
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